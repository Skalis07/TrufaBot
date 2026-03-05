/**
 * @file src/modules/music/services/autoplay-continuation-service.ts
 * @description Implementa la continuacion de reproduccion por autoplay al finalizar cola o limpiar cola, con locks y contexto.
 */
import type { GuildTextBasedChannel } from 'discord.js';
import type { Queue } from 'distube';
import {
  buildAutoplayCandidateKey,
  buildQueueSongCandidate,
  type AutoplayCandidate,
} from '../domain/autoplay-candidate-utils.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';

type AutoplayPrefetchDebugSnapshot = {
  status: 'pending' | 'ready' | 'empty' | 'failed';
  seedName: string;
  ageMs: number;
  hasCandidate: boolean;
} | null;

type AutoplayContinuationContext = 'finish' | 'delete_queue';

type AutoplayContinuationServiceDeps = {
  withGuildLock: <T>(guildId: string, task: () => Promise<T>) => Promise<T>;
  getQueue: (guildId: string) => Queue | undefined;
  playerPlay: (
    voiceChannel: Queue['voice']['channel'],
    source: string,
    options: { textChannel?: GuildTextBasedChannel },
  ) => Promise<unknown>;
  getLastStartedSong: (guildId: string) => Queue['songs'][number] | undefined;
  getAutoplayPrefetchDebugSnapshot: (guildId: string) => AutoplayPrefetchDebugSnapshot;
  getAutoplayFallbackCandidateWithPrefetch: (
    queue: Queue,
    seedSong: Queue['songs'][number],
  ) => Promise<AutoplayCandidate | null>;
  getAutoplayFallbackCandidateFromExistingPrefetch: (
    guildId: string,
    context: AutoplayContinuationContext,
  ) => Promise<AutoplayCandidate | null>;
  syncAutoplayPrefetchForQueue: (queue: Queue) => void;
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  rememberAutoplayTrack: (guildId: string, track: AutoplayCandidate) => void;
  scheduleAutoplayContinuationAutoplayRecheck: (
    guildId: string,
    context: AutoplayContinuationContext,
    expectedCandidate: AutoplayCandidate,
  ) => void;
};

export class AutoplayContinuationService {
  constructor(private readonly deps: AutoplayContinuationServiceDeps) {}

  // Continua el flujo automaticamente tras un evento terminal.
  async continueAutoplayAfterFinish(
    queue: Queue,
    context: AutoplayContinuationContext = 'finish',
  ): Promise<boolean> {
    if (!queue.autoplay) {
      musicLogger.info(
        { event: 'autoplay_finish_not_applicable', guildId: queue.id, reason: 'autoplay_disabled' },
        'autoplay continuation after finish not applicable',
      );
      return false;
    }

    const voiceChannel = queue.voice.channel;
    if (!voiceChannel) {
      musicLogger.info(
        { event: 'autoplay_finish_not_applicable', guildId: queue.id, reason: 'missing_voice_channel' },
        'autoplay continuation after finish not applicable',
      );
      return false;
    }

    const seedSong = queue.songs[0] ?? queue.previousSongs[0] ?? this.deps.getLastStartedSong(queue.id);
    const seedSource = queue.songs[0]
      ? 'queue_current'
      : queue.previousSongs[0]
        ? 'queue_previous'
        : seedSong
          ? 'last_started_snapshot'
          : 'missing';
    const prefetchSnapshot = this.deps.getAutoplayPrefetchDebugSnapshot(queue.id);

    musicLogger.info(
      {
        event: 'autoplay_continuation_context_snapshot',
        guildId: queue.id,
        context,
        hasSeedSong: Boolean(seedSong),
        seedSong: seedSong?.name,
        queueSongCount: queue.songs.length,
        previousSongsCount: queue.previousSongs.length,
        prefetchStatus: prefetchSnapshot?.status ?? 'missing',
        prefetchSeedName: prefetchSnapshot?.seedName,
        prefetchAgeMs: prefetchSnapshot?.ageMs,
        prefetchHasCandidate: prefetchSnapshot?.hasCandidate ?? false,
        seedSource,
      },
      'autoplay continuation context snapshot',
    );

    try {
      return await this.deps.withGuildLock(queue.id, async () => {
        const latestQueue = this.deps.getQueue(queue.id);

        if (latestQueue && latestQueue.songs.length > 0) {
          musicLogger.info(
            {
              event: 'autoplay_finish_already_resolved',
              guildId: queue.id,
              queueSize: latestQueue.songs.length,
              currentSong: latestQueue.songs[0]?.name,
            },
            'autoplay finish continuation skipped because queue already has a song',
          );
          return true;
        }

        const targetQueue = latestQueue ?? queue;
        if (!targetQueue.autoplay) {
          musicLogger.info(
            { event: 'autoplay_finish_cancelled', guildId: queue.id, reason: 'autoplay_disabled_during_finish' },
            'autoplay finish continuation cancelled',
          );
          return false;
        }

        let recommendedCandidate: AutoplayCandidate | null = null;

        if (seedSong) {
          recommendedCandidate = await this.deps.getAutoplayFallbackCandidateWithPrefetch(targetQueue, seedSong);
        } else {
          recommendedCandidate = await this.deps.getAutoplayFallbackCandidateFromExistingPrefetch(queue.id, context);
          if (!recommendedCandidate) {
            musicLogger.info(
              {
                event: 'autoplay_finish_not_applicable',
                guildId: queue.id,
                reason: 'missing_seed_song',
                context,
              },
              'autoplay continuation after finish not applicable',
            );
            return false;
          }
        }

        if (!recommendedCandidate) {
          musicLogger.info(
            {
              event: 'autoplay_finish_no_candidate',
              guildId: queue.id,
              seedSong: seedSong?.name,
              context,
            },
            'autoplay finish continuation did not find recommendation',
          );
          return false;
        }

        const playOptions: { textChannel?: GuildTextBasedChannel } = {};
        if (targetQueue.textChannel) {
          playOptions.textChannel = targetQueue.textChannel;
        }

        const continuationPlayStartedAt = Date.now();
        musicLogger.info(
          {
            event: 'autoplay_continuation_play_invoking',
            guildId: queue.id,
            context,
            selectedSong: recommendedCandidate.name ?? recommendedCandidate.url,
            selectedUrl: recommendedCandidate.url,
            voiceChannelId: voiceChannel.id,
          },
          'invoking player.play for autoplay continuation',
        );

        await this.deps.playerPlay(voiceChannel, recommendedCandidate.url, playOptions);

        musicLogger.info(
          {
            event: 'autoplay_continuation_play_returned',
            guildId: queue.id,
            context,
            selectedSong: recommendedCandidate.name ?? recommendedCandidate.url,
            selectedUrl: recommendedCandidate.url,
            durationMs: Date.now() - continuationPlayStartedAt,
          },
          'player.play returned for autoplay continuation',
        );

        const queueAfterContinuationPlay = this.deps.getQueue(queue.id);
        if (!queueAfterContinuationPlay) {
          musicLogger.warn(
            {
              event: 'autoplay_continuation_post_play_queue_missing',
              guildId: queue.id,
              context,
              selectedUrl: recommendedCandidate.url,
            },
            'autoplay continuation finished but queue is missing right after play',
          );
        } else {
          if (
            seedSong &&
            queueAfterContinuationPlay.songs[0] &&
            queueAfterContinuationPlay.previousSongs.length === 0 &&
            buildAutoplayCandidateKey(buildQueueSongCandidate(queueAfterContinuationPlay.songs[0])) !==
              buildAutoplayCandidateKey(buildQueueSongCandidate(seedSong))
          ) {
            queueAfterContinuationPlay.previousSongs.unshift(seedSong);
            musicLogger.info(
              {
                event: 'autoplay_continuation_back_history_rehydrated',
                guildId: queue.id,
                context,
                restoredPreviousSong: seedSong.name,
                currentSong: queueAfterContinuationPlay.songs[0]?.name,
                previousSongsCount: queueAfterContinuationPlay.previousSongs.length,
              },
              'back history restored after autoplay continuation queue recreation',
            );
          }

          musicLogger.info(
            {
              event: 'autoplay_continuation_post_play_queue_state',
              guildId: queue.id,
              context,
              queueAutoplay: queueAfterContinuationPlay.autoplay,
              queueSize: queueAfterContinuationPlay.songs.length,
              currentSong: queueAfterContinuationPlay.songs[0]?.name,
            },
            'autoplay continuation queue state after play',
          );

          if (!queueAfterContinuationPlay.autoplay) {
            queueAfterContinuationPlay.toggleAutoplay();

            musicLogger.warn(
              {
                event: 'autoplay_continuation_autoplay_restored',
                guildId: queue.id,
                context,
                queueAutoplayAfterRestore: queueAfterContinuationPlay.autoplay,
                queueSize: queueAfterContinuationPlay.songs.length,
                currentSong: queueAfterContinuationPlay.songs[0]?.name,
              },
              'autoplay state was lost during continuation and has been restored',
            );

            this.deps.syncAutoplayPrefetchForQueue(queueAfterContinuationPlay);
            await this.deps.syncNowPlayingPanel(queueAfterContinuationPlay);
          }
        }

        this.deps.rememberAutoplayTrack(queue.id, recommendedCandidate);
        this.deps.scheduleAutoplayContinuationAutoplayRecheck(queue.id, context, recommendedCandidate);

        musicLogger.info(
          {
            event: 'autoplay_finish_continued',
            guildId: queue.id,
            seedSong: seedSong?.name ?? prefetchSnapshot?.seedName ?? 'unknown',
            context,
            selectedSong: recommendedCandidate.name ?? recommendedCandidate.url,
            selectedUrl: recommendedCandidate.url,
          },
          'autoplay continued after natural queue finish',
        );

        return true;
      });
    } catch (error) {
      if (error instanceof MusicUserError) {
        musicLogger.warn(
          {
            event: 'autoplay_finish_skipped',
            guildId: queue.id,
            reason: error.message,
          },
          'autoplay continuation after finish skipped',
        );
        return false;
      }

      const errorMessage = error instanceof Error ? error.message : String(error);
      musicLogger.error(
        {
          event: 'autoplay_finish_failed',
          guildId: queue.id,
          errorMessage,
        },
        'autoplay continuation after finish failed',
      );
      return false;
    }
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayContinuationService(
  deps: AutoplayContinuationServiceDeps,
): AutoplayContinuationService {
  return new AutoplayContinuationService(deps);
}
