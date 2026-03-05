#!/usr/bin/env node
/**
 * @file scripts/ensure-function-comments.mjs
 * @description Inserta comentarios de apoyo en funciones sin comentario inmediato para mejorar legibilidad.
 *
 * Ensures each function-like symbol in source files has a nearby comment line.
 * Scope: .ts and .mjs files under src/ and scripts/ (excluding .d.ts).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const TARGET_DIRS = ['src', 'scripts'];
const SHOULD_WRITE = process.argv.includes('--write');

// Paso de soporte dentro de la orquestacion del servicio.
function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

// Paso de soporte dentro de la orquestacion del servicio.
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

// Paso de soporte dentro de la orquestacion del servicio.
async function walkSourceFiles(startDir) {
  const out = [];

  // Paso de soporte dentro de la orquestacion del servicio.
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
          continue;
        }
        await walk(full);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      const isTs = entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts');
      const isMjs = entry.name.endsWith('.mjs');
      if (!isTs && !isMjs) {
        continue;
      }
      out.push(full);
    }
  }

  await walk(startDir);
  return out;
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getNodeLine(sourceFile, node) {
  const pos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return pos.line + 1;
}

// Paso de soporte dentro de la orquestacion del servicio.
function inferComment(symbolName, kind) {
  const name = symbolName.toLowerCase();

  if (name.startsWith('is') || name.startsWith('has') || name.startsWith('can') || name.startsWith('should')) {
    return 'Evalua una condicion de control para guiar el flujo.';
  }
  if (name.startsWith('get')) {
    return 'Obtiene estado o valor derivado sin mutar el flujo principal.';
  }
  if (name.startsWith('set') || name.startsWith('toggle')) {
    return 'Actualiza estado interno de forma encapsulada.';
  }
  if (name.startsWith('create') || name.startsWith('build')) {
    return 'Construye datos o instancias requeridas para la siguiente etapa del flujo.';
  }
  if (name.startsWith('parse') || name.startsWith('normalize') || name.startsWith('extract') || name.startsWith('resolve')) {
    return 'Transforma entradas a una forma valida para el dominio.';
  }
  if (name.startsWith('schedule')) {
    return 'Programa una accion diferida para mantener consistencia operativa.';
  }
  if (name.startsWith('clear') || name.startsWith('remove') || name.startsWith('delete') || name.startsWith('invalidate')) {
    return 'Limpia estado temporal para evitar inconsistencias posteriores.';
  }
  if (name.startsWith('sync')) {
    return 'Sincroniza estado entre servicios y capa de presentacion.';
  }
  if (name.startsWith('run') || name.startsWith('handle')) {
    return 'Orquesta la ejecucion de una accion de negocio con control de errores.';
  }
  if (name.startsWith('remember') || name.startsWith('save') || name.startsWith('store')) {
    return 'Registra contexto para decisiones posteriores del flujo.';
  }
  if (name.startsWith('continue')) {
    return 'Intenta continuar el flujo automaticamente tras un evento terminal.';
  }
  if (name.startsWith('play')) {
    return 'Inicia o encola reproduccion segun el contexto activo.';
  }
  if (name.startsWith('pause')) {
    return 'Pausa reproduccion activa del contexto actual.';
  }
  if (name.startsWith('resume')) {
    return 'Reanuda reproduccion pausada manteniendo estado.';
  }
  if (name.startsWith('skip')) {
    return 'Avanza la cola y aplica fallback cuando corresponde.';
  }
  if (kind === 'object-function') {
    return 'Handler de comando/interaccion que delega la logica al servicio correspondiente.';
  }

  return 'Paso de soporte dentro de la orquestacion del servicio.';
}

// Paso de soporte dentro de la orquestacion del servicio.
function startsWithComment(trimmedLine) {
  return (
    trimmedLine.startsWith('//')
    || trimmedLine.startsWith('/*')
    || trimmedLine.startsWith('*')
    || trimmedLine.startsWith('*/')
  );
}

// Evalua una condicion de control para guiar el flujo.
function hasNearbyComment(lines, symbolLine) {
  let line = symbolLine - 1;
  while (line > 0) {
    const value = lines[line - 1];
    const trimmed = value.trim();

    if (!trimmed) {
      // permit a single empty line between comment and symbol
      line -= 1;
      const prev = line > 0 ? lines[line - 1]?.trim() ?? '' : '';
      return startsWithComment(prev);
    }

    return startsWithComment(trimmed);
  }
  return false;
}

// Paso de soporte dentro de la orquestacion del servicio.
function collectFunctionLikeNodes(sourceFile) {
  const out = [];

  // Paso de soporte dentro de la orquestacion del servicio.
  function push(kind, name, node) {
    if (!name) {
      return;
    }
    if (!node.body) {
      return;
    }
    out.push({ kind, name, node });
  }

  // Paso de soporte dentro de la orquestacion del servicio.
  function safeName(nameNode) {
    return nameNode ? nameNode.getText(sourceFile) : null;
  }

  // Paso de soporte dentro de la orquestacion del servicio.
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      push('function', node.name.text, node);
    }

    if (ts.isClassDeclaration(node)) {
      for (const member of node.members) {
        if (ts.isMethodDeclaration(member)) {
          push('method', safeName(member.name), member);
        } else if (ts.isGetAccessorDeclaration(member)) {
          push('getter', safeName(member.name), member);
        } else if (ts.isSetAccessorDeclaration(member)) {
          push('setter', safeName(member.name), member);
        }
      }
    }

    if (ts.isVariableDeclaration(node) && node.initializer) {
      const varName = node.name.getText(sourceFile);

      if (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) {
        push('function-variable', varName, node.initializer);
      }

      if (ts.isObjectLiteralExpression(node.initializer)) {
        for (const prop of node.initializer.properties) {
          if (ts.isMethodDeclaration(prop)) {
            const propName = safeName(prop.name);
            push('object-function', `${varName}.${propName}`, prop);
          } else if (ts.isPropertyAssignment(prop)) {
            const propName = safeName(prop.name);
            if (ts.isArrowFunction(prop.initializer) || ts.isFunctionExpression(prop.initializer)) {
              push('object-function', `${varName}.${propName}`, prop.initializer);
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  out.sort((a, b) => a.node.getStart(sourceFile) - b.node.getStart(sourceFile));
  return out;
}

// Paso de soporte dentro de la orquestacion del servicio.
function makeInsertions(sourceText, sourceFile) {
  const lines = sourceText.split(/\r?\n/);
  const nodes = collectFunctionLikeNodes(sourceFile);
  const insertions = [];

  for (const item of nodes) {
    const symbolLine = getNodeLine(sourceFile, item.node);
    if (hasNearbyComment(lines, symbolLine)) {
      continue;
    }

    const startPos = item.node.getStart(sourceFile);
    const lineStartPos = sourceText.lastIndexOf('\n', startPos - 1) + 1;
    const indentMatch = sourceText.slice(lineStartPos, startPos).match(/^\s*/);
    const indent = indentMatch ? indentMatch[0] : '';

    const text = `${indent}// ${inferComment(item.name, item.kind)}\n`;
    insertions.push({ pos: lineStartPos, text });
  }

  // apply from bottom to top
  insertions.sort((a, b) => b.pos - a.pos);
  return insertions;
}

// Paso de soporte dentro de la orquestacion del servicio.
function applyInsertions(text, insertions) {
  let out = text;
  for (const ins of insertions) {
    out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
  }
  return out;
}

// Paso de soporte dentro de la orquestacion del servicio.
async function main() {
  const allFiles = [];
  for (const dir of TARGET_DIRS) {
    const abs = path.join(ROOT, dir);
    if (await exists(abs)) {
      allFiles.push(...(await walkSourceFiles(abs)));
    }
  }
  allFiles.sort((a, b) => toPosix(path.relative(ROOT, a)).localeCompare(toPosix(path.relative(ROOT, b))));

  let filesTouched = 0;
  let commentsDetected = 0;

  for (const abs of allFiles) {
    const before = await fs.readFile(abs, 'utf8');
    const sourceFile = ts.createSourceFile(abs, before, ts.ScriptTarget.Latest, true);
    const insertions = makeInsertions(before, sourceFile);
    if (insertions.length === 0) {
      continue;
    }

    commentsDetected += insertions.length;
    if (SHOULD_WRITE) {
      const after = applyInsertions(before, insertions);
      await fs.writeFile(abs, after, 'utf8');
      filesTouched += 1;
    }
  }

  if (SHOULD_WRITE) {
    console.log(`Function comments ensured. Files touched: ${filesTouched}. Comments inserted: ${commentsDetected}.`);
    return;
  }

  console.log(
    `Function comments audit only. Files requiring comments: ${
      commentsDetected > 0 ? 'yes' : 'no'
    }. Missing comments detected: ${commentsDetected}. Run with --write to apply.`,
  );
}

await main();
