# Prompt v2: University Curriculum to StudyPlanData Conversion

Extract and structure data from a university curriculum into the new `StudyPlanData` model used by Plande v5.1.

## Goal

Produce a complete, valid plan file that fits the new model:

- `sections`
- `items`
- `placements`
- `tags`
- `requirements`
- `graduation requirements`

The output must support both classic plans (`year + term`) and heterogeneous plans (`cycles`, `N de M`, `hours`, `credits`, milestones).

## Output structure

```ts
import { req, place } from '$lib/study-plan-v5-helpers';
import { courseTerms } from '$lib/course-term';
import type { StudyPlanData } from '$lib/study-plan-v5';

export const variableName: StudyPlanData = {
	info: {
		degreeName: 'Licenciatura en Fisica',
		degreeSlug: 'LF',
		universityName: 'Universidad Nacional de Salta',
		universitySlug: 'UNSa',
		collegeName: 'Facultad de Ciencias Exactas',
		collegeSlug: 'FCE',
		year: 2005
	},
	sections: [
		{ id: 'year-1', label: '1er Ano' },
		{ id: 'year-2', label: '2do Ano' }
	],
	items: [
		{
			id: 'algebra-y-geometria-analitica',
			seqId: 1,
			kind: 'course',
			code: '1',
			name: 'Algebra y Geometria Analitica',
			type: 'mandatory',
			hours: 10,
			placements: [place.year(1, courseTerms.firstSemester)]
		}
	],
	requirements: {
		graduation: [{ id: 'mandatory', label: 'Materias obligatorias', type: 'allMandatory' }]
	}
};
```

## Core concepts

### 1. Sections

`sections` are the visible UI containers.

Use:

- `year-1`, `year-2`, etc. for classic plans by academic year
- `cbc`, `cfg`, `cfp`, etc. for plans by cycles
- a dedicated section such as `transversales` when the source clearly separates transversal items

### 2. Plan items

Each `PlanItem` is either:

- `kind: 'course'`
- `kind: 'milestone'`

Use `milestone` for trackable academic requirements that are not regular courses, for example:

- Examen de Suficiencia de Ingles
- Ofimatica
- PPS only when it is clearly not modeled as a normal course in the source

### 3. Placements

`placements` are the only source of visual placement.

- A normal course usually has one placement.
- A course spanning multiple sections/years may have multiple placements.
- A milestone may have no placements if it should only appear in the additional requirements / graduation area.

### 4. Tags

Use `tags` for semantic grouping, for example:

- `optativas-i`
- `optativas-ii`
- `idioma-latino`
- `idioma-germanico`
- `electivas`

Tags are for rules and graduation requirements, not primarily for display.

### 5. Requirements

Each item may have:

- `requirements.enroll`
- `requirements.complete`

Use the helper DSL to build requirement expressions.

### 6. Graduation requirements

Use `requirements.graduation` at plan level to describe what counts for 100% completion.

This is separate from item-level prerequisites.

## Requirement model

Use these patterns:

- direct item dependency
  - `req.item('analisis-1', 'taken')`
- all of
  - `req.all(...)`
- any of
  - `req.any(...)`
- count by tag
  - `req.countTag('electivas', 2, 'passed')`
- count by section
  - `req.countSection('year-5', 5, 'taken')`
- percent by section
  - `req.percentSection('year-4', 100, 'passed')`
- sum by tag and metric
  - `req.sumTag('optativas', 'credits', 12, 'passed')`

## Grouped examples of unsupported requirements and how to encode them

### Group 1: logical and quantitative requirements

#### Example: `BIO0140 o BIO0170, y ademas BIO0180`

```ts
requirements: {
	enroll: req.all(
		req.any(req.item('bio-0140', 'taken'), req.item('bio-0170', 'taken')),
		req.item('bio-0180', 'taken')
	);
}
```

#### Example: `2 de las 4 electivas`

```ts
tags: ['electivas-3-2'];

// on the target item or graduation block
req.countTag('electivas-3-2', 2, 'passed');
```

#### Example: `todo 1er y 2do ano aprobado`

```ts
req.all(req.percentSection('year-1', 100, 'passed'), req.percentSection('year-2', 100, 'passed'));
```

#### Example: `50% de las cursadas aprobadas de 5to ano`

```ts
req.percentSection('year-5', 50, 'taken');
```

#### Example: `12 creditos optativos`

```ts
req.sumTag('optativas', 'credits', 12, 'passed');
```

### Group 2: semantic groups and milestones

#### Example: `1 idioma latino y 1 idioma germanico`

```ts
req.all(req.countTag('idioma-latino', 1, 'passed'), req.countTag('idioma-germanico', 1, 'passed'));
```

#### Example: `Examen de Suficiencia de Ingles E`

```ts
{
  id: 'ingles-e',
  seqId: 999,
  kind: 'milestone',
  name: 'Examen de Suficiencia de Ingles E',
  placements: []
}

// used as prerequisite
req.item('ingles-e', 'completed')
```

## State rules

### Courses

Course UI states are conceptually:

- `notTaken`
- `inProgress`
- `taken`
- `passed`

### Milestones

Milestone UI states are conceptually:

- `pending`
- `completed`

### Important rule

For milestones, only `completed` is valid in requirements.

Do **not** use:

- `taken`
- `passed`

for milestones.

## `seqId` rules

`seqId` is for URL serialization and must follow these rules:

- unique within the plan
- stable over time
- append-only
- never reused

Migration rule for existing plans:

- preserve the historical order of the old courses array as `seqId`

When adding new items later:

- always append a new higher `seqId`
- never renumber old items even if the visual order changes

## Placements and multi-placement items

If a course appears in multiple sections, use multiple placements.

Example:

```ts
{
  id: 'proyecto-final',
  seqId: 43,
  kind: 'course',
  name: 'Proyecto Final',
  type: 'mandatory',
  placements: [
    place.section('year-5', courseTerms.secondSemester),
    place.section('year-6', courseTerms.firstSemester)
  ]
}
```

This is still one item with one state.

## Graduation requirements guidance

Use `requirements.graduation` for what counts toward completion.

Examples:

```ts
requirements: {
	graduation: [
		{ id: 'mandatory', label: 'Materias obligatorias', type: 'allMandatory' },
		{
			id: 'electivas',
			label: 'Electivas requeridas',
			type: 'count',
			selector: { type: 'tag', tag: 'electivas' },
			min: 2,
			state: 'passed'
		},
		{
			id: 'ingles',
			label: 'Examen de ingles',
			type: 'item',
			itemId: 'ingles-e',
			state: 'completed'
		}
	];
}
```

Use `weight` only when the natural default is not enough.

## Data authoring guidelines

1. Prefer a single canonical item per academic entity.
2. Use multiple placements instead of duplicating the item.
3. Use tags only when they have semantic value for requirements or graduation.
4. Keep item IDs human-readable and stable.
5. Preserve official naming, codes, accents, and terminology whenever possible.

## Validation checklist

Before submitting a converted plan:

- [ ] All `id` values are unique
- [ ] All `seqId` values are unique
- [ ] New `seqId` values only append; old ones are preserved
- [ ] Every referenced `itemId` exists
- [ ] Every referenced `sectionId` exists
- [ ] Tags referenced in rules exist in at least one item
- [ ] Milestones only use `completed` in requirements
- [ ] Multi-placement items are not duplicated as separate items
- [ ] Graduation requirements match the source document
- [ ] The number of visible academic items matches the source document

## Legacy mapping guidance

When converting a legacy plan:

- old `course` -> new `PlanItem(kind: 'course')`
- old `year` -> `sections` + `placements`
- old flat prerequisites -> `RequirementExpr`
- old elective count/hours progress -> `GraduationRequirement[]`
- old pseudo-courses like English exam or PPS -> evaluate if they are better modeled as `milestone`

## Deliverable expectation

Return a complete `StudyPlanData` object ready to be added to the repository under the new model, using the canonical schema and the helpers described above.
