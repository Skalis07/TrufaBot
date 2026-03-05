/**
 * @file src/modules/music/services/music-session-command-service.ts
 * @description Caso de uso de sesion (join/quit/clear/stop) y transiciones de estado de la sala de voz.
 */
import type {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildTextBasedChannel,
} from 'discord.js';
import type { Queue } from 'distube';
import { MusicUserError } from '../errors.js';
import type { VoiceContext } from './music-voice-context-service.js';

type MusicInteraction = ChatInputCommandInteraction | ButtonInteraction;

type MusicSessionCommandServiceDeps = {
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
  syncNowPlayingPanel: (queue: Queue) => Promise<void>;
  syncIdlePanel: (
    guildId: string,
    options: { channel?: GuildTextBasedChannel; reason: string },
  ) => Promise<void>;
  joinVoiceChannel: (voiceChannel: VoiceContext['voiceChannel']) => Promise<unknown>;
  hasVoiceConnection: (guildId: string) => boolean;
  leaveVoiceChannel: (guildId: string) => void;
  suppressAutoplayContinuationOnDeleteQueue: (guildId: string, reason: string) => void;
  clearAutoplayPrefetch: (guildId: string, reason: string) => void;
  clearProgressivePlaylistLoad: (guildId: string, reason: string) => void;
  syncAutoplayPrefetchForQueue: (queue: Queue) => void;
  clearAutoplayRecentHistory: (guildId: string) => void;
  clearGuildInactivityTimers: (guildId: string, reason: string) => void;
};

export class MusicSessionCommandService {
  constructor(private readonly deps: MusicSessionCommandServiceDeps) {}

  // Conecta el bot al canal de voz del usuario.
  async join(interaction: ChatInputCommandInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'join', async () => {
      const context = await this.deps.getVoiceContext(interaction);

      return this.deps.withGuildLock(context.guildId, async () => {
        const botVoiceChannel = interaction.guild?.members.me?.voice.channel ?? null;

        if (botVoiceChannel?.id === context.voiceChannel.id) {
          if (context.queue && context.queue.songs.length > 0) {
            await this.deps.syncNowPlayingPanel(context.queue);
          } else {
            await this.deps.syncIdlePanel(context.guildId, {
              reason: `Conectado a ${context.voiceChannel.name}. Usa /play para iniciar musica.`,
              ...(context.textChannel ? { channel: context.textChannel } : {}),
            });
          }

          return 'Ya estoy conectado a tu canal de voz.';
        }

        await this.deps.joinVoiceChannel(context.voiceChannel);

        await this.deps.syncIdlePanel(context.guildId, {
          reason: `Conectado a ${context.voiceChannel.name}. Listo para reproducir musica.`,
          ...(context.textChannel ? { channel: context.textChannel } : {}),
        });

        return `Conectado al canal de voz: **${context.voiceChannel.name}**`;
      });
    });
  }

  async stop(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'stop', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);
        const fallbackChannel = context.textChannel ?? queue.textChannel;

        this.deps.suppressAutoplayContinuationOnDeleteQueue(context.guildId, 'stop_command');
        await queue.stop();
        this.deps.clearAutoplayPrefetch(context.guildId, 'stop_command');
        this.deps.clearProgressivePlaylistLoad(context.guildId, 'stop_command');
        this.deps.clearAutoplayRecentHistory(context.guildId);

        await this.deps.syncIdlePanel(context.guildId, {
          reason: 'Reproduccion detenida por un usuario.',
          ...(fallbackChannel ? { channel: fallbackChannel } : {}),
        });

        return 'Reproduccion detenida y cola limpiada.';
      });
    });
  }

  // Limpia o invalida estado temporal asociado a la operacion.
  async clearQueue(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'clear', async () => {
      const context = await this.deps.getVoiceContext(interaction, { requireQueue: true });

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = this.deps.requireQueue(context);
        const removedCount = Math.max(queue.songs.length - 1, 0);
        this.deps.clearProgressivePlaylistLoad(context.guildId, 'clear_queue_command');

        if (removedCount === 0) {
          if (queue.autoplay) {
            this.deps.syncAutoplayPrefetchForQueue(queue);
          } else {
            this.deps.clearAutoplayPrefetch(context.guildId, 'clear_queue_without_upcoming_tracks');
          }

          await this.deps.syncNowPlayingPanel(queue);
          return 'No habia pistas en cola para borrar.';
        }

        queue.songs.splice(1);

        if (queue.autoplay) {
          this.deps.syncAutoplayPrefetchForQueue(queue);
        } else {
          this.deps.clearAutoplayPrefetch(context.guildId, 'clear_queue_command');
        }

        await this.deps.syncNowPlayingPanel(queue);

        if (removedCount === 1) {
          return 'Cola limpiada. Se elimino **1** pista pendiente.';
        }

        return `Cola limpiada. Se eliminaron **${removedCount}** pistas pendientes.`;
      });
    });
  }

  // Cierra sesion de voz y libera estado asociado.
  async quit(interaction: ChatInputCommandInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'quit', async () => {
      const context = await this.deps.getVoiceContext(interaction);

      return this.deps.withGuildLock(context.guildId, async () => {
        const queue = context.queue;
        const fallbackChannel = context.textChannel ?? queue?.textChannel ?? undefined;

        if (!this.deps.hasVoiceConnection(context.guildId) && (!queue || queue.songs.length === 0)) {
          throw new MusicUserError('No estoy conectado a un canal de voz en este servidor.');
        }

        if (queue && queue.songs.length > 0) {
          this.deps.suppressAutoplayContinuationOnDeleteQueue(context.guildId, 'quit_command');
          await queue.stop();
        }

        this.deps.clearAutoplayPrefetch(context.guildId, 'quit_command');
        this.deps.clearProgressivePlaylistLoad(context.guildId, 'quit_command');
        this.deps.clearAutoplayRecentHistory(context.guildId);
        this.deps.clearGuildInactivityTimers(context.guildId, 'quit_command');

        if (this.deps.hasVoiceConnection(context.guildId)) {
          this.deps.leaveVoiceChannel(context.guildId);
        }

        await this.deps.syncIdlePanel(context.guildId, {
          reason: 'Bot desconectado del canal de voz por un usuario.',
          ...(fallbackChannel ? { channel: fallbackChannel } : {}),
        });

        return 'Bot desconectado del canal de voz y sesion de musica finalizada.';
      });
    });
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicSessionCommandService(
  deps: MusicSessionCommandServiceDeps,
): MusicSessionCommandService {
  return new MusicSessionCommandService(deps);
}
