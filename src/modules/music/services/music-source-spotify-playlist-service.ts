/**
 * @file src/modules/music/services/music-source-spotify-playlist-service.ts
 * @description Carga progresiva de playlists de Spotify: resolucion track->fuente reproducible y encolado por lotes.
 */
import type { GuildMember, GuildTextBasedChannel, VoiceBasedChannel } from 'discord.js';
import type { Queue } from 'distube';
import {
  isSpotifyPlaylistLikeUrl,
  isSpotifyTrackUrl,
  isYtDlpSearchInput,
} from '../domain/source-url-utils.js';
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

type SpotifyPlaylistSeedTrack = {
  name: string;
  uploaderName: string;
  spotifyUrl?: string;
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

type SpotifyPluginLike = {
  validate: (url: string) => boolean;
  resolve: (url: string, options?: object) => Promise<unknown>;
  createSearchQuery: (song: { name?: string; uploader?: { name?: string } }) => string;
};

type MusicSourceSpotifyPlaylistServiceDeps = {
  progressivePlaylistLoadsByGuild: Map<string, ProgressivePlaylistLoadState>;
  playlistProgressiveBatchDelayMs: number;
  getSpotifyPlugin: () => SpotifyPluginLike | undefined;
  resolveFirstSearchUrlWithYtDlp: (input: string) => Promise<string>;
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  clearProgressivePlaylistLoad: (guildId: string, reason: string) => void;
};

export class MusicSourceSpotifyPlaylistService {
  constructor(private readonly deps: MusicSourceSpotifyPlaylistServiceDeps) {}

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

  // Resuelve entradas externas a una fuente reproducible o usable.
  private async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string> {
    return this.deps.resolveFirstSearchUrlWithYtDlp(input);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  private clearProgressivePlaylistLoad(guildId: string, reason: string): void {
    this.deps.clearProgressivePlaylistLoad(guildId, reason);
  }

  private extractSpotifyPlaylistSeedTracksFromResolvedResult(
    resolved: unknown,
  ): { playlistTitle: string | null; tracks: SpotifyPlaylistSeedTrack[] } | null {
    if (typeof resolved !== 'object' || resolved === null) {
      return null;
    }

    const record = resolved as {
      name?: unknown;
      songs?: Array<{
        name?: unknown;
        url?: unknown;
        uploader?: { name?: unknown };
      }>;
    };

    if (!Array.isArray(record.songs)) {
      return null;
    }

    const playlistTitle =
      typeof record.name === 'string' && record.name.trim() ? record.name.trim() : null;

    const dedupedByKey = new Map<string, SpotifyPlaylistSeedTrack>();
    for (const song of record.songs) {
      if (!song || typeof song.name !== 'string' || !song.name.trim()) {
        continue;
      }

      const uploaderName =
        song.uploader && typeof song.uploader.name === 'string' && song.uploader.name.trim()
          ? song.uploader.name.trim()
          : null;
      if (!uploaderName) {
        continue;
      }

      const seedTrack: SpotifyPlaylistSeedTrack = {
        name: song.name.trim(),
        uploaderName,
        ...(typeof song.url === 'string' && song.url.startsWith('http') ? { spotifyUrl: song.url } : {}),
      };

      const key = `${seedTrack.name.toLowerCase()}|${seedTrack.uploaderName.toLowerCase()}`;
      if (!dedupedByKey.has(key)) {
        dedupedByKey.set(key, seedTrack);
      }
    }

    return {
      playlistTitle,
      tracks: [...dedupedByKey.values()],
    };
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  private async resolveSpotifySeedTrackToPlayableEntry(
    spotifyPlugin: Pick<SpotifyPluginLike, 'createSearchQuery'>,
    seedTrack: SpotifyPlaylistSeedTrack,
  ): Promise<FlatPlaylistEntry> {
    const searchQuery = spotifyPlugin.createSearchQuery({
      name: seedTrack.name,
      uploader: { name: seedTrack.uploaderName },
    });
    const ytDlpSearchInput = isYtDlpSearchInput(searchQuery) ? searchQuery : `ytsearch:${searchQuery}`;
    const playableUrl = await this.resolveFirstSearchUrlWithYtDlp(ytDlpSearchInput);

    return {
      url: playableUrl,
      title: `${seedTrack.name} - ${seedTrack.uploaderName}`,
    };
  }

  private startProgressiveSpotifyPlaylistLoad(params: {
    guildId: string;
    voiceChannel: VoiceBasedChannel;
    member: GuildMember;
    textChannel: GuildTextBasedChannel | null;
    firstEntryUrl: string;
    playlistTitle: string | null;
    spotifyPlugin: Pick<SpotifyPluginLike, 'createSearchQuery'>;
    remainingSeedTracks: SpotifyPlaylistSeedTrack[];
  }): void {
    const {
      guildId,
      voiceChannel,
      member,
      textChannel,
      firstEntryUrl,
      playlistTitle,
      spotifyPlugin,
      remainingSeedTracks,
    } = params;

    if (remainingSeedTracks.length === 0) {
      this.clearProgressivePlaylistLoad(guildId, 'spotify_no_remaining_entries');
      return;
    }

    this.clearProgressivePlaylistLoad(guildId, 'replace_previous_progressive_playlist_loader');

    const token = Symbol(`progressive-spotify-playlist:${guildId}`);
    const state: ProgressivePlaylistLoadState = {
      token,
      startedAt: Date.now(),
      totalEntries: remainingSeedTracks.length + 1,
      addedEntries: 1,
      firstEntryUrl,
      playlistTitle,
    };
    this.progressivePlaylistLoadsByGuild.set(guildId, state);

    musicLogger.info(
      {
        event: 'progressive_playlist_load_started',
        playlistSource: 'spotify',
        guildId,
        playlistTitle,
        totalEntries: state.totalEntries,
        alreadyQueuedOrPlaying: 1,
      },
      'started progressive playlist loading',
    );

    void (async () => {
      let failedEntries = 0;

      for (const [index, seedTrack] of remainingSeedTracks.entries()) {
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

        const playOptions: { member: GuildMember; textChannel?: GuildTextBasedChannel } = { member };
        if (textChannel) {
          playOptions.textChannel = textChannel;
        }

        try {
          const entry = await this.resolveSpotifySeedTrackToPlayableEntry(spotifyPlugin, seedTrack);
          await this.player.play(targetVoiceChannel, entry.url, playOptions);

          const refreshed = this.progressivePlaylistLoadsByGuild.get(guildId);
          if (refreshed?.token === token) {
            refreshed.addedEntries += 1;
            if (
              refreshed.addedEntries === refreshed.totalEntries ||
              refreshed.addedEntries % 5 === 0 ||
              index === remainingSeedTracks.length - 1
            ) {
              musicLogger.info(
                {
                  event: 'progressive_playlist_load_progress',
                  playlistSource: 'spotify',
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
              playlistSource: 'spotify',
              guildId,
              playlistTitle,
              entryTitle: `${seedTrack.name} - ${seedTrack.uploaderName}`,
              entryUrl: seedTrack.spotifyUrl,
              errorMessage,
            },
            'failed to enqueue playlist entry during progressive load',
          );
        }

        if (index < remainingSeedTracks.length - 1) {
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
          playlistSource: 'spotify',
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
      this.clearProgressivePlaylistLoad(guildId, 'spotify_background_loader_unhandled_error');
      musicLogger.error(
        {
          event: 'progressive_playlist_load_unhandled_error',
          playlistSource: 'spotify',
          guildId,
          playlistTitle,
          errorMessage,
        },
        'progressive playlist loader crashed',
      );
    });
  }

  async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }): Promise<string | null> {
    const { context, normalizedInput, rawInput, hadCurrentSong, playOptions } = params;

    if (
      isYtDlpSearchInput(normalizedInput) ||
      isSpotifyTrackUrl(normalizedInput) ||
      !isSpotifyPlaylistLikeUrl(normalizedInput)
    ) {
      return null;
    }

    const spotifyPlugin = this.deps.getSpotifyPlugin();
    if (!spotifyPlugin || !spotifyPlugin.validate(normalizedInput)) {
      return null;
    }

    const resolved = await spotifyPlugin.resolve(normalizedInput, {});
    const playlistData = this.extractSpotifyPlaylistSeedTracksFromResolvedResult(resolved);
    if (!playlistData || playlistData.tracks.length === 0) {
      throw new MusicUserError(
        'No pude leer pistas reproducibles de esa playlist/album de Spotify (asegurate de que sea publico).',
      );
    }

    let firstPlayableEntry: FlatPlaylistEntry | null = null;
    let firstPlayableIndex = -1;

    for (const [index, seedTrack] of playlistData.tracks.entries()) {
      try {
        firstPlayableEntry = await this.resolveSpotifySeedTrackToPlayableEntry(spotifyPlugin, seedTrack);
        firstPlayableIndex = index;
        break;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        musicLogger.warn(
          {
            event: 'spotify_playlist_first_playable_probe_failed',
            guildId: context.guildId,
            playlistTitle: playlistData.playlistTitle,
            entryTitle: `${seedTrack.name} - ${seedTrack.uploaderName}`,
            errorMessage,
          },
          'failed to resolve spotify playlist entry while searching first playable song',
        );
      }
    }

    if (!firstPlayableEntry || firstPlayableIndex < 0) {
      throw new MusicUserError(
        'No pude convertir ninguna pista de esa playlist de Spotify a una fuente reproducible.',
      );
    }

    await this.player.play(context.voiceChannel, firstPlayableEntry.url, playOptions);

    const updatedQueue = this.player.getQueue(context.guildId);
    if (updatedQueue && updatedQueue.songs.length > 0) {
      await this.syncNowPlayingPanel(updatedQueue);
    }

    const remainingSeedTracks = playlistData.tracks.slice(firstPlayableIndex + 1);
    if (remainingSeedTracks.length > 0) {
      this.startProgressiveSpotifyPlaylistLoad({
        guildId: context.guildId,
        voiceChannel: context.voiceChannel,
        member: context.member,
        textChannel: context.textChannel,
        firstEntryUrl: firstPlayableEntry.url,
        playlistTitle: playlistData.playlistTitle,
        spotifyPlugin,
        remainingSeedTracks,
      });
    } else {
      this.clearProgressivePlaylistLoad(context.guildId, 'spotify_single_entry_playlist');
    }

    const firstTrackLabel = updatedQueue?.songs[0]?.name ?? firstPlayableEntry.title ?? rawInput.trim();
    const totalEntries = playlistData.tracks.length;
    const playlistLabel = playlistData.playlistTitle
      ? `**${playlistData.playlistTitle}**`
      : 'la playlist de Spotify';
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
export function createMusicSourceSpotifyPlaylistService(
  deps: MusicSourceSpotifyPlaylistServiceDeps,
): MusicSourceSpotifyPlaylistService {
  return new MusicSourceSpotifyPlaylistService(deps);
}
