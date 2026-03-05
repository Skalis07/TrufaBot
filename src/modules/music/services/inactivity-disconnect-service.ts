/**
 * @file src/modules/music/services/inactivity-disconnect-service.ts
 * @description Controla timers de inactividad (sin playback/sin usuarios) y desconexion segura del canal de voz.
 */
import type { Client, GuildTextBasedChannel, VoiceState } from 'discord.js';
import { Events } from 'discord.js';
import type { DisTube, Queue } from 'distube';
import { musicLogger } from '../logger.js';
import { musicControlMessageService } from './control-message-service.js';

const DEFAULT_NO_PLAYBACK_TIMEOUT_MS = 3 * 60 * 1000;
const DEFAULT_EMPTY_CHANNEL_TIMEOUT_MS = 60 * 1000;

type TimerHandle = ReturnType<typeof setTimeout>;

function readTimeoutMs(envName: string, fallback: number): number {
  const raw = process.env[envName];
  const parsed = raw ? Number(raw) : Number.NaN;

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

export class MusicInactivityService {
  private readonly noPlaybackTimers = new Map<string, TimerHandle>();
  private readonly emptyChannelTimers = new Map<string, TimerHandle>();
  private readonly noPlaybackTimeoutMs = readTimeoutMs(
    'MUSIC_NO_PLAYBACK_TIMEOUT_MS',
    DEFAULT_NO_PLAYBACK_TIMEOUT_MS,
  );
  private readonly emptyChannelTimeoutMs = readTimeoutMs(
    'MUSIC_EMPTY_CHANNEL_TIMEOUT_MS',
    DEFAULT_EMPTY_CHANNEL_TIMEOUT_MS,
  );

  private client: Client | null = null;
  private player: DisTube | null = null;
  private voiceStateBound = false;

  bindClient(client: Client, player: DisTube): void {
    // Se registra una sola vez para evitar listeners duplicados al reiniciar servicios.
    this.client = client;
    this.player = player;

    if (this.voiceStateBound) {
      return;
    }

    client.on(Events.VoiceStateUpdate, (oldState, newState) => {
      void this.handleVoiceStateUpdate(oldState, newState);
    });

    this.voiceStateBound = true;
  }

  notifyPlaybackActive(queue: Queue): void {
    // Si hay reproduccion o se agregan canciones, cancelamos timers de inactividad.
    this.cancelNoPlaybackDisconnect(queue.id, 'playback_active');
    this.cancelEmptyChannelDisconnect(queue.id, 'playback_active');
  }

  // Programa ejecucion diferida de un recheck o timeout.
  scheduleNoPlaybackDisconnect(queue: Queue, reason: string): void {
    // Se usa cuando la cola termina o se elimina. Si el bot sigue en voz sin reproducir,
    // lo desconectamos tras un timeout configurable para no dejarlo "colgado".
    this.clearTimer(this.noPlaybackTimers, queue.id);

    const timeout = setTimeout(() => {
      void this.executeNoPlaybackDisconnect(queue.id, reason);
    }, this.noPlaybackTimeoutMs);

    timeout.unref?.();
    this.noPlaybackTimers.set(queue.id, timeout);

    musicLogger.info(
      {
        event: 'schedule_disconnect',
        type: 'no_playback',
        guildId: queue.id,
        timeoutMs: this.noPlaybackTimeoutMs,
        reason,
      },
      'scheduled no-playback disconnect',
    );
  }

  cancelNoPlaybackDisconnect(guildId: string, reason: string): void {
    const cancelled = this.clearTimer(this.noPlaybackTimers, guildId);

    if (cancelled) {
      musicLogger.debug(
        { event: 'cancel_disconnect', type: 'no_playback', guildId, reason },
        'cancelled no-playback disconnect',
      );
    }
  }

  cancelEmptyChannelDisconnect(guildId: string, reason: string): void {
    const cancelled = this.clearTimer(this.emptyChannelTimers, guildId);

    if (cancelled) {
      musicLogger.debug(
        { event: 'cancel_disconnect', type: 'empty_channel', guildId, reason },
        'cancelled empty-channel disconnect',
      );
    }
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  clearGuildTimers(guildId: string, reason: string): void {
    this.cancelNoPlaybackDisconnect(guildId, reason);
    this.cancelEmptyChannelDisconnect(guildId, reason);
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  private clearTimer(map: Map<string, TimerHandle>, guildId: string): boolean {
    const timeout = map.get(guildId);

    if (!timeout) {
      return false;
    }

    clearTimeout(timeout);
    map.delete(guildId);
    return true;
  }

  private getDependencies(): { client: Client; player: DisTube } | null {
    if (!this.client || !this.player) {
      return null;
    }

    return { client: this.client, player: this.player };
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  private resolveTrackedTextChannel(guildId: string): GuildTextBasedChannel | undefined {
    const deps = this.getDependencies();
    if (!deps) {
      return undefined;
    }

    const trackedChannelId = musicControlMessageService.getTrackedChannelId(guildId);
    if (!trackedChannelId) {
      return undefined;
    }

    const channel = deps.client.channels.cache.get(trackedChannelId);
    if (!channel || !channel.isTextBased()) {
      return undefined;
    }

    return channel as GuildTextBasedChannel;
  }

  private async executeNoPlaybackDisconnect(guildId: string, reason: string): Promise<void> {
    this.noPlaybackTimers.delete(guildId);

    const deps = this.getDependencies();
    if (!deps) {
      return;
    }

    const { player } = deps;
    const voice = player.voices.get(guildId);

    if (!voice) {
      return;
    }

    const queue = player.getQueue(guildId);
    if (queue && queue.songs.length > 0) {
      // Si en el timeout ya reaparecio cola activa, no desconectamos.
      return;
    }

    const textChannel = queue?.textChannel ?? this.resolveTrackedTextChannel(guildId);

    player.voices.leave(guildId);
    this.cancelEmptyChannelDisconnect(guildId, 'no_playback_disconnect_executed');

    const idleOptions: {
      channel?: GuildTextBasedChannel;
      reason: string;
    } = {
      reason: 'Desconectado por inactividad (sin reproduccion).',
    };

    if (textChannel) {
      idleOptions.channel = textChannel;
    }

    await musicControlMessageService.syncIdle(guildId, idleOptions);

    musicLogger.info(
      { event: 'disconnect', type: 'no_playback', guildId, reason },
      'voice disconnected due to no playback inactivity',
    );
  }

  private async executeEmptyChannelDisconnect(guildId: string): Promise<void> {
    this.emptyChannelTimers.delete(guildId);

    const deps = this.getDependencies();
    if (!deps) {
      return;
    }

    const { player } = deps;
    const voice = player.voices.get(guildId);

    if (!voice) {
      return;
    }

    const voiceChannel = voice.channel;
    const humanCount = voiceChannel.members.filter((member) => !member.user.bot).size;

    if (humanCount > 0) {
      return;
    }

    const queue = player.getQueue(guildId);
    const textChannel = queue?.textChannel ?? this.resolveTrackedTextChannel(guildId);

    player.voices.leave(guildId);
    this.cancelNoPlaybackDisconnect(guildId, 'empty_channel_disconnect_executed');

    const idleOptions: {
      channel?: GuildTextBasedChannel;
      reason: string;
    } = {
      reason: 'Desconectado por inactividad (canal de voz vacio).',
    };

    if (textChannel) {
      idleOptions.channel = textChannel;
    }

    await musicControlMessageService.syncIdle(guildId, idleOptions);

    musicLogger.info(
      { event: 'disconnect', type: 'empty_channel', guildId },
      'voice disconnected because voice channel is empty',
    );
  }

  private async handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): Promise<void> {
    const deps = this.getDependencies();
    if (!deps) {
      return;
    }

    const guild = newState.guild ?? oldState.guild;
    const guildId = guild.id;
    const player = deps.player;

    const voice = player.voices.get(guildId);
    if (!voice) {
      // Si el bot no esta conectado en ese guild, limpiamos timers residuales.
      this.clearGuildTimers(guildId, 'bot_not_connected');
      return;
    }

    const botVoiceChannel = voice.channel;
    const humanCount = botVoiceChannel.members.filter((member) => !member.user.bot).size;

    if (humanCount > 0) {
      this.cancelEmptyChannelDisconnect(guildId, 'humans_present');
      return;
    }

    if (this.emptyChannelTimers.has(guildId)) {
      return;
    }

    const timeout = setTimeout(() => {
      void this.executeEmptyChannelDisconnect(guildId);
    }, this.emptyChannelTimeoutMs);

    timeout.unref?.();
    this.emptyChannelTimers.set(guildId, timeout);

    musicLogger.info(
      {
        event: 'schedule_disconnect',
        type: 'empty_channel',
        guildId,
        timeoutMs: this.emptyChannelTimeoutMs,
      },
      'scheduled empty-channel disconnect',
    );
  }
}

export const musicInactivityService = new MusicInactivityService();
