/**
 * @file src/modules/music/services/music-voice-context-service.ts
 * @description Resuelve contexto de voz/texto del usuario y valida precondiciones antes de operar en musica.
 */
import type {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
  VoiceBasedChannel,
} from 'discord.js';
import { PermissionsBitField } from 'discord.js';
import type { Queue } from 'distube';
import { MusicUserError } from '../errors.js';

export type MusicInteractionLike = ChatInputCommandInteraction | ButtonInteraction;

export type VoiceContext = {
  guildId: string;
  member: GuildMember;
  voiceChannel: VoiceBasedChannel;
  queue: Queue | undefined;
  textChannel: GuildTextBasedChannel | null;
};

type MusicVoiceContextServiceDeps = {
  getQueue: (guildId: string) => Queue | undefined;
};

function toGuildTextChannel(interaction: MusicInteractionLike): GuildTextBasedChannel | null {
  if (!interaction.channel || !interaction.channel.isTextBased()) {
    return null;
  }

  return interaction.channel as GuildTextBasedChannel;
}

export class MusicVoiceContextService {
  constructor(private readonly deps: MusicVoiceContextServiceDeps) {}

  async getVoiceContext(
    interaction: MusicInteractionLike,
    options?: {
      requireQueue?: boolean;
    },
  ): Promise<VoiceContext> {
    if (!interaction.guild || !interaction.guildId) {
      throw new MusicUserError('Este comando solo funciona dentro de un servidor.');
    }

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      throw new MusicUserError('Debes estar en un canal de voz para usar este comando.');
    }

    const botMember = interaction.guild.members.me;
    if (!botMember) {
      throw new MusicUserError('No pude resolver mi miembro del servidor para validar permisos.');
    }

    const botVoiceChannel = botMember.voice.channel;
    if (botVoiceChannel && botVoiceChannel.id !== voiceChannel.id) {
      throw new MusicUserError('Debes estar en el mismo canal de voz que el bot.');
    }

    const permissions = voiceChannel.permissionsFor(botMember);
    if (!permissions?.has(PermissionsBitField.Flags.Connect)) {
      throw new MusicUserError('No tengo permiso Connect en ese canal de voz.');
    }

    if (!permissions.has(PermissionsBitField.Flags.Speak)) {
      throw new MusicUserError('No tengo permiso Speak en ese canal de voz.');
    }

    const queue = this.deps.getQueue(interaction.guildId);
    if (options?.requireQueue && (!queue || queue.songs.length === 0)) {
      throw new MusicUserError('No hay pista activa en este momento.');
    }

    return {
      guildId: interaction.guildId,
      member,
      voiceChannel,
      queue,
      textChannel: toGuildTextChannel(interaction),
    };
  }

  requireQueue(context: VoiceContext): Queue {
    const { queue } = context;

    if (!queue || queue.songs.length === 0) {
      throw new MusicUserError('No hay pista activa en este momento.');
    }

    return queue;
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicVoiceContextService(
  deps: MusicVoiceContextServiceDeps,
): MusicVoiceContextService {
  return new MusicVoiceContextService(deps);
}
