/**
 * @file src/commands/command-registration.ts
 * @description Helpers compartidos para registrar slash commands por guild.
 */
import { DiscordAPIError, REST, Routes } from 'discord.js';

import { commandJson } from './command-registry.js';

export function createCommandRegistrationRest(token: string): REST {
  return new REST({ version: '10' }).setToken(token);
}

export async function registerGuildCommands(
  rest: REST,
  clientId: string,
  guildId: string,
): Promise<void> {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commandJson,
  });
}

export function formatGuildCommandRegistrationError(
  guildId: string,
  error: unknown,
): string {
  if (error instanceof DiscordAPIError) {
    return `No se pudieron registrar comandos en guild ${guildId}: ${error.code} ${error.message}`;
  }

  if (error instanceof Error) {
    return `Error inesperado al registrar comandos en guild ${guildId}: ${error.message}`;
  }

  return `Error inesperado al registrar comandos en guild ${guildId}`;
}
