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
- `seqId` is unique and append-only
- alphanumeric `id` values are valid
- use `place.year(...)` for classic yearly plans
- use multiple placements for multi-placement items
- use `req.item`, `req.all`, `req.any`, `req.count`, `req.percent`, `req.sum`
- use `grad.allMandatory`, `grad.countTag`, `grad.sumTag`
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

Run `bun run check` after editing.
