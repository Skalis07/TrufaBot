/**
 * @file src/modules/music/services/music-action-runner-service.ts
 * @description Wrapper de ejecucion de acciones con logging uniforme (start/finish/error + duracion).
 */
import type { ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';

export type MusicInteractionLike = ChatInputCommandInteraction | ButtonInteraction;

type ActionLogContext = {
  action: string;
  guildId: string | null;
  userId: string;
  source: 'slash' | 'button';
};

export class MusicActionRunnerService {
  private getInteractionSource(interaction: MusicInteractionLike): 'slash' | 'button' {
    return interaction.isButton() ? 'button' : 'slash';
  }

  // Orquesta la ejecucion completa con logging y control de errores.
  async run<T>(
    interaction: MusicInteractionLike,
    action: string,
    task: () => Promise<T>,
  ): Promise<T> {
    const startedAt = Date.now();
    const baseLog: ActionLogContext = {
      action,
      guildId: interaction.guildId ?? null,
      userId: interaction.user.id,
      source: this.getInteractionSource(interaction),
    };

    musicLogger.info({ ...baseLog, phase: 'start' }, 'music action started');

    try {
      const result = await task();

      musicLogger.info(
        {
          ...baseLog,
          result: 'ok',
          durationMs: Date.now() - startedAt,
        },
        'music action finished',
      );

      return result;
    } catch (error) {
      const durationMs = Date.now() - startedAt;

      if (error instanceof MusicUserError) {
        musicLogger.warn(
          {
            ...baseLog,
            result: 'user_error',
            durationMs,
            reason: error.message,
          },
          'music action rejected',
        );
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        musicLogger.error(
          {
            ...baseLog,
            result: 'error',
            durationMs,
            errorMessage,
          },
          'music action failed',
        );
      }

      throw error;
    }
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicActionRunnerService(): MusicActionRunnerService {
  return new MusicActionRunnerService();
}
