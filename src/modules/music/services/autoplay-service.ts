/**
 * @file src/modules/music/services/autoplay-service.ts
 * @description Facade principal de autoplay: integra historial, prefetch, resolucion y continuidad para el resto del sistema.
 */
import { type Queue } from 'distube';
import {
  type AutoplayCandidate,
} from '../domain/autoplay-candidate-utils.js';
import { getMusicPlayer } from '../music-player.js';
import { musicControlMessageService } from './control-message-service.js';
import { AutoplayHistoryService } from './autoplay-history-service.js';
import { AutoplayCandidateResolverService } from './autoplay-candidate-resolver-service.js';
import { createAutoplayContinuationService } from './autoplay-continuation-service.js';
import {
  createAutoplayPrefetchReadService,
  type AutoplayPrefetchDisplay,
} from './autoplay-prefetch-read-service.js';
import { createAutoplayPrefetchStateService } from './autoplay-prefetch-state-service.js';
import {
  createAutoplayPrefetchCandidateAccessService,
  type AutoplayPrefetchDebugSnapshot,
} from './autoplay-prefetch-candidate-access-service.js';
import {
  createAutoplayContinuationGuardService,
  type AutoplayDeleteQueueContinuationSuppression,
} from './autoplay-continuation-guard-service.js';
import { createAutoplayPrefetchOrchestratorService } from './autoplay-prefetch-orchestrator-service.js';

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

type AutoplayServiceDeps = {
  lastStartedSongByGuild: Map<string, Queue['songs'][number]>;
  autoplayRecentByGuild: Map<string, AutoplayRecentTrack[]>;
  autoplayPrefetchByGuild: Map<string, AutoplayPrefetchState>;
  autoplayContinuationAutoplayRecheckTokenByGuild: Map<string, symbol>;
  autoplayDeleteQueueContinuationSuppressionByGuild: Map<string, AutoplayDeleteQueueContinuationSuppression>;
  autoplayRecentLimit: number;
  autoplayRecentTtlMs: number;
  autoplayRandomPoolSize: number;
  playlistProgressiveFlatTimeoutMs: number;
  withGuildLock: <T>(guildId: string, task: () => Promise<T>) => Promise<T>;
  getBundledYtDlpExecutablePath: () => string;
};

export class AutoplayService {
  private readonly autoplayHistoryService: AutoplayHistoryService;
  private readonly autoplayCandidateResolverService: AutoplayCandidateResolverService;
  private readonly autoplayContinuationService;
  private readonly autoplayContinuationGuardService;
  private readonly autoplayPrefetchReadService;
  private readonly autoplayPrefetchStateService;
  private readonly autoplayPrefetchCandidateAccessService;
  private readonly autoplayPrefetchOrchestratorService;

  constructor(private readonly deps: AutoplayServiceDeps) {
    this.autoplayHistoryService = new AutoplayHistoryService({
      lastStartedSongByGuild: this.deps.lastStartedSongByGuild,
      autoplayRecentByGuild: this.deps.autoplayRecentByGuild,
      autoplayRecentLimit: this.deps.autoplayRecentLimit,
      autoplayRecentTtlMs: this.deps.autoplayRecentTtlMs,
    });

    this.autoplayCandidateResolverService = new AutoplayCandidateResolverService({
      autoplayRandomPoolSize: this.deps.autoplayRandomPoolSize,
      playlistProgressiveFlatTimeoutMs: this.deps.playlistProgressiveFlatTimeoutMs,
      getBundledYtDlpExecutablePath: () => this.deps.getBundledYtDlpExecutablePath(),
      collectAutoplayReferenceCandidates: (queue) =>
        this.autoplayHistoryService.collectAutoplayReferenceCandidates(queue),
    });

    this.autoplayContinuationGuardService = createAutoplayContinuationGuardService({
      autoplayContinuationAutoplayRecheckTokenByGuild:
        this.deps.autoplayContinuationAutoplayRecheckTokenByGuild,
      autoplayDeleteQueueContinuationSuppressionByGuild:
        this.deps.autoplayDeleteQueueContinuationSuppressionByGuild,
      getQueue: (guildId) => this.player.getQueue(guildId),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncAutoplayPrefetchForQueue: (queue) => this.syncAutoplayPrefetchForQueue(queue),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
    });

    this.autoplayPrefetchReadService = createAutoplayPrefetchReadService({
      getAutoplayPrefetchState: (guildId) => this.autoplayPrefetchByGuild.get(guildId),
      getRequestedByLabelForQueueSong: (guildId, song) =>
        this.getRequestedByLabelForQueueSong(guildId, song),
    });

    this.autoplayPrefetchStateService = createAutoplayPrefetchStateService({
      autoplayPrefetchByGuild: this.autoplayPrefetchByGuild,
      // Limpia o invalida estado temporal asociado a la operacion.
      clearAutoplayContinuationAutoplayRecheck: (guildId, reason) =>
        this.clearAutoplayContinuationAutoplayRecheck(guildId, reason),
    });

    this.autoplayPrefetchCandidateAccessService = createAutoplayPrefetchCandidateAccessService({
      autoplayPrefetchByGuild: this.autoplayPrefetchByGuild,
      // Construye datos de trabajo para el siguiente paso del flujo.
      buildAutoplaySeedKey: (song) => this.buildAutoplaySeedKey(song),
      startAutoplayPrefetchForSeed: (queue, seedSong) => this.startAutoplayPrefetchForSeed(queue, seedSong),
      // Construye datos de trabajo para el siguiente paso del flujo.
      buildAutoplayFallbackCandidate: (queue, seedSong) =>
        this.buildAutoplayFallbackCandidate(queue, seedSong),
    });

    this.autoplayPrefetchOrchestratorService = createAutoplayPrefetchOrchestratorService({
      autoplayPrefetchByGuild: this.autoplayPrefetchByGuild,
      // Construye datos de trabajo para el siguiente paso del flujo.
      buildAutoplaySeedKey: (song) => this.buildAutoplaySeedKey(song),
      invalidateAutoplayPrefetch: (guildId, reason) => this.invalidateAutoplayPrefetch(guildId, reason),
      // Construye datos de trabajo para el siguiente paso del flujo.
      buildAutoplayFallbackCandidate: (queue, seedSong) =>
        this.buildAutoplayFallbackCandidate(queue, seedSong),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
      getQueue: (guildId) => this.player.getQueue(guildId),
    });

    this.autoplayContinuationService = createAutoplayContinuationService({
      withGuildLock: (guildId, task) => this.withGuildLock(guildId, task),
      getQueue: (guildId) => this.player.getQueue(guildId),
      playerPlay: (voiceChannel, source, options) => this.player.play(voiceChannel, source, options),
      getLastStartedSong: (guildId) => this.lastStartedSongByGuild.get(guildId),
      getAutoplayPrefetchDebugSnapshot: (guildId) => this.getAutoplayPrefetchDebugSnapshot(guildId),
      getAutoplayFallbackCandidateWithPrefetch: (queue, seedSong) =>
        this.getAutoplayFallbackCandidateWithPrefetch(queue, seedSong),
      getAutoplayFallbackCandidateFromExistingPrefetch: (guildId, context) =>
        this.getAutoplayFallbackCandidateFromExistingPrefetch(guildId, context),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncAutoplayPrefetchForQueue: (queue) => this.syncAutoplayPrefetchForQueue(queue),
      // Sincroniza estado interno con panel/UI u otros servicios.
      syncNowPlayingPanel: (queue) => this.syncNowPlayingPanel(queue),
      // Guarda contexto/historial para decisiones posteriores.
      rememberAutoplayTrack: (guildId, track) => this.rememberAutoplayTrack(guildId, track),
      // Programa ejecucion diferida de un recheck o timeout.
      scheduleAutoplayContinuationAutoplayRecheck: (guildId, context, expectedCandidate) =>
        this.scheduleAutoplayContinuationAutoplayRecheck(guildId, context, expectedCandidate),
    });
  }

  private get player() {
    return getMusicPlayer();
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get lastStartedSongByGuild() {
    return this.deps.lastStartedSongByGuild;
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get autoplayPrefetchByGuild() {
    return this.deps.autoplayPrefetchByGuild;
  }

  private withGuildLock<T>(guildId: string, task: () => Promise<T>): Promise<T> {
    return this.deps.withGuildLock(guildId, task);
  }

  extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[] {
    return this.autoplayCandidateResolverService.extractResolvableUrlsFromYtDlpResult(resolved);
  }

  // Guarda contexto/historial para decisiones posteriores.
  rememberAutoplayTrack(guildId: string, track: AutoplayCandidate): void {
    this.autoplayHistoryService.rememberAutoplayTrack(guildId, track);
  }

  getRequestedByLabelForQueueSong(
    guildId: string,
    song: Queue['songs'][number] | undefined,
  ): string {
    return this.autoplayHistoryService.getRequestedByLabelForQueueSong(guildId, song);
  }

  // Guarda contexto/historial para decisiones posteriores.
  rememberStartedQueueSong(queue: Queue): void {
    this.autoplayHistoryService.rememberStartedQueueSong(queue);
  }

  // Construye datos de trabajo para el siguiente paso del flujo.
  private buildAutoplaySeedKey(song: Queue['songs'][number]): string {
    return this.autoplayPrefetchStateService.buildAutoplaySeedKey(song);
  }

  private invalidateAutoplayPrefetch(guildId: string, reason: string): void {
    this.autoplayPrefetchStateService.invalidateAutoplayPrefetch(guildId, reason);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearAutoplayPrefetch(guildId: string, reason: string): void {
    this.autoplayPrefetchStateService.clearAutoplayPrefetch(guildId, reason);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearAutoplayContinuationAutoplayRecheck(guildId: string, reason: string): void {
    this.autoplayContinuationGuardService.clearAutoplayContinuationAutoplayRecheck(guildId, reason);
  }

  // Programa ejecucion diferida de un recheck o timeout.
  private scheduleAutoplayContinuationAutoplayRecheck(
    guildId: string,
    context: 'finish' | 'delete_queue',
    expectedCandidate: AutoplayCandidate,
  ): void {
    this.autoplayContinuationGuardService.scheduleAutoplayContinuationAutoplayRecheck(
      guildId,
      context,
      expectedCandidate,
    );
  }

  suppressAutoplayContinuationOnDeleteQueue(guildId: string, reason: string): void {
    this.autoplayContinuationGuardService.suppressAutoplayContinuationOnDeleteQueue(guildId, reason);
  }

  // Consume estado transitorio de un solo uso.
  consumeAutoplayDeleteQueueContinuationSuppression(guildId: string):
    | { reason: string; ageMs: number }
    | null {
    return this.autoplayContinuationGuardService.consumeAutoplayDeleteQueueContinuationSuppression(guildId);
  }

  getAutoplayPrefetchRecommendationLabel(guildId: string): string | null {
    return this.autoplayPrefetchReadService.getAutoplayPrefetchRecommendationLabel(guildId);
  }

  getAutoplayPrefetchDisplay(guildId: string): AutoplayPrefetchDisplay {
    return this.autoplayPrefetchReadService.getAutoplayPrefetchDisplay(guildId);
  }

  getNowPlayingPanelOptions(queue: Queue): {
    autoplayRecommendationLabel?: string;
    nextTrackFieldName?: string;
    requestedByLabel?: string;
  } {
    return this.autoplayPrefetchReadService.getNowPlayingPanelOptions(queue);
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  async syncNowPlayingPanel(queue: Queue): Promise<void> {
    await musicControlMessageService.syncNowPlaying(queue, this.getNowPlayingPanelOptions(queue));
  }

  private startAutoplayPrefetchForSeed(queue: Queue, seedSong: Queue['songs'][number]): void {
    this.autoplayPrefetchOrchestratorService.startAutoplayPrefetchForSeed(queue, seedSong);
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  syncAutoplayPrefetchForQueue(queue: Queue): void {
    this.autoplayPrefetchOrchestratorService.syncAutoplayPrefetchForQueue(queue);
  }

  async getAutoplayFallbackCandidateWithPrefetch(
    queue: Queue,
    seedSong: Queue['songs'][number],
  ): Promise<AutoplayCandidate | null> {
    return this.autoplayPrefetchCandidateAccessService.getAutoplayFallbackCandidateWithPrefetch(
      queue,
      seedSong,
    );
  }

  private getAutoplayPrefetchDebugSnapshot(guildId: string): AutoplayPrefetchDebugSnapshot {
    return this.autoplayPrefetchCandidateAccessService.getAutoplayPrefetchDebugSnapshot(guildId);
  }

  private async getAutoplayFallbackCandidateFromExistingPrefetch(
    guildId: string,
    context: 'finish' | 'delete_queue',
  ): Promise<AutoplayCandidate | null> {
    return this.autoplayPrefetchCandidateAccessService.getAutoplayFallbackCandidateFromExistingPrefetch(
      guildId,
      context,
    );
  }

  // Construye datos de trabajo para el siguiente paso del flujo.
  private async buildAutoplayFallbackCandidate(
    queue: Queue,
    seedSong?: Queue['songs'][number],
  ): Promise<AutoplayCandidate | null> {
    return this.autoplayCandidateResolverService.buildAutoplayFallbackCandidate(queue, seedSong);
  }

  // Continua el flujo automaticamente tras un evento terminal.
  async continueAutoplayAfterFinish(queue: Queue, context: 'finish' | 'delete_queue' = 'finish'): Promise<boolean> {
    return this.autoplayContinuationService.continueAutoplayAfterFinish(queue, context);
  }

}
