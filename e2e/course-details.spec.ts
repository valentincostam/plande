import { test, expect } from './fixtures';

test.describe('Course details (expand/collapse)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('clicking course button expands and shows details content', async ({ studyPlan, page }) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');

		// Initially collapsed - no requirements section visible
		await expect(courseButton).toHaveAttribute('aria-expanded', 'false');
		await expect(
			page.getByText('Requisitos para cursar y rendir:', { exact: true })
		).not.toBeVisible();

		await courseButton.click();

		// After click - expanded and content is visible
		await expect(courseButton).toHaveAttribute('aria-expanded', 'true');
		await expect(page.getByText('Requisitos para cursar y rendir:', { exact: true })).toBeVisible();
	});

	test('clicking expanded course button collapses and hides details content', async ({
		studyPlan,
		page
	}) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');

		// Expand first
		await courseButton.click();
		await expect(courseButton).toHaveAttribute('aria-expanded', 'true');
		await expect(page.getByText('Requisitos para cursar y rendir:', { exact: true })).toBeVisible();

		// Collapse
		await courseButton.click();
		await expect(courseButton).toHaveAttribute('aria-expanded', 'false');
		await expect(
			page.getByText('Requisitos para cursar y rendir:', { exact: true })
		).not.toBeVisible();
	});

	test('expanded course shows hours info', async ({ studyPlan, page }) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		// The course has 10 hours - verify visible content
		await expect(page.getByText('Carga horaria:')).toBeVisible();
		await expect(page.getByText('10 horas cátedra semanales')).toBeVisible();
	});

	test('course without requirements shows "Ninguno"', async ({ studyPlan, page }) => {
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		// Álgebra has no requirements - look for the exact text pattern
		await expect(page.getByText('Requisitos para cursar y rendir:', { exact: true })).toBeVisible();
		await expect(page.getByText('Ninguno').first()).toBeVisible();
	});

	test('course with requirements shows them listed', async ({ studyPlan, page }) => {
		// Análisis Matemático II requires Álgebra (regular) and AM I (regular)
		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		// Should show requirements section with links to required courses
		await expect(page.getByText('Requisitos para cursar y rendir', { exact: true })).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'Álgebra y Geometría Analítica' }).first()
		).toBeVisible();
		await expect(page.getByRole('link', { name: 'Análisis Matemático I' }).first()).toBeVisible();
	});
});

test.describe('Course requirements (check/cross indicators)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('unmet requirement shows current state with "pero está"', async ({ studyPlan, page }) => {
		// Análisis Matemático II requires Álgebra in "Regular" state
		// By default all courses are "No cursada", so requirement is not met
		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		// Look for the specific requirement text pattern
		await expect(
			page.getByText(/Álgebra y Geometría Analítica.*debe estar al menos.*pero está.*No cursada/)
		).toBeVisible();
	});

	test('met requirement shows check without "pero está" text', async ({ studyPlan, page }) => {
		// Set both Álgebra and AM I to "Regular" to meet both requirements for AM II
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		// When requirement is met, the requirement line should NOT contain "pero está"
		// Verify requirement for Álgebra is shown without "pero está"
		const algebraRequirement = page.getByText(
			/Álgebra y Geometría Analítica de 1.* año debe estar al menos/
		);
		await expect(algebraRequirement).toBeVisible();
		// The "pero está" text only appears when requirement is NOT met
		await expect(algebraRequirement).not.toContainText('pero está');
	});

	test('requirement shows required state label', async ({ studyPlan, page }) => {
		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		// Should show what state is required for Álgebra
		await expect(
			page.getByText(/Álgebra y Geometría Analítica.*debe estar al menos/)
		).toBeVisible();
	});
});

test.describe('Course dependents (courses that this unlocks)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('course shows list of dependents it unlocks', async ({ studyPlan, page }) => {
		// Álgebra unlocks several courses including AM II
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		// Find the dependents heading and verify a link to a dependent course
		await expect(page.getByText('Materias que desbloquea', { exact: true })).toBeVisible();
		// The link to AM II should be in the dependents list
		await expect(page.getByText(/Análisis Matemático II.*necesita esta materia/)).toBeVisible();
	});

	test('dependent shows required state info', async ({ studyPlan, page }) => {
		// Álgebra in "No cursada" state can't unlock AM II (which needs it "Regular")
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		// The dependent section shows what state is needed
		await expect(
			page.getByText(/Análisis Matemático II.*necesita esta materia al menos/)
		).toBeVisible();
	});

	test('course without dependents shows "Ninguna"', async ({ studyPlan, page }) => {
		// Proyecto Final typically has no dependents (end of chain)
		const courseButton = studyPlan.getCourseButton('Proyecto Final');
		await courseButton.click();

		// Find the text pattern for no dependents
		await expect(page.getByText('Materias que desbloquea:')).toBeVisible();
		await expect(page.getByText(/Materias que desbloquea:.*Ninguna/)).toBeVisible();
	});
});

test.describe('Total dependents count', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('shows total count with breakdown of direct and indirect dependents', async ({
		studyPlan,
		page
	}) => {
		// Álgebra unlocks many courses directly and indirectly
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		// Should show the total count with breakdown
		await expect(
			page.getByText(
				/Cantidad total de materias que desbloquea:.*\d+.*directamente.*indirectamente/
			)
		).toBeVisible();
	});
});
