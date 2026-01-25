# Learnings

Project-specific patterns, bugs, and solutions.

## Patterns

- **Mobile-first design** (2025-01-04): Avoid hover-only interactions. Mobile users can't trigger hover states. Make interactive elements visible by default.
  - Example: Anchor link icons should be always visible, not `opacity-0 group-hover:opacity-100`

- **Section component** (2025-01-04): Use `Section.svelte` for page sections. Provides h2, aria-labelledby, anchor link with copy-to-clipboard feedback.

- **When to extract components** (2025-01-04): >50 lines or has own `$derived` → extract. <30 lines template-only → keep inline.

## Testing Patterns

- **Regex anchor for unique matches** (2025-12-28): Use `/^Materias aprobadas/` instead of `'Materias aprobadas'` to avoid matching "Materias electivas aprobadas".

- **Unify split assertions** (2025-12-28): `toContainText('0 de 46')` instead of separate `toContainText('0')` and `toContainText('de 46')`.

- **Test user actions, not navigation** (2025-12-28): Don't navigate twice to verify changes — perform the action that causes the change.

## Bugs & Solutions

- **Vite error overlay** (2025-12-28): If test fails with "vite-error-overlay intercepts pointer events", it's a runtime error in component, not test issue.

## Accessibility

- **progressbar needs aria-label** (2025-12-28): Without it, axe-core reports "serious" violation. File: `donut.svelte`

- **Heading hierarchy** (2025-01-04): All main sections use h2. Years, Estadisticas, Configuracion all at same level under h1 page title.
