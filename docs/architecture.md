# Architecture

Plande renders immutable curriculum definitions plus a reactive user session. The native model is the only runtime model; there is no legacy adapter.

## Loading

- `src/routes/+page.server.ts`, `api/home`, sitemap and `llms.txt` use `study-plan-catalog.ts`, which contains metadata only.
- `src/routes/[slug]/+page.server.ts` resolves aliases and dynamically imports one plan through `study-plan-loaders.ts`.
- Plan payloads stay out of client chunks until their route is requested.
- `all-study-plans.ts` exists for server tooling, validation and generation only.
- `bun run registry:seq` regenerates catalog, dynamic loaders and the append-only `seqId` registry after a plan is added.

## Native data model

`StudyPlanData` contains:

- `info`: degree and source metadata.
- `sections`: visual/semantic groups; `year` is explicit or derived from `year-N`.
- `items`: courses and milestones. Each has stable `id`, append-only `seqId`, placements and optional enrollment/completion requirements.
- `requirements.graduation`: labeled requirement expressions with optional weight.

One item may have multiple placements. Placements never duplicate identity, state, statistics or diagram nodes.

Requirements are a recursive AST: `item`, `all`, `any`, `count`, `countOf`, `percent` and `sum`. Selectors address explicit items, tags, one section, multiple sections or all courses. `preparePlan` validates references, numeric bounds, placements, selector structure, `seqId` stability, required sum metrics/weights and satisfiability.

## Engine

`preparePlan` builds indexed immutable definitions and dependency edges. `PlanSession` owns reactive states and grades.

`evaluateProgress(expr, context)` is the single evaluator. It returns completed units, total units and satisfaction. Enrollment gates, completion gates, graduation, UI trees, exports and Open Graph progress all use it. `evaluateRequirement` is its boolean wrapper.

User-visible requirement wording stays in recursive Svelte components, not in engine files.

## State and compatibility

URL query `s=` is one run-length encoded stream ordered by `seqId` across courses and milestones. `n=` uses the same positions for grades; milestone grade slots remain empty. This preserves production URLs because migrated `seqId`s match their original course-array indexes.

The same unified stream backs URL sharing, local storage, undo/redo and reset. Existing `seqId`s must never change; new items use `max(seqId) + 1`. `seq-id-registry.json` enforces this in tests.

## Reactive view

`buildStudyPlanView` creates section, term, anchor, dependent and requirement-tree identities once per page load. Reactive getters expose leaf state and progress without rebuilding the tree. Selector contexts are cached and read current session state through getters.

Eligibility recalculates from the current requirements, but it never rewrites recorded item states or grades. `PlanItemState.setState` enforces strict requirements for new actions. URL and local-storage restoration assign the recorded stream directly, so a later plan correction cannot erase academic history.

## Rendering and outputs

- List mode recursively renders the full requirement AST and placed milestones.
- Diagram mode uses deduplicated course identities and enrollment dependency edges.
- Priority/dependent lists intentionally count enrollment dependencies only.
- `GET /[slug].json` returns native `StudyPlanData`.
- Markdown/plain-text formatters traverse native requirements, including milestones and quantitative rules.
- Open Graph and the page share the same graduation snapshot calculation.
