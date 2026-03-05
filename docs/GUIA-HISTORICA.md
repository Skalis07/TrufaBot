# GUIA HISTORICA - TrufaBot (Version Junior 100% Flujo)

## 1) Como usar esta guia

Esta guia esta escrita para alguien junior que recien empieza.
La lectura recomendada es estrictamente en este orden:

1. Entender el objetivo general del bot.
2. Seguir la linea de tiempo de ejecucion real (desde que prende hasta que reproduce).
3. Leer el mapa de capas para saber en que archivo vive cada responsabilidad.
4. Revisar el catalogo completo de funciones desde `docs/FUNCIONES_DETALLADAS.md` cuando necesites detalle fino.

Si sigues ese orden, puedes abrir el proyecto y entender:

- por que existe cada carpeta,
- como se conectan los archivos,
- que funcion toca cada parte del flujo,
- y donde depurar si algo falla.

## 2) Objetivo real del proyecto

TrufaBot es un bot de Discord modular con foco en musica.
Su arquitectura actual prioriza:

- separacion de responsabilidades,
- servicios pequenos y especializados,
- locking por guild para evitar carreras,
- logs estructurados para depurar produccion,
- continuidad de playback (autoplay/prefetch) con fallback robusto.

No es un demo minimo: ya tiene flujo operativo completo de slash commands + botones + manejo de estado de voz.

## 3) Mapa de arquitectura (vision corta)

Capas actuales del codigo:

1. `src/index.ts`
2. `src/commands/*`
3. `src/modules/utility/*`
4. `src/modules/music/*`

Traduccion simple:

- `index.ts` arranca y enruta.
- `commands/` define contrato y registro.
- `utility/` resuelve comandos generales.
- `music/` concentra dominio de reproduccion (comandos, UI, servicios, adapters y reglas).

## 4) Linea de tiempo completa de ejecucion

Esta es la parte mas importante para un junior.
Piensa el bot como una pelicula en orden cronologico.

### T0 - Preparacion local

Antes de correr:

- `.env` con `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_IDS`.
- Dependencias instaladas.
- Slash commands registrados con `scripts/register-commands.ts`.

### T1 - Registro de slash commands

Archivo clave: `scripts/register-commands.ts`

Flujo:

1. Carga env.
2. Importa la lista de comandos desde el registry.
3. Publica/actualiza comandos por guild (modo desarrollo rapido).

Objetivo: que Discord conozca la firma de `/play`, `/skip`, etc., antes de ejecutar runtime.

### T2 - Arranque del runtime

Archivo clave: `src/index.ts`

Flujo:

1. Carga configuracion base.
2. Crea cliente de Discord.
3. Inicializa player de musica (`music-player.ts`).
4. Conecta listeners:
   - `ready`
   - `interactionCreate` (slash + botones)
5. Loguea estado inicial del bot.

Cuando termina T2, el bot esta vivo y esperando interacciones.

### T3 - Llega un slash command

Archivos clave:

- `src/commands/command-registry.ts`
- `src/modules/music/commands/index.ts`
- `src/modules/music/commands/run-music-slash.ts`

Flujo:

1. Discord envia interaccion.
2. `index.ts` identifica comando slash.
3. Busca comando en `command-registry`.
4. Si es de musica, entra al router `runMusicSlashCommand`.
5. El router delega al archivo comando especifico (`play.ts`, `skip.ts`, etc.).
6. Ese archivo comando delega al `music-service` facade.

Punto clave: el comando casi no tiene logica pesada. La logica vive en servicios.

### T4 - Llega un click de boton

Archivo clave: `src/modules/music/handlers/button-interaction-handler.ts`

Flujo:

1. Discord envia `ButtonInteraction`.
2. El handler parsea `customId`.
3. Traduce boton a accion de servicio (`pause`, `skip`, `autoplay`, etc.).
4. Responde/actualiza panel segun resultado.

Punto clave: botones y slash terminan convergiendo en la misma capa de servicios.

### T5 - Caso completo `/play` (camino feliz)

Archivos involucrados (orden real):

1. `music/commands/play.ts`
2. `music/services/music-service.ts`
3. `music/services/music-play-queue-command-service.ts`
4. `music/services/music-source-service.ts`
5. `music/services/music-source-*` (spotify/youtube/ytdlp)
6. `music/services/control-message-service.ts`

Secuencia:

1. Valida contexto de voz (usuario debe estar en voice).
2. Toma lock de guild (`guild-action-lock-service.ts`).
3. Normaliza input (`music-command-utils.ts`).
4. Decide tipo de fuente:
   - URL directa
   - busqueda `ytsearch:`
   - spotify track/playlist
   - youtube playlist
5. Resuelve fuente reproducible (yt-dlp plugin o fallback CLI).
6. Encola/reproduce con DisTube.
7. Sincroniza panel now playing.
8. Suelta lock.
9. Devuelve mensaje final de UX.

### T6 - Caso autoplay (prefetch + continuidad)

Archivos involucrados:

- `autoplay-service.ts` (facade)
- `autoplay-history-service.ts`
- `autoplay-prefetch-state/read/orchestrator/candidate-access`
- `autoplay-candidate-resolver-service.ts`
- `autoplay-ytdlp-query-service.ts`
- `autoplay-continuation-service.ts`
- `autoplay-continuation-guard-service.ts`

Secuencia real:

1. Se enciende autoplay (flag en cola).
2. Se inicia prefetch para la seed song actual.
3. Resolver busca candidatos (queries + filtros + score).
4. Guarda mejor candidato en cache prefetch.
5. Si termina la pista sin siguiente manual:
   - intenta usar prefetch listo (hit),
   - si no hay, resuelve fallback on-demand,
   - reproduce candidato elegido,
   - re-sincroniza panel y estado.
6. Si entra una cancion manual antes de consumir prefetch:
   - invalida prefetch para no mezclar contexto viejo.
7. Si `skip` necesita inyectar recomendacion de autoplay y el candidato falla por
   "video no disponible":
   - invalida prefetch actual,
   - pide un candidato nuevo,
   - reintenta en el mismo comando (maximo 3 intentos),
   - evita repetir la misma URL rota en ese ciclo.

Objetivo tecnico: continuidad sin bloquear UX y sin repetir basura de resultados.

### T7 - Caso playlists progresivas (YouTube / Spotify)

Archivos clave:

- `music-source-service.ts`
- `music-source-youtube-playlist-service.ts`
- `music-source-spotify-playlist-service.ts`
- `music-source-ytdlp-service.ts`

Secuencia:

1. Detecta que la entrada es playlist.
2. Obtiene entradas en modo plano (metadatos primero).
3. Crea estado progresivo por guild (token/contador).
4. Va encolando por lotes para evitar congelar todo.
5. Actualiza panel durante carga.
6. Si hay `clear/quit/stop`, invalida token y corta carga limpia.

Objetivo UX: empezar a sonar rapido sin esperar a resolver toda la playlist completa.

### T8 - Caso inactividad y desconexion

Archivo clave: `inactivity-disconnect-service.ts`

Timers:

- no playback timeout,
- empty channel timeout.

Secuencia:

1. Evento de cola vacia o voice sin usuarios humanos.
2. Programa timeout.
3. Si vuelve actividad, cancela timeout.
4. Si expira, desconecta voz y limpia estado asociado.

Objetivo: evitar bots pegados en voice indefinidamente.

### T9 - Caso errores y concurrencia

Archivos clave:

- `guild-action-lock-service.ts`
- `music-action-runner-service.ts`
- `runtime-utils.ts`

Secuencia:

1. Cada accion entra por wrapper de ejecucion con logs de inicio/fin/error.
2. Lock por guild evita carreras (dos users apretando botones a la vez).
3. Timeouts/control de locks largos evitan deadlocks silenciosos.
4. Errores de usuario y tecnicos se separan para UX clara.

## 5) Que archivo tocar segun problema

Regla rapida de mantenimiento:

- Slash no responde: `index.ts`, `command-registry.ts`, `run-music-slash.ts`.
- Botones no responden: `button-interaction-handler.ts`, `control-buttons.ts`.
- No reproduce URL/busqueda: `music-source-service.ts`, `music-source-ytdlp-service.ts`.
- Spotify falla: `music-source-spotify-service.ts`, `music-source-spotify-playlist-service.ts`.
- Autoplay raro: `autoplay-service.ts` + subservicios `autoplay-*`.
- Se queda en voice: `inactivity-disconnect-service.ts`.
- Carrera entre acciones: `guild-action-lock-service.ts`.

## 6) Orden de lectura recomendado para junior

Si eres nuevo en backend/eventos Discord, sigue este orden:

1. `src/index.ts`
2. `src/commands/command.ts`
3. `src/commands/command-registry.ts`
4. `src/modules/music/commands/run-music-slash.ts`
5. `src/modules/music/handlers/button-interaction-handler.ts`
6. `src/modules/music/services/music-service.ts`
7. `src/modules/music/services/music-play-queue-command-service.ts`
8. `src/modules/music/services/music-source-service.ts`
9. `src/modules/music/services/autoplay-service.ts`
10. resto de `autoplay-*`
11. `inactivity-disconnect-service.ts`
12. `control-message-service.ts` + `ui/*`
13. `utility/*`

## 7) Checklist de calidad actual

Estado actual despues de la limpieza aplicada:

- `tsc --noEmit --noUnusedLocals --noUnusedParameters`: OK.
- typecheck/build: OK.
- codigo muerto critico en servicios principales: removido.
- cobertura documental: 69/69 archivos fuente (`.ts` + `.mjs`) en inventario detallado.


## 8) Catalogo tecnico relacionado

Para mantener esta guia legible y evitar desalineaciones por numeros de linea, el inventario completo de funciones se mantiene en archivos separados:

- `docs/FUNCIONES_DETALLADAS.md`: detalle archivo por archivo y funcion por funcion (`src/` + `scripts/`, `.ts`/`.mjs`).
- `docs/function-inventory.json`: inventario estructurado de los mismos archivos para busquedas/automatizacion.
- `docs/REVISION_TS_CHECKLIST.md`: estado de revision tecnica y prioridades de refactor.

Regla de mantenimiento:

1. Cuando cambie comportamiento en servicios/comandos, actualizar primero `GUIA-HISTORICA.md` (flujo).
2. Luego sincronizar `FUNCIONES_DETALLADAS.md` y `function-inventory.json`.
3. Si cambia complejidad/estado tecnico, reflejarlo en `REVISION_TS_CHECKLIST.md`.

Con esto, `GUIA-HISTORICA.md` sigue enfocada en linea de tiempo, y el detalle fino vive donde corresponde.

