# Study Plan Compatibility Harness

## Goal

Verify that a plan converted to `StudyPlanData` behaves the same for all previously supported cases before replacing the old runtime.

Status: this harness served as the migration gate. The replacement is complete and native `StudyPlanData` is now the only runtime path.

## Comparison principle

Do not trust only the conversion script.

Compare observable behavior between:

- previous runtime
- final runtime

for the same plan and the same user state scenarios.

## Snapshot contract

For each plan/scenario, capture:

- per-item state
- per-item `isEnabled`
- per-item `canPass`
- direct dependents
- total dependents
- available items
- progress percentage
- encoded URL state

This was implemented with comparison snapshots during migration and is kept here as process documentation.

## Minimum scenario matrix per plan

### Baseline

1. Empty state
2. First course regularized
3. First course approved
4. First academic block approved

### Dependency stress

5. A direct prerequisite removed after enabling a dependent
6. A chain case (A -> B -> C)
7. A completion-only requirement case

### Plan-specific

8. Elective hours/count case
9. Cross-year / multi-placement case
10. Plan with mixed electives/optatives if available

### Randomized

11. N random valid-looking scenarios for each critical plan

## Critical plans

At minimum include:

- one heavily used classic year/term plan
- one plan with elective hours
- one plan with cross-year behavior
- one plan with mixed elective/optative semantics

## Pass criteria

The migration was considered safe only if:

- no diffs in previously supported behavior
- all existing E2E tests remain green
- new migration E2E tests are green
- URL state remains stable for existing plans

## Suggested test layering

### Unit

- `preparePlan()`
- `evaluateRequirement()`
- `evaluateGraduation()`
- `normalizeItemState()`
- `buildDependentEdges()`
- URL serialization by `seqId`

### Compatibility

- previous runtime vs final runtime snapshot comparison
- if these tests need real Svelte reactive runtime, run them in a browser-aware harness instead of forcing them into server-side Vitest

### E2E

- keep all existing Playwright specs passing
- add new specs for OR, count, percent, sum, milestones, cycles, multi-placement

## Final outcome

- native catalog only
- old adapter removed
- old plan files removed
- full Playwright suite green at cutover
