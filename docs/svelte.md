# Svelte Conventions

## Runes (Svelte 5)

Use runes, not old store-based patterns:

- `$state` — reactive state
- `$derived` — computed values
- `$effect` — side effects

## Components

**When to extract to separate file:**

- &gt; 50 lines of logic + template
- Has own `$derived` computations
- Potentially reusable

**Keep inline when:**

- &lt;30 lines, template-only
- Just renders props
- Page-specific

**Section component** (`section.svelte`):

```svelte
<Section id="estadisticas" title="Estadisticas" description="...">
	<!-- content -->
</Section>
```

Provides: h2 heading, aria-labelledby, anchor link with copy-to-clipboard.

## Accessibility

**Heading hierarchy:**

```
h1: Page title
  h2: 1 Ano, 2 Ano...
  h2: Estadisticas
  h2: Configuracion
```

**progressbar requires aria-label:**

```svelte
<!-- Bad -->
<div role="progressbar" aria-valuenow={50}>

<!-- Good -->
<div role="progressbar" aria-valuenow={50} aria-label="Avance de carrera">
```

**Use section with heading:**

```svelte
<!-- Bad -->
<div>
	<div>Materias aprobadas por ano</div>
	<ul>...</ul>
</div>

<!-- Good -->
<section aria-labelledby="yearly-progress-heading">
	<h2 id="yearly-progress-heading">Materias aprobadas por ano</h2>
	<ul>...</ul>
</section>
```

## UX Patterns

**Mobile-first**: Avoid hover-only interactions. Mobile users can't trigger hover states. Make interactive elements visible by default.

**Copy-to-clipboard feedback:**

1. Change icon (link → check)
2. Show text confirmation ("Copiado")
3. Auto-reset after ~2 seconds
