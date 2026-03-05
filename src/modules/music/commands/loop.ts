/**
 * @file src/modules/music/commands/loop.ts
 * @description Comando slash de musica (loop): valida entrada minima y delega la logica al servicio de musica.
 */
import { SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../../commands/command.js';
import type { LoopModeName } from '../constants.js';
import { musicService } from '../services/music-service.js';
import { runMusicSlashCommand } from './run-music-slash.js';

export const loopCommand: AppCommand = {
  name: 'loop',
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Configura o alterna el modo loop')
    .addStringOption((option) =>
      option
        .setName('modo')
        .setDescription('off, track o queue (si no lo pones, alterna)')
        .setRequired(false)
        .addChoices(
          { name: 'off', value: 'off' },
          { name: 'track', value: 'track' },
          { name: 'queue', value: 'queue' },
        ),
    ),
  // Punto de entrada del comando; valida entrada y delega en la capa de servicio.
  execute: async (interaction) => {
    // Si `modo` no viene, el servicio alterna el loop ciclicamente.
    await runMusicSlashCommand(interaction, async () => {
      const mode = interaction.options.getString('modo', false) as LoopModeName | null;
      return musicService.setLoopMode(interaction, mode ?? undefined);
    });
  },
};
