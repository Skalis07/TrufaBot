/**
 * @file src/modules/music/ui/now-playing-embed.ts
 * @description Construye el embed de now playing y campos auxiliares mostrados al usuario.
 */
import { EmbedBuilder } from 'discord.js';
import { RepeatMode, type Queue } from 'distube';

type NowPlayingEmbedOptions = {
  autoplayRecommendationLabel?: string | undefined;
  nextTrackFieldName?: string | undefined;
  requestedByLabel?: string | undefined;
};

// Construye parte de la UI enviada a Discord (embed/componente/campo).
function toRepeatLabel(mode: RepeatMode): string {
  // Traduce el enum numerico de DisTube a texto estable para footer/UI.
  if (mode === RepeatMode.SONG) return 'TRACK';
  if (mode === RepeatMode.QUEUE) return 'QUEUE';
  return 'OFF';
}

// Construye parte de la UI enviada a Discord (embed/componente/campo).
function formatSongTitle(songName: string, songUrl?: string): string {
  // Si la pista trae URL, convertimos el titulo en markdown clickeable dentro del embed.
  if (!songUrl) return songName;
  return `[${songName}](${songUrl})`;
}

// Construye parte de la UI enviada a Discord (embed/componente/campo).
export function buildNowPlayingEmbed(queue: Queue, options?: NowPlayingEmbedOptions): EmbedBuilder {
  // Construye el embed principal del panel de musica usando la pista actual (song[0]).
  // Se llama tanto al iniciar reproduccion como al actualizar estado (pause/loop/etc).
  const song = queue.songs[0];
  const title = song?.name ?? 'Sin titulo';
  const duration = song?.isLive ? 'LIVE' : song?.formattedDuration ?? '00:00';
  const requestedBy = options?.requestedByLabel ?? (song?.member ? `<@${song.member.id}>` : 'Desconocido');
  const source = song?.source?.toUpperCase() ?? 'UNKNOWN';
  // Algunas fuentes/resoluciones pueden venir con metadata parcial (sin uploader).
  // El panel no debe crashear por eso; mostramos fallback amigable.
  const uploader = song?.uploader?.name ?? 'Desconocido';
  const queueRemaining = Math.max(queue.songs.length - 1, 0);
  const nextQueuedSong = queue.songs[1];
  const nextTrackLabel = nextQueuedSong?.name ?? options?.autoplayRecommendationLabel ?? 'Sin tracks';
  const nextTrackFieldName = nextQueuedSong ? 'Siguiente' : options?.nextTrackFieldName ?? 'Siguiente';

  return new EmbedBuilder()
    .setColor(0x2f9ed9)
    .setTitle('Now Playing')
    .setDescription(`${formatSongTitle(title, song?.url)}\n- **(${duration})**\n- ${requestedBy}`)
    .addFields(
      { name: 'Song By', value: uploader, inline: true },
      { name: 'Source', value: source, inline: true },
      { name: 'Queue', value: `${queueRemaining}`, inline: true },
      { name: nextTrackFieldName, value: nextTrackLabel, inline: false },
    )
    .setFooter({
      text: `Autoplay: ${queue.autoplay ? 'ON' : 'OFF'} | Loop: ${toRepeatLabel(queue.repeatMode)} | Vol: ${queue.volume}%`,
    })
    .setTimestamp();
}

// Construye parte de la UI enviada a Discord (embed/componente/campo).
export function buildIdleMusicEmbed(reason: string): EmbedBuilder {
  // Embed de estado inactivo cuando termina cola, se borra queue o se desconecta el bot.
  return new EmbedBuilder()
    .setColor(0x5f6368)
    .setTitle('Now Playing')
    .setDescription(reason)
    .setTimestamp();
}
