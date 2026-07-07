import { expect, test } from './fixtures';

const englishMilestonePending = 'Estado de Examen de Suficiencia de Inglés E: Pendiente';
const englishMilestoneCompleted = 'Estado de Examen de Suficiencia de Inglés E: Completado';

test.describe('Milestone state persistence', () => {
	test('completed milestone survives a page reload via URL state', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('uns-dcs-le-2017');

		await page.getByRole('button', { name: englishMilestonePending, exact: true }).click();
		await expect(
			page.getByRole('button', { name: englishMilestoneCompleted, exact: true })
		).toBeVisible();

		await expect(page).toHaveURL(/[?&]s=/);

		await page.reload({ waitUntil: 'load' });

		await expect(
			page.getByRole('button', { name: englishMilestoneCompleted, exact: true })
		).toBeVisible();
	});

	test('completed milestone survives navigation without URL params via localStorage', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('uns-dcs-le-2017');

		await page.getByRole('button', { name: englishMilestonePending, exact: true }).click();
		await expect(
			page.getByRole('button', { name: englishMilestoneCompleted, exact: true })
		).toBeVisible();
		await expect(page).toHaveURL(/[?&]s=/);

		await studyPlan.goto('uns-dcs-le-2017');

		await expect(
			page.getByRole('button', { name: englishMilestoneCompleted, exact: true })
		).toBeVisible();
	});

	test('milestone and dependent course states survive a reload together', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('uns-dcs-le-2017');

		// Without strict mode the course can be passed directly; the point here
		// is that BOTH states round-trip through the same URL stream.
		await studyPlan.getStrictModeToggle().uncheck();

		await page.getByRole('button', { name: englishMilestonePending, exact: true }).click();
		await studyPlan.setCourseState('Educación en el Cuidado de la Salud', 'Aprobada');

		await page.reload({ waitUntil: 'load' });

		await expect(
			page.getByRole('button', { name: englishMilestoneCompleted, exact: true })
		).toBeVisible();
		await expect(
			studyPlan.getCourseStateControl('Educación en el Cuidado de la Salud')
		).toHaveAccessibleName('Estado de Educación en el Cuidado de la Salud: Aprobada');
	});

	test('milestone completion can be undone with the keyboard shortcut', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('uns-dcs-le-2017');

		// The very first change only seeds the history baseline, so make a course
		// change first and then toggle the milestone.
		await studyPlan.setCourseState('Fundamentos del Cuidado', 'Aprobada');

		await page.getByRole('button', { name: englishMilestonePending, exact: true }).click();
		await expect(
			page.getByRole('button', { name: englishMilestoneCompleted, exact: true })
		).toBeVisible();

		await page.keyboard.press('ControlOrMeta+z');

		await expect(
			page.getByRole('button', { name: englishMilestonePending, exact: true })
		).toBeVisible();
		await expect(
			studyPlan.getCourseStateControl('Fundamentos del Cuidado')
		).toHaveAccessibleName('Estado de Fundamentos del Cuidado: Aprobada');
	});
});

test.describe('Bulk select state persistence', () => {
	test('bulk-selected passed year stays passed after a reload in strict mode', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setYearState(1, 'Aprobadas');
		await expect(
			studyPlan.getCourseStateControl('Análisis Matemático I')
		).toHaveAccessibleName('Estado de Análisis Matemático I: Aprobada');
		await expect(page).toHaveURL(/[?&]s=/);

		await page.reload({ waitUntil: 'load' });

		await expect(
			studyPlan.getCourseStateControl('Análisis Matemático I')
		).toHaveAccessibleName('Estado de Análisis Matemático I: Aprobada');
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
	});
});
