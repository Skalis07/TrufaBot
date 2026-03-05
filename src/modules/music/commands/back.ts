/**
 * @file src/modules/music/commands/back.ts
 * @description Comando slash de musica (back): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const backCommand: AppCommand = {
  name: 'back',
  data: new SlashCommandBuilder().setName('back').setDescription('Vuelve a la pista anterior'),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Usa el historial `previousSongs` de DisTube para volver atras.
    await runMusicSlashCommand(interaction, () => musicService.back(interaction));
  },
};
