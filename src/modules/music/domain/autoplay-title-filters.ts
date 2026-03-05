/**
 * @file src/modules/music/domain/autoplay-title-filters.ts
 * @description Reglas puras de filtrado de titulos (ruido, live/concert, compilaciones pobres) para autoplay.
 */
// Normaliza titulos para comparaciones de autoplay y expone filtros de calidad
// de candidatos. Son helpers puros (sin estado ni dependencias externas).

export function normalizeAutoplayComparableTitle(title: string | null | undefined): string {
  // Normaliza titulos para detectar "misma cancion" aunque cambie el sufijo
  // (official video/audio/lyrics, puntuacion, etc.).
  if (!title) {
    return '';
  }

  return title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(ft|feat|featuring)\b\.?/g, ' ')
    .replace(
      /\b(official|video|audio|lyrics|lyric|hd|4k|remaster(ed)?|visualizer|mv|clip)\b/g,
      ' ',
    )
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Funcion pura de dominio reutilizable en multiples servicios.
export function titleLooksPoorForAutoplay(candidateTitle: string | null | undefined): boolean {
  // Filtra resultados que tienden a ser malas "recomendaciones" para un bot:
  // mixes, compilaciones o videos largos que arruinan el flujo de autoplay.
  const normalized = normalizeAutoplayComparableTitle(candidateTitle);
  if (!normalized) {
    return false;
  }

  return /\b(mix|playlist|compilation|full album|full)\b/.test(normalized);
}

// Funcion pura de dominio reutilizable en multiples servicios.
export function titleLooksLikeAutoplayLowQualityContainer(candidateTitle: string | null | undefined): boolean {
  // Rechazo fuerte para resultados que rompen la UX de autoplay:
  // teasers, top compilations, playlists/mixes largos y similares.
  const normalized = normalizeAutoplayComparableTitle(candidateTitle);
  if (!normalized) {
    return false;
  }

  if (/\b(teaser|trailer)\b/.test(normalized)) {
    return true;
  }

  if (/\b(greatest hits|best of)\b/.test(normalized)) {
    return true;
  }

  if (/\btop\s+\d+\b/.test(normalized)) {
    return true;
  }

  if (/\b(full album|full mix|full playlist|full compilation|discography)\b/.test(normalized)) {
    return true;
  }

  // "mix/playlist/compilation" aislados suelen ser mala recomendacion para continuar una cancion.
  return /\b(megamix|playlist|compilation|mix)\b/.test(normalized);
}

// Funcion pura de dominio reutilizable en multiples servicios.
export function titleLooksLikeLiveConcertRecording(candidateTitle: string | null | undefined): boolean {
  // Evita "live concerts" y similares en autoplay, pero SIN bloquear canciones cuyo
  // titulo real incluye la palabra "live" (ej. "Live" como nombre del tema).
  const normalized = normalizeAutoplayComparableTitle(candidateTitle);
  if (!normalized) {
    return false;
  }

  // Si no aparece "live", no aplicamos este filtro.
  if (!/\blive\b/.test(normalized)) {
    return false;
  }

  // Señales de concierto/evento en vivo. Se exige contexto adicional para no castigar
  // titulos normales que contengan "live".
  const hasConcertContext =
    /\bconcert\b/.test(normalized) ||
    /\btour\b/.test(normalized) ||
    /\bfestival\b/.test(normalized) ||
    /\barena\b/.test(normalized) ||
    /\bstadium\b/.test(normalized) ||
    /\bdome\b/.test(normalized) ||
    /\bsetlist\b/.test(normalized) ||
    /\bfull show\b/.test(normalized);

  if (!hasConcertContext) {
    return false;
  }

  // Patrones claramente de grabacion de concierto en vivo / show completo.
  return (
    /\blive concert\b/.test(normalized) ||
    /\bfull concert\b/.test(normalized) ||
    /\bconcert live\b/.test(normalized) ||
    /\blive (at|in|from)\b/.test(normalized) ||
    /\blive\b.*\b(tour|festival|arena|stadium|dome)\b/.test(normalized) ||
    /\b(concert|tour|festival)\b.*\blive\b/.test(normalized)
  );
}
