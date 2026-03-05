/**
 * @file src/commands/command-registry.ts
 * @description Centraliza la lista de comandos disponibles y expone el registro para resolucion en runtime.
 */
import type { AppCommand } from './command.js';
import { utilityCommands } from '../modules/utility/index.js';
import { musicCommands } from '../modules/music/commands/index.js';

// Fuente unica de verdad de comandos.
// Cada modulo exporta su arreglo y el registry solo compone esos bloques.
export const commandList: AppCommand[] = [...utilityCommands, ...musicCommands];

// Guardia defensiva para evitar nombres duplicados.
const names = new Set<string>();
for (const command of commandList) {
  if (names.has(command.name)) {
    throw new Error(`Comando duplicado en registry: ${command.name}`);
  }
  names.add(command.name);
}

// Estructuras derivadas reutilizadas por runtime y registro:
// - commandMap: lookup rapido por nombre en index.ts
// - commandJson: payload listo para REST API de Discord
export const commandMap = new Map(commandList.map((command) => [command.name, command]));
export const commandJson = commandList.map((command) => command.data.toJSON());
