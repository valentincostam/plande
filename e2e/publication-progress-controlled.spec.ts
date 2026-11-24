import { expect, test } from '@playwright/test';
import { withControlledPublishedPlan } from './helpers/controlled-published-plan';
import { saveDraft, waitForEditor } from './helpers/draft-editor';
import { getCourseButton, getCourseStateControl, setCourseState } from './helpers/study-plan';

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Requires local controlled collaboration.'
);
test.use({ trace: 'off', actionTimeout: 5000 });

const savedProgress = (page: Parameters<typeof setCourseState>[0]) =>
	page.getByRole('status').filter({ hasText: 'Progreso privado guardado.' });

test('keeps private progress when a published correction retires an item', async ({ browser }) => {
	await withControlledPublishedPlan(
		browser,
		'VAL36 progreso publicado',
		async (fixture) => {
			const historical = fixture.items[0]!;
			const current = fixture.items[1]!;
			const owner = await fixture.createStudent();
			const currentDevice = await fixture.openStudentPage(owner);

			await currentDevice.goto(`/${fixture.slug}`);
			await expect(currentDevice.getByRole('main')).toHaveAttribute('aria-busy', 'false');
			await setCourseState(currentDevice, historical.name, 'Aprobada');
			await getCourseButton(currentDevice, historical.name).click();
			await currentDevice
				.getByRole('spinbutton', { name: `Nota de aprobación de ${historical.name}`, exact: true })
				.fill('8');
			await currentDevice.keyboard.press('Tab');
			await expect(savedProgress(currentDevice)).toBeVisible();

			await setCourseState(currentDevice, current.name, 'Aprobada');
			await getCourseButton(currentDevice, current.name).click();
			await currentDevice
				.getByRole('spinbutton', { name: `Nota de aprobación de ${current.name}`, exact: true })
				.fill('9');
			await currentDevice.keyboard.press('Tab');
			await expect(savedProgress(currentDevice)).toBeVisible();
			await fixture.assertServerProgress(owner, [
				{ itemId: historical.id, state: 'passed', grade: 8 },
				{ itemId: current.id, state: 'passed', grade: 9 }
			]);

			const staleDevice = await fixture.openStudentPage(owner);
			await staleDevice.goto(`/${fixture.slug}`);
			await expect(staleDevice.getByRole('main')).toHaveAttribute('aria-busy', 'false');
			await expect(
				staleDevice.getByRole('button', { name: historical.name, exact: true })
			).toBeVisible();

			await currentDevice
				.getByText('Proponer corrección', { exact: true })
				.filter({ visible: true })
				.click();
			const proposal = currentDevice.getByRole('form', {
				name: 'Proponer corrección',
				exact: true
			});
			await proposal
				.getByLabel('Argumento', { exact: true })
				.fill('La fuente publicada retiró una materia y agregó una condición.');
			await proposal.getByRole('button', { name: 'Proponer corrección', exact: true }).click();
			await expect(currentDevice).toHaveURL(/\/draft\/[0-9a-f-]{36}$/);
			const draftUrl = currentDevice.url();
			await waitForEditor(currentDevice);

			await currentDevice
				.getByRole('button', { name: `Mostrar detalle de ${historical.name}`, exact: true })
				.click();
			await currentDevice
				.getByRole('button', { name: `Retirar ${historical.name}`, exact: true })
				.click();
			const retireDialog = currentDevice.getByRole('alertdialog');
			await expect(retireDialog).toContainText(
				'El progreso y las notas ya registrados se conservan.'
			);
			await retireDialog
				.getByRole('button', { name: 'Retirar de la corrección', exact: true })
				.click();

			await currentDevice
				.getByRole('button', { name: '+ Agregar condición de graduación', exact: true })
				.click();
			await currentDevice.getByLabel('Etiqueta', { exact: true }).fill('Graduación mínima');
			const completion = currentDevice.getByRole('group', {
				name: 'Requisito de graduación',
				exact: true
			});
			await completion
				.getByRole('combobox', { name: 'Tipo de requisito', exact: true })
				.selectOption('item');
			await completion
				.getByRole('combobox', { name: 'Materia o hito requerido', exact: true })
				.selectOption(current.id);
			await completion
				.getByRole('combobox', { name: 'Estado requerido', exact: true })
				.selectOption('passed');
			await saveDraft(currentDevice);

			const reviewers = await Promise.all([
				fixture.openStudentPage(await fixture.createStudent()),
				fixture.openStudentPage(await fixture.createStudent())
			]);
			for (const reviewer of reviewers) {
				await reviewer.goto(`${draftUrl}/review`);
				for (const label of ['identidad', 'Fuente publicada', current.name, 'Graduación mínima']) {
					const check = reviewer.getByRole('group', { name: `Comprobar ${label}`, exact: true });
					await check.getByRole('checkbox').check();
					await check.getByRole('button', { name: 'Marcar comprobado', exact: true }).click();
					await expect(check.getByText('Comprobado', { exact: true })).toBeVisible();
				}
				await reviewer
					.getByRole('button', { name: 'Aprobar revisión completa', exact: true })
					.click();
			}
			await reviewers[0]!.getByRole('button', { name: 'Publicar corrección', exact: true }).click();
			await expect(reviewers[0]).toHaveURL(`/${fixture.slug}`);

			const freshDevice = await fixture.openStudentPage(owner);
			await freshDevice.goto(`/${fixture.slug}`);
			await expect(freshDevice.getByRole('main')).toHaveAttribute('aria-busy', 'false');
			await currentDevice.goto(`/${fixture.slug}`);
			await expect(currentDevice.getByRole('main')).toHaveAttribute('aria-busy', 'false');
			await expect(
				currentDevice
					.getByRole('status')
					.filter({ hasText: 'El plan recibió correcciones. Tu progreso se conserva.' })
			).toBeVisible();
			await expect(
				freshDevice.getByRole('button', { name: historical.name, exact: true })
			).toHaveCount(0);
			await expect(getCourseStateControl(freshDevice, current.name)).toHaveAccessibleName(
				`Estado de ${current.name}: Aprobada`
			);
			await getCourseButton(freshDevice, current.name).click();
			await expect(
				freshDevice.getByRole('spinbutton', {
					name: `Nota de aprobación de ${current.name}`,
					exact: true
				})
			).toHaveValue('9');

			await getCourseButton(staleDevice, current.name).click();
			await staleDevice
				.getByRole('spinbutton', { name: `Nota de aprobación de ${current.name}`, exact: true })
				.fill('10');
			await staleDevice.keyboard.press('Tab');
			await expect(savedProgress(staleDevice)).toBeVisible();
			await fixture.assertServerProgress(owner, [
				{ itemId: historical.id, state: 'passed', grade: 8 },
				{ itemId: current.id, state: 'passed', grade: 10 }
			]);
			await freshDevice.reload();
			await expect(
				freshDevice.getByRole('button', { name: historical.name, exact: true })
			).toHaveCount(0);
			expect(await fixture.snapshotCount()).toBe(2);
		},
		{
			items: [
				{ id: 'materia-historica', name: 'Materia histórica' },
				{ id: 'materia-vigente', name: 'Materia vigente' }
			]
		}
	);
});
