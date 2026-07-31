import { expect, test } from './fixtures';
import * as fs from 'fs/promises';

const representativePlans = [
	{
		slug: 'issd-tscdia',
		shortSlug: 'issd-tscdia',
		degreeName: 'Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial',
		courseName: 'Álgebra'
	},
	{
		slug: 'unca-fca-tupazsa',
		shortSlug: 'unca-fca-tupazsa',
		degreeName: 'Tecnicatura Universitaria en Producción Animal de Zonas Áridas y Semiáridas',
		courseName: 'Electiva'
	},
	{
		slug: 'utn-frcu-isi-2023',
		shortSlug: 'utn-frcu-isi',
		degreeName: 'Ingeniería en Sistemas de Información',
		courseName: 'Álgebra y Geometría Analítica'
	},
	{
		slug: 'utn-frcu-ic-2023',
		shortSlug: 'utn-frcu-ic',
		degreeName: 'Ingeniería Civil',
		courseName: 'Proyecto Final'
	},
	{
		slug: 'unlp-fahce-pm-2003',
		shortSlug: 'unlp-fahce-pm',
		degreeName: 'Profesorado de Matemática',
		courseName: 'Francés'
	},
	{
		slug: 'unlam-diit-ii-2023',
		shortSlug: 'unlam-diit-ii',
		degreeName: 'Ingeniería Informática',
		courseName: 'Inglés Nivel I'
	}
] as const;

test.describe('export and API matrix', () => {
	for (const plan of representativePlans) {
		test(`${plan.slug} responds correctly for JSON, markdown, and plaintext`, async ({
			request
		}) => {
			const jsonResponse = await request.get(`/${plan.shortSlug}`, {
				headers: { Accept: 'application/json' }
			});
			expect(jsonResponse.status()).toBe(200);
			expect(jsonResponse.headers()['content-type']).toContain('application/json');
			const jsonData = await jsonResponse.json();
			expect(jsonData.info.degreeName).toBe(plan.degreeName);
			expect(Array.isArray(jsonData.items)).toBe(true);
			expect(jsonData.items.length).toBeGreaterThan(0);
			expect(jsonData.items[0]).toHaveProperty('kind');
			expect(jsonData.items[0]).toHaveProperty('placements');

			const markdownResponse = await request.get(`/${plan.shortSlug}`, {
				headers: { Accept: 'text/markdown' }
			});
			expect(markdownResponse.status()).toBe(200);
			expect(markdownResponse.headers()['content-type']).toContain('text/markdown');
			const markdown = await markdownResponse.text();
			expect(markdown).toContain(plan.degreeName);
			expect(markdown).toContain('## Materias');
			expect(markdown).toContain(plan.courseName);

			const plaintextResponse = await request.get(`/${plan.shortSlug}`, {
				headers: { Accept: 'text/plain' }
			});
			expect(plaintextResponse.status()).toBe(200);
			expect(plaintextResponse.headers()['content-type']).toContain('text/plain');
			const plaintext = await plaintextResponse.text();
			expect(plaintext).toContain(plan.degreeName.toUpperCase());
			expect(plaintext).toContain('MATERIAS');
			expect(plaintext).toContain(plan.courseName);
		});

		test(`${plan.slug} exports CSV, JSON, and TOON`, async ({ page, studyPlan }) => {
			await studyPlan.goto(plan.slug);

			for (const format of ['CSV', 'JSON', 'TOON'] as const) {
				const downloadPromise = page.waitForEvent('download');
				await studyPlan.getExportButton(format).click();
				const download = await downloadPromise;
				const filePath = await download.path();
				const content = await fs.readFile(filePath, 'utf-8');

				expect(content).toContain(plan.courseName);
			}
		});
	}
});
