import { test, expect } from './fixtures';

test.describe('Course details (expand/collapse)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('clicking course button expands and shows details content', async ({ studyPlan }) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');

		// Initially collapsed - no requirements section visible
		await expect(courseButton).toHaveAttribute('aria-expanded', 'false');

		await courseButton.click();

		// After click - expanded and content is visible
		await expect(courseButton).toHaveAttribute('aria-expanded', 'true');
		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		await expect(
			panel.getByText('Requisitos para cursar y rendir:', { exact: true })
		).toBeVisible();
	});

	test('clicking expanded course button collapses and hides details content', async ({
		studyPlan
	}) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');

		// Expand first
		await courseButton.click();
		await expect(courseButton).toHaveAttribute('aria-expanded', 'true');
		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		await expect(
			panel.getByText('Requisitos para cursar y rendir:', { exact: true })
		).toBeVisible();

		// Collapse
		await courseButton.click();
		await expect(courseButton).toHaveAttribute('aria-expanded', 'false');
		await expect(panel).not.toBeVisible();
	});

	test('expanded course shows hours info', async ({ studyPlan }) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		// The course has 10 hours - verify visible content
		await expect(panel.getByText('Carga horaria:')).toBeVisible();
		await expect(panel.getByText('10 horas cátedra semanales')).toBeVisible();
	});

	test('course without requirements shows "Ninguno"', async ({ studyPlan }) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		// Álgebra has no requirements - look for the exact text pattern
		await expect(
			panel.getByText('Requisitos para cursar y rendir:', { exact: true })
		).toBeVisible();
		await expect(panel.getByText('Ninguno').first()).toBeVisible();
	});

	test('course with requirements shows them listed', async ({ studyPlan }) => {
		// Análisis Matemático II requires Álgebra (regular) and AM I (regular)
		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		// Should show requirements section with links to required courses
		await expect(panel.getByText('Requisitos para cursar y rendir', { exact: true })).toBeVisible();
		await expect(panel.getByRole('link', { name: 'Álgebra y Geometría Analítica' })).toBeVisible();
		await expect(panel.getByRole('link', { name: 'Análisis Matemático I' })).toBeVisible();
	});
});

test.describe('Course requirements (check/cross indicators)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('unmet requirement shows current state with "pero está"', async ({ studyPlan }) => {
		// Análisis Matemático II requires Álgebra in "Regular" state
		// By default all courses are "No cursada", so requirement is not met
		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		// Look for the specific requirement text pattern
		await expect(
			panel.getByText(/Álgebra y Geometría Analítica.*debe estar al menos.*pero está.*No cursada/)
		).toBeVisible();
	});

	test('met requirement shows check without "pero está" text', async ({ studyPlan }) => {
		// Set both Álgebra and AM I to "Regular" to meet both requirements for AM II
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		// When requirement is met, the requirement line should NOT contain "pero está"
		// Verify requirement for Álgebra is shown without "pero está"
		const algebraRequirement = panel.getByText(
			/Álgebra y Geometría Analítica de 1.* año debe estar al menos/
		);
		await expect(algebraRequirement).toBeVisible();
		// The "pero está" text only appears when requirement is NOT met
		await expect(algebraRequirement).not.toContainText('pero está');
	});

	test('requirement shows required state label', async ({ studyPlan }) => {
		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		// Should show what state is required for Álgebra (Regular)
		await expect(
			panel.getByText(/Álgebra y Geometría Analítica.*debe estar al menos.*Regular/)
		).toBeVisible();
	});
});

test.describe('Course dependents (courses that this unlocks)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('course shows list of dependents it unlocks', async ({ studyPlan }) => {
		// Álgebra unlocks several courses including AM II
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		// Find the dependents heading and verify a link to a dependent course
		await expect(panel.getByText('Materias que desbloquea', { exact: true })).toBeVisible();
		// The link to AM II should be in the dependents list
		await expect(panel.getByText(/Análisis Matemático II.*necesita esta materia/)).toBeVisible();
	});

	test('dependent shows required state label', async ({ studyPlan }) => {
		// Álgebra in "No cursada" state can't unlock AM II (which needs it "Regular")
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		// The dependent section shows what state is needed (Regular in this case)
		await expect(
			panel.getByText(/Análisis Matemático II.*necesita esta materia al menos.*Regular/)
		).toBeVisible();
	});

	test('course without dependents shows "Ninguna"', async ({ studyPlan }) => {
		// Proyecto Final typically has no dependents (end of chain)
		const courseButton = studyPlan.getCourseButton('Proyecto Final');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Proyecto Final');
		// Find the text pattern for no dependents
		await expect(panel.getByText('Materias que desbloquea:')).toBeVisible();
		await expect(panel.getByText(/Materias que desbloquea:.*Ninguna/)).toBeVisible();
	});
});

test.describe('Total dependents count', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('shows total count with breakdown of direct and indirect dependents', async ({
		studyPlan
	}) => {
		// Álgebra unlocks many courses directly and indirectly
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		// Should show the total count with breakdown
		await expect(
			panel.getByText(
				/Cantidad total de materias que desbloquea:.*\d+.*directamente.*indirectamente/
			)
		).toBeVisible();
	});
});
