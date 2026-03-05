/**
 * @file src/modules/music/services/music-play-queue-command-service.ts
 * @description Caso de uso de play/queue/skip: resuelve fuentes y aplica reglas de cola/autoplay.
 */
import type {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
} from 'discord.js';
import type { Queue } from 'distube';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import type { AutoplayCandidate } from '../domain/autoplay-candidate-utils.js';
import { isYtDlpSearchInput } from '../domain/source-url-utils.js';
import { normalizePlayInput } from '../shared/music-command-utils.js';
import { isUnavailableYouTubeVideoError, toLoggableErrorMessage } from '../shared/runtime-utils.js';
import type { VoiceContext } from './music-voice-context-service.js';

type MusicInteraction = ChatInputCommandInteraction | ButtonInteraction;

type PlayOptions = {
  member: GuildMember;
  textChannel?: GuildTextBasedChannel;
};

type MusicPlayQueueCommandServiceDeps = {
  runLoggedAction: (
    interaction: MusicInteraction,
    action: string,
    task: () => Promise<string>,
  ) => Promise<string>;
  getVoiceContext: (
    interaction: MusicInteraction,
    options?: { requireQueue?: boolean },
  ) => Promise<VoiceContext>;
  withGuildLock: <T>(guildId: string, task: () => Promise<T>) => Promise<T>;
  requireQueue: (context: VoiceContext) => Queue;
  getQueue: (guildId: string) => Queue | undefined;
  playerPlay: (
    voiceChannel: VoiceContext['voiceChannel'],
    source: string,
    options: PlayOptions,
  ) => Promise<unknown>;
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  tryPlayYouTubePlaylistProgressively: (params: {
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }) => Promise<string | null>;
  tryPlaySpotifyPlaylistProgressively: (params: {
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }) => Promise<string | null>;
  resolveSpotifyTrackToPlayableSourceWithYtDlp: (inputUrl: string) => Promise<string | null>;
  resolveFirstSearchUrlWithYtDlp: (input: string) => Promise<string>;
  clearAutoplayPrefetch: (guildId: string, reason: string) => void;
  clearAutoplayContinuationAutoplayRecheck: (guildId: string, reason: string) => void;
  syncAutoplayPrefetchForQueue: (queue: Queue) => void;
  getAutoplayFallbackCandidateWithPrefetch: (
    queue: Queue,
    seedSong: Queue['songs'][number],
  ) => Promise<AutoplayCandidate | null>;
  rememberAutoplayTrack: (guildId: string, track: AutoplayCandidate) => void;
  clearAutoplayRecentHistory: (guildId: string) => void;
};

export class MusicPlayQueueCommandService {
  constructor(private readonly deps: MusicPlayQueueCommandServiceDeps) {}

  // Intenta encolar y saltar a un candidato de autoplay; si el candidato esta caido,
  // invalida prefetch y reintenta con un candidato nuevo dentro del mismo comando.
  private async enqueueAutoplayCandidateForSkip(params: {
    queue: Queue;
    context: VoiceContext;
    playOptions: PlayOptions;
  }): Promise<void> {
    const { queue, context, playOptions } = params;
    const currentSong = queue.songs[0];
    if (!currentSong) {
      throw new MusicUserError('No hay pista activa en este momento.');
    }

    const triedCandidateUrls = new Set<string>();
    const maxAttempts = 3;
    let lastPlaybackError: unknown = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const recommendedCandidate = await this.deps.getAutoplayFallbackCandidateWithPrefetch(
        queue,
        currentSong,
      );

      if (!recommendedCandidate) {
        break;
      }

      if (triedCandidateUrls.has(recommendedCandidate.url)) {
        this.deps.clearAutoplayPrefetch(context.guildId, 'skip_autoplay_candidate_repeated');
        musicLogger.warn(
          {
            event: 'skip_autoplay_candidate_repeated',
            guildId: context.guildId,
            attempt,
            maxAttempts,
            candidateUrl: recommendedCandidate.url,
            candidateName: recommendedCandidate.name,
          },
          'autoplay returned a repeated candidate during skip, retrying',
        );
        continue;
      }

      triedCandidateUrls.add(recommendedCandidate.url);

      try {
        await this.deps.playerPlay(context.voiceChannel, recommendedCandidate.url, playOptions);
        this.deps.rememberAutoplayTrack(context.guildId, recommendedCandidate);

        const queueAfterEnqueue = this.deps.getQueue(context.guildId);
        if (!queueAfterEnqueue || queueAfterEnqueue.songs.length < 2) {
          throw new MusicUserError(
            'Autoplay encontro una recomendacion, pero no pude prepararla para el salto.',
          );
        }

        await queueAfterEnqueue.skip();
        return;
      } catch (error) {
        lastPlaybackError = error;
        this.deps.clearAutoplayPrefetch(context.guildId, 'skip_autoplay_candidate_failed_play');

        const isUnavailable = isUnavailableYouTubeVideoError(error);
        const loggableError = toLoggableErrorMessage(error);

        musicLogger.warn(
          {
            event: 'skip_autoplay_candidate_failed_play',
            guildId: context.guildId,
            attempt,
            maxAttempts,
            candidateUrl: recommendedCandidate.url,
            candidateName: recommendedCandidate.name,
            isUnavailableYouTubeVideoError: isUnavailable,
            errorMessage: loggableError.message,
            errorMessageLength: loggableError.originalLength,
            errorMessageTruncated: loggableError.truncated,
          },
          'autoplay candidate failed to play during skip',
        );

        if (!isUnavailable) {
          throw error;
        }
      }
    }

    if (lastPlaybackError) {
      throw new MusicUserError(
        'Autoplay encontro recomendaciones, pero estaban no disponibles. Intenta /play o vuelve a /skip.',
      );
    }

    throw new MusicUserError(
      'Autoplay esta activo, pero no pude obtener una recomendacion con el proveedor actual.',
    );
  }

  async play(interaction: ChatInputCommandInteraction, rawInput: string): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'play', async () => {
      const normalizedInput = normalizePlayInput(rawInput);
      const context = await this.deps.getVoiceContext(interaction);

      return this.deps.withGuildLock(context.guildId, async () => {
        const beforeLength = context.queue?.songs.length ?? 0;
        const hadCurrentSong = beforeLength > 0;

        const playOptions: PlayOptions = {
          member: context.member,
        };

        if (context.textChannel) {
          playOptions.textChannel = context.textChannel;
        }

        const progressivePlaylistResponse = await this.deps.tryPlayYouTubePlaylistProgressively({
          context,
          normalizedInput,
          rawInput,
          hadCurrentSong,
          playOptions,
        });
        if (progressivePlaylistResponse) {
          return progressivePlaylistResponse;
        }

        const progressiveSpotifyPlaylistResponse = await this.deps.tryPlaySpotifyPlaylistProgressively({
          context,
          normalizedInput,
          rawInput,
          hadCurrentSong,
          playOptions,
        });
        if (progressiveSpotifyPlaylistResponse) {
          return progressiveSpotifyPlaylistResponse;
        }

        const spotifyTrackFallbackSource =
          !isYtDlpSearchInput(normalizedInput) && /^https?:\/\//i.test(normalizedInput)
            ? await this.deps.resolveSpotifyTrackToPlayableSourceWithYtDlp(normalizedInput)
            : null;

        const playSource = spotifyTrackFallbackSource
          ?? (isYtDlpSearchInput(normalizedInput)
            ? await this.deps.resolveFirstSearchUrlWithYtDlp(normalizedInput)
            : normalizedInput);

        await this.deps.playerPlay(context.voiceChannel, playSource, playOptions);

        const updatedQueue = this.deps.getQueue(context.guildId);
        if (!updatedQueue || updatedQueue.songs.length === 0) {
          return 'Solicitud de reproduccion enviada.';
        }

        await this.deps.syncNowPlayingPanel(updatedQueue);

        const afterLength = updatedQueue.songs.length;
        const currentSong = updatedQueue.songs[0];

        if (!hadCurrentSong) {
          return `Reproduciendo ahora: **${currentSong?.name ?? 'Sin titulo'}**`;
        }

        const addedSongs = Math.max(afterLength - beforeLength, 0);
        if (addedSongs > 1) {
          return `Se agregaron **${addedSongs}** pistas a la cola.`;
        }

        const latestSong = updatedQueue.songs[afterLength - 1];
        return `Agregado a la cola: **${latestSong?.name ?? rawInput.trim()}**`;
      });
    });
  }

  // Avanza pista y aplica fallback si corresponde.
  async skip(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'skip', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);

        if (queue.songs.length < 2) {
          if (!queue.autoplay) {
            queue.voice.stop();
            queue.remove();
            this.deps.clearAutoplayPrefetch(context.guildId, 'skip_soft_stop_autoplay_off');
            this.deps.clearAutoplayRecentHistory(context.guildId);
            return 'No habia otra pista: se vacio la cola y el reproductor quedo en silencio.';
          }

          const playOptions: PlayOptions = {
            member: context.member,
          };

          if (context.textChannel) {
            playOptions.textChannel = context.textChannel;
          }

          await this.enqueueAutoplayCandidateForSkip({ queue, context, playOptions });

          const updatedQueue = this.deps.getQueue(context.guildId);
          if (updatedQueue) {
            await this.deps.syncNowPlayingPanel(updatedQueue);
          }

          return 'Pista saltada. Autoplay cargó una recomendación.';
        }

        this.deps.clearAutoplayPrefetch(context.guildId, 'skip_to_existing_next_song');
        await queue.skip();

        const updatedQueue = this.deps.getQueue(context.guildId);
        if (updatedQueue) {
          await this.deps.syncNowPlayingPanel(updatedQueue);
        }

        return 'Pista saltada.';
      });
    });
  }

  async setAutoplay(interaction: MusicInteraction, enabled?: boolean): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'autoplay', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const latestQueue = this.deps.getQueue(context.guildId);
        const queue = latestQueue && latestQueue.songs.length > 0
          ? latestQueue
          : this.deps.requireQueue(context);
        const previousState = queue.autoplay;
        const nextState = enabled ?? !previousState;

        if (queue.autoplay !== nextState) {
          queue.toggleAutoplay();
        }

        const queueAfterToggle = this.deps.getQueue(context.guildId) ?? queue;

        if (nextState) {
          this.deps.syncAutoplayPrefetchForQueue(queueAfterToggle);
        } else {
          this.deps.clearAutoplayContinuationAutoplayRecheck(context.guildId, 'autoplay_toggled_off');
          this.deps.clearAutoplayPrefetch(context.guildId, 'autoplay_toggled_off');
        }

        musicLogger.info(
          {
            event: 'autoplay_toggled',
            guildId: context.guildId,
            userId: interaction.user.id,
            previousState,
            nextState,
            queueSize: queueAfterToggle.songs.length,
          },
          'autoplay state updated',
        );

        await this.deps.syncNowPlayingPanel(queueAfterToggle);
        return `Autoplay ${nextState ? 'activado' : 'desactivado'}.`;
      });
    });
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicPlayQueueCommandService(
  deps: MusicPlayQueueCommandServiceDeps,
): MusicPlayQueueCommandService {
  return new MusicPlayQueueCommandService(deps);
}
