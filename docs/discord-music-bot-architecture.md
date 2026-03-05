# TrufaBot - Arquitectura de Musica (estado real actual)

## 1) Proposito de este documento
Este archivo explica la arquitectura de musica a nivel macro.

Para detalle paso a paso usa:

- [docs/GUIA-HISTORICA.md](GUIA-HISTORICA.md) (flujo cronologico completo)
- [docs/FUNCIONES_DETALLADAS.md](FUNCIONES_DETALLADAS.md) (archivo y funcion por funcion)

## 2) Stack actual
- Runtime: Node.js + TypeScript
- Discord: `discord.js`
- Motor de audio: `distube`
- Plugins: `@distube/spotify`, `@distube/youtube` (search-only), `@distube/yt-dlp`
- Logging: `pino`

## 3) Estado funcional implementado
Comandos de musica:

- `/join`, `/play`, `/pause`, `/resume`, `/skip`, `/back`
- `/autoplay`, `/loop`, `/rewind`, `/forward`, `/replay`
- `/nowplaying`, `/queue` (paginado), `/clear`, `/volume`, `/stop`, `/quit`

UI y control:

- Panel `Now Playing` + botones
- Labels de solicitante (`Autoplay` cuando corresponde)
- Logs estructurados por accion

Robustez:

- Lock por guild para evitar carreras entre acciones concurrentes
- Autoplay con prefetch y fallback
- `skip` con reintento defensivo cuando el candidato de autoplay queda no disponible (invalidacion de prefetch y nueva seleccion)
- Continuidad de autoplay en `FINISH` y `DELETE_QUEUE`
- Carga progresiva de playlists (YouTube/Spotify)
- Auto-desconexion por inactividad (sin playback / canal vacio)

## 4) Flujo de alto nivel
```text
Discord Interaction
   |
   v
src/index.ts
   |
   +--> slash route -> command registry -> music command -> music-service facade
   |
   +--> button route -> button handler -> music-service facade
                            |
                            v
                   specialized services (playback/source/autoplay/locks/ui/inactivity)
                            |
                            v
                    DisTube + plugins + voice connection
```

## 5) Arquitectura interna del modulo `music`
### 5.1 Capa de entrada
- `src/modules/music/commands/*`
- `src/modules/music/handlers/button-interaction-handler.ts`

Responsabilidad:
- convertir interacciones Discord a llamadas de caso de uso
- no contener logica pesada de negocio

### 5.2 Capa de orquestacion
- `src/modules/music/services/music-service.ts`

Responsabilidad:
- actuar como facade estable
- componer servicios especializados
- exponer API de alto nivel a comandos y botones

### 5.3 Capa de casos de uso especializados
- `music-play-queue-command-service.ts`
- `music-playback-command-service.ts`
- `music-session-command-service.ts`
- `music-read-service.ts`
- `music-action-runner-service.ts`
- `music-voice-context-service.ts`

Responsabilidad:
- encapsular reglas por tipo de accion
- mantener funciones pequenas y testeables

### 5.4 Capa de fuentes y resolucion
- `music-source-service.ts`
- `music-source-ytdlp-service.ts`
- `music-source-youtube-playlist-service.ts`
- `music-source-spotify-service.ts`
- `music-source-spotify-playlist-service.ts`

Responsabilidad:
- resolver input (URL/query) a fuente reproducible
- cargar playlists progresivamente
- aislar detalles de proveedores

### 5.5 Capa de autoplay
- `autoplay-service.ts` (facade)
- `autoplay-history-service.ts`
- `autoplay-candidate-resolver-service.ts`
- `autoplay-ytdlp-query-service.ts`
- `autoplay-prefetch-*`
- `autoplay-continuation-service.ts`
- `autoplay-continuation-guard-service.ts`
- `autoplay-progress-notice-service.ts`

Responsabilidad:
- seleccionar recomendacion
- prefetch para reducir latencia al terminar pista
- mantener continuidad segura del flujo

### 5.6 Capa de estado operativo y UI
- `guild-action-lock-service.ts`
- `inactivity-disconnect-service.ts`
- `control-message-service.ts`
- `ui/now-playing-embed.ts`
- `ui/control-buttons.ts`

Responsabilidad:
- coherencia de estado por guild
- sincronizacion de panel y botones
- desconexion por inactividad

## 6) Configuracion real (`.env`)
Variables activas de musica:

- `MUSIC_LOCK_TIMEOUT_MS`
- `MUSIC_STALE_LOCK_RELEASE_MS`
- `MUSIC_NO_PLAYBACK_TIMEOUT_MS`
- `MUSIC_EMPTY_CHANNEL_TIMEOUT_MS`
- `MUSIC_AUTOPLAY_RECENT_LIMIT`
- `MUSIC_AUTOPLAY_RECENT_TTL_MS`
- `MUSIC_AUTOPLAY_RANDOM_POOL_SIZE`
- `MUSIC_PLAYLIST_PROGRESSIVE_FLAT_TIMEOUT_MS`
- `MUSIC_PLAYLIST_PROGRESSIVE_MAX_ENTRIES`
- `MUSIC_PLAYLIST_PROGRESSIVE_BATCH_DELAY_MS`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`

Variables base:

- `DISCORD_TOKEN`
- `CLIENT_ID`
- `GUILD_IDS`
- `LOG_LEVEL`

## 7) Estructura real relevante (resumen)
```text
src/
  index.ts
  commands/
    command.ts
    command-registry.ts
  modules/
    music/
      commands/
      handlers/
      services/
      domain/
      shared/
      ui/
      constants.ts
      errors.ts
      logger.ts
      music-player.ts
    utility/
scripts/
  register-commands.ts
  music-playlist-smoke-test.mjs
  ensure-function-comments.mjs
  generate-function-docs.mjs
docs/
  GUIA-HISTORICA.md
  FUNCIONES_DETALLADAS.md
```

## 8) Operacion y calidad actual
- Typecheck: en verde
- Build: en verde
- Limpieza de no-usados: aplicada en servicios principales
- Comentarios de archivo: aplicados de forma consistente
- Comentarios por funcion: cobertura parcial (existe script de auditoria `scripts/ensure-function-comments.mjs`)
- Logging de autoplay/inactividad/acciones: operativo

## 9) Fuente de verdad documental
Si ves diferencia entre documentos, toma este orden de verdad:

1. [docs/GUIA-HISTORICA.md](GUIA-HISTORICA.md) (flujo real)
2. [docs/FUNCIONES_DETALLADAS.md](FUNCIONES_DETALLADAS.md) (detalle de simbolos)
3. este archivo (vista macro)
