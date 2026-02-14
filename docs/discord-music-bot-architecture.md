# TrufaBot - Arquitectura Modular (Discord Bot Multiproposito + Musica)

## 1) Objetivo
Diseñar un bot de Discord en **TypeScript + Node.js** con arquitectura modular para:

- Resolver el dominio de musica (YouTube + importacion desde Spotify).
- Agregar comandos no musicales sin acoplarlos al motor de audio.
- Escalar por guild, por modulo y por infraestructura.
- Permitir migracion de audio a Lavalink sin romper comandos/UI.

## 2) Alcance funcional
### MVP de musica
- `/play <query|url>`
- `/pause` `/resume`
- `/skip` `/back`
- `/loop`
- `/rewind`
- `/replay`
- `/volume`
- `/queue`
- `/stop`
- Botones de control

### Comandos no musica (base de plataforma)
- `/ping` (salud)
- `/help` (descubrimiento)
- `/config` (admin por guild)
- `/uptime` (operacion)
- Estructura lista para `moderation`, `utility`, `fun`, `ai`, etc.

## 3) Principios de arquitectura
- **Modularidad por dominio**: cada modulo define comandos, servicios y eventos propios.
- **Hexagonal (Ports/Adapters)**: el dominio no depende de Discord ni de proveedores externos.
- **Estado por guild**: sesion aislada para cola, volumen, permisos y configuracion.
- **Contratos estables**: `MusicAdapter`, `CommandModule`, `GuildSessionStore`.
- **Observabilidad primero**: logs estructurados, metricas y trazabilidad de comandos.
- **Cambio seguro**: testing por capas + feature flags para rollout.

## 4) Vista de alto nivel
```text
Discord Gateway
   |
   v
Interaction Router ---------------------------+
   |                                          |
   v                                          v
Module Registry                        Event Bus (interno)
   |                                          |
   +--> Music Module (domain)                +--> Jobs / Notifiers
   +--> Utility Module (domain)
   +--> Moderation Module (futuro)
   +--> Custom Modules (futuro)

Domain Services --> Ports --> Adapters --> Infra (Discord Voice, YT, Spotify, DB, Cache)
```

## 5) Estructura de carpetas propuesta
```text
src/
  index.ts
  app/
    bootstrap.ts
    lifecycle.ts
  core/
    config/
      env.ts
      schema.ts
    contracts/
      command-module.ts
      music-adapter.ts
      resolver.ts
      session-store.ts
      logger.ts
    errors/
      app-error.ts
      domain-errors.ts
    events/
      event-bus.ts
      event-types.ts
    types/
      command-context.ts
      interaction.ts
  modules/
    music/
      application/
        commands/
          play.ts
          pause.ts
          resume.ts
          skip.ts
          queue.ts
          stop.ts
        handlers/
          button-handler.ts
        services/
          playback-service.ts
          queue-service.ts
          resolver-service.ts
      domain/
        entities/
          track.ts
          queue.ts
          guild-session.ts
        value-objects/
          track-source.ts
        policies/
          queue-policy.ts
      infrastructure/
        adapters/
          distube-adapter.ts
          lavalink-adapter.ts
        providers/
          youtube-provider.ts
          spotify-importer.ts
      module.ts
    utility/
      application/
        commands/
          ping.ts
          help.ts
          uptime.ts
      module.ts
    admin/
      application/
        commands/
          config.ts
      module.ts
  infrastructure/
    discord/
      client.ts
      interaction-router.ts
      command-registry.ts
      voice/
        voice-gateway.ts
    persistence/
      prisma/
      repositories/
    cache/
      redis.ts
      memory-cache.ts
    observability/
      logger.ts
      metrics.ts
      tracing.ts
  shared/
    utils/
      time.ts
      retry.ts
      ids.ts
  tests/
    unit/
    integration/
    e2e/
```

## 6) Contratos clave (interfaces)
```ts
export interface CommandModule {
  id: string;
  version: string;
  commands: SlashCommandDefinition[];
  register(container: ServiceContainer): void;
  onInteraction?(ctx: CommandContext): Promise<void>;
  onEvent?(event: AppEvent): Promise<void>;
}

export interface MusicAdapter {
  connect(guildId: string, voiceChannelId: string): Promise<void>;
  play(guildId: string, track: Track): Promise<void>;
  pause(guildId: string): Promise<void>;
  resume(guildId: string): Promise<void>;
  stop(guildId: string): Promise<void>;
  setVolume(guildId: string, volume: number): Promise<void>;
  on(event: MusicAdapterEvent, handler: (...args: unknown[]) => void): void;
}

export interface GuildSessionStore {
  get(guildId: string): Promise<GuildSession | null>;
  save(session: GuildSession): Promise<void>;
  delete(guildId: string): Promise<void>;
}
```

## 7) Flujo de comando (slash + botones)
1. Llega interaccion de Discord.
2. `interaction-router` construye `CommandContext`.
3. Valida permisos, cooldown y estado del guild.
4. Resuelve modulo/comando en `ModuleRegistry`.
5. Ejecuta handler de aplicacion (sin dependencia directa de Discord SDK).
6. Publica eventos internos (`command.executed`, `music.track.started`, etc.).
7. Responde a Discord (ephemeral/public) y registra metricas.

## 8) Dominio de musica (detalle)
### 8.1 Resolver de entradas
Pipeline sugerido:
1. Detectar tipo de input (`youtube-url`, `spotify-url`, `text-query`).
2. Si es Spotify: extraer metadata (track/playlist/album).
3. Convertir metadata a query canonicamente (`artist - title audio`).
4. Buscar en YouTube y rankear resultados.
5. Devolver `Track[]` normalizados.

### 8.2 Modelo de Track canonico
```ts
type Track = {
  id: string;
  title: string;
  artist: string;
  durationMs: number;
  source: 'youtube' | 'spotify-imported' | 'unknown';
  uri: string;
  requestedBy: string;
  thumbnailUrl?: string;
};
```

### 8.3 Cola por guild
- Cola FIFO con politicas: `loop=off|track|queue`.
- Historial para `back`.
- Locks por guild para evitar carreras en `play/skip/stop` simultaneos.
- Persistencia opcional para recuperar cola tras reinicio.

### 8.4 Botones y sincronizacion de estado
- `custom_id` versionado: `music:v1:pause:<guildId>`.
- Botones siempre verifican pertenencia a canal de voz.
- Mensaje de control unico por guild (editar en lugar de spam).

## 9) Modulos no musicales
Cada modulo debe ser autonomo y registrar:
- Lista de comandos slash.
- Dependencias (servicios/repositorios).
- Configuracion por guild habilitada/deshabilitada.
- Eventos consumidos/producidos.

Ejemplo de modulos futuros:
- `moderation`: warn, mute, cleanup.
- `utility`: reminders, polls, server info.
- `automation`: respuestas automaticas, acciones por eventos.

## 10) Configuracion y feature flags
### Config global (env)
- `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_IDS`
- `MUSIC_ADAPTER=distube|lavalink`
- `DATABASE_URL`, `REDIS_URL`
- `LOG_LEVEL`, `METRICS_ENABLED`

### Config por guild
- Modulos habilitados.
- Volumen por defecto y limites.
- Canal/log de auditoria.
- Roles permitidos por comando.

### Feature flags recomendados
- `music.spotifyImporterV2`
- `music.persistentQueue`
- `commands.globalCooldown`

## 11) Persistencia
### Fase 1
- Memoria para sesiones + JSON opcional de respaldo.

### Fase 2
- PostgreSQL (configuracion, historial basico, auditoria).
- Redis (locks, cache de busquedas, rate-limit distribuido).

Entidades minimas sugeridas:
- `guild_settings`
- `command_permissions`
- `music_queue_snapshot`
- `command_audit_log`

## 12) Observabilidad y operacion
- Logs JSON con `requestId`, `guildId`, `userId`, `commandName`, `latencyMs`.
- Metricas Prometheus/OpenTelemetry:
  - `commands_total`
  - `commands_failures_total`
  - `command_duration_ms`
  - `music_queue_size`
  - `voice_reconnect_total`
- Alertas:
  - ratio de error > umbral
  - desconexiones de voz repetidas
  - latencia de comando elevada

## 13) Seguridad y gobernanza
- Verificacion estricta de permisos por comando.
- Cooldown por usuario y por guild.
- Sanitizacion de input y limites de longitud.
- Lista de dominios permitidos para URLs externas.
- Auditoria de comandos administrativos.

## 14) Calidad y testing
### Unit
- `resolver-service`, `queue-service`, policies.

### Integracion
- `interaction-router` con mocks de Discord.
- Contratos de `MusicAdapter` (suite compartida para Distube/Lavalink).

### E2E
- Flujo `/play` -> cola -> `skip` -> `stop`.
- Flujo con botones y recuperacion tras error.

### CI minima
- `typecheck`, `lint`, `test`, `build`.
- Bloqueo de merge si falla suite de contrato.

## 15) Plan de implementacion por fases
1. **Base de plataforma**: bootstrap, config schema, logger, module registry.
2. **Core de comandos**: router, permisos, cooldown, help.
3. **Music MVP**: resolver + cola + comandos + botones.
4. **Robustez**: locks por guild, retries, metricas y alertas.
5. **Persistencia**: settings/auditoria + snapshots de cola.
6. **Escalado funcional**: agregar modulos `utility`/`moderation`.
7. **Migracion Lavalink**: activar adapter por flag y validar contrato.

## 16) Estrategia de migracion a Lavalink
- Mantener `MusicAdapter` como frontera estable.
- Construir `lavalink-adapter.ts` compatible con la suite de contrato.
- Ejecutar ambos adapters en entorno de staging.
- Hacer canary por guild via feature flag.
- Rollback instantaneo cambiando `MUSIC_ADAPTER`.

## 17) Definition of Done (ampliada)
- Comandos de musica funcionales y estables bajo concurrencia basica.
- Comandos no musica funcionando en modulos separados.
- Estado por guild aislado y consistente.
- Error handling homogeneo con mensajes al usuario + logs tecnicos.
- Suite de tests unit + integracion + contrato en CI.
- Adapter Lavalink preparado sin cambiar handlers de comandos.
- Documento de operaciones con variables, despliegue y troubleshooting.

## 18) Mejoras recomendadas inmediatas
1. Implementar `ModuleRegistry` desde el inicio (evita deuda tecnica).
2. Definir suite de contrato para `MusicAdapter` antes de completar features.
3. Introducir locks por guild en todos los comandos mutables de cola.
4. Separar `resolver-service` del reproductor para habilitar cache efectiva.
5. Registrar `audit log` para comandos administrativos desde la primera version.

---

Este documento deja a TrufaBot listo para crecer como bot multiproposito sin perder foco en musica ni bloquear la migracion futura de motor de audio.
