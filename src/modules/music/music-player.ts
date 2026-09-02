/**
 * @file src/modules/music/music-player.ts
 * @description Factory/singleton del reproductor (DisTube + plugins): inicializacion de infraestructura de audio y acceso compartido.
 */
import { SpotifyPlugin } from '@distube/spotify';
import { YouTubePlugin } from '@distube/youtube';
import { YtDlpPlugin } from '@distube/yt-dlp';
import type { Client } from 'discord.js';
import { DisTube, Events, type DisTubeOptions } from 'distube';
import { musicLogger } from './logger.js';
import { musicAutoplayProgressNoticeService } from './services/autoplay-progress-notice-service.js';
import { musicControlMessageService } from './services/control-message-service.js';
import { musicInactivityService } from './services/inactivity-disconnect-service.js';
import { musicService } from './services/music-service.js';

let musicPlayer: DisTube | null = null;

const MAX_ERROR_DIAGNOSTIC_LENGTH = 4_000;
const ACTIONABLE_FFMPEG_DIAGNOSTIC =
  /\b(?:error|failed|failure|forbidden|unauthorized|invalid|unable)\b|\bserver returned\b|\bhttp(?:\/\S+|\s+status)?\s*[:=]?\s*[45]\d{2}\b|\bexit(?:ed)? with code\b/iu;

function sanitizeErrorDiagnostic(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const sanitized = value
    .replace(/\bhttps?:\/\/[^\s'"]+/giu, '[redacted-url]')
    .replace(/\b(authorization|proxy-authorization|cookie|set-cookie)\s*[:=]\s*[^\r\n]*/giu, '$1=[redacted]')
    .replace(/\bbearer\s+\S+/giu, 'Bearer [redacted]')
    .replace(/\b(token|access[_-]?token|refresh[_-]?token|api[_-]?key|signature|sig)\s*[:=]\s*[^\s,;&]+/giu, '$1=[redacted]');

  return sanitized.length > MAX_ERROR_DIAGNOSTIC_LENGTH
    ? `${sanitized.slice(0, MAX_ERROR_DIAGNOSTIC_LENGTH)}...[truncated]`
    : sanitized;
}

// Funcion de soporte del modulo.
function createSpotifyPlugin(): SpotifyPlugin {
  // Si el usuario configura credenciales de Spotify en `.env`, las usamos para
  // mejorar fiabilidad/rate limits del importador. Si no, intentamos modo default.
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (clientId && clientSecret) {
    return new SpotifyPlugin({
      api: {
        clientId,
        clientSecret,
      },
    });
  }

  return new SpotifyPlugin();
}

// Funcion de soporte del modulo.
function createYouTubeExtractorPluginForSearchOnly(): YouTubePlugin {
  // `@distube/youtube` hoy nos sirve para que Spotify tenga extractor de busqueda,
  // pero su stream (`@distube/ytdl-core`) esta fallando con cambios de YouTube
  // ("Could not parse decipher function").
  //
  // Lo dejamos en modo "solo extractor": permitimos busquedas internas, pero
  // forzamos que las URLs de YouTube se reproduzcan con `@distube/yt-dlp`.
  const plugin = new YouTubePlugin();

  plugin.validate = () => false;

  return plugin;
}

// Funcion de soporte del modulo.
function registerMusicEvents(player: DisTube): void {
  // Cada evento relevante sincroniza el mensaje de control para mantener UI + estado
  // siempre alineados sin que cada comando tenga que reconstruir todo manualmente.
  player.on(Events.FFMPEG_DEBUG, (debug) => {
    if (debug.includes('[process] spawn:') || !ACTIONABLE_FFMPEG_DIAGNOSTIC.test(debug)) return;

    musicLogger.warn(
      {
        event: 'ffmpeg_diagnostic',
        diagnostic: sanitizeErrorDiagnostic(debug),
      },
      'ffmpeg playback diagnostic',
    );
  });

  player.on(Events.PLAY_SONG, async (queue) => {
    // Si habia un mensaje efimero "consiguiendo recomendacion...", lo limpiamos cuando
    // efectivamente empieza la nueva pista (sin listeners extra en DisTube).
    await musicAutoplayProgressNoticeService.clear(queue.id);
    musicInactivityService.notifyPlaybackActive(queue);
    musicService.rememberStartedQueueSong(queue);
    musicLogger.info(
      {
        event: 'playSong',
        guildId: queue.id,
        queueSize: queue.songs.length,
        queueAutoplay: queue.autoplay,
        previousSongsCount: queue.previousSongs.length,
        song: queue.songs[0]?.name,
        source: queue.songs[0]?.source,
      },
      'song started',
    );
    musicService.syncAutoplayPrefetchForQueue(queue);
    // Nueva pista sonando (inicio normal, skip, back, loop, etc).
    await musicControlMessageService.syncNowPlaying(queue, musicService.getNowPlayingPanelOptions(queue));
  });

  player.on(Events.ADD_SONG, async (queue) => {
    musicInactivityService.notifyPlaybackActive(queue);
    musicLogger.info(
      {
        event: 'addSong',
        guildId: queue.id,
        queueSize: queue.songs.length,
        queueAutoplay: queue.autoplay,
        previousSongsCount: queue.previousSongs.length,
        song: queue.songs[queue.songs.length - 1]?.name,
      },
      'song added to queue',
    );
    musicService.syncAutoplayPrefetchForQueue(queue);
    // Una pista extra se agrego a la cola mientras otra puede seguir sonando.
    await musicControlMessageService.syncNowPlaying(queue, musicService.getNowPlayingPanelOptions(queue));
  });

  player.on(Events.ADD_LIST, async (queue) => {
    musicInactivityService.notifyPlaybackActive(queue);
    musicLogger.info(
      {
        event: 'addList',
        guildId: queue.id,
        queueSize: queue.songs.length,
        queueAutoplay: queue.autoplay,
        previousSongsCount: queue.previousSongs.length,
      },
      'playlist added to queue',
    );
    musicService.syncAutoplayPrefetchForQueue(queue);
    // Se agrego una playlist/album; refrescamos cola y metadata visible.
    await musicControlMessageService.syncNowPlaying(queue, musicService.getNowPlayingPanelOptions(queue));
  });

  player.on(Events.FINISH, async (queue) => {
    await musicAutoplayProgressNoticeService.clear(queue.id);

    if (queue.autoplay) {
      musicLogger.info(
        {
          event: 'finish_autoplay_fallback_start',
          guildId: queue.id,
          queueAutoplay: queue.autoplay,
          queueSize: queue.songs.length,
          previousSongsCount: queue.previousSongs.length,
        },
        'attempting autoplay continuation after queue finish',
      );

      const continued = await musicService.continueAutoplayAfterFinish(queue, 'finish');
      if (continued) {
        // La siguiente pista quedara reflejada por `ADD_SONG`/`PLAY_SONG`.
        return;
      }
    }

    musicService.clearAutoplayPrefetch(queue.id, 'queue_finish_without_continuation');
    musicInactivityService.scheduleNoPlaybackDisconnect(queue, 'queue_finished');
    musicLogger.info(
      {
        event: 'finish',
        guildId: queue.id,
        queueAutoplay: queue.autoplay,
        queueSize: queue.songs.length,
        previousSongsCount: queue.previousSongs.length,
      },
      'queue finished',
    );
    // Cola terminada (sin autoplay efectivo). Mostramos estado idle.
    const options: {
      channel?: typeof queue.textChannel;
      reason: string;
    } = {
      reason: 'La cola termino. Usa /play para volver a iniciar musica.',
    };

    if (queue.textChannel) {
      options.channel = queue.textChannel;
    }

    await musicControlMessageService.syncIdle(queue.id, options);
  });

  player.on(Events.DELETE_QUEUE, async (queue) => {
    await musicAutoplayProgressNoticeService.clear(queue.id);

    const deleteQueueAutoplaySuppression =
      musicService.consumeAutoplayDeleteQueueContinuationSuppression(queue.id);

    if (deleteQueueAutoplaySuppression) {
      musicLogger.info(
        {
          event: 'delete_queue_autoplay_fallback_suppressed',
          guildId: queue.id,
          reason: deleteQueueAutoplaySuppression.reason,
          suppressionAgeMs: deleteQueueAutoplaySuppression.ageMs,
          queueAutoplay: queue.autoplay,
          queueSize: queue.songs.length,
          previousSongsCount: queue.previousSongs.length,
        },
        'autoplay continuation on delete_queue suppressed',
      );
    } else if (queue.autoplay) {
      musicLogger.info(
        {
          event: 'delete_queue_autoplay_fallback_start',
          guildId: queue.id,
          queueAutoplay: queue.autoplay,
          queueSize: queue.songs.length,
          previousSongsCount: queue.previousSongs.length,
        },
        'attempting autoplay continuation after delete_queue',
      );

      const continued = await musicService.continueAutoplayAfterFinish(queue, 'delete_queue');
      if (continued) {
        musicLogger.info(
          {
            event: 'delete_queue_autoplay_fallback_continued',
            guildId: queue.id,
            queueAutoplay: queue.autoplay,
            queueSize: queue.songs.length,
            previousSongsCount: queue.previousSongs.length,
          },
          'autoplay continuation succeeded after delete_queue',
        );
        return;
      }

      musicLogger.info(
        {
          event: 'delete_queue_autoplay_fallback_not_continued',
          guildId: queue.id,
          queueAutoplay: queue.autoplay,
          queueSize: queue.songs.length,
          previousSongsCount: queue.previousSongs.length,
        },
        'autoplay continuation after delete_queue did not continue playback',
      );
    } else {
      musicLogger.info(
        {
          event: 'delete_queue_autoplay_fallback_skipped',
          guildId: queue.id,
          reason: 'autoplay_disabled',
          queueAutoplay: queue.autoplay,
          queueSize: queue.songs.length,
          previousSongsCount: queue.previousSongs.length,
        },
        'autoplay continuation after delete_queue skipped',
      );
    }

    musicService.clearAutoplayPrefetch(queue.id, 'delete_queue');
    musicService.clearProgressivePlaylistLoad(queue.id, 'delete_queue');
    musicInactivityService.scheduleNoPlaybackDisconnect(queue, 'queue_deleted');
    musicLogger.info(
      {
        event: 'deleteQueue',
        guildId: queue.id,
        queueAutoplay: queue.autoplay,
        queueSize: queue.songs.length,
        previousSongsCount: queue.previousSongs.length,
      },
      'queue deleted',
    );
    // Queue eliminada por stop/cleanup interno.
    const options: {
      channel?: typeof queue.textChannel;
      reason: string;
    } = {
      reason: 'Sesion de musica finalizada.',
    };

    if (queue.textChannel) {
      options.channel = queue.textChannel;
    }

    await musicControlMessageService.syncIdle(queue.id, options);
  });

  player.on(Events.DISCONNECT, async (queue) => {
    await musicAutoplayProgressNoticeService.clear(queue.id);
    musicService.clearAutoplayPrefetch(queue.id, 'distube_disconnect');
    musicService.clearProgressivePlaylistLoad(queue.id, 'distube_disconnect');
    musicInactivityService.clearGuildTimers(queue.id, 'distube_disconnect');
    musicLogger.info({ event: 'disconnect', guildId: queue.id }, 'player disconnected from voice');
    // Desconexion de voz: dejamos trazabilidad visual en el canal de texto.
    const options: {
      channel?: typeof queue.textChannel;
      reason: string;
    } = {
      reason: 'Bot desconectado del canal de voz.',
    };

    if (queue.textChannel) {
      options.channel = queue.textChannel;
    }

    await musicControlMessageService.syncIdle(queue.id, options);
  });

  player.on(Events.ERROR, async (error, queue) => {
    // Error tecnico para consola + mensaje corto al usuario en el canal.
    if (queue?.id) {
      await musicAutoplayProgressNoticeService.clear(queue.id);
      musicService.suppressAutoplayContinuationOnDeleteQueue(queue.id, 'distube_error');
      musicService.clearAutoplayPrefetch(queue.id, 'distube_error');
      musicService.clearProgressivePlaylistLoad(queue.id, 'distube_error');
    }
    const errorWithCode = error as Error & { code?: unknown; errorCode?: unknown };
    const rawErrorCode = errorWithCode.code ?? errorWithCode.errorCode;
    const rawErrorCause = error.cause;
    const errorCause =
      rawErrorCause instanceof Error
        ? sanitizeErrorDiagnostic(`${rawErrorCause.name}: ${rawErrorCause.message}`)
        : typeof rawErrorCause === 'string'
          ? sanitizeErrorDiagnostic(rawErrorCause)
          : undefined;

    musicLogger.error(
      {
        event: 'distube_error',
        guildId: queue?.id,
        song: queue?.songs?.[0]?.name,
        errorName: sanitizeErrorDiagnostic(error.name),
        errorCode:
          typeof rawErrorCode === 'number'
            ? rawErrorCode
            : typeof rawErrorCode === 'string'
              ? sanitizeErrorDiagnostic(rawErrorCode)
              : undefined,
        errorMessage: sanitizeErrorDiagnostic(error.message),
        errorStack: sanitizeErrorDiagnostic(error.stack),
        errorCause,
      },
      'distube error',
    );

    if (queue?.textChannel) {
      await queue.textChannel.send(
        'Se produjo un error reproduciendo la pista. Prueba con otra URL o busqueda.',
      );
    }
  });
}

// Funcion de soporte del modulo.
export function initializeMusicPlayer(client: Client): DisTube {
  // Singleton de DisTube: evita crear multiples managers sobre el mismo Client.
  if (musicPlayer) {
    return musicPlayer;
  }

  // Cast aislado por incompatibilidad de tipos ESM entre plugins y distube typings.
  // En runtime funciona; el problema es de tipos duplicados de dependencias.
  const plugins = [
    createSpotifyPlugin(),
    createYouTubeExtractorPluginForSearchOnly(),
    new YtDlpPlugin({ update: false }),
  ] as unknown as NonNullable<DisTubeOptions['plugins']>;

  // Opciones minimas para MVP: historial, cambio de canal permitido y plugins de fuentes.
  const options = {
    emitNewSongOnly: false,
    savePreviousSongs: true,
    joinNewVoiceChannel: true,
    plugins,
  } satisfies DisTubeOptions;

  musicPlayer = new DisTube(client, options);
  musicInactivityService.bindClient(client, musicPlayer);
  registerMusicEvents(musicPlayer);
  // Conectamos listeners despues de crear la instancia para tener UI sincronizada.
  musicLogger.info(
    {
      event: 'player_init',
      plugins: ['spotify', 'youtube(search-only)', 'yt-dlp'],
    },
    'music player initialized',
  );
  musicService.verifyBundledYtDlpBinaryOnStartup();

  return musicPlayer;
}

// Funcion de soporte del modulo.
export function getMusicPlayer(): DisTube {
  // Guard clause para forzar inicializacion en bootstrap (`index.ts`) antes de usar servicios.
  if (!musicPlayer) {
    throw new Error('Music player no inicializado. Llama initializeMusicPlayer(client) primero.');
  }

  return musicPlayer;
}
