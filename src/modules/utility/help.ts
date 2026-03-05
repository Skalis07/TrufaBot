/**
 * @file src/modules/utility/help.ts
 * @description Comando help: genera ayuda contextual y listado de comandos disponibles.
 */
import type { ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import type { AppCommand } from '../../commands/command.js';
// Importamos:
// - tipos de interacción (slash y botón)
// - builders de embed/botones para construir un help paginado y bonito
// - MessageFlags para respuestas efímeras sin `ephemeral` (deprecated)

type HelpRow = {
  command: string;
  description: string;
};

const HELP_BUTTON_PREFIX = 'help:v1';
const HELP_BUTTON_ACTIONS = ['goto', 'nav-prev', 'nav-home', 'nav-next', 'section'] as const;
type HelpButtonAction = (typeof HELP_BUTTON_ACTIONS)[number];

const HELP_PAGE_ORDER = ['index', 'utility', 'music', 'panel'] as const;
type HelpPageId = (typeof HELP_PAGE_ORDER)[number];

const HELP_PAGE_TITLES: Record<HelpPageId, string> = {
  index: '📚 Índice de Ayuda',
  utility: '🛠️ Módulo de Utilidad',
  music: '🎵 Módulo de Música (Slash Commands)',
  panel: '🎛️ Controles del Panel de Música',
};

const utilityCommands: HelpRow[] = [
  { command: '/ping', description: 'Verifica que el bot responda y muestra latencia WS/HTTP.' },
  { command: '/uptime', description: 'Muestra tiempo encendido y hora de inicio del bot.' },
  { command: '/welcome', description: 'Reenvía el mensaje de bienvenida del bot en el servidor.' },
  { command: '/help', description: 'Abre esta guía paginada de comandos y controles.' },
];

const musicCommands: HelpRow[] = [
  { command: '/join', description: 'Hace que el bot entre a tu canal de voz sin reproducir.' },
  { command: '/play <texto|url>', description: 'Reproduce ahora o agrega a la cola.' },
  { command: '/pause', description: 'Pausa la reproducción actual.' },
  { command: '/resume', description: 'Reanuda la reproducción pausada.' },
  { command: '/skip', description: 'Salta pista (o silencio/autoplay si no hay siguiente).' },
  { command: '/back', description: 'Vuelve a la pista anterior del historial.' },
  { command: '/autoplay <on|off>', description: 'Activa/desactiva continuidad automática.' },
  { command: '/loop [off|track|queue]', description: 'Cambia modo de repetición.' },
  { command: '/rewind [seg]', description: 'Retrocede la pista (default: 10s).' },
  { command: '/forward [seg]', description: 'Adelanta la pista (default: 10s).' },
  { command: '/replay', description: 'Reinicia la pista desde 00:00.' },
  { command: '/nowplaying', description: 'Muestra estado actual (pista, loop, autoplay, volumen).' },
  { command: '/queue [página]', description: 'Muestra cola actual con paginación.' },
  { command: '/clear', description: 'Borra la cola pendiente y mantiene la pista actual.' },
  { command: '/volume [1-200]', description: 'Consulta o ajusta el volumen del bot en el servidor.' },
  { command: '/stop', description: 'Detiene reproducción y limpia la cola.' },
  { command: '/quit', description: 'Desconecta al bot del canal de voz y cierra la sesión.' },
];

const panelControls: HelpRow[] = [
  { command: 'QUEUE', description: '📋 Muestra resumen rápido de cola (efímero).' },
  { command: 'CLEAR', description: '🧹 Borra la cola pendiente y deja la pista actual.' },
  { command: 'LOOP', description: '🔁 Cambia el modo de repetición (OFF/TRACK/QUEUE).' },
  { command: 'AUTOPLAY', description: '✨ Activa/desactiva recomendaciones automáticas.' },
  { command: 'REWIND (10s)', description: '⏪ Retrocede 10 segundos.' },
  { command: 'PAUSE / RESUME', description: '⏯️ Pausa o reanuda la reproducción.' },
  { command: 'FORWARD (10s)', description: '⏩ Adelanta 10 segundos.' },
  { command: 'REPLAY', description: '🔂 Reinicia la pista desde el inicio.' },
  { command: 'STOP', description: '⏹️ Detiene reproducción y limpia la sesión.' },
];

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function formatHelpField(rows: HelpRow[]): string {
  // Lista compacta alineada y fácil de escanear dentro del embed.
  return rows.map((row) => `• \`${row.command}\` — ${row.description}`).join('\n');
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildHelpButtonId(page: HelpPageId, action: HelpButtonAction = 'goto'): string {
  // `customId` estable y versionado para rutear botones del help.
  // Incluimos tipo de boton para evitar duplicados cuando varias acciones apuntan a la misma pagina.
  return `${HELP_BUTTON_PREFIX}:${action}:${page}`;
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function parseHelpButtonPage(customId: string): HelpPageId | null {
  // Valida namespace + accion soportada + pagina objetivo.
  const prefix = `${HELP_BUTTON_PREFIX}:`;
  if (!customId.startsWith(prefix)) {
    return null;
  }

  const parts = customId.split(':');
  if (parts.length !== 4) {
    return null;
  }

  const [, , action, page] = parts;
  if (!HELP_BUTTON_ACTIONS.includes(action as HelpButtonAction)) {
    return null;
  }

  if (!HELP_PAGE_ORDER.includes(page as HelpPageId)) {
    return null;
  }

  return page as HelpPageId;
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function getPagePosition(page: HelpPageId): number {
  return HELP_PAGE_ORDER.indexOf(page);
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildFooterText(page: HelpPageId): string {
  const pageNumber = getPagePosition(page) + 1;
  const totalPages = HELP_PAGE_ORDER.length;
  return `Página ${pageNumber}/${totalPages} · Usa flechas o botones de sección`;
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildHelpEmbed(page: HelpPageId): EmbedBuilder {
  // Construye el embed según la página seleccionada.
  const embed = new EmbedBuilder().setColor(0x5865f2).setTitle(HELP_PAGE_TITLES[page]);

  if (page === 'index') {
    return embed
      .setDescription(
        [
          '😺🎶 **Meow meow!** Esta es la guía de TrufaBot en formato paginado.',
          '',
          '**Índice rápido**',
          '• 🛠️ **Utilidad**: `/ping`, `/uptime`, `/welcome`, `/help`',
          '• 🎵 **Música**: slash commands de reproducción/cola/voz',
          '• 🎛️ **Panel**: botones del mensaje *Now Playing*',
          '',
          '💡 Tip: puedes usar las flechas ⬅️➡️ o los botones de sección para navegar.',
        ].join('\n'),
      )
      .addFields(
        {
          name: '✨ Soporta',
          value:
            '• Búsquedas por texto\n• URLs de YouTube\n• URLs de Spotify\n• Panel de control con botones',
        },
        {
          name: '🔒 Visibilidad',
          value:
            'Este `/help` es **efímero** (solo lo ves tú), así no ensucia el canal mientras revisas comandos.',
        },
      )
      .setFooter({ text: buildFooterText(page) });
  }

  if (page === 'utility') {
    return embed
      .setDescription('Herramientas base para comprobar estado, latencia y uso del bot. 🧰')
      .addFields({
        name: '🛠️ Comandos de utilidad',
        value: formatHelpField(utilityCommands),
      })
      .setFooter({ text: buildFooterText(page) });
  }

  if (page === 'music') {
    return embed
      .setDescription(
        'Comandos slash del módulo de música para voz, reproducción, cola y control de sesión. 🎶',
      )
      .addFields({
        name: '🎵 Slash Commands de música',
        value: formatHelpField(musicCommands),
      })
      .setFooter({ text: buildFooterText(page) });
  }

  return embed
    .setDescription(
      'Botones del panel de reproducción (*Now Playing*) para control rápido sin escribir comandos. 🎛️',
    )
    .addFields({
      name: '🎛️ Controles del panel',
      value: formatHelpField(panelControls),
    })
    .setFooter({ text: buildFooterText(page) });
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildNavigationRow(currentPage: HelpPageId): ActionRowBuilder<ButtonBuilder> {
  const pageIndex = getPagePosition(currentPage);
  const previousPage = HELP_PAGE_ORDER[Math.max(pageIndex - 1, 0)]!;
  const nextPage = HELP_PAGE_ORDER[Math.min(pageIndex + 1, HELP_PAGE_ORDER.length - 1)]!;

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(buildHelpButtonId(previousPage, 'nav-prev'))
      .setLabel('⬅️')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(pageIndex === 0),
    new ButtonBuilder()
      .setCustomId(buildHelpButtonId('index', 'nav-home'))
      .setLabel('🏠 Índice')
      .setStyle(currentPage === 'index' ? ButtonStyle.Primary : ButtonStyle.Secondary)
      .setDisabled(currentPage === 'index'),
    new ButtonBuilder()
      .setCustomId(buildHelpButtonId(nextPage, 'nav-next'))
      .setLabel('➡️')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(pageIndex === HELP_PAGE_ORDER.length - 1),
  );
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildSectionRow(currentPage: HelpPageId): ActionRowBuilder<ButtonBuilder> {
  // Accesos directos por sección para evitar recorrer varias páginas con flechas.
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(buildHelpButtonId('utility', 'section'))
      .setLabel('🛠️ Utilidad')
      .setStyle(currentPage === 'utility' ? ButtonStyle.Primary : ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(buildHelpButtonId('music', 'section'))
      .setLabel('🎵 Música')
      .setStyle(currentPage === 'music' ? ButtonStyle.Primary : ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(buildHelpButtonId('panel', 'section'))
      .setLabel('🎛️ Panel')
      .setStyle(currentPage === 'panel' ? ButtonStyle.Primary : ButtonStyle.Secondary),
  );
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildHelpComponents(page: HelpPageId): ActionRowBuilder<ButtonBuilder>[] {
  return [buildNavigationRow(page), buildSectionRow(page)];
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
function buildHelpMessagePayload(page: HelpPageId) {
  return {
    embeds: [buildHelpEmbed(page)],
    components: buildHelpComponents(page),
  };
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export async function handleHelp(interaction: ChatInputCommandInteraction): Promise<void> {
  // Handler principal de /help: arranca en índice y deja botones de navegación.
  await interaction.reply({
    ...buildHelpMessagePayload('index'),
    flags: MessageFlags.Ephemeral,
  });
}

// Handler de comando: transforma la peticion del usuario en una accion de negocio.
export async function handleHelpButtonInteraction(interaction: ButtonInteraction): Promise<boolean> {
  // Router de botones del help paginado. Devuelve `false` si el botón no es del help.
  const targetPage = parseHelpButtonPage(interaction.customId);
  if (!targetPage) {
    return false;
  }

  await interaction.update(buildHelpMessagePayload(targetPage));
  return true;
}

export const helpCommand: AppCommand = {
  name: 'help',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra ayuda paginada de comandos y controles del bot'),
  // Definimos el comando slash:
  // - setName('help'): el usuario escribirá /help
  // - setDescription(...): texto visible en Discord cuando aparece el comando.
  execute: handleHelp,
};
