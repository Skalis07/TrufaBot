import 'dotenv/config';
// Carga .env para poder leer DISCORD_TOKEN en runtime.

import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
// Client: instancia del bot.
// Events: enum con nombres de eventos oficiales.
// GatewayIntentBits: permisos de eventos que recibira el bot.
// MessageFlags: permite marcar respuestas como efimeras sin usar la opcion deprecated `ephemeral`.

import { handlePing } from './modules/commands/ping.js';
// Reusamos el handler de ping separado en su modulo.
import { handleHelp } from './modules/commands/help.js';
// Nuevo: handler de /help.
import { handleUptime } from './modules/commands/uptime.js';
// Nuevo: handler de /uptime.

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error('DISCORD_TOKEN no definido en .env');
// Validacion minima para evitar login(undefined).

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
// Guilds alcanza para slash commands basicos.
// No pedimos intents extras innecesarios (principio de minimo acceso).

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot listo como ${readyClient.user.tag}`);
});
// once() para evento de arranque: queremos loguear solo una vez.

client.on(Events.InteractionCreate, async (interaction) => {
  // Escuchamos todas las interacciones de Discord (slash, botones, etc).

  if (!interaction.isChatInputCommand()) return;
  // Ignoramos lo que no sea slash command.
  // Evita errores de tipos y ramas innecesarias.

  try {
    // Router por nombre de comando.
    // Cada comando se delega a su handler para mantener index.ts limpio.
    if (interaction.commandName === 'ping') {
      await handlePing(interaction);
      return;
    }

    if (interaction.commandName === 'help') {
      await handleHelp(interaction);
      return;
    }

    if (interaction.commandName === 'uptime') {
      await handleUptime(interaction);
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

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({
        content: 'Error ejecutando comando.',
        flags: MessageFlags.Ephemeral,
      });
      // Si ya hubo respuesta previa, no podemos usar reply() otra vez.
      // followUp() es la forma correcta.
    } else {
      await interaction.reply({
        content: 'Error ejecutando comando.',
        flags: MessageFlags.Ephemeral,
      });
      // Si no hubo respuesta, respondemos normal con reply().
    }
  }
});

await client.login(token);
// Conexion real a Discord Gateway.
// Si token es invalido, aqui habrá error de autenticacion.
