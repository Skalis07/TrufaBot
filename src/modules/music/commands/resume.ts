/**
 * @file src/modules/music/commands/resume.ts
 * @description Comando slash de musica (resume): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const resumeCommand: AppCommand = {
  name: 'resume',
  data: new SlashCommandBuilder().setName('resume').setDescription('Reanuda la reproduccion pausada'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Reanuda reproduccion si el estado actual es pausado y refresca el panel.
    await runMusicSlashCommand(interaction, () => musicService.resume(interaction));
  },
};
