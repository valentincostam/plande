import { test, expect } from '@playwright/test';

test.describe('LLM API content parity', () => {
	test('markdown response includes all major sections', async ({ request }) => {
		const response = await request.get('/utn-frcu-isi', {
			headers: { Accept: 'text/markdown' }
		});

		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('text/markdown');

		const content = await response.text();

		// Verify major sections exist
		expect(content).toContain('# '); // Title
		expect(content).toContain('## Configuración de Progreso');
		expect(content).toContain('## Orden de Prioridad Sugerido');
		expect(content).toContain('## Materias');
		expect(content).toContain('## Fuentes Oficiales');
	});

	test('plaintext response includes all major sections', async ({ request }) => {
		const response = await request.get('/utn-frcu-isi', {
			headers: { Accept: 'text/plain' }
		});

		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('text/plain');

		const content = await response.text();

		expect(content).toContain('CONFIGURACIÓN DE PROGRESO');
		expect(content).toContain('ORDEN DE PRIORIDAD SUGERIDO');
		expect(content).toContain('MATERIAS');
		expect(content).toContain('FUENTES OFICIALES');
	});

	test('priority section includes courses sorted by dependents', async ({ request }) => {
		const response = await request.get('/utn-frcu-isi', {
			headers: { Accept: 'text/markdown' }
		});

		const content = await response.text();

		// Priority section should have markdown table with courses
		expect(content).toContain('| # | Materia | Año | Desbloquea |');

		// Should have numbered rows with course data
		expect(content).toMatch(/\| 1 \| .+ \| \d+º \| \d+ \|/);
	});

	test('markdown includes known course names', async ({ request }) => {
		const response = await request.get('/utn-frcu-isi', {
			headers: { Accept: 'text/markdown' }
		});
		const content = await response.text();

		// Verify some known courses from the study plan appear
		expect(content).toContain('Álgebra y Geometría Analítica');
		expect(content).toContain('Análisis Matemático I');
		expect(content).toContain('Proyecto Final');
	});

	test('json response returns structured data', async ({ request }) => {
		const response = await request.get('/utn-frcu-isi', {
			headers: { Accept: 'application/json' }
		});

		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('application/json');

		const data = await response.json();

		expect(data).toHaveProperty('degreeName');
		expect(data).toHaveProperty('universityName');
		expect(data).toHaveProperty('courses');
		expect(Array.isArray(data.courses)).toBe(true);
		expect(data.courses.length).toBeGreaterThan(0);
	});
});
