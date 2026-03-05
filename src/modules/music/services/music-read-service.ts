/**
 * @file src/modules/music/services/music-read-service.ts
 * @description Caso de uso de lecturas de estado (now playing, queue, ayudas de visualizacion).
 */
import type { ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';
import type { Queue } from 'distube';
import { formatQueueSong, toRepeatLabel } from '../shared/music-command-utils.js';
import type { VoiceContext } from './music-voice-context-service.js';

const DEFAULT_QUEUE_PAGE_SIZE = 10;

type MusicInteraction = ChatInputCommandInteraction | ButtonInteraction;

type AutoplayPrefetchDisplayLike = {
  status: 'none' | 'pending' | 'ready' | 'empty' | 'failed';
  label: string | null;
};

type MusicReadServiceDeps = {
  runLoggedAction: (
    interaction: MusicInteraction,
    action: string,
    task: () => Promise<string>,
  ) => Promise<string>;
  getVoiceContext: (
    interaction: MusicInteraction,
    options?: { requireQueue?: boolean },
  ) => Promise<VoiceContext>;
  getRequestedByLabelForQueueSong: (
    guildId: string,
    song: Queue['songs'][number] | undefined,
  ) => string;
  getAutoplayPrefetchDisplay: (guildId: string) => AutoplayPrefetchDisplayLike;
};

export class MusicReadService {
  constructor(private readonly deps: MusicReadServiceDeps) {}

  async getNowPlayingSummary(interaction: MusicInteraction): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'nowplaying', async () => {
      const context = await this.deps.getVoiceContext(interaction);
      const queue = context.queue;

      if (!queue || queue.songs.length === 0) {
        return 'No hay pista activa en este momento.';
      }

      const current = queue.songs[0];
      if (!current) {
        return 'No hay pista activa en este momento.';
      }

      const duration = current.isLive ? 'LIVE' : current.formattedDuration;
      const requestedBy = this.deps.getRequestedByLabelForQueueSong(queue.id, current);
      const source = current.source?.toUpperCase() ?? 'UNKNOWN';

      return [
        `**Now Playing:** ${formatQueueSong(current)}`,
        `**Progreso:** ${queue.formattedCurrentTime} / ${duration}`,
        `**Solicitado por:** ${requestedBy}`,
        `**Source:** ${source}`,
        `**Estado:** ${queue.paused ? 'PAUSADO' : 'SONANDO'} | Loop: ${toRepeatLabel(queue.repeatMode)} | Autoplay: ${queue.autoplay ? 'ON' : 'OFF'} | Vol: ${queue.volume}%`,
      ].join('\n');
    });
  }

  async getQueueSummary(interaction: MusicInteraction, requestedPage?: number): Promise<string> {
    return this.deps.runLoggedAction(interaction, 'queue', async () => {
      const context = await this.deps.getVoiceContext(interaction);
      const queue = context.queue;

      if (!queue || queue.songs.length === 0) {
        return 'La cola esta vacia.';
      }

      const current = queue.songs[0];
      if (!current) {
        return 'La cola esta vacia.';
      }

      const upcomingAll = queue.songs.slice(1);
      const totalPages = Math.max(1, Math.ceil(upcomingAll.length / DEFAULT_QUEUE_PAGE_SIZE));
      const rawPage = requestedPage ?? 1;
      const page = Math.max(1, Math.min(totalPages, Math.floor(rawPage)));

      const start = (page - 1) * DEFAULT_QUEUE_PAGE_SIZE;
      const end = start + DEFAULT_QUEUE_PAGE_SIZE;
      const upcomingPage = upcomingAll.slice(start, end);

      const lines: string[] = [
        `**Ahora:** ${formatQueueSong(current)}`,
        `**Estado:** ${queue.paused ? 'PAUSADO' : 'SONANDO'} | Loop: ${toRepeatLabel(queue.repeatMode)} | Autoplay: ${queue.autoplay ? 'ON' : 'OFF'}`,
        `**Cola total:** ${queue.songs.length - 1} en espera`,
        `**Duracion total:** ${queue.formattedDuration}`,
        `**Pagina:** ${page}/${totalPages}`,
      ];

      if (upcomingPage.length > 0) {
        lines.push('');
        lines.push('**Siguiente en cola:**');

        for (const [index, song] of upcomingPage.entries()) {
          const absoluteIndex = start + index + 1;
          lines.push(formatQueueSong(song, absoluteIndex));
        }
      } else {
        lines.push('');
        lines.push('**Siguiente en cola:** sin canciones adicionales.');
      }

      const autoplayPrefetch = this.deps.getAutoplayPrefetchDisplay(context.guildId);
      const autoplayRecommendationLabel =
        autoplayPrefetch.status === 'ready' && autoplayPrefetch.label
          ? autoplayPrefetch.label
          : queue.autoplay
            ? 'Buscando recomendacion...'
            : 'Sin tracks';
      lines.push(`**Recomendacion autoplay:** ${autoplayRecommendationLabel}`);

      return lines.join('\n');
    });
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicReadService(deps: MusicReadServiceDeps): MusicReadService {
  return new MusicReadService(deps);
}
