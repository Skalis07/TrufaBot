/**
 * @file src/modules/music/services/control-message-service.ts
 * @description Gestiona el panel de control de musica (now playing/idle) y su sincronizacion en el canal.
 */
import type { GuildTextBasedChannel, MessageCreateOptions } from 'discord.js';
import type { Queue } from 'distube';
import { buildMusicControlComponents } from '../ui/control-buttons.js';
import { buildIdleMusicEmbed, buildNowPlayingEmbed } from '../ui/now-playing-embed.js';

type MusicControlMessageState = {
  channelId: string;
  messageId: string;
};

type ControlMessagePayload = {
  embeds: NonNullable<MessageCreateOptions['embeds']>;
  components: NonNullable<MessageCreateOptions['components']>;
};

type SyncNowPlayingOptions = {
  autoplayRecommendationLabel?: string | undefined;
  nextTrackFieldName?: string | undefined;
  requestedByLabel?: string | undefined;
};

type RecentDeliveredPayloadState = {
  channelId: string;
  fingerprint: string;
  deliveredAt: number;
};

const CONTROL_MESSAGE_DEDUP_WINDOW_MS = 1_500;

export class MusicControlMessageService {
  // Mapa en memoria para recordar el ultimo mensaje de control por guild
  // y editarlo en vez de spamear mensajes nuevos.
  private readonly byGuild = new Map<string, MusicControlMessageState>();
  private readonly lastDeliveredPayloadByGuild = new Map<string, RecentDeliveredPayloadState>();

  // Construye datos de trabajo para el siguiente paso del flujo.
  private buildPayloadFingerprint(payload: ControlMessagePayload): string {
    // Serializa embeds/componentes para poder omitir ediciones identicas consecutivas
    // (comando + evento del player disparando la misma UI en pocos ms).
    const embeds = payload.embeds.map((embed) => {
      const maybeEmbed = embed as { toJSON?: () => unknown };
      return typeof maybeEmbed.toJSON === 'function' ? maybeEmbed.toJSON() : embed;
    });

    const components = payload.components.map((component) => {
      const maybeComponent = component as { toJSON?: () => unknown };
      return typeof maybeComponent.toJSON === 'function' ? maybeComponent.toJSON() : component;
    });

    return JSON.stringify({ embeds, components });
  }

  private shouldSkipRecentlyDeliveredPayload(
    guildId: string,
    channelId: string,
    payload: ControlMessagePayload,
  ): boolean {
    const recent = this.lastDeliveredPayloadByGuild.get(guildId);
    if (!recent || recent.channelId !== channelId) {
      return false;
    }

    const ageMs = Date.now() - recent.deliveredAt;
    if (ageMs > CONTROL_MESSAGE_DEDUP_WINDOW_MS) {
      return false;
    }

    const nextFingerprint = this.buildPayloadFingerprint(payload);
    return recent.fingerprint === nextFingerprint;
  }

  // Guarda contexto/historial para decisiones posteriores.
  private rememberDeliveredPayload(
    guildId: string,
    channelId: string,
    payload: ControlMessagePayload,
  ): void {
    this.lastDeliveredPayloadByGuild.set(guildId, {
      channelId,
      fingerprint: this.buildPayloadFingerprint(payload),
      deliveredAt: Date.now(),
    });
  }

  private async editExistingMessage(
    guildId: string,
    channel: GuildTextBasedChannel,
    payload: ControlMessagePayload,
  ): Promise<boolean> {
    // Intenta reutilizar el mensaje actual del panel si sigue existiendo
    // y si seguimos trabajando en el mismo canal de texto.
    const state = this.byGuild.get(guildId);

    if (!state || state.channelId !== channel.id) {
      return false;
    }

    try {
      const message = await channel.messages.fetch(state.messageId);
      await message.edit(payload);
      this.rememberDeliveredPayload(guildId, channel.id, payload);
      return true;
    } catch {
      // Si el mensaje fue borrado/cambiado, limpiamos estado para recrearlo.
      this.byGuild.delete(guildId);
      return false;
    }
  }

  private async sendFreshMessage(
    guildId: string,
    channel: GuildTextBasedChannel,
    payload: ControlMessagePayload,
  ): Promise<void> {
    // Crea un panel nuevo y guarda su referencia para futuras ediciones.
    const message = await channel.send(payload);
    this.byGuild.set(guildId, { channelId: channel.id, messageId: message.id });
    this.rememberDeliveredPayload(guildId, channel.id, payload);
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  async syncNowPlaying(queue: Queue, options?: SyncNowPlayingOptions): Promise<void> {
    // Sincroniza el panel en modo reproduccion usando el canal de texto asociado a la queue.
    const channel = queue.textChannel;

    if (!channel) {
      return;
    }

    const payload: ControlMessagePayload = {
      embeds: [buildNowPlayingEmbed(queue, options)],
      components: buildMusicControlComponents(queue),
    };

    if (this.shouldSkipRecentlyDeliveredPayload(queue.id, channel.id, payload)) {
      return;
    }

    const edited = await this.editExistingMessage(queue.id, channel, payload);
    if (edited) {
      // Si pudimos editar, terminamos aqui y evitamos duplicar mensajes.
      return;
    }

    await this.sendFreshMessage(queue.id, channel, payload);
  }

  // Sincroniza estado interno con panel/UI u otros servicios.
  async syncIdle(
    guildId: string,
    options: {
      channel?: GuildTextBasedChannel;
      reason: string;
    },
  ): Promise<void> {
    // Sincroniza el panel en modo idle (sin pista) con razon explicita.
    // Si no hay canal, solo limpiamos referencia local.
    const { channel, reason } = options;

    if (!channel) {
      this.byGuild.delete(guildId);
      return;
    }

    const payload: ControlMessagePayload = {
      embeds: [buildIdleMusicEmbed(reason)],
      components: buildMusicControlComponents(undefined),
    };

    if (this.shouldSkipRecentlyDeliveredPayload(guildId, channel.id, payload)) {
      return;
    }

    const edited = await this.editExistingMessage(guildId, channel, payload);
    if (edited) {
      return;
    }

    await this.sendFreshMessage(guildId, channel, payload);
  }

  getTrackedChannelId(guildId: string): string | null {
    // Exponemos solo el channelId (no el messageId) para otros servicios
    // como auto-desconexion por inactividad, sin acoplarlos a detalles de mensajes.
    return this.byGuild.get(guildId)?.channelId ?? null;
  }
}

// Instancia singleton reutilizada por comandos, botones y eventos de DisTube.
export const musicControlMessageService = new MusicControlMessageService();
