/**
 * @file src/modules/music/services/music-playback-command-service.ts
 * @description Caso de uso de controles de reproduccion (pause/resume/seek/loop/volume).
 */
import type {
  ButtonInteraction,
  ChatInputCommandInteraction,
} from 'discord.js';
import { RepeatMode, type Queue } from 'distube';
import { DEFAULT_SEEK_SECONDS, type LoopModeName } from '../constants.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import { sanitizeSeconds, toRepeatLabel } from '../shared/music-command-utils.js';
import type { VoiceContext } from './music-voice-context-service.js';

type MusicInteraction = ChatInputCommandInteraction | ButtonInteraction;

type MusicPlaybackCommandServiceDeps = {
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
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  loopModeToRepeat: Record<LoopModeName, RepeatMode>;
};

export class MusicPlaybackCommandService {
  constructor(private readonly deps: MusicPlaybackCommandServiceDeps) {}

  // Pausa la reproduccion activa del guild.
  async pause(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'pause', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);

        if (queue.paused) {
          throw new MusicUserError('La reproduccion ya esta pausada.');
        }

        await queue.pause();
        await this.deps.syncNowPlayingPanel(queue);
        return 'Reproduccion pausada.';
      });
    });
  }

  // Reanuda reproduccion pausada manteniendo el contexto.
  async resume(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'resume', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);

        if (!queue.paused) {
          throw new MusicUserError('La reproduccion ya esta en curso.');
        }

        await queue.resume();
        await this.deps.syncNowPlayingPanel(queue);
        return 'Reproduccion reanudada.';
      });
    });
  }

  async togglePauseResume(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'pause_resume_toggle', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);

        if (queue.paused) {
          await queue.resume();
          await this.deps.syncNowPlayingPanel(queue);
          return 'Reproduccion reanudada.';
        }

        await queue.pause();
        await this.deps.syncNowPlayingPanel(queue);
        return 'Reproduccion pausada.';
      });
    });
  }

  async back(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'back', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const latestQueue = this.deps.getQueue(context.guildId);
        const queue = latestQueue && latestQueue.songs.length > 0
          ? latestQueue
          : this.deps.requireQueue(context);

        musicLogger.info(
          {
            event: 'back_queue_state',
            guildId: context.guildId,
            queueSize: queue.songs.length,
            previousSongsCount: queue.previousSongs.length,
            currentSong: queue.songs[0]?.name,
            previousSong: queue.previousSongs[0]?.name,
          },
          'back command queue state before previous()',
        );

        if (queue.previousSongs.length === 0) {
          throw new MusicUserError('No hay canciones anteriores en el historial.');
        }

        await queue.previous();

        const updatedQueue = this.deps.getQueue(context.guildId);
        if (updatedQueue) {
          await this.deps.syncNowPlayingPanel(updatedQueue);
        }

        return 'Volviendo a la pista anterior.';
      });
    });
  }

  async setLoopMode(interaction: MusicInteraction, loopMode?: LoopModeName): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'loop', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);
        const nextRepeatMode = loopMode
          ? queue.setRepeatMode(this.deps.loopModeToRepeat[loopMode])
          : queue.setRepeatMode();

        await this.deps.syncNowPlayingPanel(queue);
        return `Loop: ${toRepeatLabel(nextRepeatMode)}.`;
      });
    });
  }

  async rewind(interaction: MusicInteraction, requestedSeconds?: number): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'rewind', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);
        const currentSong = queue.songs[0];

        if (!currentSong) {
          throw new MusicUserError('No hay pista activa en este momento.');
        }

        if (currentSong.isLive) {
          throw new MusicUserError('No puedes usar rewind en una transmision LIVE.');
        }

        const seconds = sanitizeSeconds(requestedSeconds, DEFAULT_SEEK_SECONDS);
        const targetTime = Math.max(0, queue.currentTime - seconds);

        await queue.seek(targetTime);
        await this.deps.syncNowPlayingPanel(queue);

        return `Retrocedido ${seconds}s.`;
      });
    });
  }

  async forward(interaction: MusicInteraction, requestedSeconds?: number): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'forward', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);
        const currentSong = queue.songs[0];

        if (!currentSong) {
          throw new MusicUserError('No hay pista activa en este momento.');
        }

        if (currentSong.isLive) {
          throw new MusicUserError('No puedes usar forward en una transmision LIVE.');
        }

        const duration = currentSong.duration;
        if (duration <= 0) {
          throw new MusicUserError('No pude calcular la duracion de esta pista para adelantar.');
        }

        const seconds = sanitizeSeconds(requestedSeconds, DEFAULT_SEEK_SECONDS);
        const maxSeekPosition = Math.max(duration - 1, 0);
        const targetTime = Math.min(maxSeekPosition, queue.currentTime + seconds);

        if (targetTime <= queue.currentTime) {
          throw new MusicUserError('Ya estas al final de la pista. Usa /skip si quieres avanzar.');
        }

        await queue.seek(targetTime);
        await this.deps.syncNowPlayingPanel(queue);

        return `Adelantado ${seconds}s.`;
      });
    });
  }

  async replay(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'replay', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);
        const currentSong = queue.songs[0];

        if (!currentSong) {
          throw new MusicUserError('No hay pista activa en este momento.');
        }

        if (currentSong.isLive) {
          throw new MusicUserError('No puedes reiniciar una transmision LIVE.');
        }

        await queue.seek(0);
        await this.deps.syncNowPlayingPanel(queue);
        return 'Pista reiniciada desde 00:00.';
      });
    });
  }

  async setVolume(interaction: MusicInteraction, requestedVolume?: number): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'volume', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);

        if (requestedVolume === undefined || requestedVolume === null) {
          return `Volumen actual: **${queue.volume}%**`;
        }

        const volume = Math.max(1, Math.min(200, Math.floor(requestedVolume)));
        queue.setVolume(volume);
        await this.deps.syncNowPlayingPanel(queue);

        return `Volumen ajustado a **${volume}%**`;
      });
    });
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicPlaybackCommandService(
  deps: MusicPlaybackCommandServiceDeps,
): MusicPlaybackCommandService {
  return new MusicPlaybackCommandService(deps);
}
