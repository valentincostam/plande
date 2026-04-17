# Plan de Migración de UI Nativa sin Adaptadores

## Contexto

El plan maestro original llevó a buen puerto:

- el nuevo modelo `StudyPlanData`
- el nuevo runtime (`PlanSession`, evaluadores, URL state)
- la migración del catálogo
- la eliminación del modelo anterior y su runtime

Pero la UI principal todavía depende de una capa de compatibilidad:

- `src/lib/course-plan-compat.svelte.ts`
- `CompatCourse`
- `createYears(...)` / `Year`
- componentes que siguen esperando el shape histórico de `Course`

Eso significa que la migración de engine/modelo quedó completa, pero la migración de UI no quedó completamente nativa.

El incidente con `unlp-fi-iem-2018` lo confirma: un supuesto viejo de la compat layer (`id` numérico) rompió el render aunque el modelo y el engine estaban correctos.

## Objetivo

Eliminar la compat layer y hacer que la UI consuma directamente el modelo/runtime nuevo, sin adaptadores intermedios, sin perder comportamiento, UX ni URLs.

## Resultado esperado

Al final de este trabajo:

1. no existe `CompatCourse`
2. no existe `createCompatCoursesFromNativePlanSession(...)`
3. la UI renderiza desde `StudyPlanData` + `PlanSession` + `buildStudyPlanView(...)`
4. los IDs de items pueden ser string arbitrarios sin romper render, detalles, prioridad, diagrama ni exports
5. todos los E2E existentes siguen pasando
6. se agregan tests nuevos para cubrir la eliminación de adaptadores
7. el skill de carga de planes queda actualizado para authoring/QA compatibles con la nueva UI nativa

## Restricciones no negociables

1. No romper UX actual de planes clásicos por año/cuatrimestre.
2. No romper URLs compartidas ni serialización por `seqId`.
3. No cambiar el significado académico observable.
4. Todos los tests E2E existentes deben seguir pasando.
5. Todo componente nuevo debe consumir datos del dominio nuevo, no recrear shapes legacy.
6. El trabajo debe poder hacerse por fases con app siempre funcional.

## Alcance

Incluye:

- ruta principal `src/routes/[slug]/+page.svelte`
- render de secciones/años/términos
- cards de materias y detalles
- disponibles
- prioridad
- stats/charts
- diagrama
- export
- prompt/skill de carga de planes

No incluye:

- rediseño visual mayor
- cambios de copy no necesarios
- nuevos features del motor académico salvo los necesarios para exponer correctamente la UI nativa

## Estado actual a desarmar

Puntos donde hoy sigue viva la compat layer:

- `src/routes/[slug]/+page.svelte`
- `src/lib/course-plan-compat.svelte.ts`
- `src/lib/year.svelte.ts`
- `src/routes/[slug]/year.svelte`
- componentes que toman `Course[]` del modelo viejo implícito:
  - `available-courses-section.svelte`
  - `priority-courses.svelte`
  - `diagram/course-diagram.svelte`
  - `course.svelte`
  - `dependent.svelte`
  - `requirement.svelte`

## Principio rector

No migrar “curso por curso” ni “componente por componente” improvisando.

Primero definir un contrato nativo único de UI, y después adaptar todos los componentes a ese contrato.

Si no se hace así, solo se reemplaza una compat layer por varias compat layers pequeñas.

## Contrato objetivo de UI

La UI debe leer un view model nativo derivado del runtime nuevo.

Nombre tentativo:

- `StudyPlanView`
- `ViewSection`
- `ViewPlacement`
- `ViewItem`
- `ViewRequirement`
- `ViewDependent`

### Requisitos del contrato

Debe exponer, como mínimo:

- metadatos del plan
- secciones visibles en orden
- grupos por término dentro de cada sección
- items con:
  - `id` string estable
  - `seqId`
  - nombre
  - código
  - tipo
  - atributos
  - horas / credits si aplica
  - placement actual
  - estado
  - `isEnabled`
  - `canPass`
  - requisitos humanizados
  - dependents humanizados
- índice por item para navegación/diagrama
- datos deduplicados por item para stats y progreso

La UI no debe necesitar reconstruir significado académico.

## Fase 0 - Contrato y Baseline

### Objetivo

Congelar qué comportamiento visible debe permanecer intacto mientras se cambia la UI por adentro.

### Tareas

1. Documentar el contrato actual observable de la UI por componente.
2. Catalogar los componentes que dependen del shape legacy.
3. Crear un documento corto con el contrato del `StudyPlanView` objetivo.
4. Reusar el smoke de catálogo y la matriz de export/API como red de seguridad base.

### Entregables

- documento del contrato `StudyPlanView`
- lista de componentes legacy-dependent

### Criterio de salida

Existe una definición explícita de qué debe entregar el dominio a la UI y qué ya no puede reconstruirse en componentes.

## Fase 1 - `StudyPlanView` nativo completo

### Objetivo

Completar `buildStudyPlanView(...)` para que entregue todo lo que hoy se obtiene indirectamente vía `CompatCourse`.

### Tareas

1. Definir tipos explícitos de `StudyPlanView`.
2. Incluir en el view model:
   - secciones ordenadas
   - placements ordenados por término y orden
   - requisitos humanizados
   - dependents humanizados
   - labels de período
   - datos para navegación por anclas
3. Asegurar que el view model soporte:
   - IDs string alfanuméricos
   - multi-placement
   - secciones no anuales
   - items sin placement
4. Agregar tests unitarios del view model.

### Entregables

- tipos de `StudyPlanView`
- `buildStudyPlanView(...)` extendido
- tests unitarios específicos

### Criterio de salida

La UI puede renderizarse enteramente desde `StudyPlanView` sin necesitar `CompatCourse`.

## Fase 2 - Secciones y términos nativos

### Objetivo

Eliminar `Year`/`createYears(...)` como estructura central y renderizar desde secciones reales del plan.

### Tareas

1. Crear componente nativo de sección, por ejemplo `study-plan-section.svelte`.
2. Crear componente nativo de grupo de término, por ejemplo `section-term.svelte`.
3. Soportar secciones clásicas y no clásicas con el mismo flujo.
4. Mantener:
   - headings
   - anchors
   - bulk state select cuando corresponda
5. Reemplazar en `+page.svelte` el uso de `Year` por secciones nativas.

### Entregables

- componente de sección nativa
- componente de término nativo
- `+page.svelte` sin `createYears(...)`

### Criterio de salida

La lista principal ya no depende de la representación legacy `year -> courses`.

## Fase 3 - Card y detalles de item nativos

### Objetivo

Eliminar la dependencia del tipo `Course` en el render básico de materias.

### Tareas

1. Crear un tipo/props nativos para el card de item.
2. Migrar:
   - `course.svelte`
   - `course-link.svelte`
   - `requirement.svelte`
   - `dependent.svelte`
3. Reemplazar cálculos implícitos del viejo `Course` por datos ya preparados en el view model.
4. Confirmar que expand/collapse, estados, requisitos y dependents siguen iguales.

### Entregables

- item card nativo
- requisitos/dependents nativos

### Criterio de salida

Los detalles de una materia ya no dependen de `CompatCourse`.

## Fase 4 - Disponibles, prioridad y stats nativos

### Objetivo

Quitar la dependencia del shape legacy en las vistas derivadas más sensibles.

### Tareas

1. Migrar `available-courses-section.svelte` al view model nativo.
2. Migrar `priority-courses.svelte` a dependents contados desde el view model o desde una utilidad del dominio.
3. Revisar `stats.svelte` y `charts.svelte` para que dependan de progreso/agrupaciones nativas.
4. Confirmar deduplicación correcta de multi-placement.

### Entregables

- disponibles nativo
- prioridad nativa
- stats/charts nativos

### Criterio de salida

Las vistas derivadas ya no requieren `Course[]` legacy.

## Fase 5 - Diagrama nativo

### Objetivo

Eliminar la última dependencia fuerte del tipo `Course` en navegación visual.

### Tareas

1. Definir props nativos del diagrama.
2. Migrar `diagram/course-diagram.svelte` y `diagram-utils.ts`.
3. Asegurar que edges y foco usen IDs string nativos, no IDs numéricos heredados.
4. Verificar:
   - focus on course
   - resaltado de cadena de dependencias
   - filtros de electivas/optativas

### Entregables

- diagrama nativo

### Criterio de salida

El diagrama funciona con IDs nativos string sin compat layer numérica.

## Fase 6 - Export y superficies públicas nativas end-to-end

### Objetivo

Cerrar el círculo también en los outputs y APIs que hoy todavía pueden arrastrar supuestos legacy indirectos.

### Tareas

1. Revisar export buttons y formatters contra el view model/dominio nativo.
2. Verificar `GET /[slug]` JSON/markdown/plaintext con planes alfanuméricos y no clásicos.
3. Verificar OG y sitemap sin supuestos sobre IDs numéricos.

### Entregables

- exports y endpoints plenamente nativos

### Criterio de salida

No queda ninguna superficie pública dependiendo del shape legacy de UI.

## Fase 7 - Eliminación de adaptadores y deuda muerta

### Objetivo

Borrar de verdad la compat layer, no dejarla “por las dudas”.

### Tareas

1. Eliminar `src/lib/course-plan-compat.svelte.ts`.
2. Eliminar `createYears(...)` y `Year` si dejan de tener uso.
3. Eliminar helpers o tipos transicionales que solo existían para la UI vieja.
4. Limpiar imports y tipos `Course` donde ya no correspondan.
5. Verificar que el proyecto siga sin warnings ni imports muertos.

### Entregables

- árbol sin compat layer

### Criterio de salida

No existe ningún adaptador entre el modelo/runtime nuevo y la UI.

## Fase 8 - Actualización del skill y prompt de carga de planes

### Objetivo

Hacer que el flujo de authoring sea compatible con la UI plenamente nativa.

### Tareas

1. Actualizar el skill `add-study-plan` para reflejar la nueva realidad:
   - no asumir ningún bridge legacy
   - explicitar que `code` puede ser alfanumérico
   - explicitar que `id` puede ser string estable no numérico
   - exigir verificación en browser sobre la UI final
2. Actualizar el prompt `curriculum-conversion-prompt-study-plan-data.md` si hace falta:
   - aclarar la regla `id` vs `code`
   - aclarar que la UI soporta IDs string nativos
3. Incluir en el QA del skill chequeos específicos para:
   - headers/secciones/términos
   - planes con códigos alfanuméricos
   - optativas/electivas/transversales
4. Mantener el informe final de QA con URLs y hallazgos.

### Entregables

- skill actualizado
- prompt actualizado si corresponde

### Criterio de salida

Los nuevos planes se pueden agregar sin reintroducir supuestos de compatibilidad vieja.

## Fase 9 - Testing exhaustivo de la migración de UI

### Objetivo

Demostrar que quitar adaptadores no cambia el comportamiento observable.

### Reglas

- todos los E2E actuales deben seguir pasando
- los E2E no deben atarse a detalles de implementación
- tests en inglés
- usar `getByRole`, `getByLabel`, `getByText`

### Tests adicionales obligatorios

1. Smoke del catálogo completo
   - ya existe; debe seguir verde durante toda la migración
2. Matriz export/API por familias
   - ya existe; debe seguir verde
3. Nuevos tests para la UI nativa sin adaptadores:
   - un plan con IDs alfanuméricos (`unlp-fi-iem-2018`)
   - un plan con multi-placement (`utn-frcu-ic-2023`)
   - un plan con electivas por horas (`utn-frcu-isi-2023`)
   - un plan con count-based graduation (`unca-fca-tupazsa`)
   - un plan con secciones especiales/transversales (`unlam-diit-ii-2023`, `unlp-fahce-pm-2003`)
4. Verificaciones específicas:
   - `Plande` link visible
   - `Lista/Diagrama` visible
   - heading de sección visible
   - heading de término visible
   - anclas correctas
   - details panel correcto
   - prioridad/disponibles/exports correctos

### Comandos mínimos

- `bun run check`
- `bunx vitest run`
- `bunx playwright test`

### Criterio de salida

No se elimina la compat layer hasta que todo el suite quede verde con la UI nativa.

## Estrategia de implementación recomendada

No hacer un big bang.

Orden recomendado:

1. completar `StudyPlanView`
2. migrar render principal de secciones/términos
3. migrar item card y detalles
4. migrar disponibles/prioridad/stats
5. migrar diagrama
6. actualizar skill/prompt
7. borrar adaptadores

En cada fase:

- cambiar lo mínimo necesario
- correr `bun run check`
- correr tests focalizados
- correr Playwright completo antes de pasar a la siguiente fase si la superficie tocada es grande

## Riesgos principales

1. Reintroducir lógica académica en componentes.
2. Perder deduplicación correcta de multi-placement.
3. Romper anclas, navegación al diagrama o share links.
4. Duplicar o perder items en secciones especiales.
5. Mezclar `id` semántico con identificadores de render/navegación.

## Mitigaciones

- todo cálculo académico vive en dominio/view model, no en componentes
- usar `seqId` o IDs de view explícitos para render keys si hace falta
- tests específicos sobre slugs representativos
- smoke del catálogo completo en cada etapa grande

## Definition of Done

Este trabajo se considera terminado solo si:

1. la UI principal ya no usa `CompatCourse`
2. no existe `course-plan-compat.svelte.ts`
3. no existe dependencia estructural de `Year` como adapter del modelo viejo
4. la UI consume exclusivamente `StudyPlanView` + `PlanSession` + `StudyPlanData`
5. planes con IDs alfanuméricos renderizan bien sin hacks especiales
6. skill y prompt quedaron alineados con la UI nativa final
7. todos los E2E existentes siguen pasando
8. los nuevos tests de esta migración pasan
