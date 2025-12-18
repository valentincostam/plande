# Prompt (v2) — Convert University Curriculum to `StudyPlan` (TypeScript module)

You are an expert at extracting Argentine/LatAm university curricula (PDF/image/HTML) into the exact TypeScript module format used by this app.

## Output contract (HARD)

- Return **ONLY** the final TypeScript module contents.
- No prose, no markdown outside code.
- Must compile.

## Input modalities (read strategy)

- **HTML / copied text**: preferred (clean reading order).
- **PDF**: good if text-based; beware multi-column reading-order traps.
- **JPG/PNG screenshots of PDFs**: often good for tables if **sharp, cropped to the table, upright (no tilt), readable**.
- If input looks **incomplete/truncated** (missing rows/courses/years): do **not** invent; instead add a `notes` item describing what appears missing.

## You must produce

A complete `StudyPlan` module with:

- `courses: RawCourse[]` (all mandatory + all elective/optative/transversal/special requirements)
- metadata: `degreeName`, `degreeSlug`, `universityName`, `universitySlug`, optional `collegeName/collegeSlug`, optional `year`, `durationYears`, `sources`, optional `notes`
- `progress` config (see **Progress rules**)

## Slugs + exported variable name (required)

- `degreeSlug`: short acronym for the degree (typically 2–5 chars). Use the official/common acronym when possible.
- `universitySlug`: official acronym (preserve official mixed case if used, e.g. `UNSa`).
- `collegeSlug` (optional): only if the university is structured into colleges/faculties.
- `year` field: include **only** if the plan year is explicitly stated in official documentation (e.g. “Plan 2008”, “Plan 2023”). Otherwise omit.

Exported constant name (file output):

- camelCase concatenation of `universitySlug` + optional `collegeSlug` + `degreeSlug` + optional `year`
- examples: `utnFrcuIsi2023`, `unsaFceLf2005`, `unahurItiLi2016`, `ucuFauArq2007`

## Exact module skeleton

```ts
import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { TRANSVERSAL_YEAR } from '$lib/course.svelte';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
  // ...
];

export const variableNameHere: StudyPlan = {
  courses,
  degreeName: '...',
  degreeSlug: '...',
  universityName: '...',
  universitySlug: '...',
  // collegeName/collegeSlug optional
  durationYears: 0,
  // year optional
  progress: {
    type: 'mandatory-only' | 'mandatory-plus-one-elective' | 'mandatory-plus-elective-count' | 'mandatory-plus-elective-hours',
    requiredElectiveCount?: number,
    requiredElectiveHours?: number
  },
  sources: [
    { id: 1, label: '...', url: '...' }
  ]
  // notes optional
};
```

## Core rules (source > these defaults)

### 1) Terms

Map to exactly one:

- `courseTerms.annual`
- `courseTerms.firstSemester`
- `courseTerms.secondSemester`
- `courseTerms.semestral` (**ONLY** when doc says “cuatrimestral/semestral” without 1°/2°)

**Continuous cuatrimestre numbering**: if you see 3°,4°,5°…

- odd (1,3,5,7,9) → `firstSemester`
- even (2,4,6,8,10) → `secondSemester`

**Annual section layout trap (common)**:

- In multi-column layouts, courses visually “below” an Annual block may actually belong to the **next year’s** semester. Always anchor `year` to the explicit “Nivel/Año” labeling, not visual proximity.

### 2) Hours

- If missing: `hours: undefined`.
- Use the **correct column** (weekly/semester vs annual). Don’t copy total/annual hours into a semester course.

### 3) Names + tags

- Preserve names exactly (accents, capitalization). Fix obvious encoding (replace `�` with correct chars).
- If name contains suffix:
  - `(electiva)` → remove suffix + `tag: courseTags.elective`
  - `(optativa)` → remove suffix + `tag: courseTags.optative`
  - `(integradora)` → remove suffix + `tag: courseTags.integrative`

### 4) Codes and IDs

- Never invent course codes.
- If code is numeric (including long institutional numbers), set `id` to that numeric value.
- If code is non-numeric (e.g. `PPS`, `I1`, `DA`), pick a unique high numeric `id` (90+ / 900+), and keep `code` as-is.
- No duplicate `id`.

#### Code extraction (quick guide)

Prefer explicit “code/id” columns first, then inline patterns:

- Table headers: `N°/Nº`, `Código/Cod`, `ID`, `#`, `Item` (the code column is not always the first).
- Inline: `1. Álgebra…` → code `1`; `MAT101 - …` → `MAT101`; `Física I (FIS-201)` → `FIS-201`; `… 340102` → `340102`.
- Preserve punctuation/case (e.g. `1.01`, `2.13`, `Op1`, `PPS`). Fix only obvious OCR confusions (O→0, I→1) when clearly intended.

### 5) Requirements objects

Each requirement:

```ts
{
  id: number,
  requiredCourseId: number,
  requiredState: courseStates.taken | courseStates.passed | courseStates.inProgress,
  requiredFor: requiredFor.enroll | requiredFor.complete
}
```

#### Multi-code parsing (MANDATORY)

When a cell contains multiple correlatives, extract **all** tokens.

- Separators: commas, semicolons, dashes, whitespace.
- Spanish “y” means **AND** (all required).
  Examples:
- `2-5` → 2 and 5
- `11;12 y 14` → 11, 12, 14
- `INGLÉS II, 11-13-15` → `INGLÉS II`, 11, 13, 15

#### Missing prerequisite courses (avoid orphan refs)

If a prerequisite token references a course that is not present in the curriculum’s course list, create a minimal course entry so `requiredCourseId` is valid:

- best-effort `code` if the token is a code; otherwise omit `code`
- `name` from the token if it is a course name (or a clear placeholder)
- `year: TRANSVERSAL_YEAR`, `term: courseTerms.semestral`, `hours: undefined`, `requirements: []`
- add a `notes` item explaining it was added because it appears as a prerequisite but not listed as a course

#### Default prerequisite inference (VERY IMPORTANT)

If correlatives are listed **without** specifying condition/type (no columns, no “para cursar/para rendir”, just a list), then for **each** prerequisite course create **two** requirements:

- **to enroll (cursar)**: `requiredFor.enroll` + `courseStates.taken`
- **to complete (rendir/final)**: `requiredFor.complete` + `courseStates.passed`

Do **NOT** apply this default when the document explicitly provides requirement types/columns.

#### 3-column correlatividades tables (VERY IMPORTANT)

Many curricula use 3 prerequisite columns. Map by meaning (keywords may vary):

- Column “Para cursar / Tener cursada / Regularizada” → `enroll` + `taken`
- Column “Para cursar / Tener aprobada” → `enroll` + `passed`
- Column “Para rendir / Final / Tener aprobada” → `complete` + `passed`

Keyword mapping:

- “Para cursar” → `requiredFor.enroll`
- “Para rendir / examen final” → `requiredFor.complete`
- “cursada/regularizada” → `courseStates.taken`
- “aprobada/aprobado” → `courseStates.passed`

#### Year-range prerequisites

If a prerequisite is a range like “1º a 2º año”, expand it into **all courses** that belong to that range.

#### “X° completo” prerequisites

If a prerequisite says “3° completo / 2do año completo”, it means **ONLY** that year’s courses (not years 1..X). Expand accordingly.

### 6) Cross-year courses

If a course spans years:

- set starting `year` and starting `term`
- add:

```ts
crossYear: { spansToYear: number, endsInTerm: courseTerms.firstSemester | courseTerms.secondSemester }
```

### 7) Transversal courses

If a course has no assigned year / can be taken anytime:

- `year: TRANSVERSAL_YEAR`
- `term: courseTerms.semestral` unless the doc clearly states a specific semester

**Note**: `TRANSVERSAL_YEAR` is only placement. Whether it counts as elective depends on `tag`.

## Progress rules (critical; tag-driven)

This app computes progress as:

- **mandatory** = courses where `tag !== elective && tag !== optative`
- **electives** = courses where `tag === elective || tag === optative`

Therefore:

- Use `mandatory-only` only when all required units are mandatory (or when “electives” are represented as mandatory placeholder courses without elective/optative tags).
- If the plan requires completing **N** electives/optatives: `mandatory-plus-elective-count` with `requiredElectiveCount: N`.
- If the plan requires “at least one elective”: `mandatory-plus-one-elective` (set `requiredElectiveCount` to 1 unless doc says otherwise).
- If the plan requires **X elective hours**: `mandatory-plus-elective-hours` with `requiredElectiveHours: X`.

**Optativa placeholders** (e.g. “Optativa I/II” inside the grid):

- Create those placeholder courses with `tag: courseTags.optative`.
- Set `requiredElectiveCount` to the number of required placeholders.
- List the option pool in `notes` when the curriculum provides options.

## Elective/optative options: placeholders vs separate pool (important)

- If the curriculum has required slots like `Optativa 1`, `Materia Optativa I` inside the year/semester grid: **create only the placeholder course(s)** (do not create one course per option) and list option names/codes in `notes`.
- If the curriculum defines a separate pool of electives (each option is a real selectable course with its own name/code) and requires choosing N or hours from that pool: create course objects for each option (often transversal) and set `progress` accordingly.

## Graduation/egress conditions (often implicit)

If the curriculum states (or implies) extra graduation conditions (PPS, internship hours, capstone, thesis, “approve all courses to take Final Project”, etc.):

- Prefer encoding as prerequisites where representable.
- If not representable cleanly, add a `notes` entry explaining the inferred rule.
- If something is required to graduate but not a “course”, you may model it as a course with a clear name and explain in `notes` (only when needed).

## Mandatory workflow (do not skip)

1. Extract the full course list (names/codes/years/terms/hours) without assumptions.
2. Build a prerequisite mapping anchored to **each course code** (esp. for multi-column correlatividades tables).
3. Implement courses, then requirements using the mapping.
4. Validate counts/distribution and spot-check complex rows against the source.

## Mandatory validation (before final output)

- Process ALL columns in prerequisite tables (esp. 3-column).
- Multi-code cells: every code becomes a requirement.
- Course count matches the source.
- No orphan `requiredCourseId`.
- Term assignment matches the doc exactly (use `semestral` when unspecified).
- `progress` matches tag usage (elective/optative affect progress).

## Micro-examples (canonical style)

### A) Default inference (no explicit condition)

```ts
requirements: [
	{
		id: 1,
		requiredCourseId: 3622,
		requiredState: courseStates.taken,
		requiredFor: requiredFor.enroll
	},
	{
		id: 2,
		requiredCourseId: 3622,
		requiredState: courseStates.passed,
		requiredFor: requiredFor.complete
	}
];
```

### B) 3-column mapping (passed for ENROLL vs passed for COMPLETE)

```ts
requirements: [
	// Column 1: taken for enroll
	{
		id: 1,
		requiredCourseId: 12,
		requiredState: courseStates.taken,
		requiredFor: requiredFor.enroll
	},
	// Column 2: passed for enroll
	{
		id: 3,
		requiredCourseId: 3,
		requiredState: courseStates.passed,
		requiredFor: requiredFor.enroll
	},
	// Column 3: passed for complete
	{
		id: 6,
		requiredCourseId: 12,
		requiredState: courseStates.passed,
		requiredFor: requiredFor.complete
	}
];
```

### C) `TRANSVERSAL_YEAR` + `crossYear`

```ts
{
  id: 902,
  code: '902',
  name: 'Inglés Nivel II',
  hours: 4,
  term: courseTerms.semestral,
  year: TRANSVERSAL_YEAR,
  requirements: [
    { id: 1, requiredCourseId: 901, requiredState: courseStates.taken,  requiredFor: requiredFor.enroll },
    { id: 2, requiredCourseId: 901, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
  ]
}

{
  id: 43,
  code: '43',
  name: 'Proyecto Final',
  term: courseTerms.secondSemester,
  year: 5,
  crossYear: { spansToYear: 6, endsInTerm: courseTerms.firstSemester },
  requirements: []
}
```

Now process the provided curriculum input and output the full module.
