/**
 * @file src/modules/music/domain/autoplay-candidate-utils.ts
 * @description Funciones puras para normalizar, puntuar y comparar candidatos de autoplay sin efectos secundarios.
 */
import type { Queue } from 'distube';
import { normalizeAutoplayComparableTitle } from './autoplay-title-filters.js';
import { extractYouTubeVideoId } from './source-url-utils.js';

export type AutoplayCandidate = {
  url: string;
  id?: string;
  name?: string;
};

export const AUTOPLAY_KEYWORD_HISTORY_LIMIT = 10;

// Construye un valor derivado de dominio sin efectos secundarios.
export function buildAutoplayCandidateKey(candidate: AutoplayCandidate): string {
  const videoId = extractYouTubeVideoId(candidate.url) ?? candidate.id ?? null;
  if (videoId) {
    return `yt:${videoId}`;
  }

  return `url:${candidate.url}`;
}

// Tokeniza texto para comparaciones semanticas del dominio.
export function tokenizeComparableText(value: string | null | undefined): string[] {
  const normalized = normalizeAutoplayComparableTitle(value);
  return normalized ? normalized.split(' ') : [];
}

// Extrae informacion normalizada desde una entrada de dominio.
export function extractSongNamePrefix(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  const [prefix] = value.split('-');
  return prefix?.trim() ?? '';
}

// Construye un valor derivado de dominio sin efectos secundarios.
function buildAutoplayArtistTokenSet(currentSong: Queue['songs'][number]): Set<string> {
  const artistTokens = new Set<string>();

  for (const token of tokenizeComparableText(currentSong.uploader?.name)) {
    artistTokens.add(token);
  }

  for (const token of tokenizeComparableText(extractSongNamePrefix(currentSong.name))) {
    artistTokens.add(token);
  }

  for (const token of ['the', 'dj', 'mc', 'x', 'vs', 'remix']) {
    artistTokens.add(token);
  }

  return artistTokens;
}

// Construye un valor derivado de dominio sin efectos secundarios.
function buildCoreSongTokens(title: string | null | undefined, artistTokens: Set<string>): string[] {
  const titleTokens = tokenizeComparableText(title);
  const filtered = titleTokens.filter((token) => !artistTokens.has(token));
  return filtered.length > 0 ? filtered : titleTokens;
}

// Construye un valor derivado de dominio sin efectos secundarios.
function buildGenericNoiseTokenSet(): Set<string> {
  return new Set([
    'the',
    'dj',
    'mc',
    'x',
    'vs',
    'remix',
    'mix',
    'playlist',
    'full',
    'album',
    'compilation',
    'extended',
    'version',
  ]);
}

// Extrae informacion normalizada desde una entrada de dominio.
function extractSongNameSuffix(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  const parts = value
    .split('-')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return value.trim();
  }

  return parts.slice(1).join(' ');
}

// Construye un valor derivado de dominio sin efectos secundarios.
function buildAutoplayKeywordTokens(title: string | null | undefined): string[] {
  const noiseTokens = buildGenericNoiseTokenSet();
  const suffixTokens = buildCoreSongTokens(extractSongNameSuffix(title), noiseTokens);
  const baseTokens = suffixTokens.length > 0 ? suffixTokens : buildCoreSongTokens(title, noiseTokens);
  const filtered = baseTokens.filter((token) => token.length >= 3 && !/^\d+$/.test(token));
  return [...new Set(filtered)];
}

// Regla pura de validacion booleana usada por el dominio.
export function isKeywordRepeatAgainstRecentHistory(
  candidate: AutoplayCandidate,
  recentReferences: AutoplayCandidate[],
): boolean {
  const candidateKeywords = buildAutoplayKeywordTokens(candidate.name);
  if (candidateKeywords.length < 2) {
    return false;
  }

  const candidateKeywordSet = new Set(candidateKeywords);

  for (const reference of recentReferences.slice(0, AUTOPLAY_KEYWORD_HISTORY_LIMIT)) {
    const referenceKeywords = buildAutoplayKeywordTokens(reference.name);
    if (referenceKeywords.length < 2) {
      continue;
    }

    const referenceKeywordSet = new Set(referenceKeywords);
    const intersectionSize = [...candidateKeywordSet].filter((token) =>
      referenceKeywordSet.has(token),
    ).length;

    if (intersectionSize < 2) {
      continue;
    }

    const overlapAgainstCandidate = intersectionSize / candidateKeywordSet.size;
    const overlapAgainstReference = intersectionSize / referenceKeywordSet.size;
    const candidateContainedInReference = [...candidateKeywordSet].every((token) =>
      referenceKeywordSet.has(token),
    );

    if (candidateContainedInReference) {
      return true;
    }

    if (overlapAgainstCandidate >= 0.8 && overlapAgainstReference >= 0.5) {
      return true;
    }
  }

  return false;
}

// Regla pura de validacion booleana usada por el dominio.
export function isProbablySameCandidateVariant(
  reference: AutoplayCandidate,
  candidate: AutoplayCandidate,
): boolean {
  if (candidate.url === reference.url) {
    return true;
  }

  const referenceVideoId = extractYouTubeVideoId(reference.url) ?? reference.id ?? null;
  const candidateVideoId = extractYouTubeVideoId(candidate.url) ?? candidate.id ?? null;
  if (referenceVideoId && candidateVideoId && referenceVideoId === candidateVideoId) {
    return true;
  }

  const referenceNormalizedTitle = normalizeAutoplayComparableTitle(reference.name);
  const candidateNormalizedTitle = normalizeAutoplayComparableTitle(candidate.name);
  if (
    referenceNormalizedTitle &&
    candidateNormalizedTitle &&
    referenceNormalizedTitle === candidateNormalizedTitle
  ) {
    return true;
  }

  const noiseTokens = buildGenericNoiseTokenSet();
  const referenceCoreTokens = buildCoreSongTokens(reference.name, noiseTokens);
  const candidateCoreTokens = buildCoreSongTokens(candidate.name, noiseTokens);

  if (referenceCoreTokens.length === 0 || candidateCoreTokens.length === 0) {
    return false;
  }

  const referenceCoreSet = new Set(referenceCoreTokens);
  const candidateCoreSet = new Set(candidateCoreTokens);
  const intersectionSize = [...referenceCoreSet].filter((token) => candidateCoreSet.has(token)).length;
  const overlapAgainstReference = intersectionSize / referenceCoreSet.size;
  const allReferenceTokensPresent = [...referenceCoreSet].every((token) => candidateCoreSet.has(token));

  if (referenceCoreSet.size <= 3 && allReferenceTokensPresent) {
    return true;
  }

  return overlapAgainstReference >= 0.85;
}

// Regla pura de validacion booleana usada por el dominio.
export function isProbablySameSongVariant(
  currentSong: Queue['songs'][number],
  candidate: AutoplayCandidate,
): boolean {
  if (candidate.url === currentSong.url) {
    return true;
  }

  const currentVideoId = extractYouTubeVideoId(currentSong.url) ?? currentSong.id ?? null;
  const candidateVideoId = extractYouTubeVideoId(candidate.url) ?? candidate.id ?? null;
  if (currentVideoId && candidateVideoId && currentVideoId === candidateVideoId) {
    return true;
  }

  const currentNormalizedTitle = normalizeAutoplayComparableTitle(currentSong.name);
  const candidateNormalizedTitle = normalizeAutoplayComparableTitle(candidate.name);
  if (
    currentNormalizedTitle &&
    candidateNormalizedTitle &&
    candidateNormalizedTitle === currentNormalizedTitle
  ) {
    return true;
  }

  const artistTokens = buildAutoplayArtistTokenSet(currentSong);
  const currentCoreTokens = buildCoreSongTokens(currentSong.name, artistTokens);
  const candidateCoreTokens = buildCoreSongTokens(candidate.name, artistTokens);

  if (currentCoreTokens.length === 0 || candidateCoreTokens.length === 0) {
    return false;
  }

  const currentCoreSet = new Set(currentCoreTokens);
  const candidateCoreSet = new Set(candidateCoreTokens);
  const allCurrentCoreTokensPresent = [...currentCoreSet].every((token) => candidateCoreSet.has(token));

  if (currentCoreSet.size <= 3 && allCurrentCoreTokensPresent) {
    return true;
  }

  const intersectionSize = [...currentCoreSet].filter((token) => candidateCoreSet.has(token)).length;
  const overlapAgainstCurrent = intersectionSize / currentCoreSet.size;
  return overlapAgainstCurrent >= 0.8;
}

// Construye un valor derivado de dominio sin efectos secundarios.
export function buildQueueSongCandidate(song: Queue['songs'][number]): AutoplayCandidate {
  const fallbackComparableUrl =
    (typeof song.id === 'string' && song.id && `https://www.youtube.com/watch?v=${song.id}`) ||
    `queue-song:${normalizeAutoplayComparableTitle(song.name) || 'unknown'}`;

  const candidate: AutoplayCandidate = {
    url: typeof song.url === 'string' && song.url ? song.url : fallbackComparableUrl,
  };

  if (typeof song.id === 'string') {
    candidate.id = song.id;
  }

  if (typeof song.name === 'string') {
    candidate.name = song.name;
  }

  return candidate;
}
