# src/lib - Core Logic

## Purpose
Reusable logic: data models, state encoding, degree progress calculations.

## Key Files
| File | Purpose |
|------|---------|
| `course-state.ts` | Course states (pending, in-progress, passed) |
| `degree-progress.ts` | Degree completion calculations |
| `grade-encoding.ts` | Grade encoding/decoding for URL |
| `raw-course.ts` | Course data types |
| `course.svelte.ts` | Course reactive state with runes |
| `year.svelte.ts` | Year-level reactive state |

## Patterns
- State uses Svelte 5 runes (`$state`, `$derived`)
- URL encoding uses base64url for compactness
- Pure functions for calculations, runes for reactivity

---

## Learnings

### State Patterns
<!-- How the state system works -->

### URL Encoding
<!-- Learnings about state serialization -->

### Testing
<!-- Testing patterns for core logic -->

---
*Last updated: 2024-12-28*
