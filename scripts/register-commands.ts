/**
 * @file scripts/register-commands.ts
 * @description Script operativo para registrar/actualizar slash commands en Discord (despliegue de comandos).
 */
import "dotenv/config";
// Carga automaticamente variables de .env en process.env.
// Sin esto, DISCORD_TOKEN/CLIENT_ID/GUILD_IDS pueden venir undefined.

import { DiscordAPIError, REST, Routes } from "discord.js";
// REST: cliente HTTP para pegarle a la API de Discord.
// Routes: helpers para construir endpoints correctos.

import { commandJson } from "../src/commands/command-registry.js";
// commandJson ya trae todos los comandos listos para registrar.

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildIdsRaw = process.env.GUILD_IDS;
// Leemos variables de entorno necesarias para registrar comandos.

if (!token || !clientId || !guildIdsRaw) {
  throw new Error("Faltan DISCORD_TOKEN, CLIENT_ID o GUILD_IDS en .env");
}
// Fallar rapido si falta algo critico.
// Mejor error explicito ahora que fallo confuso mas adelante.

const guildIds = guildIdsRaw
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);
// Permitimos uno o varios guild IDs separados por coma.
// trim() limpia espacios, filter(Boolean) quita vacios.

if (guildIds.length === 0) {
  throw new Error("GUILD_IDS no contiene IDs validos");
}

const rest = new REST({ version: "10" }).setToken(token);
// Cliente REST de Discord API v10 autenticado con token de bot.

const failedGuildIds: string[] = [];

for (const guildId of guildIds) {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandJson,
    });
    // applicationGuildCommands = registro en servidor especifico (rapido).
    // PUT reemplaza el set completo de comandos de esa app en ese guild.

    console.log(`Comandos registrados en guild ${guildId}`);
    // Log de control para confirmar en que guild quedo registrado.
  } catch (error) {
    failedGuildIds.push(guildId);

    if (error instanceof DiscordAPIError) {
      console.error(
        `No se pudieron registrar comandos en guild ${guildId}: ${error.code} ${error.message}`,
      );
      continue;
    }

    if (error instanceof Error) {
      console.error(
        `Error inesperado al registrar comandos en guild ${guildId}: ${error.message}`,
      );
      continue;
    }

    console.error(`Error inesperado al registrar comandos en guild ${guildId}`);
  }
}

if (failedGuildIds.length > 0) {
  console.error(
    `Registro incompleto. Guilds con error: ${failedGuildIds.join(", ")}`,
  );
  process.exitCode = 1;
}
