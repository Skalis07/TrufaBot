/**
 * @file src/modules/music/services/music-service.ts
 * @description Servicio fachada principal del modulo de musica: compone subservicios y expone API de alto nivel para comandos/UI.
 */
import type {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
} from 'discord.js';
import { RepeatMode, type Queue } from 'distube';
import { type LoopModeName } from '../constants.js';
import { type AutoplayCandidate } from '../domain/autoplay-candidate-utils.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import { getMusicPlayer } from '../music-player.js';
import { readPositiveTimeoutMs } from '../shared/runtime-utils.js';
import { musicControlMessageService } from './control-message-service.js';
import { AutoplayService } from './autoplay-service.js';
import { GuildActionLockService } from './guild-action-lock-service.js';
import { musicInactivityService } from './inactivity-disconnect-service.js';
import { MusicSourceService, type ProgressivePlaylistLoadState } from './music-source-service.js';
import { createMusicActionRunnerService } from './music-action-runner-service.js';
import { createMusicPlaybackCommandService } from './music-playback-command-service.js';
import { createMusicPlayQueueCommandService } from './music-play-queue-command-service.js';
import { createMusicReadService } from './music-read-service.js';
import { createMusicSessionCommandService } from './music-session-command-service.js';
import {
  createMusicVoiceContextService,
  type VoiceContext,
} from './music-voice-context-service.js';

type MusicInteraction = ChatInputCommandInteraction | ButtonInteraction;

type AutoplayRecentTrack = AutoplayCandidate & {
  addedAt: number;
};

type AutoplayPrefetchState = {
  token: symbol;
  seedKey: string;
  seedName: string;
  startedAt: number;
  status: 'pending' | 'ready' | 'empty' | 'failed';
  candidate: AutoplayCandidate | null;
  promise: Promise<AutoplayCandidate | null>;
};

// Mapa de traduccion entre strings de comando/UI y enum de DisTube.
const LOOP_MODE_TO_REPEAT: Record<LoopModeName, RepeatMode> = {
  off: RepeatMode.DISABLED,
  track: RepeatMode.SONG,
  queue: RepeatMode.QUEUE,
};

const DEFAULT_AUTOPLAY_RECENT_LIMIT = 20;
const DEFAULT_AUTOPLAY_RECENT_TTL_MS = 45 * 60_000;
const DEFAULT_AUTOPLAY_RANDOM_POOL_SIZE = 5;
const DEFAULT_PLAYLIST_PROGRESSIVE_FLAT_TIMEOUT_MS = 30_000;
const DEFAULT_PLAYLIST_PROGRESSIVE_MAX_ENTRIES = 200;
const DEFAULT_PLAYLIST_PROGRESSIVE_BATCH_DELAY_MS = 250;

function isMusicUserError(error: unknown): error is MusicUserError {
  // Type guard para distinguir errores de validacion (usuario) de errores tecnicos.
  return error instanceof MusicUserError;
}

function isDisTubeNoResultError(error: unknown): error is { errorCode: 'NO_RESULT'; message: string } {
  // Distube lanza errores propios con `errorCode`. Nos interesa detectar `NO_RESULT`
  // para responder algo amigable en vez de un error generico.
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeError = error as { errorCode?: unknown; message?: unknown };
  return maybeError.errorCode === 'NO_RESULT' && typeof maybeError.message === 'string';
}

export function getMusicErrorMessage(error: unknown): string {
  // Devuelve mensaje amigable para el usuario y loguea errores inesperados.
  if (isMusicUserError(error)) {
    return error.message;
  }

  if (isDisTubeNoResultError(error)) {
    return 'No encontre resultados para esa busqueda/URL. Prueba con otro termino o una URL directa.';
  }

  const errorMessage = error instanceof Error ? error.message : String(error);
  musicLogger.error({ event: 'unexpected_error', errorMessage }, 'unexpected music error');
  return 'Se produjo un error ejecutando el comando de musica.';
}

class MusicService {
  // Servicio dedicado para exclusión mutua por guild (extraído para reducir responsabilidades).
  private readonly guildActionLockService = new GuildActionLockService();
  private readonly musicActionRunnerService = createMusicActionRunnerService();
  private readonly musicVoiceContextService = createMusicVoiceContextService({
    getQueue: (guildId) => this.player.getQueue(guildId),
  });
  private readonly musicReadService = createMusicReadService({
    // Orquesta la ejecucion completa con logging y control de errores.
    runLoggedAction: (interaction, action, task) => this.runLoggedAction(interaction, action, task),
    getVoiceContext: (interaction, options) => this.getVoiceContext(interaction, options),
    getRequestedByLabelForQueueSong: (guildId, song) => this.getRequestedByLabelForQueueSong(guildId, song),
    getAutoplayPrefetchDisplay: (guildId) => this.getAutoplayPrefetchDisplay(guildId),
  });
  private readonly musicPlaybackCommandService = createMusicPlaybackCommandService({
    // Orquesta la ejecucion completa con logging y control de errores.
    runLoggedAction: (interaction, action, task) => this.runLoggedAction(interaction, action, task),
    getVoiceContext: (interaction, options) => this.getVoiceContext(interaction, options),
    withGuildLock: (guildId, task) => this.withGuildLock(guildId, task),
    requireQueue: (context) => this.requireQueue(context),
    getQueue: (guildId) => this.player.getQueue(guildId),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
    loopModeToRepeat: LOOP_MODE_TO_REPEAT,
  });
  private readonly musicSessionCommandService = createMusicSessionCommandService({
    // Orquesta la ejecucion completa con logging y control de errores.
    runLoggedAction: (interaction, action, task) => this.runLoggedAction(interaction, action, task),
    getVoiceContext: (interaction, options) => this.getVoiceContext(interaction, options),
    withGuildLock: (guildId, task) => this.withGuildLock(guildId, task),
    requireQueue: (context) => this.requireQueue(context),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncIdlePanel: (guildId, options) => musicControlMessageService.syncIdle(guildId, options),
    // Conecta el bot al canal de voz del usuario.
    joinVoiceChannel: (voiceChannel) => this.player.voices.join(voiceChannel),
    hasVoiceConnection: (guildId) => Boolean(this.player.voices.get(guildId)),
    // Cierra sesion de voz y libera estado asociado.
    leaveVoiceChannel: (guildId) => this.player.voices.leave(guildId),
    suppressAutoplayContinuationOnDeleteQueue: (guildId, reason) =>
      this.suppressAutoplayContinuationOnDeleteQueue(guildId, reason),
    // Limpia o invalida estado temporal asociado a la operacion.
    clearAutoplayPrefetch: (guildId, reason) => this.clearAutoplayPrefetch(guildId, reason),
    // Limpia o invalida estado temporal asociado a la operacion.
    clearProgressivePlaylistLoad: (guildId, reason) => this.clearProgressivePlaylistLoad(guildId, reason),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncAutoplayPrefetchForQueue: (queue) => this.syncAutoplayPrefetchForQueue(queue),
    // Limpia o invalida estado temporal asociado a la operacion.
    clearAutoplayRecentHistory: (guildId) => {
      this.autoplayRecentByGuild.delete(guildId);
    },
    // Limpia o invalida estado temporal asociado a la operacion.
    clearGuildInactivityTimers: (guildId, reason) => musicInactivityService.clearGuildTimers(guildId, reason),
  });
  private readonly musicPlayQueueCommandService = createMusicPlayQueueCommandService({
    // Orquesta la ejecucion completa con logging y control de errores.
    runLoggedAction: (interaction, action, task) => this.runLoggedAction(interaction, action, task),
    getVoiceContext: (interaction, options) => this.getVoiceContext(interaction, options),
    withGuildLock: (guildId, task) => this.withGuildLock(guildId, task),
    requireQueue: (context) => this.requireQueue(context),
    getQueue: (guildId) => this.player.getQueue(guildId),
    playerPlay: (voiceChannel, source, options) => this.player.play(voiceChannel, source, options),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
    tryPlayYouTubePlaylistProgressively: (params) => this.tryPlayYouTubePlaylistProgressively(params),
    tryPlaySpotifyPlaylistProgressively: (params) => this.tryPlaySpotifyPlaylistProgressively(params),
    // Resuelve entradas externas a una fuente reproducible o usable.
    resolveSpotifyTrackToPlayableSourceWithYtDlp: (inputUrl) =>
      this.resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl),
    // Resuelve entradas externas a una fuente reproducible o usable.
    resolveFirstSearchUrlWithYtDlp: (input) => this.resolveFirstSearchUrlWithYtDlp(input),
    // Limpia o invalida estado temporal asociado a la operacion.
    clearAutoplayPrefetch: (guildId, reason) => this.clearAutoplayPrefetch(guildId, reason),
    // Limpia o invalida estado temporal asociado a la operacion.
    clearAutoplayContinuationAutoplayRecheck: (guildId, reason) =>
      this.clearAutoplayContinuationAutoplayRecheck(guildId, reason),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncAutoplayPrefetchForQueue: (queue) => this.syncAutoplayPrefetchForQueue(queue),
    getAutoplayFallbackCandidateWithPrefetch: (queue, seedSong) =>
      this.getAutoplayFallbackCandidateWithPrefetch(queue, seedSong),
    // Guarda contexto/historial para decisiones posteriores.
    rememberAutoplayTrack: (guildId, track) => this.rememberAutoplayTrack(guildId, track),
    // Limpia o invalida estado temporal asociado a la operacion.
    clearAutoplayRecentHistory: (guildId) => {
      this.autoplayRecentByGuild.delete(guildId);
    },
  });
  private readonly lastStartedSongByGuild = new Map<string, Queue['songs'][number]>();
  private readonly autoplayRecentByGuild = new Map<string, AutoplayRecentTrack[]>();
  private readonly autoplayPrefetchByGuild = new Map<string, AutoplayPrefetchState>();
  private readonly progressivePlaylistLoadsByGuild = new Map<string, ProgressivePlaylistLoadState>();
  private readonly autoplayContinuationAutoplayRecheckTokenByGuild = new Map<string, symbol>();
  private readonly autoplayDeleteQueueContinuationSuppressionByGuild = new Map<
    string,
    { reason: string; createdAt: number; expiresAt: number }
  >();
  private readonly autoplayRecentLimit = Math.max(
    5,
    readPositiveTimeoutMs('MUSIC_AUTOPLAY_RECENT_LIMIT', DEFAULT_AUTOPLAY_RECENT_LIMIT),
  );
  private readonly autoplayRecentTtlMs = readPositiveTimeoutMs(
    'MUSIC_AUTOPLAY_RECENT_TTL_MS',
    DEFAULT_AUTOPLAY_RECENT_TTL_MS,
  );
  private readonly autoplayRandomPoolSize = Math.max(
    1,
    Math.min(
      10,
      readPositiveTimeoutMs('MUSIC_AUTOPLAY_RANDOM_POOL_SIZE', DEFAULT_AUTOPLAY_RANDOM_POOL_SIZE),
    ),
  );
  private readonly playlistProgressiveFlatTimeoutMs = readPositiveTimeoutMs(
    'MUSIC_PLAYLIST_PROGRESSIVE_FLAT_TIMEOUT_MS',
    DEFAULT_PLAYLIST_PROGRESSIVE_FLAT_TIMEOUT_MS,
  );
  private readonly playlistProgressiveMaxEntries = Math.max(
    2,
    Math.min(
      1_000,
      readPositiveTimeoutMs(
        'MUSIC_PLAYLIST_PROGRESSIVE_MAX_ENTRIES',
        DEFAULT_PLAYLIST_PROGRESSIVE_MAX_ENTRIES,
      ),
    ),
  );
  private readonly playlistProgressiveBatchDelayMs = Math.max(
    0,
    Math.min(
      10_000,
      readPositiveTimeoutMs(
        'MUSIC_PLAYLIST_PROGRESSIVE_BATCH_DELAY_MS',
        DEFAULT_PLAYLIST_PROGRESSIVE_BATCH_DELAY_MS,
      ),
    ),
  );


  private readonly autoplayService = new AutoplayService({
    lastStartedSongByGuild: this.lastStartedSongByGuild,
    autoplayRecentByGuild: this.autoplayRecentByGuild,
    autoplayPrefetchByGuild: this.autoplayPrefetchByGuild,
    autoplayContinuationAutoplayRecheckTokenByGuild: this.autoplayContinuationAutoplayRecheckTokenByGuild,
    autoplayDeleteQueueContinuationSuppressionByGuild: this.autoplayDeleteQueueContinuationSuppressionByGuild,
    autoplayRecentLimit: this.autoplayRecentLimit,
    autoplayRecentTtlMs: this.autoplayRecentTtlMs,
    autoplayRandomPoolSize: this.autoplayRandomPoolSize,
    playlistProgressiveFlatTimeoutMs: this.playlistProgressiveFlatTimeoutMs,
    withGuildLock: (guildId, task) => this.withGuildLock(guildId, task),
    getBundledYtDlpExecutablePath: () => this.getBundledYtDlpExecutablePath(),
  });

  private readonly musicSourceService = new MusicSourceService({
    progressivePlaylistLoadsByGuild: this.progressivePlaylistLoadsByGuild,
    playlistProgressiveFlatTimeoutMs: this.playlistProgressiveFlatTimeoutMs,
    playlistProgressiveMaxEntries: this.playlistProgressiveMaxEntries,
    playlistProgressiveBatchDelayMs: this.playlistProgressiveBatchDelayMs,
    extractResolvableUrlsFromYtDlpResult: (resolved) =>
      this.autoplayService.extractResolvableUrlsFromYtDlpResult(resolved),
    // Sincroniza estado interno con panel/UI u otros servicios.
    syncNowPlayingPanel: (queue) => this.autoplayService.syncNowPlayingPanel(queue),
  });

  private get player() {
    // Acceso lazy al singleton de DisTube ya inicializado en `index.ts`.
    return getMusicPlayer();
  }

  // Verifica precondiciones tecnicas antes de continuar el flujo.
  verifyBundledYtDlpBinaryOnStartup(): void {
    this.musicSourceService.verifyBundledYtDlpBinaryOnStartup();
  }

  isGuildBusy(guildId: string): boolean {
    // Expuesto para que la capa de botones pueda dar mejor feedback UX cuando una
    // accion larga (ej. autoplay fallback) sigue ejecutandose.
    return this.guildActionLockService.isLocked(guildId);
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  private async resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl: string): Promise<string | null> {
    return this.musicSourceService.resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl);
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  private async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string> {
    return this.musicSourceService.resolveFirstSearchUrlWithYtDlp(input);
  }

  private getBundledYtDlpExecutablePath(): string {
    return this.musicSourceService.getBundledYtDlpExecutablePath();
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearProgressivePlaylistLoad(guildId: string, reason: string): void {
    this.musicSourceService.clearProgressivePlaylistLoad(guildId, reason);
  }

  private async tryPlayYouTubePlaylistProgressively(params: {
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null> {
    return this.musicSourceService.tryPlayYouTubePlaylistProgressively(params);
  }

  private async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null> {
    return this.musicSourceService.tryPlaySpotifyPlaylistProgressively(params);
  }

  // Guarda contexto/historial para decisiones posteriores.
  private rememberAutoplayTrack(guildId: string, track: AutoplayCandidate): void {
    this.autoplayService.rememberAutoplayTrack(guildId, track);
  }

  private getRequestedByLabelForQueueSong(
    guildId: string,
    song: Queue['songs'][number] | undefined,
  ): string {
    return this.autoplayService.getRequestedByLabelForQueueSong(guildId, song);
  }

  // Guarda contexto/historial para decisiones posteriores.
  rememberStartedQueueSong(queue: Queue): void {
    this.autoplayService.rememberStartedQueueSong(queue);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearAutoplayPrefetch(guildId: string, reason: string): void {
    this.autoplayService.clearAutoplayPrefetch(guildId, reason);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  private clearAutoplayContinuationAutoplayRecheck(guildId: string, reason: string): void {
    this.autoplayService.clearAutoplayContinuationAutoplayRecheck(guildId, reason);
  }

  suppressAutoplayContinuationOnDeleteQueue(guildId: string, reason: string): void {
    this.autoplayService.suppressAutoplayContinuationOnDeleteQueue(guildId, reason);
  }

  // Consume estado transitorio de un solo uso.
  consumeAutoplayDeleteQueueContinuationSuppression(guildId: string) {
    return this.autoplayService.consumeAutoplayDeleteQueueContinuationSuppression(guildId);
  }

  private getAutoplayPrefetchDisplay(guildId: string) {
    return this.autoplayService.getAutoplayPrefetchDisplay(guildId);
  }

  getNowPlayingPanelOptions(queue: Queue) {
    return this.autoplayService.getNowPlayingPanelOptions(queue);
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  private async syncNowPlayingPanel(queue: Queue): Promise<void> {
    await this.autoplayService.syncNowPlayingPanel(queue);
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  syncAutoplayPrefetchForQueue(queue: Queue): void {
    this.autoplayService.syncAutoplayPrefetchForQueue(queue);
  }

  private async getAutoplayFallbackCandidateWithPrefetch(
    queue: Queue,
    seedSong: Queue['songs'][number],
  ): Promise<AutoplayCandidate | null> {
    return this.autoplayService.getAutoplayFallbackCandidateWithPrefetch(queue, seedSong);
  }

  // Continua el flujo automaticamente tras un evento terminal.
  async continueAutoplayAfterFinish(
    queue: Queue,
    context: 'finish' | 'delete_queue' = 'finish',
  ): Promise<boolean> {
    return this.autoplayService.continueAutoplayAfterFinish(queue, context);
  }

  // Orquesta la ejecucion completa con logging y control de errores.
  private async runLoggedAction(
    interaction: MusicInteraction,
    action: string,
    task: () => Promise<string>,
  ): Promise<string> {
    return this.musicActionRunnerService.run(interaction, action, task);
  }

  private async withGuildLock<T>(guildId: string, task: () => Promise<T>): Promise<T> {
    // Wrapper temporal para no tocar todos los call-sites del servicio en un solo refactor.
    return this.guildActionLockService.runWithLock(guildId, task);
  }

  private async getVoiceContext(
    interaction: MusicInteraction,
    options?: {
      requireQueue?: boolean;
    },
  ): Promise<VoiceContext> {
    return this.musicVoiceContextService.getVoiceContext(interaction, options);
  }

  private requireQueue(context: VoiceContext): Queue {
    return this.musicVoiceContextService.requireQueue(context);
  }

  // Conecta el bot al canal de voz del usuario.
  async join(interaction: ChatInputCommandInteraction): Promise<string> {
    return this.musicSessionCommandService.join(interaction);
  }

  async play(interaction: ChatInputCommandInteraction, rawInput: string): Promise<string> {
    return this.musicPlayQueueCommandService.play(interaction, rawInput);
  }

  // Pausa la reproduccion activa del guild.
  async pause(interaction: MusicInteraction): Promise<string> {
    return this.musicPlaybackCommandService.pause(interaction);
  }

  // Reanuda reproduccion pausada manteniendo el contexto.
  async resume(interaction: MusicInteraction): Promise<string> {
    return this.musicPlaybackCommandService.resume(interaction);
  }

  async togglePauseResume(interaction: MusicInteraction): Promise<string> {
    return this.musicPlaybackCommandService.togglePauseResume(interaction);
  }

  // Avanza pista y aplica fallback si corresponde.
  async skip(interaction: MusicInteraction): Promise<string> {
    return this.musicPlayQueueCommandService.skip(interaction);
  }

  async back(interaction: MusicInteraction): Promise<string> {
    return this.musicPlaybackCommandService.back(interaction);
  }

  async setAutoplay(interaction: MusicInteraction, enabled?: boolean): Promise<string> {
    return this.musicPlayQueueCommandService.setAutoplay(interaction, enabled);
  }

  async setLoopMode(interaction: MusicInteraction, loopMode?: LoopModeName): Promise<string> {
    return this.musicPlaybackCommandService.setLoopMode(interaction, loopMode);
  }

  async rewind(interaction: MusicInteraction, requestedSeconds?: number): Promise<string> {
    return this.musicPlaybackCommandService.rewind(interaction, requestedSeconds);
  }

  async forward(interaction: MusicInteraction, requestedSeconds?: number): Promise<string> {
    return this.musicPlaybackCommandService.forward(interaction, requestedSeconds);
  }

  async replay(interaction: MusicInteraction): Promise<string> {
    return this.musicPlaybackCommandService.replay(interaction);
  }

  async stop(interaction: MusicInteraction): Promise<string> {
    return this.musicSessionCommandService.stop(interaction);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  async clearQueue(interaction: MusicInteraction): Promise<string> {
    return this.musicSessionCommandService.clearQueue(interaction);
  }

  // Cierra sesion de voz y libera estado asociado.
  async quit(interaction: ChatInputCommandInteraction): Promise<string> {
    return this.musicSessionCommandService.quit(interaction);
  }

  async setVolume(interaction: MusicInteraction, requestedVolume?: number): Promise<string> {
    return this.musicPlaybackCommandService.setVolume(interaction, requestedVolume);
  }

  async getNowPlayingSummary(interaction: MusicInteraction): Promise<string> {
    return this.musicReadService.getNowPlayingSummary(interaction);
  }

  async getQueueSummary(interaction: MusicInteraction, requestedPage?: number): Promise<string> {
    return this.musicReadService.getQueueSummary(interaction, requestedPage);
  }
}

// Instancia singleton para reutilizar la misma logica desde slash commands y botones.
export const musicService = new MusicService();
