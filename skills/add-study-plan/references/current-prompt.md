# Current Prompt Summary

Primary source: `curriculum-conversion-prompt-study-plan-data.md`

Use the current model:

- `StudyPlanData`
- `info`
- `sections`
- `items`
- `placements`
- `requirements.graduation`

Core rules:

- `id` is a stable string
- `seqId` is one unique append-only stream across courses and milestones; never renumber
- alphanumeric `id` values are valid
- use `place.year(...)` for classic yearly plans
- use multiple placements for multi-placement items
- use `select.items`, `select.tag`, `select.section`, `select.sections`, `select.all`
- use `req.item`, `req.all`, `req.any`, `req.count`, `req.countOf`, `req.percent`, `req.sum`, `req.every`
- use the same expression AST in graduation; root `sum` blocks require explicit `weight`
- use weekly hours
- use semantic tags only when they matter for rules or graduation
- verify the local app renders headings, sections, and view toggle correctly

Prerequisite mapping:

- unstructured correlatives -> `taken` for enroll, `passed` for complete
- 3-column tables:
  - cursada/regularizada -> enroll + taken
  - aprobada para cursar -> enroll + passed
  - aprobada para rendir -> complete + passed

Always register the new plan in `src/routes/[slug]/data/all-study-plans.ts`.

Run `bun run registry:seq` and then `bun run check` after editing.
