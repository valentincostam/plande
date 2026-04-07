# Prompt: Curriculum -> StudyPlanData

Convert the provided curriculum into a new Plande study plan using the current `StudyPlanData` model.

## Goal

Produce a correct, minimal, app-ready study plan.

Unless told otherwise, do all of this:

1. create `src/routes/[slug]/data/{slug}.ts`
2. register it in `src/routes/[slug]/data/all-study-plans.ts`
3. add university logo assets if this is the first plan from that university
4. run `bun run check`

If the user only wants extraction, return just the TypeScript file contents.

## Input

The curriculum may come from:

- images
- HTML/web pages
- PDF

Assume OCR errors, truncated text, and mixed formats.

If key data is missing and the plan would be wrong without it, ask instead of guessing.

## Output Contract

Use this shape:

```ts
import type { StudyPlanData } from '$lib/study-plan-data';
import { grad, place, req, select } from '$lib/study-plan-helpers';

export const variableName: StudyPlanData = {
	info: {
		degreeName: 'Ingeniería en Sistemas de Información',
		degreeSlug: 'ISI',
		universityName: 'Universidad Tecnológica Nacional',
		universitySlug: 'UTN',
		collegeName: 'Facultad Regional Concepción del Uruguay',
		collegeSlug: 'FRCU',
		year: 2023,
		sources: [{ id: 1, label: 'Plan de Estudios', url: 'https://...' }],
		notes: [{ id: 1, text: 'Nota en **markdown**.' }]
	},
	sections: [
		{ id: 'year-1', label: '1er Año' },
		{ id: 'year-2', label: '2do Año' }
	],
	items: [
		{
			id: '1',
			seqId: 1,
			kind: 'course',
			code: '1',
			name: 'Álgebra y Geometría Analítica',
			type: 'mandatory',
			hours: 10,
			tags: ['year-1'],
			placements: [place.year(1, 'firstSemester')],
			requirements: {}
		}
	],
	requirements: {
		graduation: [grad.allMandatory('mandatory', 'Materias obligatorias')]
	}
};
```

## Core Rules

### 1. Identity

- `id` is a stable string.
- `seqId` is a stable unique integer.
- For a brand new plan, assign `seqId` sequentially in visual order.
- If editing an existing plan, never renumber existing `seqId`s; only append.
- If the official code is numeric, use that code as `id` string too: `code: '14'` -> `id: '14'`.

### 2. Sections and placements

- `sections` define visual groups.
- `placements` are the only source of truth for where an item appears.
- Classic yearly plans: `year-1`, `year-2`, etc.
- Use `place.year(year, term)` for standard yearly plans.
- For items shown in multiple places, use multiple placements on the same item.

Example:

```ts
placements: [place.year(5, 'secondSemester'), place.year(6, 'firstSemester')];
```

### 3. Items

- Use `kind: 'course'` for normal subjects.
- Use `kind: 'milestone'` only for non-course requirements with their own state.
- If a non-course requirement should behave visually like a subject and has hours, modeling it as `course` is acceptable.

### 4. Requirements

Use semantic rules, not old flat arrays.

- `req.item(id, state)`
- `req.all(...)`
- `req.any(...)`
- `req.count(...)`
- `req.percent(...)`
- `req.sum(...)`

Use selectors when the source is group-based:

- `select.items(...)`
- `select.tag(...)`
- `select.section(...)`

Prefer semantic rules over expanding long lists when the source says things like:

- "2 optativas"
- "50% del ciclo"
- "3er año completo"
- "40 horas electivas"

### 5. Allowed requirement states

- course requirements: `'inProgress' | 'taken' | 'passed'`
- milestone requirements: only `'completed'`

Never use `'taken'` or `'passed'` against a milestone.

## Prerequisite Mapping

### Unstructured correlatives

If the source only says `Correlativas: X, Y` without separating enrollment vs exam:

- enrollment -> `taken`
- completion/exam -> `passed`

Example:

```ts
requirements: {
	enroll: req.all(req.item('5', 'taken')),
	complete: req.all(req.item('5', 'passed'))
}
```

### Three-column tables

Map them exactly:

- `Para Cursar TENER CURSADA/REGULARIZADA` -> `enroll` + `taken`
- `Para Cursar TENER APROBADA` -> `enroll` + `passed`
- `Para Rendir TENER APROBADA` -> `complete` + `passed`

Critical: the second column is still `enroll`, not `complete`.

Before writing code, build an intermediate prerequisite table and verify every code.

### Multi-code cells

Extract every code.

- `2 - 5` -> `2`, `5`
- `1, 3, 7` -> `1`, `3`, `7`

## Terms

Use:

- `firstSemester`
- `secondSemester`
- `annual`
- `semestral`

Rules:

- `Anual` -> `annual`
- `1er cuatrimestre` / `1er semestre` -> `firstSemester`
- `2do cuatrimestre` / `2do semestre` -> `secondSemester`
- `cuatrimestral` or `semestral` without first/second -> `semestral`
- continuous numbering: odd -> first, even -> second

Do not guess first vs second when the source does not specify it.

## Hours

- `hours` means weekly hours.
- Prefer weekly hours if the source provides them.
- If only total hours exist, convert them.
- Never use total hours directly as `hours`.

If total hours exist but the duration in weeks is unknown and the result matters, ask.

## Names and text cleanup

- Normalize subject names to Spanish Title Case.
- Preserve real acronyms in uppercase.
- Expand obvious abbreviations.
- Fix obvious OCR and accent errors.
- Remove suffixes like `(electiva)`, `(optativa)`, `(integradora)` from `name` and express them in `type` / `attributes`.

## Tags

Only create tags that add semantic value.

Common useful tags:

- `year-1`, `year-2`, etc.
- `progress-elective`
- custom group tags for optatives, cycles, languages, orientations, etc.

Do not add decorative tags.

## Graduation Rules

Use `requirements.graduation`.

Common patterns:

- only mandatory subjects:

```ts
graduation: [grad.allMandatory('mandatory', 'Materias obligatorias')];
```

- N electives:

```ts
graduation: [
	grad.allMandatory('mandatory', 'Materias obligatorias'),
	grad.countTag('electives', 'Electivas requeridas', 'progress-elective', 2, 'passed')
];
```

- X elective hours:

```ts
graduation: [
	grad.allMandatory('mandatory', 'Materias obligatorias'),
	grad.sumTag(
		'elective-hours',
		'Horas electivas requeridas',
		'progress-elective',
		'hours',
		40,
		'passed'
	)
];
```

## Slugs and naming

- `degreeSlug`: official acronym
- `universitySlug`: official acronym
- `collegeSlug`: optional official acronym
- variable name: lowerCamelCase from slug, e.g. `utnFrcuIsi2023`
- file path: `src/routes/[slug]/data/{slug}.ts`
- full slug: `{universitySlug}-{collegeSlug?}-{degreeSlug}-{year?}` lowercased

Only include `year` if the official documentation identifies the plan by year/version.

## Minimal Workflow

1. Extract full course list.
2. Determine sections.
3. Build a prerequisite mapping table.
4. Identify group-based rules and model them semantically.
5. Determine graduation rules.
6. Write the `StudyPlanData` file.
7. Register it in `all-study-plans.ts`.
8. If needed, add university logos.
9. Run `bun run check`.

## Validation Checklist

- [ ] all items from the curriculum are present
- [ ] no duplicate `id`
- [ ] no duplicate `seqId`
- [ ] placements match the source
- [ ] prerequisite columns were mapped correctly
- [ ] multi-code cells were fully expanded
- [ ] group-based rules use `count` / `percent` / `sum` / selectors when appropriate
- [ ] weekly hours are correct
- [ ] graduation requirements are correct
- [ ] names are cleaned and accented
- [ ] file is registered in `all-study-plans.ts`
- [ ] `bun run check` passes

## Common Mistakes

Avoid these:

1. mapping column 2 to `complete` instead of `enroll`
2. missing codes from multi-code cells
3. guessing semester when only `cuatrimestral` is given
4. using total hours as weekly hours
5. flattening a semantic rule that should be `count` / `percent` / `sum`
6. renumbering existing `seqId`s when editing a plan

Generate the final TypeScript file using this model.
