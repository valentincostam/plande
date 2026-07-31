---
name: add-study-plan
description: Convert one or more curriculum sources into a new Plande study plan and add it to the app. Use when the user provides PDFs, images, screenshots, or HTML pages for a curriculum and wants Codex to parse them, build a `StudyPlanData` file under `src/routes/[slug]/data`, register it in `all-study-plans.ts`, add university logo assets if this is the first plan from that university, and run repo validation.
---

# Add Study Plan

Convert source documents into a new `StudyPlanData` plan file and wire it into Plande.

## Workflow

1. Read the provided curriculum sources fully.
2. Use the current prompt rules from `references/current-prompt.md`.
3. Extract plan metadata, sections, items, placements, prerequisites, and graduation rules.
4. Create `src/routes/[slug]/data/{slug}.ts`.
5. Register the plan in `src/routes/[slug]/data/all-study-plans.ts`.
6. Run `bun run registry:seq` to regenerate the append-only registry, lightweight catalog and dynamic loaders.
7. If this is the first plan for the university, add logo assets using `references/logo-workflow.md`.
8. Run `bun run check`.
9. Verify the generated plan against the official source using `references/source-verification.md`.
10. Finish with a brief QA report using `references/final-report.md`.

If the user asks only for extraction, stop before editing the repo and return the TypeScript contents.

## Prompt Choice

Use `curriculum-conversion-prompt-study-plan-data.md`.

It is the current and only prompt that should drive authoring for the live model.

## Conversion Rules

- Produce `StudyPlanData`, not the old schema.
- Prefer minimal correct modeling.
- Use one canonical item per academic entity.
- Use multiple placements instead of duplicated items.
- Use semantic requirements when the source is group-based.
- Use `select.all`/`select.sections`, `req.every` and `req.countOf` when they match the official rule.
- Graduation uses the same recursive expression model; a root `sum` requires explicit `weight`.
- `seqId` is one append-only stream across courses and milestones. Never renumber or reuse an existing value; append from the current maximum.
- Use weekly hours, not total hours.
- Allow stable alphanumeric item IDs when the official code is alphanumeric.
- Keep names, codes, accents, and official terminology faithful to the source.
- Ask the user only when the missing data would make the plan wrong.

### Grouped Optatives And Electives

- When the source defines distinct graduation buckets like `Optativa I`, `Optativa II`, `idioma latino`, `idioma germánico`, orientation groups, areas, or named optional tracks, model each bucket as its own `graduation` requirement block.
- Prefer `graduation: [{ type: 'count', ... }]` with one block per bucket over a single pooled elective count when the source requires `N from bucket A` and `M from bucket B`.
- Prefer `selector: { type: 'tag', tag: '...' }` for these grouped rules. Use `selector.items` only when the source defines a one-off explicit set with no reusable semantic group.
- Tag each eligible course with a specific semantic tag for its bucket, such as `optativa-i`, `optativa-ii`, `idioma-latino`, or `idioma-germanico`.
- Keep bucket tag IDs stable, kebab-case, and singular. They are model identifiers, not user-facing copy.
- Treat user-facing copy separately from model tags: the tag ID can be semantic and stable, while `graduation.label` and visible UI labels must follow the official plan wording.
- If the same course belongs to the general optional pool and also to a specific graduation bucket, keep both: the course `type` should stay `optative` or `elective`, and the item should also carry the specific bucket tag.
- If the source exposes optional courses in their own list or catalog instead of a numbered year, create a dedicated section for them rather than forcing them into a year section.
- Preserve official bucket names in `graduation.label` because the UI will surface those labels directly.
- When the source says a grouped rule is capped, like `approve 1 Latin language`, do not model it as a pooled count that could over-credit multiple passes from the same bucket.
- If a course truly satisfies multiple official buckets, encode all supported memberships explicitly. If the source is ambiguous about bucket membership, stop and verify before authoring.

## Validation

Always check:

- all items from the curriculum are present
- no duplicate `id`
- no duplicate `seqId`
- placements match the source
- prerequisites were mapped correctly
- graduation requirements match the source
- the plan is registered in `all-study-plans.ts`
- `bun run registry:seq` was run and the registry, catalog and loader changes are committed
- `bun run check` passes
- local app output matches the official source for a representative manual pass
- the local app shows the expected title, section headings, term headings, and view toggle
- grouped graduation requirements are represented by separate requirement blocks when the source distinguishes named buckets
- optional-course buckets use stable semantic tags and those tags match the intended requirement selectors
- plans with grouped optatives/electives do not over-count progress when multiple passed courses belong to the same capped bucket
- special optional-course catalogs show the expected section, badges, and grouped stat labels in local UI

## Source Verification

Do not stop at code generation.

After adding the plan, open:

- the local app page for the new slug
- the official source document/page/images

Then verify, at minimum:

- plan title, university, faculty, year
- section structure and order
- course names, codes, and hours
- placement of courses by year/term/section
- prerequisite text and blocked/unblocked behavior for representative courses
- graduation rule text and progress semantics
- special cases from the source: transversal sections, optatives, electives, multi-placement, milestones, or grouped rules
- when grouped optional buckets exist, verify one representative course from each bucket appears in the right section and carries the right semantic grouping
- when grouped optional buckets exist, verify the stats UI reflects each bucket separately and caps progress correctly per bucket

Use the browser-based checklist in `references/source-verification.md`.

## Notes

- When the university is new to the app, the skill must also add logo assets for homepage and Open Graph.
- End every successful conversion with a short QA summary including tested URLs, representative checks, and any remaining uncertainty.
