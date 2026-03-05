/**
 * @file src/modules/music/commands/volume.ts
 * @description Comando slash de musica (volume): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const volumeCommand: AppCommand = {
  name: 'volume',
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Muestra o ajusta el volumen del reproductor')
    .addIntegerOption((option) =>
      option
        .setName('valor')
        .setDescription('Porcentaje de volumen (1-200). Si no lo pones, muestra el actual')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(200),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    await runMusicSlashCommand(interaction, async () => {
      const value = interaction.options.getInteger('valor', false);
      return musicService.setVolume(interaction, value ?? undefined);
    });
  },
};
