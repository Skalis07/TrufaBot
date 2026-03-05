/**
 * @file src/modules/music/domain/source-url-utils.ts
 * @description Utilidades puras de parsing/deteccion de URLs (YouTube, Spotify, búsquedas yt-dlp).
 */
export function parseUrlSafely(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

// Regla pura de validacion booleana usada por el dominio.
export function isYouTubeHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com' || host === 'youtu.be';
}

// Regla pura de validacion booleana usada por el dominio.
export function isYouTubePlaylistLikeUrl(input: string): boolean {
  const url = parseUrlSafely(input);
  if (!url || !isYouTubeHost(url.hostname)) {
    return false;
  }

  return url.searchParams.has('list');
}

// Regla pura de validacion booleana usada por el dominio.
export function isSpotifyTrackUrl(input: string): boolean {
  const url = parseUrlSafely(input);
  if (!url) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname !== 'open.spotify.com' && hostname !== 'play.spotify.com') {
    return false;
  }

  return /^\/track\/[^/]+/i.test(url.pathname);
}

// Regla pura de validacion booleana usada por el dominio.
export function isSpotifyPlaylistLikeUrl(input: string): boolean {
  const url = parseUrlSafely(input);
  if (!url) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname !== 'open.spotify.com' && hostname !== 'play.spotify.com') {
    return false;
  }

  return /^\/(playlist|album)\/[^/]+/i.test(url.pathname);
}

// Extrae informacion normalizada desde una entrada de dominio.
export function extractYouTubePlaylistId(urlValue: string): string | null {
  const url = parseUrlSafely(urlValue);
  if (!url || !isYouTubeHost(url.hostname)) {
    return null;
  }

  return url.searchParams.get('list');
}

// Construye un valor derivado de dominio sin efectos secundarios.
export function buildCanonicalYouTubePlaylistUrl(playlistId: string): string {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

// Extrae informacion normalizada desde una entrada de dominio.
export function extractYouTubeVideoId(url: string | null | undefined): string | null {
  // Intenta obtener el videoId de URLs comunes de YouTube para comparar candidatos.
  if (!url) {
    return null;
  }

  const watchMatch = url.match(/[?&]v=([^&]+)/i);
  if (watchMatch?.[1]) {
    return watchMatch[1];
  }

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) {
    return shortMatch[1];
  }

  const embedMatch = url.match(/\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  return null;
}

// Regla pura de validacion booleana usada por el dominio.
export function isYtDlpSearchInput(input: string): boolean {
  // Detecta busquedas prefijadas para resolverlas por el plugin `YtDlpPlugin`
  // en vez del pipeline de search de DisTube (que requiere extractor plugins).
  return /^(ytsearch:|scsearch:)/i.test(input);
}
