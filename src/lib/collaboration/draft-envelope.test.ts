import { describe, expect, test } from 'vitest';
import {
	buildOfferSearchText,
	createDraftEnvelope,
	findOfferMatches,
	parseOfferIdentity
} from './draft-envelope';

describe('offer identity', () => {
	test('keeps campus and modality in the identity when academic rules differ', () => {
		const offer = parseOfferIdentity({
			university: 'Universidad Tecnológica Nacional',
			faculty: 'Facultad Regional Córdoba',
			offer: 'Ingeniería en Sistemas de Información',
			campus: 'Córdoba',
			modality: 'Presencial'
		});

		expect(offer).toEqual({
			university: 'Universidad Tecnológica Nacional',
			faculty: 'Facultad Regional Córdoba',
			offer: 'Ingeniería en Sistemas de Información',
			campus: 'Córdoba',
			modality: 'Presencial'
		});
	});

	test('rejects an identity with only a career name', () => {
		expect(() => parseOfferIdentity({ offer: 'Abogacía' })).toThrow(
			'Indicá la universidad y la facultad de la oferta.'
		);
	});
});

describe('offer search', () => {
	test('matches terms across university, faculty, offer, campus and modality', () => {
		const cordoba = parseOfferIdentity({
			university: 'Universidad Tecnológica Nacional',
			faculty: 'Facultad Regional Córdoba',
			offer: 'Ingeniería en Sistemas de Información',
			campus: 'Córdoba',
			modality: 'Presencial'
		});
		const remote = parseOfferIdentity({
			university: 'Universidad Tecnológica Nacional',
			faculty: 'Facultad Regional Buenos Aires',
			offer: 'Ingeniería en Sistemas de Información',
			modality: 'A distancia'
		});

		expect(findOfferMatches('cordoba sistemas', [remote, cordoba])).toEqual([cordoba]);
		expect(buildOfferSearchText(cordoba)).toContain('presencial');
	});
});

describe('draft envelope', () => {
	test('keeps incomplete content separate from a published study plan', () => {
		const draft = createDraftEnvelope({
			id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
			offer: {
				university: 'Universidad Nacional de Entre Ríos',
				faculty: 'Facultad de Ciencias de la Administración',
				offer: 'Contador Público'
			},
			year: null,
			sources: [
				{
					label: 'Plan compartido por estudiantes',
					url: 'https://drive.google.com/example'
				}
			],
			content: { sections: [] }
		});

		expect(draft.year).toBeNull();
		expect(draft.content).toEqual({ sections: [] });
		expect(draft).not.toHaveProperty('info');
	});

	test('accepts accessible sources without inferring an official domain', () => {
		const draft = createDraftEnvelope({
			id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
			offer: {
				university: 'Universidad Nacional de Entre Ríos',
				faculty: 'Facultad de Ciencias de la Administración',
				offer: 'Contador Público'
			},
			year: 2024,
			sources: [{ label: 'Centro de estudiantes', url: 'https://drive.google.com/example' }],
			content: {}
		});

		expect(draft.sources[0]).toEqual({
			label: 'Centro de estudiantes',
			url: 'https://drive.google.com/example'
		});
	});

	test('keeps an integer plan year without imposing an arbitrary calendar range', () => {
		const draft = createDraftEnvelope({
			id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
			offer: {
				university: 'Universidad Nacional de Entre Ríos',
				faculty: 'Facultad de Ciencias de la Administración',
				offer: 'Contador Público'
			},
			year: 1800,
			sources: [],
			content: {}
		});

		expect(draft.year).toBe(1800);
		expect(draft.sources).toEqual([]);
	});
});
