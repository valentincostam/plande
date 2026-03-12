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

		const algebraStateControl = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');
		const am1StateControl = studyPlan.getCourseStateControl('Análisis Matemático I');

		// Verify state was restored correctly
		await expect(algebraStateControl).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Regular'
		);
		await expect(am1StateControl).toHaveAccessibleName('Estado de Análisis Matemático I: Regular');
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
		const algebraStateControlNewPage = newPage.getByRole('combobox', {
			name: 'Estado de Álgebra y Geometría Analítica: Aprobada',
			exact: true
		});
		await expect(algebraStateControlNewPage).toBeVisible();
	});

	test('page reload maintains state', async ({ page, studyPlan }) => {
		const algebraStateControl = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');

		// User changes state
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'En curso');
		await expect(algebraStateControl).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: En curso'
		);

		// Reload page
		await page.reload({ waitUntil: 'networkidle' });

		// State is maintained
		const algebraStateControlAfterReload = studyPlan.getCourseStateControl(
			'Álgebra y Geometría Analítica'
		);
		await expect(algebraStateControlAfterReload).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: En curso'
		);
	});
});
