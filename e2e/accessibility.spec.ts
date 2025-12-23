import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

// Helper to format violations for readable output
const formatViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) => {
	return violations.map((v) => ({
		id: v.id,
		impact: v.impact,
		description: v.description,
		nodes: v.nodes.length
	}));
};

test.describe('Accessibility', () => {
	// Known issues: color-contrast and link-in-text-block violations exist
	// These are tracked and should be fixed in the design
	const knownIssues = ['color-contrast', 'link-in-text-block'];

	test('study plan page has no critical accessibility violations', async ({ page, studyPlan }) => {
		await studyPlan.goto();

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.disableRules(knownIssues)
			.analyze();

		if (results.violations.length > 0) {
			console.log('Violations found:', formatViolations(results.violations));
		}

		expect(results.violations).toEqual([]);
	});

	test('study plan with expanded course has no critical violations', async ({ page, studyPlan }) => {
		await studyPlan.goto();

		// Expand a course to test the expanded state
		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.disableRules(knownIssues)
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('study plan with course state changes has no critical violations', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto();

		// Change some course states
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'En curso');

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.disableRules(knownIssues)
			.analyze();

		expect(results.violations).toEqual([]);
	});

	// This test documents known color contrast issues - remove when fixed
	test.skip('audit: color contrast issues to fix', async ({ page, studyPlan }) => {
		await studyPlan.goto();

		const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

		const contrastViolations = results.violations.filter((v) => knownIssues.includes(v.id));

		console.log('Known issues to fix:', formatViolations(contrastViolations));
	});
});
