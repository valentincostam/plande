import { expect, test } from 'vitest';
import { emptyDraftPlanContent, type DraftPlanContent } from './draft-plan-content';
import { requirementDiagnostics } from './requirement-diagnostics';

const draft = (): DraftPlanContent => ({
	...emptyDraftPlanContent(),
	document: {
		...emptyDraftPlanContent().document,
		sections: [{ id: 'basic', label: 'Básica' }],
		items: [
			{
				id: 'algebra',
				seqId: 0,
				kind: 'course',
				name: 'Álgebra',
				type: 'mandatory',
				placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
			},
			{
				id: 'analysis',
				seqId: 1,
				kind: 'course',
				name: 'Análisis',
				type: 'mandatory',
				placements: [{ id: 'analysis-basic', sectionId: 'basic' }]
			}
		]
	}
});

test('reports a missing native requirement reference without changing the draft', () => {
	const content = draft();
	content.document.items[1].requirements = {
		enroll: { type: 'item', itemId: 'physics', state: 'passed' }
	};
	const before = structuredClone(content);

	expect(requirementDiagnostics(content)).toEqual([
		'El requisito para cursar de Análisis referencia a physics, que no existe.'
	]);
	expect(content).toEqual(before);
});

test('reports a native circular requirement', () => {
	const content = draft();
	content.document.items[0].requirements = {
		enroll: { type: 'item', itemId: 'analysis', state: 'taken' }
	};
	content.document.items[1].requirements = {
		enroll: { type: 'item', itemId: 'algebra', state: 'taken' }
	};

	expect(requirementDiagnostics(content)).toEqual([
		'Hay una dependencia circular: Álgebra -> Análisis -> Álgebra.'
	]);
});

test('reports an invalid state for a milestone target', () => {
	const content = draft();
	content.document.items.push({
		id: 'thesis',
		seqId: 2,
		kind: 'milestone',
		name: 'Tesis',
		placements: []
	});
	content.document.items[1].requirements = {
		enroll: { type: 'item', itemId: 'thesis', state: 'passed' }
	};

	expect(requirementDiagnostics(content)).toEqual([
		'El requisito para cursar de Análisis solo puede referirse al hito Tesis como completado.'
	]);
});

test('keeps an unknown requirement separate from a satisfied native expression', () => {
	const content = draft();
	content.unknownRequirements.push({
		scope: 'item:analysis:enroll',
		note: 'Confirmar correlativas.'
	});

	expect(requirementDiagnostics(content)).toEqual([]);
	expect(content.unknownRequirements).toEqual([
		{ scope: 'item:analysis:enroll', note: 'Confirmar correlativas.' }
	]);
});

test('reports an incomplete graduation block before native validation', () => {
	const content = draft();
	content.document.requirements.graduation = [{ id: 'degree', label: 'Título' }];
	content.document.items[1].requirements = {
		enroll: { type: 'item', itemId: 'missing', state: 'passed' }
	};

	expect(requirementDiagnostics(content)).toEqual([
		'El requisito de egreso Título está incompleto.'
	]);
});

test('identifies the graduation block whose weight needs correction without changing it', () => {
	const content = draft();
	content.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Formación completa',
			weight: 0,
			expr: { type: 'item', itemId: 'algebra', state: 'passed' }
		}
	];
	const before = structuredClone(content);
	expect(requirementDiagnostics(content)).toEqual([
		'El requisito de graduación Formación completa necesita un peso mayor que cero.'
	]);
	expect(content).toEqual(before);
});

test('reports nested native requirements through the engine without changing expressions or unknowns', () => {
	const content = draft();
	content.document.items[1].requirements = {
		enroll: {
			type: 'all',
			rules: [
				{
					type: 'any',
					rules: [
						{ type: 'item', itemId: 'algebra', state: 'passed' },
						{ type: 'item', itemId: 'physics', state: 'passed' }
					]
				}
			]
		}
	};
	content.unknownRequirements.push({
		scope: 'item:analysis:complete',
		note: 'Confirmar requisito de aprobación.'
	});
	const before = structuredClone(content);

	expect(requirementDiagnostics(content)).toEqual([
		'El requisito para cursar de Análisis referencia a physics, que no existe.'
	]);
	expect(content).toEqual(before);
});

test('reports a missing metric for a sum', () => {
	const content = draft();
	content.document.items[1].requirements = {
		enroll: {
			type: 'sum',
			selector: { type: 'items', itemIds: ['algebra'] },
			metric: 'credits',
			min: 1,
			state: 'passed'
		}
	};

	expect(requirementDiagnostics(content)).toEqual([
		'El requisito para cursar de Análisis necesita créditos en Álgebra.'
	]);
});

test('reports invalid quantitative thresholds and selectors', () => {
	const invalidThreshold = draft();
	invalidThreshold.document.items[1].requirements = {
		enroll: {
			type: 'percent',
			selector: { type: 'items', itemIds: ['algebra'] },
			minPercent: 101,
			state: 'passed'
		}
	};
	const invalidSelector = draft();
	invalidSelector.document.items[1].requirements = {
		enroll: {
			type: 'count',
			selector: { type: 'section', sectionId: 'missing' },
			min: 1,
			state: 'passed'
		}
	};

	expect(requirementDiagnostics(invalidThreshold)).toEqual([
		'El requisito para cursar de Análisis debe tener un porcentaje entre 1 y 100.'
	]);
	expect(requirementDiagnostics(invalidSelector)).toEqual([
		'El requisito para cursar de Análisis usa una sección que no existe.'
	]);
});

test('reports invalid countOf thresholds and empty effective sets', () => {
	const nonPositive = draft();
	nonPositive.document.items[1].requirements = {
		enroll: {
			type: 'countOf',
			min: 0,
			rules: [{ type: 'item', itemId: 'algebra', state: 'passed' }]
		}
	};
	const tooHigh = draft();
	tooHigh.document.items[1].requirements = {
		enroll: {
			type: 'countOf',
			min: 2,
			rules: [{ type: 'item', itemId: 'algebra', state: 'passed' }]
		}
	};
	const emptySet = draft();
	emptySet.document.items[1].requirements = {
		enroll: {
			type: 'count',
			selector: { type: 'tag', tag: 'sin-materias' },
			min: 1,
			state: 'passed'
		}
	};

	expect(requirementDiagnostics(nonPositive)).toEqual([
		'El requisito para cursar de Análisis debe pedir al menos una condición.'
	]);
	expect(requirementDiagnostics(tooHigh)).toEqual([
		'El requisito para cursar de Análisis pide 2 condiciones, pero solo tiene 1.'
	]);
	expect(requirementDiagnostics(emptySet)).toEqual([
		'El requisito para cursar de Análisis usa un conjunto sin elementos.'
	]);
});
