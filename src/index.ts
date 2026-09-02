/**
 * @file src/index.ts
 * @description Punto de entrada del bot: inicializa cliente de Discord, registra modulos, conecta eventos y arranca el runtime principal.
 */
import 'dotenv/config';
// Carga .env para poder leer DISCORD_TOKEN en runtime.

import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import type { ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';
// Client: instancia del bot.
// Events: enum con nombres de eventos oficiales.
// GatewayIntentBits: permisos de eventos que recibira el bot.
// MessageFlags: permite marcar respuestas como efimeras sin usar la opcion deprecated `ephemeral`.
import {
  createCommandRegistrationRest,
  formatGuildCommandRegistrationError,
  registerGuildCommands,
} from './commands/command-registration.js';
import { commandMap } from './commands/command-registry.js';
// commandMap centraliza el router de comandos en un unico lugar.
import { handleMusicButtonInteraction } from './modules/music/handlers/button-interaction-handler.js';
import { initializeMusicPlayer } from './modules/music/music-player.js';
import { handleHelpButtonInteraction } from './modules/utility/help.js';
import { sendGuildWelcomeMessage } from './modules/utility/welcome.js';

const DISCORD_ERROR_UNKNOWN_INTERACTION = 10_062;
const DISCORD_ERROR_INTERACTION_ALREADY_ACKNOWLEDGED = 40_060;

type ErrorReplyInteraction = ButtonInteraction | ChatInputCommandInteraction;

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getDiscordApiErrorCode(error: unknown): number | null {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return null;
  }

  const code = (error as { code?: unknown }).code;
  return typeof code === 'number' ? code : null;
}

// Evalua una condicion de control para guiar el flujo.
function isIgnorableInteractionResponseError(error: unknown): boolean {
  const code = getDiscordApiErrorCode(error);
  return (
    code === DISCORD_ERROR_UNKNOWN_INTERACTION
    || code === DISCORD_ERROR_INTERACTION_ALREADY_ACKNOWLEDGED
  );
}

// Orquesta la ejecucion de una accion de negocio con control de errores.
async function sendEphemeralErrorReply(
  interaction: ErrorReplyInteraction,
  content: string,
): Promise<void> {
  try {
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({
        content,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.reply({
      content,
      flags: MessageFlags.Ephemeral,
    });
  } catch (error) {
    // Si la interaccion expiro o ya fue reconocida en paralelo, evitamos
    // escalar un segundo error que tumbe el proceso.
    if (isIgnorableInteractionResponseError(error)) {
      return;
    }

    throw error;
  }
}

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error('DISCORD_TOKEN no definido en .env');
// Validacion minima para evitar login(undefined).

const commandRegistrationRest = createCommandRegistrationRest(token);
let applicationId: string | null = null;

async function syncGuildCommands(clientId: string, guildId: string): Promise<void> {
  try {
    await registerGuildCommands(commandRegistrationRest, clientId, guildId);
    console.log(`Comandos registrados en guild ${guildId}`);
  } catch (error) {
    console.error(formatGuildCommandRegistrationError(guildId, error));
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
// Guilds alcanza para slash commands basicos.
// GuildVoiceStates permite que el reproductor de musica gestione estado de voz correctamente.
initializeMusicPlayer(client);
// Inicializamos Distube una sola vez sobre el mismo Client de Discord.

client.once(Events.ClientReady, async (readyClient) => {
  applicationId = readyClient.application.id;
  console.log(`Bot listo como ${readyClient.user.tag}`);

  for (const guild of readyClient.guilds.cache.values()) {
    await syncGuildCommands(applicationId, guild.id);
  }
});
// once() para evento de arranque: queremos loguear solo una vez.

client.on(Events.Error, (error) => {
  // Evita crash por evento `error` no manejado del Client.
  console.error('Discord client error:', error);
});

client.on(Events.GuildCreate, async (guild) => {
  // Se dispara cuando el bot se une a un servidor nuevo.
  if (applicationId) {
    await syncGuildCommands(applicationId, guild.id);
  }

  try {
    await sendGuildWelcomeMessage(guild);
  } catch (error) {
    console.error('No pude enviar el mensaje de bienvenida en el servidor nuevo.', error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  // Escuchamos todas las interacciones de Discord (slash, botones, etc).

  if (interaction.isButton()) {
    // Router de botones: primero help (paginas efimeras), luego musica.
    try {
      if (await handleHelpButtonInteraction(interaction)) {
        return;
      }

      await handleMusicButtonInteraction(interaction);
    } catch (error) {
      console.error(error);
      await sendEphemeralErrorReply(interaction, 'Error ejecutando accion del boton.');
    }

    return;
  }

  if (!interaction.isChatInputCommand()) return;
  // Ignoramos lo que no sea slash command.
  // Evita errores de tipos y ramas innecesarias.

  try {
    // Router automatico por nombre.
    // Ya no repetimos ifs por cada comando.
    const command = commandMap.get(interaction.commandName);

    if (command) {
      await command.execute(interaction);
      return;
    }

    await interaction.reply({
      content: 'Comando no implementado.',
      flags: MessageFlags.Ephemeral,
    });
    // Respuesta de fallback si llega un comando sin handler.
    // flags: Ephemeral hace que solo lo vea el usuario que ejecuto el comando.
  } catch (error) {
    console.error(error);
    // Log tecnico para debug.
    await sendEphemeralErrorReply(interaction, 'Error ejecutando comando.');
  }
});

await client.login(token);
// Conexion real a Discord Gateway.
// Si token es invalido, aqui habrá error de autenticacion.
