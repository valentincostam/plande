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
  id: number,                    // Unique sequential ID - MUST match the course code when possible
  code?: string,                 // Optional: course code/number from curriculum (e.g., "MAT101", "1.1")
  name: string,                  // Course name exactly as in document
  hours?: number,                // Credit hours (undefined if not specified)
  term: string,                  // Must be: courseTerms.firstSemester, courseTerms.secondSemester, courseTerms.annual, courseTerms.semestral, or courseTerms.crossYear
  year: number,                  // Academic year (1, 2, 3, 4, 5)
  requirements: Requirement[],    // Array of prerequisite objects
  tag?: string,                  // Optional: courseTags.elective, courseTags.integrative, courseTags.optative
  crossYear?: {                  // Optional: for courses spanning multiple years
    spansToYear: number,         // Year where the course ends
    endsInTerm: string          // Term where the course ends (courseTerms.firstSemester, courseTerms.secondSemester)
  }
}
```

### CRITICAL: ID and Code Synchronization

**MANDATORY RULE**: When a course has a numeric code, the `id` MUST match the `code` exactly for clarity and consistency.

**ID Assignment Strategy**:
1. **Numeric codes** (1, 2, 3, 10, 15, etc.): Set `id = parseInt(code)`
   - Course with `code: '5'` → `id: 5`
   - Course with `code: '25'` → `id: 25`

2. **Non-numeric codes** (I1, I2, DA, PPS, etc.): Use high numeric IDs (90+)
   - Course with `code: 'I1'` → `id: 99`
   - Course with `code: 'I2'` → `id: 98`  
   - Course with `code: 'DA'` → `id: 97`
   - Course with `code: 'PPS'` → `id: 96`

3. **No code**: Use next available high ID (95, 94, etc.)

**Benefits of ID-Code Synchronization**:
- Prerequisites become immediately clear (code "18" references course with `id: 18`)
- Eliminates confusion between internal IDs and curriculum codes
- Makes debugging and validation much easier
- Ensures `requiredCourseId` values are intuitive

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

### Course Name Cleaning and Tag Assignment

**CRITICAL**: Always clean course names and assign proper tags based on suffixes:

1. **Elective courses**: Remove "(electiva)" from course names and add `tag: courseTags.elective`
   - Example: "Geología Aplicada (electiva)" → name: "Geología Aplicada", tag: courseTags.elective

2. **Integrative courses**: Remove "(integradora)" from course names and add `tag: courseTags.integrative`
   - Example: "Proyecto Final (Integradora)" → name: "Proyecto Final", tag: courseTags.integrative

3. **Optative courses**: Remove "(optativa)" from course names and add `tag: courseTags.optative`
   - Example: "Materia Optativa (optativa)" → name: "Materia Optativa", tag: courseTags.optative

**Process**:
- Always scan course names for these suffixes: "(electiva)", "(integradora)", "(optativa)"
- Remove the suffix from the name field
- Add the corresponding tag field
- Keep the course name clean and professional

### Cross-Year Courses (Multi-Year Spanning)

Some courses span multiple academic years, typically starting in one year and ending in the next. These courses are identified by phrases like "Año desfasado" (offset year), or descriptions indicating they start in one semester and end in another year.

**Identification**: Look for courses that:
- Are described as spanning from one semester of a year to another semester of the following year
- Have notes indicating "Año desfasado" or "curso desfasado" 
- Show duration across year boundaries (e.g., "2º cuatr. 5º año - 1º cuatr. 6º año")

**Structure for cross-year courses**:
```javascript
{
  id: 43,
  name: 'Proyecto Final',
  term: courseTerms.secondSemester,  // Starting term
  year: 5,                           // Starting year  
  crossYear: {
    spansToYear: 6,                  // Ending year
    endsInTerm: courseTerms.firstSemester  // Ending term
  }
  // ... other properties
}
```

**Rules**:
- Set `term` to the starting term (where the course begins)
- Set `year` to the starting year
- Add `crossYear` object with `spansToYear` (ending year) and `endsInTerm` (ending term)
- The course will automatically appear in both years in the application

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

## MANDATORY SYSTEMATIC PROCESS

**CRITICAL**: You MUST follow this process step-by-step. Do NOT skip any step or assume information is correct without verification.

### Step 1: COMPLETE DATA EXTRACTION
1. **For web sources**: If information is truncated, make multiple queries until you have ALL data
2. **For structured tables**: Process EVERY row and EVERY column systematically
3. **For images**: Examine EVERY cell in tabular data row-by-row, column-by-column
4. **STOP CONDITION**: Only proceed when you have verified complete data for all courses and prerequisites

### Step 2: SYSTEMATIC TABLE PROCESSING (When curriculum is in table format)
**MANDATORY ROW-BY-ROW VERIFICATION:**
1. Start from course #1, go through EVERY course number sequentially
2. For EACH course, extract: Name, Year, Term/Semester, Prerequisites
3. **CRITICAL**: For prerequisite columns, extract EVERY code/reference (don't miss any)
4. Mark each row as "VERIFIED ✓" as you process it
5. **COUNT CHECK**: Verify total courses extracted matches expected count

### Step 3: PREREQUISITE EXTRACTION VALIDATION
**MANDATORY for EACH course with prerequisites:**
1. **List all prerequisite codes found**: Write them out explicitly
2. **Count codes vs. requirement objects**: Must match exactly
3. **Verify course ID mapping**: Each code references an existing course
4. **State validation**: Confirm correct courseStates (taken/passed)
5. **Purpose validation**: Confirm correct requiredFor (enroll/complete)

### Step 4: FINAL CROSS-VALIDATION CHECKPOINT
**MANDATORY before submitting**:
1. **Total course count**: Matches curriculum document
2. **Distribution check**: Courses per year/semester match document
3. **Prerequisite completeness**: All prerequisite relationships captured
4. **No orphaned references**: All requiredCourseId values exist in courses array
5. **Data consistency**: Terms, years, names match source exactly

**⚠️ QUALITY GATE**: If ANY validation fails, you MUST go back and fix before proceeding.

### HANDLING TRUNCATED WEB RESPONSES

**When WebFetch responses are incomplete:**
1. **Detect truncation**: Look for cut-off sentences, incomplete lists, or missing year data
2. **Make targeted follow-up queries**: Ask specifically for missing information
3. **Use multiple query strategies**:
   - "Continue with the remaining courses from where the previous response ended"
   - "Focus specifically on Year X courses and their prerequisites"
   - "Provide complete prerequisite information for courses 15-22"
4. **Cross-reference**: If you have partial data, ask for verification of specific details
5. **NEVER proceed with incomplete data**: Keep querying until you have everything

**Signs of incomplete data:**
- Response ends mid-sentence or mid-list
- Missing courses from expected sequence (gaps in course numbers)
- Vague or missing prerequisite information
- Incomplete year/semester distributions

### PROCESSING STRUCTURED CURRICULUM TABLES

**When you have access to official curriculum tables (images or structured data):**

1. **MANDATORY TABLE VERIFICATION PROCESS**:
   - Process table row by row, starting from row 1
   - For each row, verify: Course #, Name, Year/Term, Prerequisites
   - **DO NOT SKIP ROWS**: Process every single course sequentially
   - Mark progress: "Row 1 ✓, Row 2 ✓, Row 3 ✓..." as you go

2. **PREREQUISITE COLUMN PROCESSING**:
   - Read prerequisite codes EXACTLY as written (e.g., "2;3 y 5", "11;12 y 14")
   - Parse compound entries: "11;12 y 14" = courses 11, 12, AND 14
   - **CRITICAL**: "y" means "AND" - all courses are required
   - Count codes: "2;3 y 5" = 3 prerequisite courses (2, 3, 5)

3. **DISTRIBUTION VALIDATION**:
   - Count courses per semester: "1º Cuatr." vs "2º Cuatr."
   - Verify distribution matches your implementation
   - **Example validation**: If table shows 5 courses in "1º Cuatr. 3er Año", your code must have exactly 5 courses with `term: firstSemester, year: 3`

4. **CROSS-CHECK WITH SOURCE**:
   - Compare your final course count with table rows
   - Verify each course's term assignment matches table's "Régimen" column
   - Confirm all prerequisite relationships are captured

**Table Reading Best Practices**:
- Read tables left-to-right, top-to-bottom systematically
- Don't make assumptions about course placement
- When in doubt, refer back to the original table structure
- Use the official course numbers as your source of truth

### COMMON ERRORS AND HOW TO AVOID THEM

**Based on real implementation mistakes:**

1. **Error**: Trusting incomplete web responses
   - **What happened**: WebFetch returned partial data, missing prerequisites for several courses
   - **How to avoid**: Always check if response ends mid-sentence or has missing course sequences

2. **Error**: Not processing structured tables systematically
   - **What happened**: Misplaced courses in wrong semesters despite having official table
   - **How to avoid**: Process tables row-by-row, don't skip any rows, verify each placement

3. **Error**: Assuming elective courses have no prerequisites
   - **What happened**: Left "Electiva" course with empty requirements when it had 4 prerequisites
   - **How to avoid**: Check ALL courses for prerequisites, including electives and special courses

4. **Error**: Incomplete prerequisite parsing
   - **What happened**: Missing prerequisite codes from compound entries like "11;12 y 14"
   - **How to avoid**: Parse each code individually, count total codes vs. requirement objects

5. **Error**: Skipping final validation
   - **What happened**: Submitted data without cross-checking against source
   - **How to avoid**: Always do final validation - count courses, check distributions, verify all prerequisites

**PREVENTION STRATEGY**: Follow the systematic process above. Every error listed was preventable by following the mandatory steps.

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

**CRITICAL: Course Code vs ID Mapping in Prerequisites**

When processing prerequisites, you must understand the difference between:

- **Course `id`**: Sequential numeric identifier used internally (1, 2, 3, 4...)
- **Course `code`**: Official curriculum identifier that appears in prerequisite references

**Common Error**: Prerequisites reference course codes (like "2", "5", "MAT101"), but you must map these to the correct course `id` in the `requiredCourseId` field.

**Example Mapping Process** (with ID-Code Synchronization):
1. Prerequisite says: "2 - 5" (meaning courses with codes "2" and "5")
2. Find courses in your data:
   - Course with `code: '2'` has `id: 2` → use `requiredCourseId: 2` ✅
   - Course with `code: '5'` has `id: 5` → use `requiredCourseId: 5` ✅

**Process with synchronized IDs**:
1. First, create all courses with correct `code` values from the curriculum
2. **CRITICAL**: Assign IDs to match codes (numeric codes → same ID, non-numeric → high IDs 90+)
3. When processing prerequisites, numeric code references become direct ID lookups
4. For non-numeric codes (I1, DA), still look up by code to find the high ID
5. With proper ID-Code sync: code "5" DOES mean id: 5 (when code is numeric)

**Legacy Process** (for curricula with unsynchronized IDs):
1. When processing prerequisites, look up each referenced code
2. Find the course that has that `code` value  
3. Use that course's `id` as the `requiredCourseId`
4. Never assume that code "5" means id: 5 - always verify the mapping

**CRITICAL: Systematic Prerequisite Extraction Strategy**

To avoid missing prerequisites, follow this systematic approach:

1. **Row-by-row verification**: Go through EACH course row in the curriculum table
2. **Column-by-column check**: For EACH prerequisite column, verify what codes/references appear
3. **Multi-code parsing**: If a cell contains "2 - 5" or "1, 3, 7", extract ALL referenced codes
4. **Empty cell verification**: Confirm that dashes (-----) or blank cells truly mean no requirements
5. **Cross-reference validation**: After creating all requirements, verify that every referenced course code exists in your courses array

**Common extraction errors to avoid**:
- **CRITICAL**: Reading only the first code in a multi-code cell ("2 - 5" → only extracting "2" but missing "5")
- **CRITICAL**: Missing codes separated by commas, dashes, or spaces ("2-5", "1, 3, 7", "4 - 16")
- **CRITICAL**: Incomplete extraction from cells with multiple references - EVERY code must be converted to a requirement
- **CRITICAL**: Partial parsing of complex cells like "INGLÉS II, 11-13-15-16-18-21" (missing some of the 7 codes)
- **CRITICAL**: Stopping extraction early when encountering mixed text/numeric content
- **CRITICAL**: Not verifying that extracted code count matches requirement object count
- Misreading formatted cells due to OCR or visual parsing errors
- Assuming empty-looking cells have no content (check for light text, formatting)
- Processing only some prerequisite columns while ignoring others
- **CRITICAL**: Forgetting to map multi-code prerequisites in ALL THREE columns (regularizada, aprobada cursar, aprobada rendir)

**CRITICAL: Multi-Code Prerequisite Parsing**

When a prerequisite cell contains multiple course codes, you MUST extract EVERY individual code:

**Examples of multi-code patterns**:
- "2 - 5" → Extract codes "2" AND "5" (both required)
- "1, 3, 7" → Extract codes "1" AND "3" AND "7" (all required)  
- "4 - 16" → Extract codes "4" AND "16" (both required)
- "I1-16" → Extract codes "I1" AND "16" (both required)
- "12-13" → Extract codes "12" AND "13" (both required)
- "INGLÉS II, 11-13-15-16-18-21" → Extract codes "INGLÉS II", "11", "13", "15", "16", "18", AND "21" (all required)
- "2-5, DA-17" → Extract codes "2", "5", "DA", AND "17" (all required)

**MANDATORY Process**:
1. **Parse mixed content**: Split cells by commas first, then by dashes within each segment
   - "INGLÉS II, 11-13-15-16-18-21" → ["INGLÉS II", "11-13-15-16-18-21"]
   - Then parse "11-13-15-16-18-21" → ["11", "13", "15", "16", "18", "21"]
2. **Extract ALL individual codes**: Include both text references (course names) and numeric codes
3. **Create requirement objects**: Generate a separate requirement for EACH extracted code
4. **Map to course IDs**: Convert each code to its corresponding course ID in your data
5. **Apply states correctly**: Use the correct state (taken/passed) and purpose (enroll/complete)
6. **Count verification**: The number of requirement objects should equal the number of extracted codes

**Quality assurance checklist**:
- [ ] Every course row has been individually reviewed for prerequisites
- [ ] All prerequisite columns have been processed (not just the first one or two)
- [ ] Multi-code entries have been fully parsed (e.g., "2 - 5" yields both "2" and "5")
- [ ] **CRITICAL**: Complex cells like "INGLÉS II, 11-13-15-16-18-21" are completely parsed (should yield 7 requirements)
- [ ] Each individual code from multi-code cells has its own requirement object
- [ ] **COUNT CHECK**: For each prerequisite cell, count extracted codes vs. requirement objects created (must match exactly)
- [ ] Mixed content cells (text + numeric codes) are fully processed
- [ ] All `requiredCourseId` references point to existing course IDs  
- [ ] The three-column mapping is applied correctly (regularizada, aprobada para cursar, aprobada para rendir)

**CRITICAL: THREE-COLUMN PREREQUISITE PROCESSING**

When the curriculum has THREE prerequisite columns, you MUST process ALL three columns correctly:

1. **First column "TENER REGULARIZADA"** (para cursar) = `requiredFor.enroll` + `courseStates.taken`
2. **Second column "TENER APROBADA"** (para cursar) = `requiredFor.enroll` + `courseStates.passed`
3. **Third column "TENER APROBADA"** (para rendir) = `requiredFor.complete` + `courseStates.passed`

The first TWO columns are requirements FOR ENROLLMENT (`requiredFor.enroll`), while the third column contains requirements FOR COMPLETION/EXAMINATION (`requiredFor.complete`).

NEVER ignore any column. All three must be converted to requirement objects with the correct purpose and state.

**State determination**:

- "Cursar" = `courseStates.taken` (enrolled/in progress)
- "Aprobar" = `courseStates.passed` (completed with passing grade)
- "Regular/Regularizada" = `courseStates.taken` (enrolled)
- "Aprobada" = `courseStates.passed` (passed)
- "Cursando" = `courseStates.inProgress` (currently enrolled, similar to taken)

**Purpose determination**:

- "Para cursar" = `requiredFor.enroll` (needed to enroll)
- "Para rendir" = `requiredFor.complete` (needed to complete/examine)

**Column mapping**:
- **Column 1 "TENER REGULARIZADA"** → `requiredFor.enroll` + `courseStates.taken`
- **Column 2 "TENER APROBADA" (para cursar)** → `requiredFor.enroll` + `courseStates.passed`
- **Column 3 "TENER APROBADA" (para rendir)** → `requiredFor.complete` + `courseStates.passed`

## Progress Type Selection

Choose based on the curriculum structure:

- `mandatory-only`: No elective requirements (examples: UADER, UNER)
- `mandatory-plus-elective-hours`: Must complete X hours of electives (example: UTN requires 40 hours)
- `mandatory-plus-one-elective`: Must complete 1+ elective courses (example: UCU requires 1 optative)

## Error Handling

1. **Missing data**: Use `undefined` for hours, proper defaults for other fields
2. **OCR errors**: Correct obvious mistakes (e.g., "INGENERIA" → "INGENIERÍA")
3. **Character encoding issues**:
   - **CRITICAL**: Always use proper UTF-8 encoding for Spanish characters
   - Replace any � symbols with correct accented characters: á, é, í, ó, ú, ñ
   - Common corrections: Álgebra (not �lgebra), Análisis (not An�lisis), Ingeniería (not Ingenier�a)
   - Verify all course names, degree titles, and metadata have correct Spanish accents
4. **Course name cleaning**:
   - **MANDATORY**: Remove course type suffixes from names: "(electiva)", "(integradora)", "(optativa)"
   - Add corresponding tags instead: courseTags.elective, courseTags.integrative, courseTags.optative
   - Keep course names clean and professional
5. **Inconsistent IDs**: Ensure all `requiredCourseId` references exist in the courses array
6. **Missing prerequisites**: If a prerequisite course isn't listed, create a minimal course object for it
7. **Missing prerequisite columns**: NEVER ignore prerequisite columns. If you see three prerequisite columns ("TENER REGULARIZADA", "TENER APROBADA" for cursar, "TENER APROBADA" for rendir), process ALL THREE with the correct purpose and state mapping - this is extremely important for accurate course progression tracking
8. **Course codes**: Extract codes exactly as they appear in the source document. Don't modify formatting unless correcting obvious OCR errors
9. **CRITICAL DATA VALIDATION FAILURES**:
   - **Incomplete web extraction**: If you suspect missing data, DO NOT PROCEED until verified complete
   - **Semester/term misplacement**: Cross-check EVERY course term assignment against source
   - **Empty requirements on electives**: ALL courses can have prerequisites - verify each one
   - **Prerequisite count mismatches**: Extracted codes must equal requirement objects created
   - **Distribution inconsistencies**: Course counts per semester must match source document exactly

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
- **CRITICAL**: Use ID-Code synchronization (numeric codes → same ID, non-numeric codes → high IDs 90+)
- Validate all prerequisite references
- Include complete metadata (degree, college, sources)
- Choose appropriate progress type
- Handle missing data gracefully with `undefined`
- Correct OCR errors in course names
- **MANDATORY**: Verify all Spanish characters have proper accents (á, é, í, ó, ú, ñ) - never use � symbols
- **MANDATORY**: Remove course type suffixes like "(electiva)", "(integradora)", "(optativa)" and add proper tags
- **MANDATORY**: Extract ALL individual codes from multi-code prerequisite cells ("2-5" → both "2" AND "5")
- **MANDATORY**: Process ALL three prerequisite columns correctly (regularizada, aprobada cursar, aprobada rendir)
- Maintain proper JavaScript syntax (not JSON)

**BEFORE YOU BEGIN**: Re-read the MANDATORY SYSTEMATIC PROCESS section above. You MUST follow each step.

**FINAL REMINDER**:
- ✅ Extract complete data (no truncated responses)
- ✅ Process tables row-by-row systematically
- ✅ Verify ALL prerequisites for ALL courses
- ✅ Cross-validate final output against source
- ✅ Only submit after ALL validation checks pass

Process the provided document and generate the complete JavaScript object following this exact structure.
