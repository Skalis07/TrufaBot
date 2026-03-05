/**
 * @file src/modules/music/commands/join.ts
 * @description Comando slash de musica (join): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const joinCommand: AppCommand = {
  name: 'join',
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Hace que el bot entre a tu canal de voz sin reproducir musica'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Reutilizamos el wrapper comun de slash de musica para:
    // - deferReply efimero
    // - manejo de errores amigables
    // - auto-borrado de feedback
    await runMusicSlashCommand(interaction, async () => {
      // Toda la logica de validacion/conexion vive en el servicio.
      return musicService.join(interaction);
    });
  },
};
