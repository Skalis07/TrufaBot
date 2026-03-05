#!/usr/bin/env node
/**
 * @file scripts/generate-function-docs.mjs
 * @description Genera inventario y documentacion detallada de funciones para src/ y scripts/.
 *
 * Generates:
 * - docs/FUNCIONES_DETALLADAS.md (ultra detailed markdown)
 *
 * Scope: all .ts and .mjs files under src/ and scripts/ (excluding .d.ts)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const TARGET_DIRS = ['src', 'scripts'];
const OUT_MARKDOWN = path.join(ROOT, 'docs', 'FUNCIONES_DETALLADAS.md');

const SIDE_EFFECT_RULES = [
  { tag: 'discord_messages', test: (call) => /(reply|editReply|followUp|send|deleteReply|deleteMessage)$/i.test(call) },
  { tag: 'timers', test: (call) => /^(setTimeout|setInterval|clearTimeout|clearInterval)$/.test(call) },
  { tag: 'playback_control', test: (call) => /(play|skip|pause|resume|stop|toggleAutoplay|join|leave)$/.test(call) },
  { tag: 'state_mutation', test: (call) => /\.(set|delete|clear|remove|push|pop|shift|unshift|splice)$/.test(call) },
  { tag: 'logging', test: (call) => /(logger|musicLogger)\./.test(call) },
];

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

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getNodeEndLine(sourceFile, node) {
  const pos = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
  return pos.line + 1;
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getNodeText(sourceFile, node) {
  return sourceFile.text.slice(node.getStart(sourceFile), node.getEnd());
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getExpressionText(sourceFile, expr) {
  return expr.getText(sourceFile);
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getCallName(sourceFile, expr) {
  if (ts.isIdentifier(expr)) {
    return expr.text;
  }
  if (ts.isPropertyAccessExpression(expr)) {
    return getExpressionText(sourceFile, expr);
  }
  if (ts.isElementAccessExpression(expr)) {
    return getExpressionText(sourceFile, expr);
  }
  if (ts.isCallExpression(expr)) {
    return getCallName(sourceFile, expr.expression);
  }
  return getExpressionText(sourceFile, expr);
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getNodeParameters(sourceFile, checker, node) {
  if (!('parameters' in node) || !Array.isArray(node.parameters)) {
    return [];
  }
  return node.parameters.map((p) => ({
    name: p.name.getText(sourceFile),
    type: (() => {
      if (p.type) {
        return p.type.getText(sourceFile);
      }
      if (checker) {
        const inferred = checker.getTypeAtLocation(p);
        const rendered = checker.typeToString(inferred);
        if (rendered && rendered !== 'any') {
          return rendered;
        }
      }
      return 'inferido';
    })(),
    optional: Boolean(p.questionToken || p.initializer),
    rest: Boolean(p.dotDotDotToken),
  }));
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getNodeReturnType(sourceFile, checker, node) {
  if (ts.isConstructorDeclaration(node)) {
    return 'void (constructor)';
  }
  if ('type' in node && node.type) {
    return node.type.getText(sourceFile);
  }
  if (checker) {
    const sig = checker.getSignatureFromDeclaration(node);
    if (sig) {
      const inferred = checker.getReturnTypeOfSignature(sig);
      const rendered = checker.typeToString(inferred);
      if (rendered) {
        return rendered;
      }
    }
  }
  return 'inferido';
}

// Evalua una condicion de control para guiar el flujo.
function hasAsyncModifier(node) {
  return Boolean(node.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword));
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getAccessModifier(node) {
  if (!node.modifiers) {
    return 'public';
  }
  if (node.modifiers.some((m) => m.kind === ts.SyntaxKind.PrivateKeyword)) {
    return 'private';
  }
  if (node.modifiers.some((m) => m.kind === ts.SyntaxKind.ProtectedKeyword)) {
    return 'protected';
  }
  return 'public';
}

// Paso de soporte dentro de la orquestacion del servicio.
function findFileDescription(sourceText) {
  const m = sourceText.match(/@description\s+([^\n\r*]+)/);
  if (!m) {
    return 'Descripcion no encontrada en cabecera del archivo.';
  }
  return m[1].trim();
}

// Paso de soporte dentro de la orquestacion del servicio.
function toSingleLineCommentText(raw) {
  const cleaned = raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getLeadingCommentSummary(sourceFile, node) {
  const text = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(text, node.getFullStart()) ?? [];
  if (ranges.length === 0) {
    return null;
  }

  const nodeStartLine = getNodeLine(sourceFile, node);
  let selected = null;

  for (const range of ranges) {
    const commentEndLine = sourceFile.getLineAndCharacterOfPosition(range.end).line + 1;
    // Accept one optional blank line between comment and declaration.
    if (nodeStartLine - commentEndLine <= 2) {
      selected = range;
    }
  }

  if (!selected) {
    return null;
  }

  const raw = text.slice(selected.pos, selected.end).trim();
  const parsed = toSingleLineCommentText(raw);
  if (!parsed) {
    return null;
  }
  return parsed.slice(0, 240);
}

// Transforma entradas a una forma valida para el dominio.
function normalizeSignatureText(raw) {
  return raw.replace(/\s+/g, ' ').trim();
}

// Construye datos o instancias requeridas para la siguiente etapa del flujo.
function buildSymbolSignature(sourceFile, checker, node, displayName) {
  const params = getNodeParameters(sourceFile, checker, node)
    .map((p) => `${p.rest ? '...' : ''}${p.name}${p.optional ? '?' : ''}: ${p.type}`)
    .join(', ');
  const returnType = getNodeReturnType(sourceFile, checker, node);
  const isAsync = hasAsyncModifier(node);

  if (ts.isConstructorDeclaration(node)) {
    return `constructor(${params})`;
  }

  if (ts.isGetAccessorDeclaration(node)) {
    return `get ${displayName}(): ${returnType}`;
  }
  if (ts.isSetAccessorDeclaration(node)) {
    return `set ${displayName}(${params})`;
  }

  return `${isAsync ? 'async ' : ''}${displayName}(${params}): ${returnType}`;
}

// Paso de soporte dentro de la orquestacion del servicio.
function analyzeFunctionBody(sourceFile, node) {
  const body = node.body;
  if (!body) {
    return {
      calls: [],
      awaitedCalls: [],
      throwCount: 0,
      catches: 0,
      throws: [],
      branchCount: 0,
      sideEffects: [],
      assignments: [],
    };
  }

  const calls = [];
  const awaitedCalls = [];
  const throws = [];
  let throwCount = 0;
  let catches = 0;
  let branchCount = 0;
  const assignments = [];

  // Paso de soporte dentro de la orquestacion del servicio.
  function visit(n) {
    if (ts.isCallExpression(n)) {
      calls.push(getCallName(sourceFile, n.expression));
    }

    if (ts.isAwaitExpression(n) && ts.isCallExpression(n.expression)) {
      awaitedCalls.push(getCallName(sourceFile, n.expression.expression));
    }

    if (ts.isThrowStatement(n)) {
      throwCount += 1;
      if (n.expression) {
        throws.push(normalizeSignatureText(n.expression.getText(sourceFile)).slice(0, 220));
      }
    }

    if (ts.isTryStatement(n) && n.catchClause) {
      catches += 1;
    }

    if (
      ts.isIfStatement(n) ||
      ts.isForStatement(n) ||
      ts.isForInStatement(n) ||
      ts.isForOfStatement(n) ||
      ts.isWhileStatement(n) ||
      ts.isDoStatement(n) ||
      ts.isSwitchStatement(n) ||
      ts.isConditionalExpression(n)
    ) {
      branchCount += 1;
    }

    if (
      ts.isBinaryExpression(n) &&
      [
        ts.SyntaxKind.EqualsToken,
        ts.SyntaxKind.PlusEqualsToken,
        ts.SyntaxKind.MinusEqualsToken,
        ts.SyntaxKind.AsteriskEqualsToken,
        ts.SyntaxKind.SlashEqualsToken,
      ].includes(n.operatorToken.kind)
    ) {
      assignments.push(normalizeSignatureText(n.left.getText(sourceFile)));
    }

    ts.forEachChild(n, visit);
  }

  visit(body);

  const uniqueCalls = [...new Set(calls)];
  const uniqueAwaitedCalls = [...new Set(awaitedCalls)];
  const uniqueAssignments = [...new Set(assignments)];

  const sideEffects = new Set();

  for (const call of uniqueCalls) {
    for (const rule of SIDE_EFFECT_RULES) {
      if (rule.test(call)) {
        sideEffects.add(rule.tag);
      }
    }
  }

  if (uniqueAssignments.length > 0) {
    sideEffects.add('state_mutation');
  }
  if (throwCount > 0 || catches > 0) {
    sideEffects.add('error_control');
  }

  return {
    calls: uniqueCalls.slice(0, 14),
    awaitedCalls: uniqueAwaitedCalls.slice(0, 10),
    throwCount,
    catches,
    throws: [...new Set(throws)].slice(0, 5),
    branchCount,
    sideEffects: [...sideEffects],
    assignments: uniqueAssignments.slice(0, 10),
  };
}

// Construye datos o instancias requeridas para la siguiente etapa del flujo.
function buildFunctionRecord(
  sourceFile,
  checker,
  fileRel,
  kind,
  displayName,
  node,
  className = null,
  commentNode = null,
) {
  const line = getNodeLine(sourceFile, node);
  const endLine = getNodeEndLine(sourceFile, node);
  const signature = buildSymbolSignature(sourceFile, checker, node, displayName);
  const parameters = getNodeParameters(sourceFile, checker, node);
  const returnType = getNodeReturnType(sourceFile, checker, node);
  const analysis = analyzeFunctionBody(sourceFile, node);
  const comment = getLeadingCommentSummary(sourceFile, commentNode ?? node);

  return {
    file: fileRel,
    className,
    name: displayName,
    kind,
    line,
    endLine,
    signature,
    parameters,
    returnType,
    async: hasAsyncModifier(node),
    access: getAccessModifier(node),
    comment,
    analysis,
  };
}

// Paso de soporte dentro de la orquestacion del servicio.
function safeNodeName(nameNode) {
  if (!nameNode) {
    return null;
  }
  return nameNode.getText();
}

// Obtiene estado o valor derivado sin mutar el flujo principal.
function getCommentHostForVariableDeclaration(node) {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isVariableDeclarationList(node.parent) &&
    ts.isVariableStatement(node.parent.parent)
  ) {
    return node.parent.parent;
  }
  return node;
}

// Transforma entradas a una forma valida para el dominio.
function extractSymbolsFromFile(fileAbs, sourceFile, checker) {
  const fileRel = toPosix(path.relative(ROOT, fileAbs));
  const sourceText = sourceFile.getFullText();
  const fileDescription = findFileDescription(sourceText);

  const records = [];
  const classes = [];

  // Paso de soporte dentro de la orquestacion del servicio.
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      records.push(
        buildFunctionRecord(sourceFile, checker, fileRel, 'function', node.name.text, node, null, node),
      );
    }

    if (ts.isVariableDeclaration(node) && node.name && node.initializer) {
      const varName = node.name.getText(sourceFile);
      const commentHost = getCommentHostForVariableDeclaration(node);

      if (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) {
        records.push(
          buildFunctionRecord(
            sourceFile,
            checker,
            fileRel,
            'function-variable',
            varName,
            node.initializer,
            null,
            commentHost,
          ),
        );
      }

      if (ts.isObjectLiteralExpression(node.initializer)) {
        for (const prop of node.initializer.properties) {
          if (ts.isMethodDeclaration(prop)) {
            const propName = safeNodeName(prop.name);
            if (!propName) {
              continue;
            }
            records.push(
              buildFunctionRecord(
                sourceFile,
                checker,
                fileRel,
                'object-function',
                `${varName}.${propName}`,
                prop,
                null,
                prop,
              ),
            );
          } else if (ts.isPropertyAssignment(prop)) {
            const propName = safeNodeName(prop.name);
            if (!propName) {
              continue;
            }
            if (ts.isArrowFunction(prop.initializer) || ts.isFunctionExpression(prop.initializer)) {
              records.push(
                buildFunctionRecord(
                  sourceFile,
                  checker,
                  fileRel,
                  'object-function',
                  `${varName}.${propName}`,
                  prop.initializer,
                  null,
                  prop,
                ),
              );
            }
          }
        }
      }
    }

    if (ts.isClassDeclaration(node) && node.name) {
      const className = node.name.text;
      const classLine = getNodeLine(sourceFile, node);
      const methods = [];

      for (const member of node.members) {
        if (ts.isMethodDeclaration(member) && member.name) {
          const methodName = safeNodeName(member.name);
          if (!methodName) {
            continue;
          }
          const rec = buildFunctionRecord(
            sourceFile,
            checker,
            fileRel,
            'method',
            methodName,
            member,
            className,
            member,
          );
          records.push(rec);
          methods.push({
            name: methodName,
            line: rec.line,
            kind: rec.kind,
            signature: rec.signature,
          });
        }

        if (ts.isGetAccessorDeclaration(member) && member.name) {
          const methodName = safeNodeName(member.name);
          if (!methodName) {
            continue;
          }
          const rec = buildFunctionRecord(
            sourceFile,
            checker,
            fileRel,
            'getter',
            methodName,
            member,
            className,
            member,
          );
          records.push(rec);
          methods.push({
            name: methodName,
            line: rec.line,
            kind: rec.kind,
            signature: rec.signature,
          });
        }

        if (ts.isSetAccessorDeclaration(member) && member.name) {
          const methodName = safeNodeName(member.name);
          if (!methodName) {
            continue;
          }
          const rec = buildFunctionRecord(
            sourceFile,
            checker,
            fileRel,
            'setter',
            methodName,
            member,
            className,
            member,
          );
          records.push(rec);
          methods.push({
            name: methodName,
            line: rec.line,
            kind: rec.kind,
            signature: rec.signature,
          });
        }
      }

      classes.push({
        name: className,
        line: classLine,
        methods,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  // Legacy shape compatibility for existing tooling/readers.
  const legacy = {
    file: fileRel,
    functions: records
      .filter((r) => !r.className)
      .map((r) => ({
        name: r.name,
        line: r.line,
        kind: r.kind,
        signature: r.signature,
      })),
    classes,
  };

  return {
    file: fileRel,
    description: fileDescription,
    symbols: records.sort((a, b) => a.line - b.line),
    legacy,
  };
}

// Paso de soporte dentro de la orquestacion del servicio.
function renderParamsTable(params) {
  if (!params || params.length === 0) {
    return '- Parametros: ninguno.';
  }
  const lines = [
    '| Parametro | Tipo | Opcional | Rest |',
    '| --- | --- | --- | --- |',
  ];
  for (const p of params) {
    lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.optional ? 'si' : 'no'} | ${p.rest ? 'si' : 'no'} |`);
  }
  return lines.join('\n');
}

// Genera un resumen didactico inferido desde nombre/tipo para lectura junior aun sin comentario en codigo.
function inferFunctionalSummary(sym) {
  const name = sym.name.toLowerCase();

  if (name.startsWith('handle')) {
    return 'Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.';
  }
  if (name.startsWith('run') || name.startsWith('execute') || name.startsWith('process')) {
    return 'Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.';
  }
  if (name.startsWith('get') || name.startsWith('is') || name.startsWith('has') || name.startsWith('can')) {
    return 'Consulta estado o evalua una condicion sin mutar datos principales.';
  }
  if (name.startsWith('set') || name.startsWith('toggle') || name.startsWith('update')) {
    return 'Aplica un cambio de estado controlado para mantener consistencia del modulo.';
  }
  if (name.startsWith('parse') || name.startsWith('normalize') || name.startsWith('extract') || name.startsWith('resolve')) {
    return 'Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.';
  }
  if (name.startsWith('build') || name.startsWith('create')) {
    return 'Construye estructuras/payloads reutilizables para responder o continuar el flujo.';
  }
  if (name.startsWith('sync') || name.startsWith('refresh')) {
    return 'Sincroniza estado entre componentes para evitar desalineaciones.';
  }
  if (name.startsWith('schedule') || name.startsWith('cancel')) {
    return 'Controla temporizadores o tareas diferidas del sistema.';
  }
  if (sym.kind === 'object-function') {
    return 'Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.';
  }

  return 'Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.';
}

// Paso de soporte dentro de la orquestacion del servicio.
function renderSymbolDetail(sym, index) {
  const calls = sym.analysis.calls.length > 0
    ? sym.analysis.calls.map((c) => `\`${c}\``).join(', ')
    : 'ninguna detectada';
  const awaits = sym.analysis.awaitedCalls.length > 0
    ? sym.analysis.awaitedCalls.map((c) => `\`${c}\``).join(', ')
    : 'ninguna';
  const sideEffects = sym.analysis.sideEffects.length > 0
    ? sym.analysis.sideEffects.map((s) => `\`${s}\``).join(', ')
    : 'no detectados';
  const throwSummary = sym.analysis.throwCount > 0
    ? `${sym.analysis.throwCount} throw(s), ${sym.analysis.catches} catch(es)`
    : `0 throw(s), ${sym.analysis.catches} catch(es)`;
  const throwExamples = sym.analysis.throws.length > 0
    ? sym.analysis.throws.map((t) => `  - \`${t}\``).join('\n')
    : '  - ninguno';
  const functionalSummary = inferFunctionalSummary(sym);
  const commentLine = sym.comment ? `- Comentario en codigo: \`${sym.comment}\`` : null;

  const lines = [
    `#### ${index}) \`${sym.name}\` (\`${sym.kind}\`)`,
    `- Lineas: \`${sym.line}\` -> \`${sym.endLine}\``,
    `- Acceso: \`${sym.access}\``,
    `- Async: ${sym.async ? 'si' : 'no'}`,
    `- Resumen funcional: ${functionalSummary}`,
    '- Firma:',
    '```ts',
    `${sym.signature}`,
    '```',
    renderParamsTable(sym.parameters),
    `- Retorno: \`${sym.returnType}\``,
    `- Complejidad estimada (ramas): \`${sym.analysis.branchCount}\``,
    `- Llamadas principales detectadas: ${calls}`,
    `- Await detectados: ${awaits}`,
    `- Efectos secundarios detectados: ${sideEffects}`,
    `- Control de errores: ${throwSummary}`,
    '- Throw examples (max 5):',
    `${throwExamples}`,
    '',
  ];

  if (commentLine) {
    lines.splice(9, 0, commentLine);
  }

  return lines.join('\n');
}

// Paso de soporte dentro de la orquestacion del servicio.
function renderMarkdownDetailed(filesData) {
  const allSymbols = filesData.flatMap((f) => f.symbols);
  const totalClasses = filesData.reduce((acc, f) => acc + f.legacy.classes.length, 0);
  const generatedAt = new Date().toISOString();

  const out = [];
  out.push('# FUNCIONES DETALLADAS (Ultra)');
  out.push('');
  out.push('Este documento es la referencia tecnica detallada de todos los archivos `.ts` y `.mjs` del proyecto.');
  out.push('');
  out.push(`- Generado automaticamente: \`${generatedAt}\``);
  out.push(`- Archivos analizados: \`${filesData.length}\``);
  out.push(`- Simbolos detectados (funciones/metodos/getters/setters): \`${allSymbols.length}\``);
  out.push(`- Clases detectadas: \`${totalClasses}\``);
  out.push('');
  out.push('## Como leer este documento');
  out.push('');
  out.push('1. Empieza por `src/index.ts`.');
  out.push('2. Sigue por `src/modules/music/commands/*` y `src/modules/music/handlers/*`.');
  out.push('3. Luego ve a `src/modules/music/services/*`.');
  out.push('4. Usa `docs/GUIA-HISTORICA.md` como linea de tiempo macro.');
  out.push('');
  out.push('## Detalle ultra por archivo');
  out.push('');

  for (const fileData of filesData) {
    out.push(`### \`${fileData.file}\``);
    out.push('');
    out.push(`**Responsabilidad:** ${fileData.description}`);
    out.push('');
    out.push(`- Simbolos en este archivo: \`${fileData.symbols.length}\``);
    const methodsInFile = fileData.symbols.filter((s) => s.kind === 'method').length;
    const funcsInFile = fileData.symbols.filter((s) => s.kind !== 'method').length;
    out.push(`- Desglose: funciones=\`${funcsInFile}\`, metodos=\`${methodsInFile}\``);
    out.push('');

    if (fileData.symbols.length === 0) {
      out.push('- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.');
      out.push('');
      continue;
    }

    out.push('#### Resumen de simbolos');
    out.push('');
    out.push('| # | Linea | Tipo | Simbolo |');
    out.push('| ---: | ---: | --- | --- |');
    fileData.symbols.forEach((sym, idx) => {
      out.push(`| ${idx + 1} | ${sym.line} | \`${sym.kind}\` | \`${sym.name}\` |`);
    });
    out.push('');

    out.push('#### Detalle por simbolo');
    out.push('');
    fileData.symbols.forEach((sym, idx) => {
      out.push(renderSymbolDetail(sym, idx + 1));
    });
  }

  out.push('## Nota de mantenimiento');
  out.push('');
  out.push('- Regenera este archivo cuando cambie cualquier `.ts` o `.mjs` de `src/` o `scripts/`.');
  out.push('- Script recomendado: `node scripts/generate-function-docs.mjs`.');
  out.push('');

  return out.join('\n');
}

// Paso de soporte dentro de la orquestacion del servicio.
async function main() {
  const inputFiles = [];
  for (const dir of TARGET_DIRS) {
    const abs = path.join(ROOT, dir);
    if (await exists(abs)) {
      inputFiles.push(...(await walkSourceFiles(abs)));
    }
  }
  inputFiles.sort((a, b) => toPosix(path.relative(ROOT, a)).localeCompare(toPosix(path.relative(ROOT, b))));

  const compilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    allowJs: true,
    checkJs: false,
    skipLibCheck: true,
    noResolve: false,
  };
  const program = ts.createProgram(inputFiles, compilerOptions);
  const checker = program.getTypeChecker();

  const parsed = [];
  for (const abs of inputFiles) {
    const sourceFile = program.getSourceFile(abs);
    if (!sourceFile) {
      continue;
    }
    parsed.push(extractSymbolsFromFile(abs, sourceFile, checker));
  }

  const markdown = renderMarkdownDetailed(parsed);
  await fs.writeFile(OUT_MARKDOWN, markdown, 'utf8');

  const symbolCount = parsed.reduce((acc, f) => acc + f.symbols.length, 0);
  console.log(`Generated docs for ${parsed.length} files (${symbolCount} symbols).`);
  console.log(`- ${toPosix(path.relative(ROOT, OUT_MARKDOWN))}`);
}

await main();
