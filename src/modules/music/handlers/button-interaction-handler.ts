/**
 * @file src/modules/music/handlers/button-interaction-handler.ts
 * @description Handler de interacciones de UI (botones) del reproductor de musica; traduce eventos de Discord a acciones de servicio.
 */
import type { ButtonInteraction } from 'discord.js';
import { MessageFlags } from 'discord.js';
import {
  DEFAULT_SEEK_SECONDS,
  MUSIC_BUTTON_ACTIONS,
  MUSIC_BUTTON_PREFIX,
  type MusicButtonAction,
} from '../constants.js';
import { getMusicPlayer } from '../music-player.js';
import { getMusicErrorMessage, musicService } from '../services/music-service.js';
import { musicAutoplayProgressNoticeService } from '../services/autoplay-progress-notice-service.js';

const BUTTON_EPHEMERAL_TTL_MS = 5_000;

// Traduce una interaccion de Discord a una accion concreta del servicio.
function scheduleEphemeralDeletion(task: () => Promise<void>): void {
  // Borra feedback efimero tras unos segundos para que no se acumulen mensajes visuales.
  const timeout = setTimeout(() => {
    void task().catch(() => {
      // Ignoramos errores de borrado (mensaje ya expirado, ya borrado, etc.).
    });
  }, BUTTON_EPHEMERAL_TTL_MS);

  timeout.unref?.();
}

// Traduce una interaccion de Discord a una accion concreta del servicio.
async function replyEphemeralAutoDelete(interaction: ButtonInteraction, content: string): Promise<void> {
  // Para respuestas directas (como `QUEUE`) usamos el reply original del boton.
  await interaction.reply({
    content,
    flags: MessageFlags.Ephemeral,
  });

  scheduleEphemeralDeletion(async () => {
    await interaction.deleteReply();
  });
}

// Traduce una interaccion de Discord a una accion concreta del servicio.
async function followUpEphemeralAutoDelete(interaction: ButtonInteraction, content: string): Promise<void> {
  // Para acciones con `deferUpdate()`, enviamos follow-up efimero y lo borramos por ID.
  const feedbackMessage = await interaction.followUp({
    content,
    flags: MessageFlags.Ephemeral,
  });

  scheduleEphemeralDeletion(async () => {
    await interaction.webhook.deleteMessage(feedbackMessage.id);
  });
}

// Traduce una interaccion de Discord a una accion concreta del servicio.
async function followUpEphemeral(interaction: ButtonInteraction, content: string) {
  // Variante sin auto-borrado inmediato; se usa para mensajes de progreso.
  return interaction.followUp({
    content,
    flags: MessageFlags.Ephemeral,
  });
}

// Traduce una interaccion de Discord a una accion concreta del servicio.
function parseMusicButtonAction(customId: string): MusicButtonAction | null {
  // Valida que el `customId` pertenezca al namespace de musica y extrae la accion.
  // Devuelve null si el boton es de otro modulo para que el router general lo ignore.
  const prefix = `${MUSIC_BUTTON_PREFIX}:`;

  if (!customId.startsWith(prefix)) {
    return null;
  }

  const action = customId.slice(prefix.length);

  if (!MUSIC_BUTTON_ACTIONS.includes(action as MusicButtonAction)) {
    return null;
  }

  return action as MusicButtonAction;
}

// Traduce una interaccion de Discord a una accion concreta del servicio.
function shouldShowAutoplaySkipProgressNotice(interaction: ButtonInteraction): boolean {
  // Si `SKIP` no tiene siguiente pista pero autoplay esta activo, avisamos antes de
  // resolver la recomendacion (puede tardar varios segundos).
  if (!interaction.guildId) {
    return false;
  }

  try {
    const queue = getMusicPlayer().getQueue(interaction.guildId);
    return Boolean(queue && queue.autoplay && queue.songs.length < 2);
  } catch {
    return false;
  }
}

// Traduce una interaccion de Discord a una accion concreta del servicio.
export async function handleMusicButtonInteraction(interaction: ButtonInteraction): Promise<boolean> {
  // Entry point del router de botones de musica.
  // Retorna `true` si consumio la interaccion y `false` si no era un boton de musica.
  const action = parseMusicButtonAction(interaction.customId);

  if (!action) {
    return false;
  }

  if (action === 'queue') {
    // `QUEUE` responde con un mensaje efimero (no requiere editar el panel principal).
    try {
      const queueSummary = await musicService.getQueueSummary(interaction);
      await replyEphemeralAutoDelete(interaction, queueSummary);
    } catch (error) {
      await replyEphemeralAutoDelete(interaction, getMusicErrorMessage(error));
    }

    return true;
  }

  // Para acciones que modifican estado, confirmamos el click sin cambiar el mensaje
  // inmediatamente; luego los servicios actualizan el panel (embed/botones) por su cuenta.
  await interaction.deferUpdate();

  let autoplayProgressGuildIdForCleanup: string | null = null;

  try {
    let resultMessage = '';

    switch (action) {
      case 'back':
        resultMessage = await musicService.back(interaction);
        break;
      case 'clear':
        resultMessage = await musicService.clearQueue(interaction);
        break;
      case 'pause_resume':
        resultMessage = await musicService.togglePauseResume(interaction);
        break;
      case 'skip':
        if (shouldShowAutoplaySkipProgressNotice(interaction)) {
          const progressNotice = 'No hay mas pistas para saltar, consiguiendo recomendacion de autoplay...';

          if (interaction.guildId && musicService.isGuildBusy(interaction.guildId)) {
            resultMessage = progressNotice;
            break;
          }

          const progressMessage = await followUpEphemeral(interaction, progressNotice);

          if (interaction.guildId) {
            autoplayProgressGuildIdForCleanup = interaction.guildId;
            musicAutoplayProgressNoticeService.track(
              interaction.guildId,
              interaction.webhook,
              progressMessage.id,
            );
          } else {
            scheduleEphemeralDeletion(async () => {
              await interaction.webhook.deleteMessage(progressMessage.id);
            });
          }
        }
        resultMessage = await musicService.skip(interaction);
        break;
      case 'autoplay':
        resultMessage = await musicService.setAutoplay(interaction);
        break;
      case 'loop':
        resultMessage = await musicService.setLoopMode(interaction);
        break;
      case 'rewind':
        resultMessage = await musicService.rewind(interaction, DEFAULT_SEEK_SECONDS);
        break;
      case 'stop':
        resultMessage = await musicService.stop(interaction);
        break;
      case 'forward':
        resultMessage = await musicService.forward(interaction, DEFAULT_SEEK_SECONDS);
        break;
      case 'replay':
        resultMessage = await musicService.replay(interaction);
        break;
      default:
        // Defensa extra; en teoria no deberia ocurrir por la validacion inicial.
        resultMessage = 'Accion de boton no soportada.';
    }

    // Feedback efimero al usuario que hizo click (el panel principal queda publico).
    await followUpEphemeralAutoDelete(interaction, resultMessage);
  } catch (error) {
    if (autoplayProgressGuildIdForCleanup) {
      // Si el `skip` falla antes de que empiece una nueva pista, quitamos el cartel de
      // progreso inmediatamente para no dejarlo hasta el timeout de seguridad.
      await musicAutoplayProgressNoticeService.clear(autoplayProgressGuildIdForCleanup);
    }

    // Error controlado o inesperado, siempre visible solo para quien hizo click.
    await followUpEphemeralAutoDelete(interaction, getMusicErrorMessage(error));
  }

  return true;
}
