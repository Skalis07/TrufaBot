/**
 * @file src/modules/music/services/music-source-youtube-playlist-service.ts
 * @description Carga progresiva de playlists de YouTube con orden estable y control de progreso.
 */
import type { GuildMember, GuildTextBasedChannel, VoiceBasedChannel } from 'discord.js';
import type { Queue } from 'distube';
import { isYouTubePlaylistLikeUrl, isYtDlpSearchInput } from '../domain/source-url-utils.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import { getMusicPlayer } from '../music-player.js';
import { waitMs } from '../shared/runtime-utils.js';
import type { FlatPlaylistEntry } from './music-source-ytdlp-service.js';

type ProgressivePlaylistLoadState = {
  token: symbol;
  startedAt: number;
  totalEntries: number;
  addedEntries: number;
  firstEntryUrl: string;
  playlistTitle: string | null;
};

type VoiceContextLike = {
  guildId: string;
  member: GuildMember;
  voiceChannel: VoiceBasedChannel;
  textChannel: GuildTextBasedChannel | null;
};

type PlayOptions = {
  member: GuildMember;
  textChannel?: GuildTextBasedChannel;
};

type MusicSourceYouTubePlaylistServiceDeps = {
  progressivePlaylistLoadsByGuild: Map<string, ProgressivePlaylistLoadState>;
  playlistProgressiveBatchDelayMs: number;
  loadYouTubeFlatPlaylistEntries: (inputUrl: string) => Promise<{
    playlistId: string;
    playlistTitle: string | null;
    entries: FlatPlaylistEntry[];
  }>;
  reorderYouTubePlaylistEntriesForInput: (inputUrl: string, entries: FlatPlaylistEntry[]) => FlatPlaylistEntry[];
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  clearProgressivePlaylistLoad: (guildId: string, reason: string) => void;
};

export class MusicSourceYouTubePlaylistService {
  constructor(private readonly deps: MusicSourceYouTubePlaylistServiceDeps) {}

  private get player() {
    return getMusicPlayer();
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get progressivePlaylistLoadsByGuild() {
    return this.deps.progressivePlaylistLoadsByGuild;
  }

  private get playlistProgressiveBatchDelayMs() {
    return this.deps.playlistProgressiveBatchDelayMs;
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  private async syncNowPlayingPanel(queue: Queue): Promise<void> {
    await this.deps.syncNowPlayingPanel(queue);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  private clearProgressivePlaylistLoad(guildId: string, reason: string): void {
    this.deps.clearProgressivePlaylistLoad(guildId, reason);
  }

  private async loadYouTubeFlatPlaylistEntries(inputUrl: string) {
    return this.deps.loadYouTubeFlatPlaylistEntries(inputUrl);
  }

  private reorderYouTubePlaylistEntriesForInput(inputUrl: string, entries: FlatPlaylistEntry[]): FlatPlaylistEntry[] {
    return this.deps.reorderYouTubePlaylistEntriesForInput(inputUrl, entries);
  }

  private startProgressivePlaylistLoad(params: {
    guildId: string;
    voiceChannel: VoiceBasedChannel;
    member: GuildMember;
    textChannel: GuildTextBasedChannel | null;
    firstEntryUrl: string;
    playlistTitle: string | null;
    remainingEntries: FlatPlaylistEntry[];
  }): void {
    const { guildId, voiceChannel, member, textChannel, firstEntryUrl, playlistTitle, remainingEntries } = params;

    if (remainingEntries.length === 0) {
      this.clearProgressivePlaylistLoad(guildId, 'no_remaining_entries');
      return;
    }

    this.clearProgressivePlaylistLoad(guildId, 'replace_previous_progressive_playlist_loader');

    const token = Symbol(`progressive-playlist:${guildId}`);
    const state: ProgressivePlaylistLoadState = {
      token,
      startedAt: Date.now(),
      totalEntries: remainingEntries.length + 1,
      addedEntries: 1,
      firstEntryUrl,
      playlistTitle,
    };
    this.progressivePlaylistLoadsByGuild.set(guildId, state);

    musicLogger.info(
      {
        event: 'progressive_playlist_load_started',
        guildId,
        playlistTitle,
        totalEntries: state.totalEntries,
        alreadyQueuedOrPlaying: 1,
      },
      'started progressive playlist loading',
    );

    void (async () => {
      let failedEntries = 0;

      for (const [index, entry] of remainingEntries.entries()) {
        const active = this.progressivePlaylistLoadsByGuild.get(guildId);
        if (!active || active.token !== token) {
          return;
        }

        const currentQueue = this.player.getQueue(guildId);
        const targetVoiceChannel = currentQueue?.voice.channel ?? voiceChannel;
        if (!targetVoiceChannel) {
          this.clearProgressivePlaylistLoad(guildId, 'missing_voice_channel');
          return;
        }

        const playOptions: PlayOptions = { member };
        if (textChannel) {
          playOptions.textChannel = textChannel;
        }

        try {
          await this.player.play(targetVoiceChannel, entry.url, playOptions);

          const refreshed = this.progressivePlaylistLoadsByGuild.get(guildId);
          if (refreshed?.token === token) {
            refreshed.addedEntries += 1;

            if (
              refreshed.addedEntries === refreshed.totalEntries ||
              refreshed.addedEntries % 5 === 0 ||
              index === remainingEntries.length - 1
            ) {
              musicLogger.info(
                {
                  event: 'progressive_playlist_load_progress',
                  guildId,
                  playlistTitle,
                  addedEntries: refreshed.addedEntries,
                  totalEntries: refreshed.totalEntries,
                },
                'progressive playlist loading progress',
              );
            }
          }
        } catch (error) {
          failedEntries += 1;
          const errorMessage = error instanceof Error ? error.message : String(error);
          musicLogger.warn(
            {
              event: 'progressive_playlist_load_entry_failed',
              guildId,
              playlistTitle,
              entryUrl: entry.url,
              entryTitle: entry.title,
              errorMessage,
            },
            'failed to enqueue playlist entry during progressive load',
          );
        }

        if (index < remainingEntries.length - 1) {
          await waitMs(this.playlistProgressiveBatchDelayMs);
        }
      }

      const active = this.progressivePlaylistLoadsByGuild.get(guildId);
      if (!active || active.token !== token) {
        return;
      }

      this.progressivePlaylistLoadsByGuild.delete(guildId);
      musicLogger.info(
        {
          event: 'progressive_playlist_load_completed',
          guildId,
          playlistTitle,
          totalEntries: active.totalEntries,
          addedEntries: active.addedEntries,
          failedEntries,
          durationMs: Date.now() - active.startedAt,
        },
        'progressive playlist loading completed',
      );
    })().catch((error) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.clearProgressivePlaylistLoad(guildId, 'background_loader_unhandled_error');
      musicLogger.error(
        {
          event: 'progressive_playlist_load_unhandled_error',
          guildId,
          playlistTitle,
          errorMessage,
        },
        'progressive playlist loader crashed',
      );
    });
  }

  async tryPlayYouTubePlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }): Promise<string | null> {
    const { context, normalizedInput, rawInput, hadCurrentSong, playOptions } = params;

    if (isYtDlpSearchInput(normalizedInput) || !isYouTubePlaylistLikeUrl(normalizedInput)) {
      return null;
    }

    const playlistData = await this.loadYouTubeFlatPlaylistEntries(normalizedInput);
    const orderedEntries = this.reorderYouTubePlaylistEntriesForInput(normalizedInput, playlistData.entries);
    const firstEntry = orderedEntries[0];
    if (!firstEntry) {
      throw new MusicUserError('La playlist no devolvio pistas reproducibles.');
    }

    await this.player.play(context.voiceChannel, firstEntry.url, playOptions);

    const updatedQueue = this.player.getQueue(context.guildId);
    if (updatedQueue && updatedQueue.songs.length > 0) {
      await this.syncNowPlayingPanel(updatedQueue);
    }

    const remainingEntries = orderedEntries.slice(1);
    if (remainingEntries.length > 0) {
      this.startProgressivePlaylistLoad({
        guildId: context.guildId,
        voiceChannel: context.voiceChannel,
        member: context.member,
        textChannel: context.textChannel,
        firstEntryUrl: firstEntry.url,
        playlistTitle: playlistData.playlistTitle,
        remainingEntries,
      });
    } else {
      this.clearProgressivePlaylistLoad(context.guildId, 'single_entry_playlist');
    }

    const firstTrackLabel = updatedQueue?.songs[0]?.name ?? firstEntry.title ?? rawInput.trim();
    const totalEntries = orderedEntries.length;
    const playlistLabel = playlistData.playlistTitle ? `**${playlistData.playlistTitle}**` : 'la playlist';

    if (!hadCurrentSong) {
      if (totalEntries <= 1) {
        return `Reproduciendo ahora: **${firstTrackLabel}**`;
      }

      return `Reproduciendo **${firstTrackLabel}** desde ${playlistLabel}. El resto (${totalEntries - 1} pistas) se cargara progresivamente.`;
    }

    if (totalEntries <= 1) {
      return `Agregado a la cola: **${firstTrackLabel}**`;
    }

    return `Playlist agregada (${playlistLabel}): **${totalEntries}** pistas. Se cargaran progresivamente.`;
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicSourceYouTubePlaylistService(
  deps: MusicSourceYouTubePlaylistServiceDeps,
): MusicSourceYouTubePlaylistService {
  return new MusicSourceYouTubePlaylistService(deps);
}
