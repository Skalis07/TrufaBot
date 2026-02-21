import type { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

// Contrato comun para todos los slash commands de la app.
// Obliga a que cada comando exponga:
// - name: nombre usado para mapear en runtime
// - data: definicion para registrar en Discord
// - execute: handler que ejecuta la logica del comando
export type AppCommand = {
  name: string;
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};
