/**
 * @file src/modules/music/services/autoplay-continuation-guard-service.ts
 * @description Orquesta guardas de seguridad para continuacion de autoplay (rechecks, supresiones y estado por guild).
 */
import type { Queue } from 'distube';
import {
  buildAutoplayCandidateKey,
  buildQueueSongCandidate,
  type AutoplayCandidate,
} from '../domain/autoplay-candidate-utils.js';
import { musicLogger } from '../logger.js';
import { toLoggableErrorMessage, waitMs } from '../shared/runtime-utils.js';

const AUTOPLAY_DELETE_QUEUE_CONTINUATION_SUPPRESSION_TTL_MS = 15_000;
const AUTOPLAY_CONTINUATION_AUTOPLAY_RECHECK_DELAYS_MS = [250, 1_000, 2_500] as const;

export type AutoplayDeleteQueueContinuationSuppression = {
  reason: string;
  createdAt: number;
  expiresAt: number;
};

type AutoplayContinuationGuardServiceDeps = {
  autoplayContinuationAutoplayRecheckTokenByGuild: Map<string, symbol>;
  autoplayDeleteQueueContinuationSuppressionByGuild: Map<
    string,
    AutoplayDeleteQueueContinuationSuppression
  >;
  getQueue: (guildId: string) => Queue | undefined;
  syncAutoplayPrefetchForQueue: (queue: Queue) => void;
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
};

export class AutoplayContinuationGuardService {
  constructor(private readonly deps: AutoplayContinuationGuardServiceDeps) {}

  // Limpia o invalida estado temporal asociado a la operacion.
  clearAutoplayContinuationAutoplayRecheck(guildId: string, reason: string): void {
    const existingToken = this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId);
    if (!existingToken) {
      return;
    }

    this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
    musicLogger.info(
      {
        event: 'autoplay_continuation_autoplay_recheck_cleared',
        guildId,
        reason,
      },
      'cleared pending autoplay continuation autoplay recheck',
    );
  }

  // Programa ejecucion diferida de un recheck o timeout.
  scheduleAutoplayContinuationAutoplayRecheck(
    guildId: string,
    context: 'finish' | 'delete_queue',
    expectedCandidate: AutoplayCandidate,
  ): void {
    const token = Symbol('autoplay-continuation-autoplay-recheck');
    const expectedCandidateKey = buildAutoplayCandidateKey(expectedCandidate);

    this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.set(guildId, token);
    musicLogger.info(
      {
        event: 'autoplay_continuation_autoplay_recheck_scheduled',
        guildId,
        context,
        expectedSong: expectedCandidate.name ?? expectedCandidate.url,
        delaysMs: [...AUTOPLAY_CONTINUATION_AUTOPLAY_RECHECK_DELAYS_MS],
      },
      'scheduled autoplay continuation autoplay recheck',
    );

    void (async () => {
      for (const delayMs of AUTOPLAY_CONTINUATION_AUTOPLAY_RECHECK_DELAYS_MS) {
        await waitMs(delayMs);

        if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) !== token) {
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_cancelled',
              guildId,
              context,
              delayMs,
              reason: 'superseded_or_cleared',
            },
            'autoplay continuation autoplay recheck cancelled',
          );
          return;
        }

        const queue = this.deps.getQueue(guildId);
        if (!queue || queue.songs.length === 0) {
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_state',
              guildId,
              context,
              delayMs,
              status: 'queue_missing_or_empty',
              queuePresent: Boolean(queue),
              queueSize: queue?.songs.length ?? 0,
              queueAutoplay: queue?.autoplay ?? null,
            },
            'autoplay continuation autoplay recheck observed no active queue yet',
          );
          continue;
        }

        const currentSong = queue.songs[0];
        const currentCandidateKey = currentSong
          ? buildAutoplayCandidateKey(buildQueueSongCandidate(currentSong))
          : 'missing';
        const currentSongMatchesExpected = currentCandidateKey === expectedCandidateKey;

        musicLogger.info(
          {
            event: 'autoplay_continuation_autoplay_recheck_state',
            guildId,
            context,
            delayMs,
            status: 'queue_present',
            queueSize: queue.songs.length,
            queueAutoplay: queue.autoplay,
            currentSong: currentSong?.name,
            currentSongMatchesExpected,
          },
          'autoplay continuation autoplay recheck observed queue state',
        );

        if (!currentSongMatchesExpected) {
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_cancelled',
              guildId,
              context,
              delayMs,
              reason: 'current_song_changed',
              currentSong: currentSong?.name,
            },
            'autoplay continuation autoplay recheck cancelled because current song changed',
          );
          return;
        }

        if (queue.autoplay) {
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_ok',
              guildId,
              context,
              delayMs,
              currentSong: currentSong?.name,
            },
            'autoplay continuation autoplay recheck confirmed autoplay is enabled',
          );
          return;
        }

        queue.toggleAutoplay();
        musicLogger.warn(
          {
            event: 'autoplay_continuation_autoplay_recheck_restored',
            guildId,
            context,
            delayMs,
            currentSong: currentSong?.name,
            queueAutoplayAfterRestore: queue.autoplay,
          },
          'autoplay was disabled after continuation and has been restored by delayed recheck',
        );

        if (queue.autoplay) {
          this.deps.syncAutoplayPrefetchForQueue(queue);
          await this.deps.syncNowPlayingPanel(queue);
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          return;
        }
      }

      if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) === token) {
        this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
        musicLogger.warn(
          {
            event: 'autoplay_continuation_autoplay_recheck_exhausted',
            guildId,
            context,
          },
          'autoplay continuation autoplay recheck exhausted all attempts',
        );
      }
    })().catch((error) => {
      if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) === token) {
        this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
      }
      musicLogger.error(
        {
          event: 'autoplay_continuation_autoplay_recheck_failed',
          guildId,
          context,
          errorMessage: toLoggableErrorMessage(error).message,
        },
        'autoplay continuation autoplay recheck failed unexpectedly',
      );
    });
  }

  suppressAutoplayContinuationOnDeleteQueue(guildId: string, reason: string): void {
    const now = Date.now();
    this.deps.autoplayDeleteQueueContinuationSuppressionByGuild.set(guildId, {
      reason,
      createdAt: now,
      expiresAt: now + AUTOPLAY_DELETE_QUEUE_CONTINUATION_SUPPRESSION_TTL_MS,
    });

    musicLogger.info(
      {
        event: 'autoplay_delete_queue_continuation_suppression_set',
        guildId,
        reason,
        ttlMs: AUTOPLAY_DELETE_QUEUE_CONTINUATION_SUPPRESSION_TTL_MS,
      },
      'autoplay continuation on delete_queue temporarily suppressed',
    );
  }

  // Consume estado transitorio de un solo uso.
  consumeAutoplayDeleteQueueContinuationSuppression(
    guildId: string,
  ): { reason: string; ageMs: number } | null {
    const existing = this.deps.autoplayDeleteQueueContinuationSuppressionByGuild.get(guildId);
    if (!existing) {
      return null;
    }

    this.deps.autoplayDeleteQueueContinuationSuppressionByGuild.delete(guildId);
    const now = Date.now();

    if (existing.expiresAt <= now) {
      return null;
    }

    return {
      reason: existing.reason,
      ageMs: now - existing.createdAt,
    };
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayContinuationGuardService(
  deps: AutoplayContinuationGuardServiceDeps,
): AutoplayContinuationGuardService {
  return new AutoplayContinuationGuardService(deps);
}
