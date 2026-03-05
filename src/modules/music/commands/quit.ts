/**
 * @file src/modules/music/commands/quit.ts
 * @description Comando slash de musica (quit): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const quitCommand: AppCommand = {
  name: 'quit',
  data: new SlashCommandBuilder()
    .setName('quit')
    .setDescription('Desconecta al bot del canal de voz y finaliza la sesion'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Comando de salida manual: desconecta voz y corta la sesion actual si existia.
    await runMusicSlashCommand(interaction, async () => {
      return musicService.quit(interaction);
    });
  },
};
