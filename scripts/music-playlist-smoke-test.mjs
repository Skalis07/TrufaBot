/**
 * @file scripts/music-playlist-smoke-test.mjs
 * @description Smoke test local de yt-dlp para validar busquedas y resolucion de playlists.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

// Convierte execFile en API basada en Promise para simplificar await/try-catch.
const execFileAsync = promisify(execFile);

// Rutas/casos de prueba usados por el smoke test.
const ytdlpPath = path.join(process.cwd(), 'node_modules', '@distube', 'yt-dlp', 'bin', 'yt-dlp.exe');
const samplePlaylistUrl = 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj';
const userPlaylistUrl = 'https://www.youtube.com/playlist?list=PLpmNHl3iZYRge_LsenlEtFb4jCs5FwftI';
const userWatchInPlaylistUrl =
  'https://www.youtube.com/watch?v=PFrPrIxluWk&list=PLpmNHl3iZYRge_LsenlEtFb4jCs5FwftI';

// Ejecuta yt-dlp con un set de argumentos y registra un resumen compacto del resultado.
async function runYtDlpJson(label, args, timeoutMs) {
  const startedAt = Date.now();

  const { stdout } = await execFileAsync(ytdlpPath, args, {
    windowsHide: true,
    timeout: timeoutMs,
    maxBuffer: 20 * 1024 * 1024,
  });

  const parsed = JSON.parse(stdout);
  const durationMs = Date.now() - startedAt;

  console.log(
    JSON.stringify({
      label,
      durationMs,
      title: parsed?.title ?? null,
      webpageUrl: parsed?.webpage_url ?? null,
      entryCount: Array.isArray(parsed?.entries) ? parsed.entries.length : null,
      firstEntryTitle: Array.isArray(parsed?.entries) ? (parsed.entries[0]?.title ?? null) : null,
    }),
  );

  return parsed;
}

// Orquesta una bateria corta de casos para validar que el proveedor responde como esperamos.
async function main() {
  console.log('[smoke] yt-dlp search + playlist');

  await runYtDlpJson(
    'search_full',
    ['ytsearch:despacito', '--dump-single-json', '--no-warnings', '--skip-download', '--simulate'],
    20_000,
  );

  const flatPlaylist = await runYtDlpJson(
    'playlist_flat',
    [
      samplePlaylistUrl,
      '--flat-playlist',
      '--dump-single-json',
      '--no-warnings',
      '--skip-download',
      '--simulate',
    ],
    20_000,
  );

  if (!Array.isArray(flatPlaylist?.entries) || flatPlaylist.entries.length < 2) {
    throw new Error('La playlist no devolvio multiples entradas en modo flat.');
  }

  // La resolucion completa de playlists grandes puede tardar mucho. Probamos una muestra
  // corta para confirmar que el proveedor devuelve metadata completa cuando se limita.
  const partialPlaylist = await runYtDlpJson(
    'playlist_full_partial_1_5',
    [
      samplePlaylistUrl,
      '--playlist-items',
      '1-5',
      '--dump-single-json',
      '--no-warnings',
      '--skip-download',
      '--simulate',
    ],
    45_000,
  );

  if (!Array.isArray(partialPlaylist?.entries) || partialPlaylist.entries.length < 2) {
    throw new Error('La playlist parcial no devolvio multiples entradas con metadata completa.');
  }

  const userPlaylistFlat = await runYtDlpJson(
    'user_playlist_flat',
    [
      userPlaylistUrl,
      '--flat-playlist',
      '--dump-single-json',
      '--no-warnings',
      '--skip-download',
      '--simulate',
    ],
    30_000,
  );

  if (!Array.isArray(userPlaylistFlat?.entries) || userPlaylistFlat.entries.length < 2) {
    throw new Error('La playlist publica del usuario no devolvio multiples entradas en modo flat.');
  }

  const userWatchInPlaylistFlat = await runYtDlpJson(
    'user_watch_in_playlist_flat',
    [
      userWatchInPlaylistUrl,
      '--flat-playlist',
      '--dump-single-json',
      '--no-warnings',
      '--skip-download',
      '--simulate',
    ],
    30_000,
  );

  if (!Array.isArray(userWatchInPlaylistFlat?.entries) || userWatchInPlaylistFlat.entries.length < 2) {
    throw new Error('La URL watch+list del usuario no devolvio multiples entradas en modo flat.');
  }

  console.log('[smoke] ok');
}

main().catch((error) => {
  console.error('[smoke] fail', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
