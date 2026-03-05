# FUNCIONES DETALLADAS (Ultra)

Este documento es la referencia tecnica detallada de todos los archivos `.ts` y `.mjs` del proyecto.

- Generado automaticamente: `2026-03-04T20:25:26.335Z`
- Archivos analizados: `69`
- Simbolos detectados (funciones/metodos/getters/setters): `373`
- Clases detectadas: `27`

## Como leer este documento

1. Empieza por `src/index.ts`.
2. Sigue por `src/modules/music/commands/*` y `src/modules/music/handlers/*`.
3. Luego ve a `src/modules/music/services/*`.
4. Usa [docs/GUIA-HISTORICA.md](GUIA-HISTORICA.md) como linea de tiempo macro.

## Detalle ultra por archivo

### `scripts/ensure-function-comments.mjs`

**Responsabilidad:** Inserta comentarios de apoyo en funciones sin comentario inmediato para mejorar legibilidad.

- Simbolos en este archivo: `15`
- Desglose: funciones=`15`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 19 | `function` | `toPosix` |
| 2 | 24 | `function` | `exists` |
| 3 | 34 | `function` | `walkSourceFiles` |
| 4 | 38 | `function` | `walk` |
| 5 | 66 | `function` | `getNodeLine` |
| 6 | 72 | `function` | `inferComment` |
| 7 | 128 | `function` | `startsWithComment` |
| 8 | 138 | `function` | `hasNearbyComment` |
| 9 | 157 | `function` | `collectFunctionLikeNodes` |
| 10 | 161 | `function` | `push` |
| 11 | 172 | `function` | `safeName` |
| 12 | 177 | `function` | `visit` |
| 13 | 225 | `function` | `makeInsertions` |
| 14 | 251 | `function` | `applyInsertions` |
| 15 | 260 | `function` | `main` |

#### Detalle por simbolo

#### 1) `toPosix` (`function`)
- Lineas: `19` -> `21`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toPosix(filePath: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `filePath` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `filePath.split(path.sep).join`, `filePath.split`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `exists` (`function`)
- Lineas: `24` -> `31`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async exists(p: inferido): Promise<boolean>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `p` | `inferido` | no | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `fs.access`
- Await detectados: `fs.access`
- Efectos secundarios detectados: `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `walkSourceFiles` (`function`)
- Lineas: `34` -> `63`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async walkSourceFiles(startDir: inferido): Promise<any[]>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `startDir` | `inferido` | no | no |
- Retorno: `Promise<any[]>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `fs.readdir`, `path.join`, `entry.isDirectory`, `walk`, `entry.isFile`, `entry.name.endsWith`, `out.push`
- Await detectados: `fs.readdir`, `walk`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `walk` (`function`)
- Lineas: `38` -> `59`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async walk(dir: inferido): Promise<void>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `dir` | `inferido` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `fs.readdir`, `path.join`, `entry.isDirectory`, `walk`, `entry.isFile`, `entry.name.endsWith`, `out.push`
- Await detectados: `fs.readdir`, `walk`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `getNodeLine` (`function`)
- Lineas: `66` -> `69`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNodeLine(sourceFile: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `sourceFile.getLineAndCharacterOfPosition`, `node.getStart`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `inferComment` (`function`)
- Lineas: `72` -> `125`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
inferComment(symbolName: inferido, kind: inferido): "Evalua una condicion de control para guiar el flujo." | "Obtiene estado o valor derivado sin mutar el flujo principal." | "Actualiza estado interno de forma encapsulada." | ... 13 more ... | "Paso de soporte dentro de la orquestacion del servicio."
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `symbolName` | `inferido` | no | no |
| `kind` | `inferido` | no | no |
- Retorno: `"Evalua una condicion de control para guiar el flujo." | "Obtiene estado o valor derivado sin mutar el flujo principal." | "Actualiza estado interno de forma encapsulada." | ... 13 more ... | "Paso de soporte dentro de la orquestacion del servicio."`
- Complejidad estimada (ramas): `16`
- Llamadas principales detectadas: `symbolName.toLowerCase`, `name.startsWith`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `startsWithComment` (`function`)
- Lineas: `128` -> `135`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
startsWithComment(trimmedLine: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `trimmedLine` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `trimmedLine.startsWith`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `hasNearbyComment` (`function`)
- Lineas: `138` -> `154`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
hasNearbyComment(lines: inferido, symbolLine: inferido): any
```
- Comentario en codigo: `// Evalua una condicion de control para guiar el flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `lines` | `inferido` | no | no |
| `symbolLine` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `value.trim`, `lines[line - 1]?.trim`, `startsWithComment`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `collectFunctionLikeNodes` (`function`)
- Lineas: `157` -> `222`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
collectFunctionLikeNodes(sourceFile: inferido): any[]
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
- Retorno: `any[]`
- Complejidad estimada (ramas): `16`
- Llamadas principales detectadas: `out.push`, `nameNode.getText`, `ts.isFunctionDeclaration`, `push`, `ts.isClassDeclaration`, `ts.isMethodDeclaration`, `safeName`, `ts.isGetAccessorDeclaration`, `ts.isSetAccessorDeclaration`, `ts.isVariableDeclaration`, `node.name.getText`, `ts.isArrowFunction`, `ts.isFunctionExpression`, `ts.isObjectLiteralExpression`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `push` (`function`)
- Lineas: `161` -> `169`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
push(kind: inferido, name: inferido, node: inferido): void
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `kind` | `inferido` | no | no |
| `name` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `out.push`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `safeName` (`function`)
- Lineas: `172` -> `174`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
safeName(nameNode: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `nameNode` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `nameNode.getText`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `visit` (`function`)
- Lineas: `177` -> `217`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
visit(node: inferido): void
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `node` | `inferido` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `13`
- Llamadas principales detectadas: `ts.isFunctionDeclaration`, `push`, `ts.isClassDeclaration`, `ts.isMethodDeclaration`, `safeName`, `ts.isGetAccessorDeclaration`, `ts.isSetAccessorDeclaration`, `ts.isVariableDeclaration`, `node.name.getText`, `ts.isArrowFunction`, `ts.isFunctionExpression`, `ts.isObjectLiteralExpression`, `ts.isPropertyAssignment`, `ts.forEachChild`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 13) `makeInsertions` (`function`)
- Lineas: `225` -> `248`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
makeInsertions(sourceText: inferido, sourceFile: inferido): { pos: any; text: string; }[]
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceText` | `inferido` | no | no |
| `sourceFile` | `inferido` | no | no |
- Retorno: `{ pos: any; text: string; }[]`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `sourceText.split`, `collectFunctionLikeNodes`, `getNodeLine`, `hasNearbyComment`, `item.node.getStart`, `sourceText.lastIndexOf`, `sourceText.slice(lineStartPos, startPos).match`, `sourceText.slice`, `inferComment`, `insertions.push`, `insertions.sort`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 14) `applyInsertions` (`function`)
- Lineas: `251` -> `257`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
applyInsertions(text: inferido, insertions: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `text` | `inferido` | no | no |
| `insertions` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `out.slice`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 15) `main` (`function`)
- Lineas: `260` -> `299`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async main(): Promise<void>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
- Parametros: ninguno.
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `7`
- Llamadas principales detectadas: `path.join`, `exists`, `allFiles.push`, `walkSourceFiles`, `allFiles.sort`, `toPosix(path.relative(ROOT, a)).localeCompare`, `toPosix`, `path.relative`, `fs.readFile`, `ts.createSourceFile`, `makeInsertions`, `applyInsertions`, `fs.writeFile`, `console.log`
- Await detectados: `exists`, `walkSourceFiles`, `fs.readFile`, `fs.writeFile`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `scripts/generate-function-docs.mjs`

**Responsabilidad:** Genera inventario y documentacion detallada de funciones para src/ y scripts/.

- Simbolos en este archivo: `30`
- Desglose: funciones=`30`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 31 | `function` | `toPosix` |
| 2 | 36 | `function` | `exists` |
| 3 | 46 | `function` | `walkSourceFiles` |
| 4 | 50 | `function` | `walk` |
| 5 | 78 | `function` | `getNodeLine` |
| 6 | 84 | `function` | `getNodeEndLine` |
| 7 | 90 | `function` | `getNodeText` |
| 8 | 95 | `function` | `getExpressionText` |
| 9 | 100 | `function` | `getCallName` |
| 10 | 117 | `function` | `getNodeParameters` |
| 11 | 142 | `function` | `getNodeReturnType` |
| 12 | 163 | `function` | `hasAsyncModifier` |
| 13 | 168 | `function` | `getAccessModifier` |
| 14 | 182 | `function` | `findFileDescription` |
| 15 | 191 | `function` | `toSingleLineCommentText` |
| 16 | 206 | `function` | `getLeadingCommentSummary` |
| 17 | 237 | `function` | `normalizeSignatureText` |
| 18 | 242 | `function` | `buildSymbolSignature` |
| 19 | 264 | `function` | `analyzeFunctionBody` |
| 20 | 288 | `function` | `visit` |
| 21 | 373 | `function` | `buildFunctionRecord` |
| 22 | 409 | `function` | `safeNodeName` |
| 23 | 417 | `function` | `getCommentHostForVariableDeclaration` |
| 24 | 429 | `function` | `extractSymbolsFromFile` |
| 25 | 438 | `function` | `visit` |
| 26 | 621 | `function` | `renderParamsTable` |
| 27 | 636 | `function` | `inferFunctionalSummary` |
| 28 | 671 | `function` | `renderSymbolDetail` |
| 29 | 720 | `function` | `renderMarkdownDetailed` |
| 30 | 789 | `function` | `main` |

#### Detalle por simbolo

#### 1) `toPosix` (`function`)
- Lineas: `31` -> `33`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toPosix(filePath: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `filePath` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `filePath.split(path.sep).join`, `filePath.split`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `exists` (`function`)
- Lineas: `36` -> `43`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async exists(p: inferido): Promise<boolean>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `p` | `inferido` | no | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `fs.access`
- Await detectados: `fs.access`
- Efectos secundarios detectados: `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `walkSourceFiles` (`function`)
- Lineas: `46` -> `75`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async walkSourceFiles(startDir: inferido): Promise<any[]>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `startDir` | `inferido` | no | no |
- Retorno: `Promise<any[]>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `fs.readdir`, `path.join`, `entry.isDirectory`, `walk`, `entry.isFile`, `entry.name.endsWith`, `out.push`
- Await detectados: `fs.readdir`, `walk`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `walk` (`function`)
- Lineas: `50` -> `71`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async walk(dir: inferido): Promise<void>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `dir` | `inferido` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `fs.readdir`, `path.join`, `entry.isDirectory`, `walk`, `entry.isFile`, `entry.name.endsWith`, `out.push`
- Await detectados: `fs.readdir`, `walk`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `getNodeLine` (`function`)
- Lineas: `78` -> `81`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNodeLine(sourceFile: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `sourceFile.getLineAndCharacterOfPosition`, `node.getStart`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `getNodeEndLine` (`function`)
- Lineas: `84` -> `87`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNodeEndLine(sourceFile: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `sourceFile.getLineAndCharacterOfPosition`, `node.getEnd`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `getNodeText` (`function`)
- Lineas: `90` -> `92`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNodeText(sourceFile: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `sourceFile.text.slice`, `node.getStart`, `node.getEnd`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `getExpressionText` (`function`)
- Lineas: `95` -> `97`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getExpressionText(sourceFile: inferido, expr: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `expr` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `expr.getText`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `getCallName` (`function`)
- Lineas: `100` -> `114`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getCallName(sourceFile: inferido, expr: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `expr` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `ts.isIdentifier`, `ts.isPropertyAccessExpression`, `getExpressionText`, `ts.isElementAccessExpression`, `ts.isCallExpression`, `getCallName`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `getNodeParameters` (`function`)
- Lineas: `117` -> `139`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNodeParameters(sourceFile: inferido, checker: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `checker` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `Array.isArray`, `node.parameters.map`, `p.name.getText`, `(() => {
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
    })`, `p.type.getText`, `checker.getTypeAtLocation`, `checker.typeToString`, `Boolean`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `getNodeReturnType` (`function`)
- Lineas: `142` -> `160`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNodeReturnType(sourceFile: inferido, checker: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `checker` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `ts.isConstructorDeclaration`, `node.type.getText`, `checker.getSignatureFromDeclaration`, `checker.getReturnTypeOfSignature`, `checker.typeToString`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `hasAsyncModifier` (`function`)
- Lineas: `163` -> `165`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
hasAsyncModifier(node: inferido): boolean
```
- Comentario en codigo: `// Evalua una condicion de control para guiar el flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `node` | `inferido` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `Boolean`, `node.modifiers?.some`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 13) `getAccessModifier` (`function`)
- Lineas: `168` -> `179`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAccessModifier(node: inferido): "public" | "private" | "protected"
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `node` | `inferido` | no | no |
- Retorno: `"public" | "private" | "protected"`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `node.modifiers.some`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 14) `findFileDescription` (`function`)
- Lineas: `182` -> `188`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
findFileDescription(sourceText: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceText` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `sourceText.match`, `m[1].trim`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 15) `toSingleLineCommentText` (`function`)
- Lineas: `191` -> `203`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toSingleLineCommentText(raw: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `raw` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim`, `raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace`, `raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .filter(Boolean)
    .join`, `raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .filter`, `raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map`, `raw
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/$/, '')
    .split`, `raw
    .replace(/^\/\*\*?/, '')
    .replace`, `raw
    .replace`, `line.replace(/^\s*\*?\s?/, '').trim`, `line.replace`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 16) `getLeadingCommentSummary` (`function`)
- Lineas: `206` -> `234`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getLeadingCommentSummary(sourceFile: inferido, node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `sourceFile.getFullText`, `ts.getLeadingCommentRanges`, `node.getFullStart`, `getNodeLine`, `sourceFile.getLineAndCharacterOfPosition`, `text.slice(selected.pos, selected.end).trim`, `text.slice`, `toSingleLineCommentText`, `parsed.slice`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 17) `normalizeSignatureText` (`function`)
- Lineas: `237` -> `239`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
normalizeSignatureText(raw: inferido): any
```
- Comentario en codigo: `// Transforma entradas a una forma valida para el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `raw` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `raw.replace(/\s+/g, ' ').trim`, `raw.replace`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 18) `buildSymbolSignature` (`function`)
- Lineas: `242` -> `261`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildSymbolSignature(sourceFile: inferido, checker: inferido, node: inferido, displayName: inferido): string
```
- Comentario en codigo: `// Construye datos o instancias requeridas para la siguiente etapa del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `checker` | `inferido` | no | no |
| `node` | `inferido` | no | no |
| `displayName` | `inferido` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `6`
- Llamadas principales detectadas: `getNodeParameters(sourceFile, checker, node)
    .map((p) => `${p.rest ? '...' : ''}${p.name}${p.optional ? '?' : ''}: ${p.type}`)
    .join`, `getNodeParameters(sourceFile, checker, node)
    .map`, `getNodeParameters`, `getNodeReturnType`, `hasAsyncModifier`, `ts.isConstructorDeclaration`, `ts.isGetAccessorDeclaration`, `ts.isSetAccessorDeclaration`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 19) `analyzeFunctionBody` (`function`)
- Lineas: `264` -> `370`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
analyzeFunctionBody(sourceFile: inferido, node: inferido): { calls: any[]; awaitedCalls: any[]; throwCount: number; catches: number; throws: any[]; branchCount: number; sideEffects: any[]; assignments: any[]; }
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `node` | `inferido` | no | no |
- Retorno: `{ calls: any[]; awaitedCalls: any[]; throwCount: number; catches: number; throws: any[]; branchCount: number; sideEffects: any[]; assignments: any[]; }`
- Complejidad estimada (ramas): `13`
- Llamadas principales detectadas: `ts.isCallExpression`, `calls.push`, `getCallName`, `ts.isAwaitExpression`, `awaitedCalls.push`, `ts.isThrowStatement`, `throws.push`, `normalizeSignatureText(n.expression.getText(sourceFile)).slice`, `normalizeSignatureText`, `n.expression.getText`, `ts.isTryStatement`, `ts.isIfStatement`, `ts.isForStatement`, `ts.isForInStatement`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 20) `visit` (`function`)
- Lineas: `288` -> `335`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
visit(n: inferido): void
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `n` | `inferido` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `7`
- Llamadas principales detectadas: `ts.isCallExpression`, `calls.push`, `getCallName`, `ts.isAwaitExpression`, `awaitedCalls.push`, `ts.isThrowStatement`, `throws.push`, `normalizeSignatureText(n.expression.getText(sourceFile)).slice`, `normalizeSignatureText`, `n.expression.getText`, `ts.isTryStatement`, `ts.isIfStatement`, `ts.isForStatement`, `ts.isForInStatement`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 21) `buildFunctionRecord` (`function`)
- Lineas: `373` -> `406`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildFunctionRecord(sourceFile: inferido, checker: inferido, fileRel: inferido, kind: inferido, displayName: inferido, node: inferido, className?: inferido, commentNode?: inferido): { file: any; className: any; name: any; kind: any; line: any; endLine: any; signature: string; parameters: any; returnType: any; async: boolean; access: string; comment: any; analysis: { calls: any[]; awaitedCalls: any[]; ... 5 more ...; assignments: any[]; }; }
```
- Comentario en codigo: `// Construye datos o instancias requeridas para la siguiente etapa del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sourceFile` | `inferido` | no | no |
| `checker` | `inferido` | no | no |
| `fileRel` | `inferido` | no | no |
| `kind` | `inferido` | no | no |
| `displayName` | `inferido` | no | no |
| `node` | `inferido` | no | no |
| `className` | `inferido` | si | no |
| `commentNode` | `inferido` | si | no |
- Retorno: `{ file: any; className: any; name: any; kind: any; line: any; endLine: any; signature: string; parameters: any; returnType: any; async: boolean; access: string; comment: any; analysis: { calls: any[]; awaitedCalls: any[]; ... 5 more ...; assignments: any[]; }; }`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getNodeLine`, `getNodeEndLine`, `buildSymbolSignature`, `getNodeParameters`, `getNodeReturnType`, `analyzeFunctionBody`, `getLeadingCommentSummary`, `hasAsyncModifier`, `getAccessModifier`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 22) `safeNodeName` (`function`)
- Lineas: `409` -> `414`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
safeNodeName(nameNode: inferido): any
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `nameNode` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `nameNode.getText`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 23) `getCommentHostForVariableDeclaration` (`function`)
- Lineas: `417` -> `426`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getCommentHostForVariableDeclaration(node: inferido): any
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `node` | `inferido` | no | no |
- Retorno: `any`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `ts.isVariableDeclaration`, `ts.isVariableDeclarationList`, `ts.isVariableStatement`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 24) `extractSymbolsFromFile` (`function`)
- Lineas: `429` -> `618`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractSymbolsFromFile(fileAbs: inferido, sourceFile: inferido, checker: inferido): { file: any; description: any; symbols: any[]; legacy: { file: any; functions: { name: any; line: any; kind: any; signature: any; }[]; classes: any[]; }; }
```
- Comentario en codigo: `// Transforma entradas a una forma valida para el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `fileAbs` | `inferido` | no | no |
| `sourceFile` | `inferido` | no | no |
| `checker` | `inferido` | no | no |
- Retorno: `{ file: any; description: any; symbols: any[]; legacy: { file: any; functions: { name: any; line: any; kind: any; signature: any; }[]; classes: any[]; }; }`
- Complejidad estimada (ramas): `18`
- Llamadas principales detectadas: `toPosix`, `path.relative`, `sourceFile.getFullText`, `findFileDescription`, `ts.isFunctionDeclaration`, `records.push`, `buildFunctionRecord`, `ts.isVariableDeclaration`, `node.name.getText`, `getCommentHostForVariableDeclaration`, `ts.isArrowFunction`, `ts.isFunctionExpression`, `ts.isObjectLiteralExpression`, `ts.isMethodDeclaration`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 25) `visit` (`function`)
- Lineas: `438` -> `594`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
visit(node: inferido): void
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `node` | `inferido` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `18`
- Llamadas principales detectadas: `ts.isFunctionDeclaration`, `records.push`, `buildFunctionRecord`, `ts.isVariableDeclaration`, `node.name.getText`, `getCommentHostForVariableDeclaration`, `ts.isArrowFunction`, `ts.isFunctionExpression`, `ts.isObjectLiteralExpression`, `ts.isMethodDeclaration`, `safeNodeName`, `ts.isPropertyAssignment`, `ts.isClassDeclaration`, `getNodeLine`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 26) `renderParamsTable` (`function`)
- Lineas: `621` -> `633`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
renderParamsTable(params: inferido): string
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `inferido` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `lines.push`, `lines.join`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 27) `inferFunctionalSummary` (`function`)
- Lineas: `636` -> `668`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
inferFunctionalSummary(sym: inferido): "Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente." | "Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado." | ... 7 more ... | "Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el fluj...
```
- Comentario en codigo: `// Genera un resumen didactico inferido desde nombre/tipo para lectura junior aun sin comentario en codigo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sym` | `inferido` | no | no |
- Retorno: `"Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente." | "Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado." | ... 7 more ... | "Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el fluj...`
- Complejidad estimada (ramas): `9`
- Llamadas principales detectadas: `sym.name.toLowerCase`, `name.startsWith`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 28) `renderSymbolDetail` (`function`)
- Lineas: `671` -> `717`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
renderSymbolDetail(sym: inferido, index: inferido): string
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `sym` | `inferido` | no | no |
| `index` | `inferido` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `8`
- Llamadas principales detectadas: `sym.analysis.calls.map((c) => `\`${c}\``).join`, `sym.analysis.calls.map`, `sym.analysis.awaitedCalls.map((c) => `\`${c}\``).join`, `sym.analysis.awaitedCalls.map`, `sym.analysis.sideEffects.map((s) => `\`${s}\``).join`, `sym.analysis.sideEffects.map`, `sym.analysis.throws.map((t) => `  - \`${t}\``).join`, `sym.analysis.throws.map`, `inferFunctionalSummary`, `renderParamsTable`, `lines.splice`, `lines.join`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 29) `renderMarkdownDetailed` (`function`)
- Lineas: `720` -> `786`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
renderMarkdownDetailed(filesData: inferido): string
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `filesData` | `inferido` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `filesData.flatMap`, `filesData.reduce`, `new Date().toISOString`, `out.push`, `fileData.symbols.filter`, `fileData.symbols.forEach`, `renderSymbolDetail`, `out.join`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 30) `main` (`function`)
- Lineas: `789` -> `830`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async main(): Promise<void>
```
- Comentario en codigo: `// Paso de soporte dentro de la orquestacion del servicio.`
- Parametros: ninguno.
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `path.join`, `exists`, `inputFiles.push`, `walkSourceFiles`, `inputFiles.sort`, `toPosix(path.relative(ROOT, a)).localeCompare`, `toPosix`, `path.relative`, `ts.createProgram`, `program.getTypeChecker`, `program.getSourceFile`, `parsed.push`, `extractSymbolsFromFile`, `parsed.map`
- Await detectados: `exists`, `walkSourceFiles`, `fs.writeFile`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `scripts/music-playlist-smoke-test.mjs`

**Responsabilidad:** Smoke test local de yt-dlp para validar busquedas y resolucion de playlists.

- Simbolos en este archivo: `2`
- Desglose: funciones=`2`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 20 | `function` | `runYtDlpJson` |
| 2 | 47 | `function` | `main` |

#### Detalle por simbolo

#### 1) `runYtDlpJson` (`function`)
- Lineas: `20` -> `44`
- Acceso: `public`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async runYtDlpJson(label: inferido, args: inferido, timeoutMs: inferido): Promise<any>
```
- Comentario en codigo: `// Ejecuta yt-dlp con un set de argumentos y registra un resumen compacto del resultado.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `label` | `inferido` | no | no |
| `args` | `inferido` | no | no |
| `timeoutMs` | `inferido` | no | no |
- Retorno: `Promise<any>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `Date.now`, `execFileAsync`, `JSON.parse`, `console.log`, `JSON.stringify`, `Array.isArray`
- Await detectados: `execFileAsync`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `main` (`function`)
- Lineas: `47` -> `128`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async main(): Promise<void>
```
- Comentario en codigo: `// Orquesta una bateria corta de casos para validar que el proveedor responde como esperamos.`
- Parametros: ninguno.
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `console.log`, `runYtDlpJson`, `Array.isArray`
- Await detectados: `runYtDlpJson`
- Efectos secundarios detectados: `error_control`
- Control de errores: 4 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new Error('La playlist no devolvio multiples entradas en modo flat.')`
  - `new Error('La playlist parcial no devolvio multiples entradas con metadata completa.')`
  - `new Error('La playlist publica del usuario no devolvio multiples entradas en modo flat.')`
  - `new Error('La URL watch+list del usuario no devolvio multiples entradas en modo flat.')`

### `scripts/register-commands.ts`

**Responsabilidad:** Script operativo para registrar/actualizar slash commands en Discord (despliegue de comandos).

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/commands/command-registry.ts`

**Responsabilidad:** Centraliza la lista de comandos disponibles y expone el registro para resolucion en runtime.

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/commands/command.ts`

**Responsabilidad:** Define el contrato base de un comando (shape tipada) para mantener consistencia entre modulos.

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/index.ts`

**Responsabilidad:** Punto de entrada del bot: inicializa cliente de Discord, registra modulos, conecta eventos y arranca el runtime principal.

- Simbolos en este archivo: `3`
- Desglose: funciones=`3`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 27 | `function` | `getDiscordApiErrorCode` |
| 2 | 37 | `function` | `isIgnorableInteractionResponseError` |
| 3 | 46 | `function` | `sendEphemeralErrorReply` |

#### Detalle por simbolo

#### 1) `getDiscordApiErrorCode` (`function`)
- Lineas: `27` -> `34`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getDiscordApiErrorCode(error: unknown): number | null
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `number | null`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `isIgnorableInteractionResponseError` (`function`)
- Lineas: `37` -> `43`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isIgnorableInteractionResponseError(error: unknown): boolean
```
- Comentario en codigo: `// Evalua una condicion de control para guiar el flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getDiscordApiErrorCode`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `sendEphemeralErrorReply` (`function`)
- Lineas: `46` -> `72`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async sendEphemeralErrorReply(interaction: ErrorReplyInteraction, content: string): Promise<void>
```
- Comentario en codigo: `// Orquesta la ejecucion de una accion de negocio con control de errores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ErrorReplyInteraction` | no | no |
| `content` | `string` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `interaction.followUp`, `interaction.reply`, `isIgnorableInteractionResponseError`
- Await detectados: `interaction.followUp`, `interaction.reply`
- Efectos secundarios detectados: `discord_messages`, `error_control`
- Control de errores: 1 throw(s), 1 catch(es)
- Throw examples (max 5):
  - `error`

### `src/modules/music/commands/autoplay.ts`

**Responsabilidad:** Comando slash de musica (autoplay): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 26 | `object-function` | `autoplayCommand.execute` |

#### Detalle por simbolo

#### 1) `autoplayCommand.execute` (`object-function`)
- Lineas: `26` -> `33`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async autoplayCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getString`, `musicService.setAutoplay`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/back.ts`

**Responsabilidad:** Comando slash de musica (back): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `object-function` | `backCommand.execute` |

#### Detalle por simbolo

#### 1) `backCommand.execute` (`object-function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async backCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.back`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/clear.ts`

**Responsabilidad:** Comando slash de musica (clear): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 16 | `object-function` | `clearCommand.execute` |

#### Detalle por simbolo

#### 1) `clearCommand.execute` (`object-function`)
- Lineas: `16` -> `25`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async clearCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.clearQueue`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/forward.ts`

**Responsabilidad:** Comando slash de musica (forward): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 24 | `object-function` | `forwardCommand.execute` |

#### Detalle por simbolo

#### 1) `forwardCommand.execute` (`object-function`)
- Lineas: `24` -> `30`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async forwardCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getInteger`, `musicService.forward`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/index.ts`

**Responsabilidad:** Agrupa y exporta todos los comandos slash del modulo de musica para su registro unificado.

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/modules/music/commands/join.ts`

**Responsabilidad:** Comando slash de musica (join): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 16 | `object-function` | `joinCommand.execute` |

#### Detalle por simbolo

#### 1) `joinCommand.execute` (`object-function`)
- Lineas: `16` -> `25`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async joinCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.join`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/loop.ts`

**Responsabilidad:** Comando slash de musica (loop): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 28 | `object-function` | `loopCommand.execute` |

#### Detalle por simbolo

#### 1) `loopCommand.execute` (`object-function`)
- Lineas: `28` -> `34`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async loopCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getString`, `musicService.setLoopMode`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/nowplaying.ts`

**Responsabilidad:** Comando slash de musica (nowplaying): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 16 | `object-function` | `nowPlayingCommand.execute` |

#### Detalle por simbolo

#### 1) `nowPlayingCommand.execute` (`object-function`)
- Lineas: `16` -> `18`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async nowPlayingCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.getNowPlayingSummary`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/pause.ts`

**Responsabilidad:** Comando slash de musica (pause): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `object-function` | `pauseCommand.execute` |

#### Detalle por simbolo

#### 1) `pauseCommand.execute` (`object-function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async pauseCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.pause`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/play.ts`

**Responsabilidad:** Comando slash de musica (play): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 22 | `object-function` | `playCommand.execute` |

#### Detalle por simbolo

#### 1) `playCommand.execute` (`object-function`)
- Lineas: `22` -> `29`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async playCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getString`, `musicService.play`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/queue.ts`

**Responsabilidad:** Comando slash de musica (queue): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 23 | `object-function` | `queueCommand.execute` |

#### Detalle por simbolo

#### 1) `queueCommand.execute` (`object-function`)
- Lineas: `23` -> `29`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async queueCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getInteger`, `musicService.getQueueSummary`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/quit.ts`

**Responsabilidad:** Comando slash de musica (quit): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 16 | `object-function` | `quitCommand.execute` |

#### Detalle por simbolo

#### 1) `quitCommand.execute` (`object-function`)
- Lineas: `16` -> `21`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async quitCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.quit`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/replay.ts`

**Responsabilidad:** Comando slash de musica (replay): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `object-function` | `replayCommand.execute` |

#### Detalle por simbolo

#### 1) `replayCommand.execute` (`object-function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async replayCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.replay`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/resume.ts`

**Responsabilidad:** Comando slash de musica (resume): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `object-function` | `resumeCommand.execute` |

#### Detalle por simbolo

#### 1) `resumeCommand.execute` (`object-function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async resumeCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.resume`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/rewind.ts`

**Responsabilidad:** Comando slash de musica (rewind): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 24 | `object-function` | `rewindCommand.execute` |

#### Detalle por simbolo

#### 1) `rewindCommand.execute` (`object-function`)
- Lineas: `24` -> `30`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async rewindCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getInteger`, `musicService.rewind`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/run-music-slash.ts`

**Responsabilidad:** Router de ejecucion de slash commands de musica: valida el comando y delega en el handler correcto.

- Simbolos en este archivo: `4`
- Desglose: funciones=`4`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `function` | `getDiscordApiErrorCode` |
| 2 | 24 | `function` | `isIgnorableInteractionResponseError` |
| 3 | 33 | `function` | `scheduleSlashEphemeralDeletion` |
| 4 | 45 | `function` | `runMusicSlashCommand` |

#### Detalle por simbolo

#### 1) `getDiscordApiErrorCode` (`function`)
- Lineas: `14` -> `21`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getDiscordApiErrorCode(error: unknown): number | null
```
- Comentario en codigo: `// Obtiene estado o valor derivado sin mutar el flujo principal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `number | null`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `isIgnorableInteractionResponseError` (`function`)
- Lineas: `24` -> `30`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isIgnorableInteractionResponseError(error: unknown): boolean
```
- Comentario en codigo: `// Evalua una condicion de control para guiar el flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getDiscordApiErrorCode`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `scheduleSlashEphemeralDeletion` (`function`)
- Lineas: `33` -> `42`
- Acceso: `public`
- Async: no
- Resumen funcional: Controla temporizadores o tareas diferidas del sistema.
- Firma:
```ts
scheduleSlashEphemeralDeletion(interaction: ChatInputCommandInteraction): void
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `setTimeout`, `interaction.deleteReply().catch`, `interaction.deleteReply`, `timeout.unref`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`, `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `runMusicSlashCommand` (`function`)
- Lineas: `45` -> `115`
- Acceso: `public`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async runMusicSlashCommand(interaction: ChatInputCommandInteraction, handler: () => Promise<string>): Promise<void>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
| `handler` | `() => Promise<string>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `interaction.deferReply`, `isIgnorableInteractionResponseError`, `handler`, `interaction.editReply`, `scheduleSlashEphemeralDeletion`, `getMusicErrorMessage`, `interaction.reply`
- Await detectados: `interaction.deferReply`, `handler`, `interaction.editReply`, `interaction.reply`
- Efectos secundarios detectados: `discord_messages`, `error_control`
- Control de errores: 4 throw(s), 5 catch(es)
- Throw examples (max 5):
  - `error`
  - `replyError`

### `src/modules/music/commands/skip.ts`

**Responsabilidad:** Comando slash de musica (skip): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `object-function` | `skipCommand.execute` |

#### Detalle por simbolo

#### 1) `skipCommand.execute` (`object-function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async skipCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.skip`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/stop.ts`

**Responsabilidad:** Comando slash de musica (stop): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 14 | `object-function` | `stopCommand.execute` |

#### Detalle por simbolo

#### 1) `stopCommand.execute` (`object-function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async stopCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `musicService.stop`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/commands/volume.ts`

**Responsabilidad:** Comando slash de musica (volume): valida entrada minima y delega la logica al servicio de musica.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 24 | `object-function` | `volumeCommand.execute` |

#### Detalle por simbolo

#### 1) `volumeCommand.execute` (`object-function`)
- Lineas: `24` -> `29`
- Acceso: `public`
- Async: si
- Resumen funcional: Handler asociado a comando/UI que conecta entrada de usuario con una accion concreta.
- Firma:
```ts
async volumeCommand.execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```
- Comentario en codigo: `// Punto de entrada del comando; valida entrada y delega en la capa de servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction<CacheType>` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `runMusicSlashCommand`, `interaction.options.getInteger`, `musicService.setVolume`
- Await detectados: `runMusicSlashCommand`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/constants.ts`

**Responsabilidad:** Constantes y tipos literales del modulo de musica (nombres de comandos, limites y keys compartidas).

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 29 | `function` | `createButtonId` |

#### Detalle por simbolo

#### 1) `createButtonId` (`function`)
- Lineas: `29` -> `32`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createButtonId(action: MusicButtonAction): string
```
- Comentario en codigo: `// Funcion de soporte del modulo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `action` | `MusicButtonAction` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/domain/autoplay-candidate-utils.ts`

**Responsabilidad:** Funciones puras para normalizar, puntuar y comparar candidatos de autoplay sin efectos secundarios.

- Simbolos en este archivo: `12`
- Desglose: funciones=`12`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 18 | `function` | `buildAutoplayCandidateKey` |
| 2 | 28 | `function` | `tokenizeComparableText` |
| 3 | 34 | `function` | `extractSongNamePrefix` |
| 4 | 44 | `function` | `buildAutoplayArtistTokenSet` |
| 5 | 63 | `function` | `buildCoreSongTokens` |
| 6 | 70 | `function` | `buildGenericNoiseTokenSet` |
| 7 | 89 | `function` | `extractSongNameSuffix` |
| 8 | 107 | `function` | `buildAutoplayKeywordTokens` |
| 9 | 116 | `function` | `isKeywordRepeatAgainstRecentHistory` |
| 10 | 161 | `function` | `isProbablySameCandidateVariant` |
| 11 | 207 | `function` | `isProbablySameSongVariant` |
| 12 | 253 | `function` | `buildQueueSongCandidate` |

#### Detalle por simbolo

#### 1) `buildAutoplayCandidateKey` (`function`)
- Lineas: `18` -> `25`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildAutoplayCandidateKey(candidate: AutoplayCandidate): string
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `candidate` | `AutoplayCandidate` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `extractYouTubeVideoId`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `tokenizeComparableText` (`function`)
- Lineas: `28` -> `31`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
tokenizeComparableText(value: string | null | undefined): string[]
```
- Comentario en codigo: `// Tokeniza texto para comparaciones semanticas del dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `value` | `string | null | undefined` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `normalizeAutoplayComparableTitle`, `normalized.split`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `extractSongNamePrefix` (`function`)
- Lineas: `34` -> `41`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractSongNamePrefix(value: string | null | undefined): string
```
- Comentario en codigo: `// Extrae informacion normalizada desde una entrada de dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `value` | `string | null | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `value.split`, `prefix?.trim`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `buildAutoplayArtistTokenSet` (`function`)
- Lineas: `44` -> `60`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildAutoplayArtistTokenSet(currentSong: Queue['songs'][number]): Set<string>
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `currentSong` | `Queue['songs'][number]` | no | no |
- Retorno: `Set<string>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `tokenizeComparableText`, `artistTokens.add`, `extractSongNamePrefix`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `buildCoreSongTokens` (`function`)
- Lineas: `63` -> `67`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildCoreSongTokens(title: string | null | undefined, artistTokens: Set<string>): string[]
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `title` | `string | null | undefined` | no | no |
| `artistTokens` | `Set<string>` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `tokenizeComparableText`, `titleTokens.filter`, `artistTokens.has`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `buildGenericNoiseTokenSet` (`function`)
- Lineas: `70` -> `86`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildGenericNoiseTokenSet(): Set<string>
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
- Parametros: ninguno.
- Retorno: `Set<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `extractSongNameSuffix` (`function`)
- Lineas: `89` -> `104`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractSongNameSuffix(value: string | null | undefined): string
```
- Comentario en codigo: `// Extrae informacion normalizada desde una entrada de dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `value` | `string | null | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `value
    .split('-')
    .map((part) => part.trim())
    .filter`, `value
    .split('-')
    .map`, `value
    .split`, `part.trim`, `value.trim`, `parts.slice(1).join`, `parts.slice`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `buildAutoplayKeywordTokens` (`function`)
- Lineas: `107` -> `113`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildAutoplayKeywordTokens(title: string | null | undefined): string[]
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `title` | `string | null | undefined` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `buildGenericNoiseTokenSet`, `buildCoreSongTokens`, `extractSongNameSuffix`, `baseTokens.filter`, `/^\d+$/.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `isKeywordRepeatAgainstRecentHistory` (`function`)
- Lineas: `116` -> `158`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isKeywordRepeatAgainstRecentHistory(candidate: AutoplayCandidate, recentReferences: AutoplayCandidate[]): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `candidate` | `AutoplayCandidate` | no | no |
| `recentReferences` | `AutoplayCandidate[]` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `6`
- Llamadas principales detectadas: `buildAutoplayKeywordTokens`, `recentReferences.slice`, `[...candidateKeywordSet].filter`, `referenceKeywordSet.has`, `[...candidateKeywordSet].every`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `isProbablySameCandidateVariant` (`function`)
- Lineas: `161` -> `204`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isProbablySameCandidateVariant(reference: AutoplayCandidate, candidate: AutoplayCandidate): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `reference` | `AutoplayCandidate` | no | no |
| `candidate` | `AutoplayCandidate` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `extractYouTubeVideoId`, `normalizeAutoplayComparableTitle`, `buildGenericNoiseTokenSet`, `buildCoreSongTokens`, `[...referenceCoreSet].filter`, `candidateCoreSet.has`, `[...referenceCoreSet].every`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `isProbablySameSongVariant` (`function`)
- Lineas: `207` -> `250`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isProbablySameSongVariant(currentSong: Queue['songs'][number], candidate: AutoplayCandidate): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `currentSong` | `Queue['songs'][number]` | no | no |
| `candidate` | `AutoplayCandidate` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `extractYouTubeVideoId`, `normalizeAutoplayComparableTitle`, `buildAutoplayArtistTokenSet`, `buildCoreSongTokens`, `[...currentCoreSet].every`, `candidateCoreSet.has`, `[...currentCoreSet].filter`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `buildQueueSongCandidate` (`function`)
- Lineas: `253` -> `271`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildQueueSongCandidate(song: Queue['songs'][number]): AutoplayCandidate
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `song` | `Queue['songs'][number]` | no | no |
- Retorno: `AutoplayCandidate`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `normalizeAutoplayComparableTitle`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/domain/autoplay-title-filters.ts`

**Responsabilidad:** Reglas puras de filtrado de titulos (ruido, live/concert, compilaciones pobres) para autoplay.

- Simbolos en este archivo: `4`
- Desglose: funciones=`4`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 8 | `function` | `normalizeAutoplayComparableTitle` |
| 2 | 30 | `function` | `titleLooksPoorForAutoplay` |
| 3 | 42 | `function` | `titleLooksLikeAutoplayLowQualityContainer` |
| 4 | 71 | `function` | `titleLooksLikeLiveConcertRecording` |

#### Detalle por simbolo

#### 1) `normalizeAutoplayComparableTitle` (`function`)
- Lineas: `8` -> `27`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
normalizeAutoplayComparableTitle(title: string | null | undefined): string
```
- Comentario en codigo: `// de candidatos. Son helpers puros (sin estado ni dependencias externas).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `title` | `string | null | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(ft|feat|featuring)\b\.?/g, ' ')
    .replace(
      /\b(official|video|audio|lyrics|lyric|hd|4k|remaster(ed)?|visualizer|mv|clip)\b/g,
      ' ',
    )
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim`, `title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(ft|feat|featuring)\b\.?/g, ' ')
    .replace(
      /\b(official|video|audio|lyrics|lyric|hd|4k|remaster(ed)?|visualizer|mv|clip)\b/g,
      ' ',
    )
    .replace(/[^a-z0-9]+/g, ' ')
    .replace`, `title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(ft|feat|featuring)\b\.?/g, ' ')
    .replace(
      /\b(official|video|audio|lyrics|lyric|hd|4k|remaster(ed)?|visualizer|mv|clip)\b/g,
      ' ',
    )
    .replace`, `title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(ft|feat|featuring)\b\.?/g, ' ')
    .replace`, `title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace`, `title
    .toLowerCase()
    .replace(/\[[^\]]*]/g, ' ')
    .replace`, `title
    .toLowerCase()
    .replace`, `title
    .toLowerCase`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `titleLooksPoorForAutoplay` (`function`)
- Lineas: `30` -> `39`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
titleLooksPoorForAutoplay(candidateTitle: string | null | undefined): boolean
```
- Comentario en codigo: `// Funcion pura de dominio reutilizable en multiples servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `candidateTitle` | `string | null | undefined` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `normalizeAutoplayComparableTitle`, `/\b(mix|playlist|compilation|full album|full)\b/.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `titleLooksLikeAutoplayLowQualityContainer` (`function`)
- Lineas: `42` -> `68`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
titleLooksLikeAutoplayLowQualityContainer(candidateTitle: string | null | undefined): boolean
```
- Comentario en codigo: `// Funcion pura de dominio reutilizable en multiples servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `candidateTitle` | `string | null | undefined` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `normalizeAutoplayComparableTitle`, `/\b(teaser|trailer)\b/.test`, `/\b(greatest hits|best of)\b/.test`, `/\btop\s+\d+\b/.test`, `/\b(full album|full mix|full playlist|full compilation|discography)\b/.test`, `/\b(megamix|playlist|compilation|mix)\b/.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `titleLooksLikeLiveConcertRecording` (`function`)
- Lineas: `71` -> `109`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
titleLooksLikeLiveConcertRecording(candidateTitle: string | null | undefined): boolean
```
- Comentario en codigo: `// Funcion pura de dominio reutilizable en multiples servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `candidateTitle` | `string | null | undefined` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `normalizeAutoplayComparableTitle`, `/\blive\b/.test`, `/\bconcert\b/.test`, `/\btour\b/.test`, `/\bfestival\b/.test`, `/\barena\b/.test`, `/\bstadium\b/.test`, `/\bdome\b/.test`, `/\bsetlist\b/.test`, `/\bfull show\b/.test`, `/\blive concert\b/.test`, `/\bfull concert\b/.test`, `/\bconcert live\b/.test`, `/\blive (at|in|from)\b/.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/domain/source-url-utils.ts`

**Responsabilidad:** Utilidades puras de parsing/deteccion de URLs (YouTube, Spotify, búsquedas yt-dlp).

- Simbolos en este archivo: `9`
- Desglose: funciones=`9`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 5 | `function` | `parseUrlSafely` |
| 2 | 14 | `function` | `isYouTubeHost` |
| 3 | 20 | `function` | `isYouTubePlaylistLikeUrl` |
| 4 | 30 | `function` | `isSpotifyTrackUrl` |
| 5 | 45 | `function` | `isSpotifyPlaylistLikeUrl` |
| 6 | 60 | `function` | `extractYouTubePlaylistId` |
| 7 | 70 | `function` | `buildCanonicalYouTubePlaylistUrl` |
| 8 | 75 | `function` | `extractYouTubeVideoId` |
| 9 | 100 | `function` | `isYtDlpSearchInput` |

#### Detalle por simbolo

#### 1) `parseUrlSafely` (`function`)
- Lineas: `5` -> `11`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
parseUrlSafely(value: string): URL | null
```
- Comentario en codigo: `@file src/modules/music/domain/source-url-utils.ts @description Utilidades puras de parsing/deteccion de URLs (YouTube, Spotify, búsquedas yt-dlp).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `value` | `string` | no | no |
- Retorno: `URL | null`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `isYouTubeHost` (`function`)
- Lineas: `14` -> `17`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isYouTubeHost(hostname: string): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `hostname` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `hostname.toLowerCase`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `isYouTubePlaylistLikeUrl` (`function`)
- Lineas: `20` -> `27`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isYouTubePlaylistLikeUrl(input: string): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `parseUrlSafely`, `isYouTubeHost`, `url.searchParams.has`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `isSpotifyTrackUrl` (`function`)
- Lineas: `30` -> `42`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isSpotifyTrackUrl(input: string): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `parseUrlSafely`, `url.hostname.toLowerCase`, `/^\/track\/[^/]+/i.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `isSpotifyPlaylistLikeUrl` (`function`)
- Lineas: `45` -> `57`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isSpotifyPlaylistLikeUrl(input: string): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `parseUrlSafely`, `url.hostname.toLowerCase`, `/^\/(playlist|album)\/[^/]+/i.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `extractYouTubePlaylistId` (`function`)
- Lineas: `60` -> `67`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractYouTubePlaylistId(urlValue: string): string | null
```
- Comentario en codigo: `// Extrae informacion normalizada desde una entrada de dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `urlValue` | `string` | no | no |
- Retorno: `string | null`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `parseUrlSafely`, `isYouTubeHost`, `url.searchParams.get`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `buildCanonicalYouTubePlaylistUrl` (`function`)
- Lineas: `70` -> `72`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildCanonicalYouTubePlaylistUrl(playlistId: string): string
```
- Comentario en codigo: `// Construye un valor derivado de dominio sin efectos secundarios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `playlistId` | `string` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `extractYouTubeVideoId` (`function`)
- Lineas: `75` -> `97`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractYouTubeVideoId(url: string | null | undefined): string | null
```
- Comentario en codigo: `// Extrae informacion normalizada desde una entrada de dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `url` | `string | null | undefined` | no | no |
- Retorno: `string | null`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `url.match`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `isYtDlpSearchInput` (`function`)
- Lineas: `100` -> `104`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isYtDlpSearchInput(input: string): boolean
```
- Comentario en codigo: `// Regla pura de validacion booleana usada por el dominio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `/^(ytsearch:|scsearch:)/i.test`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/errors.ts`

**Responsabilidad:** Errores de dominio/control del modulo de musica para separar errores de usuario de errores tecnicos.

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/modules/music/handlers/button-interaction-handler.ts`

**Responsabilidad:** Handler de interacciones de UI (botones) del reproductor de musica; traduce eventos de Discord a acciones de servicio.

- Simbolos en este archivo: `7`
- Desglose: funciones=`7`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 20 | `function` | `scheduleEphemeralDeletion` |
| 2 | 32 | `function` | `replyEphemeralAutoDelete` |
| 3 | 45 | `function` | `followUpEphemeralAutoDelete` |
| 4 | 58 | `function` | `followUpEphemeral` |
| 5 | 67 | `function` | `parseMusicButtonAction` |
| 6 | 86 | `function` | `shouldShowAutoplaySkipProgressNotice` |
| 7 | 102 | `function` | `handleMusicButtonInteraction` |

#### Detalle por simbolo

#### 1) `scheduleEphemeralDeletion` (`function`)
- Lineas: `20` -> `29`
- Acceso: `public`
- Async: no
- Resumen funcional: Controla temporizadores o tareas diferidas del sistema.
- Firma:
```ts
scheduleEphemeralDeletion(task: () => Promise<void>): void
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `task` | `() => Promise<void>` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `setTimeout`, `task().catch`, `task`, `timeout.unref`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `replyEphemeralAutoDelete` (`function`)
- Lineas: `32` -> `42`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async replyEphemeralAutoDelete(interaction: ButtonInteraction, content: string): Promise<void>
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ButtonInteraction` | no | no |
| `content` | `string` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `interaction.reply`, `scheduleEphemeralDeletion`, `interaction.deleteReply`
- Await detectados: `interaction.reply`, `interaction.deleteReply`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `followUpEphemeralAutoDelete` (`function`)
- Lineas: `45` -> `55`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async followUpEphemeralAutoDelete(interaction: ButtonInteraction, content: string): Promise<void>
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ButtonInteraction` | no | no |
| `content` | `string` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `interaction.followUp`, `scheduleEphemeralDeletion`, `interaction.webhook.deleteMessage`
- Await detectados: `interaction.followUp`, `interaction.webhook.deleteMessage`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `followUpEphemeral` (`function`)
- Lineas: `58` -> `64`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async followUpEphemeral(interaction: ButtonInteraction, content: string): Promise<Message<boolean>>
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ButtonInteraction` | no | no |
| `content` | `string` | no | no |
- Retorno: `Promise<Message<boolean>>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `interaction.followUp`
- Await detectados: ninguna
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `parseMusicButtonAction` (`function`)
- Lineas: `67` -> `83`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
parseMusicButtonAction(customId: string): MusicButtonAction | null
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `customId` | `string` | no | no |
- Retorno: `MusicButtonAction | null`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `customId.startsWith`, `customId.slice`, `MUSIC_BUTTON_ACTIONS.includes`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `shouldShowAutoplaySkipProgressNotice` (`function`)
- Lineas: `86` -> `99`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
shouldShowAutoplaySkipProgressNotice(interaction: ButtonInteraction): boolean
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ButtonInteraction` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `getMusicPlayer().getQueue`, `getMusicPlayer`, `Boolean`
- Await detectados: ninguna
- Efectos secundarios detectados: `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `handleMusicButtonInteraction` (`function`)
- Lineas: `102` -> `205`
- Acceso: `public`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handleMusicButtonInteraction(interaction: ButtonInteraction): Promise<boolean>
```
- Comentario en codigo: `// Traduce una interaccion de Discord a una accion concreta del servicio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ButtonInteraction` | no | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `7`
- Llamadas principales detectadas: `parseMusicButtonAction`, `musicService.getQueueSummary`, `replyEphemeralAutoDelete`, `getMusicErrorMessage`, `interaction.deferUpdate`, `musicService.back`, `musicService.clearQueue`, `musicService.togglePauseResume`, `shouldShowAutoplaySkipProgressNotice`, `musicService.isGuildBusy`, `followUpEphemeral`, `musicAutoplayProgressNoticeService.track`, `scheduleEphemeralDeletion`, `interaction.webhook.deleteMessage`
- Await detectados: `musicService.getQueueSummary`, `replyEphemeralAutoDelete`, `interaction.deferUpdate`, `musicService.back`, `musicService.clearQueue`, `musicService.togglePauseResume`, `followUpEphemeral`, `interaction.webhook.deleteMessage`, `musicService.skip`, `musicService.setAutoplay`
- Efectos secundarios detectados: `discord_messages`, `playback_control`, `state_mutation`, `error_control`
- Control de errores: 0 throw(s), 2 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/logger.ts`

**Responsabilidad:** Logger dedicado del modulo de musica con convenciones de campos para trazabilidad operacional.

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/modules/music/music-player.ts`

**Responsabilidad:** Factory/singleton del reproductor (DisTube + plugins): inicializacion de infraestructura de audio y acceso compartido.

- Simbolos en este archivo: `5`
- Desglose: funciones=`5`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 19 | `function` | `createSpotifyPlugin` |
| 2 | 38 | `function` | `createYouTubeExtractorPluginForSearchOnly` |
| 3 | 53 | `function` | `registerMusicEvents` |
| 4 | 309 | `function` | `initializeMusicPlayer` |
| 5 | 348 | `function` | `getMusicPlayer` |

#### Detalle por simbolo

#### 1) `createSpotifyPlugin` (`function`)
- Lineas: `19` -> `35`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createSpotifyPlugin(): SpotifyPlugin
```
- Comentario en codigo: `// Funcion de soporte del modulo.`
- Parametros: ninguno.
- Retorno: `SpotifyPlugin`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `createYouTubeExtractorPluginForSearchOnly` (`function`)
- Lineas: `38` -> `50`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createYouTubeExtractorPluginForSearchOnly(): YouTubePlugin
```
- Comentario en codigo: `// Funcion de soporte del modulo.`
- Parametros: ninguno.
- Retorno: `YouTubePlugin`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `registerMusicEvents` (`function`)
- Lineas: `53` -> `306`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
registerMusicEvents(player: DisTube): void
```
- Comentario en codigo: `// Funcion de soporte del modulo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `player` | `DisTube` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `10`
- Llamadas principales detectadas: `player.on`, `musicAutoplayProgressNoticeService.clear`, `musicInactivityService.notifyPlaybackActive`, `musicService.rememberStartedQueueSong`, `musicLogger.info`, `musicService.syncAutoplayPrefetchForQueue`, `musicControlMessageService.syncNowPlaying`, `musicService.getNowPlayingPanelOptions`, `musicService.continueAutoplayAfterFinish`, `musicService.clearAutoplayPrefetch`, `musicInactivityService.scheduleNoPlaybackDisconnect`, `musicControlMessageService.syncIdle`, `musicService.consumeAutoplayDeleteQueueContinuationSuppression`, `musicService.clearProgressivePlaylistLoad`
- Await detectados: `musicAutoplayProgressNoticeService.clear`, `musicControlMessageService.syncNowPlaying`, `musicService.continueAutoplayAfterFinish`, `musicControlMessageService.syncIdle`, `queue.textChannel.send`
- Efectos secundarios detectados: `state_mutation`, `logging`, `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `initializeMusicPlayer` (`function`)
- Lineas: `309` -> `345`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
initializeMusicPlayer(client: Client): DisTube
```
- Comentario en codigo: `// Funcion de soporte del modulo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `client` | `Client` | no | no |
- Retorno: `DisTube`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `createSpotifyPlugin`, `createYouTubeExtractorPluginForSearchOnly`, `musicInactivityService.bindClient`, `registerMusicEvents`, `musicLogger.info`, `musicService.verifyBundledYtDlpBinaryOnStartup`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `getMusicPlayer` (`function`)
- Lineas: `348` -> `355`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getMusicPlayer(): DisTube
```
- Comentario en codigo: `// Funcion de soporte del modulo.`
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new Error('Music player no inicializado. Llama initializeMusicPlayer(client) primero.')`

### `src/modules/music/services/autoplay-candidate-resolver-service.ts`

**Responsabilidad:** Resuelve candidatos de autoplay combinando busquedas, filtros y scoring para elegir siguiente pista.

- Simbolos en este archivo: `6`
- Desglose: funciones=`2`, metodos=`4`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 45 | `getter` | `player` |
| 2 | 50 | `getter` | `autoplayRandomPoolSize` |
| 3 | 54 | `method` | `collectAutoplayReferenceCandidates` |
| 4 | 58 | `method` | `extractResolvableUrlsFromYtDlpResult` |
| 5 | 62 | `method` | `scoreAutoplayCandidate` |
| 6 | 89 | `method` | `buildAutoplayFallbackCandidate` |

#### Detalle por simbolo

#### 1) `player` (`getter`)
- Lineas: `45` -> `47`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `autoplayRandomPoolSize` (`getter`)
- Lineas: `50` -> `52`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get autoplayRandomPoolSize(): number
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `collectAutoplayReferenceCandidates` (`method`)
- Lineas: `54` -> `56`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
collectAutoplayReferenceCandidates(queue: Queue): AutoplayCandidate[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `AutoplayCandidate[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.collectAutoplayReferenceCandidates`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `extractResolvableUrlsFromYtDlpResult` (`method`)
- Lineas: `58` -> `60`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayYtDlpQueryService.extractResolvableUrlsFromYtDlpResult`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `scoreAutoplayCandidate` (`method`)
- Lineas: `62` -> `86`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
scoreAutoplayCandidate(currentSong: Queue['songs'][number], candidate: AutoplayCandidate): number
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `currentSong` | `Queue['songs'][number]` | no | no |
| `candidate` | `AutoplayCandidate` | no | no |
- Retorno: `number`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `titleLooksPoorForAutoplay`, `tokenizeComparableText`, `[...currentTitleTokens].filter`, `candidateTitleTokens.has`, `candidate.name.trim`, `Math.random`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `buildAutoplayFallbackCandidate` (`method`)
- Lineas: `89` -> `310`
- Acceso: `public`
- Async: si
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
async buildAutoplayFallbackCandidate(queue: Queue, seedSong?: Queue['songs'][number]): Promise<AutoplayCandidate | null>
```
- Comentario en codigo: `// Construye datos de trabajo para el siguiente paso del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | si | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `18`
- Llamadas principales detectadas: `[currentSong.name, currentSong.uploader?.name].filter(Boolean).join(' ').trim`, `[currentSong.name, currentSong.uploader?.name].filter(Boolean).join`, `[currentSong.name, currentSong.uploader?.name].filter`, `this.player.plugins.find`, `searchQueries.push`, `[currentSong.uploader?.name, extractSongNamePrefix(currentSong.name)]
      .filter((value): value is string => Boolean(value && value.trim()))
      .map`, `[currentSong.uploader?.name, extractSongNamePrefix(currentSong.name)]
      .filter`, `extractSongNamePrefix`, `Boolean`, `value.trim`, `this.collectAutoplayReferenceCandidates`, `references.slice`, `Math.max`, `plugin.resolve`
- Await detectados: `plugin.resolve`, `this.autoplayYtDlpQueryService.loadAutoplaySearchCandidatesWithYtDlpCli`
- Efectos secundarios detectados: `playback_control`, `state_mutation`, `logging`, `error_control`
- Control de errores: 0 throw(s), 2 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-continuation-guard-service.ts`

**Responsabilidad:** Orquesta guardas de seguridad para continuacion de autoplay (rechecks, supresiones y estado por guild).

- Simbolos en este archivo: `5`
- Desglose: funciones=`1`, metodos=`4`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 38 | `method` | `clearAutoplayContinuationAutoplayRecheck` |
| 2 | 56 | `method` | `scheduleAutoplayContinuationAutoplayRecheck` |
| 3 | 212 | `method` | `suppressAutoplayContinuationOnDeleteQueue` |
| 4 | 232 | `method` | `consumeAutoplayDeleteQueueContinuationSuppression` |
| 5 | 255 | `function` | `createAutoplayContinuationGuardService` |

#### Detalle por simbolo

#### 1) `clearAutoplayContinuationAutoplayRecheck` (`method`)
- Lineas: `38` -> `53`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearAutoplayContinuationAutoplayRecheck(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get`, `this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete`, `musicLogger.info`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `scheduleAutoplayContinuationAutoplayRecheck` (`method`)
- Lineas: `56` -> `210`
- Acceso: `public`
- Async: no
- Resumen funcional: Controla temporizadores o tareas diferidas del sistema.
- Firma:
```ts
scheduleAutoplayContinuationAutoplayRecheck(guildId: string, context: 'finish' | 'delete_queue', expectedCandidate: AutoplayCandidate): void
```
- Comentario en codigo: `// Programa ejecucion diferida de un recheck o timeout.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `context` | `'finish' | 'delete_queue'` | no | no |
| `expectedCandidate` | `AutoplayCandidate` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `9`
- Llamadas principales detectadas: `Symbol`, `buildAutoplayCandidateKey`, `this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.set`, `musicLogger.info`, `(async () => {
      for (const delayMs of AUTOPLAY_CONTINUATION_AUTOPLAY_RECHECK_DELAYS_MS) {
        await waitMs(delayMs);

        if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) !== token) {
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_cancelled',
              guildId,
              context,
              delayMs,
              reason: 'superseded_or_cleared',
            },
            'autoplay continuation autoplay recheck cancelled',
          );
          return;
        }

        const queue = this.deps.getQueue(guildId);
        if (!queue || queue.songs.length === 0) {
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_state',
              guildId,
              context,
              delayMs,
              status: 'queue_missing_or_empty',
              queuePresent: Boolean(queue),
              queueSize: queue?.songs.length ?? 0,
              queueAutoplay: queue?.autoplay ?? null,
            },
            'autoplay continuation autoplay recheck observed no active queue yet',
          );
          continue;
        }

        const currentSong = queue.songs[0];
        const currentCandidateKey = currentSong
          ? buildAutoplayCandidateKey(buildQueueSongCandidate(currentSong))
          : 'missing';
        const currentSongMatchesExpected = currentCandidateKey === expectedCandidateKey;

        musicLogger.info(
          {
            event: 'autoplay_continuation_autoplay_recheck_state',
            guildId,
            context,
            delayMs,
            status: 'queue_present',
            queueSize: queue.songs.length,
            queueAutoplay: queue.autoplay,
            currentSong: currentSong?.name,
            currentSongMatchesExpected,
          },
          'autoplay continuation autoplay recheck observed queue state',
        );

        if (!currentSongMatchesExpected) {
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_cancelled',
              guildId,
              context,
              delayMs,
              reason: 'current_song_changed',
              currentSong: currentSong?.name,
            },
            'autoplay continuation autoplay recheck cancelled because current song changed',
          );
          return;
        }

        if (queue.autoplay) {
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_ok',
              guildId,
              context,
              delayMs,
              currentSong: currentSong?.name,
            },
            'autoplay continuation autoplay recheck confirmed autoplay is enabled',
          );
          return;
        }

        queue.toggleAutoplay();
        musicLogger.warn(
          {
            event: 'autoplay_continuation_autoplay_recheck_restored',
            guildId,
            context,
            delayMs,
            currentSong: currentSong?.name,
            queueAutoplayAfterRestore: queue.autoplay,
          },
          'autoplay was disabled after continuation and has been restored by delayed recheck',
        );

        if (queue.autoplay) {
          this.deps.syncAutoplayPrefetchForQueue(queue);
          await this.deps.syncNowPlayingPanel(queue);
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          return;
        }
      }

      if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) === token) {
        this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
        musicLogger.warn(
          {
            event: 'autoplay_continuation_autoplay_recheck_exhausted',
            guildId,
            context,
          },
          'autoplay continuation autoplay recheck exhausted all attempts',
        );
      }
    })().catch`, `(async () => {
      for (const delayMs of AUTOPLAY_CONTINUATION_AUTOPLAY_RECHECK_DELAYS_MS) {
        await waitMs(delayMs);

        if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) !== token) {
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_cancelled',
              guildId,
              context,
              delayMs,
              reason: 'superseded_or_cleared',
            },
            'autoplay continuation autoplay recheck cancelled',
          );
          return;
        }

        const queue = this.deps.getQueue(guildId);
        if (!queue || queue.songs.length === 0) {
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_state',
              guildId,
              context,
              delayMs,
              status: 'queue_missing_or_empty',
              queuePresent: Boolean(queue),
              queueSize: queue?.songs.length ?? 0,
              queueAutoplay: queue?.autoplay ?? null,
            },
            'autoplay continuation autoplay recheck observed no active queue yet',
          );
          continue;
        }

        const currentSong = queue.songs[0];
        const currentCandidateKey = currentSong
          ? buildAutoplayCandidateKey(buildQueueSongCandidate(currentSong))
          : 'missing';
        const currentSongMatchesExpected = currentCandidateKey === expectedCandidateKey;

        musicLogger.info(
          {
            event: 'autoplay_continuation_autoplay_recheck_state',
            guildId,
            context,
            delayMs,
            status: 'queue_present',
            queueSize: queue.songs.length,
            queueAutoplay: queue.autoplay,
            currentSong: currentSong?.name,
            currentSongMatchesExpected,
          },
          'autoplay continuation autoplay recheck observed queue state',
        );

        if (!currentSongMatchesExpected) {
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_cancelled',
              guildId,
              context,
              delayMs,
              reason: 'current_song_changed',
              currentSong: currentSong?.name,
            },
            'autoplay continuation autoplay recheck cancelled because current song changed',
          );
          return;
        }

        if (queue.autoplay) {
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          musicLogger.info(
            {
              event: 'autoplay_continuation_autoplay_recheck_ok',
              guildId,
              context,
              delayMs,
              currentSong: currentSong?.name,
            },
            'autoplay continuation autoplay recheck confirmed autoplay is enabled',
          );
          return;
        }

        queue.toggleAutoplay();
        musicLogger.warn(
          {
            event: 'autoplay_continuation_autoplay_recheck_restored',
            guildId,
            context,
            delayMs,
            currentSong: currentSong?.name,
            queueAutoplayAfterRestore: queue.autoplay,
          },
          'autoplay was disabled after continuation and has been restored by delayed recheck',
        );

        if (queue.autoplay) {
          this.deps.syncAutoplayPrefetchForQueue(queue);
          await this.deps.syncNowPlayingPanel(queue);
          this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
          return;
        }
      }

      if (this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get(guildId) === token) {
        this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete(guildId);
        musicLogger.warn(
          {
            event: 'autoplay_continuation_autoplay_recheck_exhausted',
            guildId,
            context,
          },
          'autoplay continuation autoplay recheck exhausted all attempts',
        );
      }
    })`, `waitMs`, `this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.get`, `this.deps.getQueue`, `Boolean`, `buildQueueSongCandidate`, `this.deps.autoplayContinuationAutoplayRecheckTokenByGuild.delete`, `queue.toggleAutoplay`, `musicLogger.warn`
- Await detectados: `waitMs`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `state_mutation`, `logging`, `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `suppressAutoplayContinuationOnDeleteQueue` (`method`)
- Lineas: `212` -> `229`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
suppressAutoplayContinuationOnDeleteQueue(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `Date.now`, `this.deps.autoplayDeleteQueueContinuationSuppressionByGuild.set`, `musicLogger.info`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `consumeAutoplayDeleteQueueContinuationSuppression` (`method`)
- Lineas: `232` -> `251`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
consumeAutoplayDeleteQueueContinuationSuppression(guildId: string): { reason: string; ageMs: number } | null
```
- Comentario en codigo: `// Consume estado transitorio de un solo uso.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `{ reason: string; ageMs: number } | null`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.deps.autoplayDeleteQueueContinuationSuppressionByGuild.get`, `this.deps.autoplayDeleteQueueContinuationSuppressionByGuild.delete`, `Date.now`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `createAutoplayContinuationGuardService` (`function`)
- Lineas: `255` -> `259`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayContinuationGuardService(deps: AutoplayContinuationGuardServiceDeps): AutoplayContinuationGuardService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayContinuationGuardServiceDeps` | no | no |
- Retorno: `AutoplayContinuationGuardService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-continuation-service.ts`

**Responsabilidad:** Implementa la continuacion de reproduccion por autoplay al finalizar cola o limpiar cola, con locks y contexto.

- Simbolos en este archivo: `2`
- Desglose: funciones=`1`, metodos=`1`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 56 | `method` | `continueAutoplayAfterFinish` |
| 2 | 306 | `function` | `createAutoplayContinuationService` |

#### Detalle por simbolo

#### 1) `continueAutoplayAfterFinish` (`method`)
- Lineas: `56` -> `302`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async continueAutoplayAfterFinish(queue: Queue, context?: AutoplayContinuationContext): Promise<boolean>
```
- Comentario en codigo: `// Continua el flujo automaticamente tras un evento terminal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `context` | `AutoplayContinuationContext` | si | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `16`
- Llamadas principales detectadas: `musicLogger.info`, `this.deps.getLastStartedSong`, `this.deps.getAutoplayPrefetchDebugSnapshot`, `Boolean`, `this.deps.withGuildLock`, `this.deps.getQueue`, `this.deps.getAutoplayFallbackCandidateWithPrefetch`, `this.deps.getAutoplayFallbackCandidateFromExistingPrefetch`, `Date.now`, `this.deps.playerPlay`, `musicLogger.warn`, `buildAutoplayCandidateKey`, `buildQueueSongCandidate`, `queueAfterContinuationPlay.previousSongs.unshift`
- Await detectados: `this.deps.withGuildLock`, `this.deps.getAutoplayFallbackCandidateWithPrefetch`, `this.deps.getAutoplayFallbackCandidateFromExistingPrefetch`, `this.deps.playerPlay`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `logging`, `state_mutation`, `playback_control`, `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `createAutoplayContinuationService` (`function`)
- Lineas: `306` -> `310`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayContinuationService(deps: AutoplayContinuationServiceDeps): AutoplayContinuationService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayContinuationServiceDeps` | no | no |
- Retorno: `AutoplayContinuationService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-history-service.ts`

**Responsabilidad:** Mantiene historial reciente de autoplay y utilidades de contexto para evitar repeticiones.

- Simbolos en este archivo: `10`
- Desglose: funciones=`4`, metodos=`6`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 29 | `getter` | `lastStartedSongByGuild` |
| 2 | 34 | `getter` | `autoplayRecentByGuild` |
| 3 | 39 | `getter` | `autoplayRecentLimit` |
| 4 | 44 | `getter` | `autoplayRecentTtlMs` |
| 5 | 48 | `method` | `pruneAutoplayRecentHistory` |
| 6 | 70 | `method` | `rememberAutoplayTrack` |
| 7 | 85 | `method` | `isAutoplayAttributedQueueSong` |
| 8 | 105 | `method` | `getRequestedByLabelForQueueSong` |
| 9 | 122 | `method` | `rememberStartedQueueSong` |
| 10 | 142 | `method` | `collectAutoplayReferenceCandidates` |

#### Detalle por simbolo

#### 1) `lastStartedSongByGuild` (`getter`)
- Lineas: `29` -> `31`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get lastStartedSongByGuild(): Map<string, Song<unknown>>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, Song<unknown>>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `autoplayRecentByGuild` (`getter`)
- Lineas: `34` -> `36`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get autoplayRecentByGuild(): Map<string, AutoplayRecentTrack[]>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, AutoplayRecentTrack[]>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `autoplayRecentLimit` (`getter`)
- Lineas: `39` -> `41`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get autoplayRecentLimit(): number
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `autoplayRecentTtlMs` (`getter`)
- Lineas: `44` -> `46`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get autoplayRecentTtlMs(): number
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `pruneAutoplayRecentHistory` (`method`)
- Lineas: `48` -> `67`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
pruneAutoplayRecentHistory(guildId: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.autoplayRecentByGuild.get`, `Date.now`, `entries
      .filter((entry) => entry.addedAt >= cutoff)
      .slice`, `entries
      .filter`, `this.autoplayRecentByGuild.delete`, `this.autoplayRecentByGuild.set`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `rememberAutoplayTrack` (`method`)
- Lineas: `70` -> `83`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberAutoplayTrack(guildId: string, track: AutoplayCandidate): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `track` | `AutoplayCandidate` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.pruneAutoplayRecentHistory`, `this.autoplayRecentByGuild.get`, `Date.now`, `entries.filter`, `isProbablySameCandidateVariant`, `this.autoplayRecentByGuild.set`, `[nextEntry, ...deduped].slice`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `isAutoplayAttributedQueueSong` (`method`)
- Lineas: `85` -> `103`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isAutoplayAttributedQueueSong(guildId: string, song: Queue['songs'][number] | undefined): boolean
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `song` | `Queue['songs'][number] | undefined` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.pruneAutoplayRecentHistory`, `this.autoplayRecentByGuild.get`, `buildQueueSongCandidate`, `recentEntries.some`, `isProbablySameCandidateVariant`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `getRequestedByLabelForQueueSong` (`method`)
- Lineas: `105` -> `119`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getRequestedByLabelForQueueSong(guildId: string, song: Queue['songs'][number] | undefined): string
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `song` | `Queue['songs'][number] | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.isAutoplayAttributedQueueSong`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `rememberStartedQueueSong` (`method`)
- Lineas: `122` -> `140`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberStartedQueueSong(queue: Queue): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.lastStartedSongByGuild.set`, `musicLogger.info`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `collectAutoplayReferenceCandidates` (`method`)
- Lineas: `142` -> `169`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
collectAutoplayReferenceCandidates(queue: Queue): AutoplayCandidate[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `AutoplayCandidate[]`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `queue.songs.slice`, `references.push`, `buildQueueSongCandidate`, `queue.previousSongs.slice`, `this.pruneAutoplayRecentHistory`, `this.autoplayRecentByGuild.get`, `buildAutoplayCandidateKey`, `unique.has`, `unique.set`, `unique.values`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-prefetch-candidate-access-service.ts`

**Responsabilidad:** Gestiona acceso/consumo de candidatos prefetch de autoplay (hit/miss, snapshot, validaciones).

- Simbolos en este archivo: `4`
- Desglose: funciones=`1`, metodos=`3`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 40 | `method` | `getAutoplayFallbackCandidateWithPrefetch` |
| 2 | 101 | `method` | `getAutoplayPrefetchDebugSnapshot` |
| 3 | 115 | `method` | `getAutoplayFallbackCandidateFromExistingPrefetch` |
| 4 | 181 | `function` | `createAutoplayPrefetchCandidateAccessService` |

#### Detalle por simbolo

#### 1) `getAutoplayFallbackCandidateWithPrefetch` (`method`)
- Lineas: `40` -> `99`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getAutoplayFallbackCandidateWithPrefetch(queue: Queue, seedSong: Queue['songs'][number]): Promise<AutoplayCandidate | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | no | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `this.deps.buildAutoplaySeedKey`, `this.deps.autoplayPrefetchByGuild.get`, `musicLogger.info`, `Date.now`, `this.deps.startAutoplayPrefetchForSeed`, `this.deps.buildAutoplayFallbackCandidate`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `getAutoplayPrefetchDebugSnapshot` (`method`)
- Lineas: `101` -> `113`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchDebugSnapshot(guildId: string): AutoplayPrefetchDebugSnapshot
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `AutoplayPrefetchDebugSnapshot`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.autoplayPrefetchByGuild.get`, `Date.now`, `Boolean`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `getAutoplayFallbackCandidateFromExistingPrefetch` (`method`)
- Lineas: `115` -> `177`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getAutoplayFallbackCandidateFromExistingPrefetch(guildId: string, context: AutoplayPrefetchContinuationContext): Promise<AutoplayCandidate | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `context` | `AutoplayPrefetchContinuationContext` | no | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.deps.autoplayPrefetchByGuild.get`, `musicLogger.info`, `Date.now`, `Boolean`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `createAutoplayPrefetchCandidateAccessService` (`function`)
- Lineas: `181` -> `185`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayPrefetchCandidateAccessService(deps: AutoplayPrefetchCandidateAccessServiceDeps): AutoplayPrefetchCandidateAccessService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayPrefetchCandidateAccessServiceDeps` | no | no |
- Retorno: `AutoplayPrefetchCandidateAccessService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-prefetch-orchestrator-service.ts`

**Responsabilidad:** Coordina ciclo de vida del prefetch de autoplay (start, ready, invalidation, sincronizacion).

- Simbolos en este archivo: `3`
- Desglose: funciones=`1`, metodos=`2`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 35 | `method` | `startAutoplayPrefetchForSeed` |
| 2 | 156 | `method` | `syncAutoplayPrefetchForQueue` |
| 3 | 226 | `function` | `createAutoplayPrefetchOrchestratorService` |

#### Detalle por simbolo

#### 1) `startAutoplayPrefetchForSeed` (`method`)
- Lineas: `35` -> `153`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
startAutoplayPrefetchForSeed(queue: Queue, seedSong: Queue['songs'][number]): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `6`
- Llamadas principales detectadas: `this.deps.buildAutoplaySeedKey`, `this.deps.autoplayPrefetchByGuild.get`, `musicLogger.info`, `Date.now`, `this.deps.invalidateAutoplayPrefetch`, `Symbol`, `Promise.resolve`, `(async () => {
      try {
        const candidate = await this.deps.buildAutoplayFallbackCandidate(queue, seedSong);
        const active = this.deps.autoplayPrefetchByGuild.get(queue.id);

        if (!active || active.token !== token) {
          musicLogger.info(
            {
              event: 'autoplay_prefetch_discarded',
              guildId: queue.id,
              seedName,
              reason: 'prefetch_invalidated_before_resolution',
            },
            'autoplay prefetch result discarded',
          );
          return candidate;
        }

        active.candidate = candidate;
        active.status = candidate ? 'ready' : 'empty';

        musicLogger.info(
          {
            event: 'autoplay_prefetch_ready',
            guildId: queue.id,
            seedName,
            hasCandidate: Boolean(candidate),
            durationMs: Date.now() - state.startedAt,
          },
          'autoplay prefetch resolved',
        );

        // Si la recomendacion ya quedo lista mientras sigue sonando la misma pista,
        // refrescamos panel para mostrar `Siguiente` sin esperar otro evento/accion.
        const latestQueue = this.deps.getQueue(queue.id);
        if (
          latestQueue &&
          latestQueue.autoplay &&
          latestQueue.songs.length === 1 &&
          this.deps.buildAutoplaySeedKey(latestQueue.songs[0]!) === seedKey
        ) {
          void this.deps.syncNowPlayingPanel(latestQueue);
        }

        return candidate;
      } catch (error) {
        const active = this.deps.autoplayPrefetchByGuild.get(queue.id);
        if (active?.token === token) {
          active.status = 'failed';
          active.candidate = null;
        }

        const normalizedError = toLoggableErrorMessage(error);
        musicLogger.warn(
          {
            event: 'autoplay_prefetch_failed',
            guildId: queue.id,
            seedName,
            errorMessage: normalizedError.message,
            errorMessageLength: normalizedError.originalLength,
            errorMessageTruncated: normalizedError.truncated,
          },
          'autoplay prefetch failed',
        );
        return null;
      }
    })`, `this.deps.buildAutoplayFallbackCandidate`, `Boolean`, `this.deps.getQueue`, `this.deps.syncNowPlayingPanel`, `toLoggableErrorMessage`, `musicLogger.warn`
- Await detectados: `this.deps.buildAutoplayFallbackCandidate`
- Efectos secundarios detectados: `logging`, `state_mutation`, `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `syncAutoplayPrefetchForQueue` (`method`)
- Lineas: `156` -> `222`
- Acceso: `public`
- Async: no
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
syncAutoplayPrefetchForQueue(queue: Queue): void
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `musicLogger.info`, `this.deps.invalidateAutoplayPrefetch`, `this.startAutoplayPrefetchForSeed`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `createAutoplayPrefetchOrchestratorService` (`function`)
- Lineas: `226` -> `230`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayPrefetchOrchestratorService(deps: AutoplayPrefetchOrchestratorServiceDeps): AutoplayPrefetchOrchestratorService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayPrefetchOrchestratorServiceDeps` | no | no |
- Retorno: `AutoplayPrefetchOrchestratorService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-prefetch-read-service.ts`

**Responsabilidad:** Expone lecturas para UI sobre estado/recomendacion de autoplay sin mutar estado.

- Simbolos en este archivo: `4`
- Desglose: funciones=`1`, metodos=`3`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 29 | `method` | `getAutoplayPrefetchRecommendationLabel` |
| 2 | 38 | `method` | `getAutoplayPrefetchDisplay` |
| 3 | 57 | `method` | `getNowPlayingPanelOptions` |
| 4 | 90 | `function` | `createAutoplayPrefetchReadService` |

#### Detalle por simbolo

#### 1) `getAutoplayPrefetchRecommendationLabel` (`method`)
- Lineas: `29` -> `36`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchRecommendationLabel(guildId: string): string | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `string | null`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.getAutoplayPrefetchState`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `getAutoplayPrefetchDisplay` (`method`)
- Lineas: `38` -> `55`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchDisplay(guildId: string): AutoplayPrefetchDisplay
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `AutoplayPrefetchDisplay`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.deps.getAutoplayPrefetchState`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `getNowPlayingPanelOptions` (`method`)
- Lineas: `57` -> `86`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNowPlayingPanelOptions(queue: Queue): {
    autoplayRecommendationLabel?: string;
    nextTrackFieldName?: string;
    requestedByLabel?: string;
  }
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `{
    autoplayRecommendationLabel?: string;
    nextTrackFieldName?: string;
    requestedByLabel?: string;
  }`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.deps.getRequestedByLabelForQueueSong`, `this.getAutoplayPrefetchDisplay`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `createAutoplayPrefetchReadService` (`function`)
- Lineas: `90` -> `94`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayPrefetchReadService(deps: AutoplayPrefetchReadServiceDeps): AutoplayPrefetchReadService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayPrefetchReadServiceDeps` | no | no |
- Retorno: `AutoplayPrefetchReadService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-prefetch-state-service.ts`

**Responsabilidad:** Gestiona estado interno de prefetch por guild (keys, limpieza e invalidacion).

- Simbolos en este archivo: `4`
- Desglose: funciones=`1`, metodos=`3`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 24 | `method` | `buildAutoplaySeedKey` |
| 2 | 28 | `method` | `invalidateAutoplayPrefetch` |
| 3 | 49 | `method` | `clearAutoplayPrefetch` |
| 4 | 56 | `function` | `createAutoplayPrefetchStateService` |

#### Detalle por simbolo

#### 1) `buildAutoplaySeedKey` (`method`)
- Lineas: `24` -> `26`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildAutoplaySeedKey(song: Queue['songs'][number]): string
```
- Comentario en codigo: `// Construye datos de trabajo para el siguiente paso del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `song` | `Queue['songs'][number]` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `buildAutoplayCandidateKey`, `buildQueueSongCandidate`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `invalidateAutoplayPrefetch` (`method`)
- Lineas: `28` -> `46`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
invalidateAutoplayPrefetch(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.autoplayPrefetchByGuild.get`, `this.deps.autoplayPrefetchByGuild.delete`, `musicLogger.info`, `Date.now`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `clearAutoplayPrefetch` (`method`)
- Lineas: `49` -> `52`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearAutoplayPrefetch(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.clearAutoplayContinuationAutoplayRecheck`, `this.invalidateAutoplayPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `createAutoplayPrefetchStateService` (`function`)
- Lineas: `56` -> `60`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayPrefetchStateService(deps: AutoplayPrefetchStateServiceDeps): AutoplayPrefetchStateService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayPrefetchStateServiceDeps` | no | no |
- Retorno: `AutoplayPrefetchStateService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-progress-notice-service.ts`

**Responsabilidad:** Construye/actualiza avisos de progreso de autoplay en mensajes de control.

- Simbolos en este archivo: `2`
- Desglose: funciones=`0`, metodos=`2`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 22 | `method` | `clear` |
| 2 | 37 | `method` | `track` |

#### Detalle por simbolo

#### 1) `clear` (`method`)
- Lineas: `22` -> `35`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async clear(guildId: string): Promise<void>
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.pendingByGuild.get`, `this.pendingByGuild.delete`, `clearTimeout`, `pending.webhook.deleteMessage(pending.messageId).catch`, `pending.webhook.deleteMessage`
- Await detectados: `pending.webhook.deleteMessage(pending.messageId).catch`
- Efectos secundarios detectados: `state_mutation`, `timers`, `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `track` (`method`)
- Lineas: `37` -> `58`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
track(guildId: string, webhook: ButtonInteraction['webhook'], messageId: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `webhook` | `ButtonInteraction['webhook']` | no | no |
| `messageId` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.pendingByGuild.get`, `this.clear`, `setTimeout`, `timeout.unref`, `this.pendingByGuild.set`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `timers`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-service.ts`

**Responsabilidad:** Facade principal de autoplay: integra historial, prefetch, resolucion y continuidad para el resto del sistema.

- Simbolos en este archivo: `26`
- Desglose: funciones=`3`, metodos=`23`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 153 | `getter` | `player` |
| 2 | 158 | `getter` | `lastStartedSongByGuild` |
| 3 | 163 | `getter` | `autoplayPrefetchByGuild` |
| 4 | 167 | `method` | `withGuildLock` |
| 5 | 171 | `method` | `extractResolvableUrlsFromYtDlpResult` |
| 6 | 176 | `method` | `rememberAutoplayTrack` |
| 7 | 180 | `method` | `getRequestedByLabelForQueueSong` |
| 8 | 188 | `method` | `rememberStartedQueueSong` |
| 9 | 193 | `method` | `buildAutoplaySeedKey` |
| 10 | 197 | `method` | `invalidateAutoplayPrefetch` |
| 11 | 202 | `method` | `clearAutoplayPrefetch` |
| 12 | 207 | `method` | `clearAutoplayContinuationAutoplayRecheck` |
| 13 | 212 | `method` | `scheduleAutoplayContinuationAutoplayRecheck` |
| 14 | 224 | `method` | `suppressAutoplayContinuationOnDeleteQueue` |
| 15 | 229 | `method` | `consumeAutoplayDeleteQueueContinuationSuppression` |
| 16 | 235 | `method` | `getAutoplayPrefetchRecommendationLabel` |
| 17 | 239 | `method` | `getAutoplayPrefetchDisplay` |
| 18 | 243 | `method` | `getNowPlayingPanelOptions` |
| 19 | 252 | `method` | `syncNowPlayingPanel` |
| 20 | 256 | `method` | `startAutoplayPrefetchForSeed` |
| 21 | 261 | `method` | `syncAutoplayPrefetchForQueue` |
| 22 | 265 | `method` | `getAutoplayFallbackCandidateWithPrefetch` |
| 23 | 275 | `method` | `getAutoplayPrefetchDebugSnapshot` |
| 24 | 279 | `method` | `getAutoplayFallbackCandidateFromExistingPrefetch` |
| 25 | 290 | `method` | `buildAutoplayFallbackCandidate` |
| 26 | 298 | `method` | `continueAutoplayAfterFinish` |

#### Detalle por simbolo

#### 1) `player` (`getter`)
- Lineas: `153` -> `155`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `lastStartedSongByGuild` (`getter`)
- Lineas: `158` -> `160`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get lastStartedSongByGuild(): Map<string, Song<unknown>>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, Song<unknown>>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `autoplayPrefetchByGuild` (`getter`)
- Lineas: `163` -> `165`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get autoplayPrefetchByGuild(): Map<string, AutoplayPrefetchState>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, AutoplayPrefetchState>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `withGuildLock` (`method`)
- Lineas: `167` -> `169`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
withGuildLock(guildId: string, task: () => Promise<T>): Promise<T>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `task` | `() => Promise<T>` | no | no |
- Retorno: `Promise<T>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.withGuildLock`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `extractResolvableUrlsFromYtDlpResult` (`method`)
- Lineas: `171` -> `173`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayCandidateResolverService.extractResolvableUrlsFromYtDlpResult`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `rememberAutoplayTrack` (`method`)
- Lineas: `176` -> `178`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberAutoplayTrack(guildId: string, track: AutoplayCandidate): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `track` | `AutoplayCandidate` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayHistoryService.rememberAutoplayTrack`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `getRequestedByLabelForQueueSong` (`method`)
- Lineas: `180` -> `185`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getRequestedByLabelForQueueSong(guildId: string, song: Queue['songs'][number] | undefined): string
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `song` | `Queue['songs'][number] | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayHistoryService.getRequestedByLabelForQueueSong`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `rememberStartedQueueSong` (`method`)
- Lineas: `188` -> `190`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberStartedQueueSong(queue: Queue): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayHistoryService.rememberStartedQueueSong`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `buildAutoplaySeedKey` (`method`)
- Lineas: `193` -> `195`
- Acceso: `private`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildAutoplaySeedKey(song: Queue['songs'][number]): string
```
- Comentario en codigo: `// Construye datos de trabajo para el siguiente paso del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `song` | `Queue['songs'][number]` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchStateService.buildAutoplaySeedKey`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `invalidateAutoplayPrefetch` (`method`)
- Lineas: `197` -> `199`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
invalidateAutoplayPrefetch(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchStateService.invalidateAutoplayPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `clearAutoplayPrefetch` (`method`)
- Lineas: `202` -> `204`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearAutoplayPrefetch(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchStateService.clearAutoplayPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `clearAutoplayContinuationAutoplayRecheck` (`method`)
- Lineas: `207` -> `209`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearAutoplayContinuationAutoplayRecheck(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayContinuationGuardService.clearAutoplayContinuationAutoplayRecheck`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 13) `scheduleAutoplayContinuationAutoplayRecheck` (`method`)
- Lineas: `212` -> `222`
- Acceso: `private`
- Async: no
- Resumen funcional: Controla temporizadores o tareas diferidas del sistema.
- Firma:
```ts
scheduleAutoplayContinuationAutoplayRecheck(guildId: string, context: 'finish' | 'delete_queue', expectedCandidate: AutoplayCandidate): void
```
- Comentario en codigo: `// Programa ejecucion diferida de un recheck o timeout.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `context` | `'finish' | 'delete_queue'` | no | no |
| `expectedCandidate` | `AutoplayCandidate` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayContinuationGuardService.scheduleAutoplayContinuationAutoplayRecheck`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 14) `suppressAutoplayContinuationOnDeleteQueue` (`method`)
- Lineas: `224` -> `226`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
suppressAutoplayContinuationOnDeleteQueue(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayContinuationGuardService.suppressAutoplayContinuationOnDeleteQueue`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 15) `consumeAutoplayDeleteQueueContinuationSuppression` (`method`)
- Lineas: `229` -> `233`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
consumeAutoplayDeleteQueueContinuationSuppression(guildId: string): | { reason: string; ageMs: number }
    | null
```
- Comentario en codigo: `// Consume estado transitorio de un solo uso.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `| { reason: string; ageMs: number }
    | null`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayContinuationGuardService.consumeAutoplayDeleteQueueContinuationSuppression`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 16) `getAutoplayPrefetchRecommendationLabel` (`method`)
- Lineas: `235` -> `237`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchRecommendationLabel(guildId: string): string | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `string | null`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchReadService.getAutoplayPrefetchRecommendationLabel`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 17) `getAutoplayPrefetchDisplay` (`method`)
- Lineas: `239` -> `241`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchDisplay(guildId: string): AutoplayPrefetchDisplay
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `AutoplayPrefetchDisplay`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchReadService.getAutoplayPrefetchDisplay`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 18) `getNowPlayingPanelOptions` (`method`)
- Lineas: `243` -> `249`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNowPlayingPanelOptions(queue: Queue): {
    autoplayRecommendationLabel?: string;
    nextTrackFieldName?: string;
    requestedByLabel?: string;
  }
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `{
    autoplayRecommendationLabel?: string;
    nextTrackFieldName?: string;
    requestedByLabel?: string;
  }`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchReadService.getNowPlayingPanelOptions`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 19) `syncNowPlayingPanel` (`method`)
- Lineas: `252` -> `254`
- Acceso: `public`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlayingPanel(queue: Queue): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `musicControlMessageService.syncNowPlaying`, `this.getNowPlayingPanelOptions`
- Await detectados: `musicControlMessageService.syncNowPlaying`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 20) `startAutoplayPrefetchForSeed` (`method`)
- Lineas: `256` -> `258`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
startAutoplayPrefetchForSeed(queue: Queue, seedSong: Queue['songs'][number]): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchOrchestratorService.startAutoplayPrefetchForSeed`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 21) `syncAutoplayPrefetchForQueue` (`method`)
- Lineas: `261` -> `263`
- Acceso: `public`
- Async: no
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
syncAutoplayPrefetchForQueue(queue: Queue): void
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchOrchestratorService.syncAutoplayPrefetchForQueue`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 22) `getAutoplayFallbackCandidateWithPrefetch` (`method`)
- Lineas: `265` -> `273`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getAutoplayFallbackCandidateWithPrefetch(queue: Queue, seedSong: Queue['songs'][number]): Promise<AutoplayCandidate | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | no | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchCandidateAccessService.getAutoplayFallbackCandidateWithPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 23) `getAutoplayPrefetchDebugSnapshot` (`method`)
- Lineas: `275` -> `277`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchDebugSnapshot(guildId: string): AutoplayPrefetchDebugSnapshot
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `AutoplayPrefetchDebugSnapshot`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchCandidateAccessService.getAutoplayPrefetchDebugSnapshot`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 24) `getAutoplayFallbackCandidateFromExistingPrefetch` (`method`)
- Lineas: `279` -> `287`
- Acceso: `private`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getAutoplayFallbackCandidateFromExistingPrefetch(guildId: string, context: 'finish' | 'delete_queue'): Promise<AutoplayCandidate | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `context` | `'finish' | 'delete_queue'` | no | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayPrefetchCandidateAccessService.getAutoplayFallbackCandidateFromExistingPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 25) `buildAutoplayFallbackCandidate` (`method`)
- Lineas: `290` -> `295`
- Acceso: `private`
- Async: si
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
async buildAutoplayFallbackCandidate(queue: Queue, seedSong?: Queue['songs'][number]): Promise<AutoplayCandidate | null>
```
- Comentario en codigo: `// Construye datos de trabajo para el siguiente paso del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | si | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayCandidateResolverService.buildAutoplayFallbackCandidate`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 26) `continueAutoplayAfterFinish` (`method`)
- Lineas: `298` -> `300`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async continueAutoplayAfterFinish(queue: Queue, context?: 'finish' | 'delete_queue'): Promise<boolean>
```
- Comentario en codigo: `// Continua el flujo automaticamente tras un evento terminal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `context` | `'finish' | 'delete_queue'` | si | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayContinuationService.continueAutoplayAfterFinish`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/autoplay-ytdlp-query-service.ts`

**Responsabilidad:** Adapter de consultas yt-dlp para autoplay: extracción de candidatos y fallback CLI/plugin.

- Simbolos en este archivo: `8`
- Desglose: funciones=`3`, metodos=`5`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 21 | `getter` | `playlistProgressiveFlatTimeoutMs` |
| 2 | 25 | `method` | `getBundledYtDlpExecutablePath` |
| 3 | 29 | `method` | `extractResolvableCandidatesFromYtDlpResult` |
| 4 | 81 | `method` | `extractResolvableUrlsFromYtDlpResult` |
| 5 | 85 | `method` | `extractAutoplayCandidatesFromRawYtDlpJson` |
| 6 | 88 | `function-variable` | `pushCandidateFromRecord` |
| 7 | 149 | `method` | `loadAutoplaySearchCandidatesWithYtDlpCli` |
| 8 | 207 | `function` | `createAutoplayYtDlpQueryService` |

#### Detalle por simbolo

#### 1) `playlistProgressiveFlatTimeoutMs` (`getter`)
- Lineas: `21` -> `23`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get playlistProgressiveFlatTimeoutMs(): number
```
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `getBundledYtDlpExecutablePath` (`method`)
- Lineas: `25` -> `27`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getBundledYtDlpExecutablePath(): string
```
- Parametros: ninguno.
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.getBundledYtDlpExecutablePath`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `extractResolvableCandidatesFromYtDlpResult` (`method`)
- Lineas: `29` -> `79`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractResolvableCandidatesFromYtDlpResult(resolved: unknown): AutoplayCandidate[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `AutoplayCandidate[]`
- Complejidad estimada (ramas): `12`
- Llamadas principales detectadas: `Array.isArray`, `/^https?:\/\//i.test`, `candidates.push`, `uniqueByUrl.has`, `uniqueByUrl.set`, `uniqueByUrl.values`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `extractResolvableUrlsFromYtDlpResult` (`method`)
- Lineas: `81` -> `83`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.extractResolvableCandidatesFromYtDlpResult(resolved).map`, `this.extractResolvableCandidatesFromYtDlpResult`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `extractAutoplayCandidatesFromRawYtDlpJson` (`method`)
- Lineas: `85` -> `147`
- Acceso: `private`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractAutoplayCandidatesFromRawYtDlpJson(resolved: unknown): AutoplayCandidate[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `AutoplayCandidate[]`
- Complejidad estimada (ramas): `11`
- Llamadas principales detectadas: `/^https?:\/\//i.test`, `value.title.trim`, `value.name.trim`, `candidates.push`, `Array.isArray`, `pushCandidateFromRecord`, `uniqueByUrl.has`, `uniqueByUrl.set`, `uniqueByUrl.values`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `pushCandidateFromRecord` (`function-variable`)
- Lineas: `88` -> `124`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
pushCandidateFromRecord(record: unknown): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `record` | `unknown` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `6`
- Llamadas principales detectadas: `/^https?:\/\//i.test`, `value.title.trim`, `value.name.trim`, `candidates.push`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `loadAutoplaySearchCandidatesWithYtDlpCli` (`method`)
- Lineas: `149` -> `203`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async loadAutoplaySearchCandidatesWithYtDlpCli(searchQuery: string): Promise<AutoplayCandidate[]>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `searchQuery` | `string` | no | no |
- Retorno: `Promise<AutoplayCandidate[]>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.getBundledYtDlpExecutablePath`, `execFileAsync`, `isTransientYtDlpSpawnError`, `toLoggableErrorMessage`, `musicLogger.warn`, `waitMs`, `JSON.parse`, `this.extractAutoplayCandidatesFromRawYtDlpJson`
- Await detectados: `execFileAsync`, `waitMs`
- Efectos secundarios detectados: `logging`, `state_mutation`, `error_control`
- Control de errores: 2 throw(s), 2 catch(es)
- Throw examples (max 5):
  - `error`
  - `new Error('yt-dlp CLI devolvio JSON invalido para autoplay.')`

#### 8) `createAutoplayYtDlpQueryService` (`function`)
- Lineas: `207` -> `211`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createAutoplayYtDlpQueryService(deps: AutoplayYtDlpQueryServiceDeps): AutoplayYtDlpQueryService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `AutoplayYtDlpQueryServiceDeps` | no | no |
- Retorno: `AutoplayYtDlpQueryService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/control-message-service.ts`

**Responsabilidad:** Gestiona el panel de control de musica (now playing/idle) y su sincronizacion en el canal.

- Simbolos en este archivo: `8`
- Desglose: funciones=`0`, metodos=`8`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 41 | `method` | `buildPayloadFingerprint` |
| 2 | 57 | `method` | `shouldSkipRecentlyDeliveredPayload` |
| 3 | 77 | `method` | `rememberDeliveredPayload` |
| 4 | 89 | `method` | `editExistingMessage` |
| 5 | 114 | `method` | `sendFreshMessage` |
| 6 | 126 | `method` | `syncNowPlaying` |
| 7 | 153 | `method` | `syncIdle` |
| 8 | 186 | `method` | `getTrackedChannelId` |

#### Detalle por simbolo

#### 1) `buildPayloadFingerprint` (`method`)
- Lineas: `41` -> `55`
- Acceso: `private`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildPayloadFingerprint(payload: ControlMessagePayload): string
```
- Comentario en codigo: `// Construye datos de trabajo para el siguiente paso del flujo.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `payload` | `ControlMessagePayload` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `payload.embeds.map`, `maybeEmbed.toJSON`, `payload.components.map`, `maybeComponent.toJSON`, `JSON.stringify`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `shouldSkipRecentlyDeliveredPayload` (`method`)
- Lineas: `57` -> `74`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
shouldSkipRecentlyDeliveredPayload(guildId: string, channelId: string, payload: ControlMessagePayload): boolean
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `channelId` | `string` | no | no |
| `payload` | `ControlMessagePayload` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.lastDeliveredPayloadByGuild.get`, `Date.now`, `this.buildPayloadFingerprint`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `rememberDeliveredPayload` (`method`)
- Lineas: `77` -> `87`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberDeliveredPayload(guildId: string, channelId: string, payload: ControlMessagePayload): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `channelId` | `string` | no | no |
| `payload` | `ControlMessagePayload` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.lastDeliveredPayloadByGuild.set`, `this.buildPayloadFingerprint`, `Date.now`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `editExistingMessage` (`method`)
- Lineas: `89` -> `112`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async editExistingMessage(guildId: string, channel: GuildTextBasedChannel, payload: ControlMessagePayload): Promise<boolean>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `channel` | `GuildTextBasedChannel` | no | no |
| `payload` | `ControlMessagePayload` | no | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.byGuild.get`, `channel.messages.fetch`, `message.edit`, `this.rememberDeliveredPayload`, `this.byGuild.delete`
- Await detectados: `channel.messages.fetch`, `message.edit`
- Efectos secundarios detectados: `state_mutation`, `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `sendFreshMessage` (`method`)
- Lineas: `114` -> `123`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async sendFreshMessage(guildId: string, channel: GuildTextBasedChannel, payload: ControlMessagePayload): Promise<void>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `channel` | `GuildTextBasedChannel` | no | no |
| `payload` | `ControlMessagePayload` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `channel.send`, `this.byGuild.set`, `this.rememberDeliveredPayload`
- Await detectados: `channel.send`
- Efectos secundarios detectados: `discord_messages`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `syncNowPlaying` (`method`)
- Lineas: `126` -> `150`
- Acceso: `public`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlaying(queue: Queue, options?: SyncNowPlayingOptions): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `options` | `SyncNowPlayingOptions` | si | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `buildNowPlayingEmbed`, `buildMusicControlComponents`, `this.shouldSkipRecentlyDeliveredPayload`, `this.editExistingMessage`, `this.sendFreshMessage`
- Await detectados: `this.editExistingMessage`, `this.sendFreshMessage`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `syncIdle` (`method`)
- Lineas: `153` -> `184`
- Acceso: `public`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncIdle(guildId: string, options: {
      channel?: GuildTextBasedChannel;
      reason: string;
    }): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `options` | `{
      channel?: GuildTextBasedChannel;
      reason: string;
    }` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.byGuild.delete`, `buildIdleMusicEmbed`, `buildMusicControlComponents`, `this.shouldSkipRecentlyDeliveredPayload`, `this.editExistingMessage`, `this.sendFreshMessage`
- Await detectados: `this.editExistingMessage`, `this.sendFreshMessage`
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `getTrackedChannelId` (`method`)
- Lineas: `186` -> `190`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getTrackedChannelId(guildId: string): string | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `string | null`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.byGuild.get`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/guild-action-lock-service.ts`

**Responsabilidad:** Lock por guild para serializar acciones de musica y evitar carreras entre botones/comandos simultaneos.

- Simbolos en este archivo: `3`
- Desglose: funciones=`1`, metodos=`2`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 28 | `method` | `isLocked` |
| 2 | 33 | `method` | `runWithLock` |
| 3 | 61 | `function-variable` | `releaseLock` |

#### Detalle por simbolo

#### 1) `isLocked` (`method`)
- Lineas: `28` -> `30`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isLocked(guildId: string): boolean
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.guildLocks.has`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `runWithLock` (`method`)
- Lineas: `33` -> `95`
- Acceso: `public`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async runWithLock(guildId: string, task: () => Promise<T>): Promise<T>
```
- Comentario en codigo: `// Orquesta la ejecucion completa con logging y control de errores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `task` | `() => Promise<T>` | no | no |
- Retorno: `Promise<T>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `Date.now`, `this.guildLocks.get`, `this.guildLocks.delete`, `musicLogger.warn`, `Symbol`, `this.guildLocks.set`, `clearTimeout`, `task`, `taskPromise.then`, `setTimeout`, `timeoutHandle.unref`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `logging`, `timers`, `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('Hay otra accion de musica en proceso. Intenta de nuevo en un segundo.')`

#### 3) `releaseLock` (`function-variable`)
- Lineas: `61` -> `70`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
releaseLock(): void
```
- Parametros: ninguno.
- Retorno: `void`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `clearTimeout`, `this.guildLocks.get`, `this.guildLocks.delete`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/inactivity-disconnect-service.ts`

**Responsabilidad:** Controla timers de inactividad (sin playback/sin usuarios) y desconexion segura del canal de voz.

- Simbolos en este archivo: `13`
- Desglose: funciones=`1`, metodos=`12`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 16 | `function` | `readTimeoutMs` |
| 2 | 43 | `method` | `bindClient` |
| 3 | 59 | `method` | `notifyPlaybackActive` |
| 4 | 66 | `method` | `scheduleNoPlaybackDisconnect` |
| 5 | 90 | `method` | `cancelNoPlaybackDisconnect` |
| 6 | 101 | `method` | `cancelEmptyChannelDisconnect` |
| 7 | 113 | `method` | `clearGuildTimers` |
| 8 | 119 | `method` | `clearTimer` |
| 9 | 131 | `method` | `getDependencies` |
| 10 | 140 | `method` | `resolveTrackedTextChannel` |
| 11 | 159 | `method` | `executeNoPlaybackDisconnect` |
| 12 | 204 | `method` | `executeEmptyChannelDisconnect` |
| 13 | 251 | `method` | `handleVoiceStateUpdate` |

#### Detalle por simbolo

#### 1) `readTimeoutMs` (`function`)
- Lineas: `16` -> `25`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
readTimeoutMs(envName: string, fallback: number): number
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `envName` | `string` | no | no |
| `fallback` | `number` | no | no |
- Retorno: `number`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `Number`, `Number.isFinite`, `Math.floor`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `bindClient` (`method`)
- Lineas: `43` -> `57`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
bindClient(client: Client, player: DisTube): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `client` | `Client` | no | no |
| `player` | `DisTube` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `client.on`, `this.handleVoiceStateUpdate`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `notifyPlaybackActive` (`method`)
- Lineas: `59` -> `63`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
notifyPlaybackActive(queue: Queue): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.cancelNoPlaybackDisconnect`, `this.cancelEmptyChannelDisconnect`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `scheduleNoPlaybackDisconnect` (`method`)
- Lineas: `66` -> `88`
- Acceso: `public`
- Async: no
- Resumen funcional: Controla temporizadores o tareas diferidas del sistema.
- Firma:
```ts
scheduleNoPlaybackDisconnect(queue: Queue, reason: string): void
```
- Comentario en codigo: `// Programa ejecucion diferida de un recheck o timeout.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.clearTimer`, `setTimeout`, `this.executeNoPlaybackDisconnect`, `timeout.unref`, `this.noPlaybackTimers.set`, `musicLogger.info`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`, `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `cancelNoPlaybackDisconnect` (`method`)
- Lineas: `90` -> `99`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
cancelNoPlaybackDisconnect(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.clearTimer`, `musicLogger.debug`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `cancelEmptyChannelDisconnect` (`method`)
- Lineas: `101` -> `110`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
cancelEmptyChannelDisconnect(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.clearTimer`, `musicLogger.debug`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `clearGuildTimers` (`method`)
- Lineas: `113` -> `116`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearGuildTimers(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.cancelNoPlaybackDisconnect`, `this.cancelEmptyChannelDisconnect`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `clearTimer` (`method`)
- Lineas: `119` -> `129`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearTimer(map: Map<string, TimerHandle>, guildId: string): boolean
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `map` | `Map<string, TimerHandle>` | no | no |
| `guildId` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `map.get`, `clearTimeout`, `map.delete`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `getDependencies` (`method`)
- Lineas: `131` -> `137`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getDependencies(): { client: Client; player: DisTube } | null
```
- Parametros: ninguno.
- Retorno: `{ client: Client; player: DisTube } | null`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `resolveTrackedTextChannel` (`method`)
- Lineas: `140` -> `157`
- Acceso: `private`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
resolveTrackedTextChannel(guildId: string): GuildTextBasedChannel | undefined
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `GuildTextBasedChannel | undefined`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.getDependencies`, `musicControlMessageService.getTrackedChannelId`, `deps.client.channels.cache.get`, `channel.isTextBased`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `executeNoPlaybackDisconnect` (`method`)
- Lineas: `159` -> `202`
- Acceso: `private`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async executeNoPlaybackDisconnect(guildId: string, reason: string): Promise<void>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.noPlaybackTimers.delete`, `this.getDependencies`, `player.voices.get`, `player.getQueue`, `this.resolveTrackedTextChannel`, `player.voices.leave`, `this.cancelEmptyChannelDisconnect`, `musicControlMessageService.syncIdle`, `musicLogger.info`
- Await detectados: `musicControlMessageService.syncIdle`
- Efectos secundarios detectados: `state_mutation`, `playback_control`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `executeEmptyChannelDisconnect` (`method`)
- Lineas: `204` -> `249`
- Acceso: `private`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async executeEmptyChannelDisconnect(guildId: string): Promise<void>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.emptyChannelTimers.delete`, `this.getDependencies`, `player.voices.get`, `voiceChannel.members.filter`, `player.getQueue`, `this.resolveTrackedTextChannel`, `player.voices.leave`, `this.cancelNoPlaybackDisconnect`, `musicControlMessageService.syncIdle`, `musicLogger.info`
- Await detectados: `musicControlMessageService.syncIdle`
- Efectos secundarios detectados: `state_mutation`, `playback_control`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 13) `handleVoiceStateUpdate` (`method`)
- Lineas: `251` -> `296`
- Acceso: `private`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): Promise<void>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `oldState` | `VoiceState` | no | no |
| `newState` | `VoiceState` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.getDependencies`, `player.voices.get`, `this.clearGuildTimers`, `botVoiceChannel.members.filter`, `this.cancelEmptyChannelDisconnect`, `this.emptyChannelTimers.has`, `setTimeout`, `this.executeEmptyChannelDisconnect`, `timeout.unref`, `this.emptyChannelTimers.set`, `musicLogger.info`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`, `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-action-runner-service.ts`

**Responsabilidad:** Wrapper de ejecucion de acciones con logging uniforme (start/finish/error + duracion).

- Simbolos en este archivo: `3`
- Desglose: funciones=`1`, metodos=`2`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 19 | `method` | `getInteractionSource` |
| 2 | 24 | `method` | `run` |
| 3 | 84 | `function` | `createMusicActionRunnerService` |

#### Detalle por simbolo

#### 1) `getInteractionSource` (`method`)
- Lineas: `19` -> `21`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getInteractionSource(interaction: MusicInteractionLike): 'slash' | 'button'
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteractionLike` | no | no |
- Retorno: `'slash' | 'button'`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `interaction.isButton`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `run` (`method`)
- Lineas: `24` -> `80`
- Acceso: `public`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async run(interaction: MusicInteractionLike, action: string, task: () => Promise<T>): Promise<T>
```
- Comentario en codigo: `// Orquesta la ejecucion completa con logging y control de errores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteractionLike` | no | no |
| `action` | `string` | no | no |
| `task` | `() => Promise<T>` | no | no |
- Retorno: `Promise<T>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `Date.now`, `this.getInteractionSource`, `musicLogger.info`, `task`, `musicLogger.warn`, `String`, `musicLogger.error`
- Await detectados: `task`
- Efectos secundarios detectados: `logging`, `error_control`
- Control de errores: 1 throw(s), 1 catch(es)
- Throw examples (max 5):
  - `error`

#### 3) `createMusicActionRunnerService` (`function`)
- Lineas: `84` -> `86`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicActionRunnerService(): MusicActionRunnerService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
- Parametros: ninguno.
- Retorno: `MusicActionRunnerService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-play-queue-command-service.ts`

**Responsabilidad:** Caso de uso de play/queue/skip: resuelve fuentes y aplica reglas de cola/autoplay.

- Simbolos en este archivo: `5`
- Desglose: funciones=`1`, metodos=`4`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 78 | `method` | `enqueueAutoplayCandidateForSkip` |
| 2 | 174 | `method` | `play` |
| 3 | 251 | `method` | `skip` |
| 4 | 298 | `method` | `setAutoplay` |
| 5 | 343 | `function` | `createMusicPlayQueueCommandService` |

#### Detalle por simbolo

#### 1) `enqueueAutoplayCandidateForSkip` (`method`)
- Lineas: `78` -> `172`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async enqueueAutoplayCandidateForSkip(params: {
    queue: Queue;
    context: VoiceContext;
    playOptions: PlayOptions;
  }): Promise<void>
```
- Comentario en codigo: `// invalida prefetch y reintenta con un candidato nuevo dentro del mismo comando.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    queue: Queue;
    context: VoiceContext;
    playOptions: PlayOptions;
  }` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `7`
- Llamadas principales detectadas: `this.deps.getAutoplayFallbackCandidateWithPrefetch`, `triedCandidateUrls.has`, `this.deps.clearAutoplayPrefetch`, `musicLogger.warn`, `triedCandidateUrls.add`, `this.deps.playerPlay`, `this.deps.rememberAutoplayTrack`, `this.deps.getQueue`, `queueAfterEnqueue.skip`, `isUnavailableYouTubeVideoError`, `toLoggableErrorMessage`
- Await detectados: `this.deps.getAutoplayFallbackCandidateWithPrefetch`, `this.deps.playerPlay`, `queueAfterEnqueue.skip`
- Efectos secundarios detectados: `logging`, `playback_control`, `state_mutation`, `error_control`
- Control de errores: 5 throw(s), 1 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No hay pista activa en este momento.')`
  - `new MusicUserError( 'Autoplay encontro una recomendacion, pero no pude prepararla para el salto.', )`
  - `error`
  - `new MusicUserError( 'Autoplay encontro recomendaciones, pero estaban no disponibles. Intenta /play o vuelve a /skip.', )`
  - `new MusicUserError( 'Autoplay esta activo, pero no pude obtener una recomendacion con el proveedor actual.', )`

#### 2) `play` (`method`)
- Lineas: `174` -> `248`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async play(interaction: ChatInputCommandInteraction, rawInput: string): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
| `rawInput` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `8`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `normalizePlayInput`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.tryPlayYouTubePlaylistProgressively`, `this.deps.tryPlaySpotifyPlaylistProgressively`, `isYtDlpSearchInput`, `/^https?:\/\//i.test`, `this.deps.resolveSpotifyTrackToPlayableSourceWithYtDlp`, `this.deps.resolveFirstSearchUrlWithYtDlp`, `this.deps.playerPlay`, `this.deps.getQueue`, `this.deps.syncNowPlayingPanel`, `Math.max`
- Await detectados: `this.deps.getVoiceContext`, `this.deps.tryPlayYouTubePlaylistProgressively`, `this.deps.tryPlaySpotifyPlaylistProgressively`, `this.deps.resolveSpotifyTrackToPlayableSourceWithYtDlp`, `this.deps.resolveFirstSearchUrlWithYtDlp`, `this.deps.playerPlay`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `skip` (`method`)
- Lineas: `251` -> `296`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async skip(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Avanza pista y aplica fallback si corresponde.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `queue.voice.stop`, `queue.remove`, `this.deps.clearAutoplayPrefetch`, `this.deps.clearAutoplayRecentHistory`, `this.enqueueAutoplayCandidateForSkip`, `this.deps.getQueue`, `this.deps.syncNowPlayingPanel`, `queue.skip`
- Await detectados: `this.deps.getVoiceContext`, `this.enqueueAutoplayCandidateForSkip`, `this.deps.syncNowPlayingPanel`, `queue.skip`
- Efectos secundarios detectados: `playback_control`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `setAutoplay` (`method`)
- Lineas: `298` -> `339`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async setAutoplay(interaction: MusicInteraction, enabled?: boolean): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `enabled` | `boolean` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.getQueue`, `this.deps.requireQueue`, `queue.toggleAutoplay`, `this.deps.syncAutoplayPrefetchForQueue`, `this.deps.clearAutoplayContinuationAutoplayRecheck`, `this.deps.clearAutoplayPrefetch`, `musicLogger.info`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `playback_control`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `createMusicPlayQueueCommandService` (`function`)
- Lineas: `343` -> `347`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicPlayQueueCommandService(deps: MusicPlayQueueCommandServiceDeps): MusicPlayQueueCommandService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicPlayQueueCommandServiceDeps` | no | no |
- Retorno: `MusicPlayQueueCommandService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-playback-command-service.ts`

**Responsabilidad:** Caso de uso de controles de reproduccion (pause/resume/seek/loop/volume).

- Simbolos en este archivo: `10`
- Desglose: funciones=`1`, metodos=`9`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 39 | `method` | `pause` |
| 2 | 58 | `method` | `resume` |
| 3 | 76 | `method` | `togglePauseResume` |
| 4 | 96 | `method` | `back` |
| 5 | 134 | `method` | `setLoopMode` |
| 6 | 150 | `method` | `rewind` |
| 7 | 177 | `method` | `forward` |
| 8 | 214 | `method` | `replay` |
| 9 | 237 | `method` | `setVolume` |
| 10 | 259 | `function` | `createMusicPlaybackCommandService` |

#### Detalle por simbolo

#### 1) `pause` (`method`)
- Lineas: `39` -> `55`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async pause(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Pausa la reproduccion activa del guild.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `queue.pause`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.pause`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `playback_control`, `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('La reproduccion ya esta pausada.')`

#### 2) `resume` (`method`)
- Lineas: `58` -> `74`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async resume(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Reanuda reproduccion pausada manteniendo el contexto.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `queue.resume`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.resume`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `playback_control`, `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('La reproduccion ya esta en curso.')`

#### 3) `togglePauseResume` (`method`)
- Lineas: `76` -> `94`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async togglePauseResume(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `queue.resume`, `this.deps.syncNowPlayingPanel`, `queue.pause`
- Await detectados: `this.deps.getVoiceContext`, `queue.resume`, `this.deps.syncNowPlayingPanel`, `queue.pause`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `back` (`method`)
- Lineas: `96` -> `132`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async back(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.getQueue`, `this.deps.requireQueue`, `musicLogger.info`, `queue.previous`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.previous`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `logging`, `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No hay canciones anteriores en el historial.')`

#### 5) `setLoopMode` (`method`)
- Lineas: `134` -> `148`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async setLoopMode(interaction: MusicInteraction, loopMode?: LoopModeName): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `loopMode` | `LoopModeName` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `queue.setRepeatMode`, `this.deps.syncNowPlayingPanel`, `toRepeatLabel`
- Await detectados: `this.deps.getVoiceContext`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `rewind` (`method`)
- Lineas: `150` -> `175`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async rewind(interaction: MusicInteraction, requestedSeconds?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedSeconds` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `sanitizeSeconds`, `Math.max`, `queue.seek`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.seek`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `error_control`
- Control de errores: 2 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No hay pista activa en este momento.')`
  - `new MusicUserError('No puedes usar rewind en una transmision LIVE.')`

#### 7) `forward` (`method`)
- Lineas: `177` -> `212`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async forward(interaction: MusicInteraction, requestedSeconds?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedSeconds` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `sanitizeSeconds`, `Math.max`, `Math.min`, `queue.seek`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.seek`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `error_control`
- Control de errores: 4 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No hay pista activa en este momento.')`
  - `new MusicUserError('No puedes usar forward en una transmision LIVE.')`
  - `new MusicUserError('No pude calcular la duracion de esta pista para adelantar.')`
  - `new MusicUserError('Ya estas al final de la pista. Usa /skip si quieres avanzar.')`

#### 8) `replay` (`method`)
- Lineas: `214` -> `235`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async replay(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `queue.seek`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.seek`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `error_control`
- Control de errores: 2 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No hay pista activa en este momento.')`
  - `new MusicUserError('No puedes reiniciar una transmision LIVE.')`

#### 9) `setVolume` (`method`)
- Lineas: `237` -> `255`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async setVolume(interaction: MusicInteraction, requestedVolume?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedVolume` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `Math.max`, `Math.min`, `Math.floor`, `queue.setVolume`, `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.getVoiceContext`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `createMusicPlaybackCommandService` (`function`)
- Lineas: `259` -> `263`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicPlaybackCommandService(deps: MusicPlaybackCommandServiceDeps): MusicPlaybackCommandService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicPlaybackCommandServiceDeps` | no | no |
- Retorno: `MusicPlaybackCommandService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-read-service.ts`

**Responsabilidad:** Caso de uso de lecturas de estado (now playing, queue, ayudas de visualizacion).

- Simbolos en este archivo: `3`
- Desglose: funciones=`1`, metodos=`2`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 39 | `method` | `getNowPlayingSummary` |
| 2 | 67 | `method` | `getQueueSummary` |
| 3 | 126 | `function` | `createMusicReadService` |

#### Detalle por simbolo

#### 1) `getNowPlayingSummary` (`method`)
- Lineas: `39` -> `65`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getNowPlayingSummary(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.getRequestedByLabelForQueueSong`, `current.source?.toUpperCase`, `[
        `**Now Playing:** ${formatQueueSong(current)}`,
        `**Progreso:** ${queue.formattedCurrentTime} / ${duration}`,
        `**Solicitado por:** ${requestedBy}`,
        `**Source:** ${source}`,
        `**Estado:** ${queue.paused ? 'PAUSADO' : 'SONANDO'} | Loop: ${toRepeatLabel(queue.repeatMode)} | Autoplay: ${queue.autoplay ? 'ON' : 'OFF'} | Vol: ${queue.volume}%`,
      ].join`, `formatQueueSong`, `toRepeatLabel`
- Await detectados: `this.deps.getVoiceContext`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `getQueueSummary` (`method`)
- Lineas: `67` -> `122`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getQueueSummary(interaction: MusicInteraction, requestedPage?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedPage` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `8`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `queue.songs.slice`, `Math.max`, `Math.ceil`, `Math.min`, `Math.floor`, `upcomingAll.slice`, `formatQueueSong`, `toRepeatLabel`, `lines.push`, `upcomingPage.entries`, `this.deps.getAutoplayPrefetchDisplay`, `lines.join`
- Await detectados: `this.deps.getVoiceContext`
- Efectos secundarios detectados: `state_mutation`, `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `createMusicReadService` (`function`)
- Lineas: `126` -> `128`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicReadService(deps: MusicReadServiceDeps): MusicReadService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicReadServiceDeps` | no | no |
- Retorno: `MusicReadService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-service.ts`

**Responsabilidad:** Servicio fachada principal del modulo de musica: compone subservicios y expone API de alto nivel para comandos/UI.

- Simbolos en este archivo: `47`
- Desglose: funciones=`4`, metodos=`43`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 63 | `function` | `isMusicUserError` |
| 2 | 68 | `function` | `isDisTubeNoResultError` |
| 3 | 79 | `function` | `getMusicErrorMessage` |
| 4 | 257 | `getter` | `player` |
| 5 | 263 | `method` | `verifyBundledYtDlpBinaryOnStartup` |
| 6 | 267 | `method` | `isGuildBusy` |
| 7 | 274 | `method` | `resolveSpotifyTrackToPlayableSourceWithYtDlp` |
| 8 | 279 | `method` | `resolveFirstSearchUrlWithYtDlp` |
| 9 | 283 | `method` | `getBundledYtDlpExecutablePath` |
| 10 | 288 | `method` | `clearProgressivePlaylistLoad` |
| 11 | 292 | `method` | `tryPlayYouTubePlaylistProgressively` |
| 12 | 305 | `method` | `tryPlaySpotifyPlaylistProgressively` |
| 13 | 319 | `method` | `rememberAutoplayTrack` |
| 14 | 323 | `method` | `getRequestedByLabelForQueueSong` |
| 15 | 331 | `method` | `rememberStartedQueueSong` |
| 16 | 336 | `method` | `clearAutoplayPrefetch` |
| 17 | 341 | `method` | `clearAutoplayContinuationAutoplayRecheck` |
| 18 | 345 | `method` | `suppressAutoplayContinuationOnDeleteQueue` |
| 19 | 350 | `method` | `consumeAutoplayDeleteQueueContinuationSuppression` |
| 20 | 354 | `method` | `getAutoplayPrefetchDisplay` |
| 21 | 358 | `method` | `getNowPlayingPanelOptions` |
| 22 | 363 | `method` | `syncNowPlayingPanel` |
| 23 | 368 | `method` | `syncAutoplayPrefetchForQueue` |
| 24 | 372 | `method` | `getAutoplayFallbackCandidateWithPrefetch` |
| 25 | 380 | `method` | `continueAutoplayAfterFinish` |
| 26 | 388 | `method` | `runLoggedAction` |
| 27 | 396 | `method` | `withGuildLock` |
| 28 | 401 | `method` | `getVoiceContext` |
| 29 | 410 | `method` | `requireQueue` |
| 30 | 415 | `method` | `join` |
| 31 | 419 | `method` | `play` |
| 32 | 424 | `method` | `pause` |
| 33 | 429 | `method` | `resume` |
| 34 | 433 | `method` | `togglePauseResume` |
| 35 | 438 | `method` | `skip` |
| 36 | 442 | `method` | `back` |
| 37 | 446 | `method` | `setAutoplay` |
| 38 | 450 | `method` | `setLoopMode` |
| 39 | 454 | `method` | `rewind` |
| 40 | 458 | `method` | `forward` |
| 41 | 462 | `method` | `replay` |
| 42 | 466 | `method` | `stop` |
| 43 | 471 | `method` | `clearQueue` |
| 44 | 476 | `method` | `quit` |
| 45 | 480 | `method` | `setVolume` |
| 46 | 484 | `method` | `getNowPlayingSummary` |
| 47 | 488 | `method` | `getQueueSummary` |

#### Detalle por simbolo

#### 1) `isMusicUserError` (`function`)
- Lineas: `63` -> `66`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isMusicUserError(error: unknown): error is MusicUserError
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `error is MusicUserError`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `isDisTubeNoResultError` (`function`)
- Lineas: `68` -> `77`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isDisTubeNoResultError(error: unknown): error is { errorCode: 'NO_RESULT'; message: string }
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `error is { errorCode: 'NO_RESULT'; message: string }`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `getMusicErrorMessage` (`function`)
- Lineas: `79` -> `92`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getMusicErrorMessage(error: unknown): string
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `isMusicUserError`, `isDisTubeNoResultError`, `String`, `musicLogger.error`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `player` (`getter`)
- Lineas: `257` -> `260`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `verifyBundledYtDlpBinaryOnStartup` (`method`)
- Lineas: `263` -> `265`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
verifyBundledYtDlpBinaryOnStartup(): void
```
- Comentario en codigo: `// Verifica precondiciones tecnicas antes de continuar el flujo.`
- Parametros: ninguno.
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.verifyBundledYtDlpBinaryOnStartup`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `isGuildBusy` (`method`)
- Lineas: `267` -> `271`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isGuildBusy(guildId: string): boolean
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.guildActionLockService.isLocked`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `resolveSpotifyTrackToPlayableSourceWithYtDlp` (`method`)
- Lineas: `274` -> `276`
- Acceso: `private`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl: string): Promise<string | null>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.resolveSpotifyTrackToPlayableSourceWithYtDlp`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `resolveFirstSearchUrlWithYtDlp` (`method`)
- Lineas: `279` -> `281`
- Acceso: `private`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.resolveFirstSearchUrlWithYtDlp`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `getBundledYtDlpExecutablePath` (`method`)
- Lineas: `283` -> `285`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getBundledYtDlpExecutablePath(): string
```
- Parametros: ninguno.
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.getBundledYtDlpExecutablePath`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `clearProgressivePlaylistLoad` (`method`)
- Lineas: `288` -> `290`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearProgressivePlaylistLoad(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.clearProgressivePlaylistLoad`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `tryPlayYouTubePlaylistProgressively` (`method`)
- Lineas: `292` -> `303`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlayYouTubePlaylistProgressively(params: {
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.tryPlayYouTubePlaylistProgressively`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `tryPlaySpotifyPlaylistProgressively` (`method`)
- Lineas: `305` -> `316`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContext;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceService.tryPlaySpotifyPlaylistProgressively`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 13) `rememberAutoplayTrack` (`method`)
- Lineas: `319` -> `321`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberAutoplayTrack(guildId: string, track: AutoplayCandidate): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `track` | `AutoplayCandidate` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.rememberAutoplayTrack`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 14) `getRequestedByLabelForQueueSong` (`method`)
- Lineas: `323` -> `328`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getRequestedByLabelForQueueSong(guildId: string, song: Queue['songs'][number] | undefined): string
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `song` | `Queue['songs'][number] | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.getRequestedByLabelForQueueSong`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 15) `rememberStartedQueueSong` (`method`)
- Lineas: `331` -> `333`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
rememberStartedQueueSong(queue: Queue): void
```
- Comentario en codigo: `// Guarda contexto/historial para decisiones posteriores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.rememberStartedQueueSong`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 16) `clearAutoplayPrefetch` (`method`)
- Lineas: `336` -> `338`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearAutoplayPrefetch(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.clearAutoplayPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 17) `clearAutoplayContinuationAutoplayRecheck` (`method`)
- Lineas: `341` -> `343`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearAutoplayContinuationAutoplayRecheck(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.clearAutoplayContinuationAutoplayRecheck`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 18) `suppressAutoplayContinuationOnDeleteQueue` (`method`)
- Lineas: `345` -> `347`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
suppressAutoplayContinuationOnDeleteQueue(guildId: string, reason: string): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.suppressAutoplayContinuationOnDeleteQueue`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 19) `consumeAutoplayDeleteQueueContinuationSuppression` (`method`)
- Lineas: `350` -> `352`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
consumeAutoplayDeleteQueueContinuationSuppression(guildId: string): { reason: string; ageMs: number; }
```
- Comentario en codigo: `// Consume estado transitorio de un solo uso.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `{ reason: string; ageMs: number; }`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.consumeAutoplayDeleteQueueContinuationSuppression`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 20) `getAutoplayPrefetchDisplay` (`method`)
- Lineas: `354` -> `356`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getAutoplayPrefetchDisplay(guildId: string): AutoplayPrefetchDisplay
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
- Retorno: `AutoplayPrefetchDisplay`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.getAutoplayPrefetchDisplay`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 21) `getNowPlayingPanelOptions` (`method`)
- Lineas: `358` -> `360`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getNowPlayingPanelOptions(queue: Queue): { autoplayRecommendationLabel?: string; nextTrackFieldName?: string; requestedByLabel?: string; }
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `{ autoplayRecommendationLabel?: string; nextTrackFieldName?: string; requestedByLabel?: string; }`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.getNowPlayingPanelOptions`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 22) `syncNowPlayingPanel` (`method`)
- Lineas: `363` -> `365`
- Acceso: `private`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlayingPanel(queue: Queue): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.syncNowPlayingPanel`
- Await detectados: `this.autoplayService.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 23) `syncAutoplayPrefetchForQueue` (`method`)
- Lineas: `368` -> `370`
- Acceso: `public`
- Async: no
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
syncAutoplayPrefetchForQueue(queue: Queue): void
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.syncAutoplayPrefetchForQueue`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 24) `getAutoplayFallbackCandidateWithPrefetch` (`method`)
- Lineas: `372` -> `377`
- Acceso: `private`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getAutoplayFallbackCandidateWithPrefetch(queue: Queue, seedSong: Queue['songs'][number]): Promise<AutoplayCandidate | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `seedSong` | `Queue['songs'][number]` | no | no |
- Retorno: `Promise<AutoplayCandidate | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.getAutoplayFallbackCandidateWithPrefetch`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 25) `continueAutoplayAfterFinish` (`method`)
- Lineas: `380` -> `385`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async continueAutoplayAfterFinish(queue: Queue, context?: 'finish' | 'delete_queue'): Promise<boolean>
```
- Comentario en codigo: `// Continua el flujo automaticamente tras un evento terminal.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `context` | `'finish' | 'delete_queue'` | si | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.autoplayService.continueAutoplayAfterFinish`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 26) `runLoggedAction` (`method`)
- Lineas: `388` -> `394`
- Acceso: `private`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async runLoggedAction(interaction: MusicInteraction, action: string, task: () => Promise<string>): Promise<string>
```
- Comentario en codigo: `// Orquesta la ejecucion completa con logging y control de errores.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `action` | `string` | no | no |
| `task` | `() => Promise<string>` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicActionRunnerService.run`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 27) `withGuildLock` (`method`)
- Lineas: `396` -> `399`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async withGuildLock(guildId: string, task: () => Promise<T>): Promise<T>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `task` | `() => Promise<T>` | no | no |
- Retorno: `Promise<T>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.guildActionLockService.runWithLock`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 28) `getVoiceContext` (`method`)
- Lineas: `401` -> `408`
- Acceso: `private`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getVoiceContext(interaction: MusicInteraction, options?: {
      requireQueue?: boolean;
    }): Promise<VoiceContext>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `options` | `{
      requireQueue?: boolean;
    }` | si | no |
- Retorno: `Promise<VoiceContext>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicVoiceContextService.getVoiceContext`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 29) `requireQueue` (`method`)
- Lineas: `410` -> `412`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
requireQueue(context: VoiceContext): Queue
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `context` | `VoiceContext` | no | no |
- Retorno: `Queue`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicVoiceContextService.requireQueue`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 30) `join` (`method`)
- Lineas: `415` -> `417`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async join(interaction: ChatInputCommandInteraction): Promise<string>
```
- Comentario en codigo: `// Conecta el bot al canal de voz del usuario.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSessionCommandService.join`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 31) `play` (`method`)
- Lineas: `419` -> `421`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async play(interaction: ChatInputCommandInteraction, rawInput: string): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
| `rawInput` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlayQueueCommandService.play`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 32) `pause` (`method`)
- Lineas: `424` -> `426`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async pause(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Pausa la reproduccion activa del guild.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.pause`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 33) `resume` (`method`)
- Lineas: `429` -> `431`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async resume(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Reanuda reproduccion pausada manteniendo el contexto.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.resume`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 34) `togglePauseResume` (`method`)
- Lineas: `433` -> `435`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async togglePauseResume(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.togglePauseResume`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 35) `skip` (`method`)
- Lineas: `438` -> `440`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async skip(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Avanza pista y aplica fallback si corresponde.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlayQueueCommandService.skip`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 36) `back` (`method`)
- Lineas: `442` -> `444`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async back(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.back`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 37) `setAutoplay` (`method`)
- Lineas: `446` -> `448`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async setAutoplay(interaction: MusicInteraction, enabled?: boolean): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `enabled` | `boolean` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlayQueueCommandService.setAutoplay`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 38) `setLoopMode` (`method`)
- Lineas: `450` -> `452`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async setLoopMode(interaction: MusicInteraction, loopMode?: LoopModeName): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `loopMode` | `LoopModeName` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.setLoopMode`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 39) `rewind` (`method`)
- Lineas: `454` -> `456`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async rewind(interaction: MusicInteraction, requestedSeconds?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedSeconds` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.rewind`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 40) `forward` (`method`)
- Lineas: `458` -> `460`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async forward(interaction: MusicInteraction, requestedSeconds?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedSeconds` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.forward`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 41) `replay` (`method`)
- Lineas: `462` -> `464`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async replay(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.replay`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 42) `stop` (`method`)
- Lineas: `466` -> `468`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async stop(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSessionCommandService.stop`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 43) `clearQueue` (`method`)
- Lineas: `471` -> `473`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async clearQueue(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSessionCommandService.clearQueue`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 44) `quit` (`method`)
- Lineas: `476` -> `478`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async quit(interaction: ChatInputCommandInteraction): Promise<string>
```
- Comentario en codigo: `// Cierra sesion de voz y libera estado asociado.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSessionCommandService.quit`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 45) `setVolume` (`method`)
- Lineas: `480` -> `482`
- Acceso: `public`
- Async: si
- Resumen funcional: Aplica un cambio de estado controlado para mantener consistencia del modulo.
- Firma:
```ts
async setVolume(interaction: MusicInteraction, requestedVolume?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedVolume` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicPlaybackCommandService.setVolume`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 46) `getNowPlayingSummary` (`method`)
- Lineas: `484` -> `486`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getNowPlayingSummary(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicReadService.getNowPlayingSummary`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 47) `getQueueSummary` (`method`)
- Lineas: `488` -> `490`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getQueueSummary(interaction: MusicInteraction, requestedPage?: number): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
| `requestedPage` | `number` | si | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicReadService.getQueueSummary`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-session-command-service.ts`

**Responsabilidad:** Caso de uso de sesion (join/quit/clear/stop) y transiciones de estado de la sala de voz.

- Simbolos en este archivo: `5`
- Desglose: funciones=`1`, metodos=`4`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 48 | `method` | `join` |
| 2 | 80 | `method` | `stop` |
| 3 | 105 | `method` | `clearQueue` |
| 4 | 145 | `method` | `quit` |
| 5 | 183 | `function` | `createMusicSessionCommandService` |

#### Detalle por simbolo

#### 1) `join` (`method`)
- Lineas: `48` -> `78`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async join(interaction: ChatInputCommandInteraction): Promise<string>
```
- Comentario en codigo: `// Conecta el bot al canal de voz del usuario.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.syncNowPlayingPanel`, `this.deps.syncIdlePanel`, `this.deps.joinVoiceChannel`
- Await detectados: `this.deps.getVoiceContext`, `this.deps.syncNowPlayingPanel`, `this.deps.syncIdlePanel`, `this.deps.joinVoiceChannel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `stop` (`method`)
- Lineas: `80` -> `102`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async stop(interaction: MusicInteraction): Promise<string>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `this.deps.suppressAutoplayContinuationOnDeleteQueue`, `queue.stop`, `this.deps.clearAutoplayPrefetch`, `this.deps.clearProgressivePlaylistLoad`, `this.deps.clearAutoplayRecentHistory`, `this.deps.syncIdlePanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.stop`, `this.deps.syncIdlePanel`
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `clearQueue` (`method`)
- Lineas: `105` -> `142`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async clearQueue(interaction: MusicInteraction): Promise<string>
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.requireQueue`, `Math.max`, `this.deps.clearProgressivePlaylistLoad`, `this.deps.syncAutoplayPrefetchForQueue`, `this.deps.clearAutoplayPrefetch`, `this.deps.syncNowPlayingPanel`, `queue.songs.splice`
- Await detectados: `this.deps.getVoiceContext`, `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `quit` (`method`)
- Lineas: `145` -> `179`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async quit(interaction: ChatInputCommandInteraction): Promise<string>
```
- Comentario en codigo: `// Cierra sesion de voz y libera estado asociado.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `this.deps.runLoggedAction`, `this.deps.getVoiceContext`, `this.deps.withGuildLock`, `this.deps.hasVoiceConnection`, `this.deps.suppressAutoplayContinuationOnDeleteQueue`, `queue.stop`, `this.deps.clearAutoplayPrefetch`, `this.deps.clearProgressivePlaylistLoad`, `this.deps.clearAutoplayRecentHistory`, `this.deps.clearGuildInactivityTimers`, `this.deps.leaveVoiceChannel`, `this.deps.syncIdlePanel`
- Await detectados: `this.deps.getVoiceContext`, `queue.stop`, `this.deps.syncIdlePanel`
- Efectos secundarios detectados: `playback_control`, `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No estoy conectado a un canal de voz en este servidor.')`

#### 5) `createMusicSessionCommandService` (`function`)
- Lineas: `183` -> `187`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicSessionCommandService(deps: MusicSessionCommandServiceDeps): MusicSessionCommandService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicSessionCommandServiceDeps` | no | no |
- Retorno: `MusicSessionCommandService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-source-service.ts`

**Responsabilidad:** Facade de resolucion de fuentes (YouTube/Spotify/busquedas) y carga progresiva de playlists.

- Simbolos en este archivo: `12`
- Desglose: funciones=`1`, metodos=`11`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 77 | `getter` | `progressivePlaylistLoadsByGuild` |
| 2 | 82 | `method` | `syncNowPlayingPanel` |
| 3 | 87 | `method` | `verifyBundledYtDlpBinaryOnStartup` |
| 4 | 91 | `method` | `resolveSpotifyTrackToPlayableSourceWithYtDlp` |
| 5 | 96 | `method` | `resolveFirstSearchUrlWithYtDlp` |
| 6 | 100 | `method` | `getBundledYtDlpExecutablePath` |
| 7 | 104 | `method` | `loadYouTubeFlatPlaylistEntries` |
| 8 | 112 | `method` | `reorderYouTubePlaylistEntriesForInput` |
| 9 | 117 | `method` | `clearProgressivePlaylistLoadInternal` |
| 10 | 139 | `method` | `clearProgressivePlaylistLoad` |
| 11 | 144 | `method` | `tryPlayYouTubePlaylistProgressively` |
| 12 | 157 | `method` | `tryPlaySpotifyPlaylistProgressively` |

#### Detalle por simbolo

#### 1) `progressivePlaylistLoadsByGuild` (`getter`)
- Lineas: `77` -> `79`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get progressivePlaylistLoadsByGuild(): Map<string, ProgressivePlaylistLoadState>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, ProgressivePlaylistLoadState>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `syncNowPlayingPanel` (`method`)
- Lineas: `82` -> `84`
- Acceso: `private`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlayingPanel(queue: Queue): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `verifyBundledYtDlpBinaryOnStartup` (`method`)
- Lineas: `87` -> `89`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
verifyBundledYtDlpBinaryOnStartup(): void
```
- Comentario en codigo: `// Verifica precondiciones tecnicas antes de continuar el flujo.`
- Parametros: ninguno.
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceYtDlpService.verifyBundledYtDlpBinaryOnStartup`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `resolveSpotifyTrackToPlayableSourceWithYtDlp` (`method`)
- Lineas: `91` -> `93`
- Acceso: `public`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl: string): Promise<string | null>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceSpotifyService.resolveSpotifyTrackToPlayableSourceWithYtDlp`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `resolveFirstSearchUrlWithYtDlp` (`method`)
- Lineas: `96` -> `98`
- Acceso: `public`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceYtDlpService.resolveFirstSearchUrlWithYtDlp`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `getBundledYtDlpExecutablePath` (`method`)
- Lineas: `100` -> `102`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getBundledYtDlpExecutablePath(): string
```
- Parametros: ninguno.
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceYtDlpService.getBundledYtDlpExecutablePath`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `loadYouTubeFlatPlaylistEntries` (`method`)
- Lineas: `104` -> `110`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async loadYouTubeFlatPlaylistEntries(inputUrl: string): Promise<{
    playlistId: string;
    playlistTitle: string | null;
    entries: FlatPlaylistEntry[];
  }>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
- Retorno: `Promise<{
    playlistId: string;
    playlistTitle: string | null;
    entries: FlatPlaylistEntry[];
  }>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceYtDlpService.loadYouTubeFlatPlaylistEntries`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `reorderYouTubePlaylistEntriesForInput` (`method`)
- Lineas: `112` -> `114`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
reorderYouTubePlaylistEntriesForInput(inputUrl: string, entries: FlatPlaylistEntry[]): FlatPlaylistEntry[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
| `entries` | `FlatPlaylistEntry[]` | no | no |
- Retorno: `FlatPlaylistEntry[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceYtDlpService.reorderYouTubePlaylistEntriesForInput`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `clearProgressivePlaylistLoadInternal` (`method`)
- Lineas: `117` -> `136`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearProgressivePlaylistLoadInternal(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `this.progressivePlaylistLoadsByGuild.get`, `this.progressivePlaylistLoadsByGuild.delete`, `musicLogger.debug`, `Date.now`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `logging`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `clearProgressivePlaylistLoad` (`method`)
- Lineas: `139` -> `142`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearProgressivePlaylistLoad(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.clearProgressivePlaylistLoadInternal`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `tryPlayYouTubePlaylistProgressively` (`method`)
- Lineas: `144` -> `155`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlayYouTubePlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceYouTubePlaylistService.tryPlayYouTubePlaylistProgressively`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `tryPlaySpotifyPlaylistProgressively` (`method`)
- Lineas: `157` -> `168`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: {
      member: GuildMember;
      textChannel?: GuildTextBasedChannel;
    };
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceSpotifyService.tryPlaySpotifyPlaylistProgressively`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-source-spotify-playlist-service.ts`

**Responsabilidad:** Carga progresiva de playlists de Spotify: resolucion track->fuente reproducible y encolado por lotes.

- Simbolos en este archivo: `11`
- Desglose: funciones=`4`, metodos=`7`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 63 | `getter` | `player` |
| 2 | 68 | `getter` | `progressivePlaylistLoadsByGuild` |
| 3 | 72 | `getter` | `playlistProgressiveBatchDelayMs` |
| 4 | 77 | `method` | `syncNowPlayingPanel` |
| 5 | 82 | `method` | `resolveFirstSearchUrlWithYtDlp` |
| 6 | 87 | `method` | `clearProgressivePlaylistLoad` |
| 7 | 91 | `method` | `extractSpotifyPlaylistSeedTracksFromResolvedResult` |
| 8 | 147 | `method` | `resolveSpotifySeedTrackToPlayableEntry` |
| 9 | 164 | `method` | `startProgressiveSpotifyPlaylistLoad` |
| 10 | 318 | `method` | `tryPlaySpotifyPlaylistProgressively` |
| 11 | 422 | `function` | `createMusicSourceSpotifyPlaylistService` |

#### Detalle por simbolo

#### 1) `player` (`getter`)
- Lineas: `63` -> `65`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `progressivePlaylistLoadsByGuild` (`getter`)
- Lineas: `68` -> `70`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get progressivePlaylistLoadsByGuild(): Map<string, ProgressivePlaylistLoadState>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, ProgressivePlaylistLoadState>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `playlistProgressiveBatchDelayMs` (`getter`)
- Lineas: `72` -> `74`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get playlistProgressiveBatchDelayMs(): number
```
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `syncNowPlayingPanel` (`method`)
- Lineas: `77` -> `79`
- Acceso: `private`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlayingPanel(queue: Queue): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `resolveFirstSearchUrlWithYtDlp` (`method`)
- Lineas: `82` -> `84`
- Acceso: `private`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.resolveFirstSearchUrlWithYtDlp`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `clearProgressivePlaylistLoad` (`method`)
- Lineas: `87` -> `89`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearProgressivePlaylistLoad(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.clearProgressivePlaylistLoad`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `extractSpotifyPlaylistSeedTracksFromResolvedResult` (`method`)
- Lineas: `91` -> `144`
- Acceso: `private`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractSpotifyPlaylistSeedTracksFromResolvedResult(resolved: unknown): { playlistTitle: string | null; tracks: SpotifyPlaylistSeedTrack[] } | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `{ playlistTitle: string | null; tracks: SpotifyPlaylistSeedTrack[] } | null`
- Complejidad estimada (ramas): `9`
- Llamadas principales detectadas: `Array.isArray`, `record.name.trim`, `song.name.trim`, `song.uploader.name.trim`, `song.url.startsWith`, `seedTrack.name.toLowerCase`, `seedTrack.uploaderName.toLowerCase`, `dedupedByKey.has`, `dedupedByKey.set`, `dedupedByKey.values`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `resolveSpotifySeedTrackToPlayableEntry` (`method`)
- Lineas: `147` -> `162`
- Acceso: `private`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveSpotifySeedTrackToPlayableEntry(spotifyPlugin: Pick<SpotifyPluginLike, 'createSearchQuery'>, seedTrack: SpotifyPlaylistSeedTrack): Promise<FlatPlaylistEntry>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `spotifyPlugin` | `Pick<SpotifyPluginLike, 'createSearchQuery'>` | no | no |
| `seedTrack` | `SpotifyPlaylistSeedTrack` | no | no |
- Retorno: `Promise<FlatPlaylistEntry>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `spotifyPlugin.createSearchQuery`, `isYtDlpSearchInput`, `this.resolveFirstSearchUrlWithYtDlp`
- Await detectados: `this.resolveFirstSearchUrlWithYtDlp`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `startProgressiveSpotifyPlaylistLoad` (`method`)
- Lineas: `164` -> `316`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
startProgressiveSpotifyPlaylistLoad(params: {
    guildId: string;
    voiceChannel: VoiceBasedChannel;
    member: GuildMember;
    textChannel: GuildTextBasedChannel | null;
    firstEntryUrl: string;
    playlistTitle: string | null;
    spotifyPlugin: Pick<SpotifyPluginLike, 'createSearchQuery'>;
    remainingSeedTracks: SpotifyPlaylistSeedTrack[];
  }): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    guildId: string;
    voiceChannel: VoiceBasedChannel;
    member: GuildMember;
    textChannel: GuildTextBasedChannel | null;
    firstEntryUrl: string;
    playlistTitle: string | null;
    spotifyPlugin: Pick<SpotifyPluginLike, 'createSearchQuery'>;
    remainingSeedTracks: SpotifyPlaylistSeedTrack[];
  }` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `11`
- Llamadas principales detectadas: `this.clearProgressivePlaylistLoad`, `Symbol`, `Date.now`, `this.progressivePlaylistLoadsByGuild.set`, `musicLogger.info`, `(async () => {
      let failedEntries = 0;

      for (const [index, seedTrack] of remainingSeedTracks.entries()) {
        const active = this.progressivePlaylistLoadsByGuild.get(guildId);
        if (!active || active.token !== token) {
          return;
        }

        const currentQueue = this.player.getQueue(guildId);
        const targetVoiceChannel = currentQueue?.voice.channel ?? voiceChannel;
        if (!targetVoiceChannel) {
          this.clearProgressivePlaylistLoad(guildId, 'missing_voice_channel');
          return;
        }

        const playOptions: { member: GuildMember; textChannel?: GuildTextBasedChannel } = { member };
        if (textChannel) {
          playOptions.textChannel = textChannel;
        }

        try {
          const entry = await this.resolveSpotifySeedTrackToPlayableEntry(spotifyPlugin, seedTrack);
          await this.player.play(targetVoiceChannel, entry.url, playOptions);

          const refreshed = this.progressivePlaylistLoadsByGuild.get(guildId);
          if (refreshed?.token === token) {
            refreshed.addedEntries += 1;
            if (
              refreshed.addedEntries === refreshed.totalEntries ||
              refreshed.addedEntries % 5 === 0 ||
              index === remainingSeedTracks.length - 1
            ) {
              musicLogger.info(
                {
                  event: 'progressive_playlist_load_progress',
                  playlistSource: 'spotify',
                  guildId,
                  playlistTitle,
                  addedEntries: refreshed.addedEntries,
                  totalEntries: refreshed.totalEntries,
                },
                'progressive playlist loading progress',
              );
            }
          }
        } catch (error) {
          failedEntries += 1;
          const errorMessage = error instanceof Error ? error.message : String(error);
          musicLogger.warn(
            {
              event: 'progressive_playlist_load_entry_failed',
              playlistSource: 'spotify',
              guildId,
              playlistTitle,
              entryTitle: `${seedTrack.name} - ${seedTrack.uploaderName}`,
              entryUrl: seedTrack.spotifyUrl,
              errorMessage,
            },
            'failed to enqueue playlist entry during progressive load',
          );
        }

        if (index < remainingSeedTracks.length - 1) {
          await waitMs(this.playlistProgressiveBatchDelayMs);
        }
      }

      const active = this.progressivePlaylistLoadsByGuild.get(guildId);
      if (!active || active.token !== token) {
        return;
      }

      this.progressivePlaylistLoadsByGuild.delete(guildId);
      musicLogger.info(
        {
          event: 'progressive_playlist_load_completed',
          playlistSource: 'spotify',
          guildId,
          playlistTitle,
          totalEntries: active.totalEntries,
          addedEntries: active.addedEntries,
          failedEntries,
          durationMs: Date.now() - active.startedAt,
        },
        'progressive playlist loading completed',
      );
    })().catch`, `(async () => {
      let failedEntries = 0;

      for (const [index, seedTrack] of remainingSeedTracks.entries()) {
        const active = this.progressivePlaylistLoadsByGuild.get(guildId);
        if (!active || active.token !== token) {
          return;
        }

        const currentQueue = this.player.getQueue(guildId);
        const targetVoiceChannel = currentQueue?.voice.channel ?? voiceChannel;
        if (!targetVoiceChannel) {
          this.clearProgressivePlaylistLoad(guildId, 'missing_voice_channel');
          return;
        }

        const playOptions: { member: GuildMember; textChannel?: GuildTextBasedChannel } = { member };
        if (textChannel) {
          playOptions.textChannel = textChannel;
        }

        try {
          const entry = await this.resolveSpotifySeedTrackToPlayableEntry(spotifyPlugin, seedTrack);
          await this.player.play(targetVoiceChannel, entry.url, playOptions);

          const refreshed = this.progressivePlaylistLoadsByGuild.get(guildId);
          if (refreshed?.token === token) {
            refreshed.addedEntries += 1;
            if (
              refreshed.addedEntries === refreshed.totalEntries ||
              refreshed.addedEntries % 5 === 0 ||
              index === remainingSeedTracks.length - 1
            ) {
              musicLogger.info(
                {
                  event: 'progressive_playlist_load_progress',
                  playlistSource: 'spotify',
                  guildId,
                  playlistTitle,
                  addedEntries: refreshed.addedEntries,
                  totalEntries: refreshed.totalEntries,
                },
                'progressive playlist loading progress',
              );
            }
          }
        } catch (error) {
          failedEntries += 1;
          const errorMessage = error instanceof Error ? error.message : String(error);
          musicLogger.warn(
            {
              event: 'progressive_playlist_load_entry_failed',
              playlistSource: 'spotify',
              guildId,
              playlistTitle,
              entryTitle: `${seedTrack.name} - ${seedTrack.uploaderName}`,
              entryUrl: seedTrack.spotifyUrl,
              errorMessage,
            },
            'failed to enqueue playlist entry during progressive load',
          );
        }

        if (index < remainingSeedTracks.length - 1) {
          await waitMs(this.playlistProgressiveBatchDelayMs);
        }
      }

      const active = this.progressivePlaylistLoadsByGuild.get(guildId);
      if (!active || active.token !== token) {
        return;
      }

      this.progressivePlaylistLoadsByGuild.delete(guildId);
      musicLogger.info(
        {
          event: 'progressive_playlist_load_completed',
          playlistSource: 'spotify',
          guildId,
          playlistTitle,
          totalEntries: active.totalEntries,
          addedEntries: active.addedEntries,
          failedEntries,
          durationMs: Date.now() - active.startedAt,
        },
        'progressive playlist loading completed',
      );
    })`, `remainingSeedTracks.entries`, `this.progressivePlaylistLoadsByGuild.get`, `this.player.getQueue`, `this.resolveSpotifySeedTrackToPlayableEntry`, `this.player.play`, `String`, `musicLogger.warn`
- Await detectados: `this.resolveSpotifySeedTrackToPlayableEntry`, `this.player.play`, `waitMs`
- Efectos secundarios detectados: `state_mutation`, `logging`, `playback_control`, `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `tryPlaySpotifyPlaylistProgressively` (`method`)
- Lineas: `318` -> `418`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `12`
- Llamadas principales detectadas: `isYtDlpSearchInput`, `isSpotifyTrackUrl`, `isSpotifyPlaylistLikeUrl`, `this.deps.getSpotifyPlugin`, `spotifyPlugin.validate`, `spotifyPlugin.resolve`, `this.extractSpotifyPlaylistSeedTracksFromResolvedResult`, `playlistData.tracks.entries`, `this.resolveSpotifySeedTrackToPlayableEntry`, `String`, `musicLogger.warn`, `this.player.play`, `this.player.getQueue`, `this.syncNowPlayingPanel`
- Await detectados: `spotifyPlugin.resolve`, `this.resolveSpotifySeedTrackToPlayableEntry`, `this.player.play`, `this.syncNowPlayingPanel`
- Efectos secundarios detectados: `logging`, `playback_control`, `state_mutation`, `error_control`
- Control de errores: 2 throw(s), 1 catch(es)
- Throw examples (max 5):
  - `new MusicUserError( 'No pude leer pistas reproducibles de esa playlist/album de Spotify (asegurate de que sea publico).', )`
  - `new MusicUserError( 'No pude convertir ninguna pista de esa playlist de Spotify a una fuente reproducible.', )`

#### 11) `createMusicSourceSpotifyPlaylistService` (`function`)
- Lineas: `422` -> `426`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicSourceSpotifyPlaylistService(deps: MusicSourceSpotifyPlaylistServiceDeps): MusicSourceSpotifyPlaylistService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicSourceSpotifyPlaylistServiceDeps` | no | no |
- Retorno: `MusicSourceSpotifyPlaylistService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-source-spotify-service.ts`

**Responsabilidad:** Integracion de fuentes Spotify (track/playlist) sobre adapters de resolucion actuales.

- Simbolos en este archivo: `9`
- Desglose: funciones=`2`, metodos=`7`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 69 | `getter` | `player` |
| 2 | 74 | `method` | `syncNowPlayingPanel` |
| 3 | 79 | `method` | `resolveFirstSearchUrlWithYtDlp` |
| 4 | 84 | `method` | `clearProgressivePlaylistLoad` |
| 5 | 88 | `method` | `getSpotifyPlugin` |
| 6 | 98 | `method` | `extractFirstSpotifySongLikeFromResolvedResult` |
| 7 | 134 | `method` | `resolveSpotifyTrackToPlayableSourceWithYtDlp` |
| 8 | 170 | `method` | `tryPlaySpotifyPlaylistProgressively` |
| 9 | 182 | `function` | `createMusicSourceSpotifyService` |

#### Detalle por simbolo

#### 1) `player` (`getter`)
- Lineas: `69` -> `71`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `syncNowPlayingPanel` (`method`)
- Lineas: `74` -> `76`
- Acceso: `private`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlayingPanel(queue: Queue): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `resolveFirstSearchUrlWithYtDlp` (`method`)
- Lineas: `79` -> `81`
- Acceso: `private`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.resolveFirstSearchUrlWithYtDlp`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `clearProgressivePlaylistLoad` (`method`)
- Lineas: `84` -> `86`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearProgressivePlaylistLoad(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.clearProgressivePlaylistLoad`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `getSpotifyPlugin` (`method`)
- Lineas: `88` -> `96`
- Acceso: `private`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getSpotifyPlugin(): SpotifyPluginLike | undefined
```
- Parametros: ninguno.
- Retorno: `SpotifyPluginLike | undefined`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.player.plugins.find`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `extractFirstSpotifySongLikeFromResolvedResult` (`method`)
- Lineas: `98` -> `131`
- Acceso: `private`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractFirstSpotifySongLikeFromResolvedResult(resolved: unknown): { name?: string; uploader?: { name?: string } } | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `{ name?: string; uploader?: { name?: string } } | null`
- Complejidad estimada (ramas): `6`
- Llamadas principales detectadas: `Array.isArray`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `resolveSpotifyTrackToPlayableSourceWithYtDlp` (`method`)
- Lineas: `134` -> `168`
- Acceso: `public`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveSpotifyTrackToPlayableSourceWithYtDlp(inputUrl: string): Promise<string | null>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `5`
- Llamadas principales detectadas: `isSpotifyTrackUrl`, `this.getSpotifyPlugin`, `spotifyPlugin.validate`, `spotifyPlugin.resolve`, `this.extractFirstSpotifySongLikeFromResolvedResult`, `spotifyPlugin.createSearchQuery`, `isYtDlpSearchInput`, `this.resolveFirstSearchUrlWithYtDlp`, `musicLogger.info`
- Await detectados: `spotifyPlugin.resolve`, `this.resolveFirstSearchUrlWithYtDlp`
- Efectos secundarios detectados: `logging`, `error_control`
- Control de errores: 2 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No pude resolver la pista de Spotify para reproducirla.')`
  - `new MusicUserError('No pude obtener el artista de la pista de Spotify para buscarla.')`

#### 8) `tryPlaySpotifyPlaylistProgressively` (`method`)
- Lineas: `170` -> `178`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlaySpotifyPlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.musicSourceSpotifyPlaylistService.tryPlaySpotifyPlaylistProgressively`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `createMusicSourceSpotifyService` (`function`)
- Lineas: `182` -> `186`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicSourceSpotifyService(deps: MusicSourceSpotifyServiceDeps): MusicSourceSpotifyService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicSourceSpotifyServiceDeps` | no | no |
- Retorno: `MusicSourceSpotifyService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-source-youtube-playlist-service.ts`

**Responsabilidad:** Carga progresiva de playlists de YouTube con orden estable y control de progreso.

- Simbolos en este archivo: `10`
- Desglose: funciones=`4`, metodos=`6`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 51 | `getter` | `player` |
| 2 | 56 | `getter` | `progressivePlaylistLoadsByGuild` |
| 3 | 60 | `getter` | `playlistProgressiveBatchDelayMs` |
| 4 | 65 | `method` | `syncNowPlayingPanel` |
| 5 | 70 | `method` | `clearProgressivePlaylistLoad` |
| 6 | 74 | `method` | `loadYouTubeFlatPlaylistEntries` |
| 7 | 78 | `method` | `reorderYouTubePlaylistEntriesForInput` |
| 8 | 82 | `method` | `startProgressivePlaylistLoad` |
| 9 | 221 | `method` | `tryPlayYouTubePlaylistProgressively` |
| 10 | 284 | `function` | `createMusicSourceYouTubePlaylistService` |

#### Detalle por simbolo

#### 1) `player` (`getter`)
- Lineas: `51` -> `53`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `progressivePlaylistLoadsByGuild` (`getter`)
- Lineas: `56` -> `58`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get progressivePlaylistLoadsByGuild(): Map<string, ProgressivePlaylistLoadState>
```
- Comentario en codigo: `// Getter de solo lectura para encapsular acceso a dependencias/estado.`
- Parametros: ninguno.
- Retorno: `Map<string, ProgressivePlaylistLoadState>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `playlistProgressiveBatchDelayMs` (`getter`)
- Lineas: `60` -> `62`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get playlistProgressiveBatchDelayMs(): number
```
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `syncNowPlayingPanel` (`method`)
- Lineas: `65` -> `67`
- Acceso: `private`
- Async: si
- Resumen funcional: Sincroniza estado entre componentes para evitar desalineaciones.
- Firma:
```ts
async syncNowPlayingPanel(queue: Queue): Promise<void>
```
- Comentario en codigo: `// Sincroniza estado interno con panel/UI u otros servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.syncNowPlayingPanel`
- Await detectados: `this.deps.syncNowPlayingPanel`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `clearProgressivePlaylistLoad` (`method`)
- Lineas: `70` -> `72`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
clearProgressivePlaylistLoad(guildId: string, reason: string): void
```
- Comentario en codigo: `// Limpia o invalida estado temporal asociado a la operacion.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guildId` | `string` | no | no |
| `reason` | `string` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.clearProgressivePlaylistLoad`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `loadYouTubeFlatPlaylistEntries` (`method`)
- Lineas: `74` -> `76`
- Acceso: `private`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async loadYouTubeFlatPlaylistEntries(inputUrl: string): Promise<{ playlistId: string; playlistTitle: string; entries: FlatPlaylistEntry[]; }>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
- Retorno: `Promise<{ playlistId: string; playlistTitle: string; entries: FlatPlaylistEntry[]; }>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.loadYouTubeFlatPlaylistEntries`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `reorderYouTubePlaylistEntriesForInput` (`method`)
- Lineas: `78` -> `80`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
reorderYouTubePlaylistEntriesForInput(inputUrl: string, entries: FlatPlaylistEntry[]): FlatPlaylistEntry[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
| `entries` | `FlatPlaylistEntry[]` | no | no |
- Retorno: `FlatPlaylistEntry[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.reorderYouTubePlaylistEntriesForInput`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `startProgressivePlaylistLoad` (`method`)
- Lineas: `82` -> `219`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
startProgressivePlaylistLoad(params: {
    guildId: string;
    voiceChannel: VoiceBasedChannel;
    member: GuildMember;
    textChannel: GuildTextBasedChannel | null;
    firstEntryUrl: string;
    playlistTitle: string | null;
    remainingEntries: FlatPlaylistEntry[];
  }): void
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    guildId: string;
    voiceChannel: VoiceBasedChannel;
    member: GuildMember;
    textChannel: GuildTextBasedChannel | null;
    firstEntryUrl: string;
    playlistTitle: string | null;
    remainingEntries: FlatPlaylistEntry[];
  }` | no | no |
- Retorno: `void`
- Complejidad estimada (ramas): `11`
- Llamadas principales detectadas: `this.clearProgressivePlaylistLoad`, `Symbol`, `Date.now`, `this.progressivePlaylistLoadsByGuild.set`, `musicLogger.info`, `(async () => {
      let failedEntries = 0;

      for (const [index, entry] of remainingEntries.entries()) {
        const active = this.progressivePlaylistLoadsByGuild.get(guildId);
        if (!active || active.token !== token) {
          return;
        }

        const currentQueue = this.player.getQueue(guildId);
        const targetVoiceChannel = currentQueue?.voice.channel ?? voiceChannel;
        if (!targetVoiceChannel) {
          this.clearProgressivePlaylistLoad(guildId, 'missing_voice_channel');
          return;
        }

        const playOptions: PlayOptions = { member };
        if (textChannel) {
          playOptions.textChannel = textChannel;
        }

        try {
          await this.player.play(targetVoiceChannel, entry.url, playOptions);

          const refreshed = this.progressivePlaylistLoadsByGuild.get(guildId);
          if (refreshed?.token === token) {
            refreshed.addedEntries += 1;

            if (
              refreshed.addedEntries === refreshed.totalEntries ||
              refreshed.addedEntries % 5 === 0 ||
              index === remainingEntries.length - 1
            ) {
              musicLogger.info(
                {
                  event: 'progressive_playlist_load_progress',
                  guildId,
                  playlistTitle,
                  addedEntries: refreshed.addedEntries,
                  totalEntries: refreshed.totalEntries,
                },
                'progressive playlist loading progress',
              );
            }
          }
        } catch (error) {
          failedEntries += 1;
          const errorMessage = error instanceof Error ? error.message : String(error);
          musicLogger.warn(
            {
              event: 'progressive_playlist_load_entry_failed',
              guildId,
              playlistTitle,
              entryUrl: entry.url,
              entryTitle: entry.title,
              errorMessage,
            },
            'failed to enqueue playlist entry during progressive load',
          );
        }

        if (index < remainingEntries.length - 1) {
          await waitMs(this.playlistProgressiveBatchDelayMs);
        }
      }

      const active = this.progressivePlaylistLoadsByGuild.get(guildId);
      if (!active || active.token !== token) {
        return;
      }

      this.progressivePlaylistLoadsByGuild.delete(guildId);
      musicLogger.info(
        {
          event: 'progressive_playlist_load_completed',
          guildId,
          playlistTitle,
          totalEntries: active.totalEntries,
          addedEntries: active.addedEntries,
          failedEntries,
          durationMs: Date.now() - active.startedAt,
        },
        'progressive playlist loading completed',
      );
    })().catch`, `(async () => {
      let failedEntries = 0;

      for (const [index, entry] of remainingEntries.entries()) {
        const active = this.progressivePlaylistLoadsByGuild.get(guildId);
        if (!active || active.token !== token) {
          return;
        }

        const currentQueue = this.player.getQueue(guildId);
        const targetVoiceChannel = currentQueue?.voice.channel ?? voiceChannel;
        if (!targetVoiceChannel) {
          this.clearProgressivePlaylistLoad(guildId, 'missing_voice_channel');
          return;
        }

        const playOptions: PlayOptions = { member };
        if (textChannel) {
          playOptions.textChannel = textChannel;
        }

        try {
          await this.player.play(targetVoiceChannel, entry.url, playOptions);

          const refreshed = this.progressivePlaylistLoadsByGuild.get(guildId);
          if (refreshed?.token === token) {
            refreshed.addedEntries += 1;

            if (
              refreshed.addedEntries === refreshed.totalEntries ||
              refreshed.addedEntries % 5 === 0 ||
              index === remainingEntries.length - 1
            ) {
              musicLogger.info(
                {
                  event: 'progressive_playlist_load_progress',
                  guildId,
                  playlistTitle,
                  addedEntries: refreshed.addedEntries,
                  totalEntries: refreshed.totalEntries,
                },
                'progressive playlist loading progress',
              );
            }
          }
        } catch (error) {
          failedEntries += 1;
          const errorMessage = error instanceof Error ? error.message : String(error);
          musicLogger.warn(
            {
              event: 'progressive_playlist_load_entry_failed',
              guildId,
              playlistTitle,
              entryUrl: entry.url,
              entryTitle: entry.title,
              errorMessage,
            },
            'failed to enqueue playlist entry during progressive load',
          );
        }

        if (index < remainingEntries.length - 1) {
          await waitMs(this.playlistProgressiveBatchDelayMs);
        }
      }

      const active = this.progressivePlaylistLoadsByGuild.get(guildId);
      if (!active || active.token !== token) {
        return;
      }

      this.progressivePlaylistLoadsByGuild.delete(guildId);
      musicLogger.info(
        {
          event: 'progressive_playlist_load_completed',
          guildId,
          playlistTitle,
          totalEntries: active.totalEntries,
          addedEntries: active.addedEntries,
          failedEntries,
          durationMs: Date.now() - active.startedAt,
        },
        'progressive playlist loading completed',
      );
    })`, `remainingEntries.entries`, `this.progressivePlaylistLoadsByGuild.get`, `this.player.getQueue`, `this.player.play`, `String`, `musicLogger.warn`, `waitMs`
- Await detectados: `this.player.play`, `waitMs`
- Efectos secundarios detectados: `state_mutation`, `logging`, `playback_control`, `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `tryPlayYouTubePlaylistProgressively` (`method`)
- Lineas: `221` -> `280`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async tryPlayYouTubePlaylistProgressively(params: {
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }): Promise<string | null>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `params` | `{
    context: VoiceContextLike;
    normalizedInput: string;
    rawInput: string;
    hadCurrentSong: boolean;
    playOptions: PlayOptions;
  }` | no | no |
- Retorno: `Promise<string | null>`
- Complejidad estimada (ramas): `8`
- Llamadas principales detectadas: `isYtDlpSearchInput`, `isYouTubePlaylistLikeUrl`, `this.loadYouTubeFlatPlaylistEntries`, `this.reorderYouTubePlaylistEntriesForInput`, `this.player.play`, `this.player.getQueue`, `this.syncNowPlayingPanel`, `orderedEntries.slice`, `this.startProgressivePlaylistLoad`, `this.clearProgressivePlaylistLoad`, `rawInput.trim`
- Await detectados: `this.loadYouTubeFlatPlaylistEntries`, `this.player.play`, `this.syncNowPlayingPanel`
- Efectos secundarios detectados: `playback_control`, `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('La playlist no devolvio pistas reproducibles.')`

#### 10) `createMusicSourceYouTubePlaylistService` (`function`)
- Lineas: `284` -> `288`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicSourceYouTubePlaylistService(deps: MusicSourceYouTubePlaylistServiceDeps): MusicSourceYouTubePlaylistService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicSourceYouTubePlaylistServiceDeps` | no | no |
- Retorno: `MusicSourceYouTubePlaylistService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-source-ytdlp-service.ts`

**Responsabilidad:** Adapter central de yt-dlp para resolver URLs/busquedas y extraer metadata reproducible.

- Simbolos en este archivo: `12`
- Desglose: funciones=`4`, metodos=`8`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 45 | `getter` | `player` |
| 2 | 49 | `getter` | `playlistProgressiveFlatTimeoutMs` |
| 3 | 53 | `getter` | `playlistProgressiveMaxEntries` |
| 4 | 57 | `method` | `extractResolvableUrlsFromYtDlpResult` |
| 5 | 62 | `method` | `verifyBundledYtDlpBinaryOnStartup` |
| 6 | 83 | `method` | `resolveFirstSearchUrlWithYtDlp` |
| 7 | 139 | `method` | `getBundledYtDlpExecutablePath` |
| 8 | 144 | `method` | `loadYouTubeFlatPlaylistEntries` |
| 9 | 233 | `method` | `reorderYouTubePlaylistEntriesForInput` |
| 10 | 256 | `method` | `runYtDlpBinaryStartupCheck` |
| 11 | 293 | `method` | `toFlatPlaylistEntry` |
| 12 | 321 | `function` | `createMusicSourceYtDlpService` |

#### Detalle por simbolo

#### 1) `player` (`getter`)
- Lineas: `45` -> `47`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get player(): DisTube
```
- Parametros: ninguno.
- Retorno: `DisTube`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getMusicPlayer`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `playlistProgressiveFlatTimeoutMs` (`getter`)
- Lineas: `49` -> `51`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get playlistProgressiveFlatTimeoutMs(): number
```
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `playlistProgressiveMaxEntries` (`getter`)
- Lineas: `53` -> `55`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
get playlistProgressiveMaxEntries(): number
```
- Parametros: ninguno.
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `extractResolvableUrlsFromYtDlpResult` (`method`)
- Lineas: `57` -> `59`
- Acceso: `private`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
extractResolvableUrlsFromYtDlpResult(resolved: unknown): string[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `resolved` | `unknown` | no | no |
- Retorno: `string[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `this.deps.extractResolvableUrlsFromYtDlpResult`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `verifyBundledYtDlpBinaryOnStartup` (`method`)
- Lineas: `62` -> `80`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
verifyBundledYtDlpBinaryOnStartup(): void
```
- Comentario en codigo: `// Verifica precondiciones tecnicas antes de continuar el flujo.`
- Parametros: ninguno.
- Retorno: `void`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.runYtDlpBinaryStartupCheck`, `this.ytdlpStartupCheckPromise.catch`, `String`, `musicLogger.error`, `this.getBundledYtDlpExecutablePath`
- Await detectados: ninguna
- Efectos secundarios detectados: `logging`, `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `resolveFirstSearchUrlWithYtDlp` (`method`)
- Lineas: `83` -> `137`
- Acceso: `public`
- Async: si
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
async resolveFirstSearchUrlWithYtDlp(input: string): Promise<string>
```
- Comentario en codigo: `// Resuelve entradas externas a una fuente reproducible o usable.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `input` | `string` | no | no |
- Retorno: `Promise<string>`
- Complejidad estimada (ramas): `6`
- Llamadas principales detectadas: `this.player.plugins.find`, `plugin.resolve`, `isTransientYtDlpSpawnError`, `String`, `musicLogger.warn`, `waitMs`, `this.extractResolvableUrlsFromYtDlpResult`
- Await detectados: `plugin.resolve`, `waitMs`
- Efectos secundarios detectados: `logging`, `state_mutation`, `error_control`
- Control de errores: 3 throw(s), 1 catch(es)
- Throw examples (max 5):
  - `new Error('YtDlpPlugin no disponible para resolver busquedas de texto.')`
  - `error`
  - `new MusicUserError('No encontre resultados para esa busqueda/URL. Prueba con otro termino.')`

#### 7) `getBundledYtDlpExecutablePath` (`method`)
- Lineas: `139` -> `142`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getBundledYtDlpExecutablePath(): string
```
- Parametros: ninguno.
- Retorno: `string`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `path.join`, `process.cwd`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `loadYouTubeFlatPlaylistEntries` (`method`)
- Lineas: `144` -> `231`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async loadYouTubeFlatPlaylistEntries(inputUrl: string): Promise<LoadedYouTubeFlatPlaylist>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
- Retorno: `Promise<LoadedYouTubeFlatPlaylist>`
- Complejidad estimada (ramas): `9`
- Llamadas principales detectadas: `extractYouTubePlaylistId`, `buildCanonicalYouTubePlaylistUrl`, `this.getBundledYtDlpExecutablePath`, `execFileAsync`, `String`, `musicLogger.warn`, `JSON.parse`, `Array.isArray`, `parsed.entries
          .map((entry) => this.toFlatPlaylistEntry(entry))
          .filter`, `parsed.entries
          .map`, `this.toFlatPlaylistEntry`, `Boolean`, `buildAutoplayCandidateKey`, `dedupedEntriesByKey.has`
- Await detectados: `execFileAsync`
- Efectos secundarios detectados: `logging`, `state_mutation`, `error_control`
- Control de errores: 4 throw(s), 2 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No pude identificar el ID de la playlist de YouTube.')`
  - `new MusicUserError( 'No pude leer esa playlist de YouTube por ahora. Prueba con otra playlist publica o con una URL de video.', )`
  - `new MusicUserError('No pude interpretar la respuesta de la playlist de YouTube.')`
  - `new MusicUserError( 'La playlist no devolvio pistas reproducibles (asegurate de que sea publica).', )`

#### 9) `reorderYouTubePlaylistEntriesForInput` (`method`)
- Lineas: `233` -> `253`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
reorderYouTubePlaylistEntriesForInput(inputUrl: string, entries: FlatPlaylistEntry[]): FlatPlaylistEntry[]
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `inputUrl` | `string` | no | no |
| `entries` | `FlatPlaylistEntry[]` | no | no |
- Retorno: `FlatPlaylistEntry[]`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `extractYouTubeVideoId`, `entries.findIndex`, `reorderedEntries.splice`, `reorderedEntries.unshift`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `runYtDlpBinaryStartupCheck` (`method`)
- Lineas: `256` -> `291`
- Acceso: `private`
- Async: si
- Resumen funcional: Orquesta varios pasos de negocio en secuencia, normalmente con manejo de errores y estado.
- Firma:
```ts
async runYtDlpBinaryStartupCheck(): Promise<void>
```
- Comentario en codigo: `// Orquesta la ejecucion completa con logging y control de errores.`
- Parametros: ninguno.
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `this.getBundledYtDlpExecutablePath`, `musicLogger.info`, `stat`, `fileStats.isFile`, `execFileAsync`, `result.stdout.trim().split`, `result.stdout.trim`
- Await detectados: `stat`, `execFileAsync`
- Efectos secundarios detectados: `logging`, `error_control`
- Control de errores: 2 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new Error('yt-dlp path exists but is not a file')`
  - `new Error('yt-dlp binary exists but is empty (0 bytes)')`

#### 11) `toFlatPlaylistEntry` (`method`)
- Lineas: `293` -> `317`
- Acceso: `private`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toFlatPlaylistEntry(rawEntry: unknown): FlatPlaylistEntry | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `rawEntry` | `unknown` | no | no |
- Retorno: `FlatPlaylistEntry | null`
- Complejidad estimada (ramas): `7`
- Llamadas principales detectadas: `record.url.startsWith`, `record.webpage_url.startsWith`, `record.title.trim`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `createMusicSourceYtDlpService` (`function`)
- Lineas: `321` -> `325`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicSourceYtDlpService(deps: MusicSourceYtDlpServiceDeps): MusicSourceYtDlpService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicSourceYtDlpServiceDeps` | no | no |
- Retorno: `MusicSourceYtDlpService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/services/music-voice-context-service.ts`

**Responsabilidad:** Resuelve contexto de voz/texto del usuario y valida precondiciones antes de operar en musica.

- Simbolos en este archivo: `4`
- Desglose: funciones=`2`, metodos=`2`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 30 | `function` | `toGuildTextChannel` |
| 2 | 41 | `method` | `getVoiceContext` |
| 3 | 91 | `method` | `requireQueue` |
| 4 | 103 | `function` | `createMusicVoiceContextService` |

#### Detalle por simbolo

#### 1) `toGuildTextChannel` (`function`)
- Lineas: `30` -> `36`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toGuildTextChannel(interaction: MusicInteractionLike): GuildTextBasedChannel | null
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteractionLike` | no | no |
- Retorno: `GuildTextBasedChannel | null`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `interaction.channel.isTextBased`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `getVoiceContext` (`method`)
- Lineas: `41` -> `89`
- Acceso: `public`
- Async: si
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
async getVoiceContext(interaction: MusicInteractionLike, options?: {
      requireQueue?: boolean;
    }): Promise<VoiceContext>
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `MusicInteractionLike` | no | no |
| `options` | `{
      requireQueue?: boolean;
    }` | si | no |
- Retorno: `Promise<VoiceContext>`
- Complejidad estimada (ramas): `7`
- Llamadas principales detectadas: `interaction.guild.members.fetch`, `voiceChannel.permissionsFor`, `permissions?.has`, `permissions.has`, `this.deps.getQueue`, `toGuildTextChannel`
- Await detectados: `interaction.guild.members.fetch`
- Efectos secundarios detectados: `error_control`
- Control de errores: 7 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('Este comando solo funciona dentro de un servidor.')`
  - `new MusicUserError('Debes estar en un canal de voz para usar este comando.')`
  - `new MusicUserError('No pude resolver mi miembro del servidor para validar permisos.')`
  - `new MusicUserError('Debes estar en el mismo canal de voz que el bot.')`
  - `new MusicUserError('No tengo permiso Connect en ese canal de voz.')`

#### 3) `requireQueue` (`method`)
- Lineas: `91` -> `99`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
requireQueue(context: VoiceContext): Queue
```
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `context` | `VoiceContext` | no | no |
- Retorno: `Queue`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('No hay pista activa en este momento.')`

#### 4) `createMusicVoiceContextService` (`function`)
- Lineas: `103` -> `107`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
createMusicVoiceContextService(deps: MusicVoiceContextServiceDeps): MusicVoiceContextService
```
- Comentario en codigo: `// Fabrica una instancia/servicio con dependencias ya cableadas.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `deps` | `MusicVoiceContextServiceDeps` | no | no |
- Retorno: `MusicVoiceContextService`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/shared/music-command-utils.ts`

**Responsabilidad:** Helpers compartidos de parsing/normalizacion para comandos de musica.

- Simbolos en este archivo: `4`
- Desglose: funciones=`4`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 9 | `function` | `toRepeatLabel` |
| 2 | 17 | `function` | `sanitizeSeconds` |
| 3 | 29 | `function` | `normalizePlayInput` |
| 4 | 49 | `function` | `formatQueueSong` |

#### Detalle por simbolo

#### 1) `toRepeatLabel` (`function`)
- Lineas: `9` -> `14`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toRepeatLabel(mode: RepeatMode): string
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `mode` | `RepeatMode` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `sanitizeSeconds` (`function`)
- Lineas: `17` -> `26`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
sanitizeSeconds(value: number | null | undefined, fallback: number): number
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `value` | `number | null | undefined` | no | no |
| `fallback` | `number` | no | no |
- Retorno: `number`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `Number.isNaN`, `Math.max`, `Math.min`, `Math.floor`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `normalizePlayInput` (`function`)
- Lineas: `29` -> `46`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
normalizePlayInput(rawInput: string): string
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `rawInput` | `string` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `rawInput.trim`, `/^https?:\/\//i.test`, `/^(ytsearch:|scsearch:)/i.test`
- Await detectados: ninguna
- Efectos secundarios detectados: `error_control`
- Control de errores: 1 throw(s), 0 catch(es)
- Throw examples (max 5):
  - `new MusicUserError('Debes indicar una URL o busqueda para /play.')`

#### 4) `formatQueueSong` (`function`)
- Lineas: `49` -> `56`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
formatQueueSong(song: Queue['songs'][number], index?: number): string
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `song` | `Queue['songs'][number]` | no | no |
| `index` | `number` | si | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/shared/runtime-utils.ts`

**Responsabilidad:** Utilidades de runtime (timeouts, waits, serializacion de errores) reutilizadas por servicios.

- Simbolos en este archivo: `5`
- Desglose: funciones=`5`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 5 | `function` | `readPositiveTimeoutMs` |
| 2 | 18 | `function` | `waitMs` |
| 3 | 29 | `function` | `isTransientYtDlpSpawnError` |
| 4 | 48 | `function` | `toLoggableErrorMessage` |
| 5 | 88 | `function` | `isUnavailableYouTubeVideoError` |

#### Detalle por simbolo

#### 1) `readPositiveTimeoutMs` (`function`)
- Lineas: `5` -> `15`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
readPositiveTimeoutMs(envName: string, fallback: number): number
```
- Comentario en codigo: `@file src/modules/music/shared/runtime-utils.ts @description Utilidades de runtime (timeouts, waits, serializacion de errores) reutilizadas por servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `envName` | `string` | no | no |
| `fallback` | `number` | no | no |
- Retorno: `number`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `Number`, `Number.isFinite`, `Math.floor`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `waitMs` (`function`)
- Lineas: `18` -> `26`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
waitMs(ms: number): Promise<void>
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `ms` | `number` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `Promise.resolve`, `setTimeout`
- Await detectados: ninguna
- Efectos secundarios detectados: `timers`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `isTransientYtDlpSpawnError` (`function`)
- Lineas: `29` -> `45`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isTransientYtDlpSpawnError(error: unknown): boolean
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `error.message.toUpperCase`, `normalizedMessage.includes`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `toLoggableErrorMessage` (`function`)
- Lineas: `48` -> `85`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toLoggableErrorMessage(error: unknown, maxLength?: number): {
  message: string;
  originalLength: number;
  truncated: boolean;
}
```
- Comentario en codigo: `// Helper compartido para reducir duplicacion entre comandos y servicios.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
| `maxLength` | `number` | si | no |
- Retorno: `{
  message: string;
  originalLength: number;
  truncated: boolean;
}`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `JSON.stringify`, `String`, `raw.replace(/\s+/g, ' ').trim`, `raw.replace`, `normalized.slice`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `error_control`
- Control de errores: 0 throw(s), 1 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `isUnavailableYouTubeVideoError` (`function`)
- Lineas: `88` -> `109`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
isUnavailableYouTubeVideoError(error: unknown): boolean
```
- Comentario en codigo: `// Detecta errores tipicos de YouTube cuando una URL ya no es reproducible.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `error` | `unknown` | no | no |
- Retorno: `boolean`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `raw.toLowerCase`, `normalized.includes`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/ui/control-buttons.ts`

**Responsabilidad:** Construye la botonera de control de musica para Discord (acciones principales y estados).

- Simbolos en este archivo: `3`
- Desglose: funciones=`3`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 19 | `function` | `toLoopLabel` |
| 2 | 27 | `function` | `deriveState` |
| 3 | 45 | `function` | `buildMusicControlComponents` |

#### Detalle por simbolo

#### 1) `toLoopLabel` (`function`)
- Lineas: `19` -> `24`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toLoopLabel(mode: RepeatMode | undefined): string
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `mode` | `RepeatMode | undefined` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `deriveState` (`function`)
- Lineas: `27` -> `42`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
deriveState(queue?: Queue): QueueControlState
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | si | no |
- Retorno: `QueueControlState`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `Boolean`, `toLoopLabel`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `buildMusicControlComponents` (`function`)
- Lineas: `45` -> `123`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildMusicControlComponents(queue?: Queue): ActionRowBuilder<ButtonBuilder>[]
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | si | no |
- Retorno: `ActionRowBuilder<ButtonBuilder>[]`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `deriveState`, `new ActionRowBuilder<ButtonBuilder>().addComponents`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.QUEUE)
      .setLabel('QUEUE')
      .setStyle(ButtonStyle.Primary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.QUEUE)
      .setLabel('QUEUE')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.QUEUE)
      .setLabel`, `new ButtonBuilder()
      .setCustomId`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.CLEAR)
      .setLabel('CLEAR')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.CLEAR)
      .setLabel('CLEAR')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.CLEAR)
      .setLabel`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.LOOP)
      .setLabel(`LOOP ${state.loopLabel}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.LOOP)
      .setLabel(`LOOP ${state.loopLabel}`)
      .setStyle`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.LOOP)
      .setLabel`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.AUTOPLAY)
      .setLabel(`AUTOPLAY ${state.autoplay ? 'ON' : 'OFF'}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(MUSIC_BUTTON_IDS.AUTOPLAY)
      .setLabel(`AUTOPLAY ${state.autoplay ? 'ON' : 'OFF'}`)
      .setStyle`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/music/ui/now-playing-embed.ts`

**Responsabilidad:** Construye el embed de now playing y campos auxiliares mostrados al usuario.

- Simbolos en este archivo: `4`
- Desglose: funciones=`4`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 15 | `function` | `toRepeatLabel` |
| 2 | 23 | `function` | `formatSongTitle` |
| 3 | 30 | `function` | `buildNowPlayingEmbed` |
| 4 | 63 | `function` | `buildIdleMusicEmbed` |

#### Detalle por simbolo

#### 1) `toRepeatLabel` (`function`)
- Lineas: `15` -> `20`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
toRepeatLabel(mode: RepeatMode): string
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `mode` | `RepeatMode` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `formatSongTitle` (`function`)
- Lineas: `23` -> `27`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
formatSongTitle(songName: string, songUrl?: string): string
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `songName` | `string` | no | no |
| `songUrl` | `string` | si | no |
- Retorno: `string`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `buildNowPlayingEmbed` (`function`)
- Lineas: `30` -> `60`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildNowPlayingEmbed(queue: Queue, options?: NowPlayingEmbedOptions): EmbedBuilder
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `queue` | `Queue` | no | no |
| `options` | `NowPlayingEmbedOptions` | si | no |
- Retorno: `EmbedBuilder`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `song?.source?.toUpperCase`, `Math.max`, `new EmbedBuilder()
    .setColor(0x2f9ed9)
    .setTitle('Now Playing')
    .setDescription(`${formatSongTitle(title, song?.url)}\n- **(${duration})**\n- ${requestedBy}`)
    .addFields(
      { name: 'Song By', value: uploader, inline: true },
      { name: 'Source', value: source, inline: true },
      { name: 'Queue', value: `${queueRemaining}`, inline: true },
      { name: nextTrackFieldName, value: nextTrackLabel, inline: false },
    )
    .setFooter({
      text: `Autoplay: ${queue.autoplay ? 'ON' : 'OFF'} | Loop: ${toRepeatLabel(queue.repeatMode)} | Vol: ${queue.volume}%`,
    })
    .setTimestamp`, `new EmbedBuilder()
    .setColor(0x2f9ed9)
    .setTitle('Now Playing')
    .setDescription(`${formatSongTitle(title, song?.url)}\n- **(${duration})**\n- ${requestedBy}`)
    .addFields(
      { name: 'Song By', value: uploader, inline: true },
      { name: 'Source', value: source, inline: true },
      { name: 'Queue', value: `${queueRemaining}`, inline: true },
      { name: nextTrackFieldName, value: nextTrackLabel, inline: false },
    )
    .setFooter`, `new EmbedBuilder()
    .setColor(0x2f9ed9)
    .setTitle('Now Playing')
    .setDescription(`${formatSongTitle(title, song?.url)}\n- **(${duration})**\n- ${requestedBy}`)
    .addFields`, `new EmbedBuilder()
    .setColor(0x2f9ed9)
    .setTitle('Now Playing')
    .setDescription`, `new EmbedBuilder()
    .setColor(0x2f9ed9)
    .setTitle`, `new EmbedBuilder()
    .setColor`, `formatSongTitle`, `toRepeatLabel`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `buildIdleMusicEmbed` (`function`)
- Lineas: `63` -> `70`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildIdleMusicEmbed(reason: string): EmbedBuilder
```
- Comentario en codigo: `// Construye parte de la UI enviada a Discord (embed/componente/campo).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `reason` | `string` | no | no |
- Retorno: `EmbedBuilder`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `new EmbedBuilder()
    .setColor(0x5f6368)
    .setTitle('Now Playing')
    .setDescription(reason)
    .setTimestamp`, `new EmbedBuilder()
    .setColor(0x5f6368)
    .setTitle('Now Playing')
    .setDescription`, `new EmbedBuilder()
    .setColor(0x5f6368)
    .setTitle`, `new EmbedBuilder()
    .setColor`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/utility/help.ts`

**Responsabilidad:** Comando help: genera ayuda contextual y listado de comandos disponibles.

- Simbolos en este archivo: `12`
- Desglose: funciones=`12`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 79 | `function` | `formatHelpField` |
| 2 | 85 | `function` | `buildHelpButtonId` |
| 3 | 92 | `function` | `parseHelpButtonPage` |
| 4 | 117 | `function` | `getPagePosition` |
| 5 | 122 | `function` | `buildFooterText` |
| 6 | 129 | `function` | `buildHelpEmbed` |
| 7 | 196 | `function` | `buildNavigationRow` |
| 8 | 221 | `function` | `buildSectionRow` |
| 9 | 240 | `function` | `buildHelpComponents` |
| 10 | 245 | `function` | `buildHelpMessagePayload` |
| 11 | 253 | `function` | `handleHelp` |
| 12 | 262 | `function` | `handleHelpButtonInteraction` |

#### Detalle por simbolo

#### 1) `formatHelpField` (`function`)
- Lineas: `79` -> `82`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
formatHelpField(rows: HelpRow[]): string
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `rows` | `HelpRow[]` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `rows.map((row) => `• \`${row.command}\` — ${row.description}`).join`, `rows.map`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `buildHelpButtonId` (`function`)
- Lineas: `85` -> `89`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildHelpButtonId(page: HelpPageId, action?: HelpButtonAction): string
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `page` | `HelpPageId` | no | no |
| `action` | `HelpButtonAction` | si | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: ninguna detectada
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `parseHelpButtonPage` (`function`)
- Lineas: `92` -> `114`
- Acceso: `public`
- Async: no
- Resumen funcional: Transforma o valida datos de entrada para que el resto del flujo trabaje con una forma estable.
- Firma:
```ts
parseHelpButtonPage(customId: string): HelpPageId | null
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `customId` | `string` | no | no |
- Retorno: `HelpPageId | null`
- Complejidad estimada (ramas): `4`
- Llamadas principales detectadas: `customId.startsWith`, `customId.split`, `HELP_BUTTON_ACTIONS.includes`, `HELP_PAGE_ORDER.includes`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `getPagePosition` (`function`)
- Lineas: `117` -> `119`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
getPagePosition(page: HelpPageId): number
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `page` | `HelpPageId` | no | no |
- Retorno: `number`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `HELP_PAGE_ORDER.indexOf`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 5) `buildFooterText` (`function`)
- Lineas: `122` -> `126`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildFooterText(page: HelpPageId): string
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `page` | `HelpPageId` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `getPagePosition`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 6) `buildHelpEmbed` (`function`)
- Lineas: `129` -> `193`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildHelpEmbed(page: HelpPageId): EmbedBuilder
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `page` | `HelpPageId` | no | no |
- Retorno: `EmbedBuilder`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `new EmbedBuilder().setColor(0x5865f2).setTitle`, `new EmbedBuilder().setColor`, `embed
      .setDescription(
        [
          '😺🎶 **Meow meow!** Esta es la guía de TrufaBot en formato paginado.',
          '',
          '**Índice rápido**',
          '• 🛠️ **Utilidad**: `/ping`, `/uptime`, `/welcome`, `/help`',
          '• 🎵 **Música**: slash commands de reproducción/cola/voz',
          '• 🎛️ **Panel**: botones del mensaje *Now Playing*',
          '',
          '💡 Tip: puedes usar las flechas ⬅️➡️ o los botones de sección para navegar.',
        ].join('\n'),
      )
      .addFields(
        {
          name: '✨ Soporta',
          value:
            '• Búsquedas por texto\n• URLs de YouTube\n• URLs de Spotify\n• Panel de control con botones',
        },
        {
          name: '🔒 Visibilidad',
          value:
            'Este `/help` es **efímero** (solo lo ves tú), así no ensucia el canal mientras revisas comandos.',
        },
      )
      .setFooter`, `embed
      .setDescription(
        [
          '😺🎶 **Meow meow!** Esta es la guía de TrufaBot en formato paginado.',
          '',
          '**Índice rápido**',
          '• 🛠️ **Utilidad**: `/ping`, `/uptime`, `/welcome`, `/help`',
          '• 🎵 **Música**: slash commands de reproducción/cola/voz',
          '• 🎛️ **Panel**: botones del mensaje *Now Playing*',
          '',
          '💡 Tip: puedes usar las flechas ⬅️➡️ o los botones de sección para navegar.',
        ].join('\n'),
      )
      .addFields`, `embed
      .setDescription`, `[
          '😺🎶 **Meow meow!** Esta es la guía de TrufaBot en formato paginado.',
          '',
          '**Índice rápido**',
          '• 🛠️ **Utilidad**: `/ping`, `/uptime`, `/welcome`, `/help`',
          '• 🎵 **Música**: slash commands de reproducción/cola/voz',
          '• 🎛️ **Panel**: botones del mensaje *Now Playing*',
          '',
          '💡 Tip: puedes usar las flechas ⬅️➡️ o los botones de sección para navegar.',
        ].join`, `buildFooterText`, `embed
      .setDescription('Herramientas base para comprobar estado, latencia y uso del bot. 🧰')
      .addFields({
        name: '🛠️ Comandos de utilidad',
        value: formatHelpField(utilityCommands),
      })
      .setFooter`, `embed
      .setDescription('Herramientas base para comprobar estado, latencia y uso del bot. 🧰')
      .addFields`, `formatHelpField`, `embed
      .setDescription(
        'Comandos slash del módulo de música para voz, reproducción, cola y control de sesión. 🎶',
      )
      .addFields({
        name: '🎵 Slash Commands de música',
        value: formatHelpField(musicCommands),
      })
      .setFooter`, `embed
      .setDescription(
        'Comandos slash del módulo de música para voz, reproducción, cola y control de sesión. 🎶',
      )
      .addFields`, `embed
    .setDescription(
      'Botones del panel de reproducción (*Now Playing*) para control rápido sin escribir comandos. 🎛️',
    )
    .addFields({
      name: '🎛️ Controles del panel',
      value: formatHelpField(panelControls),
    })
    .setFooter`, `embed
    .setDescription(
      'Botones del panel de reproducción (*Now Playing*) para control rápido sin escribir comandos. 🎛️',
    )
    .addFields`
- Await detectados: ninguna
- Efectos secundarios detectados: `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 7) `buildNavigationRow` (`function`)
- Lineas: `196` -> `218`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildNavigationRow(currentPage: HelpPageId): ActionRowBuilder<ButtonBuilder>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `currentPage` | `HelpPageId` | no | no |
- Retorno: `ActionRowBuilder<ButtonBuilder>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `getPagePosition`, `Math.max`, `Math.min`, `new ActionRowBuilder<ButtonBuilder>().addComponents`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId(previousPage, 'nav-prev'))
      .setLabel('⬅️')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId(previousPage, 'nav-prev'))
      .setLabel('⬅️')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId(previousPage, 'nav-prev'))
      .setLabel`, `new ButtonBuilder()
      .setCustomId`, `buildHelpButtonId`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('index', 'nav-home'))
      .setLabel('🏠 Índice')
      .setStyle(currentPage === 'index' ? ButtonStyle.Primary : ButtonStyle.Secondary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('index', 'nav-home'))
      .setLabel('🏠 Índice')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('index', 'nav-home'))
      .setLabel`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId(nextPage, 'nav-next'))
      .setLabel('➡️')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId(nextPage, 'nav-next'))
      .setLabel('➡️')
      .setStyle`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 8) `buildSectionRow` (`function`)
- Lineas: `221` -> `237`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildSectionRow(currentPage: HelpPageId): ActionRowBuilder<ButtonBuilder>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `currentPage` | `HelpPageId` | no | no |
- Retorno: `ActionRowBuilder<ButtonBuilder>`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `new ActionRowBuilder<ButtonBuilder>().addComponents`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('utility', 'section'))
      .setLabel('🛠️ Utilidad')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('utility', 'section'))
      .setLabel`, `new ButtonBuilder()
      .setCustomId`, `buildHelpButtonId`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('music', 'section'))
      .setLabel('🎵 Música')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('music', 'section'))
      .setLabel`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('panel', 'section'))
      .setLabel('🎛️ Panel')
      .setStyle`, `new ButtonBuilder()
      .setCustomId(buildHelpButtonId('panel', 'section'))
      .setLabel`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 9) `buildHelpComponents` (`function`)
- Lineas: `240` -> `242`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildHelpComponents(page: HelpPageId): ActionRowBuilder<ButtonBuilder>[]
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `page` | `HelpPageId` | no | no |
- Retorno: `ActionRowBuilder<ButtonBuilder>[]`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `buildNavigationRow`, `buildSectionRow`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 10) `buildHelpMessagePayload` (`function`)
- Lineas: `245` -> `250`
- Acceso: `public`
- Async: no
- Resumen funcional: Construye estructuras/payloads reutilizables para responder o continuar el flujo.
- Firma:
```ts
buildHelpMessagePayload(page: HelpPageId): { embeds: EmbedBuilder[]; components: ActionRowBuilder<ButtonBuilder>[]; }
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `page` | `HelpPageId` | no | no |
- Retorno: `{ embeds: EmbedBuilder[]; components: ActionRowBuilder<ButtonBuilder>[]; }`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `buildHelpEmbed`, `buildHelpComponents`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 11) `handleHelp` (`function`)
- Lineas: `253` -> `259`
- Acceso: `public`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handleHelp(interaction: ChatInputCommandInteraction): Promise<void>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `interaction.reply`, `buildHelpMessagePayload`
- Await detectados: `interaction.reply`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 12) `handleHelpButtonInteraction` (`function`)
- Lineas: `262` -> `271`
- Acceso: `public`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handleHelpButtonInteraction(interaction: ButtonInteraction): Promise<boolean>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ButtonInteraction` | no | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `parseHelpButtonPage`, `interaction.update`, `buildHelpMessagePayload`
- Await detectados: `interaction.update`
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/utility/index.ts`

**Responsabilidad:** Agrupa/exporta comandos utilitarios del bot.

- Simbolos en este archivo: `0`
- Desglose: funciones=`0`, metodos=`0`

- Este archivo no declara funciones/metodos detectables; contiene contratos, exports o composicion.

### `src/modules/utility/ping.ts`

**Responsabilidad:** Comando ping: diagnostico rapido de latencia y estado basico.

- Simbolos en este archivo: `1`
- Desglose: funciones=`1`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 13 | `function` | `handlePing` |

#### Detalle por simbolo

#### 1) `handlePing` (`function`)
- Lineas: `13` -> `47`
- Acceso: `public`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handlePing(interaction: ChatInputCommandInteraction): Promise<void>
```
- Comentario en codigo: `// Ejecuta /ping y responde con latencia de gateway (WS) y round-trip aproximado (HTTP).`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `interaction.reply`, `interaction.editReply`
- Await detectados: `interaction.reply`, `interaction.editReply`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/utility/uptime.ts`

**Responsabilidad:** Comando uptime: reporta tiempo de actividad del bot en formato legible.

- Simbolos en este archivo: `2`
- Desglose: funciones=`2`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 13 | `function` | `formatDuration` |
| 2 | 52 | `function` | `handleUptime` |

#### Detalle por simbolo

#### 1) `formatDuration` (`function`)
- Lineas: `13` -> `49`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
formatDuration(ms: number): string
```
- Comentario en codigo: `// Convierte milisegundos en una cadena corta legible (d/h/m/s) para respuestas de estado.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `ms` | `number` | no | no |
- Retorno: `string`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `Math.floor`, `parts.push`, `parts.join`
- Await detectados: ninguna
- Efectos secundarios detectados: `state_mutation`, `playback_control`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `handleUptime` (`function`)
- Lineas: `52` -> `71`
- Acceso: `public`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handleUptime(interaction: ChatInputCommandInteraction): Promise<void>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `0`
- Llamadas principales detectadas: `Math.floor`, `process.uptime`, `formatDuration`, `Date.now`, `interaction.reply`
- Await detectados: `interaction.reply`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

### `src/modules/utility/welcome.ts`

**Responsabilidad:** Comando/evento de bienvenida: selecciona canal y envia mensaje inicial de onboarding.

- Simbolos en este archivo: `4`
- Desglose: funciones=`4`, metodos=`0`

#### Resumen de simbolos

| # | Linea | Tipo | Simbolo |
| ---: | ---: | --- | --- |
| 1 | 17 | `function` | `canSendGuildMessage` |
| 2 | 40 | `function` | `pickGuildWelcomeChannel` |
| 3 | 57 | `function` | `sendGuildWelcomeMessage` |
| 4 | 69 | `function` | `handleWelcome` |

#### Detalle por simbolo

#### 1) `canSendGuildMessage` (`function`)
- Lineas: `17` -> `37`
- Acceso: `public`
- Async: no
- Resumen funcional: Consulta estado o evalua una condicion sin mutar datos principales.
- Firma:
```ts
canSendGuildMessage(guild: Guild, channel: GuildBasedChannel | null): channel is GuildTextBasedChannel
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guild` | `Guild` | no | no |
| `channel` | `GuildBasedChannel | null` | no | no |
- Retorno: `channel is GuildTextBasedChannel`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `channel.isTextBased`, `channel.permissionsFor`, `permissions.has`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 2) `pickGuildWelcomeChannel` (`function`)
- Lineas: `40` -> `54`
- Acceso: `public`
- Async: no
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
pickGuildWelcomeChannel(guild: Guild): GuildTextBasedChannel | null
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guild` | `Guild` | no | no |
- Retorno: `GuildTextBasedChannel | null`
- Complejidad estimada (ramas): `3`
- Llamadas principales detectadas: `canSendGuildMessage`, `guild.channels.cache.values`
- Await detectados: ninguna
- Efectos secundarios detectados: no detectados
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 3) `sendGuildWelcomeMessage` (`function`)
- Lineas: `57` -> `66`
- Acceso: `public`
- Async: si
- Resumen funcional: Funcion de soporte del modulo; revisar llamadas y efectos para ubicar su rol exacto en el flujo.
- Firma:
```ts
async sendGuildWelcomeMessage(guild: Guild): Promise<boolean>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `guild` | `Guild` | no | no |
- Retorno: `Promise<boolean>`
- Complejidad estimada (ramas): `1`
- Llamadas principales detectadas: `pickGuildWelcomeChannel`, `welcomeChannel.send`
- Await detectados: `welcomeChannel.send`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

#### 4) `handleWelcome` (`function`)
- Lineas: `69` -> `94`
- Acceso: `public`
- Async: si
- Resumen funcional: Punto de entrada del flujo: recibe una interaccion/evento y delega la logica al servicio correspondiente.
- Firma:
```ts
async handleWelcome(interaction: ChatInputCommandInteraction): Promise<void>
```
- Comentario en codigo: `// Handler de comando: transforma la peticion del usuario en una accion de negocio.`
| Parametro | Tipo | Opcional | Rest |
| --- | --- | --- | --- |
| `interaction` | `ChatInputCommandInteraction` | no | no |
- Retorno: `Promise<void>`
- Complejidad estimada (ramas): `2`
- Llamadas principales detectadas: `interaction.reply`, `sendGuildWelcomeMessage`
- Await detectados: `interaction.reply`, `sendGuildWelcomeMessage`
- Efectos secundarios detectados: `discord_messages`
- Control de errores: 0 throw(s), 0 catch(es)
- Throw examples (max 5):
  - ninguno

## Nota de mantenimiento

- Regenera este archivo cuando cambie cualquier `.ts` o `.mjs` de `src/` o `scripts/`.
- Script recomendado: `node scripts/generate-function-docs.mjs`.
- Inventario estructurado sincronizado: [docs/function-inventory.json](function-inventory.json).
