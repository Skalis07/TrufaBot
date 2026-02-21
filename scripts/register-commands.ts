import 'dotenv/config';
// Carga automaticamente variables de .env en process.env.
// Sin esto, DISCORD_TOKEN/CLIENT_ID/GUILD_IDS pueden venir undefined.

import { REST, Routes } from 'discord.js';
// REST: cliente HTTP para pegarle a la API de Discord.
// Routes: helpers para construir endpoints correctos.

import { commandJson } from '../src/modules/commands/command-registry.js';
// commandJson ya trae todos los comandos listos para registrar.

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildIdsRaw = process.env.GUILD_IDS;
// Leemos variables de entorno necesarias para registrar comandos.

if (!token || !clientId || !guildIdsRaw) {
  throw new Error('Faltan DISCORD_TOKEN, CLIENT_ID o GUILD_IDS en .env');
}
// Fallar rapido si falta algo critico.
// Mejor error explicito ahora que fallo confuso mas adelante.

const guildIds = guildIdsRaw
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);
// Permitimos uno o varios guild IDs separados por coma.
// trim() limpia espacios, filter(Boolean) quita vacios.

const rest = new REST({ version: '10' }).setToken(token);
// Cliente REST de Discord API v10 autenticado con token de bot.

for (const guildId of guildIds) {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commandJson,
  });
  // applicationGuildCommands = registro en servidor especifico (rapido).
  // PUT reemplaza el set completo de comandos de esa app en ese guild.

  console.log(`Comandos registrados en guild ${guildId}`);
  // Log de control para confirmar en que guild quedo registrado.
}
