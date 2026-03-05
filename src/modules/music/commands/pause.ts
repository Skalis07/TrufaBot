/**
 * @file src/modules/music/commands/pause.ts
 * @description Comando slash de musica (pause): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const pauseCommand: AppCommand = {
  name: 'pause',
  data: new SlashCommandBuilder().setName('pause').setDescription('Pausa la pista actual'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // `musicService.pause` valida queue/voz/permisos y actualiza el panel de botones.
    await runMusicSlashCommand(interaction, () => musicService.pause(interaction));
  },
};
