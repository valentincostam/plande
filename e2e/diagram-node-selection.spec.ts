import { test, expect } from './fixtures';

test.describe('Diagram node selection', () => {
	test('keeps diagram state controls usable across repeated changes', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();

		const courseName = 'Álgebra y Geometría Analítica';
		const stateControl = studyPlan.getCourseStateControl(courseName);

		await stateControl.selectOption({ label: 'En curso' });
		await expect(stateControl).toHaveAccessibleName(`Estado de ${courseName}: En curso`);
		await expect(studyPlan.getDiagramCourseNode(courseName)).toBeVisible();

		await stateControl.selectOption({ label: 'Regular' });
		await expect(stateControl).toHaveAccessibleName(`Estado de ${courseName}: Regular`);
		await expect(studyPlan.getDiagramCourseNode(courseName)).toBeVisible();
	});

	test('keeps diagram controls usable after interacting with the canvas background', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();

		const courseName = 'Álgebra y Geometría Analítica';
		const diagramRegion = studyPlan.getDiagramRegion();
		const stateControl = studyPlan.getCourseStateControl(courseName);

		const regionBox = await diagramRegion.boundingBox();
		expect(regionBox).not.toBeNull();

		await page.mouse.click(regionBox!.x + 10, regionBox!.y + 10);
		await stateControl.selectOption({ label: 'En curso' });
		await expect(stateControl).toHaveAccessibleName(`Estado de ${courseName}: En curso`);
	});
});
