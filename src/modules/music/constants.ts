/**
 * @file src/modules/music/constants.ts
 * @description Constantes y tipos literales del modulo de musica (nombres de comandos, limites y keys compartidas).
 */
// Prefijo versionado para todos los botones de musica.
// Si cambiamos el formato en el futuro, podemos migrar a `music:v2:*`
// sin romper mensajes antiguos.
export const MUSIC_BUTTON_PREFIX = 'music:v1';

// Lista canonica de acciones soportadas por el panel de musica.
// Se reutiliza para validar `customId` y derivar tipos seguros.
export const MUSIC_BUTTON_ACTIONS = [
  'queue',
  'clear',
  'back',
  'pause_resume',
  'skip',
  'autoplay',
  'loop',
  'rewind',
  'stop',
  'forward',
  'replay',
] as const;

export type MusicButtonAction = (typeof MUSIC_BUTTON_ACTIONS)[number];

// Funcion de soporte del modulo.
function createButtonId(action: MusicButtonAction): string {
  // Construye el `customId` final que viaja en cada boton de Discord.
  return `${MUSIC_BUTTON_PREFIX}:${action}`;
}

// IDs centralizados para evitar typos al construir botones y al rutear clicks.
export const MUSIC_BUTTON_IDS = {
  QUEUE: createButtonId('queue'),
  CLEAR: createButtonId('clear'),
  BACK: createButtonId('back'),
  PAUSE_RESUME: createButtonId('pause_resume'),
  SKIP: createButtonId('skip'),
  AUTOPLAY: createButtonId('autoplay'),
  LOOP: createButtonId('loop'),
  REWIND: createButtonId('rewind'),
  STOP: createButtonId('stop'),
  FORWARD: createButtonId('forward'),
  REPLAY: createButtonId('replay'),
} as const;

// Default comun para acciones de seek (botones rewind/forward).
export const DEFAULT_SEEK_SECONDS = 10;

// Modo de loop expresado como string para opciones slash y UI.
export type LoopModeName = 'off' | 'track' | 'queue';
