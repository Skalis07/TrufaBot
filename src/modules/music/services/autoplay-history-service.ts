/**
 * @file src/modules/music/services/autoplay-history-service.ts
 * @description Mantiene historial reciente de autoplay y utilidades de contexto para evitar repeticiones.
 */
import { type Queue } from 'distube';
import {
  buildAutoplayCandidateKey,
  buildQueueSongCandidate,
  type AutoplayCandidate,
  isProbablySameCandidateVariant,
} from '../domain/autoplay-candidate-utils.js';
import { musicLogger } from '../logger.js';

type AutoplayRecentTrack = AutoplayCandidate & {
  addedAt: number;
};

type AutoplayHistoryServiceDeps = {
  lastStartedSongByGuild: Map<string, Queue['songs'][number]>;
  autoplayRecentByGuild: Map<string, AutoplayRecentTrack[]>;
  autoplayRecentLimit: number;
  autoplayRecentTtlMs: number;
};

export class AutoplayHistoryService {
  constructor(private readonly deps: AutoplayHistoryServiceDeps) {}

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get lastStartedSongByGuild() {
    return this.deps.lastStartedSongByGuild;
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get autoplayRecentByGuild() {
    return this.deps.autoplayRecentByGuild;
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get autoplayRecentLimit() {
    return this.deps.autoplayRecentLimit;
  }

  // Getter de solo lectura para encapsular acceso a dependencias/estado.
  private get autoplayRecentTtlMs() {
    return this.deps.autoplayRecentTtlMs;
  }

  private pruneAutoplayRecentHistory(guildId: string): void {
    // Mantiene memoria de autoplay acotada por tiempo y cantidad para no crecer
    // indefinidamente y evitar sesgo de sesiones muy viejas.
    const entries = this.autoplayRecentByGuild.get(guildId);
    if (!entries || entries.length === 0) {
      return;
    }

    const cutoff = Date.now() - this.autoplayRecentTtlMs;
    const fresh = entries
      .filter((entry) => entry.addedAt >= cutoff)
      .slice(0, this.autoplayRecentLimit);

    if (fresh.length === 0) {
      this.autoplayRecentByGuild.delete(guildId);
      return;
    }

    this.autoplayRecentByGuild.set(guildId, fresh);
  }

  // Guarda contexto/historial para decisiones posteriores.
  rememberAutoplayTrack(guildId: string, track: AutoplayCandidate): void {
    // Registra recomendaciones reproducidas/encoladas por autoplay para evitar bucles
    // de "misma cancion" entre varios skips consecutivos.
    this.pruneAutoplayRecentHistory(guildId);

    const entries = this.autoplayRecentByGuild.get(guildId) ?? [];
    const nextEntry: AutoplayRecentTrack = {
      ...track,
      addedAt: Date.now(),
    };

    const deduped = entries.filter((entry) => !isProbablySameCandidateVariant(entry, nextEntry));
    this.autoplayRecentByGuild.set(guildId, [nextEntry, ...deduped].slice(0, this.autoplayRecentLimit));
  }

  private isAutoplayAttributedQueueSong(
    guildId: string,
    song: Queue['songs'][number] | undefined,
  ): boolean {
    // Marca la pista actual como "Autoplay" si coincide con una recomendacion reciente
    // encolada por el propio autoplay del guild.
    if (!song) {
      return false;
    }

    this.pruneAutoplayRecentHistory(guildId);
    const recentEntries = this.autoplayRecentByGuild.get(guildId);
    if (!recentEntries || recentEntries.length === 0) {
      return false;
    }

    const queueSongCandidate = buildQueueSongCandidate(song);
    return recentEntries.some((entry) => isProbablySameCandidateVariant(entry, queueSongCandidate));
  }

  getRequestedByLabelForQueueSong(
    guildId: string,
    song: Queue['songs'][number] | undefined,
  ): string {
    // Unifica el texto "solicitado por" entre panel y `/nowplaying`.
    if (!song) {
      return 'Desconocido';
    }

    if (this.isAutoplayAttributedQueueSong(guildId, song)) {
      return 'Autoplay';
    }

    return song.member ? `<@${song.member.id}>` : 'Desconocido';
  }

  // Guarda contexto/historial para decisiones posteriores.
  rememberStartedQueueSong(queue: Queue): void {
    // Snapshot de la pista que realmente empezó a sonar. Se usa para recuperar
    // continuidad/back cuando DisTube recrea la cola (ej. autoplay tras DELETE_QUEUE).
    const currentSong = queue.songs[0];
    if (!currentSong) {
      return;
    }

    this.lastStartedSongByGuild.set(queue.id, currentSong);
    musicLogger.info(
      {
        event: 'started_song_snapshot_updated',
        guildId: queue.id,
        song: currentSong.name,
        source: currentSong.source,
      },
      'updated last started song snapshot',
    );
  }

  collectAutoplayReferenceCandidates(queue: Queue): AutoplayCandidate[] {
    // Junta referencias "prohibidas" para autoplay: pista actual, historial de la queue,
    // cola inmediata y memoria reciente del guild.
    const references: AutoplayCandidate[] = [];

    for (const song of queue.songs.slice(0, 5)) {
      references.push(buildQueueSongCandidate(song));
    }

    for (const song of queue.previousSongs.slice(0, this.autoplayRecentLimit)) {
      references.push(buildQueueSongCandidate(song));
    }

    this.pruneAutoplayRecentHistory(queue.id);
    for (const recentEntry of this.autoplayRecentByGuild.get(queue.id) ?? []) {
      references.push(recentEntry);
    }

    const unique = new Map<string, AutoplayCandidate>();
    for (const reference of references) {
      const key = buildAutoplayCandidateKey(reference);
      if (!unique.has(key)) {
        unique.set(key, reference);
      }
    }

    return [...unique.values()];
  }

}
