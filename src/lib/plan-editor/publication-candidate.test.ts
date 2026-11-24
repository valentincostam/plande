import { expect, test } from 'vitest';
import { studyPlanDocumentSchema } from '$lib/study-plan-schema';
import { emptyDraftPlanContent } from './draft-plan-content';
import { publicationCandidate } from './publication-candidate';

const input = () => {
	const content = emptyDraftPlanContent();
	content.document.sections = [{ id: 'basic', label: 'Básica', year: 1 }];
	content.document.items = [
		{
			id: 'algebra',
			seqId: 4,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			credits: 6,
			tags: ['math'],
			placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
		},
		{
			id: 'analysis',
			seqId: 5,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [{ id: 'analysis-basic', sectionId: 'basic' }],
			requirements: { enroll: { type: 'item', itemId: 'algebra', state: 'passed' } }
		}
	];
	content.document.nextSeqId = 6;
	return {
		content,
		identity: {
			degreeName: 'Licenciatura en Matemática',
			degreeSlug: 'lic-matematica',
			universityName: 'Universidad Nacional',
			universitySlug: 'un',
			collegeName: 'Facultad de Ciencias',
			collegeSlug: 'ciencias',
			year: null,
			canonicalSlug: 'plan-uuid',
			campus: 'Centro',
			modality: 'Presencial'
		},
		sources: [{ id: 7, label: 'Plan oficial', url: 'https://example.edu/plan' }]
	};
};

test('builds a native plan and catalog without changing published data', () => {
	const result = publicationCandidate(input());

	expect(result).toMatchObject({
		ok: true,
		plan: {
			info: {
				degreeSlug: 'lic-matematica',
				collegeSlug: 'ciencias',
				canonicalSlug: 'plan-uuid',
				campus: 'Centro',
				modality: 'Presencial',
				sources: [{ id: 7, label: 'Plan oficial' }]
			},
			sections: [{ id: 'basic', year: 1 }],
			items: [
				{ id: 'algebra', seqId: 4 },
				{ id: 'analysis', seqId: 5, requirements: { enroll: { type: 'item' } } }
			]
		},
		catalog: { degreeSlug: 'lic-matematica', sources: [{ id: 7 }], year: undefined }
	});
	if (!result.ok) throw new Error('Expected a publication candidate.');
	expect(result.plan.info).not.toHaveProperty('year');
	expect(result.plan.items[0].placements).toEqual([{ sectionId: 'basic' }]);
	expect(studyPlanDocumentSchema.safeParse(result.plan).success).toBe(true);
});

test('rejects draft states that cannot publish', () => {
	const unknown = input();
	unknown.content.unknownRequirements.push({ scope: 'item:analysis:enroll', note: 'Pendiente' });
	expect(publicationCandidate(unknown)).toMatchObject({ reason: 'unknown_requirements' });

	const unsupported = input();
	unsupported.content.unsupportedContent.push({
		path: 'document/items/analysis/attributes',
		value: ['new']
	});
	expect(publicationCandidate(unsupported)).toMatchObject({ reason: 'unsupported_content' });

	const incomplete = input();
	incomplete.content.document.requirements.graduation = [{ id: 'degree', label: 'Título' }];
	expect(publicationCandidate(incomplete)).toMatchObject({ reason: 'incomplete_structure' });

	const withoutSources = input();
	withoutSources.sources = [];
	expect(publicationCandidate(withoutSources)).toMatchObject({ reason: 'missing_sources' });

	const withoutItems = input();
	withoutItems.content.document.items = [];
	expect(publicationCandidate(withoutItems)).toMatchObject({ reason: 'missing_items' });
});

test('rejects content the native reader cannot prepare', () => {
	const invalid = input();
	invalid.content.document.items[1].requirements = {
		enroll: { type: 'item', itemId: 'missing', state: 'passed' }
	};

	expect(publicationCandidate(invalid)).toMatchObject({ reason: 'invalid_plan' });
});
