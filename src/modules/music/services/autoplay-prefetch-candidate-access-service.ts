/**
 * @file src/modules/music/services/autoplay-prefetch-candidate-access-service.ts
 * @description Gestiona acceso/consumo de candidatos prefetch de autoplay (hit/miss, snapshot, validaciones).
 */
import type { Queue } from 'distube';
import type { AutoplayCandidate } from '../domain/autoplay-candidate-utils.js';
import { musicLogger } from '../logger.js';

type AutoplayPrefetchStateLike = {
  seedKey: string;
  seedName: string;
  startedAt: number;
  status: 'pending' | 'ready' | 'empty' | 'failed';
  candidate: AutoplayCandidate | null;
  promise: Promise<AutoplayCandidate | null>;
};

export type AutoplayPrefetchDebugSnapshot = {
  status: AutoplayPrefetchStateLike['status'];
  seedName: string;
  ageMs: number;
  hasCandidate: boolean;
} | null;

type AutoplayPrefetchContinuationContext = 'finish' | 'delete_queue';

type AutoplayPrefetchCandidateAccessServiceDeps = {
  autoplayPrefetchByGuild: Map<string, AutoplayPrefetchStateLike>;
  buildAutoplaySeedKey: (song: Queue['songs'][number]) => string;
  startAutoplayPrefetchForSeed: (queue: Queue, seedSong: Queue['songs'][number]) => void;
  buildAutoplayFallbackCandidate: (
    queue: Queue,
    seedSong?: Queue['songs'][number],
  ) => Promise<AutoplayCandidate | null>;
};

export class AutoplayPrefetchCandidateAccessService {
  constructor(private readonly deps: AutoplayPrefetchCandidateAccessServiceDeps) {}

  async getAutoplayFallbackCandidateWithPrefetch(
    queue: Queue,
    seedSong: Queue['songs'][number],
  ): Promise<AutoplayCandidate | null> {
    // Reutiliza prefetch si existe para la misma pista; si sigue resolviendo, lo espera.
    const seedKey = this.deps.buildAutoplaySeedKey(seedSong);
    const existing = this.deps.autoplayPrefetchByGuild.get(queue.id);

    if (existing && existing.seedKey === seedKey) {
      if (existing.status === 'ready') {
        musicLogger.info(
          {
            event: 'autoplay_prefetch_hit',
            guildId: queue.id,
            seedName: existing.seedName,
            ageMs: Date.now() - existing.startedAt,
          },
          'autoplay prefetch cache hit',
        );
        return existing.candidate;
      }

      if (existing.status === 'pending') {
        musicLogger.info(
          {
            event: 'autoplay_prefetch_await',
            guildId: queue.id,
            seedName: existing.seedName,
            ageMs: Date.now() - existing.startedAt,
          },
          'awaiting in-flight autoplay prefetch',
        );
        return existing.promise;
      }

      musicLogger.info(
        {
          event: 'autoplay_prefetch_retry',
          guildId: queue.id,
          seedName: existing.seedName,
          previousStatus: existing.status,
          ageMs: Date.now() - existing.startedAt,
        },
        'retrying autoplay prefetch after empty/failed cached result',
      );
    }

    // No habia prefetch util (o era de otra pista). Arrancamos uno y lo esperamos
    // para reutilizar la misma ruta de logs/estado.
    if (queue.autoplay) {
      this.deps.startAutoplayPrefetchForSeed(queue, seedSong);
    }

    const refreshed = this.deps.autoplayPrefetchByGuild.get(queue.id);
    if (refreshed && refreshed.seedKey === seedKey) {
      return refreshed.promise;
    }

    return this.deps.buildAutoplayFallbackCandidate(queue, seedSong);
  }

  getAutoplayPrefetchDebugSnapshot(guildId: string): AutoplayPrefetchDebugSnapshot {
    const state = this.deps.autoplayPrefetchByGuild.get(guildId);
    if (!state) {
      return null;
    }

    return {
      status: state.status,
      seedName: state.seedName,
      ageMs: Date.now() - state.startedAt,
      hasCandidate: Boolean(state.candidate),
    };
  }

  async getAutoplayFallbackCandidateFromExistingPrefetch(
    guildId: string,
    context: AutoplayPrefetchContinuationContext,
  ): Promise<AutoplayCandidate | null> {
    const existing = this.deps.autoplayPrefetchByGuild.get(guildId);
    if (!existing) {
      musicLogger.info(
        {
          event: 'autoplay_prefetch_unavailable_for_continuation',
          guildId,
          context,
          reason: 'missing_prefetch',
        },
        'autoplay continuation could not use prefetch',
      );
      return null;
    }

    if (existing.status === 'ready') {
      musicLogger.info(
        {
          event: 'autoplay_prefetch_used_for_continuation',
          guildId,
          context,
          seedName: existing.seedName,
          ageMs: Date.now() - existing.startedAt,
          source: 'ready',
          hasCandidate: Boolean(existing.candidate),
        },
        'autoplay continuation used ready prefetch',
      );
      return existing.candidate;
    }

    if (existing.status === 'pending') {
      musicLogger.info(
        {
          event: 'autoplay_prefetch_used_for_continuation',
          guildId,
          context,
          seedName: existing.seedName,
          ageMs: Date.now() - existing.startedAt,
          source: 'pending',
        },
        'autoplay continuation awaiting pending prefetch',
      );
      return existing.promise;
    }

    musicLogger.info(
      {
        event: 'autoplay_prefetch_unavailable_for_continuation',
        guildId,
        context,
        reason: 'prefetch_not_usable',
        status: existing.status,
        seedName: existing.seedName,
        ageMs: Date.now() - existing.startedAt,
      },
      'autoplay continuation could not use prefetch',
    );
    return null;
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayPrefetchCandidateAccessService(
  deps: AutoplayPrefetchCandidateAccessServiceDeps,
): AutoplayPrefetchCandidateAccessService {
  return new AutoplayPrefetchCandidateAccessService(deps);
}
