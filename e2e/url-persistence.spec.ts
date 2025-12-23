import { test, expect } from './fixtures';

test.describe('URL state persistence', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto();
	});

	test('changing course state updates URL', async ({ page, studyPlan }) => {
		// Initial URL without params
		expect(page.url()).not.toContain('?s=');

		// User changes state
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');

		// URL now contains encoded state
		await expect(page).toHaveURL(/\?s=/);
	});

	test('navigating to URL with state restores courses', async ({ page, studyPlan }) => {
		// URL with Algebra=Regular, AM1=Regular (encoded state)
		await page.goto('/utn-frcu-isi?s=nrn3r', { waitUntil: 'networkidle' });

		const algebraSelect = studyPlan.getCourseSelect('Álgebra y Geometría Analítica');
		const am1Select = studyPlan.getCourseSelect('Análisis Matemático I');

		// Verify state was restored correctly
		await expect(algebraSelect.locator('option:checked')).toHaveText('Regular');
		await expect(am1Select.locator('option:checked')).toHaveText('Regular');
	});

	test('sharing link preserves full state', async ({ page, context, studyPlan }) => {
		// User changes state
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		// Copy current URL
		const sharedUrl = page.url();

		// Simulate "share link" by opening in new tab
		const newPage = await context.newPage();
		await newPage.goto(sharedUrl, { waitUntil: 'networkidle' });

		// Verify state was preserved
		const algebraSelectNewPage = newPage.getByRole('combobox', {
			name: 'Estado de Álgebra y Geometría Analítica',
			exact: true
		});
		await expect(algebraSelectNewPage.locator('option:checked')).toHaveText('Aprobada');
	});

	test('page reload maintains state', async ({ page, studyPlan }) => {
		const algebraSelect = studyPlan.getCourseSelect('Álgebra y Geometría Analítica');

		// User changes state
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'En curso');
		await expect(algebraSelect.locator('option:checked')).toHaveText('En curso');

		// Reload page
		await page.reload({ waitUntil: 'networkidle' });

		// State is maintained
		const algebraSelectAfterReload = studyPlan.getCourseSelect('Álgebra y Geometría Analítica');
		await expect(algebraSelectAfterReload.locator('option:checked')).toHaveText('En curso');
	});
});
