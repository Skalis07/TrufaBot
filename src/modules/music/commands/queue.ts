/**
 * @file src/modules/music/commands/queue.ts
 * @description Comando slash de musica (queue): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const queueCommand: AppCommand = {
  name: 'queue',
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Muestra la cola actual de musica (paginada)')
    .addIntegerOption((option) =>
      option
        .setName('pagina')
        .setDescription('Pagina de la cola (solo siguientes canciones)')
        .setRequired(false)
        .setMinValue(1),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Reutiliza el mismo resumen que el boton `QUEUE` para mantener una unica fuente de verdad.
    await runMusicSlashCommand(interaction, async () => {
      const page = interaction.options.getInteger('pagina', false);
      return musicService.getQueueSummary(interaction, page ?? undefined);
    });
  },
};
