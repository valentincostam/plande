# e2e - End-to-End Tests

## Stack
- Playwright
- Custom fixtures in `fixtures.ts`
- Helper functions in `helpers/study-plan.ts`

## Commands
| Command | Description |
|---------|-------------|
| `bunx playwright test` | Run all tests |
| `bunx playwright test [file]` | Run specific test file |
| `bunx playwright test --ui` | Interactive UI mode |
| `bunx playwright test --debug` | Debug mode |

---

## Testing Philosophy

> "The more your tests resemble the way your software is used, the more confidence they can give you." — Kent C. Dodds

### Core Rules

1. **Test like a user, not a developer**
   - Use `getByRole`, `getByLabel`, `getByText`
   - Never use ID, CSS class, or `data-testid` selectors

2. **Verify what's visible, not implementation**
   ```typescript
   // ❌ Bad: internal value
   await expect(select).toHaveValue('taken');

   // ✅ Good: text the user sees
   await expect(select.getByRole('option', { selected: true })).toHaveText('Regular');
   ```

3. **Use semantic assertions**
   ```typescript
   // ❌ Verifies attribute
   await expect(option).not.toHaveAttribute('disabled', '');

   // ✅ Verifies state
   await expect(option).toBeEnabled();
   ```

4. **If it's not accessible, it's not testable**
   - If a test needs an ugly selector, improve component accessibility
   - Add `aria-label`, `aria-expanded`, `aria-controls`, etc.

5. **Real interactions**
   ```typescript
   await select.click();
   await select.selectOption({ label: 'Regular' });
   ```

6. **Avoid hardcoded timeouts**
   - Trust Playwright's auto-retry (5s default)
   - Use `waitUntil: 'networkidle'` for initial navigation

7. **Exact match for similar names**
   ```typescript
   // Prevents "AM I" from matching "AM II"
   page.getByRole('combobox', { name: '...', exact: true });
   ```

8. **Scope locators instead of `.first()`**
   ```typescript
   // ❌ Uses .first() because multiple matches
   page.getByRole('combobox', { name: '...' }).first();

   // ✅ Scope to specific context
   const year1 = studyPlan.getYearSection(1);
   year1.getByRole('combobox', { name: '...' });
   ```

9. **Verify preconditions, not just results**
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
| Method | Description |
|--------|-------------|
| `goto(slug?)` | Navigate to degree page |
| `getCourseSelect(name)` | Get course state dropdown |
| `getCourseButton(name)` | Get course expand button |
| `setCourseState(name, state)` | Set course state |
| `getYearSection(year)` | Get year section locator |
| `getYearBulkSelect(year)` | Get year bulk select |
| `setYearState(year, state)` | Set all courses in year |

---

## Learnings

### Testing Patterns
<!-- What works well -->

### Selectors
<!-- Problematic or useful selectors -->

### Fixtures
<!-- How to use fixtures effectively -->

### Debugging
<!-- Debugging tips -->

---
*Last updated: 2024-12-28*
