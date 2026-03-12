import { test, expect } from './fixtures';

test.describe('Diagram node selection', () => {
	test('keeps the node selected while its state control is used repeatedly', async ({
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();

		const courseName = 'Álgebra y Geometría Analítica';
		const diagramNode = studyPlan.getDiagramCourseNode(courseName);
		const stateControl = studyPlan.getCourseStateControl(courseName);

		await stateControl.click();
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);

		await stateControl.selectOption({ label: 'En curso' });
		await expect(stateControl).toHaveAccessibleName(`Estado de ${courseName}: En curso`);
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);

		await stateControl.selectOption({ label: 'Regular' });
		await expect(stateControl).toHaveAccessibleName(`Estado de ${courseName}: Regular`);
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);
	});

	test('toggles selection off when clicking the node outside the state control', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();

		const courseName = 'Álgebra y Geometría Analítica';
		const diagramNode = studyPlan.getDiagramCourseNode(courseName);
		const stateControl = studyPlan.getCourseStateControl(courseName);

		await stateControl.click();
		await expect(diagramNode).toHaveAccessibleName(`${courseName}, seleccionada en el diagrama`);

		const nodeBox = await diagramNode.boundingBox();
		expect(nodeBox).not.toBeNull();

		await page.mouse.click(nodeBox!.x + 16, nodeBox!.y + 16);
		await expect(diagramNode).toHaveAccessibleName(courseName);
	});
});
