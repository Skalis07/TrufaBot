/**
 * @file src/modules/utility/index.ts
 * @description Agrupa/exporta comandos utilitarios del bot.
 */
import type { AppCommand } from '../../commands/command.js';
import { helpCommand } from './help.js';
import { pingCommand } from './ping.js';
import { uptimeCommand } from './uptime.js';
import { welcomeCommand } from './welcome.js';

// Barrel del modulo utility:
// - expone re-exports individuales
// - expone una lista unificada para que el registry no crezca manualmente
export { helpCommand, pingCommand, uptimeCommand, welcomeCommand };

export const utilityCommands: AppCommand[] = [
  pingCommand,
  helpCommand,
  uptimeCommand,
  welcomeCommand,
];
