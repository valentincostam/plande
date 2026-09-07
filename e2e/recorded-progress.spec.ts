import { expect, test } from './fixtures';

test('keeps saved course history when its enrollment requirement no longer holds', async ({
	page
}) => {
	const main = page.getByRole('main');
	const course = page.getByRole('button', { name: /^Análisis Matemático II,/ });
	const details = page.getByRole('region', { name: 'Detalles de Análisis Matemático II' });
	const grade = details.getByRole('spinbutton', {
		name: 'Nota de aprobación de Análisis Matemático II'
	});
	const expectRecordedHistory = async () => {
		await expect(course).toHaveAccessibleName(/bloqueada por correlativas/i);
		await expect(
			page.getByRole('status', { name: 'Estado registrado de Análisis Matemático II: Aprobada' })
		).toBeVisible();
		await course.click();
		await expect(details).toBeVisible();
		await expect(grade).toHaveValue('8');
	};

	await page.goto('/utn-frcu-isi?s=n8an36a&n=n8h', { waitUntil: 'load' });
	await expect(main).toHaveAttribute('aria-busy', 'false');
	await expectRecordedHistory();

	await page.reload({ waitUntil: 'load' });
	await expect(main).toHaveAttribute('aria-busy', 'false');
	await expectRecordedHistory();

	await page.goto('/utn-frcu-isi-2023', { waitUntil: 'load' });
	await expect(main).toHaveAttribute('aria-busy', 'false');
	await expectRecordedHistory();
});

test('keeps a saved gated milestone completion when its requirements no longer hold', async ({
	page
}) => {
	await page.goto('/uns-dcs-le-2017?s=n36a', { waitUntil: 'load' });
	await expect(page.getByRole('main')).toHaveAttribute('aria-busy', 'false');

	const milestone = page.getByRole('combobox', {
		name: 'Estado de Título intermedio: Enfermero/a: Completado',
		exact: true
	});
	await expect(milestone).toBeEnabled();
	await expect(milestone.getByRole('option', { name: 'Completado' })).toBeDisabled();
});
