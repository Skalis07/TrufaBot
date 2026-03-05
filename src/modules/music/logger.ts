/**
 * @file src/modules/music/logger.ts
 * @description Logger dedicado del modulo de musica con convenciones de campos para trazabilidad operacional.
 */
import pino from 'pino';

// Logger estructurado del modulo de musica.
// Reutiliza LOG_LEVEL global si existe y agrega `module=music` para filtrar facil.
export const musicLogger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
}).child({ module: 'music' });
