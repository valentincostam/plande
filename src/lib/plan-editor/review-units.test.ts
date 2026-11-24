import { expect, test } from 'vitest';
import { reviewUnits, type ReviewUnit, type ReviewUnitsInput } from './review-units';
import { emptyDraftPlanContent } from './draft-plan-content';

const input = (): ReviewUnitsInput => {
	const content = emptyDraftPlanContent();
	content.document.sections = [
		{ id: 'basic', label: 'Básica' },
		{ id: 'elective', label: 'Optativas' }
	];
	content.document.items = [
		{
			id: 'algebra',
			seqId: 0,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			credits: 6,
			tags: ['math'],
			placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
		},
		{
			id: 'analysis',
			seqId: 1,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [{ id: 'analysis-basic', sectionId: 'basic' }],
			requirements: {
				enroll: {
					type: 'sum',
					selector: { type: 'tag', tag: 'math' },
					metric: 'credits',
					min: 6,
					state: 'passed'
				}
			}
		},
		{
			id: 'literature',
			seqId: 2,
			kind: 'course',
			name: 'Literatura',
			type: 'elective',
			placements: [{ id: 'literature-elective', sectionId: 'elective' }]
		}
	];
	content.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Título',
			expr: {
				type: 'count',
				selector: { type: 'section', sectionId: 'basic' },
				min: 2,
				state: 'passed'
			}
		}
	];
	content.document.nextSeqId = 3;
	return {
		content,
		identity: { university: 'UN', faculty: 'FC', offer: 'Carrera', year: 2024 },
		sources: [{ id: 'source-a', label: 'Plan', url: 'https://example.edu/plan' }]
	};
};

const byKey = (result: ReturnType<typeof reviewUnits>, key: string) =>
	result.units.find((unit) => unit.key === key);

test('keeps a nullable faculty identity fingerprint stable for review and publication', () => {
	const reviewed = input();
	reviewed.identity.faculty = null;
	const published = structuredClone(reviewed);

	expect(byKey(reviewUnits(reviewed), 'identity')?.fingerprint).toBe(
		byKey(reviewUnits(published), 'identity')?.fingerprint
	);
});

test('invalidates identity only when native notes change', () => {
	const before = input();
	before.identity.notes = [{ id: 1, text: 'Resolución vigente.' }];
	const unchanged = structuredClone(before);
	const changed = structuredClone(before);
	changed.identity.notes = [{ id: 1, text: 'Resolución actualizada.' }];

	expect(byKey(reviewUnits(before), 'identity')?.fingerprint).toBe(
		byKey(reviewUnits(unchanged), 'identity')?.fingerprint
	);
	expect(byKey(reviewUnits(before), 'identity')?.fingerprint).not.toBe(
		byKey(reviewUnits(changed), 'identity')?.fingerprint
	);
});

test('keeps unrelated review units stable', () => {
	const before = input();
	const after = structuredClone(before);
	after.content.document.items[0].name = 'Álgebra I';

	const beforeUnits = reviewUnits(before);
	const afterUnits = reviewUnits(after);

	expect(byKey(beforeUnits, 'item:algebra')).not.toEqual(byKey(afterUnits, 'item:algebra'));
	expect(byKey(beforeUnits, 'item:analysis')).not.toEqual(byKey(afterUnits, 'item:analysis'));
	expect(byKey(beforeUnits, 'graduation:degree')).not.toEqual(
		byKey(afterUnits, 'graduation:degree')
	);
	expect(byKey(beforeUnits, 'item:literature')).toEqual(byKey(afterUnits, 'item:literature'));
	expect(byKey(beforeUnits, 'source:source-a')).toEqual(byKey(afterUnits, 'source:source-a'));
});

test('includes source details in academic review context', () => {
	const before = input();
	const after = structuredClone(before);
	after.sources[0].url = 'https://example.edu/updated-plan';

	expect(byKey(reviewUnits(before), 'item:analysis')).not.toEqual(
		byKey(reviewUnits(after), 'item:analysis')
	);
});

test('excludes an item owner from all selectors', () => {
	const content = input();
	content.content.document.items[1].requirements = {
		enroll: {
			type: 'count',
			selector: { type: 'all' },
			min: 1,
			state: 'passed'
		}
	};
	const unit = byKey(reviewUnits(content), 'item:analysis') as ReviewUnit;
	const requirements = unit.context.requirements as Array<{
		expression: { selector: { items: Array<{ id: string }> } };
	}>;

	expect(requirements[0].expression.selector.items.map((item) => item.id)).toEqual([
		'algebra',
		'literature'
	]);
});

test('keeps independent units available when another block is incomplete', () => {
	const content = input();
	content.content.document.requirements.graduation?.push({
		id: 'pending-degree',
		label: 'Pendiente'
	});

	const units = reviewUnits(content);
	expect(byKey(units, 'graduation:pending-degree')).toMatchObject({
		unavailable: 'unknown_requirement'
	});
	expect(byKey(units, 'item:algebra')).toHaveProperty('fingerprint');
	expect(byKey(units, 'item:analysis')).toHaveProperty('fingerprint');
	expect(byKey(units, 'graduation:degree')).toHaveProperty('fingerprint');
});
