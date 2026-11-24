import { expect, test } from '@playwright/test';
import { withControlledDraft } from './helpers/controlled-draft';
import { addBasicCourse, createDraft, saveDraft, waitForEditor } from './helpers/draft-editor';

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Requires local controlled collaboration.'
);
test.use({ trace: 'off', actionTimeout: 5000 });

test('two students choose between complete requirement alternatives without overwriting silently', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL28 conflicto', async (fixture) => {
		const first = await fixture.openStudentPage(await fixture.createStudent());
		await createDraft(first, fixture.identity);
		await addBasicCourse(first, 'Práctica profesional');
		await first.getByRole('button', { name: '+ Agregar hito general', exact: true }).click();
		await first.getByLabel('Nombre del hito general').fill('Acreditación de inglés');
		await saveDraft(first);
		await first
			.getByRole('button', { name: 'Mostrar detalle de Práctica profesional', exact: true })
			.click();
		const second = await fixture.openStudentPage(await fixture.createStudent());
		await second.goto(first.url());
		await waitForEditor(second);
		await second
			.getByRole('button', { name: 'Mostrar detalle de Práctica profesional', exact: true })
			.click();
		const firstEnroll = first.getByRole('group', { name: 'Para cursar', exact: true });
		const secondEnroll = second.getByRole('group', { name: 'Para cursar', exact: true });
		await firstEnroll.getByLabel('Tipo de requisito').selectOption('none');
		await secondEnroll.getByLabel('Tipo de requisito').selectOption('item');
		await secondEnroll
			.getByLabel('Materia o hito requerido')
			.selectOption({ label: 'Acreditación de inglés' });
		await saveDraft(first);
		await second.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		const alternatives = second.getByRole('region', {
			name: 'Elegí qué cambio conservar',
			exact: true
		});
		await expect(
			alternatives.getByRole('button', { name: /Usar mi cambio:.*Acreditación de inglés/ })
		).toBeVisible();
		await expect(
			alternatives.getByRole('button', {
				name: 'Usar el cambio más reciente: Sin requisitos',
				exact: true
			})
		).toBeVisible();
		await second.reload();
		await waitForEditor(second);
		await alternatives
			.getByRole('button', { name: /Usar mi cambio:.*Acreditación de inglés/ })
			.click();
		await saveDraft(second);
		await first.reload();
		await waitForEditor(first);
		await first
			.getByRole('button', { name: 'Mostrar detalle de Práctica profesional', exact: true })
			.click();
		await expect(
			firstEnroll.getByLabel('Materia o hito requerido').getByRole('option', { selected: true })
		).toHaveText('Acreditación de inglés');
	});
});

test('a student saves and reopens a nested requirement without losing its structure', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL28 grupos', async (fixture) => {
		const page = await fixture.openStudentPage(await fixture.createStudent());
		await createDraft(page, fixture.identity);
		await addBasicCourse(page, 'Práctica profesional');
		for (const name of ['Inglés', 'Portugués', 'Práctica acreditada']) {
			await page.getByRole('button', { name: '+ Agregar hito general', exact: true }).click();
			await page.keyboard.insertText(name);
		}
		await saveDraft(page);
		await page
			.getByRole('button', { name: 'Mostrar detalle de Práctica profesional', exact: true })
			.click();
		const enroll = page.getByRole('group', { name: 'Para cursar', exact: true });
		await enroll.getByLabel('Tipo de requisito').selectOption('item');
		await enroll.getByLabel('Materia o hito requerido').selectOption({ label: 'Inglés' });
		await enroll.getByRole('button', { name: '+ Agregar alternativa', exact: true }).click();
		const dialog = page.getByRole('alertdialog', { name: 'Añadir condición', exact: true });
		await dialog.getByLabel('Materia o hito requerido').selectOption({ label: 'Portugués' });
		await dialog.getByRole('button', { name: 'Añadir condición', exact: true }).click();
		await expect(enroll.getByLabel('Combinación')).toHaveValue('any');
		await enroll.getByLabel('Combinación').selectOption('countOf');
		const threshold = page.getByRole('alertdialog', {
			name: 'Cantidad de condiciones',
			exact: true
		});
		await threshold.getByLabel('Condiciones mínimas').fill('1');
		await threshold.getByRole('button', { name: 'Confirmar cantidad', exact: true }).click();
		await enroll
			.getByRole('group', { name: 'Inglés completado', exact: true })
			.getByRole('button', { name: '+ Agregar condición', exact: true })
			.click();
		await dialog
			.getByLabel('Materia o hito requerido')
			.selectOption({ label: 'Práctica acreditada' });
		await dialog.getByRole('button', { name: 'Añadir condición', exact: true }).click();
		const nested = enroll.getByRole('group', { name: 'Todas estas condiciones', exact: true });
		await nested.getByRole('button', { name: 'Agregar condición al grupo', exact: true }).click();
		await dialog.getByLabel('Condición sobre').selectOption('set');
		await dialog.getByLabel('Tipo de condición').selectOption('sum');
		await dialog.getByLabel(/^Conjunto\b/).selectOption('all');
		await dialog.getByLabel('Estado requerido').selectOption('passed');
		await dialog.getByLabel('Métrica').selectOption('credits');
		await dialog.getByLabel('Total mínimo').fill('20');
		await dialog.getByRole('button', { name: 'Confirmar condición', exact: true }).click();
		await saveDraft(page);
		await page.reload();
		await waitForEditor(page);
		await page
			.getByRole('button', { name: 'Mostrar detalle de Práctica profesional', exact: true })
			.click();
		const alternatives = enroll.getByRole('group', {
			name: 'Cantidad de estas condiciones',
			exact: true
		});
		await expect(
			alternatives.getByRole('group', {
				name: 'Todas estas condiciones',
				exact: true
			})
		).toBeVisible();
		await expect(enroll).toContainText('Inglés completado');
		await expect(enroll).toContainText('Portugués completado');
		await expect(enroll).toContainText('Práctica acreditada completado');
		await expect(enroll).toContainText('20 créditos');
	});
});

test('a student resumes an incomplete graduation block and simulates without changing the saved draft', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL30 graduación', async (fixture) => {
		const page = await fixture.openStudentPage(await fixture.createStudent());
		await createDraft(page, fixture.identity);
		await addBasicCourse(page, 'Álgebra');
		await page
			.getByRole('button', { name: '+ Agregar condición de graduación', exact: true })
			.click();
		const block = page.getByRole('group', { name: 'Condición de graduación 1', exact: true });
		await block.getByLabel('Etiqueta', { exact: true }).fill('Formación completa');
		await saveDraft(page);
		await page.reload();
		await waitForEditor(page);
		await expect(block.getByLabel('Etiqueta', { exact: true })).toHaveValue('Formación completa');
		await expect(block.getByLabel('Tipo de requisito')).toHaveValue('unknown');
		await block.getByLabel('Tipo de requisito').selectOption('item');
		await block.getByLabel('Materia o hito requerido').selectOption({ label: 'Álgebra' });
		await block.getByLabel('Estado requerido').selectOption('passed');
		await saveDraft(page);
		await page.reload();
		await waitForEditor(page);
		await expect(block.getByLabel('Estado requerido')).toHaveValue('passed');
		await page.getByText('Probar graduación', { exact: true }).click();
		await page.getByLabel('Estado simulado de Álgebra').selectOption('passed');
		await expect(
			page.getByRole('status').filter({ hasText: 'Graduación simulada: 100%' })
		).toBeVisible();
		await expect(
			page.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();
		await page.reload();
		await waitForEditor(page);
		await page.getByText('Probar graduación', { exact: true }).click();
		await expect(page.getByLabel('Estado simulado de Álgebra')).toHaveValue('notTaken');
		await expect(
			page.getByRole('status').filter({ hasText: 'Graduación simulada: 0%' })
		).toBeVisible();
	});
});
