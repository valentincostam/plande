# Prompt for Converting University Curriculum PDF to JavaScript Object

You are a highly capable language model tasked with extracting and structuring data from a university curriculum document (PDF or image) into a JavaScript object that follows the exact structure used by this application. Your goal is to create a complete `CareerData` object with all courses, their prerequisites, and metadata.

## Input Analysis

The input is a document containing a university curriculum which may include:

- Course names, IDs, credit hours, academic terms, years/levels
- Prerequisites (often called "correlativas" in Spanish)
- Course tags (elective, integrative, optative)
- Program metadata (degree name, college, years, sources)

The document may contain OCR errors and could be in various formats (tables, lists, grouped by semesters/years).

## Output Structure

Generate a complete JavaScript object with this exact structure:

```javascript
import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
  // Course objects here
];

export const [careerName]Data: CareerData = {
  courses,
  degree: 'Degree Name',
  years: 5,
  college: 'University Name',
  studyProgram: 'Plan de Estudios Year',
  progress: {
    type: 'mandatory-only' | 'mandatory-plus-elective-hours' | 'mandatory-plus-one-elective',
    requiredElectiveHours?: number,
    requiredElectiveCount?: number
  },
  sources: [
    {
      id: 1,
      label: 'Source Name',
      url: 'URL'
    }
  ],
  notes: [
    {
      id: 1,
      text: 'Note text with **bold** and [links](/path)'
    }
  ]
};
```

## Course Object Structure

Each course must have this exact structure:

```javascript
{
  id: number,                    // Unique sequential ID
  code?: string,                 // Optional: course code/number from curriculum (e.g., "MAT101", "1.1")
  name: string,                  // Course name exactly as in document
  hours?: number,                // Credit hours (undefined if not specified)
  term: string,                  // Must be: courseTerms.firstSemester, courseTerms.secondSemester, courseTerms.annual, or courseTerms.semestral
  year: number,                  // Academic year (1, 2, 3, 4, 5)
  requirements: Requirement[],    // Array of prerequisite objects
  tag?: string                   // Optional: courseTags.elective, courseTags.integrative, courseTags.optative
}
```

## Requirements Object Structure

```javascript
{
  id: number,                    // Unique requirement ID within this course
  requiredCourseId: number,      // ID of prerequisite course
  requiredState: string,         // Must be: courseStates.taken, courseStates.passed, or courseStates.inProgress
  requiredFor: string            // Must be: requiredFor.enroll or requiredFor.complete
}
```

## Additional Field Documentation

### Optional Fields
- `code`: Course code/number from official curriculum (string, optional). Examples: "MAT101", "1.1", "340102", "1", "25"
- `hours`: Credit hours (number or undefined if not specified). Use `undefined` when hours are not provided
- `tag`: Course category (courseTags.elective, courseTags.integrative, courseTags.optative)

### Course Code Extraction Guidelines

The `code` field should contain the official course identifier from the curriculum document. Course codes serve as unique identifiers that are often used in prerequisite references and official documentation.

#### Detection Strategies (in order of priority):

1. **Dedicated ID columns in tables**: 
   - Look for columns with headers like "N°", "Nº", "Código", "Cod", "ID", "#", "Num", "Item"
   - These typically contain sequential numbers (1, 2, 3...) or institutional codes (MAT101, FIS-201)
   - **Critical**: In tabular formats, the code column may not always be the first column

2. **Inline course identifiers**:
   - Codes appearing at the start of course names: `"1. Álgebra y Geometría Analítica"` → code: `"1"`
   - Codes in parentheses: `"Física I (FIS-201)"` → code: `"FIS-201"`
   - Codes with separators: `"MAT101 - Cálculo I"` → code: `"MAT101"`
   - Codes after course names: `"Análisis Matemático 340102"` → code: `"340102"`

3. **Context-based detection**:
   - Course codes mentioned in prerequisite sections (use these to identify main course codes)
   - References in footnotes or course descriptions
   - Institutional course catalogs or registration systems

4. **Format variations**:
   - **Numeric**: "1", "25", "340102" (simple sequential or institutional numbering)
   - **Alphanumeric**: "MAT101", "FIS-201", "ING-001" (department prefix + number)
   - **Hierarchical**: "1.1", "2.3", "IV.2" (year.semester or level.sequence)
   - **UCU Format**: "1.01", "2.13", "4.12" (year.sequential within year)
   - **Mixed**: "A-25", "L1-03", "5A" (combinations of letters and numbers)
   - **Special**: "Op1", "Op2", "PPS" (optatives and special programs)

5. **Special cases**:
   - **Sequential numbering**: If document shows clear sequential pattern (1, 2, 3...), use as-is
   - **Missing codes**: If no official code exists in the document, omit the `code` field entirely
   - **Duplicate codes**: If same code appears for multiple courses, investigate for context (different years, tracks)
   - **Abbreviations**: Some curricula use abbreviations like "PPS" for "Práctica Profesional Supervisada"

#### Validation and Quality Checks:

- **Consistency**: All codes should follow the same format within a curriculum
- **Uniqueness**: Each course should have a unique code (if codes are provided)
- **Reference matching**: Codes used in prerequisites should match exactly with course codes
- **OCR correction**: Fix obvious OCR errors (O→0, I→1) but preserve intended format

#### Common Pitfalls:

- **Don't create artificial codes**: Never generate codes that aren't in the source document
- **Don't assume table structure**: Not all curricula use tables; codes may be embedded in text
- **Don't ignore context**: Sometimes codes appear only in specific sections (prerequisites, syllabi)
- **Don't standardize format**: Preserve the exact format from the source (including punctuation, case)

**Examples of course code patterns**:
- `"1. Álgebra y Geometría Analítica"` → code: `"1"`
- `"MAT101 - Cálculo I"` → code: `"MAT101"`
- `"Física I (FIS-201)"` → code: `"FIS-201"`
- `"340102 Análisis Matemático"` → code: `"340102"`
- `"Práctica Profesional Supervisada"` → code: `"PPS"` (if document uses this abbreviation)
- `"Course name with no visible code"` → omit `code` field entirely

**UCU Curriculum Pattern (Hierarchical X.YZ format)**:
- First year courses: `1.01, 1.02, 1.03, ..., 1.08`
- Second year courses: `2.01, 2.02, 2.03, ..., 2.13`
- Third year courses: `3.01, 3.02, 3.03, ..., 3.11`
- Fourth year courses: `4.01, 4.02, 4.03, ..., 4.12`
- Fifth year courses: `5.01, 5.02`
- Optional courses: `Op1, Op2, Op3` (appear in curriculum as optatives)
- Special courses: `PPS` or custom codes like `9.99` (Práctica Profesional Supervisada)

**Key UCU Detection Tips**:
- Codes appear as small numbers next to course names in the curriculum document
- Sequential numbering within each academic year
- Optional courses clearly marked with "Op" prefix
- PPS may have special coding (check document for specific format)

### Course States
- `courseStates.taken` = "Cursar/Regular" (enrolled, in progress)
- `courseStates.passed` = "Aprobar/Aprobada" (passed with grade)
- `courseStates.inProgress` = "Cursando" (currently enrolled, similar to taken)

### Requirement ID Guidelines
- Use sequential numbering (1, 2, 3...) within each course
- IDs can be reused across different courses
- Each requirement within a course should have unique ID

### Special Terms
- `courseTerms.semestral`: For non-standard semester systems
- `courseTerms.annual`: Courses spanning the full academic year
- `courseTerms.firstSemester`/`courseTerms.secondSemester`: Standard semester divisions

## Key Differences from Old Format

1. **JavaScript object literal, not JSON** - Use proper JavaScript syntax
2. **Import statements** - Include all necessary imports at the top
3. **Type annotations** - Use TypeScript-style type annotations
4. **Export statement** - Export the final object
5. **Complete metadata** - Include degree, college, sources, notes
6. **Progress configuration** - Specify the type of progress tracking
7. **Semestral term** - Added `courseTerms.semestral` option

## Prerequisites Detection Guidelines

Prerequisites typically appear in these formats:

1. **Course codes/IDs**: "Cursar: 101, 102" or "Aprobar: 201, 202"
2. **Course names**: "Cursar: Álgebra, Cálculo" or "Aprobar: Física I"
3. **Ranges**: "Cursar: 1er año completo" or "Aprobar: 2do año completo"
4. **Lists**: "Cursar: Matemática I, Física I" or "Aprobar: Análisis I, Álgebra I"
5. **Semester references**: "Cursar: 1er semestre" or "Aprobar: 2do semestre"

**CRITICAL: TWO-COLUMN PREREQUISITE PROCESSING**

When the curriculum has TWO subcolumns under a parent prerequisite column (like "Regular" and "Aprobadas" under "PARA CURSAR Y RENDIR"), you MUST process BOTH subcolumns:

1. **"Regular" subcolumn** contains prerequisites with state `courseStates.taken`
2. **"Aprobadas" subcolumn** contains prerequisites with state `courseStates.passed`

Both subcolumns list requirements for the SAME PURPOSE (determined by the parent column header). If the parent column indicates "para cursar" or similar, use `requiredFor.enroll` for ALL requirements from both subcolumns.

The difference between subcolumns is the REQUIRED STATE, not the purpose.

NEVER ignore either subcolumn. Both must be converted to requirement objects.

**State determination**:

- "Cursar" = `courseStates.taken` (enrolled/in progress)
- "Aprobar" = `courseStates.passed` (completed with passing grade)
- "Regular" = `courseStates.taken` (enrolled)
- "Aprobada" = `courseStates.passed` (passed)
- "Cursando" = `courseStates.inProgress` (currently enrolled, similar to taken)

**Purpose determination**:

- "Para cursar" = `requiredFor.enroll` (needed to enroll)
- "Para rendir" = `requiredFor.complete` (needed to complete)
- **"Para cursar y rendir"** = `requiredFor.enroll` (needed to enroll - both subcolumns use the same purpose)

**Subcolumn state mapping**:
- **"Regular" subcolumn** → `courseStates.taken`
- **"Aprobadas" subcolumn** → `courseStates.passed`

## Progress Type Selection

Choose based on the curriculum structure:

- `mandatory-only`: No elective requirements (examples: UADER, UNER)
- `mandatory-plus-elective-hours`: Must complete X hours of electives (example: UTN requires 40 hours)
- `mandatory-plus-one-elective`: Must complete 1+ elective courses (example: UCU requires 1 optative)

## Error Handling

1. **Missing data**: Use `undefined` for hours, proper defaults for other fields
2. **OCR errors**: Correct obvious mistakes (e.g., "INGENERIA" → "INGENIERÍA")
3. **Inconsistent IDs**: Ensure all `requiredCourseId` references exist in the courses array
4. **Missing prerequisites**: If a prerequisite course isn't listed, create a minimal course object for it
5. **Missing prerequisite subcolumns**: NEVER ignore prerequisite subcolumns. If you see both "Regular" and "Aprobadas" subcolumns under a parent prerequisite column, process BOTH with the correct state mapping - this is extremely important for accurate course progression tracking
6. **Course codes**: Extract codes exactly as they appear in the source document. Don't modify formatting unless correcting obvious OCR errors

## CRITICAL: Annual Section Interpretation

**COMMON ERROR**: LLMs often misinterpret course placement when courses appear near "Annual" sections in tabular layouts.

### Rules for Annual Course Classification:

1. **Year assignment**: Annual courses belong to the YEAR indicated in the "NIVEL/YEAR" column, NOT the year of courses that appear after them visually
2. **Visual layout trap**: Courses that appear below an "Annual" section may belong to the NEXT year's first semester, not the current year's annual courses
3. **Always verify**: Cross-reference the "NIVEL" column with the course's actual year placement

### Example Error Pattern:
```
IV (Year 4)
├── 1° Cuatrimestre: Course A, Course B  
├── 2° Cuatrimestre: Course C, Course D
├── Annual: Course E, Course F, Course G
├── Course H ← ERROR: This belongs to Year 5, 1er Cuatrimestre
└── Course I ← ERROR: This belongs to Year 5, 1er Cuatrimestre

V (Year 5)  
├── 1° Cuatrimestre: [Should include Course H, Course I]
```

**Correct interpretation**: Only courses explicitly under the "Annual" section (Course E, F, G) are annual courses for that year. Courses appearing after may belong to the next year's semester.

## Complex Prerequisites Examples

**Multiple states for same course**: When a course needs different states for enroll vs complete:
```javascript
requirements: [
  {
    id: 1,
    requiredCourseId: 2, // Técnicas de Representación I
    requiredState: courseStates.inProgress,
    requiredFor: requiredFor.enroll
  },
  {
    id: 3,
    requiredCourseId: 2, // Same course, different state
    requiredState: courseStates.passed,
    requiredFor: requiredFor.complete
  }
]
```

**Redundant requirements**: Use comments to explain when requirements are implied by prerequisite chains:
```javascript
// This requirement is redundant because Arquitectura II already requires Arquitectura I passed
{
  id: 1,
  requiredCourseId: 1, // Introducción a la Arquitectura
  requiredState: courseStates.passed,
  requiredFor: requiredFor.enroll
}
```

## Example Output

```javascript
import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
  {
    id: 1,
    name: 'Álgebra y Geometría Analítica',
    hours: 10,
    term: courseTerms.firstSemester,
    year: 1,
    requirements: []
  },
  {
    id: 14,
    name: 'Análisis Matemático II',
    hours: 5,
    term: courseTerms.annual,
    year: 2,
    requirements: [
      {
        id: 1,
        requiredCourseId: 1,
        requiredState: courseStates.taken,
        requiredFor: requiredFor.enroll
      },
      {
        id: 2,
        requiredCourseId: 5,
        requiredState: courseStates.taken,
        requiredFor: requiredFor.enroll
      }
    ]
  },
  {
    id: 28,
    code: '5.5',
    name: 'Medicina Familiar y General',
    hours: undefined, // Use undefined when hours not specified
    term: courseTerms.annual,
    year: 5,
    requirements: [
      // ... requirements array
    ]
  }
];

export const exampleData: CareerData = {
  courses,
  degree: 'Ingeniería en Sistemas',
  years: 5,
  college: 'Universidad Example',
  studyProgram: 'Plan de Estudios 2024',
  progress: {
    type: 'mandatory-only'
  },
  sources: [
    {
      id: 1,
      label: 'Plan de Estudios',
      url: 'https://example.com/plan'
    }
  ],
  notes: []
};
```

## Final Notes

- Ensure all imports are correct
- Use consistent ID numbering starting from 1
- Validate all prerequisite references
- Include complete metadata (degree, college, sources)
- Choose appropriate progress type
- Handle missing data gracefully with `undefined`
- Correct OCR errors in course names
- Maintain proper JavaScript syntax (not JSON)

Process the provided document and generate the complete JavaScript object following this exact structure.
