import { test, expect } from './fixtures';

test.describe('Course blocking and unblocking', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto();
	});

	test('courses without prerequisites are enabled from start', async ({ studyPlan }) => {
		const algebraButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		const algebraStateControl = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');

		// aria-label does NOT include "bloqueada"
		await expect(algebraButton).not.toHaveAttribute('aria-label', /bloqueada/i);
		// State control is visible and in initial state
		await expect(algebraStateControl).toBeVisible();
		await expect(algebraStateControl).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: No cursada'
		);
	});

	test('course with prerequisites shows blocked status', async ({ studyPlan }) => {
		// AM2 requires Algebra and AM1
		const am2Button = studyPlan.getCourseButton('Análisis Matemático II');

		// aria-label includes "bloqueada por correlativas" (for screen readers)
		await expect(am2Button).toHaveAttribute('aria-label', /bloqueada por correlativas/i);
		// Visual "Bloqueada" badge is visible (for sighted users)
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();
		// Select is NOT visible (cannot change state)
		const am2StateControl = studyPlan.getCourseStateControl('Análisis Matemático II');
		await expect(am2StateControl).not.toBeVisible();
	});

	test('passing prerequisites unlocks dependent course', async ({ studyPlan }) => {
		const am2Button = studyPlan.getCourseButton('Análisis Matemático II');
		const am2StateControl = studyPlan.getCourseStateControl('Análisis Matemático II');

		// Initial state: AM2 is blocked
		await expect(am2Button).toHaveAttribute('aria-label', /bloqueada por correlativas/i);
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();
		await expect(am2StateControl).not.toBeVisible();

		// User changes Algebra to "Regular"
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');

		// AM2 is still blocked (missing AM1)
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();

		// User changes AM1 to "Regular"
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		// Now AM2 is unlocked
		await expect(am2Button).not.toHaveAttribute('aria-label', /bloqueada/i);
		await expect(am2Button.getByText('Bloqueada')).not.toBeVisible();
		await expect(am2StateControl).toBeVisible();
	});

	test('changing prerequisite to lower state re-blocks dependent', async ({ studyPlan }) => {
		const am2Button = studyPlan.getCourseButton('Análisis Matemático II');
		const am2StateControl = studyPlan.getCourseStateControl('Análisis Matemático II');

		// Initial state: AM2 blocked
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();

		// Unlock AM2 step by step
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await expect(am2Button.getByText('Bloqueada')).toBeVisible(); // Still blocked

		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');
		await expect(am2Button.getByText('Bloqueada')).not.toBeVisible(); // Now unlocked
		await expect(am2StateControl).toBeVisible();

		// User sets AM2 to "En curso"
		await studyPlan.setCourseState('Análisis Matemático II', 'En curso');

		// User changes Algebra back to "No cursada"
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'No cursada');

		// AM2 should be re-blocked
		await expect(am2Button).toHaveAttribute('aria-label', /bloqueada por correlativas/i);
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();
		await expect(am2StateControl).not.toBeVisible();
	});

	test('cascade: changing prerequisite resets entire dependency chain', async ({ studyPlan }) => {
		// Chain: Álgebra → AM2 → Análisis Numérico
		// Análisis Numérico requires: Álgebra passed + AM1 passed + AM2 regular
		const am2Button = studyPlan.getCourseButton('Análisis Matemático II');
		const anButton = studyPlan.getCourseButton('Análisis Numérico');

		// Initial state: both AM2 and AN are blocked
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();
		await expect(anButton.getByText('Bloqueada')).toBeVisible();

		// Unlock the chain step by step
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await studyPlan.setCourseState('Análisis Matemático I', 'Aprobada');

		// AM2 is now unlocked
		await expect(am2Button.getByText('Bloqueada')).not.toBeVisible();

		// Set AM2 to Regular
		await studyPlan.setCourseState('Análisis Matemático II', 'Regular');

		// Análisis Numérico is now unlocked
		await expect(anButton.getByText('Bloqueada')).not.toBeVisible();

		// Set Análisis Numérico to En curso
		await studyPlan.setCourseState('Análisis Numérico', 'En curso');

		// Now break the chain: change Álgebra back to No cursada
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'No cursada');

		// Entire chain should be re-blocked
		await expect(am2Button.getByText('Bloqueada')).toBeVisible();
		await expect(anButton.getByText('Bloqueada')).toBeVisible();
	});
});
