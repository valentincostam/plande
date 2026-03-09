import { test, expect } from './fixtures';

test.describe('Diagram node selection', () => {
	test('keeps the node selected while its state button is clicked repeatedly', async ({
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();

		const courseName = 'Álgebra y Geometría Analítica';
		const diagramNode = studyPlan.getDiagramCourseNode(courseName);
		const stateButton = studyPlan.getCourseStateButton(courseName);

		await stateButton.click();
		await expect(stateButton).toHaveAccessibleName(`Estado de ${courseName}: En curso`);
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);

		await stateButton.click();
		await expect(stateButton).toHaveAccessibleName(`Estado de ${courseName}: Regular`);
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);
	});

	test('toggles selection off when clicking the node outside the state button', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();

		const courseName = 'Álgebra y Geometría Analítica';
		const diagramNode = studyPlan.getDiagramCourseNode(courseName);
		const stateButton = studyPlan.getCourseStateButton(courseName);

		await stateButton.click();
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);

		const nodeBox = await diagramNode.boundingBox();
		expect(nodeBox).not.toBeNull();

		await page.mouse.click(nodeBox!.x + 16, nodeBox!.y + 16);
		await expect(diagramNode).toHaveAccessibleName(courseName);
	});
});
