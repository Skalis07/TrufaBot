/**
 * @file src/modules/utility/welcome.ts
 * @description Comando/evento de bienvenida: selecciona canal y envia mensaje inicial de onboarding.
 */
import type {
  ChatInputCommandInteraction,
  Guild,
  GuildBasedChannel,
  GuildTextBasedChannel,
} from 'discord.js';
import { MessageFlags, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import type { AppCommand } from '../../commands/command.js';

export const WELCOME_MESSAGE = '🐱🎶 Meow meow, ¡es hora de subir el volumen! 🔊✨😸';

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function canSendGuildMessage(guild: Guild, channel: GuildBasedChannel | null): channel is GuildTextBasedChannel {
  // Valida que el bot pueda escribir en el canal (vista + send).
  if (!channel || !channel.isTextBased()) {
    return false;
  }

  const me = guild.members.me;
  if (!me) {
    return false;
  }

  const permissions = channel.permissionsFor(me);
  if (!permissions) {
    return false;
  }

  return permissions.has([
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
  ]);
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export function pickGuildWelcomeChannel(guild: Guild): GuildTextBasedChannel | null {
  // Preferimos `systemChannel` si existe y el bot puede escribir.
  if (canSendGuildMessage(guild, guild.systemChannel)) {
    return guild.systemChannel;
  }

  // Fallback: primer canal de texto donde el bot tenga permiso de escritura.
  for (const channel of guild.channels.cache.values()) {
    if (canSendGuildMessage(guild, channel)) {
      return channel;
    }
  }

  return null;
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export async function sendGuildWelcomeMessage(guild: Guild): Promise<boolean> {
  // Reutiliza la misma logica de seleccion de canal para eventos y comandos manuales.
  const welcomeChannel = pickGuildWelcomeChannel(guild);
  if (!welcomeChannel) {
    return false;
  }

  await welcomeChannel.send(WELCOME_MESSAGE);
  return true;
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export async function handleWelcome(interaction: ChatInputCommandInteraction): Promise<void> {
  // Permite reenviar manualmente el mensaje de bienvenida con el mismo texto del evento GuildCreate.
  if (!interaction.guild) {
    await interaction.reply({
      content: 'Este comando solo puede usarse dentro de un servidor.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const sent = await sendGuildWelcomeMessage(interaction.guild);

  if (!sent) {
    await interaction.reply({
      content:
        'No encontré un canal donde pueda enviar el mensaje de bienvenida (revisa permisos del bot).',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await interaction.reply({
    content: 'Mensaje de bienvenida enviado. 🐾',
    flags: MessageFlags.Ephemeral,
  });
}

export const welcomeCommand: AppCommand = {
  name: 'welcome',
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Reenvía el mensaje de bienvenida del bot en este servidor'),
  execute: handleWelcome,
};
