/**
 * @file src/modules/music/commands/stop.ts
 * @description Comando slash de musica (stop): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const stopCommand: AppCommand = {
  name: 'stop',
  data: new SlashCommandBuilder().setName('stop').setDescription('Detiene la reproduccion y limpia la cola'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Comando destructivo: detiene audio, limpia queue y deja el panel en estado idle.
    await runMusicSlashCommand(interaction, () => musicService.stop(interaction));
  },
};
