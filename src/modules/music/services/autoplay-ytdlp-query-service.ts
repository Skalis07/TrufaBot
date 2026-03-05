/**
 * @file src/modules/music/services/autoplay-ytdlp-query-service.ts
 * @description Adapter de consultas yt-dlp para autoplay: extracción de candidatos y fallback CLI/plugin.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { AutoplayCandidate } from '../domain/autoplay-candidate-utils.js';
import { musicLogger } from '../logger.js';
import { isTransientYtDlpSpawnError, toLoggableErrorMessage, waitMs } from '../shared/runtime-utils.js';

const execFileAsync = promisify(execFile);

type AutoplayYtDlpQueryServiceDeps = {
  playlistProgressiveFlatTimeoutMs: number;
  getBundledYtDlpExecutablePath: () => string;
};

export class AutoplayYtDlpQueryService {
  constructor(private readonly deps: AutoplayYtDlpQueryServiceDeps) {}

  private get playlistProgressiveFlatTimeoutMs() {
    return this.deps.playlistProgressiveFlatTimeoutMs;
  }

  private getBundledYtDlpExecutablePath(): string {
    return this.deps.getBundledYtDlpExecutablePath();
  }

  extractResolvableCandidatesFromYtDlpResult(resolved: unknown): AutoplayCandidate[] {
    const candidates: AutoplayCandidate[] = [];

    if (typeof resolved !== 'object' || resolved === null) {
      return candidates;
    }

    if (
      'songs' in resolved &&
      Array.isArray(
        (resolved as { songs?: Array<{ url?: unknown; id?: unknown; name?: unknown }> }).songs,
      )
    ) {
      for (const song of (resolved as { songs: Array<{ url?: unknown; id?: unknown; name?: unknown }> }).songs) {
        if (typeof song?.url === 'string' && /^https?:\/\//i.test(song.url)) {
          const candidate: AutoplayCandidate = { url: song.url };
          if (typeof song.id === 'string') {
            candidate.id = song.id;
          }
          if (typeof song.name === 'string') {
            candidate.name = song.name;
          }
          candidates.push(candidate);
        }
      }
    }

    if ('url' in resolved) {
      const directUrl = (resolved as { url?: unknown }).url;
      if (typeof directUrl === 'string' && /^https?:\/\//i.test(directUrl)) {
        const resolvedRecord = resolved as { id?: unknown; name?: unknown };
        const candidate: AutoplayCandidate = { url: directUrl };
        if (typeof resolvedRecord.id === 'string') {
          candidate.id = resolvedRecord.id;
        }
        if (typeof resolvedRecord.name === 'string') {
          candidate.name = resolvedRecord.name;
        }
        candidates.push(candidate);
      }
    }

    const uniqueByUrl = new Map<string, AutoplayCandidate>();
    for (const candidate of candidates) {
      if (!uniqueByUrl.has(candidate.url)) {
        uniqueByUrl.set(candidate.url, candidate);
      }
    }

    return [...uniqueByUrl.values()];
  }

  extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[] {
    return this.extractResolvableCandidatesFromYtDlpResult(resolved).map((candidate) => candidate.url);
  }

  private extractAutoplayCandidatesFromRawYtDlpJson(resolved: unknown): AutoplayCandidate[] {
    const candidates: AutoplayCandidate[] = [];

    const pushCandidateFromRecord = (record: unknown): void => {
      if (typeof record !== 'object' || record === null) {
        return;
      }

      const value = record as {
        id?: unknown;
        title?: unknown;
        name?: unknown;
        url?: unknown;
        webpage_url?: unknown;
        original_url?: unknown;
      };

      const preferredUrl =
        (typeof value.webpage_url === 'string' && /^https?:\/\//i.test(value.webpage_url) && value.webpage_url) ||
        (typeof value.original_url === 'string' && /^https?:\/\//i.test(value.original_url) && value.original_url) ||
        (typeof value.url === 'string' && /^https?:\/\//i.test(value.url) && value.url) ||
        null;
      const id = typeof value.id === 'string' && value.id ? value.id : undefined;
      const url = preferredUrl ?? (id ? `https://www.youtube.com/watch?v=${id}` : null);

      if (!url) {
        return;
      }

      const name =
        (typeof value.title === 'string' && value.title.trim() && value.title.trim()) ||
        (typeof value.name === 'string' && value.name.trim() && value.name.trim()) ||
        undefined;

      candidates.push({
        url,
        ...(id ? { id } : {}),
        ...(name ? { name } : {}),
      });
    };

    if (typeof resolved !== 'object' || resolved === null) {
      return candidates;
    }

    const record = resolved as { entries?: unknown[] };
    if (Array.isArray(record.entries)) {
      for (const entry of record.entries) {
        pushCandidateFromRecord(entry);
      }
    } else {
      pushCandidateFromRecord(record);
    }

    const uniqueByUrl = new Map<string, AutoplayCandidate>();
    for (const candidate of candidates) {
      if (!uniqueByUrl.has(candidate.url)) {
        uniqueByUrl.set(candidate.url, candidate);
      }
    }

    return [...uniqueByUrl.values()];
  }

  async loadAutoplaySearchCandidatesWithYtDlpCli(searchQuery: string): Promise<AutoplayCandidate[]> {
    const ytdlpPath = this.getBundledYtDlpExecutablePath();
    let stdout = '';
    let attempt = 0;
    const maxAttempts = 3;

    while (true) {
      try {
        const result = await execFileAsync(
          ytdlpPath,
          ['--dump-single-json', '--flat-playlist', '--no-warnings', searchQuery],
          {
            windowsHide: true,
            timeout: this.playlistProgressiveFlatTimeoutMs,
            maxBuffer: 32 * 1024 * 1024,
          },
        );
        stdout = result.stdout;
        break;
      } catch (error) {
        attempt += 1;

        if (!isTransientYtDlpSpawnError(error) || attempt >= maxAttempts) {
          throw error;
        }

        const delayMs = attempt === 1 ? 150 : 400;
        const normalizedError = toLoggableErrorMessage(error, 400);
        musicLogger.warn(
          {
            event: 'autoplay_cli_query_retry',
            searchQuery,
            attempt,
            maxAttempts,
            delayMs,
            errorMessage: normalizedError.message,
            errorMessageLength: normalizedError.originalLength,
            errorMessageTruncated: normalizedError.truncated,
          },
          'retrying autoplay CLI query after transient yt-dlp spawn error',
        );

        await waitMs(delayMs);
      }
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(stdout);
    } catch {
      throw new Error('yt-dlp CLI devolvio JSON invalido para autoplay.');
    }

    return this.extractAutoplayCandidatesFromRawYtDlpJson(parsed);
  }
}

// Fabrica una instancia/servicio con dependencias ya cableadas.
export function createAutoplayYtDlpQueryService(
  deps: AutoplayYtDlpQueryServiceDeps,
): AutoplayYtDlpQueryService {
  return new AutoplayYtDlpQueryService(deps);
}
