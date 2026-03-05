/**
 * @file src/modules/music/commands/skip.ts
 * @description Comando slash de musica (skip): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const skipCommand: AppCommand = {
  name: 'skip',
  data: new SlashCommandBuilder().setName('skip').setDescription('Salta a la siguiente pista'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Salto controlado de pista (tambien usado por el boton SKIP via servicio).
    await runMusicSlashCommand(interaction, () => musicService.skip(interaction));
  },
};
