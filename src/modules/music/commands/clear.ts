/**
 * @file src/modules/music/commands/clear.ts
 * @description Comando slash de musica (clear): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const clearCommand: AppCommand = {
  name: 'clear',
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Borra la cola pendiente y mantiene la pista actual'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Wrapper comun de slash de musica:
    // - deferReply efimero
    // - errores amigables
    // - auto-borrado del feedback
    await runMusicSlashCommand(interaction, async () => {
      // Toda la logica real vive en el servicio para compartir validaciones/locks.
      return musicService.clearQueue(interaction);
    });
  },
};
