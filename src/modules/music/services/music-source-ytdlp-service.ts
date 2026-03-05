/**
 * @file src/modules/music/services/music-source-ytdlp-service.ts
 * @description Adapter central de yt-dlp para resolver URLs/busquedas y extraer metadata reproducible.
 */
import { execFile } from 'node:child_process';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { buildAutoplayCandidateKey } from '../domain/autoplay-candidate-utils.js';
import {
  buildCanonicalYouTubePlaylistUrl,
  extractYouTubePlaylistId,
  extractYouTubeVideoId,
} from '../domain/source-url-utils.js';
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import { getMusicPlayer } from '../music-player.js';
import { isTransientYtDlpSpawnError, waitMs } from '../shared/runtime-utils.js';

const execFileAsync = promisify(execFile);

export type FlatPlaylistEntry = {
  url: string;
  id?: string;
  title?: string;
};

export type LoadedYouTubeFlatPlaylist = {
  playlistId: string;
  playlistTitle: string | null;
  entries: FlatPlaylistEntry[];
};

type MusicSourceYtDlpServiceDeps = {
  playlistProgressiveFlatTimeoutMs: number;
  playlistProgressiveMaxEntries: number;
  extractResolvableUrlsFromYtDlpResult: (resolved: unknown) => string[];
};

export class MusicSourceYtDlpService {
  private ytdlpStartupCheckPromise: Promise<void> | null = null;

  constructor(private readonly deps: MusicSourceYtDlpServiceDeps) {}

  private get player() {
    return getMusicPlayer();
  }

  private get playlistProgressiveFlatTimeoutMs() {
    return this.deps.playlistProgressiveFlatTimeoutMs;
  }

  private get playlistProgressiveMaxEntries() {
    return this.deps.playlistProgressiveMaxEntries;
  }

  private extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[] {
    return this.deps.extractResolvableUrlsFromYtDlpResult(resolved);
  }

  // Verifica precondiciones tecnicas antes de continuar el flujo.
  verifyBundledYtDlpBinaryOnStartup(): void {
    if (this.ytdlpStartupCheckPromise) {
      return;
    }

    this.ytdlpStartupCheckPromise = this.runYtDlpBinaryStartupCheck();
    this.ytdlpStartupCheckPromise.catch((error) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      musicLogger.error(
        {
          event: 'ytdlp_binary_verify_failed',
          ytdlpPath: this.getBundledYtDlpExecutablePath(),
          errorMessage,
          hint: 'Reinstala o re-descarga node_modules/@distube/yt-dlp/bin/yt-dlp(.exe).',
        },
        'bundled yt-dlp binary verification failed',
      );
    });
  }

  // Resuelve entradas externas a una fuente reproducible o usable.
  async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string> {
    // `@distube/yt-dlp` es un "playable extractor". DisTube no lo usa para texto
    // (usa extractor plugins), asi que para `ytsearch:` resolvemos manualmente aqui
    // y luego entregamos a DisTube una URL real.
    const plugin = this.player.plugins.find(
      (candidate) =>
        candidate.constructor?.name === 'YtDlpPlugin' &&
        typeof (candidate as { resolve?: unknown }).resolve === 'function',
    ) as { resolve: (url: string, options?: object) => Promise<unknown> } | undefined;

    if (!plugin) {
      throw new Error('YtDlpPlugin no disponible para resolver busquedas de texto.');
    }

    let resolved: unknown;
    let attempt = 0;
    const maxAttempts = 3;

    while (true) {
      try {
        resolved = await plugin.resolve(input, {});
        break;
      } catch (error) {
        attempt += 1;

        if (!isTransientYtDlpSpawnError(error) || attempt >= maxAttempts) {
          throw error;
        }

        const delayMs = attempt === 1 ? 150 : 400;
        const errorMessage = error instanceof Error ? error.message : String(error);

        musicLogger.warn(
          {
            event: 'ytdlp_resolve_retry',
            input,
            attempt,
            maxAttempts,
            delayMs,
            errorMessage,
          },
          'yt-dlp resolve hit a transient spawn error, retrying',
        );

        await waitMs(delayMs);
      }
    }

    const urls = this.extractResolvableUrlsFromYtDlpResult(resolved);
    if (urls.length > 0) {
      return urls[0]!;
    }

    throw new MusicUserError('No encontre resultados para esa busqueda/URL. Prueba con otro termino.');
  }

  getBundledYtDlpExecutablePath(): string {
    const fileName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
    return path.join(process.cwd(), 'node_modules', '@distube', 'yt-dlp', 'bin', fileName);
  }

  async loadYouTubeFlatPlaylistEntries(inputUrl: string): Promise<LoadedYouTubeFlatPlaylist> {
    const playlistId = extractYouTubePlaylistId(inputUrl);
    if (!playlistId) {
      throw new MusicUserError('No pude identificar el ID de la playlist de YouTube.');
    }

    const playlistUrl = buildCanonicalYouTubePlaylistUrl(playlistId);
    const ytdlpPath = this.getBundledYtDlpExecutablePath();

    let stdout: string;
    try {
      const result = await execFileAsync(
        ytdlpPath,
        [
          playlistUrl,
          '--flat-playlist',
          '--playlist-end',
          String(this.playlistProgressiveMaxEntries),
          '--dump-single-json',
          '--no-warnings',
          '--skip-download',
          '--simulate',
        ],
        {
          windowsHide: true,
          timeout: this.playlistProgressiveFlatTimeoutMs,
          maxBuffer: 64 * 1024 * 1024,
        },
      );
      stdout = result.stdout;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      musicLogger.warn(
        {
          event: 'playlist_flat_load_failed',
          inputUrl,
          playlistId,
          errorMessage,
        },
        'failed to load youtube playlist in flat mode',
      );
      throw new MusicUserError(
        'No pude leer esa playlist de YouTube por ahora. Prueba con otra playlist publica o con una URL de video.',
      );
    }

    let parsed: { title?: unknown; entries?: unknown[] };
    try {
      parsed = JSON.parse(stdout) as { title?: unknown; entries?: unknown[] };
    } catch {
      throw new MusicUserError('No pude interpretar la respuesta de la playlist de YouTube.');
    }

    const normalizedEntries = Array.isArray(parsed.entries)
      ? parsed.entries
          .map((entry) => this.toFlatPlaylistEntry(entry))
          .filter((entry): entry is FlatPlaylistEntry => Boolean(entry))
      : [];

    const dedupedEntriesByKey = new Map<string, FlatPlaylistEntry>();
    for (const entry of normalizedEntries) {
      const key = buildAutoplayCandidateKey({
        url: entry.url,
        ...(entry.id ? { id: entry.id } : {}),
        ...(entry.title ? { name: entry.title } : {}),
      });

      if (!dedupedEntriesByKey.has(key)) {
        dedupedEntriesByKey.set(key, entry);
      }
    }

    const entries = [...dedupedEntriesByKey.values()];
    if (entries.length === 0) {
      throw new MusicUserError(
        'La playlist no devolvio pistas reproducibles (asegurate de que sea publica).',
      );
    }

    const playlistTitle =
      typeof parsed.title === 'string' && parsed.title.trim() ? parsed.title.trim() : null;

    return {
      playlistId,
      playlistTitle,
      entries,
    };
  }

  reorderYouTubePlaylistEntriesForInput(inputUrl: string, entries: FlatPlaylistEntry[]): FlatPlaylistEntry[] {
    const requestedVideoId = extractYouTubeVideoId(inputUrl);
    if (!requestedVideoId) {
      return entries;
    }

    const requestedIndex = entries.findIndex((entry) => {
      const entryVideoId = extractYouTubeVideoId(entry.url) ?? entry.id ?? null;
      return entryVideoId === requestedVideoId;
    });

    if (requestedIndex <= 0) {
      return entries;
    }

    const selectedEntry = entries[requestedIndex]!;
    const reorderedEntries = [...entries];
    reorderedEntries.splice(requestedIndex, 1);
    reorderedEntries.unshift(selectedEntry);
    return reorderedEntries;
  }

  // Orquesta la ejecucion completa con logging y control de errores.
  private async runYtDlpBinaryStartupCheck(): Promise<void> {
    const ytdlpPath = this.getBundledYtDlpExecutablePath();
    musicLogger.info(
      {
        event: 'ytdlp_binary_verify_start',
        ytdlpPath,
      },
      'verifying bundled yt-dlp binary',
    );

    const fileStats = await stat(ytdlpPath);
    if (!fileStats.isFile()) {
      throw new Error('yt-dlp path exists but is not a file');
    }

    if (fileStats.size <= 0) {
      throw new Error('yt-dlp binary exists but is empty (0 bytes)');
    }

    const result = await execFileAsync(ytdlpPath, ['--version'], {
      windowsHide: true,
      timeout: 10_000,
      maxBuffer: 1024 * 1024,
    });

    const version = result.stdout.trim().split(/\r?\n/, 1)[0] ?? '';
    musicLogger.info(
      {
        event: 'ytdlp_binary_verify_ok',
        ytdlpPath,
        fileSizeBytes: fileStats.size,
        version: version || 'unknown',
      },
      'bundled yt-dlp binary verified',
    );
  }

  private toFlatPlaylistEntry(rawEntry: unknown): FlatPlaylistEntry | null {
    if (typeof rawEntry !== 'object' || rawEntry === null) {
      return null;
    }

    const record = rawEntry as { id?: unknown; url?: unknown; title?: unknown; webpage_url?: unknown };
    const id = typeof record.id === 'string' && record.id ? record.id : undefined;
    const explicitUrl =
      (typeof record.url === 'string' && record.url.startsWith('http') && record.url) ||
      (typeof record.webpage_url === 'string' && record.webpage_url.startsWith('http') && record.webpage_url) ||
      null;
    const url = explicitUrl ?? (id ? `https://www.youtube.com/watch?v=${id}` : null);

    if (!url) {
      return null;
    }

    const title = typeof record.title === 'string' && record.title.trim() ? record.title.trim() : undefined;

    return {
      url,
      ...(id ? { id } : {}),
      ...(title ? { title } : {}),
    };
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createMusicSourceYtDlpService(
  deps: MusicSourceYtDlpServiceDeps,
): MusicSourceYtDlpService {
  return new MusicSourceYtDlpService(deps);
}
