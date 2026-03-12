import { test, expect } from './fixtures';

test.describe('Course state cycle button', () => {
	test('clicking cycles through all states and wraps back to the start', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getCycleStateButtonToggle().click();

		const stateButton = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');

		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: No cursada'
		);

		await stateButton.click();
		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: En curso'
		);

		await stateButton.click();
		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Regular'
		);

		await stateButton.click();
		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Aprobada'
		);

		await stateButton.click();
		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: No cursada'
		);
	});

	test('keyboard shortcuts still set the exact state on the focused button', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getCycleStateButtonToggle().click();

		const stateButton = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');

		await stateButton.focus();
		await page.keyboard.press('R');
		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Regular'
		);

		await page.keyboard.press('A');
		await expect(stateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Aprobada'
		);
	});

	test('keeps a fixed width across all state changes', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getCycleStateButtonToggle().click();

		const stateButton = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');
		const initialBox = await stateButton.boundingBox();

		expect(initialBox).not.toBeNull();
		const initialWidth = initialBox!.width;

		for (const expectedState of ['En curso', 'Regular', 'Aprobada', 'No cursada']) {
			await stateButton.click();
			await expect(stateButton).toHaveAccessibleName(
				`Estado de Álgebra y Geometría Analítica: ${expectedState}`
			);

			const currentBox = await stateButton.boundingBox();
			expect(currentBox).not.toBeNull();
			expect(currentBox!.width).toBeCloseTo(initialWidth, 0);
		}
	});

	test('blocked badge uses the same width as the enabled state button', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getCycleStateButtonToggle().click();

		const blockedBadge = studyPlan.getCourseButton('Análisis Matemático II').getByText('Bloqueada');
		const blockedBox = await blockedBadge.boundingBox();

		expect(blockedBox).not.toBeNull();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		const stateButton = studyPlan.getCourseStateControl('Análisis Matemático II');
		const stateBox = await stateButton.boundingBox();

		expect(stateBox).not.toBeNull();
		expect(stateBox!.width).toBeCloseTo(blockedBox!.width, 0);
	});

	test('skips passed when the course cannot be approved yet', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frba-iq-1995');
		await studyPlan.getCycleStateButtonToggle().click();

		await studyPlan.setYearState(1, 'Aprobadas');
		await studyPlan.setYearState(2, 'Regulares');

		const fisica2StateButton = studyPlan.getCourseStateControl('Física II');
		await expect(fisica2StateButton).toHaveAccessibleName('Estado de Física II: Regular');

		await fisica2StateButton.click();
		await expect(fisica2StateButton).toHaveAccessibleName('Estado de Física II: No cursada');
	});
});
