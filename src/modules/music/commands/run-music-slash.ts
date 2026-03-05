/**
 * @file src/modules/music/commands/run-music-slash.ts
 * @description Router de ejecucion de slash commands de musica: valida el comando y delega en el handler correcto.
 */
import type { ChatInputCommandInteraction } from 'discord.js';
import { MessageFlags } from 'discord.js';
import { getMusicErrorMessage } from '../services/music-service.js';

const MUSIC_SLASH_EPHEMERAL_TTL_MS = 5_000;
const DISCORD_ERROR_UNKNOWN_INTERACTION = 10_062;
const DISCORD_ERROR_INTERACTION_ALREADY_ACKNOWLEDGED = 40_060;

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getDiscordApiErrorCode(error: unknown): number | null {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return null;
  }

  const code = (error as { code?: unknown }).code;
  return typeof code === 'number' ? code : null;
}

// Evalua una condicion de control para guiar el flujo.
function isIgnorableInteractionResponseError(error: unknown): boolean {
  const code = getDiscordApiErrorCode(error);
  return (
    code === DISCORD_ERROR_UNKNOWN_INTERACTION
    || code === DISCORD_ERROR_INTERACTION_ALREADY_ACKNOWLEDGED
  );
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function scheduleSlashEphemeralDeletion(interaction: ChatInputCommandInteraction): void {
  // Borra la respuesta efimera (success/error) para que no quede fija en pantalla.
  const timeout = setTimeout(() => {
    void interaction.deleteReply().catch(() => {
      // Ignoramos errores si ya expiro, fue borrado, o Discord rechazo la operacion.
    });
  }, MUSIC_SLASH_EPHEMERAL_TTL_MS);

  timeout.unref?.();
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export async function runMusicSlashCommand(
  interaction: ChatInputCommandInteraction,
  handler: () => Promise<string>,
): Promise<void> {
  // Wrapper comun para todos los slash commands de musica:
  // - difiere respuesta efimera
  // - ejecuta handler de negocio
  // - traduce errores a mensaje amigable
  try {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  } catch (error) {
    // Si Discord ya no acepta la respuesta de esta interaccion, no intentamos
    // un segundo ack para evitar errores en cascada (10062/40060).
    if (isIgnorableInteractionResponseError(error)) {
      return;
    }

    throw error;
  }

  try {
    const message = await handler();

    try {
      await interaction.editReply({ content: message });
    } catch (error) {
      if (isIgnorableInteractionResponseError(error)) {
        return;
      }

      throw error;
    }

    scheduleSlashEphemeralDeletion(interaction);
  } catch (error) {
    // Centralizamos el formateo de errores para no repetir try/catch en cada comando.
    const message = getMusicErrorMessage(error);

    if (interaction.deferred || interaction.replied) {
      // Ya existe respuesta inicial, asi que actualizamos ese mismo reply.
      try {
        await interaction.editReply({ content: message });
      } catch (replyError) {
        if (isIgnorableInteractionResponseError(replyError)) {
          return;
        }

        throw replyError;
      }

      scheduleSlashEphemeralDeletion(interaction);
      return;
    }

    // Fallback defensivo por si falla antes del defer/reply esperado.
    try {
      await interaction.reply({
        content: message,
        flags: MessageFlags.Ephemeral,
      });
    } catch (replyError) {
      if (isIgnorableInteractionResponseError(replyError)) {
        return;
      }

      throw replyError;
    }

    scheduleSlashEphemeralDeletion(interaction);
  }
}
