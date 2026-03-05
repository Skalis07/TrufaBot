/**
 * @file src/modules/music/shared/runtime-utils.ts
 * @description Utilidades de runtime (timeouts, waits, serializacion de errores) reutilizadas por servicios.
 */
export function readPositiveTimeoutMs(envName: string, fallback: number): number {
  // Lee timeout desde `.env` y hace fallback si el valor es invalido.
  const raw = process.env[envName];
  const parsed = raw ? Number(raw) : Number.NaN;

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function waitMs(ms: number): Promise<void> {
  if (ms <= 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function isTransientYtDlpSpawnError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const code = (error as { code?: unknown }).code;
  if (code === 'EBUSY' || code === 'EPERM' || code === 'ETXTBSY') {
    return true;
  }

  const normalizedMessage = error.message.toUpperCase();
  return (
    normalizedMessage.includes(' EBUSY') ||
    normalizedMessage.includes(' EPERM') ||
    normalizedMessage.includes(' ETXTBSY')
  );
}

// Helper compartido para reducir duplicacion entre comandos y servicios.
export function toLoggableErrorMessage(error: unknown, maxLength = 700): {
  message: string;
  originalLength: number;
  truncated: boolean;
} {
  let raw = '';

  if (error instanceof Error) {
    raw = error.message;
  }
  else if (typeof error === 'string') {
    raw = error;
  }
  else {
    try {
      raw = JSON.stringify(error);
    } catch {
      raw = String(error);
    }
  }

  const normalized = raw.replace(/\s+/g, ' ').trim();
  const originalLength = normalized.length;

  if (originalLength <= maxLength) {
    return {
      message: normalized,
      originalLength,
      truncated: false,
    };
  }

  return {
    message: `${normalized.slice(0, maxLength)}... [truncated]`,
    originalLength,
    truncated: true,
  };
}

// Detecta errores tipicos de YouTube cuando una URL ya no es reproducible.
export function isUnavailableYouTubeVideoError(error: unknown): boolean {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : '';

  if (!raw) {
    return false;
  }

  const normalized = raw.toLowerCase();
  return (
    normalized.includes('video is not available') ||
    normalized.includes('this video is unavailable') ||
    normalized.includes('private video') ||
    normalized.includes('this video is private') ||
    normalized.includes('not available in your country') ||
    normalized.includes('sign in to confirm your age')
  );
}
