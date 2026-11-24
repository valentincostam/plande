import { expect, test } from '@playwright/test';
import { withControlledDraft } from './helpers/controlled-draft';
import { saveDraft, selectOfferField, waitForEditor } from './helpers/draft-editor';

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Requires local controlled collaboration.'
);
test.use({ trace: 'off', actionTimeout: 5000 });

test('resumes explicit review checks without granting authors approval', async ({ browser }) => {
	await withControlledDraft(browser, 'VAL32 review', async (fixture) => {
		const author = await fixture.openStudentPage(await fixture.createStudent());
		await author.goto('/plans/new');
		for (const [label, value] of [
			['Universidad', fixture.identity.university],
			['Facultad o unidad académica', fixture.identity.faculty],
			['Carrera', fixture.identity.offer]
		])
			await selectOfferField(author, label, value);
		await author.getByRole('button', { name: 'Crear o continuar borrador' }).click();
		await expect(author).toHaveURL(/\/draft\/[0-9a-f-]{36}$/);
		const draftUrl = author.url();
		await waitForEditor(author);
		await author.getByText('Agregar una fuente', { exact: true }).click();
		await author.getByLabel('Etiqueta de la fuente', { exact: true }).fill('Documento del plan');
		await author.getByLabel('URL de la fuente', { exact: true }).fill('https://example.test/plan');
		await author.getByRole('button', { name: 'Agregar fuente', exact: true }).click();
		await expect(
			author.getByRole('link', { name: 'Documento del plan', exact: true })
		).toBeVisible();
		await author.getByText('Importar con mi IA', { exact: true }).click();
		await author.getByLabel('Respuesta JSON', { exact: true }).fill(
			JSON.stringify({
				schemaVersion: 1,
				document: {
					nextSeqId: 1,
					sections: [{ id: 'basic', label: 'Formación básica' }],
					items: [
						{
							id: 'algebra',
							seqId: 0,
							kind: 'course',
							name: 'Álgebra',
							type: 'mandatory',
							placements: [{ id: 'place', sectionId: 'basic' }],
							requirements: {
								enroll: { type: 'all', rules: [] },
								complete: { type: 'all', rules: [] }
							}
						}
					],
					requirements: {
						graduation: [
							{
								id: 'degree',
								label: 'Título',
								expr: { type: 'item', itemId: 'algebra', state: 'passed' }
							}
						]
					}
				},
				unknownRequirements: [],
				unsupportedContent: []
			})
		);
		await author.getByRole('button', { name: 'Validar', exact: true }).click();
		await author.getByRole('button', { name: 'Confirmar importación', exact: true }).click();
		await expect(author.getByLabel('Nombre de materia', { exact: true })).toHaveValue('Álgebra');
		await author.getByRole('button', { name: 'Mostrar detalle de Álgebra', exact: true }).click();
		for (const scope of ['Para cursar', 'Para completar'])
			await author
				.getByRole('group', { name: scope, exact: true })
				.getByLabel('Tipo de requisito')
				.selectOption('none');
		await saveDraft(author);
		const reviewUrl = `${draftUrl}/review`;
		await author.goto(reviewUrl);
		await expect(
			author.getByText('Editaste este borrador. Tu aprobación no puede contar.', { exact: true })
		).toBeVisible();
		const reviewer = await fixture.openStudentPage(await fixture.createStudent());
		await reviewer.goto(reviewUrl);
		const identity = reviewer.getByRole('group', { name: 'Comprobar identidad', exact: true });
		await identity.getByRole('checkbox').check();
		await identity.getByRole('button', { name: 'Marcar comprobado', exact: true }).click();
		await expect(identity.getByText('Comprobado', { exact: true })).toBeVisible();
		await reviewer.reload();
		await expect(identity.getByText('Comprobado', { exact: true })).toBeVisible();
		const other = await fixture.openStudentPage(await fixture.createStudent());
		await other.goto(reviewUrl);
		await expect(
			other
				.getByRole('group', { name: 'Comprobar identidad', exact: true })
				.getByRole('button', { name: 'Marcar comprobado', exact: true })
		).toBeEnabled();
		await expect(
			other.getByRole('button', { name: 'Aprobar revisión completa', exact: true })
		).toBeDisabled();
		for (const page of [reviewer, other]) {
			for (const label of ['identidad', 'Documento del plan', 'Álgebra', 'Título']) {
				const group = page.getByRole('group', { name: `Comprobar ${label}`, exact: true });
				if (await group.getByText('Comprobado', { exact: true }).count()) continue;
				await group.getByRole('checkbox').check();
				await group.getByRole('button', { name: 'Marcar comprobado', exact: true }).click();
				await expect(group.getByText('Comprobado', { exact: true })).toBeVisible();
			}
			await expect(
				page.getByRole('button', { name: 'Aprobar revisión completa', exact: true })
			).toBeEnabled();
		}
		await reviewer.getByRole('button', { name: 'Aprobar revisión completa', exact: true }).click();
		await expect(
			reviewer.getByText('Revisión completa aprobada para esta versión.', { exact: true })
		).toBeVisible();
		await reviewer.getByRole('button', { name: 'Publicar plan', exact: true }).click();
		await expect(reviewer.getByRole('alert')).toContainText('Faltan dos revisiones completas');
		await author.goto(draftUrl);
		await waitForEditor(author);
		await author.getByLabel('Nombre de materia', { exact: true }).fill('Álgebra I');
		await saveDraft(author);
		await other.getByRole('button', { name: 'Aprobar revisión completa', exact: true }).click();
		await expect(other.getByRole('alert')).toContainText('El plan cambió.');
		await reviewer.reload();
		await expect(
			reviewer.getByText('Revisión completa aprobada para esta versión.', { exact: true })
		).toHaveCount(0);
		await expect(
			reviewer
				.getByRole('group', { name: 'Comprobar Documento del plan', exact: true })
				.getByText('Comprobado', { exact: true })
		).toBeVisible();
		await expect(
			reviewer
				.getByRole('group', { name: 'Comprobar Álgebra I', exact: true })
				.getByRole('button', { name: 'Marcar comprobado', exact: true })
		).toBeEnabled();
		await reviewer.getByText('Agregar aporte', { exact: true }).click();
		const contribution = reviewer.getByRole('form', { name: 'Nuevo aporte', exact: true });
		await contribution
			.getByRole('combobox', { name: 'Tipo de aporte', exact: true })
			.selectOption('objection');
		await contribution
			.getByRole('combobox', { name: 'Contexto', exact: true })
			.selectOption({ label: 'Álgebra I' });
		await contribution.getByLabel('Argumento', { exact: true }).fill('La fuente dice Álgebra II.');
		await contribution
			.getByRole('combobox', { name: 'Fuente', exact: true })
			.selectOption({ label: 'Documento del plan' });
		await contribution.getByRole('button', { name: 'Publicar aporte', exact: true }).click();
		await expect(reviewer.getByText('La fuente dice Álgebra II.', { exact: true })).toBeVisible();
		await other.goto(reviewUrl);
		const objection = other.getByRole('article', { name: 'Objeción sobre Álgebra I', exact: true });
		await objection.getByText('Concluir o reabrir', { exact: true }).click();
		const conclusion = objection.getByRole('form', { name: 'Resolución de objeción', exact: true });
		await conclusion
			.getByLabel('Argumento', { exact: true })
			.fill('Comparé el título con la fuente y confirmo la diferencia.');
		await conclusion
			.getByRole('combobox', { name: 'Fuente', exact: true })
			.selectOption({ label: 'Documento del plan' });
		await conclusion.getByRole('button', { name: 'Resolver objeción', exact: true }).click();
		await expect(objection.getByText('Estado: Error confirmado', { exact: true })).toBeVisible();
		await author.goto(draftUrl);
		await waitForEditor(author);
		await author.getByLabel('Nombre de materia', { exact: true }).fill('Álgebra II');
		await saveDraft(author);
		await other.reload();
		const correctedUnit = other.getByRole('group', { name: 'Comprobar Álgebra II', exact: true });
		await correctedUnit.getByRole('checkbox').check();
		await correctedUnit.getByRole('button', { name: 'Marcar comprobado', exact: true }).click();
		const correctedObjection = other.getByRole('article', {
			name: 'Objeción sobre Álgebra II',
			exact: true
		});
		await correctedObjection.getByText('Concluir o reabrir', { exact: true }).click();
		const correction = correctedObjection.getByRole('form', {
			name: 'Resolución de objeción',
			exact: true
		});
		await correction
			.getByLabel('Argumento', { exact: true })
			.fill('El nombre corregido coincide con la fuente.');
		await correction
			.getByRole('combobox', { name: 'Fuente', exact: true })
			.selectOption({ label: 'Documento del plan' });
		await correction.getByRole('button', { name: 'Comprobar corrección', exact: true }).click();
		await expect(
			correctedObjection.getByText('Estado: Corrección comprobada', { exact: true })
		).toBeVisible();
		await expect(
			correctedObjection.getByRole('region', { name: 'Historial de resolución' })
		).toContainText('Comparé el título con la fuente');
		await reviewer.reload();
		const resolvedObjection = reviewer.getByRole('article', {
			name: 'Objeción sobre Álgebra II',
			exact: true
		});
		await resolvedObjection.getByText('Concluir o reabrir', { exact: true }).click();
		const reopening = resolvedObjection.getByRole('form', {
			name: 'Resolución de objeción',
			exact: true
		});
		await reopening
			.getByLabel('Argumento', { exact: true })
			.fill('La fe de erratas cambia el nombre.');
		await reopening
			.getByRole('combobox', { name: 'Fuente', exact: true })
			.selectOption({ label: 'Documento del plan' });
		await reopening
			.getByLabel('Nueva evidencia', { exact: true })
			.fill('Anexo nuevo, página 3: denominación actualizada.');
		await reopening.getByRole('button', { name: 'Reabrir objeción', exact: true }).click();
		await expect(resolvedObjection.getByText('Estado: Pendiente', { exact: true })).toBeVisible();
		await expect(
			resolvedObjection.getByRole('region', { name: 'Historial de resolución' })
		).toContainText('Anexo nuevo, página 3');
	});
});
