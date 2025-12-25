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
   await expect(select).toHaveValue('notTaken');

   // ✅ Bien: texto que ve el usuario
   await expect(select.locator('option:checked')).toHaveText('No cursada');
   ```

   ```typescript
   // ❌ Mal: solo verificar atributo ARIA
   await expect(button).toHaveAttribute('aria-expanded', 'true');

   // ✅ Bien: verificar que el contenido realmente es visible
   await expect(button).toHaveAttribute('aria-expanded', 'true');
   await expect(page.getByText('Contenido del panel')).toBeVisible();
   ```

   ```typescript
   // ❌ Mal: buscar por ID (el usuario no ve IDs)
   page.locator('#mi-elemento');

   // ✅ Bien: buscar por texto o rol
   page.getByText('Texto visible');
   page.getByRole('button', { name: 'Guardar' });
   ```

3. **Si no es accesible, no es testeable**
   - Si un test necesita un selector feo, mejorar la accesibilidad del componente
   - Agregar `aria-label`, `aria-expanded`, `aria-controls`, etc. según corresponda
   - Los tests deben impulsar mejoras de accesibilidad, no evitarlas

4. **Interacciones reales**

   ```typescript
   // Click + selección como haría un usuario
   await select.click();
   await select.selectOption({ label: 'Regular' });
   ```

5. **Evitar timeouts hardcodeados**
   - Confiar en auto-retry de Playwright (reintenta assertions hasta 5s)
   - Usar `waitUntil: 'networkidle'` en navegación inicial
   - Si algo necesita `waitForTimeout()`, probablemente hay un mejor approach

6. **Match exacto cuando hay nombres similares**
   ```typescript
   // Evita que "AM I" matchee "AM II"
   page.getByRole('combobox', { name: '...', exact: true });
   ```

## Arquitectura

### Fixtures (helpers reutilizables)

Usamos [Playwright Fixtures](https://playwright.dev/docs/test-fixtures) con un enfoque funcional (sin clases):

- `e2e/helpers/study-plan.ts` - Funciones puras que reciben `page`
- `e2e/fixtures.ts` - Extiende `test` con el fixture `studyPlan`

```typescript
import { test, expect } from './fixtures';

test('example', async ({ studyPlan }) => {
	await studyPlan.goto();
	await studyPlan.setCourseState('Álgebra', 'Regular');
});
```

**¿Por qué fixtures y no Page Object Model (clases)?**

- Más funcional, menos boilerplate
- No requiere instanciar objetos en cada test
- El `page` se inyecta automáticamente
