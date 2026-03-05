/**
 * @file src/modules/music/commands/autoplay.ts
 * @description Comando slash de musica (autoplay): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const autoplayCommand: AppCommand = {
  name: 'autoplay',
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Activa o desactiva autoplay')
    .addStringOption((option) =>
      option
        .setName('modo')
        .setDescription('Estado de autoplay')
        .setRequired(true)
        .addChoices(
          { name: 'on', value: 'on' },
          { name: 'off', value: 'off' },
        ),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // En slash command exigimos modo explicito para que el usuario vea claramente el estado final.
    await runMusicSlashCommand(interaction, async () => {
      const mode = interaction.options.getString('modo', true);
      // Convertimos el string a boolean y delegamos toda la logica al servicio.
      return musicService.setAutoplay(interaction, mode === 'on');
    });
  },
};
