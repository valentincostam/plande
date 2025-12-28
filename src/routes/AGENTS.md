# src/routes - UI & Pages

## Structure
- `+page.svelte` - Landing page
- `[slug]/` - Dynamic pages per degree program
- `[slug]/data/` - Data files per university/degree
- `[slug]/diagram/` - Visual diagram components

## Key Components in [slug]/
| Component | Purpose |
|-----------|---------|
| `course.svelte` | Individual course card |
| `year.svelte` | Year section with courses |
| `term.svelte` | Term grouping |
| `stats.svelte` | Progress statistics |
| `state-select.svelte` | Course state dropdown |
| `bulk-state-select.svelte` | Bulk state change |

## Patterns
- Components receive data via props
- State managed via URL params
- Use `$derived` for computed values
- Accessibility: proper ARIA attributes

---

## Learnings

### Svelte 5 Components
<!-- Component patterns with runes -->

### Reactive State
<!-- How to handle reactivity -->

### UX/UI
<!-- Interface decisions -->

---
*Last updated: 2024-12-28*
