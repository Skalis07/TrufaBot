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

## 5) Preparar slash commands

Este paso es clave para que aparezcan `/ping`, `/help`, `/uptime` en tu servidor.

### 5.1 Definir comandos en codigo

Crea la definicion del slash command y su handler.
Archivo actual: `src/modules/utility/application/commands/ping.ts`.

Que ya hiciste en este archivo:

- `pingCommand` con `new SlashCommandBuilder()`.
- `setName('ping')` y `setDescription(...)` para registrar `/ping`.
- `handlePing(interaction)` como funcion de ejecucion.
- Medicion de `wsPing` usando `interaction.client.ws.ping`.
- Respuesta inicial con:
  - `interaction.reply({ content: 'Pinging...', withResponse: true })`
- Calculo de `httpPing` cuando hay `response.resource?.message`.
- Fallback seguro si `message` no viene en la respuesta.
- `interaction.editReply(...)` para mostrar resultado final (`WS` y `HTTP`).

Nota tecnica importante:
- En una interaccion solo puedes responder una vez con `reply()`.
- Por eso la respuesta final se hace con `editReply()`.

### 5.2 Crear script de registro

Archivo actual: `scripts/register-commands.ts`.
Este script publica comandos con `REST` + `Routes`.

Flujo del script:

1. Cargar `.env` (`DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_IDS`).
2. Validar que las 3 variables existan (si no, lanza error).
3. Parsear `GUILD_IDS` (acepta varios IDs separados por coma).
4. Construir `commands` con `pingCommand.toJSON()`.
5. Crear cliente REST autenticado.
6. Registrar en cada guild con `Routes.applicationGuildCommands`.
7. Mostrar log de exito o error.

Nota tecnica:
- El import usa `.js` aunque los archivos sean `.ts` por ESM + `nodenext`.

### 5.3 Agregar script en package.json

Ya agregado en `package.json`:

```json
{
  "scripts": {
    "commands:register": "tsx scripts/register-commands.ts"
  }
}
```

### 5.4 Ejecutar registro

```powershell
npm run commands:register
```

Que hace el comando:

- Ejecuta el script de registro para publicar/actualizar slash commands en Discord.
- Reemplaza el set de comandos del bot en el/los guild(s) indicados.

### 5.5 Verificar en Discord

1. Espera unos segundos despues de registrar.
2. Escribe `/` en tu servidor.
3. Confirma que aparece `/ping`.
4. Ejecuta `/ping` y valida que responda algo como:
   - `Pong! WS: ...ms | HTTP: ...ms`

Si cambias nombre/opciones/descripcion de comandos:
- vuelve a correr `npm run commands:register`.

### 5.6 Guild vs Global (para no perder tiempo)

- `Guild commands`: se reflejan casi al instante (ideal para desarrollo).
- `Global commands`: pueden tardar bastante en propagarse.

Checklist (estado actual):

- [x] Comando `/ping` definido en `src/modules/utility/application/commands/ping.ts`.
- [x] Handler `handlePing` implementado (latencia WS + HTTP + fallback).
- [x] `scripts/register-commands.ts` creado.
- [x] Script `commands:register` en `package.json`.
- [x] `npm run commands:register` ejecutado sin error.
- [x] `/ping` visible y funcional en Discord.

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

## 7) Definir siguientes comandos (detalle completo)

Este punto continua exactamente desde donde quedaste con `/ping`.

### 7.1 Siguiente comando recomendado: `/help`

Archivo sugerido:
- `src/modules/utility/application/commands/help.ts`

Contenido recomendado:
- `helpCommand` con `SlashCommandBuilder`.
- `setName('help')`.
- `setDescription('Lista comandos disponibles')`.
- `handleHelp(interaction)` que responda lista corta de comandos.

Ejemplo de respuesta inicial:
- `/ping`
- `/help`
- `/uptime`

### 7.2 Comando `/uptime`

Archivo sugerido:
- `src/modules/utility/application/commands/uptime.ts`

Necesitas:
- una referencia de tiempo de arranque (`startedAt`) en `src/index.ts` o en modulo separado.
- `uptimeCommand` con builder.
- `handleUptime(interaction)` que calcule `Date.now() - startedAt`.

Salida sugerida:
- `Uptime: 12m 34s`

### 7.3 Registrar nuevos comandos

Archivo:
- `scripts/register-commands.ts`

Cambios:
1. importar `helpCommand`, `uptimeCommand`.
2. ampliar array `commands`:
   - `[pingCommand.toJSON(), helpCommand.toJSON(), uptimeCommand.toJSON()]`
3. ejecutar de nuevo:

```powershell
npm run commands:register
```

### 7.4 Enrutar nuevos handlers en runtime

Archivo:
- `src/index.ts`

Cambios:
1. importar `handleHelp`, `handleUptime`.
2. en `InteractionCreate`, agregar ramas por `interaction.commandName`:
   - `help` -> `await handleHelp(interaction)`
   - `uptime` -> `await handleUptime(interaction)`
3. mantener fallback `Comando no implementado`.

### 7.5 Ciclo correcto cada vez que agregas comando

1. Definir comando (`builder + handler`).
2. Registrar comando (`npm run commands:register`).
3. Levantar/reiniciar bot (`npm run dev`).
4. Probar en Discord.
5. Si falla, revisar apendice de troubleshooting.

Checklist (estado actual):

- [x] `/ping` implementado y validado.
- [ ] `/help` implementado.
- [ ] `/uptime` implementado.
- [ ] Nuevos comandos registrados con `commands:register`.
- [ ] Nuevos handlers enrutados en `src/index.ts`.
- [ ] Pruebas funcionales completadas en Discord.
- [ ] `/help` validado en Discord.

### 7.6 Hitos futuros (orden recomendado)

1. Centralizar mapa de handlers (router automatico por modulos).
2. Pasar `register-commands.ts` a fuente unica de comandos por modulo (mismo origen que runtime).
3. Arrancar modulo de musica: primero `/play` y cola minima.
4. Continuar con `/pause`, `/resume`, `/skip`, `/queue`, `/stop`.
5. Reforzar pruebas funcionales despues de cada comando agregado.

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
