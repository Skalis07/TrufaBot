/**
 * @file src/modules/music/commands/replay.ts
 * @description Comando slash de musica (replay): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const replayCommand: AppCommand = {
  name: 'replay',
  data: new SlashCommandBuilder().setName('replay').setDescription('Reinicia la pista actual desde 00:00'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Wrapper simple sobre `seek(0)` con validaciones de queue/live.
    await runMusicSlashCommand(interaction, () => musicService.replay(interaction));
  },
};
