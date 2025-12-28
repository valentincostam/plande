# PlanDe - Agent Instructions

## Project Overview
Academic degree planning tool that displays programs and course progression for multiple Argentine universities. Built with SvelteKit 5 + TypeScript + TailwindCSS 4.

## Fundamental Rules
- **Always use bun**: Use `bun` instead of `npm`, `bunx` instead of `npx`
- **Svelte 5 Runes**: Use `$state`, `$derived`, `$effect` (not legacy stores)
- **Strict TypeScript**: No `any`, explicit types required

## Common Commands
| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run check` | Type checking with svelte-check |
| `bun run lint` | Run Prettier and ESLint |
| `bun run format` | Format code with Prettier |
| `bun run build` | Create production build |
| `bunx playwright test` | Run E2E tests |
| `bunx vitest` | Run unit tests |

## Architecture
- **Dynamic routes**: `[slug]` serves different academic programs
- **Degree data**: `src/routes/[slug]/data/*.ts` contains degree definitions
- **URL-based state**: Query params for persistence and sharing
- **Core components**: `src/lib/` for reusable logic

## Data Flow
1. Route loads based on slug parameter in `+page.ts`
2. Degree-specific data file is imported
3. Course states decoded from URL parameters
4. Components render interactive progression
5. State changes update URL for sharing

## Key Technologies
- **Svelte 5**: Runes system (`$state`, `$derived`, `$effect`)
- **SvelteKit**: File-based routing
- **TailwindCSS 4**: Utility-first CSS
- **TypeScript**: Full type safety
- **Playwright**: E2E testing

---

## Project Learnings

### Architecture
<!-- Important design decisions -->

### Bugs & Solutions
<!-- Problems found and how they were resolved -->

### Established Patterns
<!-- Project-specific conventions -->

### Performance
<!-- Performance-related learnings -->

---
*Last updated: 2024-12-28*
