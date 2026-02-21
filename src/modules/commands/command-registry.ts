import { helpCommand } from './help.js';
import { pingCommand } from './ping.js';
import type { AppCommand } from './command.js';
import { uptimeCommand } from './uptime.js';

// Fuente unica de verdad de comandos.
// Si agregas un nuevo comando, solo debes importarlo y sumarlo aqui.
export const commandList: AppCommand[] = [pingCommand, helpCommand, uptimeCommand];

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
