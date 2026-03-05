/**
 * @file src/modules/music/services/music-source-service.ts
 * @description Facade de resolucion de fuentes (YouTube/Spotify/busquedas) y carga progresiva de playlists.
 */
import type { GuildMember, GuildTextBasedChannel, VoiceBasedChannel } from 'discord.js';
import type { Queue } from 'distube';
import { musicLogger } from '../logger.js';
import {
  createMusicSourceYtDlpService,
  type FlatPlaylistEntry,
} from './music-source-ytdlp-service.js';
import { createMusicSourceSpotifyService } from './music-source-spotify-service.js';
import { createMusicSourceYouTubePlaylistService } from './music-source-youtube-playlist-service.js';

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

type MusicSourceServiceDeps = {
  progressivePlaylistLoadsByGuild: Map<string, ProgressivePlaylistLoadState>;
  playlistProgressiveFlatTimeoutMs: number;
  playlistProgressiveMaxEntries: number;
  playlistProgressiveBatchDelayMs: number;
  extractResolvableUrlsFromYtDlpResult: (resolved: unknown) => string[];
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
};

export class MusicSourceService {
  private readonly musicSourceYtDlpService: ReturnType<typeof createMusicSourceYtDlpService>;
  private readonly musicSourceSpotifyService: ReturnType<typeof createMusicSourceSpotifyService>;
  private readonly musicSourceYouTubePlaylistService: ReturnType<typeof createMusicSourceYouTubePlaylistService>;

  constructor(private readonly deps: MusicSourceServiceDeps) {
    this.musicSourceYtDlpService = createMusicSourceYtDlpService({
      playlistProgressiveFlatTimeoutMs: deps.playlistProgressiveFlatTimeoutMs,
      playlistProgressiveMaxEntries: deps.playlistProgressiveMaxEntries,
      extractResolvableUrlsFromYtDlpResult: deps.extractResolvableUrlsFromYtDlpResult,
    });
    this.musicSourceSpotifyService = createMusicSourceSpotifyService({
      progressivePlaylistLoadsByGuild: deps.progressivePlaylistLoadsByGuild,
      playlistProgressiveBatchDelayMs: deps.playlistProgressiveBatchDelayMs,
      // Resuelve entradas externas a una fuente reproducible o usable.
      resolveFirstSearchUrlWithYtDlp: (input) => this.resolveFirstSearchUrlWithYtDlp(input),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
      // Limpia o invalida estado temporal asociado a la operacion.
      clearProgressivePlaylistLoad: (guildId, reason) =>
        this.clearProgressivePlaylistLoadInternal(guildId, reason),
    });
    this.musicSourceYouTubePlaylistService = createMusicSourceYouTubePlaylistService({
      progressivePlaylistLoadsByGuild: deps.progressivePlaylistLoadsByGuild,
      playlistProgressiveBatchDelayMs: deps.playlistProgressiveBatchDelayMs,
      loadYouTubeFlatPlaylistEntries: (inputUrl) => this.loadYouTubeFlatPlaylistEntries(inputUrl),
      reorderYouTubePlaylistEntriesForInput: (inputUrl, entries) =>
        this.reorderYouTubePlaylistEntriesForInput(inputUrl, entries),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
      // Limpia o invalida estado temporal asociado a la operacion.
      clearProgressivePlaylistLoad: (guildId, reason) =>
        this.clearProgressivePlaylistLoadInternal(guildId, reason),
    });
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get progressivePlaylistLoadsByGuild() {
    return this.deps.progressivePlaylistLoadsByGuild;
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  private async syncNowPlayingPanel(queue: Queue): Promise<void> {
    await this.deps.syncNowPlayingPanel(queue);
  }

  // Verifica precondiciones tecnicas antes de continuar el flujo.
  verifyBundledYtDlpBinaryOnStartup(): void {
    this.musicSourceYtDlpService.verifyBundledYtDlpBinaryOnStartup();
  }
  // Resuelve entradas externas a una fuente reproducible o usable.
  async resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl: string): Promise<string | null> {
    return this.musicSourceSpotifyService.resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl);
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string> {
    return this.musicSourceYtDlpService.resolveFirstSearchUrlWithYtDlp(input);
  }

  getBundledYtDlpExecutablePath(): string {
    return this.musicSourceYtDlpService.getBundledYtDlpExecutablePath();
  }

  private async loadYouTubeFlatPlaylistEntries(inputUrl: string): Promise<{
    playlistId: string;
    playlistTitle: string | null;
    entries: FlatPlaylistEntry[];
  }> {
    return this.musicSourceYtDlpService.loadYouTubeFlatPlaylistEntries(inputUrl);
  }

  private reorderYouTubePlaylistEntriesForInput(inputUrl: string, entries: FlatPlaylistEntry[]): FlatPlaylistEntry[] {
    return this.musicSourceYtDlpService.reorderYouTubePlaylistEntriesForInput(inputUrl, entries);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  private clearProgressivePlaylistLoadInternal(guildId: string, reason: string): void {
    const active = this.progressivePlaylistLoadsByGuild.get(guildId);
    if (!active) {
      return;
    }

    this.progressivePlaylistLoadsByGuild.delete(guildId);
    musicLogger.debug(
      {
        event: 'progressive_playlist_load_cleared',
        guildId,
        reason,
        ageMs: Date.now() - active.startedAt,
        totalEntries: active.totalEntries,
        addedEntries: active.addedEntries,
        playlistTitle: active.playlistTitle,
      },
      'progressive playlist loader cleared',
    );
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearProgressivePlaylistLoad(guildId: string, reason: string): void {
    // API publica para eventos/comandos destructivos (`clear`, `stop`, `quit`, disconnect).
    this.clearProgressivePlaylistLoadInternal(guildId, reason);
  }

  async tryPlayYouTubePlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null> {
    return this.musicSourceYouTubePlaylistService.tryPlayYouTubePlaylistProgressively(params);
  }

  async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null> {
    return this.musicSourceSpotifyService.tryPlaySpotifyPlaylistProgressively(params);
  }
}
