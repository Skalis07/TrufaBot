/**
 * @file src/modules/music/shared/music-command-utils.ts
 * @description Helpers compartidos de parsing/normalizacion para comandos de musica.
 */
import { RepeatMode, type Queue } from 'distube';
import { MusicUserError } from '../errors.js';

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function toRepeatLabel(mode: RepeatMode): string {
  // Convierte el enum de DisTube a un texto corto uniforme para respuestas y `/queue`.
  if (mode === RepeatMode.SONG) return 'TRACK';
  if (mode === RepeatMode.QUEUE) return 'QUEUE';
  return 'OFF';
}

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function sanitizeSeconds(value: number | null | undefined, fallback: number): number {
  // Normaliza inputs de seek:
  // - si viene null/undefined, usa default
  // - fuerza entero y limita rango para evitar seeks absurdos
  if (!value || Number.isNaN(value)) {
    return fallback;
  }

  return Math.max(1, Math.min(120, Math.floor(value)));
}

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function normalizePlayInput(rawInput: string): string {
  // `/play` acepta URL o texto libre.
  // Si es texto, lo convertimos a `ytsearch:` para forzar busqueda en YouTube.
  const input = rawInput.trim();

  if (!input) {
    throw new MusicUserError('Debes indicar una URL o busqueda para /play.');
  }

  const isUrl = /^https?:\/\//i.test(input);
  const isPrefixedSearch = /^(ytsearch:|scsearch:)/i.test(input);

  if (isUrl || isPrefixedSearch) {
    return input;
  }

  return `ytsearch:${input}`;
}

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function formatQueueSong(song: Queue['songs'][number], index?: number): string {
  // Formato compacto reutilizado por `/queue` para pista actual y proximas.
  const positionPrefix = index !== undefined ? `${index}. ` : '';
  const title = song.name ?? 'Sin titulo';
  const duration = song.isLive ? 'LIVE' : song.formattedDuration;

  return `${positionPrefix}${title} (${duration})`;
}
