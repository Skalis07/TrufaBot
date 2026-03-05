/**
 * @file src/modules/music/commands/nowplaying.ts
 * @description Comando slash de musica (nowplaying): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const nowPlayingCommand: AppCommand = {
  name: 'nowplaying',
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Muestra la pista actual y el estado del reproductor'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    await runMusicSlashCommand(interaction, () => musicService.getNowPlayingSummary(interaction));
  },
};
