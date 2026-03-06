# Architecture

## Routes

- `+page.svelte` — Landing page
- `[slug]/` — Dynamic pages per degree program
- `[slug]/data/` — Data files per university/degree
- `[slug]/diagram/` — Visual diagram components

## Data Flow

1. Route loads based on slug parameter in `+page.ts`
2. Degree-specific data file imported from `src/routes/[slug]/data/*.ts`
3. Course states decoded from URL parameters
4. Components render interactive progression
5. State changes update URL for sharing

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

| File                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `course-state.ts`    | Course states (pending, in-progress, passed) |
| `degree-progress.ts` | Degree completion calculations               |
| `grade-encoding.ts`  | Grade encoding/decoding for URL              |
| `raw-course.ts`      | Course data types                            |
| `course.svelte.ts`   | Course reactive state with runes             |
| `year.svelte.ts`     | Year-level reactive state                    |

## State Management

- URL-based state via query params (persistence + sharing)
- URL encoding uses base64url for compactness
- Pure functions for calculations, runes for reactivity
