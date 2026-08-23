# Architecture

## Routes

- `+page.svelte` — Landing page and recent study plans
- `[slug]/` — Dynamic pages per degree program
- `[slug]/data/` — Data files per university/degree
- `[slug]/diagram/` — Visual diagram components

## Data Flow

1. Route loads based on slug parameter in `+page.ts`
2. Degree-specific data file imported from `src/routes/[slug]/data/*.ts`
3. Course states decoded from URL parameters
4. URL and device progress are compared before either can replace the other
5. Components render interactive progression
6. State changes update URL and, outside shared-link mode, local storage

## Key Components

| Component                         | Purpose                   |
| --------------------------------- | ------------------------- |
| `[slug]/course.svelte`            | Individual course card    |
| `[slug]/year.svelte`              | Year section              |
| `[slug]/term.svelte`              | Term grouping             |
| `[slug]/section.svelte`           | Reusable section + h2     |
| `[slug]/stats.svelte`             | Progress statistics       |
| `[slug]/state-select.svelte`      | Course state cycle button |
| `[slug]/bulk-state-select.svelte` | Bulk state change         |

## Core Logic (src/lib/)

| File                   | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `course-state.ts`      | Course states (pending, in-progress, passed) |
| `degree-progress.ts`   | Degree completion calculations               |
| `grade-encoding.ts`    | Grade encoding/decoding for URL              |
| `plan-memory.ts`       | Recently used study plans                    |
| `stored-study-plan.ts` | Safe local study-plan persistence            |
| `raw-course.ts`        | Course data types                            |
| `course.svelte.ts`     | Course reactive state with runes             |
| `year.svelte.ts`       | Year-level reactive state                    |

## State Management

- URL-based state via compact query params for sharing
- Per-plan progress persists in local storage after meaningful use
- The home shows a collapsible bottom sheet with up to three plans inferred from meaningful progress changes
- Users can remove an individual recent plan without deleting its saved progress
- The recent-plans panel and centered capsule are separate surfaces that alternate with slide transitions
- Each bottom panel remembers its expanded/collapsed preference independently and reads it before rendering
- Each recent plan summarizes its degree progress and raw course-state distribution
- The page reserves the measured sheet height so the footer remains fully reachable while it is open
- `/` always opens the home and plan headers link back to it
- URL progress is adopted automatically when the device has no saved progress, without marking the plan as recent until the user edits it
- Shared URL progress remains temporary only when it differs from existing local progress
- Only shared/local conflicts use the collapsible comparison panel; the page reserves its measured height so the footer remains reachable
- Strict mode belongs to the progress snapshot; display preferences do not create conflicts
- Pure functions for calculations, runes for reactivity
