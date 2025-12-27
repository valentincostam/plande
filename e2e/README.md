# Testing Guidelines

## Filosofía

> "The more your tests resemble the way your software is used, the more confidence they can give you." — Kent C. Dodds

## Reglas

1. **Testear como usuario, no como desarrollador**
   - Usar `getByRole`, `getByLabel`, `getByText`
   - Nunca selectores por ID, clase CSS, o atributos `data-testid`

2. **Verificar lo visible, no la implementación**

   ```typescript
   // ❌ Mal: valor interno
   await expect(select).toHaveValue('taken');

   // ✅ Bien: texto que ve el usuario
   await expect(select.getByRole('option', { selected: true })).toHaveText('Regular');
   ```

   ```typescript
   // ❌ Mal: verificar atributo disabled
   await expect(option).toHaveAttribute('disabled', '');

   // ✅ Bien: verificar comportamiento - intentar y confirmar que no cambia
   await select.selectOption({ label: 'Aprobada' }, { force: true, timeout: 1000 }).catch(() => {});
   await expect(select.getByRole('option', { selected: true })).toHaveText('Regular');
   ```

3. **Usar assertions semánticas**

   ```typescript
   // ❌ Verifica atributo
   await expect(option).not.toHaveAttribute('disabled', '');

   // ✅ Verifica estado
   await expect(option).toBeEnabled();
   ```

4. **Si no es accesible, no es testeable**
   - Si un test necesita un selector feo, mejorar la accesibilidad del componente
   - Agregar `aria-label`, `aria-expanded`, `aria-controls`, etc.

5. **Interacciones reales**

   ```typescript
   await select.click();
   await select.selectOption({ label: 'Regular' });
   ```

6. **Evitar timeouts hardcodeados**
   - Confiar en auto-retry de Playwright (5s)
   - Usar `waitUntil: 'networkidle'` en navegación inicial

7. **Match exacto cuando hay nombres similares**

   ```typescript
   // Evita que "AM I" matchee "AM II"
   page.getByRole('combobox', { name: '...', exact: true });
   ```

8. **Scopear locators en lugar de usar `.first()`**

   ```typescript
   // ❌ Usa .first() porque hay múltiples "Primer cuatrimestre"
   page.getByRole('combobox', { name: '...Primer cuatrimestre' }).first();

   // ✅ Scopear al contexto específico
   const year1 = studyPlan.getYearSection(1);
   year1.getByRole('combobox', { name: '...Primer cuatrimestre' });
   ```

9. **Verificar precondiciones, no solo resultados**

   Si X causa Y, verificar que X es verdadero antes de verificar Y:

   ```typescript
   // ❌ Solo verifica el resultado
   await expect(termBulkSelect).toBeVisible();

   // ✅ Verifica la precondición que causa el resultado
   await expect(studyPlan.getCourseSelect('Álgebra')).toBeEnabled();
   await expect(studyPlan.getCourseSelect('Inglés I')).toBeEnabled();
   // ... todas las materias del term
   await expect(termBulkSelect).toBeVisible();
   ```

   Acoplarse a datos del dominio (nombres de materias) es aceptable.
   Acoplarse a implementación (IDs, clases CSS) no lo es.

## Arquitectura

### Fixtures (helpers reutilizables)

Usamos [Playwright Fixtures](https://playwright.dev/docs/test-fixtures) con un enfoque funcional:

- `e2e/helpers/study-plan.ts` - Funciones puras que reciben `page`
- `e2e/fixtures.ts` - Extiende `test` con el fixture `studyPlan`

```typescript
import { test, expect } from './fixtures';

test('example', async ({ studyPlan }) => {
	await studyPlan.goto();
	await studyPlan.setCourseState('Álgebra', 'Regular');
});
```
