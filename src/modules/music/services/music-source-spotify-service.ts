/**
 * @file src/modules/music/services/music-source-spotify-service.ts
 * @description Integracion de fuentes Spotify (track/playlist) sobre adapters de resolucion actuales.
 */
import type { GuildMember, GuildTextBasedChannel, VoiceBasedChannel } from 'discord.js';
import type { Queue } from 'distube';
import { isSpotifyTrackUrl, isYtDlpSearchInput } from '../domain/source-url-utils.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import { getMusicPlayer } from '../music-player.js';
import {
  createMusicSourceSpotifyPlaylistService,
} from './music-source-spotify-playlist-service.js';

export type ProgressivePlaylistLoadState = {
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

type SpotifyPluginLike = {
  validate: (url: string) => boolean;
  resolve: (url: string, options?: object) => Promise<unknown>;
  createSearchQuery: (song: { name?: string; uploader?: { name?: string } }) => string;
};

type MusicSourceSpotifyServiceDeps = {
  progressivePlaylistLoadsByGuild: Map<string, ProgressivePlaylistLoadState>;
  playlistProgressiveBatchDelayMs: number;
  resolveFirstSearchUrlWithYtDlp: (input: string) => Promise<string>;
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  clearProgressivePlaylistLoad: (guildId: string, reason: string) => void;
};

export class MusicSourceSpotifyService {
  private readonly musicSourceSpotifyPlaylistService: ReturnType<
    typeof createMusicSourceSpotifyPlaylistService
  >;

  constructor(private readonly deps: MusicSourceSpotifyServiceDeps) {
    this.musicSourceSpotifyPlaylistService = createMusicSourceSpotifyPlaylistService({
      progressivePlaylistLoadsByGuild: deps.progressivePlaylistLoadsByGuild,
      playlistProgressiveBatchDelayMs: deps.playlistProgressiveBatchDelayMs,
      getSpotifyPlugin: () => this.getSpotifyPlugin(),
      // Resuelve entradas externas a una fuente reproducible o usable.
      resolveFirstSearchUrlWithYtDlp: (input) => this.resolveFirstSearchUrlWithYtDlp(input),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
      // Limpia o invalida estado temporal asociado a la operacion.
      clearProgressivePlaylistLoad: (guildId, reason) => this.clearProgressivePlaylistLoad(guildId, reason),
    });
  }

  private get player() {
    return getMusicPlayer();
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

  private getSpotifyPlugin(): SpotifyPluginLike | undefined {
    // Buscamos por nombre de constructor para evitar acoplar tipos runtime de CJS/ESM.
    return this.player.plugins.find(
      (candidate) =>
        candidate.constructor?.name === 'SpotifyPlugin' &&
        typeof (candidate as { resolve?: unknown }).resolve === 'function' &&
        typeof (candidate as { createSearchQuery?: unknown }).createSearchQuery === 'function',
    ) as SpotifyPluginLike | undefined;
  }

  private extractFirstSpotifySongLikeFromResolvedResult(
    resolved: unknown,
  ): { name?: string; uploader?: { name?: string } } | null {
    if (typeof resolved !== 'object' || resolved === null) {
      return null;
    }

    const maybePlaylist = resolved as {
      songs?: Array<{ name?: unknown; uploader?: { name?: unknown } }>;
    };
    if (Array.isArray(maybePlaylist.songs) && maybePlaylist.songs.length > 0) {
      const firstSong = maybePlaylist.songs[0];
      if (typeof firstSong?.name === 'string') {
        return {
          name: firstSong.name,
          ...(firstSong.uploader && typeof firstSong.uploader.name === 'string'
            ? { uploader: { name: firstSong.uploader.name } }
            : {}),
        };
      }
    }

    const maybeSong = resolved as { name?: unknown; uploader?: { name?: unknown } };
    if (typeof maybeSong.name !== 'string') {
      return null;
    }

    return {
      name: maybeSong.name,
      ...(maybeSong.uploader && typeof maybeSong.uploader.name === 'string'
        ? { uploader: { name: maybeSong.uploader.name } }
        : {}),
    };
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  async resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl: string): Promise<string | null> {
    if (!isSpotifyTrackUrl(inputUrl)) {
      return null;
    }

    const spotifyPlugin = this.getSpotifyPlugin();
    if (!spotifyPlugin || !spotifyPlugin.validate(inputUrl)) {
      return null;
    }

    const resolved = await spotifyPlugin.resolve(inputUrl, {});
    const spotifySong = this.extractFirstSpotifySongLikeFromResolvedResult(resolved);
    if (!spotifySong) {
      throw new MusicUserError('No pude resolver la pista de Spotify para reproducirla.');
    }
    if (!spotifySong.uploader?.name) {
      throw new MusicUserError('No pude obtener el artista de la pista de Spotify para buscarla.');
    }

    const searchQuery = spotifyPlugin.createSearchQuery(spotifySong);
    const ytDlpSearchInput = isYtDlpSearchInput(searchQuery) ? searchQuery : `ytsearch:${searchQuery}`;
    const playableUrl = await this.resolveFirstSearchUrlWithYtDlp(ytDlpSearchInput);

    musicLogger.info(
      {
        event: 'spotify_track_fallback_resolved',
        spotifyInput: inputUrl,
        searchQuery,
        playableUrl,
      },
      'resolved spotify track via yt-dlp fallback',
    );

    return playableUrl;
  }

  async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }): Promise<string | null> {
    return this.musicSourceSpotifyPlaylistService.tryPlaySpotifyPlaylistProgressively(params);
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicSourceSpotifyService(
  deps: MusicSourceSpotifyServiceDeps,
): MusicSourceSpotifyService {
  return new MusicSourceSpotifyService(deps);
}
