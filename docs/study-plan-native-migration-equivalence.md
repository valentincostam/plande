# Study Plan Native Migration Equivalence Strategy

## Goal

When migrating a plan from the previous schema to a native `StudyPlanData` file, verify that no academic meaning was lost.

Status: this migration strategy was fully executed. All plans now live as native `StudyPlanData` files and the old adapter path was removed.

This document complements:

- `study-plan-master-plan.md`
- `docs/study-plan-compatibility-harness.md`

Those documents define migration and compatibility at a high level. This one captures the concrete strategy that was used to prove a native file stayed faithful to the previous source.

## Principle

Do not trust manual conversion or visual inspection alone.

For every migrated native plan, compare three layers:

1. **Previous source**
2. **Automatically converted plan**
3. **Native authored plan**

The native file is acceptable only if:

- it is structurally equivalent to the automatically converted version for all previously supported semantics;
- it is behaviorally equivalent in browser to the current app behavior.

## Required equivalence layers

### 1. Structural equivalence

Compare:

- automatically converted output
- native file

Verify at minimum:

- `info`
- `sections`
- all item identities (`id`, `seqId`, `code`, `name`, `kind`, `type`)
- `placements`
- `tags`
- `requirements.enroll`
- `requirements.complete`
- `requirements.graduation`

This is the fastest way to detect:

- missing items
- wrong sections
- wrong years/terms after placement mapping
- lost prerequisites
- wrong prerequisite state (`taken` vs `passed`)
- wrong graduation requirements

Implementation used during migration:

- `src/lib/study-plan-native-equivalence.ts`
- `src/lib/study-plan-native-equivalence.test.ts`

## 2. Browser compatibility equivalence

Compare observable UI behavior between:

- previous runtime
- final runtime

for the same plan and the same state scenario.

Verify at minimum:

- visible course states
- blocked/unblocked state
- stats
- available courses
- priority section
- URL state encoding

Implementation:

- `e2e/engine-compatibility.spec.ts`

## 3. Existing UX regression guardrail

All pre-existing Playwright E2E tests must continue to pass unchanged.

This ensures the migration preserves current UX and behavior without rewriting tests to fit the new engine.

## Migration workflow for each native plan

1. Start from the previous plan representation.
2. Generate the automatically converted structure.
3. Author the native file.
4. Run structural equivalence test.
5. Run browser compatibility test.
6. Run relevant existing E2E tests.
7. Only then accept the native migration.

## What counts as a blocker

Any of these should block the migration:

- missing item
- changed `seqId`
- wrong placement
- missing or changed prerequisite
- changed graduation requirement
- different blocked/unblocked behavior in browser
- different available courses in browser
- existing E2E regression

## Recommended rollout order

Migrate native plans in this order:

1. small mandatory-only plan
2. small plan with elective count
3. plan with elective hours
4. plan with `crossYear`
5. plans with more unusual prerequisite structures

This keeps debugging simple and lets the equivalence process mature before harder plans.

## Final status

The rollout order was completed:

1. mandatory-only
2. elective-count
3. elective-hours
4. cross-year
5. remaining plans

The application now runs only on native `StudyPlanData` files.
