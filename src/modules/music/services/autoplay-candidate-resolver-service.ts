/**
 * @file src/modules/music/services/autoplay-candidate-resolver-service.ts
 * @description Resuelve candidatos de autoplay combinando busquedas, filtros y scoring para elegir siguiente pista.
 */
import { type Queue } from 'distube';
import {
  AUTOPLAY_KEYWORD_HISTORY_LIMIT,
  buildAutoplayCandidateKey,
  extractSongNamePrefix,
  type AutoplayCandidate,
  isKeywordRepeatAgainstRecentHistory,
  isProbablySameCandidateVariant,
  isProbablySameSongVariant,
  tokenizeComparableText,
} from '../domain/autoplay-candidate-utils.js';
import {
  titleLooksLikeAutoplayLowQualityContainer,
  titleLooksLikeLiveConcertRecording,
  titleLooksPoorForAutoplay,
} from '../domain/autoplay-title-filters.js';
import { musicLogger } from '../logger.js';
import { getMusicPlayer } from '../music-player.js';
import { toLoggableErrorMessage } from '../shared/runtime-utils.js';
import { createAutoplayYtDlpQueryService } from './autoplay-ytdlp-query-service.js';

const AUTOPLAY_EARLY_EXIT_MIN_VALID_CANDIDATES = 6;

type AutoplayCandidateResolverServiceDeps = {
  autoplayRandomPoolSize: number;
  playlistProgressiveFlatTimeoutMs: number;
  getBundledYtDlpExecutablePath: () => string;
  collectAutoplayReferenceCandidates: (queue: Queue) => AutoplayCandidate[];
};

export class AutoplayCandidateResolverService {
  private readonly autoplayYtDlpQueryService;

  constructor(private readonly deps: AutoplayCandidateResolverServiceDeps) {
    this.autoplayYtDlpQueryService = createAutoplayYtDlpQueryService({
      playlistProgressiveFlatTimeoutMs: deps.playlistProgressiveFlatTimeoutMs,
      getBundledYtDlpExecutablePath: () => this.deps.getBundledYtDlpExecutablePath(),
    });
  }

  private get player() {
    return getMusicPlayer();
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get autoplayRandomPoolSize() {
    return this.deps.autoplayRandomPoolSize;
  }

  private collectAutoplayReferenceCandidates(queue: Queue): AutoplayCandidate[] {
    return this.deps.collectAutoplayReferenceCandidates(queue);
  }

  extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[] {
    return this.autoplayYtDlpQueryService.extractResolvableUrlsFromYtDlpResult(resolved);
  }

  private scoreAutoplayCandidate(currentSong: Queue['songs'][number], candidate: AutoplayCandidate): number {
    let score = 100;

    if (titleLooksPoorForAutoplay(candidate.name)) {
      score -= 40;
    }

    const currentTitleTokens = new Set(tokenizeComparableText(currentSong.name));
    const candidateTitleTokens = new Set(tokenizeComparableText(candidate.name));

    if (currentTitleTokens.size > 0 && candidateTitleTokens.size > 0) {
      const intersection = [...currentTitleTokens].filter((token) => candidateTitleTokens.has(token)).length;
      const overlapAgainstCurrent = intersection / currentTitleTokens.size;

      if (overlapAgainstCurrent >= 0.7) score -= 25;
      else if (overlapAgainstCurrent >= 0.5) score -= 12;
    }

    if (candidate.name && candidate.name.trim().length > 0) {
      score += 5;
    }

    score += Math.random() * 3;
    return score;
  }

  // Construye datos de trabajo para el siguiente paso del flujo.
  async buildAutoplayFallbackCandidate(
    queue: Queue,
    seedSong?: Queue['songs'][number],
  ): Promise<AutoplayCandidate | null> {
    const currentSong = seedSong ?? queue.songs[0];
    if (!currentSong) {
      return null;
    }

    const queryBase = [currentSong.name, currentSong.uploader?.name].filter(Boolean).join(' ').trim();

    const plugin = this.player.plugins.find(
      (candidate) =>
        candidate.constructor?.name === 'YtDlpPlugin'
        && typeof (candidate as { resolve?: unknown }).resolve === 'function',
    ) as { resolve: (url: string, options?: object) => Promise<unknown> } | undefined;

    if (!plugin) {
      return null;
    }

    const searchQueries: string[] = [];
    if (queryBase) {
      searchQueries.push(`ytsearch10:${queryBase}`);
    }

    const artistSeed = [currentSong.uploader?.name, extractSongNamePrefix(currentSong.name)]
      .filter((value): value is string => Boolean(value && value.trim()))
      .map((value) => value.trim());

    const uniqueArtistSeeds = [...new Set(artistSeed)];
    for (const seed of uniqueArtistSeeds) {
      searchQueries.push(`ytsearch8:${seed}`);
      searchQueries.push(`ytsearch10:${seed} songs`);
    }

    const references = this.collectAutoplayReferenceCandidates(queue);
    const keywordHistoryReferences = references.slice(0, AUTOPLAY_KEYWORD_HISTORY_LIMIT);
    const collectedCandidates = new Map<string, AutoplayCandidate & { score: number; searchQuery: string }>();
    const keywordFallbackCandidates = new Map<string, AutoplayCandidate & { score: number; searchQuery: string }>();

    let rejectedByCurrentSong = 0;
    let rejectedByRecentHistory = 0;
    let rejectedByKeywordHistory = 0;
    let rejectedByLiveConcert = 0;
    let rejectedByLowQualityAutoplay = 0;
    let rejectedByPoorTitle = 0;
    let totalResolvedCandidates = 0;

    const uniqueSearchQueries = [...new Set(searchQueries)];
    const earlyExitTarget = Math.max(
      AUTOPLAY_EARLY_EXIT_MIN_VALID_CANDIDATES,
      this.autoplayRandomPoolSize + 2,
    );
    let executedQueries = 0;

    for (const searchQuery of uniqueSearchQueries) {
      executedQueries += 1;
      let candidates: AutoplayCandidate[] = [];

      try {
        const resolved = await plugin.resolve(searchQuery, {});
        candidates = this.autoplayYtDlpQueryService.extractResolvableCandidatesFromYtDlpResult(resolved);
      } catch (error) {
        const pluginError = toLoggableErrorMessage(error);
        musicLogger.warn(
          {
            event: 'autoplay_query_resolve_failed',
            guildId: queue.id,
            searchQuery,
            source: 'yt-dlp-plugin',
            errorMessage: pluginError.message,
            errorMessageLength: pluginError.originalLength,
            errorMessageTruncated: pluginError.truncated,
          },
          'autoplay search query failed via yt-dlp plugin, trying CLI fallback',
        );

        try {
          candidates = await this.autoplayYtDlpQueryService.loadAutoplaySearchCandidatesWithYtDlpCli(searchQuery);
          musicLogger.info(
            {
              event: 'autoplay_query_resolve_cli_fallback_ok',
              guildId: queue.id,
              searchQuery,
              candidatesResolved: candidates.length,
            },
            'autoplay search query recovered via yt-dlp CLI fallback',
          );
        } catch (fallbackError) {
          const cliError = toLoggableErrorMessage(fallbackError);
          musicLogger.warn(
            {
              event: 'autoplay_query_resolve_cli_fallback_failed',
              guildId: queue.id,
              searchQuery,
              source: 'yt-dlp-cli',
              errorMessage: cliError.message,
              errorMessageLength: cliError.originalLength,
              errorMessageTruncated: cliError.truncated,
            },
            'autoplay search query also failed via yt-dlp CLI fallback',
          );
          continue;
        }
      }

      totalResolvedCandidates += candidates.length;

      for (const candidate of candidates) {
        const candidateKey = buildAutoplayCandidateKey(candidate);

        if (isProbablySameSongVariant(currentSong, candidate)) {
          rejectedByCurrentSong += 1;
          continue;
        }

        if (references.some((reference) => isProbablySameCandidateVariant(reference, candidate))) {
          rejectedByRecentHistory += 1;
          continue;
        }

        if (titleLooksLikeLiveConcertRecording(candidate.name)) {
          rejectedByLiveConcert += 1;
          continue;
        }

        if (titleLooksLikeAutoplayLowQualityContainer(candidate.name)) {
          rejectedByLowQualityAutoplay += 1;
          continue;
        }

        if (isKeywordRepeatAgainstRecentHistory(candidate, keywordHistoryReferences)) {
          rejectedByKeywordHistory += 1;
          const score = this.scoreAutoplayCandidate(currentSong, candidate) - 18;
          const existingKeywordFallback = keywordFallbackCandidates.get(candidateKey);
          if (!existingKeywordFallback || score > existingKeywordFallback.score) {
            keywordFallbackCandidates.set(candidateKey, { ...candidate, score, searchQuery });
          }
          continue;
        }

        if (titleLooksPoorForAutoplay(candidate.name)) {
          rejectedByPoorTitle += 1;
        }

        const score = this.scoreAutoplayCandidate(currentSong, candidate);
        const existing = collectedCandidates.get(candidateKey);
        if (!existing || score > existing.score) {
          collectedCandidates.set(candidateKey, { ...candidate, score, searchQuery });
        }
      }

      if (collectedCandidates.size >= earlyExitTarget) {
        break;
      }
    }

    const rankedCandidates = [...collectedCandidates.values()].sort((a, b) => b.score - a.score);
    const candidatePool = rankedCandidates.slice(0, this.autoplayRandomPoolSize);
    let selectionMode: 'strict' | 'keyword_relaxed_fallback' = 'strict';
    let selected =
      candidatePool[Math.floor(Math.random() * candidatePool.length)] ?? rankedCandidates[0] ?? null;

    if (!selected && keywordFallbackCandidates.size > 0) {
      const rankedKeywordFallbackCandidates = [...keywordFallbackCandidates.values()].sort(
        (a, b) => b.score - a.score,
      );
      const keywordFallbackPool = rankedKeywordFallbackCandidates.slice(0, this.autoplayRandomPoolSize);
      selected =
        keywordFallbackPool[Math.floor(Math.random() * keywordFallbackPool.length)] ??
        rankedKeywordFallbackCandidates[0] ??
        null;
      if (selected) {
        selectionMode = 'keyword_relaxed_fallback';
      }
    }

    if (!selected) {
      musicLogger.warn(
        {
          event: 'autoplay_no_candidate',
          guildId: queue.id,
          totalQueriesPlanned: uniqueSearchQueries.length,
          totalQueriesExecuted: executedQueries,
          totalResolvedCandidates,
          rejectedByCurrentSong,
          rejectedByRecentHistory,
          rejectedByKeywordHistory,
          rejectedByLiveConcert,
          rejectedByLowQualityAutoplay,
          rejectedByPoorTitle,
        },
        'autoplay fallback did not find a distinct recommendation',
      );
      return null;
    }

    musicLogger.info(
      {
        event: 'autoplay_candidate_selected',
        guildId: queue.id,
        currentSong: currentSong.name,
        selectedSong: selected.name ?? selected.url,
        selectedUrl: selected.url,
        score: Number(selected.score.toFixed(2)),
        selectedFromQuery: selected.searchQuery,
        totalQueriesPlanned: uniqueSearchQueries.length,
        totalQueriesExecuted: executedQueries,
        totalResolvedCandidates,
        validCandidates: rankedCandidates.length,
        candidatePoolSize: candidatePool.length,
        rejectedByKeywordHistory,
        rejectedByLiveConcert,
        rejectedByLowQualityAutoplay,
        selectionMode,
      },
      'autoplay fallback selected recommendation',
    );

    return selected;
  }
}
