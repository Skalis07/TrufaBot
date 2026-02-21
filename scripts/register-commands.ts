import 'dotenv/config';
// Carga automaticamente variables de .env en process.env.
// Sin esto, DISCORD_TOKEN/CLIENT_ID/GUILD_IDS pueden venir undefined.

import { REST, Routes } from 'discord.js';
// REST: cliente HTTP para pegarle a la API de Discord.
// Routes: helpers para construir endpoints correctos.

import { pingCommand } from '../src/modules/utility/application/commands/ping.js';
// Importamos la definicion del comando.
// Ojo: usamos .js en el import por ESM/nodenext (explicado al final).
import { helpCommand } from '../src/modules/utility/application/commands/help.js';
// Nuevo: definicion de /help.
import { uptimeCommand } from '../src/modules/utility/application/commands/uptime.js';
// Nuevo: definicion de /uptime.

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

const commands = [
  pingCommand.toJSON(),
  helpCommand.toJSON(),
  uptimeCommand.toJSON(),
];
// Discord REST recibe JSON plano, no objetos SlashCommandBuilder.
// toJSON() transforma el builder al formato esperado por API.
// Si agregas otro comando, debes sumarlo aqui.

const rest = new REST({ version: '10' }).setToken(token);
// Cliente REST de Discord API v10 autenticado con token de bot.

for (const guildId of guildIds) {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });
  // applicationGuildCommands = registro en servidor especifico (rapido).
  // PUT reemplaza el set completo de comandos de esa app en ese guild.

  console.log(`Comandos registrados en guild ${guildId}`);
  // Log de control para confirmar en que guild quedo registrado.
}
