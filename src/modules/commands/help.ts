import type { ChatInputCommandInteraction } from 'discord.js';
import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from './command.js';
// Importamos:
// - ChatInputCommandInteraction: tipo del slash command ya ejecutado.
// - SlashCommandBuilder: constructor para definir el comando que se registra.
// - MessageFlags: permite marcar respuestas efimeras sin usar `ephemeral` (deprecated).

export async function handleHelp(interaction: ChatInputCommandInteraction): Promise<void> {
  // Handler que se ejecuta cuando un usuario usa /help.
  // Es async porque reply() devuelve Promise.

  const lines = [
    '**Comandos disponibles:**',
    '`/ping` - Health check y latencia',
    '`/help` - Muestra esta ayuda',
    '`/uptime` - Tiempo encendido del bot',
  ];
  // Construimos las lineas del mensaje de ayuda.
  // Usamos un array para mantener el contenido ordenado y facil de mantener.

  await interaction.reply({
    content: lines.join('\n'),
    flags: MessageFlags.Ephemeral,
  });
  // Enviamos la respuesta al slash command.
  // lines.join('\n') une las lineas con saltos de linea para formatear el mensaje.
  // flags: Ephemeral hace que solo el usuario que ejecuto el comando vea la respuesta.
}

export const helpCommand: AppCommand = {
  name: 'help',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra los comandos disponibles'),
  // Definimos el comando slash:
  // - setName('help'): el usuario escribira /help
  // - setDescription(...): texto visible en Discord cuando aparece el comando.
  execute: handleHelp,
};
