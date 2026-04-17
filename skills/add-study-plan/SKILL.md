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
6. If this is the first plan for the university, add logo assets using `references/logo-workflow.md`.
7. Run `bun run check`.
8. Verify the generated plan against the official source using `references/source-verification.md`.
9. Finish with a brief QA report using `references/final-report.md`.

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
- Use weekly hours, not total hours.
- Allow stable alphanumeric item IDs when the official code is alphanumeric.
- Keep names, codes, accents, and official terminology faithful to the source.
- Ask the user only when the missing data would make the plan wrong.

## Validation

Always check:

- all items from the curriculum are present
- no duplicate `id`
- no duplicate `seqId`
- placements match the source
- prerequisites were mapped correctly
- graduation requirements match the source
- the plan is registered in `all-study-plans.ts`
- `bun run check` passes
- local app output matches the official source for a representative manual pass
- the local app shows the expected title, section headings, term headings, and view toggle

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

Use the browser-based checklist in `references/source-verification.md`.

## Notes

- When the university is new to the app, the skill must also add logo assets for homepage and Open Graph.
- End every successful conversion with a short QA summary including tested URLs, representative checks, and any remaining uncertainty.
