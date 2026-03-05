/**
 * @file src/modules/music/commands/play.ts
 * @description Comando slash de musica (play): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const playCommand: AppCommand = {
  name: 'play',
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Reproduce musica por URL o busqueda de texto')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('URL de YouTube/Spotify o texto para buscar')
        .setRequired(true),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Delegamos el flujo comun (defer + manejo de errores) al wrapper.
    await runMusicSlashCommand(interaction, async () => {
      // `query` puede ser URL o texto libre; `musicService.play` se encarga de normalizarlo.
      const query = interaction.options.getString('query', true);
      return musicService.play(interaction, query);
    });
  },
};
