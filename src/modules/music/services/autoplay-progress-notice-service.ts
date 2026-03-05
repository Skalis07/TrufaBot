/**
 * @file src/modules/music/services/autoplay-progress-notice-service.ts
 * @description Construye/actualiza avisos de progreso de autoplay en mensajes de control.
 */
import type { ButtonInteraction } from 'discord.js';

const AUTOPLAY_PROGRESS_MAX_WAIT_MS = 45_000;

type PendingAutoplayProgressMessage = {
  guildId: string;
  messageId: string;
  webhook: ButtonInteraction['webhook'];
  timeout: ReturnType<typeof setTimeout>;
};

class AutoplayProgressNoticeService {
  // Estado en memoria por guild del mensaje efimero "consiguiendo recomendacion...".
  // Lo gestionamos aqui para no registrar listeners extra en DisTube desde el handler.
  private readonly pendingByGuild = new Map<string, PendingAutoplayProgressMessage>();

  // Limpia o invalida estado temporal asociado a la operacion.
  async clear(guildId: string): Promise<void> {
    // Borra (si existe) el mensaje pendiente del guild y limpia su timeout asociado.
    const pending = this.pendingByGuild.get(guildId);
    if (!pending) {
      return;
    }

    this.pendingByGuild.delete(guildId);
    clearTimeout(pending.timeout);

    await pending.webhook.deleteMessage(pending.messageId).catch(() => {
      // Puede haber expirado o haberse borrado manualmente. No necesitamos propagar error.
    });
  }

  track(guildId: string, webhook: ButtonInteraction['webhook'], messageId: string): void {
    // Registra/reemplaza el mensaje de progreso para el guild hasta que el player avise
    // una nueva reproduccion (o hasta el timeout de seguridad).
    const existingPending = this.pendingByGuild.get(guildId);
    if (existingPending) {
      // Reemplazo defensivo si el usuario dispara otro skip/autoplay antes de limpiar.
      void this.clear(guildId);
    }

    const timeout = setTimeout(() => {
      void this.clear(guildId);
    }, AUTOPLAY_PROGRESS_MAX_WAIT_MS);

    timeout.unref?.();

    this.pendingByGuild.set(guildId, {
      guildId,
      messageId,
      webhook,
      timeout,
    });
  }
}

export const musicAutoplayProgressNoticeService = new AutoplayProgressNoticeService();

