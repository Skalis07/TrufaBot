/**
 * @file src/modules/utility/uptime.ts
 * @description Comando uptime: reporta tiempo de actividad del bot en formato legible.
 */
import type { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../commands/command.js';
// Importamos:
// - ChatInputCommandInteraction: tipo del slash command ya ejecutado.
// - SlashCommandBuilder: constructor para definir el comando que se registra.

// Convierte milisegundos en una cadena corta legible (d/h/m/s) para respuestas de estado.
function formatDuration(ms: number): string {
  // Funcion helper para convertir milisegundos a un formato legible.
  // Ejemplo: 93784000 ms -> "1d 2h 3m 4s"

  const totalSeconds = Math.floor(ms / 1000);
  // Convertimos ms a segundos totales.

  const days = Math.floor(totalSeconds / 86400);
  // 86400 = segundos en un dia.

  const hours = Math.floor((totalSeconds % 86400) / 3600);
  // Sacamos las horas restantes despues de quitar dias.

  const minutes = Math.floor((totalSeconds % 3600) / 60);
  // Sacamos los minutos restantes despues de quitar horas.

  const seconds = totalSeconds % 60;
  // Segundos restantes finales.

  const parts: string[] = [];
  // Array donde construiremos el texto final por partes.

  if (days > 0) parts.push(`${days}d`);
  // Solo mostramos dias si hay al menos uno.

  if (hours > 0) parts.push(`${hours}h`);
  // Solo mostramos horas si hay al menos una.

  if (minutes > 0) parts.push(`${minutes}m`);
  // Solo mostramos minutos si hay al menos uno.

  parts.push(`${seconds}s`);
  // Siempre mostramos segundos para evitar string vacio.

  return parts.join(' ');
  // Unimos las partes con espacios.
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export async function handleUptime(interaction: ChatInputCommandInteraction): Promise<void> {
  // Handler que se ejecuta cuando un usuario usa /uptime.
  // Es async porque reply() devuelve Promise.

  const uptimeMs = Math.floor(process.uptime() * 1000);
  // process.uptime() devuelve segundos desde que inicio el proceso Node.
  // Lo convertimos a milisegundos para reutilizar formatDuration.

  const text = formatDuration(uptimeMs);
  // Formateamos el tiempo a un string legible.

  const startedAtUnix = Math.floor(Date.now() / 1000 - process.uptime());
  // Timestamp aproximado de arranque del proceso para mostrar fecha/hora en Discord.

  await interaction.reply({
    content: `Tiempo encendido: **${text}** | Iniciado: <t:${startedAtUnix}:F>`,
  });
  // Respondemos al slash command.
  // A diferencia del /help, esta respuesta es publica (como /ping).
}

export const uptimeCommand: AppCommand = {
  name: 'uptime',
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Muestra el tiempo encendido del bot y la hora de inicio'),
  // Definimos el comando slash:
  // - setName('uptime'): el usuario escribira /uptime
  // - setDescription(...): texto visible en Discord cuando aparece el comando.
  execute: handleUptime,
};
