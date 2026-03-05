/**
 * @file src/modules/music/services/autoplay-prefetch-read-service.ts
 * @description Expone lecturas para UI sobre estado/recomendacion de autoplay sin mutar estado.
 */
import type { Queue } from 'distube';
import type { AutoplayCandidate } from '../domain/autoplay-candidate-utils.js';

type AutoplayPrefetchStateLike = {
  status: 'pending' | 'ready' | 'empty' | 'failed';
  candidate: AutoplayCandidate | null;
};

export type AutoplayPrefetchDisplay = {
  status: 'none' | 'pending' | 'ready' | 'empty' | 'failed';
  label: string | null;
};

type AutoplayPrefetchReadServiceDeps = {
  getAutoplayPrefetchState: (guildId: string) => AutoplayPrefetchStateLike | undefined;
  getRequestedByLabelForQueueSong: (
    guildId: string,
    song: Queue['songs'][number] | undefined,
  ) => string;
};

export class AutoplayPrefetchReadService {
  constructor(private readonly deps: AutoplayPrefetchReadServiceDeps) {}

  getAutoplayPrefetchRecommendationLabel(guildId: string): string | null {
    const state = this.deps.getAutoplayPrefetchState(guildId);
    if (!state || state.status !== 'ready' || !state.candidate) {
      return null;
    }

    return state.candidate.name ?? state.candidate.url;
  }

  getAutoplayPrefetchDisplay(guildId: string): AutoplayPrefetchDisplay {
    const state = this.deps.getAutoplayPrefetchState(guildId);
    if (!state) {
      return { status: 'none', label: null };
    }

    if (state.status === 'ready' && state.candidate) {
      return {
        status: 'ready',
        label: state.candidate.name ?? state.candidate.url,
      };
    }

    return {
      status: state.status,
      label: null,
    };
  }

  getNowPlayingPanelOptions(queue: Queue): {
    autoplayRecommendationLabel?: string;
    nextTrackFieldName?: string;
    requestedByLabel?: string;
  } {
    const requestedByLabel = this.deps.getRequestedByLabelForQueueSong(queue.id, queue.songs[0]);

    if (queue.songs[1]) {
      return {
        nextTrackFieldName: 'Siguiente',
        requestedByLabel,
      };
    }

    if (!queue.autoplay) {
      return { requestedByLabel };
    }

    const prefetch = this.getAutoplayPrefetchDisplay(queue.id);
    const recommendationLabel =
      prefetch.status === 'ready' && prefetch.label
        ? prefetch.label
        : 'Buscando recomendacion...';

    return {
      nextTrackFieldName: 'Siguiente (autoplay)',
      autoplayRecommendationLabel: recommendationLabel,
      requestedByLabel,
    };
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayPrefetchReadService(
  deps: AutoplayPrefetchReadServiceDeps,
): AutoplayPrefetchReadService {
  return new AutoplayPrefetchReadService(deps);
}
