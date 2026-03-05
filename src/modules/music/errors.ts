/**
 * @file src/modules/music/errors.ts
 * @description Errores de dominio/control del modulo de musica para separar errores de usuario de errores tecnicos.
 */
export class MusicUserError extends Error {
  constructor(message: string) {
    // Error controlado para validaciones de usuario (voz, permisos, estado de cola, etc).
    // Se diferencia de errores inesperados para mostrar mensajes claros sin stacktrace tecnico.
    super(message);
    this.name = 'MusicUserError';
  }
}
