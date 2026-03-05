/**
 * @file src/modules/music/services/guild-action-lock-service.ts
 * @description Lock por guild para serializar acciones de musica y evitar carreras entre botones/comandos simultaneos.
 */
import { MusicUserError } from '../errors.js';
import { musicLogger } from '../logger.js';
import { readPositiveTimeoutMs } from '../shared/runtime-utils.js';

const DEFAULT_LOCK_TIMEOUT_MS = 15_000;
const DEFAULT_STALE_LOCK_RELEASE_MS = 60_000;

type GuildLockState = {
  token: symbol;
  startedAt: number;
};

export class GuildActionLockService {
  private readonly guildLocks = new Map<string, GuildLockState>();
  private readonly lockTimeoutMs = readPositiveTimeoutMs(
    'MUSIC_LOCK_TIMEOUT_MS',
    DEFAULT_LOCK_TIMEOUT_MS,
  );
  private readonly staleLockReleaseMs = Math.max(
    readPositiveTimeoutMs('MUSIC_STALE_LOCK_RELEASE_MS', DEFAULT_STALE_LOCK_RELEASE_MS),
    this.lockTimeoutMs + 1_000,
  );

  isLocked(guildId: string): boolean {
    return this.guildLocks.has(guildId);
  }

  // Orquesta la ejecucion completa con logging y control de errores.
  async runWithLock<T>(guildId: string, task: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const existingLock = this.guildLocks.get(guildId);

    if (existingLock) {
      const lockAgeMs = now - existingLock.startedAt;

      if (lockAgeMs >= this.staleLockReleaseMs) {
        this.guildLocks.delete(guildId);
        musicLogger.warn(
          {
            event: 'stale_lock_released',
            guildId,
            lockAgeMs,
            staleLockReleaseMs: this.staleLockReleaseMs,
          },
          'released stale music lock',
        );
      } else {
        throw new MusicUserError('Hay otra accion de musica en proceso. Intenta de nuevo en un segundo.');
      }
    }

    const token = Symbol(`music-lock:${guildId}`);
    this.guildLocks.set(guildId, { token, startedAt: now });

    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    const releaseLock = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }

      const activeLock = this.guildLocks.get(guildId);
      if (activeLock?.token === token) {
        this.guildLocks.delete(guildId);
      }
    };

    const taskPromise = task();
    void taskPromise.then(releaseLock, releaseLock);

    timeoutHandle = setTimeout(() => {
      const activeLock = this.guildLocks.get(guildId);
      if (activeLock?.token !== token) {
        return;
      }

      musicLogger.warn(
        {
          event: 'long_running_lock',
          guildId,
          lockAgeMs: Date.now() - now,
          lockTimeoutMs: this.lockTimeoutMs,
        },
        'music action is taking longer than lock timeout threshold',
      );
    }, this.lockTimeoutMs);

    timeoutHandle.unref?.();

    return taskPromise;
  }
}
