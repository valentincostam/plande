import { describe, expect, it } from 'vitest';
import { studyPlanToMarkdown } from './study-plan-markdown';
import { studyPlanToPlainText } from './study-plan-plaintext';
import { unsDcsLe2017 as unsPlan } from '../../routes/[slug]/data/uns-dcs-le-2017';
import { unahurIePui2024 as unahurPlan } from '../../routes/[slug]/data/unahur-ie-pui-2024';

describe('native study plan formatters', () => {
	it('renders milestone requirements without dangling references', () => {
		const markdown = studyPlanToMarkdown(unsPlan);

		expect(markdown).toContain('Examen de Suficiencia de Inglés E completado');
		expect(markdown).toContain('Educación en el Cuidado de la Salud');
	});

	it('renders quantitative requirements in markdown and plaintext', () => {
		const markdown = studyPlanToMarkdown(unahurPlan);
		const plaintext = studyPlanToPlainText(unahurPlan);

		expect(markdown).toContain('5 materias regularizadas');
		expect(plaintext).toContain('5 materias regularizadas');
	});
});
