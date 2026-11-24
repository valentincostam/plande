import { expect, test } from '@playwright/test';
import { withControlledPublishedPlan } from './helpers/controlled-published-plan';
import { saveDraft, waitForEditor } from './helpers/draft-editor';

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Requires local controlled collaboration.'
);
test.use({ trace: 'off', actionTimeout: 5000 });

test('publishes a reviewed correction without changing the current plan first', async ({
	browser
}) => {
	await withControlledPublishedPlan(browser, 'VAL35 propuesta', async (fixture) => {
		const author = await fixture.openStudentPage(await fixture.createStudent());
		await author.goto(`/${fixture.slug}`);
		await author
			.getByText('Proponer corrección', { exact: true })
			.filter({ visible: true })
			.click();
		const proposal = author.getByRole('form', { name: 'Proponer corrección', exact: true });
		await proposal
			.getByLabel('Argumento', { exact: true })
			.fill('La fuente publicada corrigió el nombre de la materia.');
		await proposal.getByRole('button', { name: 'Proponer corrección', exact: true }).click();
		await expect(author).toHaveURL(/\/draft\/[0-9a-f-]{36}$/);
		const draftUrl = author.url();
		await waitForEditor(author);
		await author.getByLabel('Nombre de materia', { exact: true }).fill('Materia corregida');
		await saveDraft(author);
		await author.reload();
		await expect(author.getByLabel('Nombre de materia', { exact: true })).toHaveValue(
			'Materia corregida'
		);

		await author.goto(`/${fixture.slug}`);
		await expect(
			author.getByRole('button', { name: fixture.originalCourseName, exact: true })
		).toBeVisible();
		await expect(
			author.getByRole('button', { name: 'Materia corregida', exact: true })
		).toHaveCount(0);
		const anonymous = await fixture.openAnonymousPage();
		await anonymous.goto(`${draftUrl}/review`);
		await expect(
			anonymous.getByText('Propuesta: La fuente publicada corrigió el nombre de la materia.', {
				exact: true
			})
		).toBeVisible();
		for (const label of ['Cambios propuestos', 'Antes', 'Propuesto'])
			await expect(anonymous.getByText(label, { exact: true })).toBeVisible();
		await expect(
			anonymous.getByRole('button', { name: 'Aprobar revisión completa', exact: true })
		).toHaveCount(0);
		await expect(
			anonymous.getByRole('button', { name: 'Publicar corrección', exact: true })
		).toHaveCount(0);

		const reviewers = await Promise.all([
			fixture.openStudentPage(await fixture.createStudent()),
			fixture.openStudentPage(await fixture.createStudent())
		]);
		for (const reviewer of reviewers) {
			await reviewer.goto(`${draftUrl}/review`);
			for (const label of ['identidad', 'Fuente publicada', 'Materia corregida']) {
				const check = reviewer.getByRole('group', { name: `Comprobar ${label}`, exact: true });
				await check.getByRole('checkbox').check();
				await check.getByRole('button', { name: 'Marcar comprobado', exact: true }).click();
				await expect(check.getByText('Comprobado', { exact: true })).toBeVisible();
			}
			await reviewer
				.getByRole('button', { name: 'Aprobar revisión completa', exact: true })
				.click();
			await expect(
				reviewer.getByText('Revisión completa aprobada para esta versión.', { exact: true })
			).toBeVisible();
		}

		await Promise.all(
			reviewers.map((reviewer) =>
				reviewer.getByRole('button', { name: 'Publicar corrección', exact: true }).click()
			)
		);
		await expect
			.poll(
				() =>
					reviewers.filter((reviewer) => new URL(reviewer.url()).pathname === `/${fixture.slug}`)
						.length
			)
			.toBe(1);
		const winners = reviewers.filter(
			(reviewer) => new URL(reviewer.url()).pathname === `/${fixture.slug}`
		);
		expect(winners).toHaveLength(1);
		const loser = reviewers.find((reviewer) => reviewer !== winners[0]);
		expect(loser).toBeDefined();
		await expect(loser!.getByRole('alert')).toBeVisible();
		await reviewers[0].goto(`/${fixture.slug}`);
		await expect(
			reviewers[0].getByRole('button', { name: 'Materia corregida', exact: true })
		).toBeVisible();
		await reviewers[0].getByText('Historial de publicación', { exact: true }).click();
		await expect(
			reviewers[0].getByRole('listitem').filter({ hasText: 'Versión inicial' })
		).toBeVisible();
		await expect(
			reviewers[0].getByText('La fuente publicada corrigió el nombre de la materia.', {
				exact: true
			})
		).toHaveCount(1);
		expect(await fixture.snapshotCount()).toBe(2);
	});
});
