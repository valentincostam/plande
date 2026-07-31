# Plan: Hardening y Generalización del Modelo Nativo (post `study-plan-v5-spec`)

Ejecutor: agente autónomo. Este documento es la única fuente de verdad del trabajo. Leer antes de empezar: `docs/testing.md`, `docs/svelte.md`, `docs/architecture.md`, `study-plan-master-plan.md` (contexto histórico).

## Estado de ejecución

- **Fase 0: COMPLETADA.** `main` sincronizado; 4 planes nuevos convertidos al modelo nativo; fixes semánticos de UCAECE y UTN FRC portados sin renumerar `seqId`; catálogo y registry en 47 planes.
- **Fase 1: COMPLETADA** (commit `79a6680`). Serialización unificada por seqId (courses+milestones en un solo `s=`), sin `m=`, sin `allowInvalidPassedState`, undo/reset/localStorage/og indexados unificado. Golden fixtures legacy en `src/lib/legacy-url-compat.svelte.test.ts`. E2E nuevos en `e2e/milestone-persistence.spec.ts`.
- **Fase 2: COMPLETADA** (commit `d4b0529`). `evaluateProgress` recursivo; graduación `{id,label,expr,weight}` (los 43 planes migrados con codemod, weight explícito en todos los sum); selectores `all`/`sections`; nodo `countOf` (en lugar de `count.of` — tipado más estricto, misma expresividad); `req.every`/`req.countOf`; ciclos solo sobre edges directos; registry seqId en `src/routes/[slug]/data/seq-id-registry.json` + test de enforcement + `bun run registry:seq`; UNaHur enforced (E2E `e2e/count-gated-courses.spec.ts`); harness muerto de equivalencia eliminado.
- **Nota Fase 2:** `meetsRequirementState` quedó unificado en el evaluador y `isViewRequirementMet` delega en él; la copia inline en `native-dependent.svelte` queda para la Fase 3 (renderer recursivo la reemplaza entera).
- **Fase 3: COMPLETADA** (commit `138159c`). Árbol recursivo `ViewRequirementNode` + componente `native-requirement-node.svelte` (any como alternativas, expresiones mixtas completas, cuantitativos con progreso y copy en el componente); dependents solo-cursar (semántica legacy en ranking y listas); dedupe multi-placement en `courseItems`; milestones con placement renderizan en su término; bulk-select gateado por año real; borrados `native-requirement-summary`, campos alias de `PreparedPlan` y el param `path`. E2E nuevos en `e2e/requirement-tree.spec.ts`.
- **Pendiente de Fase 3 (menor):** no existe aún plan con `any`/mixto en datos, así que el rendering de esos nodos solo tiene cobertura indirecta (unit del motor + componente); al cargar el primer plan que los use, agregar el E2E correspondiente.
- **Hardening post-review: COMPLETADO.** Validación de alcanzabilidad para ciclos lógicos ocultos por alternativas; invariantes numéricos/estructurales completos; `year` semántico derivado en `preparePlan`; IDs DOM únicos para items multi-placement. Gates: check, 138 unit y 269 E2E verdes (1 skipped).
- **Fases 4-6: PENDIENTES.**

## Objetivo

Cerrar los bugs confirmados del review de la rama `study-plan-v5-spec`, generalizar el motor de requisitos para cubrir el espacio real de correlatividades argentinas, y dejar la UI consumiendo el modelo nativo sin adapters. Sin deuda técnica remanente.

## Decisiones ya tomadas (NO re-discutir)

1. **Producción corre `main`.** Compatibilidad = URLs/localStorage del esquema legacy de main. Las URLs generadas por esta rama en previews NO importan. Por lo tanto: serialización unificada (ver Fase 1), sin param `m=`.
2. **Dependents / "Materias que desbloquea" / ranking prioritarias: semántica de producción** — contar y listar SOLO dependientes por requisito de cursar (`enroll`), como en main. Los edges de `complete` siguen existiendo en `PreparedPlan` pero la UI y el ranking no los usan.
3. **Eliminar `allowInvalidPassedState`** y su plumbing completo. Bulk-select asigna estados y la autocorrección normaliza al instante (comportamiento de main). Sin estado fantasma sesión-vs-recarga.
4. **La fase de performance está en scope** (Fase 5).
5. **El export JSON no tiene consumidores conocidos.** Sin obligación de compat: se rediseña nativo (ver Fase 4), se elimina la conversión al shape legacy (`studyPlanDataToStudyPlan`).
6. **Rama de trabajo:** la misma `study-plan-v5-spec` (nunca se mergeó; no apilar otra rama).
7. **UNaHur:** los requisitos "N materias regularizadas" se modelan Y se enforcean (ver Fase 2.9). Es corrección de fidelidad al plan real: hoy la app muestra esas materias siempre habilitadas cuando la universidad exige 5/6/10 regularizadas.

## Reglas duras

- Rama de trabajo nueva desde `study-plan-v5-spec`. Nunca tocar `main`.
- `bun`/`bunx`, no npm/npx. Kebab-case para archivos. DaisyUI para UI.
- **Nunca renumerar `seqId`s existentes.** Items nuevos = `max(seqId)+1`. Es la base de la integridad de URLs compartidas.
- **Cero adapters** legacy→nuevo. Si algo no encaja, se cambia el modelo o la vista, no se envuelve.
- UI de planes clásicos (solo requisitos `all`/`item`): render visualmente equivalente al actual. Solo cambia lo roto o lo nuevo.
- Copy en español vive en componentes Svelte, nunca en `src/lib/*.ts`.
- Tests E2E existentes deben pasar SIN debilitar sus asserts. Tests nuevos siguen `docs/testing.md` estrictamente: en inglés, `getByRole`/`getByLabel`/`getByText`, sin CSS/ID/data-testid, sin `.first()`/`.last()` (scopear), sin `waitForTimeout`.
- Gates por fase (todos verdes antes de pasar a la siguiente): `bun run check` && `bunx vitest run` && `bunx playwright test`. Commit por fase, mensajes sin trailers (sin Co-Authored-By ni similares).
- Fixtures de compatibilidad de URLs se generan desde main real (`git show main:<archivo>`), no se inventan.

## Antipatrones prohibidos (chequear antes de cada commit)

Si el diff contiene alguno de estos, el enfoque está mal — volver atrás y resolver a la altura correcta:

1. **Fixture legacy escrito a mano.** Todo string `s=`/`n=` usado como golden de compatibilidad debe derivarse del orden real del array de cursos en `git show main:src/routes/[slug]/data/<plan>.ts`. Si no podés citar la línea de main de la que salió cada índice, el fixture es inválido.
2. **Ramas por tipo en la card de requisitos.** Si `native-item-card.svelte` (o cualquier componente contenedor) gana condicionales `if percent` / `if count` / `if sum` / `if any`, volviste al patrón lossy que este plan elimina. El render es UN componente recursivo por nodo del árbol; la card solo monta la raíz.
3. **Adapter o shim de compatibilidad.** Cualquier función cuyo nombre o propósito sea "convertir del modelo viejo al nuevo" (o viceversa) en runtime. La única conversión permitida es en fixtures de test.
4. **Debilitar un assert para poner verde un E2E existente.** Si un E2E existente falla, el bug está en el código, no en el test. Investigar y arreglar el código.
5. **Renumerar `seqId`s** o "reordenar para que quede prolijo" un data file. El registry de la Fase 2.7 lo va a rechazar, pero no hay que llegar ahí.
6. **`waitForTimeout`, selectores CSS/ID, `.first()`/`.last()` en E2E.** `docs/testing.md` manda; scopear locators por rol/label.
7. **Avanzar de fase con gates rojos** (`bun run check` && `bunx vitest run` && `bunx playwright test`). Cada fase termina verde y commiteada antes de abrir la siguiente.
8. **Strings de usuario en `src/lib/*.ts`.** Todo texto visible vive en componentes Svelte.

## Fase 0 — Sync con main

1. Merge de `main` a la rama.
2. Convertir al modelo nativo los 4 planes que main agregó después del branch point: `uccuyo-fdcs-ab-2018`, `um-esen-lrp-2023`, `unlam-dcs-ln-2011`, `unpsjb-fi-if`. Usar `skills/add-study-plan`. `seqId` = orden del array legacy de main (idéntico criterio que la migración original).
3. Registrarlos en `src/routes/[slug]/data/all-study-plans.ts`.
4. **Portar fixes de datos que main aplicó a planes que la rama ya convirtió** (revisar `git log <merge-base>..main` completo; al momento de escribir esto: `dfa8e89` UCAECE swap de materias/requisitos/URLs, `5b65c78` correlativas de UTN FRC ISI 2023, `bccce4a` formato de source UNLaM). Comparar plan por plan el diff de main contra la definición nativa y replicar los cambios semánticos.

**Salida:** catálogo de la rama ⊇ catálogo de main, sin drift de datos. Cada plan convertido: misma cantidad de materias, mismos requisitos, misma URL slug que en main. Gates verdes.

## Fase 1 — Serialización unificada de estado (URL, localStorage, undo)

Arregla: milestones nunca persistidos; corrimiento de índices de URLs legacy en `uns-dcs-le-2017`; undo/reset ignorando milestones; codec RLE duplicado.

**Diseño:** UN solo stream `s=` ordenado por `seqId` sobre TODOS los items (courses + milestones), reemplazando el par `s`(cursos)+`m`(milestones).

- Letras de curso: iniciales actuales (`n/e/r/a`). Milestone: `completed`→`a`, `pending`→`n`. Decode de slot milestone: `a`→`completed`, cualquier otra (`n/e/r`)→`pending`.
- Compat legacy por construcción: en la migración `seqId` = índice del array legacy, y en main los milestones ERAN courses en ese array. Entonces una URL legacy decodifica correcta sin remapeo: en `uns-dcs-le-2017`, la letra índice 30 vuelve a caer en el item 4586 (hoy milestone; `a` de legacy = examen aprobado → `completed`). Milestones agregados post-migración (udemm-lpe seqId 51, unlam-dce-lci seqId 37) quedan al final: URLs legacy más cortas → default `pending` por trim de trailing.
- Grades (`n=` / grade-encoding): mismo esquema unificado por `seqId`; slots de milestones siempre vacíos. Índices legacy se preservan.
- localStorage: mismo formato unificado.
- Undo/redo (`state-history.svelte.ts` + `pushHistoryState`/`applyHistoryState` en `+page.svelte`): snapshots del stream unificado — un toggle de milestone genera snapshot y se deshace. "Reiniciar" usa `PlanSession.reset()`.
- Eliminar: `serializeMilestoneStates`/`applySerializedMilestoneStates`, `encodeMilestoneStates`/`decodeMilestoneStates`, el codec RLE duplicado (queda UNO exportado, usado por todos; borrar la copia de `study-plan-url-state.ts` o de `course-state.ts`, la que quede redundante).
- Eliminar `allowInvalidPassedState` (decisión 3): quitar de `PlanItemState`, `ItemFacts`, `normalize-item-state.ts`, `native-study-plan-section.svelte`.

**Tests (unit):** round-trip encode/decode con milestones intercalados y al final; golden fixtures legacy: para `uns-dcs-le-2017` y un plan clásico (`utn-frcu-isi-2023`), construir el string `s=` como lo generaba main (orden del array legacy vía `git show`) y asegurar que cada materia recibe su estado correcto, índice ≥30 incluido. Grade round-trip con milestone en el medio.

**Tests (E2E, nuevos):** completar milestone → recargar → sigue completado y la materia dependiente aprobada no se pierde. Bulk-select en strict mode → recargar → estado estable (sin revert).

**Salida:** URLs legacy de main decodifican exactas; milestones persisten; undo cubre milestones. Gates verdes.

## Fase 2 — Motor único con semántica de progreso

Arregla: `GraduationRequirement` paralelo y más pobre; sin selector "todo el plan" (caso UNaHur); sin orientaciones; ciclo falso con `any`; falsy-zero y no-enforcement de seqId; triple copia de `meetsRequirementState`.

1. **`evaluateProgress(expr, ctx) → { completedUnits, totalUnits, met }`**, recursivo sobre `RequirementExpr`. Semántica exacta:
   - `item`: met ? 1/1 : 0/1.
   - `all`: suma de units de los hijos; met = todos met.
   - `any`: el hijo con mayor ratio completado/total define units y met (desempate: menor totalUnits). met = algún hijo met.
   - `count`: `min(#met, min)/min`.
   - `percent`: requiredCount = `ceil(minPercent/100 * total)`; `min(#met, requiredCount)/requiredCount`.
   - `sum`: `min(Σmetric_met, min)/min`.
   - `evaluateRequirement` queda como wrapper `evaluateProgress(...).met`.
2. **Selectores nuevos:** `{ type: 'all', courseType?: CourseType }` (todos los course items del plan, filtrable por tipo) y `{ type: 'sections', sectionIds: string[], term?: CourseTerm }`. Helpers: `select.all(...)`, `select.sections(...)`.
3. **`count` sobre grupos:** `count` acepta `of: Selector | RequirementExpr[]` (con `RequirementExpr[]`, un hijo cuenta si está met; `state` solo aplica con Selector). Helper `req.countOf(exprs, min)`. Mantener compat de la forma actual con `selector`.
4. **Helper `req.every(selector, state)`** = azúcar de `percent(selector, 100, state)` (no agregar nodo nuevo).
5. **Graduación = `{ id, label, expr: RequirementExpr, weight?: number }[]`.** Eliminar el tipo `GraduationRequirement` y el switch de `evaluateGraduation`; el progreso por bloque sale de `evaluateProgress`. `weight`: inferido = `totalUnits` del expr, EXCEPTO exprs cuya raíz es `sum` donde `weight` es OBLIGATORIO (error de validación en `preparePlan` si falta — mata el footgun horas-dominan-porcentaje). `allMandatory` → `req.every(select.all('mandatory'), 'passed')`. Migrar `unlp-fi-iem-2018` (único plan con graduación) y los helpers `grad.*` a la nueva forma.
6. **`prepare-plan.ts`:** ciclos solo sobre edges `kind: 'direct'` (los `alternative` de `any` no son dependencia dura — arregla el falso positivo A↔B vía any); mantener chequeo de self-reference en selectores. Fix `!(item.id in previousSeqIds)` (falsy-zero). Validar selectores nuevos (sections existen, selector no vacío).
7. **Registry de seqId con enforcement real:** generar `src/routes/[slug]/data/seq-id-registry.json` (`slug → { itemId: seqId }`) desde los datos actuales, versionado. Test unit que corre `preparePlan(plan, { previousSeqIds: registry[slug] })` para TODOS los planes → renumerar un seqId rompe CI. Actualizar `skills/add-study-plan` para regenerar el registry en modo append.
8. **Un solo `meetsRequirementState`:** exportado del evaluador; borrar `isViewRequirementMet` (study-plan-view) y la copia inline de `native-dependent.svelte`; ambos llaman al único. Ídem dedupe helpers: una `uniqueBy(items, keyFn)` en lugar de `uniqByItemId`/`dedupeItemStatesById`/`dedupeStrings`.
9. **Caso de prueba real (UNaHur):** modelar en `unahur-ie-pui-2024.ts` los requisitos hoy en nota de texto: ESI → `req.count(select.all(), 5, 'taken')`; Pensamiento Pedagógico → 6; Historia de la Nación → 10; ACA → 10. La nota informativa se conserva. **Cambio de comportamiento intencional:** esas materias ahora se bloquean hasta cumplir el conteo (fidelidad al plan real). Cubrir con E2E.

**Tests (unit):** `evaluateProgress` por tipo de nodo (incl. anidados any(count, all)), selectores nuevos, `countOf`, weight obligatorio en sum, ciclos con any legítimo (no lanza) y ciclo directo real (lanza), registry.

**Salida:** un solo motor; los 47 planes preparan sin errores; UNaHur enforced. Gates verdes.

## Fase 3 — View model y UI de requisitos

Arregla: `any` renderizado como AND; `count` invisible en expresiones mixtas; strings de desarrollador visibles ("7 items de section year-1"); dependents ampliados; duplicados multi-placement; milestones con placement invisibles; sección nunca "Aprobada" con milestone; gating de bulk-select por índice; `canPass`/`canComplete` duplicados; harness muerto.

1. **Árbol de requisitos en la vista** (reemplaza extracción atómica lossy + resumen XOR): `study-plan-view.ts` expone nodos estructurados `{ nodeType: 'item'|'all'|'any'|'count'|'percent'|'sum', met, progress: {completed,total}, children?, item?, requiredState?, selectorItems?, metric?, label? }` — SIN strings de usuario. Componentes recursivos (`native-requirement-*.svelte`) renderizan:
   - `all` de items: idéntico a hoy (bullets con check/cruz) — pixel-equivalente para planes clásicos.
   - `any`: grupo con encabezado tipo "Alguna de estas opciones:" y check verde del grupo si alguna alternativa cumple.
   - `count`/`percent`/`sum`: línea con progreso ("N de M materias…", "X de Y horas…") usando `evaluateProgress`; si tiene `label` del data file, usarlo como título.
   - Expresión mixta `all(item, count)`: se ven AMBAS partes.
   - Borrar `describeSelector`/`describeSelectorSource`/`formatPercentRequirementDescription` de `study-plan-view.ts` (el texto pasa a componentes).
2. **Dependents:** decisión 2 — count/lista/ranking solo `enroll`. Restaurar equivalencia con main en `priority-courses` y "Habilita N materias"/"Materias que desbloquea" (sin filas duplicadas).
3. **Dedupe multi-placement:** `courseItems` en `+page.svelte` dedupe por `def.id` para stats, distribución, charts, diagrama (un nodo por item) y listas. Las e2e keys dejan de duplicarse. `Proyecto Final` (utn-frcu-ic-2023) cuenta 1.
4. **Milestones con placement:** renderizan en su término via `NativeMilestoneCard` (la rama muerta de `native-study-plan-term.svelte` pasa a ser alcanzable); `deriveSectionState` los cuenta (`completed`≈passed, `pending`≈notTaken se mantiene, pero ahora son completables así que la sección puede aprobar).
5. **Bulk-select gating por año real:** visible si `section.year === undefined` o no-strict o no existe sección con `year === section.year - 1` o todas las secciones con ese año están `passed`. No usar índice del array filtrado.
6. **Colapsar `canPass`/`canComplete`** en una sola derivada (`canComplete`), alias si la UI lo necesita.
7. **Borrar:** `study-plan-native-equivalence.ts` y su test (harness del adapter eliminado), parámetro `path` de `visitRequirementExpr`, campos de `PreparedPlan` sin consumidores (`sections` alias, `itemsBySeqId`/`dependentEdges` si solo los usan tests — que los tests deriven del map).
8. **Semántica de año fuera de strings:** `Section` gana `year?: number` opcional en el tipo (derivado en `preparePlan` de la convención `year-N` si no está explícito); todos los sitios que hoy regex-parsean `year-` consumen `section.year`.

**Tests (E2E, nuevos, en inglés per docs/testing.md):** OR requirement shows as alternatives group and satisfies with one branch; mixed item+count requirement shows both and unblocks only when both met; placed milestone appears in its term and completing it enables dependent course; multi-placement course counted once in stats; UNaHur count-gated course blocked until N courses regularized.

**Salida:** E2E existentes verdes intactos; planes clásicos se ven igual; expresividad nueva visible y correcta. Gates verdes.

## Fase 4 — Export, og.png y muerte del motor legacy

Arregla: refs colgantes en JSON público; requisitos omitidos en md/txt; og.png con porcentaje distinto al donut. El export JSON no tiene consumidores conocidos (decisión 5): NO hay que preservar su shape legacy.

1. **Export nativo:** eliminar `studyPlanDataToStudyPlan` y todo el shape legacy aplanado (`requiredCourseId`, arrays paralelos). `GET /[slug].json` sirve el `StudyPlanData` nativo tal cual (items con `kind`, `RequirementExpr`, sections, placements) — cero conversión, cero mantenimiento. Los formatters markdown/plaintext consumen el modelo nativo directamente y renderizan TODOS los requisitos, incluidos los que referencian milestones ("Requiere: Examen de Suficiencia de Inglés E completado") y los cuantitativos ("Requiere: 5 materias regularizadas"). Migrar cualquier otro consumidor interno de `studyPlanDataToStudyPlan` (og.png, rutas custom como `utn-frcu-isi/electivas`) al modelo nativo.
2. **og.png:** usa el mismo `evaluateGraduation`/`evaluateProgress` que la página — mismo número que el donut para el mismo `?s=`.
3. **Borrar el motor legacy completo:** `degree-progress.ts`, `inferProgressConfig`, `studyPlanDataToStudyPlan`, y todo código/tipo del modelo anterior que quede (`raw-course.ts`, `course.svelte.ts`, `year.svelte.ts`, `study-plan.ts` si aún existen y ya no tienen consumidores). `grep` final: cero referencias.

**Tests:** unit sobre export de `uns-dcs-le-2017` (JSON = modelo nativo, md incluye el requisito del milestone) y de `unahur-ie-pui-2024` (md incluye los requisitos por conteo); unit de paridad og-vs-página sobre el cálculo compartido.

**Salida:** un solo motor de progreso en todo el producto. Gates verdes.

## Fase 5 — Performance (sin cambios de UI)

1. **Catálogo liviano:** la homepage y `api/home` no cargan los 47 planes al cliente — mover a `+page.server.ts`/prerender con entries mínimos (nombre/slug/duración). `[slug]/+page.ts` carga SOLO su plan (mapa slug→`() => import('./data/<slug>')` dinámico). sitemap/llms.txt/og siguen server-side. Verificar post-build que ningún chunk del cliente contenga data masiva de planes.
2. **Esqueleto estático + hojas reactivas:** `buildStudyPlanView` construye una sola vez la estructura (secciones, términos, árbol de requisitos, dependents, anchors) desde `PreparedPlan`; lo dependiente de estado (met/progress/section state/graduation) son `$derived` granulares por nodo. Un click no reconstruye el view completo ni realoca todas las identidades.
3. **Micro:** `pushMapValue` → `Map<string, Set<string>>` con materialización única al final; `getCourseItems`/`getMilestoneItems` precomputados en el constructor (orderedItems ya viene por seqId — sin re-sort); cachear arrays de `RequirementContext` por tag/section por flush.
4. **Autocorrección:** mantener `$effect` por item (V1 del master plan). Si tras la fase se observan cascadas multi-tick visibles o el historial registra estados intermedios, reemplazar por normalización fixed-point dentro de `setState` en una sola pasada. Documentar cuál quedó y por qué en `docs/architecture.md`.

**Salida:** E2E verdes (cero cambio funcional); homepage sin data de planes en el bundle. Gates verdes.

## Fase 6 — Higiene de tests y documentación

1. **E2E helpers** (`e2e/helpers/study-plan.ts` y specs nuevos de la rama): eliminar `waitForTimeout(2000)`; reemplazar selectores CSS/ID (`input[type="number"]`, `#panelId`, `[id=...]`, asserts de clase `is-targeted`) y `.first()`/`.last()` por locators por rol/label scopeados, según `docs/testing.md`.
2. **Docs:** actualizar `docs/architecture.md` (motor único, serialización unificada, view tree), `curriculum-conversion-prompt-study-plan-data.md` y `skills/add-study-plan` (selectores nuevos, `every`, `countOf`, `weight` obligatorio en `sum`, registry de seqId, formato de stream unificado, prohibición de renumerar seqIds).
3. Gate final completo: `bun run check` && `bunx vitest run` && `bunx playwright test` (suite entera).

## Criterio final de éxito

- Los 10 hallazgos del review cerrados (persistencia milestones, URLs legacy, revert bulk, duplicados multi-placement, 4 planes faltantes, UI de requisitos lossy, dependents, og.png, export, undo).
- URLs de producción (esquema main) decodifican exactas — probado con golden fixtures.
- Un solo motor (`evaluateProgress`) para requisitos, graduación, UI, export y og.
- Modelo expresa: OR, N-de-M (por items/tag/section/plan entero/grupos), percent, sum horas/créditos, milestones (con y sin placement), ciclos, multi-placement, orientaciones en graduación, "N materias del plan regularizadas".
- Cero adapters, cero motor legacy, cero copias duplicadas de predicados/codecs.
- E2E existentes + nuevos verdes.

## Preguntas sin resolver

Ninguna. Todas las decisiones están en "Decisiones ya tomadas". Si durante la ejecución aparece una ambigüedad no cubierta por este documento, detenerse y preguntar en lugar de asumir.
