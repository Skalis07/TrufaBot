/**
 * @file src/modules/music/commands/forward.ts
 * @description Comando slash de musica (forward): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const forwardCommand: AppCommand = {
  name: 'forward',
  data: new SlashCommandBuilder()
    .setName('forward')
    .setDescription('Adelanta segundos de la pista actual')
    .addIntegerOption((option) =>
      option
        .setName('segundos')
        .setDescription('Segundos a adelantar (1-120, default 10)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(120),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Adelanta con limite de rango y validaciones de pista no-live dentro del servicio.
    await runMusicSlashCommand(interaction, async () => {
      const seconds = interaction.options.getInteger('segundos', false);
      return musicService.forward(interaction, seconds ?? undefined);
    });
  },
};
