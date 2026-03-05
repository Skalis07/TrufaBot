/**
 * @file src/modules/music/commands/index.ts
 * @description Agrupa y exporta todos los comandos slash del modulo de musica para su registro unificado.
 */
import type { AppCommand } from '../../../commands/command.js';
import { autoplayCommand } from './autoplay.js';
import { backCommand } from './back.js';
import { clearCommand } from './clear.js';
import { forwardCommand } from './forward.js';
import { joinCommand } from './join.js';
import { loopCommand } from './loop.js';
import { nowPlayingCommand } from './nowplaying.js';
import { pauseCommand } from './pause.js';
import { playCommand } from './play.js';
import { quitCommand } from './quit.js';
import { queueCommand } from './queue.js';
import { replayCommand } from './replay.js';
import { resumeCommand } from './resume.js';
import { rewindCommand } from './rewind.js';
import { skipCommand } from './skip.js';
import { stopCommand } from './stop.js';
import { volumeCommand } from './volume.js';

// Barrel file del modulo music:
// re-exporta slash commands y expone una lista unificada para el registry.
export {
  autoplayCommand,
  backCommand,
  clearCommand,
  forwardCommand,
  joinCommand,
  loopCommand,
  nowPlayingCommand,
  pauseCommand,
  playCommand,
  quitCommand,
  queueCommand,
  replayCommand,
  resumeCommand,
  rewindCommand,
  skipCommand,
  stopCommand,
  volumeCommand,
};

export const musicCommands: AppCommand[] = [
  joinCommand,
  playCommand,
  pauseCommand,
  resumeCommand,
  skipCommand,
  backCommand,
  autoplayCommand,
  loopCommand,
  nowPlayingCommand,
  rewindCommand,
  forwardCommand,
  replayCommand,
  queueCommand,
  clearCommand,
  volumeCommand,
  stopCommand,
  quitCommand,
];
