# src/routes - UI & Pages

## Structure

- `+page.svelte` - Landing page
- `[slug]/` - Dynamic pages per degree program
- `[slug]/data/` - Data files per university/degree
- `[slug]/diagram/` - Visual diagram components

## Key Components in [slug]/

| Component                  | Purpose                        |
| -------------------------- | ------------------------------ |
| `course.svelte`            | Individual course card         |
| `year.svelte`              | Year section with courses      |
| `term.svelte`              | Term grouping                  |
| `section.svelte`           | Reusable section with h2 title |
| `stats.svelte`             | Progress statistics            |
| `state-select.svelte`      | Course state dropdown          |
| `bulk-state-select.svelte` | Bulk state change              |

## Patterns

- Components receive data via props
- State managed via URL params
- Use `$derived` for computed values
- Accessibility: proper ARIA attributes

---

## Learnings

### Svelte 5 Components

- **Section component for consistent sections** (2025-01-04): Use `Section.svelte` for page sections with titles. Provides:
  - Consistent `h2` heading with `aria-labelledby`
  - Anchor link with copy-to-clipboard + hash update
  - Visual feedback ("Copiado" + check icon)
  - Optional description prop

  ```svelte
  <Section id="estadisticas" title="Estadísticas" description="...">
    <!-- content -->
  </Section>
  ```

  - File: `section.svelte`

- **When to extract components** (2025-01-04): Extract to separate file when:
  - > 50 lines of logic + template
  - Has own `$derived` computations
  - Potentially reusable

  Keep inline when:
  - <30 lines, template-only
  - Just renders props
  - Page-specific

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

- **Use `<section>` with proper heading** (2025-12-28): Better than `<div>` with text - enables heading navigation and `getByRole('region')`

  ```svelte
  <!-- ❌ No semantics -->
  <div>
    <div>Materias aprobadas por año</div>
    <ul>...</ul>
  </div>

  <!-- ✅ Semantic structure -->
  <section aria-labelledby="yearly-progress-heading">
    <h2 id="yearly-progress-heading">Materias aprobadas por año</h2>
    <ul>...</ul>
  </section>
  ```

  - File: `yearly-course-progress.svelte`

- **Heading hierarchy must be consistent** (2025-01-04): All main page sections should use same heading level. If years use `h2`, other sections (Estadísticas, Configuración, etc.) should also use `h2`, not `h3`.

  ```
  h1: Page title
    h2: 1° Año, 2° Año...
    h2: Estadísticas
    h2: Configuración
  ```

### UX/UI

- **Copy-to-clipboard feedback** (2025-01-04): When copying to clipboard, provide visual feedback:
  1. Change icon (link → check)
  2. Show text confirmation ("Copiado")
  3. Auto-reset after ~2 seconds
  - File: `section.svelte`

---

_Last updated: 2025-01-04_
