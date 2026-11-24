import { expect, test } from '@playwright/test';
import { withControlledDraft } from './helpers/controlled-draft';
import { createDraft, waitForEditor } from './helpers/draft-editor';

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Requires local controlled collaboration.'
);
test.use({ trace: 'off', actionTimeout: 5000 });

test('imports a preview and preserves both students work when another import becomes stale', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL31 importación', async (fixture) => {
		const first = await fixture.openStudentPage(await fixture.createStudent());
		await createDraft(first, fixture.identity);
		const second = await fixture.openStudentPage(await fixture.createStudent());
		await second.goto(first.url());
		await waitForEditor(second);
		const content = {
			schemaVersion: 1,
			document: {
				nextSeqId: 2,
				sections: [{ id: 'basic', label: 'Ciclo básico' }],
				items: [
					{
						id: 'algebra',
						seqId: 0,
						kind: 'course',
						name: 'Álgebra importada',
						type: 'mandatory',
						credits: 6,
						placements: [{ id: 'place', sectionId: 'basic' }]
					},
					{ id: 'thesis', seqId: 1, kind: 'milestone', name: 'Trabajo final', placements: [] }
				],
				requirements: {
					graduation: [
						{
							id: 'degree',
							label: 'Título completo',
							weight: 2,
							expr: {
								type: 'all',
								rules: [
									{ type: 'item', itemId: 'algebra', state: 'passed' },
									{ type: 'item', itemId: 'thesis', state: 'completed' }
								]
							}
						}
					]
				}
			},
			unknownRequirements: [
				{ scope: 'item:algebra:enroll', note: 'Comprobar correlativas en la fuente.' }
			],
			unsupportedContent: []
		};
		for (const page of [first, second]) {
			await page.getByText('Importar con mi IA', { exact: true }).click();
			await page.getByLabel('Respuesta JSON', { exact: true }).fill(JSON.stringify(content));
			await page.getByRole('button', { name: 'Validar', exact: true }).click();
			await expect(
				page
					.getByRole('region', { name: 'Vista previa', exact: true })
					.getByText('Álgebra importada', { exact: true })
			).toBeVisible();
		}
		await first.getByRole('button', { name: 'Confirmar importación', exact: true }).click();
		await expect(first.getByLabel('Nombre de materia', { exact: true })).toHaveValue(
			'Álgebra importada'
		);
		await second.getByRole('button', { name: 'Confirmar importación', exact: true }).click();
		await expect(second.getByRole('alert').filter({ hasText: 'No importamos' })).toBeVisible();
		await expect(second.getByLabel('Respuesta JSON', { exact: true })).toHaveValue(
			JSON.stringify(content)
		);
		await expect(second.getByRole('region', { name: 'Vista previa', exact: true })).toBeVisible();
		await first.reload();
		await waitForEditor(first);
		await expect(first.getByLabel('Nombre de materia', { exact: true })).toHaveValue(
			'Álgebra importada'
		);
		await expect(first.getByLabel('Nombre del hito general', { exact: true })).toHaveValue(
			'Trabajo final'
		);
		const degree = first.getByRole('group', { name: 'Condición de graduación 1', exact: true });
		await expect(degree.getByLabel('Etiqueta', { exact: true })).toHaveValue('Título completo');
		await expect(degree.getByLabel('Peso en el progreso (opcional)', { exact: true })).toHaveValue(
			'2'
		);
	});
});
