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

## 3) Crear estructura de carpetas base
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
- [ ] Carpeta `src/core/` creada.
- [ ] Carpeta `src/modules/` creada.
- [ ] Carpeta `src/infrastructure/` creada.
- [ ] Carpeta `src/shared/` creada.
- [ ] Carpeta `scripts/` creada.
- [ ] Carpeta `tests/` creada.

## 4) Variables de entorno
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
- [ ] `.gitignore` creado.
- [ ] `.gitignore` incluye `.env`.

## 5) Servicios locales opcionales (recomendado)
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

## 6) Preparar slash commands
Checklist manual:

1. Definir comandos slash en codigo (`/ping`, `/help`, `/play`, etc.).
2. Crear script de registro de comandos (por ejemplo `scripts/register-commands.ts`).
3. Registrar en guild de pruebas primero (mas rapido que global).
4. Cada vez que cambies schema de comandos, volver a registrar.

Script sugerido en `package.json`:
```json
{
  "scripts": {
    "commands:register": "tsx scripts/register-commands.ts"
  }
}
```

Comando de registro:
```powershell
npm run commands:register
```

Que hace el comando:
- Ejecuta el script de registro para publicar/actualizar slash commands en Discord.

Checklist (estado actual):
- [ ] Comandos slash definidos en codigo.
- [ ] `scripts/register-commands.ts` creado.
- [ ] Script `commands:register` en `package.json`.
- [ ] Comandos registrados en guild de prueba.

## 7) Ejecutar local y validar
1. Inicia bot:
```powershell
npm run dev
```

Que hace el comando:
- Inicia el proceso del bot en modo desarrollo usando `tsx`.

2. Verifica en Discord:
- `/ping` responde.
- `/help` lista comandos.
- `/play <texto o url>` entra al canal de voz y reproduce.
- Botones (`pause/resume/skip/stop`) funcionan.

3. Pruebas de estabilidad basica:
- Ejecutar `play` y `skip` rapido varias veces.
- Probar 2 guilds distintos para validar estado aislado.
- Simular error (URL invalida) y validar mensaje controlado.

Checklist (estado actual):
- [x] Script `npm run dev` disponible en `package.json`.
- [ ] Implementacion funcional en `src/index.ts`.
- [ ] Validacion en Discord de `/ping` y `/help`.
- [ ] Validacion de flujo `/play` y botones.

## 8) Preparar modo Lavalink (cuando quieras migrar)
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

## 9) Comandos del bot: que hace cada uno
Comandos base de plataforma:
- `/ping`: prueba de vida del bot y latencia basica.
- `/help`: lista comandos activos y descripcion corta de uso.
- `/config`: ajusta configuracion por guild (roles, modulos, defaults).
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

Comportamiento esperado con botones:
- `pause/resume`: mismo efecto que slash command equivalente.
- `skip`, `back`, `stop`, `vol up/down`: accion inmediata sobre la sesion actual.
- Si usuario no esta en canal de voz valido, debe devolver error controlado.

Checklist (estado actual):
- [ ] Comandos base implementados.
- [ ] Comandos de musica implementados.
- [ ] Botones implementados.

## 10) Problemas comunes (manual fix)
- `Missing Access` al registrar comandos:
  - Revisa `CLIENT_ID`, scopes y permisos de la invitacion.
- Bot no aparece en slash:
  - Re-registra comandos en guild de pruebas.
- No entra a voz:
  - Permisos `Connect` y `Speak` en el canal.
- Reproduccion falla:
  - Verifica `ffmpeg -version` y librerias del proveedor.
- Token invalido:
  - Regenera token en Developer Portal y actualiza `.env`.

---
Con este flujo manual dejas TrufaBot listo para construir modulos de forma segura y escalable.
