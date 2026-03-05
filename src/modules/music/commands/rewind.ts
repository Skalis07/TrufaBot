/**
 * @file src/modules/music/commands/rewind.ts
 * @description Comando slash de musica (rewind): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const rewindCommand: AppCommand = {
  name: 'rewind',
  data: new SlashCommandBuilder()
    .setName('rewind')
    .setDescription('Retrocede segundos de la pista actual')
    .addIntegerOption((option) =>
      option
        .setName('segundos')
        .setDescription('Segundos a retroceder (1-120, default 10)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(120),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // `segundos` es opcional; el servicio aplica default si no se envia.
    await runMusicSlashCommand(interaction, async () => {
      const seconds = interaction.options.getInteger('segundos', false);
      return musicService.rewind(interaction, seconds ?? undefined);
    });
  },
};
