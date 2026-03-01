# Prompt: University Curriculum to JavaScript Conversion

Extract and structure data from a university curriculum document into a `StudyPlan` JavaScript object.

<input_formats>
The curriculum may be provided as:

- **Images** (JPG/PNG): Screenshots of PDFs - recommended for tables and scanned documents
- **HTML/Web pages**: Direct web content - works well for online curricula
- **PDF**: Supported, but verify text extraction is accurate

The document may contain OCR errors and could be in various formats (tables, lists, grouped by semesters/years).
</input_formats>

<output_structure>

```javascript
import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
  // Course objects here
];

export const variableName: StudyPlan = {
  courses,
  degreeName: 'Licenciatura en Física',
  degreeSlug: 'LF',
  universityName: 'Universidad Nacional de Salta',
  universitySlug: 'UNSa',
  collegeName: 'Facultad de Ciencias Exactas', // Optional - omit if no college structure
  collegeSlug: 'FCE', // Optional - omit if no college structure
  durationYears: 5,
  year: 2005, // Optional - only if plan year is in official documentation
  progress: {
    type: 'mandatory-only' | 'mandatory-plus-elective-count' | 'mandatory-plus-elective-hours',
    requiredElectiveHours?: number,
    requiredElectiveCount?: number
  },
  sources: [{ id: 1, label: 'Source Name', url: 'URL' }],
  notes: [{ id: 1, text: 'Note with **markdown** support' }] // Optional
};
```

</output_structure>

<course_structure>

Each course object:

```javascript
{
  id: number,                    // Must match code when numeric
  code?: string,                 // Official course code (e.g., "1", "MAT101", "1.01")
  name: string,                  // Exact name from document
  hours?: number,                // Credit hours (undefined if not specified)
  term: string,                  // courseTerms.firstSemester | secondSemester | annual | semestral
  year?: number,                 // Academic year (1-5), undefined for transversal courses
  requirements: Requirement[],   // Prerequisites
  type: string,                  // courseTypes.mandatory | elective | optative (REQUIRED)
  attributes?: string[],         // courseAttributes.transversal | integrative | mandatoryFinalExam | contraSemester
  crossYear?: {                  // For courses spanning multiple years
    spansToYear: number,
    endsInTerm: string
  }
}
```

</course_structure>

<requirement_structure>

```javascript
{
  id: number,                    // Sequential within course (1, 2, 3...)
  requiredCourseId: number,      // ID of prerequisite course
  requiredState: string,         // courseStates.taken | passed | inProgress
  requiredFor: string            // requiredFor.enroll | complete
}
```

</requirement_structure>

<default_prerequisite_rule>

When the curriculum lists prerequisites WITHOUT specifying requirement types (e.g., just "Correlativas: Matemática I, Física I"), apply the standard Argentine university pattern by creating BOTH requirements for each prerequisite:

| Purpose                | State                 | Meaning                  |
| ---------------------- | --------------------- | ------------------------ |
| `requiredFor.enroll`   | `courseStates.taken`  | Regularizada para cursar |
| `requiredFor.complete` | `courseStates.passed` | Aprobada para rendir     |

Example - curriculum says "Correlativas: Matemática I":

```javascript
requirements: [
	{
		id: 1,
		requiredCourseId: 5,
		requiredState: courseStates.taken,
		requiredFor: requiredFor.enroll
	},
	{
		id: 2,
		requiredCourseId: 5,
		requiredState: courseStates.passed,
		requiredFor: requiredFor.complete
	}
];
```

Only use this default when prerequisite information is unstructured. When detailed columns exist, follow the explicit specifications.

</default_prerequisite_rule>

<three_column_prerequisites>

Many Argentine universities (especially UTN) use 3-column prerequisite tables. Each column maps differently:

| Column Header                            | Maps To                                        |
| ---------------------------------------- | ---------------------------------------------- |
| "Para Cursar TENER CURSADA/REGULARIZADA" | `requiredFor.enroll` + `courseStates.taken`    |
| "Para Cursar TENER APROBADA"             | `requiredFor.enroll` + `courseStates.passed`   |
| "Para Rendir TENER APROBADA"             | `requiredFor.complete` + `courseStates.passed` |

Key insight: Columns 1 and 2 are BOTH enrollment requirements. Only Column 3 is for completion.

Common error: Using `requiredFor.complete` for Column 2. Correct: Column 2 uses `requiredFor.enroll`.

Before writing code, create a prerequisite mapping table:

```
PREREQUISITE MAPPING
═════════════════════════════════════
Code 09 → Col1: [01, 04], Col2: [02, 03], Col3: [01, 02]
Code 14 → Col1: [08, 09], Col2: [03, 04, 05], Col3: [08, 09]
...
```

Then verify each course code matches its prerequisites before writing requirement arrays.

</three_column_prerequisites>

<id_code_synchronization>

When a course has a numeric code, the `id` must match the `code`:

- Numeric codes: `code: '5'` → `id: 5`
- Non-numeric codes (I1, DA, PPS): Use high IDs (90+)
- Transversal courses with long institutional codes: Use the code directly as ID
- Transversal courses without codes: Use low IDs (1-50)

Benefits: Prerequisites become intuitive (code "18" references `id: 18`), debugging is easier.

</id_code_synchronization>

<special_terms>

| Term                         | When to Use                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `courseTerms.annual`         | Explicitly marked "Anual"                                                     |
| `courseTerms.firstSemester`  | "1er Semestre", "1° Cuatrimestre", or odd continuous numbers (1,3,5,7,9)      |
| `courseTerms.secondSemester` | "2do Semestre", "2° Cuatrimestre", or even continuous numbers (2,4,6,8,10)    |
| `courseTerms.semestral`      | Says "cuatrimestral" or "semestral" WITHOUT specifying 1° or 2° - never guess |

Continuous semester numbering: "3er Cuatrimestre" in Year 2 → `term: courseTerms.firstSemester, year: 2`

</special_terms>

<transversal_courses>

Courses that can be taken at any time (not tied to a specific year):

```javascript
{
  id: 1,
  code: '951170',
  name: 'Gestión de la Calidad',
  term: courseTerms.semestral,
  // year is omitted (undefined) for transversal courses
  type: courseTypes.elective,
  attributes: [courseAttributes.transversal],
  requirements: [/* still apply */]
}
```

Look for: Electives listed separately, courses marked "puede cursarse en cualquier momento", separate "Materias Electivas" sections.

</transversal_courses>

<cross_year_courses>

Courses spanning multiple academic years (e.g., "Año desfasado"):

```javascript
{
  id: 43,
  name: 'Proyecto Final',
  term: courseTerms.secondSemester,  // Starting term
  year: 5,                            // Starting year
  crossYear: {
    spansToYear: 6,
    endsInTerm: courseTerms.firstSemester
  }
}
```

</cross_year_courses>

<year_range_prerequisites>

Pattern: "1º A 2º año", "Todo 1º A 2º año"

- Expand to ALL individual course IDs from that range
- Document in notes that redundant requirements were simplified

Pattern: "3° completo", "2do año completo"

- Only courses from THAT specific year, NOT all years up to that point
- "3° completo" → only year 3 courses, not years 1-3

</year_range_prerequisites>

<progress_types>

| Type                            | When to Use                    | Config                     |
| ------------------------------- | ------------------------------ | -------------------------- |
| `mandatory-only`                | No elective requirements       | -                          |
| `mandatory-plus-elective-count` | Must complete N electives      | `requiredElectiveCount: N` |
| `mandatory-plus-elective-hours` | Must complete X elective hours | `requiredElectiveHours: X` |

</progress_types>

<optative_handling>

**Pattern 1: Optatives in Curriculum** (use `mandatory-only`)

When curriculum lists required courses named "Optativa 1", "Optativa 2":

- Set `type: courseTypes.optative`
- Use `progress: { type: 'mandatory-only' }`
- List available options in notes

```javascript
{ id: 32, name: 'Optativa 1', type: courseTypes.optative, ... }
// In notes: "Opciones de Optativa 1: Opción A, Opción B, Opción C"
```

**Pattern 2: Separate Electives** (use `mandatory-plus-elective-count`)

When electives are ADDITIONAL to mandatory courses:

- Create separate course objects for each elective option
- Use appropriate progress type

Ask: "Is 'Optativa 1' a required slot in the curriculum?" YES → Pattern 1, NO → Pattern 2

</optative_handling>

<course_name_cleaning>

Remove suffixes and add corresponding type/attributes:

- "(electiva)" → `type: courseTypes.elective`
- "(integradora)" → `attributes: [courseAttributes.integrative]`
- "(optativa)" → `type: courseTypes.optative`

Example: "Geología Aplicada (electiva)" → `name: "Geología Aplicada", type: courseTypes.elective`

</course_name_cleaning>

<course_name_formatting>

**Title Case + Full Names**: Never use ALL CAPS or abbreviations from source documents. Apply Spanish title case rules.

**Title Case Rules**:

- Capitalize all major words (nouns, verbs, adjectives, adverbs)
- Keep lowercase: articles (el, la, los, las, un, una), prepositions (de, del, en, a, para, por, con, al), conjunctions (y, e, o, u)
- Exception: Capitalize these words when they START the name
- Preserve acronyms in uppercase: UNAHUR, UTN, UBA, ESI, etc.

**Examples**:

- "Lengua inglesa I" → `Lengua Inglesa I`
- "Didáctica del inglés para el nivel primario" → `Didáctica del Inglés para el Nivel Primario`
- "Prácticas docentes en el nivel primario" → `Prácticas Docentes en el Nivel Primario`
- "Asignatura UNAHUR" → `Asignatura UNAHUR` (acronym preserved)
- "Historia de la Nación Argentina y sus proyectos educativos" → `Historia de la Nación Argentina y sus Proyectos Educativos`

**Additional formatting**:

- Expand all abbreviations: TEOR. → Teoría, PRAC. → Práctica, PSICOL. → Psicología, CLIN. → Clínica
- Add proper Spanish accents (á, é, í, ó, ú, ñ)
- Complete truncated names: "INTRODUCCION A LA PSICOLO" → "Introducción a la Psicología"

Example: "ESTAD.APLIC.PSICOL.INVEST" → `name: "Estadística Aplicada a la Investigación Psicológica"`

</course_name_formatting>

<slug_conventions>

| Field            | Format              | Examples          |
| ---------------- | ------------------- | ----------------- |
| `degreeSlug`     | Uppercase acronym   | ISI, LF, Arq, CP  |
| `universitySlug` | Official acronym    | UTN, UNSa, UNAHUR |
| `collegeSlug`    | Optional, uppercase | FRCU, FCE, ITI    |

Variable name: lowercase concatenation → `utnFrcuIsi2023`, `unsaFceLf2005`

Full slug pattern: `{universitySlug}-{collegeSlug?}-{degreeSlug}-{year?}` → `utn-frcu-isi-2023`

Only include `year` if officially documented in plan name.

</slug_conventions>

<hours_extraction>

**Priority order for hours field:**

1. **Weekly hours** (horas semanales) - ALWAYS prefer this when available
2. If only total hours available, convert to weekly: `weekly = total / weeks_per_term`

**Never use total hours directly.** The `hours` field represents weekly class hours, which is the standard measure for course load.

**Determining weeks per term:**

- Look for explicit duration in the curriculum document (e.g., "16 semanas por cuatrimestre", "18 weeks")
- Check university academic calendar if available
- If weeks cannot be determined, **ask the user** - default to 16 weeks for semesters/32 for annual if user confirms

**CRITICAL: Never omit hours.** If only total hours exist, convert using the formula above. Omitting hours degrades user experience.

**Examples:**

- Source: "8 horas semanales, 128 horas totales" → `hours: 8`
- Source: "96 horas totales" + doc says "16 semanas" → `hours: 6` (96/16)
- Source: "Carga horaria: 4hs" (ambiguous) → Assume weekly, `hours: 4`

</hours_extraction>

<multi_code_parsing>

Extract EVERY code from multi-code cells:

- "2 - 5" → codes 2 AND 5
- "1, 3, 7" → codes 1, 3, AND 7
- "INGLÉS II, 11-13-15-16-18-21" → 7 codes total

Process: Split by commas first, then by dashes within each segment. Create a requirement for EACH code.

</multi_code_parsing>

<processing_workflow>

1. **Extract complete data**: If web responses are truncated, make follow-up queries until complete
2. **Create prerequisite mapping table**: Before writing any code, map each course code to its prerequisites from all columns
3. **Process row-by-row**: Go through every course sequentially, verify each placement
4. **Validate counts**: Extracted codes must equal requirement objects created
5. **Cross-validate**: Final course count and distribution must match source

</processing_workflow>

<university_logo>

If this is the FIRST study plan from a university, download the university logo:

1. Search for the official logo (prefer PNG with transparent background)
2. Save as `/static/{universitySlug.toLowerCase()}.png` (e.g., `ucaece.png`)
3. The logo will automatically appear in the home page career list
4. **Create optimized version for Open Graph images**:
   ```bash
   # Resize to max 200px width (maintains aspect ratio)
   sips --resampleWidth 200 "static/{universitySlug}.png" --out "static/og-logos/{universitySlug}.png"
   ```
   For JPEG files renamed as PNG (if `file` command shows "JPEG image data"):
   ```bash
   sips -s format png --resampleWidth 200 "static/{universitySlug}.png" --out "static/og-logos/{universitySlug}.png"
   ```
   Target size: <20KB (acceptable up to 50KB). Large images can cause OG generation timeouts.
   Note: Grayscale filter is applied via CSS in the OG image generator.

</university_logo>

<error_handling>

- **OCR errors**: Correct obvious mistakes (INGENERIA → INGENIERÍA)
- **Character encoding**: Use proper UTF-8 Spanish characters (á, é, í, ó, ú, ñ), never use � symbols
- **Missing hours**: Use `undefined`
- **Missing prerequisites**: Create minimal course object if referenced course doesn't exist

</error_handling>

<validation_checklist>

Before submitting:

- [ ] Three-column prerequisite tables: All 3 columns processed with correct mappings
- [ ] Multi-code cells: Every code extracted (count codes vs requirement objects)
- [ ] Course count: Matches source document
- [ ] Term verification: Each course's term matches source "Cursado" column exactly
- [ ] ID-Code sync: Numeric codes match IDs
- [ ] No duplicate IDs
- [ ] Spot-check: Verified 5-10 courses character-by-character against source
- [ ] Correct imports: `courseTypes` from `'$lib/course-type'`, `courseAttributes` from `'$lib/course-attribute'`
- [ ] Required fields: degreeName, degreeSlug, universityName, universitySlug, durationYears, progress, sources

</validation_checklist>

<condensed_example>

```javascript
import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
  // Year 1 - Mandatory course (always specify type)
  {
    id: 1,
    code: '1',
    name: 'Álgebra y Geometría Analítica',
    hours: 10,
    term: courseTerms.firstSemester,
    type: courseTypes.mandatory,
    year: 1,
    requirements: []
  },
  // Year 1 - Mandatory with integrative attribute
  {
    id: 8,
    code: '8',
    name: 'Sistemas y Procesos de Negocios',
    hours: 3,
    term: courseTerms.annual,
    type: courseTypes.mandatory,
    year: 1,
    attributes: [courseAttributes.integrative],
    requirements: []
  },
  // Year 2 - Mandatory with requirements (enroll only - from Column 1)
  {
    id: 14,
    code: '14',
    name: 'Análisis Matemático II',
    hours: 5,
    term: courseTerms.annual,
    type: courseTypes.mandatory,
    year: 2,
    requirements: [
      { id: 1, requiredCourseId: 1, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
      { id: 2, requiredCourseId: 5, requiredState: courseStates.taken, requiredFor: requiredFor.enroll }
    ]
  },
  // Mandatory with both enroll and complete requirements (default pattern)
  {
    id: 7,
    code: '7',
    name: 'Análisis Matemático II',
    hours: 10,
    term: courseTerms.firstSemester,
    type: courseTypes.mandatory,
    year: 2,
    requirements: [
      // Column 1: regularizada para cursar
      { id: 1, requiredCourseId: 4, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
      { id: 2, requiredCourseId: 5, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
      // Column 2: aprobada para cursar (still enroll, NOT complete!)
      { id: 3, requiredCourseId: 1, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
      // Column 3: aprobada para rendir
      { id: 4, requiredCourseId: 4, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
      { id: 5, requiredCourseId: 5, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
    ]
  },
  // Transversal elective (year undefined, has transversal attribute)
  {
    id: 951170,
    code: '951170',
    name: 'Gestión de la Calidad',
    hours: 4,
    term: courseTerms.semestral,
    type: courseTypes.elective,
    attributes: [courseAttributes.transversal],
    requirements: [
      { id: 1, requiredCourseId: 25, requiredState: courseStates.passed, requiredFor: requiredFor.enroll }
    ]
  }
];

export const utnFrcuIsi2023: StudyPlan = {
  courses,
  degreeName: 'Ingeniería en Sistemas de Información',
  degreeSlug: 'ISI',
  universityName: 'Universidad Tecnológica Nacional',
  universitySlug: 'UTN',
  collegeName: 'Facultad Regional Concepción del Uruguay',
  collegeSlug: 'FRCU',
  durationYears: 5,
  year: 2023,
  progress: {
    type: 'mandatory-plus-elective-hours',
    requiredElectiveHours: 40
  },
  sources: [
    { id: 1, label: 'Plan de Estudios 2023', url: 'https://example.com/plan' }
  ],
  notes: [
    { id: 1, text: 'Se requieren **40 horas** de materias electivas para completar la carrera.' }
  ]
};
```

</condensed_example>

<common_errors_to_avoid>

1. **Column 2 misuse**: Using `requiredFor.complete` instead of `requiredFor.enroll` for "Para Cursar TENER APROBADA"
2. **Incomplete multi-code parsing**: "2-5" yields only "2", missing "5"
3. **Wrong term from continuous numbering**: "3er Cuatrimestre" assigned to year 3 instead of year 2, firstSemester
4. **Guessing semester**: Using firstSemester when document only says "cuatrimestral" (use `semestral`)
5. **Pattern assumptions**: Assuming similar courses have same term without verifying each one
6. **Missing elective prerequisites**: Leaving empty requirements on electives that have prerequisites
7. **Single-year vs cumulative**: "3° completo" means only year 3 courses, not years 1-3

</common_errors_to_avoid>

Process the provided curriculum document and generate the complete JavaScript object following this structure.
