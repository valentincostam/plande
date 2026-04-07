# Manual QA Guide: Study Plan Regression

## Goal

Compare local development vs production and verify that:

- the same study plans load
- prerequisites behave the same
- graduation progress behaves the same
- sections, placements, and duplicated items render the same
- the visible UX remains unchanged

## Recommended Setup

Use two windows side by side:

- local: `http://localhost:5173/{slug}`
- production: `https://plande.app/{slug}`

For every scenario:

1. start from empty state
2. apply the same course-state changes in both
3. compare the resulting UI
4. copy the URL from one side to the other and verify exact equivalence

## Global Checks For Every Plan

- same sections and section order
- same course count per section
- same names, codes, and hours
- same blocked/unblocked courses at initial state
- same prerequisite text in course details
- same dependent list in course details
- same `Qué podés cursar`
- same `Orden de prioridad sugerido`
- same stats and charts
- same URL state after changes
- same state after reload
- same behavior in list and diagram view
- same behavior for `Modo estricto`, `Mostrar códigos`, reset, and bulk state actions

## Canonical Matrix

Use this set first. It covers the main plan semantics currently present in the catalog.

| Slug                 | Why It Matters                                                     | Scenarios                                                                                                                        | Focus                                                                          |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `issd-tscdia`        | baseline plan, only mandatory graduation                           | empty; all year 1 passed; lower one prerequisite after unlocking later courses                                                   | basic blocking, cascade reset, stats without electives                         |
| `unca-fca-tupazsa`   | graduation by elective count                                       | empty; pass all mandatory except `Electiva`; pass `Electiva`                                                                     | elective count must change by subject count, not hours                         |
| `utn-frcu-isi-2023`  | graduation by elective hours                                       | empty; pass one elective like `Metodología de la Investigación`; inspect `Proyecto Final` and `Práctica Profesional Supervisada` | elective hours, advanced prerequisite text, final-stage behavior               |
| `utn-frcu-ic-2023`   | cross-year / multi-placement                                       | empty; change `Proyecto Final`; pass `Geología Aplicada`                                                                         | duplicated item in 5th and 6th year must share one state and not double-count  |
| `unlp-fahce-pm-2003` | elective count + special elective section + transversal optatives  | empty; pass `Francés`; pass `Complementos de Análisis`                                                                           | `Materias Electivas` section, count-based progress, mixed optatives            |
| `unlam-diit-ii-2023` | transversal section + mandatory transversal + optative + electives | empty; pass `Inglés Nivel I`; inspect `Taller de Integración` and `Lenguaje Orientado a Negocios`                                | `Materias Transversales`, mixed course types, visibility in available/priority |

## Extended Matrix

Use these if you want more confidence on elective-heavy catalogs.

| Slug               | Why It Matters                                                  | Scenarios                                             | Focus                                                         |
| ------------------ | --------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| `utn-frba-iq-1995` | many elective/transversal courses, graduation by elective hours | empty; pass two electives; inspect elective section   | large elective catalog, hours accumulation, section stability |
| `ucu-fau-arq-2007` | count-based progress with optatives                             | empty; pass `Computación Gráfica III`; lower it again | optative counting, regression on progress reversal            |
| `unsa-fce-lf-2005` | larger optative catalog                                         | empty; pass one optative; pass several optatives      | count-based graduation across many options                    |

## Detailed Scenario Notes

### `issd-tscdia`

Check:

- year 2 remains blocked at empty state exactly as in production
- after passing all year 1, year 2 unlocks the same way
- lowering one key prerequisite re-blocks the same downstream courses

### `unca-fca-tupazsa`

Check:

- graduation shows `0/1` elective at empty state
- passing mandatory courses alone does not complete graduation
- passing `Electiva` increments graduation exactly once

### `utn-frcu-isi-2023`

Check:

- graduation shows `0/40` elective hours at empty state
- passing one elective increases hours by the same amount in both environments
- `Proyecto Final` shows the same prerequisites and same blocked state
- `Práctica Profesional Supervisada` shows the same prerequisites and same blocked state

Suggested courses:

- `Metodología de la Investigación`
- `Proyecto Final`
- `Práctica Profesional Supervisada`
- `Sintaxis y Semántica de los Lenguajes`
- `Ingeniería y Calidad de Software`

### `utn-frcu-ic-2023`

Check:

- `Proyecto Final` appears in both 5th and 6th year
- changing state in one placement updates the other placement immediately
- stats do not double-count `Proyecto Final`
- course details are consistent from both placements
- graduation shows `0/22` elective hours at empty state

Suggested courses:

- `Proyecto Final`
- `Práctica Profesional Supervisada`
- `Geología Aplicada`
- `Análisis Estructural III`

### `unlp-fahce-pm-2003`

Check:

- transversal optative section exists and matches production
- passing `Francés` increments elective count
- passing `Complementos de Análisis` also increments elective count
- both section-local and year-local elective/optative items contribute correctly

### `unlam-diit-ii-2023`

Check:

- `Materias Transversales` section exists and matches production
- `Inglés Nivel I` behaves the same in both environments
- `Taller de Integración` and `Lenguaje Orientado a Negocios` appear in the correct places
- priority and available lists include transversal items the same way

## Extra Checks Worth Doing

These catch subtle regressions that are easy to miss.

- expand the same course in both environments and compare the exact prerequisite wording
- compare one shared URL with several course states already set
- compare one near-graduation state, not only early-year states
- compare one state after disabling strict mode
- compare one state in diagram view, not only list view
- download JSON and CSV in both environments and compare the shape manually
- hit `/{slug}` with `Accept: application/json` and compare the payload shape
- verify slug redirection without year still lands on the same canonical URL with year

## Suggested Execution Order

1. `issd-tscdia`
2. `unca-fca-tupazsa`
3. `utn-frcu-isi-2023`
4. `utn-frcu-ic-2023`
5. `unlp-fahce-pm-2003`
6. `unlam-diit-ii-2023`
7. extended matrix only if you want more confidence

## Latest Manual Run

The following local-vs-production checks were run manually in browser and passed without visible differences:

- `utn-frcu-ic-2023`
  - empty state
  - verified duplicated `Proyecto Final` in 5th and 6th year
- `issd-tscdia`
  - empty state
  - stateful URL check with `?s=nan2a`
- `unca-fca-tupazsa`
  - strict mode off
  - `Electiva` approved
  - stateful URL check with `?s=n16a&r=no`
- `utn-frcu-isi-2023`
  - strict mode off
  - `Metodología de la Investigación` approved
  - `Proyecto Final` details inspected
  - stateful URL check with `?s=n22a&r=no`
- `unlam-diit-ii-2023`
  - empty state
  - transversal section checked
- `unlp-fahce-pm-2003`
  - empty state
  - transversal optative language section checked
- `ucu-fau-arq-2007`
  - empty state

No visible local-vs-production differences were found in that run.

## Smoke Test URLs

Use these to repeat a quick local-vs-production check without rebuilding scenarios by hand.

| Plan                    | Local                                                 | Production                                         | What it covers                                           |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| ISSD base/intermediate  | `http://localhost:5173/issd-tscdia?s=nan2a`           | `https://plande.app/issd-tscdia?s=nan2a`           | baseline mandatory-only, URL restore, available courses  |
| UNCA elective count     | `http://localhost:5173/unca-fca-tupazsa?s=n16a&r=no`  | `https://plande.app/unca-fca-tupazsa?s=n16a&r=no`  | elective count, strict mode off, URL restore             |
| UTN ISI intermediate    | `http://localhost:5173/utn-frcu-isi-2023?s=n22a&r=no` | `https://plande.app/utn-frcu-isi-2023?s=n22a&r=no` | elective hours, `Proyecto Final`, URL restore            |
| UTN ISI near graduation | `http://localhost:5173/utn-frcu-isi-2023?s=a34`       | `https://plande.app/utn-frcu-isi-2023?s=a34`       | late-stage stats, available courses, final-year behavior |
| UTN IC empty            | `http://localhost:5173/utn-frcu-ic-2023`              | `https://plande.app/utn-frcu-ic-2023`              | cross-year / duplicated `Proyecto Final`                 |
| UTN IC near graduation  | `http://localhost:5173/utn-frcu-ic-2023?s=a33`        | `https://plande.app/utn-frcu-ic-2023?s=a33`        | late-stage stats, elective hours, final-year behavior    |
| UNLP PM empty           | `http://localhost:5173/unlp-fahce-pm-2003`            | `https://plande.app/unlp-fahce-pm-2003`            | transversals, optative languages, special sections       |
| UNLP PM near graduation | `http://localhost:5173/unlp-fahce-pm-2003?s=a19n3a8`  | `https://plande.app/unlp-fahce-pm-2003?s=a19n3a8`  | elective count, near-graduation optatives                |
| UNLaM DIIT empty        | `http://localhost:5173/unlam-diit-ii-2023`            | `https://plande.app/unlam-diit-ii-2023`            | transversal section, mixed course types                  |
| UCU Arq empty           | `http://localhost:5173/ucu-fau-arq-2007`              | `https://plande.app/ucu-fau-arq-2007`              | optative/count-based progress baseline                   |

Suggested quick pass:

1. open the same row in local and production
2. compare `Qué podés cursar`, `Estadísticas`, and one course details panel
3. reload both pages
4. confirm the state remains identical

## Pass Criteria

Manual QA is considered good if:

- no visible difference appears for the canonical matrix
- duplicated items keep one shared state
- elective count/hours progress matches production
- transversal sections and special sections render correctly
- URLs, reload, and shared links preserve the same state
