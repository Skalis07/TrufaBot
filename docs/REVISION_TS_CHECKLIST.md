# TS Review Checklist

- Nota: este checklist es un snapshot tecnico; los conteos de lineas pueden variar entre commits.
- Para auditoria exacta, re-ejecutar los checks y regenerar este archivo junto con `docs/function-inventory.json`.

- Scope: 66 TypeScript files (src/ + scripts/)
- Checks: tsc --noEmit --noUnusedLocals --noUnusedParameters, ts-prune, static scan (any, @ts-ignore, TODO/FIXME, console)
- Result: no unused locals/params errors; no dead-code blockers detected by ts-prune

## Largest Files (priority for future refactor)

| File | Lines |
| --- | ---: |
| `src\modules\music\services\music-service.ts` | 448 |
| `src\modules\music\services\music-source-spotify-playlist-service.ts` | 416 |
| `src\modules\music\music-player.ts` | 346 |
| `src\modules\music\services\music-source-ytdlp-service.ts` | 317 |
| `src\modules\music\services\autoplay-candidate-resolver-service.ts` | 305 |
| `src\modules\music\services\autoplay-continuation-service.ts` | 304 |
| `src\modules\music\services\inactivity-disconnect-service.ts` | 291 |
| `src\modules\music\services\music-source-youtube-playlist-service.ts` | 280 |
| `src\modules\music\services\autoplay-service.ts` | 273 |
| `src\modules\music\services\music-play-queue-command-service.ts` | 267 |
| `src\modules\utility\help.ts` | 266 |
| `src\modules\music\services\music-playback-command-service.ts` | 256 |

## Full File Checklist

| File | Lines | any | ts-ignore | TODO/FIXME | console.* | Status |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `scripts\register-commands.ts` | 42 | 0 | 0 | 0 | 1 | OK |
| `src\commands\command-registry.ts` | 22 | 0 | 0 | 0 | 0 | OK |
| `src\commands\command.ts` | 17 | 0 | 0 | 0 | 0 | OK |
| `src\index.ts` | 115 | 0 | 0 | 0 | 4 | OK |
| `src\modules\music\commands\autoplay.ts` | 29 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\back.ts` | 13 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\clear.ts` | 21 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\forward.ts` | 26 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\index.ts` | 60 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\join.ts` | 21 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\loop.ts` | 30 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\nowplaying.ts` | 14 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\pause.ts` | 13 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\play.ts` | 25 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\queue.ts` | 25 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\quit.ts` | 17 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\replay.ts` | 13 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\resume.ts` | 13 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\rewind.ts` | 26 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\run-music-slash.ts` | 50 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\skip.ts` | 13 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\stop.ts` | 13 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\commands\volume.ts` | 25 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\constants.ts` | 48 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\domain\autoplay-candidate-utils.ts` | 255 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\domain\autoplay-title-filters.ts` | 102 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\domain\source-url-utils.ts` | 92 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\errors.ts` | 8 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\handlers\button-interaction-handler.ts` | 194 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\logger.ts` | 7 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\music-player.ts` | 346 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-candidate-resolver-service.ts` | 305 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-continuation-guard-service.ts` | 251 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-continuation-service.ts` | 304 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-history-service.ts` | 161 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-prefetch-candidate-access-service.ts` | 180 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-prefetch-orchestrator-service.ts` | 224 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-prefetch-read-service.ts` | 89 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-prefetch-state-service.ts` | 53 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-progress-notice-service.ts` | 57 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-service.ts` | 273 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\autoplay-ytdlp-query-service.ts` | 206 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\control-message-service.ts` | 186 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\guild-action-lock-service.ts` | 91 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\inactivity-disconnect-service.ts` | 291 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-action-runner-service.ts` | 80 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-play-queue-command-service.ts` | 267 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-playback-command-service.ts` | 256 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-read-service.ts` | 123 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-service.ts` | 448 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-session-command-service.ts` | 179 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-source-service.ts` | 153 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-source-spotify-playlist-service.ts` | 416 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-source-spotify-service.ts` | 174 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-source-youtube-playlist-service.ts` | 280 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-source-ytdlp-service.ts` | 317 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\services\music-voice-context-service.ts` | 102 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\shared\music-command-utils.ts` | 48 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\shared\runtime-utils.ts` | 78 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\ui\control-buttons.ts` | 116 | 0 | 0 | 0 | 0 | OK |
| `src\modules\music\ui\now-playing-embed.ts` | 62 | 0 | 0 | 0 | 0 | OK |
| `src\modules\utility\help.ts` | 266 | 0 | 0 | 0 | 0 | OK |
| `src\modules\utility\index.ts` | 17 | 0 | 0 | 0 | 0 | OK |
| `src\modules\utility\ping.ts` | 53 | 0 | 0 | 0 | 0 | OK |
| `src\modules\utility\uptime.ts` | 76 | 0 | 0 | 0 | 0 | OK |
| `src\modules\utility\welcome.ts` | 94 | 0 | 0 | 0 | 0 | OK |
