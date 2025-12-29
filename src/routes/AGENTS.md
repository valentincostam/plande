# src/routes - UI & Pages

## Structure

- `+page.svelte` - Landing page
- `[slug]/` - Dynamic pages per degree program
- `[slug]/data/` - Data files per university/degree
- `[slug]/diagram/` - Visual diagram components

## Key Components in [slug]/

| Component                  | Purpose                   |
| -------------------------- | ------------------------- |
| `course.svelte`            | Individual course card    |
| `year.svelte`              | Year section with courses |
| `term.svelte`              | Term grouping             |
| `stats.svelte`             | Progress statistics       |
| `state-select.svelte`      | Course state dropdown     |
| `bulk-state-select.svelte` | Bulk state change         |

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

### Accessibility

- **`role="progressbar"` requires `aria-label`** (2025-12-28): Without accessible name, axe-core reports "serious" violation

  ```svelte
  <!-- ❌ Missing accessible name -->
  <div role="progressbar" aria-valuenow={50}>

  <!-- ✅ With label -->
  <div role="progressbar" aria-valuenow={50} aria-label="Avance de carrera">
  ```

  - File: `donut.svelte`

- **Use `<section>` + `<h3>` for titled sections** (2025-12-28): Better than `<div>` with text - enables heading navigation and `getByRole('region')`

  ```svelte
  <!-- ❌ No semantics -->
  <div>
    <div>Materias aprobadas por año</div>
    <ul>...</ul>
  </div>

  <!-- ✅ Semantic structure -->
  <section aria-labelledby="yearly-progress-heading">
    <h3 id="yearly-progress-heading">Materias aprobadas por año</h3>
    <ul>...</ul>
  </section>
  ```

  - File: `yearly-course-progress.svelte`

### UX/UI

<!-- Interface decisions -->

---

_Last updated: 2025-12-28_
