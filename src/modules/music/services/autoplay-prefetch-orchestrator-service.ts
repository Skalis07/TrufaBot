/**
 * @file src/modules/music/services/autoplay-prefetch-orchestrator-service.ts
 * @description Coordina ciclo de vida del prefetch de autoplay (start, ready, invalidation, sincronizacion).
 */
import type { Queue } from 'distube';
import type { AutoplayCandidate } from '../domain/autoplay-candidate-utils.js';
import { musicLogger } from '../logger.js';
import { toLoggableErrorMessage } from '../shared/runtime-utils.js';

export type AutoplayPrefetchStateLike = {
  token: symbol;
  seedKey: string;
  seedName: string;
  startedAt: number;
  status: 'pending' | 'ready' | 'empty' | 'failed';
  candidate: AutoplayCandidate | null;
  promise: Promise<AutoplayCandidate | null>;
};

type AutoplayPrefetchOrchestratorServiceDeps = {
  autoplayPrefetchByGuild: Map<string, AutoplayPrefetchStateLike>;
  buildAutoplaySeedKey: (song: Queue['songs'][number]) => string;
  invalidateAutoplayPrefetch: (guildId: string, reason: string) => void;
  buildAutoplayFallbackCandidate: (
    queue: Queue,
    seedSong?: Queue['songs'][number],
  ) => Promise<AutoplayCandidate | null>;
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  getQueue: (guildId: string) => Queue | undefined;
};

export class AutoplayPrefetchOrchestratorService {
  constructor(private readonly deps: AutoplayPrefetchOrchestratorServiceDeps) {}

  startAutoplayPrefetchForSeed(queue: Queue, seedSong: Queue['songs'][number]): void {
    const seedKey = this.deps.buildAutoplaySeedKey(seedSong);
    const existing = this.deps.autoplayPrefetchByGuild.get(queue.id);
    if (existing && existing.seedKey === seedKey) {
      // Si ya esta listo o en curso, lo reutilizamos. Si quedo vacio/fallo, permitimos
      // reintento (por ejemplo, red intermitente o primer intento demasiado temprano).
      if (existing.status === 'pending' || existing.status === 'ready') {
        musicLogger.info(
          {
            event: 'autoplay_prefetch_reused',
            guildId: queue.id,
            seedName: existing.seedName,
            status: existing.status,
            ageMs: Date.now() - existing.startedAt,
          },
          'autoplay prefetch reused for current song',
        );
        return;
      }

      this.deps.invalidateAutoplayPrefetch(queue.id, 'prefetch_retry_after_empty_or_failed');
    }
    else {
      this.deps.invalidateAutoplayPrefetch(queue.id, 'prefetch_replaced_by_new_song');
    }

    const token = Symbol(`autoplay-prefetch:${queue.id}`);
    const seedName = seedSong.name ?? 'Sin titulo';

    const state: AutoplayPrefetchStateLike = {
      token,
      seedKey,
      seedName,
      startedAt: Date.now(),
      status: 'pending',
      candidate: null,
      promise: Promise.resolve(null),
    };

    const promise = (async () => {
      try {
        const candidate = await this.deps.buildAutoplayFallbackCandidate(queue, seedSong);
        const active = this.deps.autoplayPrefetchByGuild.get(queue.id);

        if (!active || active.token !== token) {
          musicLogger.info(
            {
              event: 'autoplay_prefetch_discarded',
              guildId: queue.id,
              seedName,
              reason: 'prefetch_invalidated_before_resolution',
            },
            'autoplay prefetch result discarded',
          );
          return candidate;
        }

        active.candidate = candidate;
        active.status = candidate ? 'ready' : 'empty';

        musicLogger.info(
          {
            event: 'autoplay_prefetch_ready',
            guildId: queue.id,
            seedName,
            hasCandidate: Boolean(candidate),
            durationMs: Date.now() - state.startedAt,
          },
          'autoplay prefetch resolved',
        );

        // Si la recomendacion ya quedo lista mientras sigue sonando la misma pista,
        // refrescamos panel para mostrar `Siguiente` sin esperar otro evento/accion.
        const latestQueue = this.deps.getQueue(queue.id);
        if (
          latestQueue &&
          latestQueue.autoplay &&
          latestQueue.songs.length === 1 &&
          this.deps.buildAutoplaySeedKey(latestQueue.songs[0]!) === seedKey
        ) {
          void this.deps.syncNowPlayingPanel(latestQueue);
        }

        return candidate;
      } catch (error) {
        const active = this.deps.autoplayPrefetchByGuild.get(queue.id);
        if (active?.token === token) {
          active.status = 'failed';
          active.candidate = null;
        }

        const normalizedError = toLoggableErrorMessage(error);
        musicLogger.warn(
          {
            event: 'autoplay_prefetch_failed',
            guildId: queue.id,
            seedName,
            errorMessage: normalizedError.message,
            errorMessageLength: normalizedError.originalLength,
            errorMessageTruncated: normalizedError.truncated,
          },
          'autoplay prefetch failed',
        );
        return null;
      }
    })();

    state.promise = promise;
    this.deps.autoplayPrefetchByGuild.set(queue.id, state);

    musicLogger.info(
      {
        event: 'autoplay_prefetch_started',
        guildId: queue.id,
        seedName,
      },
      'autoplay prefetch started',
    );
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  syncAutoplayPrefetchForQueue(queue: Queue): void {
    // Prefetch solo aporta cuando:
    // - autoplay esta ON
    // - hay exactamente una pista activa (sin siguiente en cola)
    //
    // Si aparece cola real (song2+), cancelamos prefetch del tema actual para que
    // `skip` normal vaya a la pista en cola y no arrastre trabajo innecesario.
    if (!queue.autoplay) {
      musicLogger.info(
        {
          event: 'autoplay_prefetch_sync_skipped',
          guildId: queue.id,
          reason: 'autoplay_disabled',
          queueSize: queue.songs.length,
          queueAutoplay: queue.autoplay,
        },
        'autoplay prefetch sync skipped',
      );
      this.deps.invalidateAutoplayPrefetch(queue.id, 'autoplay_disabled');
      return;
    }

    if (queue.songs.length !== 1) {
      musicLogger.info(
        {
          event: 'autoplay_prefetch_sync_skipped',
          guildId: queue.id,
          reason: 'queue_has_next_song',
          queueSize: queue.songs.length,
          queueAutoplay: queue.autoplay,
          currentSong: queue.songs[0]?.name,
          nextSong: queue.songs[1]?.name,
        },
        'autoplay prefetch sync skipped',
      );
      this.deps.invalidateAutoplayPrefetch(queue.id, 'queue_has_next_song');
      return;
    }

    const currentSong = queue.songs[0];
    if (!currentSong) {
      musicLogger.info(
        {
          event: 'autoplay_prefetch_sync_skipped',
          guildId: queue.id,
          reason: 'missing_current_song',
          queueSize: queue.songs.length,
          queueAutoplay: queue.autoplay,
        },
        'autoplay prefetch sync skipped',
      );
      this.deps.invalidateAutoplayPrefetch(queue.id, 'missing_current_song');
      return;
    }

    musicLogger.info(
      {
        event: 'autoplay_prefetch_sync_start',
        guildId: queue.id,
        queueSize: queue.songs.length,
        queueAutoplay: queue.autoplay,
        seedSong: currentSong.name,
      },
      'autoplay prefetch sync starting',
    );
    this.startAutoplayPrefetchForSeed(queue, currentSong);
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayPrefetchOrchestratorService(
  deps: AutoplayPrefetchOrchestratorServiceDeps,
): AutoplayPrefetchOrchestratorService {
  return new AutoplayPrefetchOrchestratorService(deps);
}
