/**
 * @file src/modules/music/services/autoplay-prefetch-state-service.ts
 * @description Gestiona estado interno de prefetch por guild (keys, limpieza e invalidacion).
 */
import type { Queue } from 'distube';
import { buildAutoplayCandidateKey, buildQueueSongCandidate } from '../domain/autoplay-candidate-utils.js';
import { musicLogger } from '../logger.js';

type AutoplayPrefetchStateLike = {
  seedName: string;
  startedAt: number;
  status: 'pending' | 'ready' | 'empty' | 'failed';
};

type AutoplayPrefetchStateServiceDeps = {
  autoplayPrefetchByGuild: Map<string, AutoplayPrefetchStateLike>;
  clearAutoplayContinuationAutoplayRecheck: (guildId: string, reason: string) => void;
};

export class AutoplayPrefetchStateService {
  constructor(private readonly deps: AutoplayPrefetchStateServiceDeps) {}

  // Construye datos de trabajo para el siguiente paso del flujo.
  buildAutoplaySeedKey(song: Queue['songs'][number]): string {
    return buildAutoplayCandidateKey(buildQueueSongCandidate(song));
  }

  invalidateAutoplayPrefetch(guildId: string, reason: string): void {
    const existing = this.deps.autoplayPrefetchByGuild.get(guildId);
    if (!existing) {
      return;
    }

    this.deps.autoplayPrefetchByGuild.delete(guildId);
    musicLogger.info(
      {
        event: 'autoplay_prefetch_invalidated',
        guildId,
        reason,
        seedName: existing.seedName,
        ageMs: Date.now() - existing.startedAt,
        status: existing.status,
      },
      'autoplay prefetch invalidated',
    );
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearAutoplayPrefetch(guildId: string, reason: string): void {
    this.deps.clearAutoplayContinuationAutoplayRecheck(guildId, `clear_autoplay_prefetch:${reason}`);
    this.invalidateAutoplayPrefetch(guildId, reason);
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayPrefetchStateService(
  deps: AutoplayPrefetchStateServiceDeps,
): AutoplayPrefetchStateService {
  return new AutoplayPrefetchStateService(deps);
}
