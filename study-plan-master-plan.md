# Plan Maestro del Nuevo Modelo de Datos y Arquitectura Reactiva para Plande

## Estado y objetivo

- Este trabajo se realiza en una rama nueva, **nunca en `main`**.
- Rama de trabajo usada: una rama dedicada de migracion, separada de `main`.
- Objetivo: soportar la gran mayoria de los planes heterogeneos observados sin romper los planes actuales, la UX actual ni las URLs compartidas.
- Estado actual: **completado**.
- Fuente de verdad actual: `StudyPlanData` nativo en `src/routes/[slug]/data`.
- El adapter del modelo anterior, los previews transicionales y el catalogo anterior fueron eliminados.

## Definition of Done

La migracion se considera cerrada cuando se cumplen todos estos puntos:

1. todos los planes viven en `src/routes/[slug]/data` como `StudyPlanData` nativo;
2. la app, homepage, sitemap, `llms.txt`, `GET /[slug]` y `og.png` leen desde catalogo nativo;
3. no existe fallback runtime a datos del modelo anterior ni adapter del modelo anterior;
4. no existen previews/transicionales separados;
5. `bun run check`, Vitest y Playwright completo estan verdes.

## Nota de Cierre

Este documento conserva el plan original y el estado final del proyecto.

El resultado funcional si quedo completado, pero algunos artefactos intermedios del plan original
(por ejemplo, script de conversion, harness de compatibilidad y snapshots) fueron utiles durante la
migracion y no necesariamente quedaron retenidos en el repo final.

## Problema

El modelo actual de Plande funciona bien para planes clasicos, pero tiene 3 limites estructurales:

1. mezcla dominio y presentacion:
   - `year` y `term` describen a la vez semantica academica y ubicacion visual;
2. las correlatividades solo soportan listas planas tipo `AND` entre materias;
3. el progreso esta hardcodeado a pocos casos y no cubre bien grupos, hitos, horas o creditos.

Ademas, la logica reactiva de correlatividades vive dentro de `Course`, que hoy mezcla demasiadas responsabilidades:

- definicion academica;
- estado del usuario;
- evaluacion de requisitos;
- autocorreccion de estados;
- dependencias (`dependents`);
- datos de presentacion.

Eso vuelve dificil escalar a reglas por `tag`, `section`, `count`, `percent`, `sum`, milestones y creditos.

## Restricciones no negociables

1. Los planes actuales deben seguir funcionando igual o mejor.
2. La UI actual debe mantenerse, especialmente para planes por anos/cuatrimestres.
3. Las URLs actuales no deben romperse.
4. La autocorreccion de estados debe preservar el comportamiento actual.
5. Los tests E2E existentes deben seguir pasando.
6. Todo cambio nuevo debe venir con tests.

## Ejemplos de requisitos hoy no soportados, agrupados

### Grupo 1: logicos y cuantitativos

Casos representativos:

- `BIO0140 o BIO0170, y ademas BIO0180`
- `2 de las 4 electivas`
- `5 materias regularizadas`
- `todo 1er y 2do ano aprobado`
- `50% de 5to regularizado`
- `40 horas electivas`
- `12 creditos optativos`

Necesidad del modelo:

- `all`
- `any`
- `count`
- `percent`
- `sum(hours|credits)`
- selectores por item, tag o section

### Grupo 2: grupos semanticos e hitos no-materia

Casos representativos:

- `1 materia de Optativas I y 1 de Optativas II`
- `1 idioma latino y 1 idioma germanico`
- `Examen de Suficiencia de Ingles E`
- `Ofimatica`
- `PPS`

Necesidad del modelo:

- grupos arbitrarios (`tags`)
- hitos trackeables (`milestones`)
- requisitos que puedan apuntar tanto a materias como a hitos

### Grupo 3: estructura del plan y presentacion

Casos representativos:

- planes por ciclos (`CBC`, `CFG`, `CFP`) en vez de anos;
- materias transversales;
- materias que aparecen en mas de una section, como `Proyecto Final` en 5to y 6to.

Necesidad del modelo:

- `sections`
- `placements`
- estado unico por item aunque tenga multiples placements

## Solucion objetivo (resumen)

### Modelo de datos canonico

- `StudyPlanData`
- `Section`
- `PlanItem`
- `Placement`
- `RequirementExpr`
- `GraduationRequirement[]`

### Arquitectura reactiva

- `preparePlan(plan)` -> indexa, valida y deriva dependencias
- `PreparedPlan` -> indices inmutables y topologia del plan
- `PlanSession` -> sesion viva del usuario
- `PlanItemState` -> wrapper reactivo por item
- `SectionState` -> wrapper reactivo por section
- evaluadores puros:
  - `evaluateRequirement(...)`
  - `evaluateGraduation(...)`
  - `normalizeItemState(...)`
- `buildStudyPlanView(session)` -> adaptacion de dominio a UI

## Decisiones de diseno ya cerradas

### 1. Identidad, serializacion y retrocompatibilidad

- `PlanItem.id`: ID semantico estable para referencias y reglas
- `PlanItem.seqId`: ID posicional estable para serializacion de estado
- `seqId` es:
  - unico
  - estable
  - append-only
  - nunca reutilizable
- `s` serializa estados de `course`
- `m` serializa estados de `milestone`

### 2. Ubicacion visual

- `sections + placements` es la unica forma de ubicar items en la UI
- no existe `primaryPlacement`
- un item puede tener multiples placements
- todos los placements son equivalentes para mutacion de estado
- stats globales y progreso deduplican por item, nunca por placement

### 3. Estados

- `course`: `notTaken | inProgress | taken | passed`
- `milestone`: `pending | completed`
- `completed` no es un estado de UI de materia; es un predicado de requerimientos
- milestones solo aceptan `completed` en requisitos

### 4. Autocorreccion

Se preserva exactamente el comportamiento actual:

- si un item deja de cumplir requisitos para cursar, baja a estado consistente;
- si deja de cumplir requisitos para aprobar/completar, baja a estado consistente.

V1 recomendada:

- mantener `$derived` por item para `isEnabled` y `canPass`;
- mantener `$effect` por item para autocorreccion;
- medir cascadas reales antes de evaluar un reconcile central.

### 5. Dependents

- `dependents` se derivan solo de referencias explicitas entre items;
- `direct` para `item(...)` dentro de `all(...)`;
- `alternative` para `item(...)` dentro de `any(...)`;
- `count`, `percent` y `sum` no generan edges.

## Fases de implementacion

## Fase 0 - Baseline y red de seguridad

### Objetivo

Congelar el comportamiento observable actual antes de tocar el modelo.

### Tareas

1. Crear y documentar rama de trabajo.
2. Catalogar planes criticos para regression testing:
   - planes mas usados;
   - al menos un plan con `crossYear`;
   - al menos un plan con electivas por horas;
   - al menos un plan con optativas/electivas mezcladas.
3. Crear harness de equivalencia entre el modelo anterior y el nuevo motor.
4. Generar golden snapshots por plan para escenarios representativos.

### Entregables

- harness de compatibilidad
- snapshots/golden tests
- lista de planes criticos

### Criterio de salida

Existe una forma automatizada de comparar el motor actual con el nuevo antes de migrar datos.

## Fase 1 - Tipos canonicos y helpers de authoring

### Objetivo

Introducir el nuevo schema sin romper todavia la UI.

### Tareas

1. Crear tipos nuevos:
   - `StudyPlanData`
   - `Section`
   - `PlanItem`
   - `Placement`
   - `RequirementExpr`
   - `GraduationRequirement`
2. Crear helpers de authoring:
   - `place.year(...)`
   - `req.item(...)`
   - `req.all(...)`
   - `req.any(...)`
   - `req.countTag(...)`
   - `req.percentSection(...)`
   - `req.sumTag(...)`
3. Documentar restricciones de milestones y `RequirementState`.

### Entregables

- modulo de tipos del nuevo modelo
- modulo de helpers de authoring

### Criterio de salida

Se puede describir un plan nuevo completo usando el schema canonico y helpers, sin tocar aun la UI.

## Fase 2 - `preparePlan()` y validacion fuerte

### Objetivo

Construir el motor de preparacion/indexacion del plan.

### Tareas

1. Implementar `preparePlan(plan)`.
2. Crear `PreparedPlan`.
3. Indexar por:
   - `id`
   - `seqId`
   - `tag`
   - `section`
4. Derivar `DependentEdge[]`.
5. Validar build-time:
   - `id` unico
   - `seqId` unico
   - `itemId` valido
   - `sectionId` valido
   - `tag` referenciado existente
   - milestone solo con `completed`
6. Agregar validacion de ciclos/topologia.
7. Definir mecanismo de append-only para `seqId`:
   - archivo registry/snapshot versionado por plan.

### Entregables

- `preparePlan()`
- validadores
- extractor de `DependentEdge[]`
- estrategia de `seqId` append-only implementada

### Criterio de salida

Todo plan invalido falla en build/test con errores claros antes de llegar a runtime.

## Fase 3 - Evaluadores puros

### Objetivo

Sacar la logica academica fuera de la UI.

### Tareas

1. Implementar `RequirementContext`.
2. Implementar `evaluateRequirement(expr, context)`.
3. Implementar `evaluateGraduation(requirements, context)` con progreso parcial.
4. Implementar `normalizeItemState(item, current, facts)` como funcion pura.
5. Hacer `weight` opcional con inferencia default:
   - `allMandatory` -> cantidad total de obligatorias
   - `count min: N` -> `N`
   - `sum min: X` -> `X` por defecto, con override posible

### Entregables

- evaluador de requisitos
- evaluador de progreso
- normalizador de estados

### Criterio de salida

Los requisitos y el progreso se pueden evaluar sin Svelte ni componentes.

## Fase 4 - Runtime reactivo nuevo

### Objetivo

Reemplazar el runtime actual basado en `Course` por un runtime nuevo con API equivalente.

### Tareas

1. Crear `PlanSession`.
2. Crear `PlanItemState`.
3. Crear `SectionState`.
4. Implementar serializacion/deserializacion por `seqId`.
5. Integrar `strictMode` y `grade`.
6. Implementar autocorreccion con `$effect` por item.
7. Definir criterio de fallback si hay cascadas problematicas:
   - flicker visible
   - multiples ticks perceptibles
   - warnings/errores de reactividad

### Entregables

- runtime reactivo nuevo
- adaptadores para URL/localStorage/history

### Criterio de salida

La UI puede consumir `item.state`, `item.isEnabled`, `item.canPass` como hoy, pero con el nuevo motor.

## Fase 5 - `buildStudyPlanView()` y compatibilidad de UI

### Objetivo

Separar completamente dominio y presentacion sin cambiar innecesariamente la UX.

### Tareas

1. Implementar `buildStudyPlanView(session)` como construccion estructural one-shot.
2. Generar:
   - sections ordenadas
   - items por `section + term`
   - requisitos humanizados para la UI
   - seccion automatica de milestones sin placement
3. Reemplazar `Year` por `SectionState` sin alterar el layout actual para planes clasicos.
4. Definir orden dentro de `section + term`:
   - items con `order` primero, por `order`
   - empate por `seqId`
   - luego items sin `order`, por `seqId`

### Entregables

- `StudyPlanView`
- adaptacion de UI existente al nuevo view model

### Criterio de salida

Los planes actuales se siguen viendo igual para el usuario final.

## Fase 6 - Migracion de datos del modelo anterior al nuevo modelo

### Objetivo

Convertir los planes actuales al nuevo modelo sin romper comportamiento.

### Tareas

1. Escribir script determinista de conversion.
2. Asignar `seqId` igual al orden historico actual.
3. Convertir:
   - `year/term` -> `sections/placements`
   - correlativas planas -> `RequirementExpr`
   - `DegreeProgressConfig` -> `GraduationRequirement[]`
4. Revisar manualmente diffs de todos los planes convertidos.
5. Convertir primero un subconjunto piloto de planes criticos.
6. Convertir el resto cuando el harness de equivalencia este verde.

### Entregables

- script de conversion
- subset piloto migrado
- lote completo migrado

### Criterio de salida

Los planes convertidos producen el mismo comportamiento observable que antes en todos los casos previamente soportados.

## Fase 7 - Testing exhaustivo

### Objetivo

Garantizar que el cambio no rompa trayectoria academica, UX ni URLs.

### Unit tests obligatorios

- `preparePlan()`
- validacion de referencias
- validacion de ciclos
- validacion de `seqId`
- `evaluateRequirement()`
- `evaluateGraduation()`
- `normalizeItemState()`
- `buildDependentEdges()`
- serializacion/deserializacion con `seqId`

### Compatibility tests obligatorios

Comparar modelo anterior vs nuevo motor, por plan y por escenario:

- `isEnabled`
- `canPass`
- materias disponibles
- dependents directos
- ranking de prioridad equivalente
- progreso actual equivalente donde aplique
- serializacion/deserializacion de URL

Ademas, para cada plan migrado a definicion nativa final:

- comparar conversion automatica del modelo anterior vs definicion nativa final en estructura;
- comparar comportamiento browser previo vs comportamiento browser final sobre el mismo escenario;
- ver `docs/study-plan-native-migration-equivalence.md`.

### E2E obligatorios

Seguir `docs/testing.md`.

Reglas:

- tests en ingles;
- testear como usuario;
- usar `getByRole`, `getByLabel`, `getByText`;
- no atar tests a detalles de implementacion.

Se deben cumplir ambas cosas:

1. **Los tests E2E existentes deben seguir pasando**
   - porque representan comportamiento/UX actual que queremos preservar;
2. **Agregar nuevos E2E** para casos nuevos del modelo
   - OR
   - N de M
   - percent
   - sum por horas/creditos
   - milestones
   - sections por ciclos
   - items multi-placement

### Comandos minimos

- `bun run check`
- `bunx playwright test`

### Criterio de salida

No se reemplaza el motor anterior hasta que:

- unit tests verdes
- compatibility tests verdes
- E2E existentes verdes
- E2E nuevos verdes

## Fase 8 - Prompt de conversion curricular v2

### Objetivo

Actualizar el flujo de carga de planes para el nuevo modelo.

### Tareas

1. Crear un nuevo archivo, separado del actual:
   - `curriculum-conversion-prompt-v2.md`
2. Hacer que el prompt produzca:
   - `StudyPlanData`
   - `sections`
   - `items`
   - `placements`
   - `tags`
   - `RequirementExpr`
   - `GraduationRequirement[]`
3. Explicar reglas de:
   - `seqId`
   - milestones
   - tags
   - sections por anos o ciclos
   - items multi-placement
   - horas y creditos
4. Agregar checklist de validacion para planes nuevos.

### Entregables

- `curriculum-conversion-prompt-v2.md`

### Criterio de salida

El prompt nuevo permite cargar planes directamente al nuevo modelo sin depender del schema viejo.

## Entregables finales del proyecto

1. Nuevo modelo de datos implementado
2. Nueva arquitectura reactiva implementada
3. Script de migracion determinista
4. Harness de equivalencia entre el modelo anterior y el nuevo motor
5. Tests unitarios
6. Tests E2E nuevos
7. E2E existentes pasando
8. `curriculum-conversion-prompt-v2.md`
9. Documentacion final del modelo y migracion

## Criterio final de exito

La migracion se considera exitosa solo si se cumplen todas estas condiciones:

- los planes actuales siguen funcionando bien;
- la UX actual se mantiene;
- las URLs compartidas siguen funcionando;
- el comportamiento academico observable de los planes convertidos es equivalente al actual para todos los casos ya soportados;
- el nuevo modelo soporta correctamente OR, N de M, porcentajes, horas, creditos, tags, milestones, ciclos y multi-placement;
- la app queda mas mantenible y mas facil de extender sin seguir agregando hacks.
