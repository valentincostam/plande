import { expect, test } from '@playwright/test';
import {
	addBasicCourse,
	createDraft,
	getPlacementEditor,
	getPlacementSummary,
	saveDraft,
	selectOfferField,
	waitForEditor
} from './helpers/draft-editor';
import { withControlledDraft } from './helpers/controlled-draft';

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Set PLANDE_CONTROLLED_COLLABORATION=1 after root enables the local collaboration app.'
);

test.use({ trace: 'off', actionTimeout: 5000 });

test('a student reuses an empty-source draft and shares its unreviewed link', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL27 compartir', async (fixture) => {
		const student = await fixture.createStudent();
		const page = await fixture.openStudentPage(student);
		const browserErrors: string[] = [];
		page.on('pageerror', (error) => browserErrors.push(error.message));
		const planId = await createDraft(page, fixture.identity);

		await page.goto('/plans/new');
		await selectOfferField(page, 'Universidad', fixture.identity.university);
		await selectOfferField(page, 'Facultad o unidad académica', fixture.identity.faculty);
		await selectOfferField(page, 'Carrera', fixture.identity.offer);
		await page.getByLabel('Año del plan, si figura en la fuente', { exact: true }).fill('2036');
		await page.getByRole('button', { name: 'Crear o continuar borrador' }).click();
		await expect(page).toHaveURL(new RegExp(`/draft/${planId}$`));

		const anonymous = await browser.newContext();
		try {
			const anonymousPage = await anonymous.newPage();
			await anonymousPage.goto('/plans/new');
			await expect(anonymousPage.getByRole('link', { name: 'Volver a Plande' })).toBeVisible();
			await expect(anonymousPage.getByRole('link', { name: 'Iniciá sesión' })).toBeVisible();
			await expect(anonymousPage.getByRole('heading', { name: 'Coincidencias' })).not.toBeVisible();
			await anonymousPage.goto(`/draft/${planId}`);
			await expect(anonymousPage.getByRole('status')).toContainText('borrador sin revisión');
			await expect(
				anonymousPage.getByRole('heading', { name: fixture.identity.offer, exact: true })
			).toBeVisible();
			await expect(
				anonymousPage.getByRole('button', { name: 'Agregar sección' })
			).not.toBeVisible();
			await expect(
				anonymousPage.getByRole('heading', { name: 'Fuentes para comparar' })
			).toBeVisible();
		} finally {
			await anonymous.close();
		}
		expect(browserErrors).toEqual([]);
	});
});

test('a student saves, reloads, and clears course metadata', async ({ browser }) => {
	await withControlledDraft(browser, 'VAL27 metadatos', async (fixture) => {
		const student = await fixture.createStudent();
		const page = await fixture.openStudentPage(student);
		const browserErrors: string[] = [];
		page.on('pageerror', (error) => browserErrors.push(error.message));
		await createDraft(page, fixture.identity);
		await addBasicCourse(page);
		await expect(
			page.getByRole('button', { name: 'Mostrar detalle de Álgebra', exact: true })
		).toHaveAttribute('aria-expanded', 'true');
		await page
			.getByRole('combobox', { name: 'Tipo', exact: true })
			.selectOption({ label: 'Electiva' });
		await page.getByLabel('Código').fill('ALG-101');
		await page.getByLabel('Horas', { exact: true }).fill('96');
		await page.getByLabel('Créditos').fill('8');
		await page.getByLabel('Etiquetas, separadas por coma').fill('base, matemática');
		await page.getByRole('button', { name: '+ Agregar hito general', exact: true }).click();
		await expect(page.getByLabel('Nombre del hito general')).toBeFocused();
		await page.getByLabel('Nombre del hito general').fill('Acreditación de inglés');
		await saveDraft(page);
		await expect(page.getByRole('button', { name: 'Guardar cambios', exact: true })).toBeDisabled();

		await page.reload();
		await waitForEditor(page);
		await expect(page.getByLabel('Título de sección')).toHaveValue('Formación básica');
		await expect(page.getByLabel('Nombre de materia')).toHaveValue('Álgebra');
		await expect(page.getByLabel('Nombre del hito general')).toHaveValue('Acreditación de inglés');
		await page.getByRole('button', { name: 'Mostrar detalle de Álgebra', exact: true }).click();
		await expect(page.getByRole('combobox', { name: 'Tipo', exact: true })).toHaveValue('elective');
		await expect(page.getByLabel('Código')).toHaveValue('ALG-101');
		await expect(page.getByLabel('Horas', { exact: true })).toHaveValue('96');
		await expect(page.getByLabel('Créditos')).toHaveValue('8');
		await expect(page.getByLabel('Etiquetas, separadas por coma')).toHaveValue('base, matemática');
		await page.getByLabel('Horas', { exact: true }).fill('');
		await saveDraft(page);

		await page.reload();
		await waitForEditor(page);
		await page.getByRole('button', { name: 'Mostrar detalle de Álgebra', exact: true }).click();
		await expect(page.getByLabel('Horas', { exact: true })).toHaveValue('');
		expect(browserErrors).toEqual([]);
	});
});

test('a student removes a course placement and its now-empty second section', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL27 ubicaciones', async (fixture) => {
		const student = await fixture.createStudent();
		const page = await fixture.openStudentPage(student);
		await createDraft(page, fixture.identity);
		await addBasicCourse(page);
		await page.getByRole('button', { name: '+ Agregar sección', exact: true }).click();
		await page.keyboard.insertText('Formación avanzada');
		const advancedSection = page.getByRole('region', { name: 'Formación avanzada', exact: true });
		await expect(advancedSection).toBeVisible();
		const basicPlacementEditor = getPlacementEditor(
			page.getByRole('region', { name: 'Formación básica', exact: true })
		);
		await basicPlacementEditor
			.getByRole('button', { name: 'Agregar ubicación', exact: true })
			.click();
		await basicPlacementEditor
			.getByLabel('Sección para la nueva ubicación')
			.selectOption({ label: 'Formación avanzada' });
		await basicPlacementEditor
			.getByRole('button', { name: 'Agregar ubicación', exact: true })
			.click();
		await saveDraft(page);

		await page.reload();
		await waitForEditor(page);
		const reloadedAdvancedSection = page.getByRole('region', {
			name: 'Formación avanzada',
			exact: true
		});
		await expect(reloadedAdvancedSection.getByLabel('Nombre de materia')).toHaveValue('Álgebra');
		await reloadedAdvancedSection
			.getByRole('button', { name: 'Retirar Formación avanzada', exact: true })
			.click();
		const blockedRetirement = page.getByRole('alertdialog', {
			name: 'Retirar Formación avanzada',
			exact: true
		});
		await expect(blockedRetirement).toContainText(
			'Antes de retirarlo, corregí las referencias o mové los elementos que dependen de él.'
		);
		await expect(
			blockedRetirement.getByRole('button', { name: 'Retirar del borrador', exact: true })
		).not.toBeVisible();
		await blockedRetirement.getByRole('button', { name: 'Volver', exact: true }).click();
		await reloadedAdvancedSection
			.getByRole('button', { name: 'Mostrar detalle de Álgebra', exact: true })
			.click();
		const advancedPlacementEditor = getPlacementEditor(reloadedAdvancedSection);
		await getPlacementSummary(advancedPlacementEditor, 'Formación avanzada').click();
		await advancedPlacementEditor
			.getByRole('button', { name: 'Retirar ubicación', exact: true })
			.click();
		await expect(reloadedAdvancedSection.getByLabel('Nombre de materia')).not.toBeVisible();
		await reloadedAdvancedSection
			.getByRole('button', { name: 'Retirar Formación avanzada', exact: true })
			.click();
		await expect(
			page.getByRole('heading', { name: 'Retirar Formación avanzada', exact: true })
		).toBeVisible();
		await page.getByRole('button', { name: 'Retirar del borrador', exact: true }).click();
		await expect(reloadedAdvancedSection).not.toBeVisible();
		await saveDraft(page);

		await page.reload();
		await waitForEditor(page);
		await expect(
			page.getByRole('region', { name: 'Formación avanzada', exact: true })
		).not.toBeVisible();
	});
});

test('a student inserts sections and courses beneath their visible predecessors', async ({
	browser
}) => {
	await withControlledDraft(browser, 'VAL27 inserciones', async (fixture) => {
		const student = await fixture.createStudent();
		const page = await fixture.openStudentPage(student);
		await createDraft(page, fixture.identity);
		await addBasicCourse(page);
		const basicSection = page.getByRole('region', { name: 'Formación básica', exact: true });
		await expect(
			basicSection.getByRole('button', { name: 'Mostrar detalle de Álgebra', exact: true })
		).toHaveAttribute('aria-expanded', 'true');

		await page.getByRole('button', { name: '+ Agregar sección', exact: true }).click();
		await page.keyboard.insertText('Formación avanzada');
		await basicSection.getByRole('button', { name: 'Agregar sección debajo', exact: true }).click();
		await page.keyboard.insertText('Formación intermedia');
		await basicSection
			.getByRole('button', { name: 'Insertar materia debajo', exact: true })
			.click();
		await page.keyboard.insertText('Geometría');
		await basicSection
			.getByRole('button', { name: 'Mostrar detalle de Geometría', exact: true })
			.click();

		const structure = page.getByRole('region', { name: 'Estructura del plan', exact: true });
		const orderedSections = structure.getByRole('region', {
			name: /^(Formación básica|Formación intermedia|Formación avanzada|Hitos generales)$/
		});
		await expect(orderedSections).toHaveText([
			/Formación básica/,
			/Formación intermedia/,
			/Formación avanzada/,
			/Hitos generales/
		]);
		const insertedCourses = basicSection.getByRole('textbox', { name: 'Nombre de materia' });
		await expect(insertedCourses).toHaveCount(2);
		await expect(insertedCourses.nth(0)).toHaveValue('Álgebra');
		await expect(insertedCourses.nth(1)).toHaveValue('Geometría');
		await saveDraft(page);

		await page.reload();
		await waitForEditor(page);
		const reloadedStructure = page.getByRole('region', {
			name: 'Estructura del plan',
			exact: true
		});
		await expect(
			reloadedStructure.getByRole('region', {
				name: /^(Formación básica|Formación intermedia|Formación avanzada|Hitos generales)$/
			})
		).toHaveText([
			/Formación básica/,
			/Formación intermedia/,
			/Formación avanzada/,
			/Hitos generales/
		]);
		const reloadedCourses = page
			.getByRole('region', { name: 'Formación básica', exact: true })
			.getByRole('textbox', { name: 'Nombre de materia' });
		await expect(reloadedCourses).toHaveCount(2);
		await expect(reloadedCourses.nth(0)).toHaveValue('Álgebra');
		await expect(reloadedCourses.nth(1)).toHaveValue('Geometría');
	});
});

test('a student can edit the draft on a narrow keyboard-only layout', async ({ browser }) => {
	await withControlledDraft(browser, 'VAL27 móvil', async (fixture) => {
		const student = await fixture.createStudent();
		const page = await fixture.openStudentPage(student);
		await createDraft(page, fixture.identity);
		await addBasicCourse(page, 'Álgebra lineal');
		await page.getByLabel('Título de sección').fill('Formación profesional');
		await saveDraft(page);
		await page.reload();
		await waitForEditor(page);
		await page.screenshot({ path: test.info().outputPath('editor-desktop.png'), fullPage: true });
		await page.setViewportSize({ width: 390, height: 844 });
		await expect(page.getByLabel('Título de sección')).toBeVisible();
		await expect(page.getByLabel('Nombre de materia')).toBeVisible();
		await page.getByLabel('Título de sección').focus();
		await page.keyboard.press('Tab');
		await expect(
			page.getByRole('button', { name: 'Retirar Formación profesional', exact: true })
		).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(
			page.getByRole('button', { name: 'Agregar sección debajo', exact: true })
		).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(
			page.getByRole('button', { name: 'Mostrar detalle de Álgebra lineal', exact: true })
		).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(page.getByLabel('Nombre de materia')).toBeFocused();
		await page.screenshot({ path: test.info().outputPath('editor-mobile.png'), fullPage: true });
	});
});
