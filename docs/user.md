# USER.md - Setup manual de TrufaBot

## Objetivo

Dejar el proyecto listo para desarrollo local con arquitectura modular, musica funcional y base para migrar a Lavalink.

## 0) Prerrequisitos (manual) 🎫✅

Instala esto antes de empezar:

- Node.js 20 LTS o superior
- npm 10+
- Git
- FFmpeg (obligatorio para audio)
- Docker Desktop (recomendado para Postgres/Redis/Lavalink)

Verifica en PowerShell:

```powershell
node -v
npm -v
git --version
ffmpeg -version
docker --version
```

Que hace cada comando:

- `node -v`: muestra la version instalada de Node.
- `npm -v`: muestra la version instalada de npm.
- `git --version`: confirma que Git esta disponible.
- `ffmpeg -version`: confirma que FFmpeg esta instalado y en PATH.
- `docker --version`: confirma que Docker CLI esta instalada.

Checklist (estado actual):

- [x] Node y npm disponibles.
- [x] Git disponible.
- [x] FFmpeg instalado.
- [x] Docker instalado (aunque por ahora no se usa).

## 1) Crear app del bot en Discord (manual) 🎫✅

1. Entra a https://discord.com/developers/applications
2. Click en `New Application` y pon nombre: `TrufaBot`.
3. En `Bot`:

- `Reset Token` y guarda el token.
- Activa intents:
  - `SERVER MEMBERS INTENT` (si lo vas a usar)
  - `MESSAGE CONTENT INTENT` (solo si realmente lo necesitas)
  - `GUILD PRESENCE INTENT` (normalmente no necesario)

4. En `OAuth2 > URL Generator`:

- Scopes: `bot`, `applications.commands`
- Permisos minimos: `Send Messages`, `Embed Links`, `Connect`, `Speak`, `Use Voice Activity`, `Read Message History`

5. Abre la URL generada e invita el bot a tu servidor de pruebas.

Checklist (estado actual):

- [x] Aplicacion creada en Discord.
- [x] Nombre, foto y banner configurados.
- [x] Bot unido al servidor con permisos de admin.

## 2) Inicializar el proyecto Node + TypeScript 🎫✅

Desde la carpeta del repo (`e:\Dev\01- GitHub\TrufaBot`):

```powershell
npm init -y
npm pkg set type=module
npm i discord.js @discordjs/voice dotenv zod pino
npm i distube @distube/yt-dlp @distube/spotify
npm i -D typescript tsx @types/node eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier rimraf
npx tsc --init
```

Que hace cada comando:

- `npm init -y`: crea `package.json` con valores por defecto.
- `npm pkg set type=module`: define ESM en Node (`import/export` nativo).
- `npm i discord.js @discordjs/voice dotenv zod pino`:
  - `discord.js`: cliente principal del bot.
  - `@discordjs/voice`: conexion y reproduccion en canales de voz.
  - `dotenv`: carga variables de `.env`.
  - `zod`: valida configuracion y payloads.
  - `pino`: logging estructurado.
- `npm i distube @distube/yt-dlp @distube/spotify`:
  - `distube`: capa de reproduccion de musica.
  - `@distube/yt-dlp`: backend de extraccion de audio en YouTube.
  - `@distube/spotify`: importador de metadata desde Spotify.
- `npm i -D ...`: instala dependencias solo de desarrollo:
  - `typescript`, `tsx`, `@types/node`: compilacion y tipado.
  - `eslint`, `@typescript-eslint/*`, `prettier`: calidad de codigo.
  - `rimraf`: borrado cross-platform de carpetas generadas.
- `npx tsc --init`: genera `tsconfig.json` base.

Configura scripts basicos:

```powershell
npm pkg set scripts.dev="tsx src/index.ts"
npm pkg set scripts.build="tsc -p tsconfig.json"
npm pkg set scripts.start="node dist/index.js"
npm pkg set scripts.typecheck="tsc --noEmit"
npm pkg set scripts.lint="eslint ."
```

Que hace cada comando:

- `scripts.dev`: ejecuta el bot en TS sin compilar manualmente.
- `scripts.build`: transpila TS a JS en `dist/`.
- `scripts.start`: ejecuta build productivo desde `dist/`.
- `scripts.typecheck`: valida tipos sin generar archivos.
- `scripts.lint`: revisa reglas de estilo y problemas estaticos.

Checklist (estado actual):

- [x] `package.json` creado.
- [x] Dependencias de runtime instaladas.
- [x] Dependencias de desarrollo instaladas.
- [x] `tsconfig.json` creado.
- [x] Script `dev` configurado.
- [x] Script `build` configurado.
- [x] Script `start` configurado.
- [x] Script `typecheck` configurado.
- [x] Script `lint` configurado.

## 3) Crear estructura de carpetas base 🎫✅

Crea la estructura definida en `docs/discord-music-bot-architecture.md`.
Minimo para arrancar:

```text
src/
  index.ts
  core/
  modules/
    music/
    utility/
    admin/
  infrastructure/
  shared/
scripts/
tests/
```

Que representa cada carpeta:

- `src/core`: contratos e infraestructura transversal.
- `src/modules`: modulos funcionales aislados (music, utility, admin).
- `src/infrastructure`: integraciones externas (Discord, DB, cache).
- `src/shared`: utilidades compartidas.
- `scripts`: tareas operativas (ej: registrar slash commands).
- `tests`: pruebas unitarias/integracion/e2e.

Checklist (estado actual):

- [x] Carpeta `src/` creada.
- [x] Archivo `src/index.ts` creado.
- [x] Carpeta `src/core/` creada.
- [x] Carpeta `src/modules/` creada.
- [x] Carpeta `src/infrastructure/` creada.
- [x] Carpeta `src/shared/` creada.
- [x] Carpeta `scripts/` creada.
- [x] Carpeta `tests/` creada.

## 4) Variables de entorno 🎫✅

Crea `.env` en la raiz:

```env
DISCORD_TOKEN=pega_aqui_token_bot
CLIENT_ID=pega_aqui_application_client_id
GUILD_IDS=123456789012345678
MUSIC_ADAPTER=distube
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/trufabot
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
METRICS_ENABLED=false
```

Importante:

- Los valores de ejemplo (`pega_aqui_...`) son solo placeholders.
- Antes de correr el bot, reemplaza esos valores por los reales.

De donde sacar cada valor real:

- `DISCORD_TOKEN`: Discord Developer Portal > tu app > `Bot` > `Reset Token` / `Copy`.
- `CLIENT_ID`: Discord Developer Portal > tu app > `General Information` > `Application ID`.
- `GUILD_IDS`: activa Developer Mode en Discord, click derecho en tu servidor > `Copy Server ID`.

Que hace cada variable:

- `DISCORD_TOKEN`: credencial del bot para conectarse al gateway.
- `CLIENT_ID`: Application ID usado para registrar comandos slash.
- `GUILD_IDS`: guild(s) donde registrar comandos de prueba.
- `MUSIC_ADAPTER`: selecciona backend de musica (`distube` o `lavalink`).
- `DATABASE_URL`: conexion a PostgreSQL.
- `REDIS_URL`: conexion a Redis.
- `LOG_LEVEL`: nivel de logs (`debug`, `info`, `warn`, `error`).
- `METRICS_ENABLED`: activa/exporta metricas de observabilidad.

Reglas:

- No subir `.env` al repositorio.
- Agregar `.env` a `.gitignore`.

Checklist (estado actual):

- [x] Archivo `.env` creado.
- [x] Variables minimas definidas en `.env`.
- [x] Valores reales pegados en `DISCORD_TOKEN`, `CLIENT_ID` y `GUILD_IDS`.
- [x] `.gitignore` creado.
- [x] `.gitignore` incluye `.env`.

## 5) Preparar slash commands (arquitectura escalable)

Este paso es clave para que aparezcan `/ping`, `/help`, `/uptime` y para no repetir logica cuando agregues comandos nuevos.

### 5.1 Estructura actual de comandos

Carpeta actual:

- `src/modules/commands/`

Archivos actuales:

- `src/modules/commands/command.ts`
- `src/modules/commands/command-registry.ts`
- `src/modules/commands/ping.ts`
- `src/modules/commands/help.ts`
- `src/modules/commands/uptime.ts`

Que hace cada archivo:

- `command.ts`: define el tipo `AppCommand` (contrato comun de todos los comandos).
- `command-registry.ts`: fuente unica de verdad de comandos.
- `ping.ts`, `help.ts`, `uptime.ts`: implementan cada comando y exportan su objeto `AppCommand`.

### 5.2 Contrato comun de comando (`command.ts`)

El tipo `AppCommand` obliga a que cada comando tenga:

- `name`: nombre del slash command.
- `data`: `SlashCommandBuilder` para registro.
- `execute(interaction)`: handler de ejecucion.

Beneficio:

- Todos los comandos tienen la misma forma.
- Menos errores al escalar.

### 5.3 Registro central (`command-registry.ts`)

Este archivo centraliza todo:

1. `commandList`: lista unica de comandos.
2. Validacion de nombres duplicados (error temprano si repites nombre).
3. `commandMap`: mapa para ejecutar comandos en runtime.
4. `commandJson`: array serializado para registrar en Discord.

Beneficio:

- Ya no duplicas lista de comandos en `index.ts` y `register-commands.ts`.

### 5.4 Implementacion de cada comando (`ping/help/uptime`)

Patron que sigue cada archivo:

1. Funcion de negocio (`handlePing`, `handleHelp`, `handleUptime`).
2. Objeto exportado `XCommand: AppCommand` con:
   - `name`
   - `data` con `SlashCommandBuilder`
   - `execute` apuntando al handler

Ejemplo real aplicado:

- `ping.ts`: mide latencia WS y HTTP con fallback seguro.
- `help.ts`: responde lista de comandos en modo efimero.
- `uptime.ts`: calcula y formatea tiempo encendido, respuesta efimera.

### 5.5 Script de registro (`scripts/register-commands.ts`)

Flujo actual del script:

1. Cargar `.env` (`DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_IDS`).
2. Validar variables requeridas.
3. Parsear `GUILD_IDS` (uno o varios, separados por coma).
4. Importar `commandJson` desde `command-registry.ts`.
5. Registrar en cada guild con `Routes.applicationGuildCommands`.

Comando:

```powershell
npm run commands:register
```

Que hace:

- Publica/actualiza todos los comandos del registry.
- Reemplaza el set de comandos del bot en cada guild configurado.

### 5.6 Runtime (`src/index.ts`)

Flujo actual de ejecucion:

1. Recibe interacciones.
2. Filtra solo `ChatInputCommand`.
3. Busca el comando en `commandMap` por `interaction.commandName`.
4. Si existe, ejecuta `command.execute(interaction)`.
5. Si no existe, responde `Comando no implementado.`

Beneficio:

- Router automatico por mapa.
- No hay `if`/`switch` repetitivos por cada comando nuevo.

### 5.7 Verificar en Discord

1. Correr `npm run commands:register`.
2. Levantar bot con `npm run dev`.
3. En Discord escribir `/` y confirmar:
   - `/ping`
   - `/help`
   - `/uptime`
4. Ejecutar los tres y validar respuesta.

Si cambias nombre/opciones/descripcion:

- vuelve a correr `npm run commands:register`.

### 5.8 Guild vs Global (para no perder tiempo)

- `Guild commands`: casi instantaneo (ideal para desarrollo).
- `Global commands`: propagacion mas lenta.

Checklist (estado actual):

- [x] `src/modules/commands/command.ts` creado.
- [x] `src/modules/commands/command-registry.ts` creado.
- [x] `/ping` implementado como `AppCommand`.
- [x] `/help` implementado como `AppCommand`.
- [x] `/uptime` implementado como `AppCommand`.
- [x] `scripts/register-commands.ts` usa `commandJson`.
- [x] `src/index.ts` usa `commandMap`.
- [x] Script `commands:register` existe en `package.json`.
- [ ] Validacion funcional manual de `/ping`, `/help`, `/uptime` en Discord (post-refactor).

## 6) Ejecutar y validar estado actual 🎫✅

Estado actual:
- `/ping` ya fue definido, registrado y probado.

Flujo usado:

1. Registrar comandos:

```powershell
npm run commands:register
```

2. Levantar bot:

```powershell
npm run dev
```

3. Validar en Discord:

- `/ping` aparece en el selector de slash commands.
- `/ping` responde con latencia (`WS` y `HTTP`).

Como confirmar token valido:

- En consola no aparece `Invalid token`.
- El bot queda online y responde interacciones.

Checklist (estado actual):

- [x] Script `npm run dev` disponible en `package.json`.
- [x] Implementacion funcional en `src/index.ts`.
- [x] `npm run commands:register` ejecutado sin error.
- [x] Token validado (bot inicia sesion sin error de autenticacion).
- [x] Validacion en Discord de `/ping`.

## 7) Definir siguientes comandos (desde arquitectura centralizada)

Este punto parte del estado actual con `command.ts` + `command-registry.ts`.

### 7.1 Regla de oro al agregar un comando nuevo

Para agregar `/algo`:

1. Crear `src/modules/commands/algo.ts`.
2. Exportar `algoCommand: AppCommand`.
3. Importar y agregar `algoCommand` en `src/modules/commands/command-registry.ts`.
4. Ejecutar `npm run commands:register`.
5. Probar en Discord.

Importante:

- No deberias tocar `src/index.ts` para cada comando nuevo.
- No deberias construir manualmente arrays de comandos en `register-commands.ts`.

### 7.2 Plantilla recomendada de comando

Estructura recomendada por archivo:

1. imports (`SlashCommandBuilder`, `AppCommand`, tipos de interaction).
2. funcion helper opcional (si necesitas logica extra).
3. handler `async` con la respuesta.
4. export `XCommand: AppCommand` con `name`, `data`, `execute`.

### 7.3 Siguiente foco funcional real

Orden recomendado:

1. Mantener estables `/ping`, `/help`, `/uptime` (smoke tests rapidos).
2. Empezar modulo musica con `/play`.
3. Continuar `/pause`, `/resume`, `/skip`, `/queue`, `/stop`.
4. Cerrar cada comando con prueba manual en Discord.

### 7.4 Checklist operativo por cada comando nuevo

- [ ] Archivo nuevo en `src/modules/commands/`.
- [ ] Exporta `XCommand: AppCommand`.
- [ ] Agregado a `command-registry.ts`.
- [ ] `npm run typecheck` sin errores.
- [ ] `npm run commands:register` sin errores.
- [ ] `npm run dev` ejecutando.
- [ ] Prueba funcional en Discord.

### 7.5 Hitos futuros (orden recomendado)

1. Implementar `/play` con cola minima.
2. Definir estructura del modulo de musica (servicios, estado por guild, validaciones).
3. Implementar `/pause`, `/resume`, `/skip`.
4. Implementar `/queue`, `/stop`.
5. Reforzar pruebas funcionales por cada comando agregado.

## Apendice A (Opcional) - Migracion a Lavalink

1. Mantener `MUSIC_ADAPTER=distube` para desarrollo inicial.
2. Implementar `lavalink-adapter.ts` respetando el contrato `MusicAdapter`.
3. Levantar Lavalink en Docker (staging/local).
4. Cambiar variable:

```env
MUSIC_ADAPTER=lavalink
```

5. Repetir pruebas de contrato y flujo funcional.

Checklist (estado actual):

- [x] Variable `MUSIC_ADAPTER` existente en `.env`.
- [ ] `lavalink-adapter.ts` implementado.
- [ ] Entorno Lavalink levantado.
- [ ] Pruebas de contrato ejecutadas en Lavalink.

## Apendice B (Opcional) - Manual Fix / Troubleshooting

- `Missing Access` al registrar comandos:
  - Revisa `CLIENT_ID`, scopes y permisos de la invitacion.
  - Verifica que `GUILD_IDS` sea un servidor donde el bot realmente esta.
- Bot no aparece en slash:
  - Re-registra comandos en guild de pruebas.
- No entra a voz:
  - Permisos `Connect` y `Speak` en el canal.
- Reproduccion falla:
  - Verifica `ffmpeg -version` y librerias del proveedor.
- Token invalido:
  - Regenera token en Developer Portal y actualiza `.env`.

## Apendice C (Opcional) - Servicios locales (Docker/Postgres/Redis)

Si quieres setup completo desde el inicio, levanta Postgres + Redis con Docker.

### Opcion A: comandos sueltos

```powershell
docker run -d --name trufa-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=trufabot -p 5432:5432 postgres:16
docker run -d --name trufa-redis -p 6379:6379 redis:7
```

Que hace cada comando:

- `docker run -d ... postgres:16`:
  - `-d`: ejecuta contenedor en segundo plano.
  - `--name trufa-postgres`: nombre del contenedor.
  - `-e POSTGRES_PASSWORD=postgres`: password del usuario `postgres`.
  - `-e POSTGRES_DB=trufabot`: crea DB inicial `trufabot`.
  - `-p 5432:5432`: expone puerto local 5432.
  - `postgres:16`: imagen/version usada.
- `docker run -d --name trufa-redis -p 6379:6379 redis:7`:
  - crea Redis local en segundo plano, puerto 6379.

### Opcion B: docker-compose

Crea `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: trufabot
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

Levantar:

```powershell
docker compose up -d
```

Que hace el comando:

- `docker compose up -d`: crea y levanta todos los servicios del compose en background.

Checklist (estado actual):

- [x] Docker instalado localmente.
- [ ] `docker-compose.yml` creado.
- [ ] Postgres levantado.
- [ ] Redis levantado.
- [x] Aplazado por ahora (no bloquea el MVP inicial).

## Apendice D (Opcional) - Catalogo objetivo de comandos

Comandos base de plataforma:

- `/ping`: prueba de vida del bot y latencia basica.
- `/help`: lista comandos activos y descripcion corta de uso.
- `/uptime`: muestra tiempo activo desde ultimo arranque.

Comandos de musica:

- `/play <query|url>`:
  - si no hay reproduccion activa, conecta a voz y empieza.
  - si ya hay reproduccion, agrega al final de la cola.
  - acepta busqueda de texto, URL de YouTube o Spotify (importa metadata).
- `/pause`: pausa pista actual sin vaciar cola.
- `/resume`: reanuda pista pausada.
- `/skip`: salta a la siguiente pista de la cola.
- `/back`: vuelve a la pista anterior (si hay historial).
- `/loop`: alterna modo de bucle (`off`, `track`, `queue`).
- `/rewind`: retrocede segundos de la pista actual (segun implementacion).
- `/replay`: reinicia la pista actual desde 00:00.
- `/volume`: cambia volumen del reproductor del guild.
- `/queue`: muestra la cola y la pista actual.
- `/stop`: detiene reproduccion y limpia cola (segun politica definida).

Con este flujo manual dejas TrufaBot listo para construir modulos de forma segura y escalable.
