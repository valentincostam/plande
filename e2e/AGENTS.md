# e2e - End-to-End Tests

## Stack

- Playwright
- Custom fixtures in `fixtures.ts`
- Helper functions in `helpers/study-plan.ts`

## Commands

| Command                        | Description            |
| ------------------------------ | ---------------------- |
| `bunx playwright test`         | Run all tests          |
| `bunx playwright test [file]`  | Run specific test file |
| `bunx playwright test --ui`    | Interactive UI mode    |
| `bunx playwright test --debug` | Debug mode             |

---

## Testing Philosophy

> "The more your tests resemble the way your software is used, the more confidence they can give you." — Kent C. Dodds

### Core Rules

1. **Write tests in English** — test descriptions, variable names, and comments must be in English

2. **Test like a user, not a developer**
   - Use `getByRole`, `getByLabel`, `getByText`
   - Never use ID, CSS class, or `data-testid` selectors

3. **Verify what's visible, not implementation**

   ```typescript
   // ❌ Bad: internal value
   await expect(select).toHaveValue('taken');

   // ✅ Good: text the user sees
   await expect(select.getByRole('option', { selected: true })).toHaveText('Regular');
   ```

4. **Use semantic assertions**

   ```typescript
   // ❌ Verifies attribute
   await expect(option).not.toHaveAttribute('disabled', '');

   // ✅ Verifies state
   await expect(option).toBeEnabled();
   ```

5. **If it's not accessible, it's not testable**
   - If a test needs an ugly selector, improve component accessibility
   - Add `aria-label`, `aria-expanded`, `aria-controls`, etc.

6. **Real interactions**

   ```typescript
   await select.click();
   await select.selectOption({ label: 'Regular' });
   ```

7. **Avoid hardcoded timeouts**
   - Trust Playwright's auto-retry (5s default)
   - Use `waitUntil: 'networkidle'` for initial navigation

8. **Exact match for similar names**

   ```typescript
   // Prevents "AM I" from matching "AM II"
   page.getByRole('combobox', { name: '...', exact: true });
   ```

9. **Scope locators instead of `.first()`**

   ```typescript
   // ❌ Uses .first() because multiple matches
   page.getByRole('combobox', { name: '...' }).first();

   // ✅ Scope to specific context
   const year1 = studyPlan.getYearSection(1);
   year1.getByRole('combobox', { name: '...' });
   ```

10. **Verify preconditions, not just results**

    ```typescript
    // ❌ Only verifies result
    await expect(termBulkSelect).toBeVisible();

    // ✅ Verify precondition that causes result
    await expect(studyPlan.getCourseSelect('Álgebra')).toBeEnabled();
    await expect(termBulkSelect).toBeVisible();
    ```

---

## Fixtures Architecture

Using [Playwright Fixtures](https://playwright.dev/docs/test-fixtures) with functional approach:

- `e2e/helpers/study-plan.ts` - Pure functions receiving `page`
- `e2e/fixtures.ts` - Extends `test` with `studyPlan` fixture

```typescript
import { test, expect } from './fixtures';

test('example', async ({ studyPlan }) => {
	await studyPlan.goto();
	await studyPlan.setCourseState('Álgebra', 'Regular');
});
```

### Available Fixture Methods

| Method                        | Description               |
| ----------------------------- | ------------------------- |
| `goto(slug?)`                 | Navigate to degree page   |
| `getCourseSelect(name)`       | Get course state dropdown |
| `getCourseButton(name)`       | Get course expand button  |
| `setCourseState(name, state)` | Set course state          |
| `getYearSection(year)`        | Get year section locator  |
| `getYearBulkSelect(year)`     | Get year bulk select      |
| `setYearState(year, state)`   | Set all courses in year   |

---

## Learnings

### Testing Patterns

- **Use regex with `^` to anchor matches** (2025-12-28): Avoids `.first()` when label text appears in multiple items

  ```typescript
  // ❌ Needs .first() - "Materias aprobadas" matches "Materias electivas aprobadas" too
  getStatByLabel('Materias aprobadas').first();

  // ✅ Anchored - matches only the exact stat
  getStatByLabel(/^Materias aprobadas/);
  ```

- **Unify split assertions** (2025-12-28): Single assertion is clearer and faster

  ```typescript
  // ❌ Split
  await expect(stat).toContainText('0');
  await expect(stat).toContainText('de 46');

  // ✅ Unified
  await expect(stat).toContainText('0 de 46');
  ```

- **Tests must reflect user actions** (2025-12-28): Don't navigate twice to see a change - perform the action that causes the change

  ```typescript
  // ❌ Navigates twice - not what user does
  await goto('plan');
  await expect(stat).toContainText('0');
  await gotoWithState('plan', 'a2');
  await expect(stat).toContainText('2');

  // ✅ User action causes change
  await goto('plan');
  await expect(stat).toContainText('0');
  await setCourseState('Álgebra', 'Aprobada');
  await expect(stat).toContainText('1');
  ```

- **Handle window.confirm dialogs** (2025-12-28): Register handler before clicking
  ```typescript
  page.on('dialog', (dialog) => dialog.accept());
  await resetButton.click();
  ```

### Selectors

- **Prefer `getByRole` + `filter` over `locator`** (2025-12-28): More user-like selector

  ```typescript
  // ❌ CSS-based
  page.locator('li', { has: page.getByText(label) });

  // ✅ Role-based
  page.getByRole('listitem').filter({ hasText: /^Label/ });
  ```

- **Use `getByRole('region')` for accessible sections** (2025-12-28): Requires `<section>` with `aria-labelledby` in component
  ```typescript
  // After adding accessibility to component
  page.getByRole('region', { name: 'Materias aprobadas por año' });
  ```

### Fixtures

- **Remove unused `page` from test signatures** (2025-12-28): Only destructure what you use

  ```typescript
  // ❌ page not used
  test('...', async ({ studyPlan, page }) => {

  // ✅ Clean
  test('...', async ({ studyPlan }) => {
  ```

### Debugging

- **Vite error overlay can cause flaky tests** (2025-12-28): If test fails with "vite-error-overlay intercepts pointer events", likely a runtime error in component. Check console, retry test to confirm flakiness.

---

_Last updated: 2025-12-28_
