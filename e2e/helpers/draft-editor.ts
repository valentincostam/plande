import { strict as assert } from 'node:assert';
import { expect, type Locator, type Page } from '@playwright/test';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getPlacementEditor = (section: Locator): Locator =>
	section.getByRole('region', { name: 'Ubicaciones', exact: true });

export const getPlacementSummary = (placementEditor: Locator, sectionName: string): Locator =>
	placementEditor.getByText(new RegExp(`^Ubicación [^:]+: ${escapeRegExp(sectionName)}\\s*·`));

export const waitForEditor = async (page: Page) => {
	await expect(page.getByRole('button', { name: '+ Agregar sección', exact: true })).toBeEnabled();
};

export const saveDraft = async (page: Page) => {
	await page.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
	await expect(
		page.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
	).toBeVisible();
};

export const selectOfferField = async (page: Page, label: string, value: string) => {
	await page.getByRole('combobox', { name: label, exact: true }).click();
	await page
		.getByPlaceholder(`Buscar ${label.toLocaleLowerCase()}...`, { exact: true })
		.fill(value);
	await page
		.getByRole('option', { name: value, exact: true })
		.or(page.getByRole('option', { name: `Agregar “${value}”`, exact: true }))
		.click();
};

export const createDraft = async (
	page: Page,
	identity: { university: string; faculty: string; offer: string }
) => {
	await page.goto('/plans/new');
	await selectOfferField(page, 'Universidad', identity.university);
	await selectOfferField(page, 'Facultad o unidad académica', identity.faculty);
	await selectOfferField(page, 'Carrera', identity.offer);
	await page.getByLabel('Año del plan, si figura en la fuente', { exact: true }).fill('2036');
	await page.getByRole('button', { name: 'Crear o continuar borrador' }).click();
	await expect(page).toHaveURL(/\/draft\/[0-9a-f-]{36}$/);
	const planId = page.url().split('/').at(-1);
	assert.ok(planId, 'Draft creation must return a stable link.');
	await waitForEditor(page);
	return planId;
};

export const addBasicCourse = async (page: Page, courseName = 'Álgebra') => {
	await page.getByRole('button', { name: '+ Agregar sección', exact: true }).click();
	await expect(page.getByLabel('Título de sección')).toBeFocused();
	await page.getByLabel('Título de sección').fill('Formación básica');
	await page.getByRole('button', { name: '+ Materia', exact: true }).click();
	await expect(page.getByLabel('Nombre de materia')).toBeFocused();
	await page.getByLabel('Nombre de materia').fill(courseName);
};
