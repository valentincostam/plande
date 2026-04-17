# Source Verification

After generating a plan, verify that the app reflects the official source.

## Goal

Check source document -> generated code -> local app behavior.

Do not rely only on `bun run check`.

## Browser Setup

Open in parallel:

- local app: `http://localhost:5173/{slug}`
- official source: PDF, image set, or HTML page

Prefer background browser tooling when possible so the session does not interrupt the user.

## What to Verify

### 1. Metadata

- degree name
- university name
- college/faculty name
- plan year/version
- slug/canonical URL

### 2. Structure

- top-level title and subtitle
- `Plande` link / header controls
- list/diagram toggle
- correct sections
- correct section order
- correct term grouping inside each section
- transversal or special sections when present in the source
- multi-placement items appear in all intended places

### 3. Item data

Spot-check at least 5 to 10 items against the source:

- exact name
- code
- hours
- type: mandatory / elective / optative
- attributes when relevant

Prioritize:

- first-year items
- items with prerequisites
- elective/optative items
- final-stage items like Proyecto Final / PPS

### 4. Prerequisites

For representative items, open the details panel in the app and compare against the source.

Prioritize:

- one early prerequisite chain
- one mid-plan chain
- one late/final item
- one grouped rule if the source has one

Check both:

- the visible prerequisite wording
- blocked/unblocked behavior after changing prerequisite states

### 5. Graduation rules

Verify the source and the app agree on:

- mandatory-only completion
- elective count
- elective hours
- grouped requirements by tag/section
- milestones if present

If the plan has electives or optatives, create at least one state where progress changes and confirm the meaning is correct.

## Recommended Manual Pass

Run these three passes:

1. empty state
2. one representative intermediate state
3. one near-graduation state

For each pass, compare:

- blocked/unblocked items
- `Qué podés cursar`
- `Orden de prioridad sugerido`
- stats / progress
- URL state after reload

## High-Signal Scenarios

Pick scenarios based on plan type:

- mandatory-only: unlock a mid-plan course and verify the cascade
- elective count: approve one elective and verify count increments once
- elective hours: approve one elective and verify hours increment correctly
- multi-placement: change the shared item state and verify all placements update
- transversal section: verify section visibility and item placement
- optatives: verify they contribute correctly to progress if required by graduation

## Pass Criteria

The generated plan is acceptable only if:

- the app matches the official source on sampled item data
- the representative prerequisite chains behave correctly
- the graduation rule semantics match the source
- no visible structural mismatch remains in the UI
