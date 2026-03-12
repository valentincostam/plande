import { test, expect } from './fixtures';

test.describe('Settings - Strict Mode', () => {
	test('courses with unmet requirements are blocked by default', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await expect(courseButton).toContainText('Bloqueada');

		const courseStateControl = studyPlan.getCourseStateControl('Análisis Matemático II');
		await expect(courseStateControl).not.toBeVisible();
	});

	test('courses without requirements are enabled by default', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const courseStateControl = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');
		await expect(courseStateControl).toBeVisible();
		await expect(courseStateControl).toBeEnabled();

		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await expect(courseButton).not.toContainText('Bloqueada');
	});

	test('disabling strict mode unblocks all courses', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const blockedCourse = studyPlan.getCourseButton('Análisis Matemático II');
		await expect(blockedCourse).toContainText('Bloqueada');

		const strictModeToggle = studyPlan.getStrictModeToggle();
		await expect(strictModeToggle).toBeChecked();
		await strictModeToggle.click();
		await expect(strictModeToggle).not.toBeChecked();

		await expect(blockedCourse).not.toContainText('Bloqueada');

		const courseStateControl = studyPlan.getCourseStateControl('Análisis Matemático II');
		await expect(courseStateControl).toBeVisible();
		await expect(courseStateControl).toBeEnabled();
	});

	test('meeting requirements unblocks course', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const blockedCourse = studyPlan.getCourseButton('Análisis Matemático II');
		await expect(blockedCourse).toContainText('Bloqueada');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		await expect(blockedCourse).not.toContainText('Bloqueada');

		const courseStateControl = studyPlan.getCourseStateControl('Análisis Matemático II');
		await expect(courseStateControl).toBeVisible();
	});
});

test.describe('Settings - Show Identifiers', () => {
	test('show codes toggle is hidden when study plan has no course codes', async ({ studyPlan }) => {
		await studyPlan.goto('uba-fp-lp-1985');

		const showCodesToggle = studyPlan.getShowCodesToggle();
		await expect(showCodesToggle).not.toBeVisible();
	});

	test('show codes toggle is visible when study plan has course codes', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const showCodesToggle = studyPlan.getShowCodesToggle();
		await expect(showCodesToggle).toBeVisible();
	});

	test('course codes are hidden by default', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await expect(courseButton).toBeVisible();
		await expect(courseButton).not.toContainText('1. Álgebra');
	});

	test('enabling show codes displays course codes', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const showCodesToggle = studyPlan.getShowCodesToggle();
		await expect(showCodesToggle).not.toBeChecked();
		await showCodesToggle.click();
		await expect(showCodesToggle).toBeChecked();

		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await expect(courseButton).toContainText('1.');
	});

	test('codes are visible in course details when enabled', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.getShowCodesToggle().click();

		await studyPlan.getCourseButton('Análisis Matemático II').click();

		const detailsPanel = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		await expect(detailsPanel).toContainText('1. Álgebra');
	});
});

test.describe('Settings - State control mode', () => {
	test('course state control defaults to select in list and diagram views', async ({
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'combobox'
		);

		await studyPlan.getDiagramViewButton().click();

		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'combobox'
		);
	});

	test('enabling cycle mode switches controls to buttons in list and diagram and persists after reload', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const cycleStateButtonToggle = studyPlan.getCycleStateButtonToggle();
		await expect(cycleStateButtonToggle).not.toBeChecked();
		await cycleStateButtonToggle.click();
		await expect(cycleStateButtonToggle).toBeChecked();

		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'button'
		);

		await studyPlan.getDiagramViewButton().click();

		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'button'
		);

		await page.reload({ waitUntil: 'networkidle' });
		await expect(cycleStateButtonToggle).toBeChecked();
		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'button'
		);
	});
});

test.describe('Settings - Reset Progress', () => {
	test('reset button clears all course states', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await studyPlan.setCourseState('Inglés I', 'Regular');
		await studyPlan.setCourseState('Ingeniería y Sociedad', 'En curso');

		await expect(page.getByText('Aprobada (1)')).toBeVisible();
		await expect(page.getByText('Regular (1)')).toBeVisible();
		await expect(page.getByText('En curso (1)')).toBeVisible();

		page.on('dialog', (dialog) => dialog.accept());
		const resetButton = studyPlan.getResetProgressButton();
		await resetButton.click();

		await expect(page.getByText('No cursada (46)')).toBeVisible();
		await expect(page.getByText('Aprobada (0)')).toBeVisible();
		await expect(page.getByText('Regular (0)')).toBeVisible();
		await expect(page.getByText('En curso (0)')).toBeVisible();
	});

	test('reset button clears grades', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await studyPlan.getCourseButton('Álgebra y Geometría Analítica').click();
		await studyPlan.setGrade(9);

		const averageStat = studyPlan.getStatByLabel(/^Promedio sin aplazos/);
		await expect(averageStat).toBeVisible();
		await expect(averageStat).toContainText('9');

		page.on('dialog', (dialog) => dialog.accept());
		await studyPlan.getResetProgressButton().click();

		await expect(averageStat).not.toBeVisible();
	});

	test('reset button resets strict mode to default (enabled)', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const strictModeToggle = studyPlan.getStrictModeToggle();
		await strictModeToggle.click();
		await expect(strictModeToggle).not.toBeChecked();

		page.on('dialog', (dialog) => dialog.accept());
		await studyPlan.getResetProgressButton().click();

		await expect(strictModeToggle).toBeChecked();
	});

	test('reset button resets show codes to default (disabled)', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const showCodesToggle = studyPlan.getShowCodesToggle();
		await showCodesToggle.click();
		await expect(showCodesToggle).toBeChecked();

		await expect(studyPlan.getCourseButton('Álgebra y Geometría Analítica')).toContainText('1.');

		page.on('dialog', (dialog) => dialog.accept());
		await studyPlan.getResetProgressButton().click();

		await expect(showCodesToggle).not.toBeChecked();
		await expect(studyPlan.getCourseButton('Álgebra y Geometría Analítica')).not.toContainText(
			'1. Álgebra'
		);
	});

	test('reset button resets state control mode to default (select)', async ({
		studyPlan,
		page
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const cycleStateButtonToggle = studyPlan.getCycleStateButtonToggle();
		await cycleStateButtonToggle.click();
		await expect(cycleStateButtonToggle).toBeChecked();
		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'button'
		);

		page.on('dialog', (dialog) => dialog.accept());
		await studyPlan.getResetProgressButton().click();

		await expect(cycleStateButtonToggle).not.toBeChecked();
		await expect(studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')).toHaveRole(
			'combobox'
		);
	});

	test('reset clears URL state parameter', async ({ studyPlan, page }) => {
		await studyPlan.gotoWithState('utn-frcu-isi-2023', 'a2');

		await expect(page.getByText('Aprobada (2)')).toBeVisible();

		page.on('dialog', (dialog) => dialog.accept());
		await studyPlan.getResetProgressButton().click();

		await expect(page).toHaveURL(/utn-frcu-isi-2023$/);
	});
});
