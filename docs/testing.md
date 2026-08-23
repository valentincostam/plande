# Testing

Playwright E2E tests.

## Commands

| Command                        | Description            |
| ------------------------------ | ---------------------- |
| `bunx playwright test`         | Run all tests          |
| `bunx playwright test [file]`  | Run specific test file |
| `bunx playwright test --ui`    | Interactive UI mode    |
| `bunx playwright test --debug` | Debug mode             |

## Testing Philosophy

> "The more your tests resemble the way your software is used, the more confidence they can give you." — Kent C. Dodds

## Core Rules

1. **Write tests in English**

2. **Test like a user** — Use `getByRole`, `getByLabel`, `getByText`. Never ID, CSS class, or `data-testid`.

3. **Verify what's visible, not implementation:**

   ```typescript
   // Bad
   await expect(stateButton).toHaveAttribute('data-state', 'taken');

   // Good
   await expect(stateButton).toHaveAccessibleName('Estado de Álgebra: Regular');
   ```

4. **Semantic assertions:**

   ```typescript
   // Bad
   await expect(option).not.toHaveAttribute('disabled', '');

   // Good
   await expect(option).toBeEnabled();
   ```

5. **If it's not accessible, it's not testable** — Add `aria-label`, `aria-expanded`, etc.

6. **Avoid hardcoded timeouts** — Trust Playwright's auto-retry (5s default).

7. **Exact match for similar names:**

   ```typescript
   page.getByRole('button', {
   	name: 'Estado de Álgebra y Geometría Analítica: Regular',
   	exact: true
   });
   ```

8. **Scope locators instead of .first():**

   ```typescript
   // Bad
   page.getByRole('button', { name: /Estado de/ }).first();

   // Good
   const year1 = studyPlan.getYearSection(1);
   year1.getByRole('combobox', {
   	name: 'Cambiar estado de todas las materias de Primer cuatrimestre'
   });
   ```

## Visual Assertions

- Keep behavioral E2E focused on user tasks and observable outcomes.
- Use scoped `toHaveScreenshot` assertions for visual contracts such as colors, spacing, borders,
  typography, hover states, and responsive composition.
- Do not assert implementation mechanisms such as CSS classes, `mask-image`, animation keyframes, or
  DOM node identity.
- Use `toHaveCSS` only for user-visible behavior that screenshots cannot capture reliably, such as the
  mouse cursor.
- Disable animations and capture the smallest meaningful component to keep snapshots stable.

## Fixtures

Using Playwright Fixtures with functional approach:

- `e2e/helpers/study-plan.ts` — Pure functions receiving `page`
- `e2e/fixtures.ts` — Extends `test` with `studyPlan` fixture

```typescript
import { test, expect } from './fixtures';

test('example', async ({ studyPlan }) => {
	await studyPlan.goto();
	await studyPlan.setCourseState('Algebra', 'Regular');
});
```

### Available Methods

| Method                        | Description              |
| ----------------------------- | ------------------------ |
| `goto(slug?)`                 | Navigate to degree page  |
| `getCourseStateControl(name)` | Get course state control |
| `getCourseButton(name)`       | Get course expand button |
| `getCycleStateButtonToggle()` | Get cycle mode toggle    |
| `setCourseState(name, state)` | Set course state         |
| `getYearSection(year)`        | Get year section locator |
| `getYearBulkSelect(year)`     | Get year bulk select     |
| `setYearState(year, state)`   | Set all courses in year  |

Course state controls use `combobox` by default and `button` when cycle mode is enabled. Bulk state controls still use `combobox`.

## Selectors

**Prefer getByRole + filter:**

```typescript
// Bad
page.locator('li', { has: page.getByText(label) });

// Good
page.getByRole('listitem').filter({ hasText: /^Label/ });
```

**Use regex with ^ to anchor:**

```typescript
// Bad - needs .first()
getStatByLabel('Materias aprobadas').first();

// Good - matches only exact stat
getStatByLabel(/^Materias aprobadas/);
```

**getByRole('region') for sections:**

```typescript
page.getByRole('region', { name: 'Materias aprobadas por ano' });
```

## Debugging

**Handle window.confirm:**

```typescript
page.on('dialog', (dialog) => dialog.accept());
await resetButton.click();
```

**Vite error overlay flakiness:** If test fails with "vite-error-overlay intercepts pointer events", likely runtime error in component. Check console.
