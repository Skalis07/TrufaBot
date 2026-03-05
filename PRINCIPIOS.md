# PRINCIPIOS DE REFACTORIZACION (SOLID + FACTORY) - TRUFABOT

## 1) Proposito de este documento
Este documento define como refactorizar TrufaBot para que el codigo propio del proyecto sea:

- facil de entender (especialmente para juniors),
- mas modular,
- menos acoplado,
- y mas profesional,

sin romper el comportamiento actual del bot ni caer en sobreingenieria.

El foco principal es el modulo de musica, y en particular `src/modules/music/services/music-service.ts`, que hoy concentra demasiadas responsabilidades.

## 2) Objetivo real (no academico)
No buscamos "SOLID perfecto" ni una arquitectura hexagonal completa de golpe.

Buscamos:
- **Codigo propio 100% entendible**
- **Dependencias externas entendidas por contrato** ("llama a X y hace Y")
- **Cambios pequenos y verificables**
- **Refactor seguro con comportamiento estable**

## 3) Alcance del refactor
### Incluye
- Reorganizar responsabilidades del codigo propio.
- Extraer helpers puros.
- Crear servicios chicos donde aporte claridad.
- Introducir factories donde simplifiquen bootstrap/composicion.
- Definir puertos/adapters minimos donde el acoplamiento a librerias sea alto.
- Actualizar documentacion (`docs/GUIA-HISTORICA.md`, `docs/discord-music-bot-architecture.md`) cuando cambie la estructura.

### No incluye (por ahora)
- Reescribir el bot completo.
- Cambiar de stack (Lavalink, otro framework, otro lenguaje).
- Introducir tests automatizados obligatorios antes del refactor (si bien siguen siendo deseables a futuro).
- "Interfaces por todo" sin necesidad real.

## 4) Principios de diseno que SI aplican aqui
## 4.1 SOLID (adaptado a TypeScript/Node)
### S - Single Responsibility Principle
Cada archivo/servicio debe tener una responsabilidad principal clara.

Ejemplos deseados:
- un servicio para locks por guild,
- otro para autoplay/prefetch,
- otro para validaciones de voz,
- otro para UI/panel.

### O - Open/Closed Principle
Agregar comportamiento nuevo no deberia obligar a tocar el mismo archivo gigante siempre.

Ejemplos:
- agregar filtros de autoplay en un modulo de heuristicas,
- agregar comandos de un modulo exportando un arreglo del modulo.

### L - Liskov Substitution Principle
En este repo aplica menos (se usa mas composicion que herencia). Se mantiene como criterio de interfaces compatibles, no como objetivo de herencia.

### I - Interface Segregation Principle
Si se crean contratos/puertos, deben ser pequenos y utiles.

No crear interfaces enormes tipo "MusicEverythingPort".

### D - Dependency Inversion Principle
La logica del negocio (lo nuestro) debe depender menos de implementaciones concretas (`DisTube`, `discord.js`) y mas de contratos propios en puntos criticos.

No se aplica de golpe a todo el repo: se introduce primero en los puntos de mayor acoplamiento.

## 4.2 Factory (patron, no arquitectura)
Usar factories donde realmente agregan valor:
- composicion de modulos,
- bootstrap del runtime,
- creacion de adapters/servicios con dependencias,
- configuracion por entorno.

No usar factory para funciones puras o helpers simples.

## 5) Reglas de trabajo del refactor (obligatorias)
## 5.1 Regla de seguridad
Cada cambio debe ser pequeno y reversible.

No mezclar en el mismo paso:
- refactor estructural grande
- feature nueva
- bugfix complejo no relacionado

## 5.2 Validacion minima por fase/slice
Siempre ejecutar:
- `npm run typecheck`
- `npm run build`

Y hacer smoke manual si se toco comportamiento:
- `/play`
- `AUTOPLAY`
- `SKIP`
- `BACK`
- `/clear` `/stop` `/quit`
- panel `Now Playing`

## 5.3 Regla de documentacion
Si cambia la estructura del repo o las responsabilidades por archivo, actualizar docs al final de la fase (no esperar al final del proyecto).

## 5.4 Regla anti sobreingenieria
No crear:
- interfaces para helpers puros,
- factories triviales,
- capas extra sin eliminar complejidad real.

## 6) Baseline (antes de refactorizar)
Antes de tocar piezas grandes, mantener estos flujos como referencia funcional:

1. `/play` texto (YouTube)
2. `/play` URL YouTube
3. `/play` Spotify track
4. `/play` Spotify playlist (carga progresiva)
5. `AUTOPLAY ON` y dejar terminar pista
6. `AUTOPLAY ON` + `SKIP` con una sola pista
7. `BACK` despues de autoplay
8. `/clear`, `/stop`, `/quit`
9. auto-desconexion por inactividad
10. panel `Now Playing` + `/nowplaying` (requester `Autoplay`)

## 7) Diagnostico actual del repo (resumen)
### Lo que ya esta bien
- Modulo `music` separado en `commands`, `handlers`, `services`, `ui`
- Servicios pequenos ya existentes (`inactivity`, `control-message-service`, etc.)
- Logging estructurado util
- Registry de comandos modular (ya mejorado)
- Factories puntuales en `music-player.ts`

### Principal deuda tecnica
- `src/modules/music/services/music-service.ts` mezcla demasiadas responsabilidades:
  - validaciones de contexto
  - locks por guild
  - autoplay/prefetch
  - resolver `yt-dlp` / Spotify fallback
  - playlists progresivas
  - sincronizacion de panel
  - control de cola
  - logging de alto nivel

## 7.1) Inventario completo de archivos `.ts` (auditoria SOLID + Factory)
Este inventario lista **todos** los archivos TypeScript del repo y define:

- rol actual,
- estado SOLID/Factory,
- accion recomendada.

La idea es que el refactor no se haga "a ciegas": primero se sabe **que tocar**, **que no tocar**, y **por que**.

### Grupo A - OK / mantener (solo mantenimiento menor)
Estos archivos ya cumplen bien su responsabilidad para el contexto actual. No requieren refactor estructural ahora.

- `src/commands/command.ts`
  - Rol: contrato base de slash command.
  - Estado: simple, claro, SRP correcto.
  - Accion: mantener.

- `src/modules/music/errors.ts`
  - Rol: errores del modulo de musica.
  - Estado: correcto y pequeno.
  - Accion: mantener.

- `src/modules/music/logger.ts`
  - Rol: logger del modulo.
  - Estado: correcto (single purpose).
  - Accion: mantener.

- `src/modules/music/constants.ts`
  - Rol: constantes y tipos simples de IDs.
  - Estado: correcto.
  - Accion: mantener.

- `src/modules/music/services/autoplay-progress-notice-service.ts`
  - Rol: estado/limpieza del aviso de progreso autoplay.
  - Estado: buen SRP.
  - Accion: mantener; revisar solo si cambia UX de botones.

- `src/modules/music/ui/control-buttons.ts`
  - Rol: construccion de botones del panel.
  - Estado: buen SRP (UI).
  - Accion: mantener; solo ajustes visuales/labels.

- `src/modules/music/ui/now-playing-embed.ts`
  - Rol: construccion del embed `Now Playing`.
  - Estado: buen SRP (UI/presentacion).
  - Accion: mantener; solo mejoras de formato.

- `src/modules/utility/ping.ts`
  - Rol: comando de utilidad.
  - Estado: correcto, pequeno.
  - Accion: mantener.

- `src/modules/utility/uptime.ts`
  - Rol: comando de utilidad.
  - Estado: correcto, pequeno.
  - Accion: mantener.

- `src/modules/utility/welcome.ts`
  - Rol: comando + helper de mensaje de bienvenida.
  - Estado: correcto, responsabilidad clara.
  - Accion: mantener.

- `src/modules/utility/index.ts`
  - Rol: export de comandos utility.
  - Estado: correcto.
  - Accion: mantener.

- `scripts/register-commands.ts`
  - Rol: script de registro de slash commands.
  - Estado: correcto para script operativo.
  - Accion: mantener; no aplicar sobreingenieria.

### Grupo B - Comandos slash de musica (OK, refactor minimo)
Son wrappers finos sobre `run-music-slash.ts` + `musicService`. En general ya estan bien.

- `src/modules/music/commands/autoplay.ts`
- `src/modules/music/commands/back.ts`
- `src/modules/music/commands/clear.ts`
- `src/modules/music/commands/forward.ts`
- `src/modules/music/commands/join.ts`
- `src/modules/music/commands/loop.ts`
- `src/modules/music/commands/nowplaying.ts`
- `src/modules/music/commands/pause.ts`
- `src/modules/music/commands/play.ts`
- `src/modules/music/commands/queue.ts`
- `src/modules/music/commands/quit.ts`
- `src/modules/music/commands/replay.ts`
- `src/modules/music/commands/resume.ts`
- `src/modules/music/commands/rewind.ts`
- `src/modules/music/commands/skip.ts`
- `src/modules/music/commands/stop.ts`
- `src/modules/music/commands/volume.ts`
  - Rol: definicion de slash + delegacion.
  - Estado: SRP correcto; bajo acoplamiento local.
  - Accion: mantener. Si se refactoriza, hacerlo solo para consistencia (nombres/comentarios).

- `src/modules/music/commands/run-music-slash.ts`
  - Rol: wrapper comun de defer/error/reply/cleanup efimero.
  - Estado: buen SRP.
  - Accion: mantener; posible mejora menor si se estandarizan `Result/Error`.

- `src/modules/music/commands/index.ts`
  - Rol: export/agregacion de comandos del modulo.
  - Estado: correcto; ya funciona como composicion modular.
  - Accion: mantener; posible entrada futura a factory de modulo.

### Grupo C - Soporte de arquitectura (mejoras menores / orden)
Archivos que funcionan bien, pero pueden mejorar claridad composicional o reducir acoplamiento.

- `src/commands/command-registry.ts`
  - Rol: composicion/registro de comandos de modulos.
  - Estado: bastante bien (ya modular).
  - Accion: mejora menor opcional -> `createCommandRegistry(...)` factory si el bootstrap crece.

- `src/index.ts`
  - Rol: bootstrap del bot + listeners globales + routing de interacciones.
  - Estado: funcional, pero mezcla bootstrap, routing y eventos.
  - Accion: refactor medio (Fase 7) -> extraer `interaction-router` / `runtime-bootstrap`.

- `src/modules/utility/help.ts`
  - Rol: comando `/help` + UI paginada + handler de botones.
  - Estado: funcional y legible, pero relativamente largo.
  - Accion: mejora menor/media si se quiere separar:
    - contenido/definicion de paginas
    - renderer del embed/componentes
    - handler de interaccion
  - No prioritario frente a `music-service.ts`.

### Grupo D - Modulo de musica (servicios/handlers) con deuda media
Requieren refactor por claridad, pero no son el cuello de botella principal.

- `src/modules/music/handlers/button-interaction-handler.ts`
  - Rol: router de botones + UX efimera + dispatch a `musicService`.
  - Estado: mezcla routing, feedback y algunas reglas de UX.
  - Accion: refactor medio (despues de `music-service.ts` o en paralelo ligero):
    - separar `button-dispatch-map`
    - helpers de respuestas efimeras
    - deteccion de casos especiales (`autoplay` progress feedback)

- `src/modules/music/services/control-message-service.ts`
  - Rol: seguimiento/edicion deduplicada del panel `Now Playing`.
  - Estado: bastante bueno; SRP razonable.
  - Accion: mantener; mejoras menores solo si se extrae `NowPlayingPanelPort` adapter.

- `src/modules/music/services/inactivity-disconnect-service.ts`
  - Rol: timers de inactividad y canal vacio.
  - Estado: aceptable/bueno; responsabilidad clara.
  - Accion: mejora menor:
    - compartir util de timeouts/env
    - opcional separar scheduler de adapters Discord/DisTube
  - No es prioridad alta.

- `src/modules/music/music-player.ts`
  - Rol: init del player, plugins, eventos de DisTube, pegamento con servicios.
  - Estado: funcional, pero concentra bootstrap + listeners + side effects.
  - Accion: refactor medio:
    - separar `registerMusicPlayerEvents(...)`
    - factories/adapters de plugins
    - dejar `initializeMusicPlayer(...)` mas corto

### Grupo E - Modulo de musica (dominio/shared) a expandir (slice faciles)
Estos archivos/zonas son la puerta de entrada para aplicar SOLID sin riesgo alto.

- `src/modules/music/domain/autoplay-title-filters.ts`
  - Rol: heuristicas puras de titulos/autoplay (extraido del monstruo).
  - Estado: buen primer paso.
  - Accion: ampliar con mas helpers puros desde `music-service.ts` (comparadores/tokenizacion/candidatos).

- `src/modules/music/services/music-service.ts` (zona de helpers puros al inicio)
  - Rol actual: contiene helpers puros mezclados con el orquestador.
  - Estado: deuda alta.
  - Accion inmediata (slices faciles):
    - extraer helpers de URL/fuente
    - extraer helpers de formateo/normalizacion
    - extraer helpers runtime/env/log truncation

### Grupo F - Objetivo principal de refactor fuerte (alta prioridad)
- `src/modules/music/services/music-service.ts`
  - Rol actual: "God service" del modulo de musica.
  - Estado: principal deuda SOLID del repo.
  - Problema:
    - mezcla estado interno, validaciones, autoplay, prefetch, resolver, playlists progresivas,
      panel, locks, errores, logs y comandos.
  - Accion: refactor por fases (Fases 1, 2, 4, 5 del plan).
  - Resultado esperado:
    - `MusicService` como fachada/orquestador
    - subservicios por responsabilidad
    - stores/adapters/factories donde aporten claridad real

### Grupo G - Inventario rapido por tamano (para priorizar esfuerzo)
Referencias de complejidad aproximada (lineas actuales):

- `src/modules/music/services/music-service.ts` (~434) -> prioridad alta
- `src/modules/music/music-player.ts` (~319) -> prioridad media
- `src/modules/utility/help.ts` (~252) -> prioridad baja/media
- `src/modules/music/services/inactivity-disconnect-service.ts` (~236) -> prioridad baja/media
- `src/modules/music/handlers/button-interaction-handler.ts` (~176) -> prioridad media
- `src/modules/music/services/control-message-service.ts` (~163) -> prioridad baja

Nota:
- "Grande" no siempre implica "malo", pero en este repo el archivo claramente problematico por SOLID es `music-service.ts`.

## 8) Estrategia general (de facil a dificil)
Orden recomendado:

1. Extraer helpers puros (bajo riesgo)
2. Extraer stores/estado interno (bajo-medio riesgo)
3. Introducir factories de composicion (bajo riesgo, alto orden)
4. Introducir adapters/puertos minimos (medio riesgo)
5. Partir `music-service.ts` por responsabilidades (alto impacto)
6. Estandarizar errores/resultados (medio)
7. Limpiar bootstrap/routing (`index.ts`) (medio)
8. Pulido transversal (nombres, duplicados, logs, docs)

## 9) Fases del refactor (plan desarrollado)
## Fase 0 - Preparacion y control de riesgo
Objetivo:
- tener baseline claro y disciplina de validacion.

Tareas:
- congelar features nuevas durante slices grandes,
- mantener smoke manual de rutas criticas,
- comparar logs cuando algo raro aparezca.

Entregable:
- baseline funcional claro + rutina de validacion.

## Fase 1 - Extraer helpers puros desde `music-service.ts`
Objetivo:
- reducir tamano y complejidad cognitiva sin tocar logica de negocio.

Tipo de funciones a extraer:
- normalizacion de titulos
- tokenizacion
- filtros de autoplay
- comparadores puros
- helpers de env/parseo sin estado

Ejemplos de destinos:
- `src/modules/music/domain/autoplay-title-filters.ts`
- `src/modules/music/domain/autoplay-candidate-utils.ts`
- `src/modules/music/shared/runtime-utils.ts`

Riesgo:
- bajo (si las firmas se mantienen iguales)

Validacion:
- `typecheck`, `build`
- autoplay + skip + back

## Fase 2 - Extraer stores/servicios de estado interno
Objetivo:
- sacar de `music-service.ts` estructuras de estado en memoria y su lifecycle.

Candidatos:
- `GuildActionLockService`
- `AutoplayPrefetchStore`
- `AutoplayRecentHistoryStore`
- `ProgressivePlaylistLoadStore`

Beneficio:
- `music-service.ts` deja de administrar Maps y timers directamente.

Riesgo:
- bajo/medio (mas interaccion entre partes)

## Fase 3 - Factories de modulo y bootstrap
Objetivo:
- ordenar la composicion de dependencias del repo.

Factories recomendadas:
- `createMusicModule(...)`
- `createUtilityModule(...)`
- `createCommandRegistry(...)`
- `createDiscordRuntime(...)` (o `bootstrapRuntime`)

Beneficio:
- bootstrap mas limpio
- patron consistente en todo el repo

Riesgo:
- bajo si no se altera comportamiento

## Fase 4 - Adapters/Puertos minimos (Dependency Inversion pragmatica)
Objetivo:
- reducir acoplamiento directo a `DisTube`/`discord.js` en la logica de negocio.

Puertos minimos (solo si aportan valor):
- `MusicPlayerPort`
- `TrackResolverPort` (yt-dlp / spotify->youtube fallback)
- `NowPlayingPanelPort`
- `InactivityPort`

Adapters:
- `distube-player-adapter.ts`
- `ytdlp-resolver-adapter.ts`
- `control-message-panel-adapter.ts`

Riesgo:
- medio (interfaz mal definida = ruido)

Regla:
- introducir contratos pequenos y en puntos de alto acoplamiento real.

## Fase 5 - Particion grande de `music-service.ts`
Objetivo:
- convertir `music-service.ts` en una fachada/orquestador.

Division objetivo (incremental, no de una sola vez):
- `music-voice-guard-service.ts` (validaciones de voz/permisos/contexto)
- `music-queue-command-service.ts` (pause/resume/skip/back/stop/clear/quit/loop/seek/volume)
- `autoplay-service.ts` (prefetch, seleccion, continuation, restauracion de estado)
- `playlist-progressive-load-service.ts`
- `music-query-resolver-service.ts` (yt-dlp/spotify fallback)
- `music-panel-sync-service.ts` (si sigue siendo necesario)

Estado final deseado:
- `music-service.ts` orquesta,
- subservicios ejecutan logica especifica.

Riesgo:
- alto (aqui se puede romper comportamiento si se mezcla mucho)

Regla:
- mover por slices funcionales (ej. autoplay primero, luego queue commands).

## Fase 6 - Errores y resultados consistentes
Objetivo:
- reducir `try/catch` repetidos y mensajes inconsistentes.

Acciones:
- estandarizar errores de usuario vs internos
- centralizar mapeo a mensajes amigables
- revisar logs de error para diagnostico

Riesgo:
- medio

## Fase 7 - Limpieza de `index.ts` y routing
Objetivo:
- dejar bootstrap y routing mas legibles.

Extraer:
- `interaction-router.ts`
- `guild-welcome-service.ts` / handler dedicado
- `runtime-bootstrap.ts`

Riesgo:
- medio

## Fase 8 - Pulido transversal
Objetivo:
- consistencia de nombres, logs, mensajes y duplicados.

Checklist:
- nombres consistentes de funciones
- remover helpers duplicados
- revisar logs redundantes
- revisar mensajes visibles y tildes

## Fase 9 - Documentacion final alineada
Objetivo:
- que `docs/GUIA-HISTORICA.md` explique con precision la nueva estructura.

Debe incluir:
- mapa de carpetas actualizado
- responsabilidades por archivo
- flujo slash/button -> services -> player -> UI
- glosario de terminos
- "que es nuestro" vs "que hace la libreria"

## 10) Slices iniciales recomendados (orden de ejecucion)
### Slice A (primer movimiento recomendado)
Objetivo:
- extraer helpers puros de autoplay/titulos desde `music-service.ts`

Incluye:
- normalizacion de titulos
- filtros de autoplay
- comparadores puros faciles

No incluye:
- cambios de comportamiento
- cambios de `MusicService` state

### Slice B
Objetivo:
- extraer estado de locks por guild a un servicio dedicado

### Slice C
Objetivo:
- extraer `AutoplayPrefetchStore` y `AutoplayRecentHistoryStore`

### Slice D
Objetivo:
- extraer `AutoplayService` completo (primera gran victoria contra el archivo gigante)

## 11) Criterios para decidir si algo va a Factory
Usa Factory si:
- crea una instancia con dependencias/config
- compone varias piezas
- encapsula decisiones de construccion
- simplifica bootstrap o reduce imports dispersos

No uses Factory si:
- es una funcion pura
- solo envuelve una linea sin valor
- complica mas de lo que ordena

## 12) Criterios para decidir si algo va a una interfaz/puerto
Crea puerto si:
- hay alto acoplamiento a una libreria externa
- quieres probar/refactorizar la logica sin esa libreria
- existe mas de una implementacion plausible

No lo crees si:
- solo hay una implementacion estable y simple
- la abstraccion no reduce complejidad real

## 13) Definition of Done del refactor (por fase y final)
### Por fase
- `npm run typecheck` en verde
- `npm run build` en verde
- smoke manual de rutas afectadas
- documentacion actualizada si cambio la estructura

### Final (objetivo de calidad)
- `music-service.ts` reducido de forma sustancial
- responsabilidades separadas en servicios chicos
- bootstrap mas limpio y composicion clara
- factories donde aportan valor real
- codigo propio de TrufaBot entendible para junior con `docs/GUIA-HISTORICA.md`

## 14) Reglas de commit (recomendadas)
Un commit por slice/avance logico:
- `refactor(music): extract autoplay title filters`
- `refactor(music): extract guild action lock service`
- `refactor(music): split autoplay prefetch state store`

Evitar commits mezcla:
- refactor + feature + docs + bugfix no relacionados

## 15) Nota final (criterio de exito)
El exito de este refactor no es "tener mas archivos".

El exito es que:
- el codigo propio se entienda mejor,
- los bugs se diagnostiquen mas rapido,
- y futuros cambios no obliguen a tocar siempre `music-service.ts`.

## 16) Progreso ejecutado (estado real)
### Splits ya realizados
- `src/modules/music/services/music-service.ts`
  - extraido bloque de resolucion/playlist progresiva a `src/modules/music/services/music-source-service.ts`
- `src/modules/music/services/autoplay-service.ts`
  - extraido historial/atribucion a `src/modules/music/services/autoplay-history-service.ts`
  - extraido resolucion/seleccion de candidatos a `src/modules/music/services/autoplay-candidate-resolver-service.ts`
- `src/modules/music/domain/`
  - helpers puros de filtros y URLs separados (`autoplay-title-filters`, `source-url-utils`)
- `src/modules/music/shared/`
  - helpers puros de runtime y formato (`runtime-utils`, `music-command-utils`)

### Objetivo de tamano (<= 1000 lineas por archivo) - estado actual
- `src/modules/music/services/music-service.ts` -> `434`
- `src/modules/music/services/autoplay-service.ts` -> `263`
- `src/modules/music/services/music-source-service.ts` -> `152`
- resto de archivos `src/` y `scripts/` -> por debajo de `500` lineas

### Verificacion ejecutada tras los splits
- `npm run typecheck` ✅
- `npm run build` ✅

### Pendiente (siguientes slices recomendados)
- aplicar factories de composicion donde aporten valor (bootstrap/modulos/servicios)
- seguir reduciendo acoplamiento directo a librerias externas con puertos/adapters minimos
- limpiar imports/helpers residuales y documentar la nueva estructura en `docs/GUIA-HISTORICA.md`
