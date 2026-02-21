import type { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../commands/command.js';
// Importamos:
// - ChatInputCommandInteraction: tipo del slash command ya ejecutado.
// - SlashCommandBuilder: constructor para definir el comando que se registra.

export async function handlePing(interaction: ChatInputCommandInteraction): Promise<void> {
  // Handler que se ejecuta cuando un usuario usa /ping.
  // Es async porque reply() devuelve Promise.

  const wsPing = interaction.client.ws.ping;
  // Medimos latencia WebSocket del cliente Discord.
  // No es latencia HTTP total, pero sirve como health check simple.

  const response = await interaction.reply({
    content: 'Pinging...',
    withResponse: true,
  });
  // Respondemos rapidamente al slash command.
  // withResponse: true hace que Discord nos devuelva un objeto de respuesta.
  // Esta respuesta puede NO incluir message (tipado como nullable), asi que debemos hacer guards.

  const message = response.resource?.message;
  // Extraemos el mensaje creado desde la respuesta (puede ser null).

  if (!message) {
    // Fallback seguro: si por algun motivo no recibimos message,
    // evitamos crashear y entregamos al menos el WS ping.
    await interaction.editReply(`Pong! WS: ${wsPing}ms`);
    return;
  }

  const httpPing = message.createdTimestamp - interaction.createdTimestamp;
  // Calculamos latencia HTTP (round-trip).
  // Mide el tiempo desde que Discord creó la interacción
  // hasta que el mensaje de respuesta fue creado.

  await interaction.editReply(`Pong! WS: ${wsPing}ms | HTTP: ${httpPing}ms`);
  // Editamos la respuesta original con los valores finales.
  // Usamos editReply porque una interacción solo puede responderse una vez.
}

export const pingCommand: AppCommand = {
  name: 'ping',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde con Pong y latencia'),
  // Definimos el comando slash:
  // - setName('ping'): el usuario escribira /ping
  // - setDescription(...): texto visible en Discord cuando aparece el comando.
  execute: handlePing,
};
