import { test, expect } from './fixtures';
import * as fs from 'fs/promises';

test.describe('Export - CSV', () => {
	test('clicking CSV button triggers file download', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('CSV').click();
		const download = await downloadPromise;

		expect(download.suggestedFilename()).toMatch(/\.csv$/);
	});

	test('downloaded CSV has BOM and correct headers', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('CSV').click();
		const download = await downloadPromise;

		const filePath = await download.path();
		const content = await fs.readFile(filePath, 'utf-8');

		expect(content).toMatch(/^\uFEFF/);
		expect(content).toContain(
			'Código,Materia,Año,Período/Modalidad,Horas,Tipo,Atributos,Estado,Nota'
		);
	});

	test('CSV contains course with updated state after change', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('CSV').click();
		const download = await downloadPromise;

		const filePath = await download.path();
		const content = await fs.readFile(filePath, 'utf-8');

		const lines = content.split('\n');
		const algebraLine = lines.find((line) => line.includes('Álgebra y Geometría Analítica'));

		expect(algebraLine).toBeDefined();
		expect(algebraLine).toContain('Aprobada');
	});

	test('button shows "Descargado" feedback after download', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('CSV').click();
		await downloadPromise;

		await expect(page.getByRole('button', { name: 'Descargado' })).toBeVisible();
	});
});

test.describe('Export - JSON', () => {
	test('clicking JSON button triggers file download', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('JSON').click();
		const download = await downloadPromise;

		expect(download.suggestedFilename()).toMatch(/\.json$/);
	});

	test('downloaded JSON is valid and parseable', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('JSON').click();
		const download = await downloadPromise;

		const filePath = await download.path();
		const content = await fs.readFile(filePath, 'utf-8');

		const parsed = JSON.parse(content);

		expect(Array.isArray(parsed)).toBe(true);
		expect(parsed.length).toBeGreaterThan(0);

		const firstCourse = parsed[0];
		expect(firstCourse).toHaveProperty('materia');
		expect(firstCourse).toHaveProperty('estado');
		expect(firstCourse).toHaveProperty('año');
	});

	test('JSON contains course with updated state after change', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('JSON').click();
		const download = await downloadPromise;

		const filePath = await download.path();
		const content = await fs.readFile(filePath, 'utf-8');
		const parsed = JSON.parse(content);

		const algebra = parsed.find(
			(course: { materia: string }) => course.materia === 'Álgebra y Geometría Analítica'
		);

		expect(algebra).toBeDefined();
		expect(algebra.estado).toBe('Aprobada');
	});

	test('button shows "Descargado" feedback after download', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('JSON').click();
		await downloadPromise;

		await expect(page.getByRole('button', { name: 'Descargado' })).toBeVisible();
	});
});

test.describe('Export - TOON', () => {
	test('clicking TOON button triggers file download', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('TOON').click();
		const download = await downloadPromise;

		expect(download.suggestedFilename()).toMatch(/\.toon$/);
	});

	test('downloaded TOON has correct header format', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('TOON').click();
		const download = await downloadPromise;

		const filePath = await download.path();
		const content = await fs.readFile(filePath, 'utf-8');

		expect(content).toMatch(
			/^materias\[\d+\]\{codigo,materia,año,periodo,horas,tipo,atributos,estado,nota\}:/
		);
	});

	test('TOON contains course data with updated state', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('TOON').click();
		const download = await downloadPromise;

		const filePath = await download.path();
		const content = await fs.readFile(filePath, 'utf-8');

		const lines = content.split('\n');
		const dataLines = lines.filter((line) => line.startsWith('  '));

		expect(dataLines.length).toBeGreaterThan(0);

		const algebraLine = dataLines.find((line) => line.includes('Álgebra y Geometría Analítica'));
		expect(algebraLine).toBeDefined();
		expect(algebraLine).toContain('Aprobada');
	});

	test('button shows "Descargado" feedback after download', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getExportButton('TOON').click();
		await downloadPromise;

		await expect(page.getByRole('button', { name: 'Descargado' })).toBeVisible();
	});
});
