/**
 * @file src/modules/music/ui/control-buttons.ts
 * @description Construye la botonera de control de musica para Discord (acciones principales y estados).
 */
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { RepeatMode, type Queue } from 'distube';
import { DEFAULT_SEEK_SECONDS, MUSIC_BUTTON_IDS } from '../constants.js';

type QueueControlState = {
  hasCurrent: boolean;
  hasHistory: boolean;
  canSeek: boolean;
  paused: boolean;
  autoplay: boolean;
  loopLabel: string;
};

// Construye parte de la UI enviada a Discord (embed/componente/campo).
function toLoopLabel(mode: RepeatMode | undefined): string {
  // Muestra el modo de loop actual directamente en el boton para reducir mensajes efimeros.
  if (mode === RepeatMode.SONG) return 'TRACK';
  if (mode === RepeatMode.QUEUE) return 'QUEUE';
  return 'OFF';
}

// Construye parte de la UI enviada a Discord (embed/componente/campo).
function deriveState(queue?: Queue): QueueControlState {
  // Resume el estado de la cola en flags simples para decidir:
  // - que botones se muestran habilitados
  // - si el label central debe ser PAUSE o RESUME
  const current = queue?.songs[0];
  const hasCurrent = Boolean(current);

  return {
    hasCurrent,
    hasHistory: (queue?.previousSongs.length ?? 0) > 0,
    canSeek: hasCurrent && !current?.isLive,
    paused: queue?.paused ?? false,
    autoplay: queue?.autoplay ?? false,
    loopLabel: toLoopLabel(queue?.repeatMode),
  };
}

// Construye parte de la UI enviada a Discord (embed/componente/campo).
export function buildMusicControlComponents(queue?: Queue): ActionRowBuilder<ButtonBuilder>[] {
  // Construye el layout del panel de controles segun el orden pedido por el usuario.
  // Discord no permite ancho fijo por boton, asi que mejoramos jerarquia por color/orden.
  const state = deriveState(queue);

  // Fila 1: acciones de consulta/limpieza de cola.
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.QUEUE)
      .setLabel('QUEUE')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.CLEAR)
      .setLabel('CLEAR')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(!state.hasCurrent),
  );

  // Fila 2: modos de reproduccion.
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.LOOP)
      .setLabel(`LOOP ${state.loopLabel}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.hasCurrent),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.AUTOPLAY)
      .setLabel(`AUTOPLAY ${state.autoplay ? 'ON' : 'OFF'}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.hasCurrent),
  );

  // Fila 3: seek + control central de reproduccion.
  const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.REWIND)
      .setLabel(`REWIND (${DEFAULT_SEEK_SECONDS}s)`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.canSeek),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.PAUSE_RESUME)
      .setLabel(state.paused ? 'RESUME' : 'PAUSE')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(!state.hasCurrent),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.FORWARD)
      .setLabel(`FORWARD (${DEFAULT_SEEK_SECONDS}s)`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.canSeek),
  );

  // Fila 4: salto, volver a pista anterior, reinicio y stop.
  const row4 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.SKIP)
      .setLabel('SKIP')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.hasCurrent),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.BACK)
      .setLabel('BACK')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.hasHistory),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.REPLAY)
      .setLabel('REPLAY')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!state.canSeek),
    new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.STOP)
      .setLabel('STOP')
      .setStyle(ButtonStyle.Danger)
      .setDisabled(!state.hasCurrent),
  );

  // Discord permite hasta 5 filas; aqui usamos 4.
  return [row1, row2, row3, row4];
}
