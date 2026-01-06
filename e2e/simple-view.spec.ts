import { test, expect } from './fixtures';

test.describe('Simple View - Basic display', () => {
	test('displays degree name and institution', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		await expect(
			page.getByRole('heading', { name: 'Ingeniería en Sistemas de Información' })
		).toBeVisible();
		await expect(page.getByText('UTN FRCU')).toBeVisible();
	});

	test('displays courses grouped by year', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		await expect(page.getByRole('heading', { name: /Primer Año/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Segundo Año/i })).toBeVisible();
		await expect(page.getByText('Álgebra y Geometría Analítica')).toBeVisible();
	});

	test('shows state pills on courses', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const course = page.getByRole('listitem').filter({ hasText: 'Álgebra y Geometría Analítica' });
		await expect(course.getByText('No cursada')).toBeVisible();
	});

	test('has link to full view', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const link = studyPlan.getFullViewLink();
		await expect(link).toBeVisible();
		await expect(link).toHaveAttribute('href', /\/utn-frcu-isi-2023/);
	});
});

test.describe('Simple View - State from URL', () => {
	test('shows course states from URL params', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a');

		const course = page
			.getByRole('listitem')
			.filter({ hasText: 'Sistemas y Procesos de Negocios' });
		await expect(course.getByText('Aprobada')).toBeVisible();
	});

	test('shows multiple course states from compressed URL params', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a2');

		const course1 = page
			.getByRole('listitem')
			.filter({ hasText: 'Sistemas y Procesos de Negocios' });
		await expect(course1.getByText('Aprobada')).toBeVisible();

		const course2 = page.getByRole('listitem').filter({ hasText: 'Álgebra y Geometría Analítica' });
		await expect(course2.getByText('Aprobada')).toBeVisible();
	});
});

test.describe('Simple View - Grades display', () => {
	test('shows grade next to passed course when available', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a', 'h');

		const course = page
			.getByRole('listitem')
			.filter({ hasText: 'Sistemas y Procesos de Negocios' });
		await expect(course.getByText('8')).toBeVisible();
		await expect(course.getByText('Aprobada')).toBeVisible();
	});

	test('does not show grade when not available', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a');

		const course = page
			.getByRole('listitem')
			.filter({ hasText: 'Sistemas y Procesos de Negocios' });
		await expect(course.getByText('Aprobada')).toBeVisible();
	});
});

test.describe('Simple View - Stats', () => {
	test('shows degree progress percentage', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		await expect(page.getByText('Avance de carrera')).toBeVisible();
		await expect(page.getByText('0%')).toBeVisible();
	});

	test('shows mandatory courses count', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		await expect(page.getByText('Materias obligatorias aprobadas')).toBeVisible();
	});

	test('shows elective courses count', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		await expect(page.getByText(/Materias electivas aprobadas/)).toBeVisible();
	});

	test('shows average when grades exist', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a', 'h');

		await expect(page.getByText('Promedio')).toBeVisible();
	});

	test('does not show average when no grades exist', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		await expect(page.getByText('Promedio')).not.toBeVisible();
	});

	test('updates stats based on URL state', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a8');

		await expect(page.getByText(/\d+%/)).toBeVisible();
	});
});

test.describe('Simple View - Read-only behavior', () => {
	test('courses are not interactive (no state select)', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const select = page.getByRole('combobox', { name: /Estado de/ });
		await expect(select).not.toBeVisible();
	});

	test('courses are not expandable', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const expandButton = page.getByRole('button', { name: /Álgebra/ });
		await expect(expandButton).not.toBeVisible();
	});

	test('no bulk state selects visible', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const bulkSelect = page.getByRole('combobox', { name: /Cambiar estado de todas/ });
		await expect(bulkSelect).not.toBeVisible();
	});
});

test.describe('Simple View - Navigation', () => {
	test('full view link preserves query params', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimpleWithState('utn-frcu-isi-2023', 'a2');

		const link = studyPlan.getFullViewLink();
		await expect(link).toHaveAttribute('href', /\?s=a2/);
	});

	test('clicking full view link navigates to full page', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const link = studyPlan.getFullViewLink();
		await link.click();

		await expect(page).toHaveURL(/\/utn-frcu-isi-2023(?!\/).*$/);
		await expect(page.getByRole('button', { name: 'Lista' })).toBeVisible();
	});
});

test.describe('Simple View Link', () => {
	test('link to simple view is visible on full view', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const link = studyPlan.getSimpleViewLink();
		await expect(link).toBeVisible();
		await expect(link).toHaveAttribute('href', /\/utn-frcu-isi-2023\/simple/);
	});

	test('link preserves query params', async ({ studyPlan }) => {
		await studyPlan.gotoWithState('utn-frcu-isi-2023', 'a2');

		const link = studyPlan.getSimpleViewLink();
		await expect(link).toHaveAttribute('href', /\/simple\?s=a2/);
	});

	test('clicking simple view link navigates to simple page', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const link = studyPlan.getSimpleViewLink();
		await link.click();

		await expect(page).toHaveURL(/\/utn-frcu-isi-2023\/simple/);
		await expect(page.getByRole('link', { name: /Ver versión completa/ })).toBeVisible();
	});
});

test.describe('Simple View - Share and Copy buttons', () => {
	test('share button is visible on simple view', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const button = page.getByRole('button', { name: /Compartir plan de estudios/ });
		await expect(button).toBeVisible();
	});

	test('copy link button is visible on simple view', async ({ studyPlan, page }) => {
		await studyPlan.gotoSimple('utn-frcu-isi-2023');

		const button = page.getByRole('button', { name: /Copiar link/ });
		await expect(button).toBeVisible();
	});
});
