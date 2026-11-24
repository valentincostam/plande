import { expect, test } from 'vitest';
import { emptyDraftPlanContent } from './draft-plan-content';
import {
	addCourse,
	addMilestone,
	findMissingSectionReferences,
	findSectionReferences,
	itemsInSection,
	moveItem,
	placeItem,
	ReferencedItemError,
	reorderSection,
	removeItem,
	removeSection
} from './structure';

test('appends new section items after the current last item', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'basic', label: 'Básica' });
	content.document.items.push(
		{
			id: 'first',
			seqId: 0,
			kind: 'course',
			name: 'Primera',
			type: 'mandatory',
			placements: [{ id: 'first-basic', sectionId: 'basic' }]
		},
		{
			id: 'last',
			seqId: 1,
			kind: 'course',
			name: 'Última',
			type: 'mandatory',
			placements: [{ id: 'last-basic', sectionId: 'basic', order: 4 }]
		}
	);
	content.document.nextSeqId = 2;

	const withCourse = addCourse(
		content,
		{ id: 'new-course', seqId: 2, kind: 'course', name: '', type: 'mandatory' },
		'basic'
	);
	const withMilestone = addMilestone(
		withCourse,
		{ id: 'new-milestone', seqId: 3, kind: 'milestone', name: '' },
		'basic'
	);

	expect(itemsInSection(withMilestone.document, 'basic').map((item) => item.id)).toEqual([
		'first',
		'last',
		'new-course',
		'new-milestone'
	]);
	expect(withMilestone.document.items.map((item) => item.placements[0]?.order)).toEqual([
		undefined,
		4,
		5,
		6
	]);
});

test('reorders sections at an exact index', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push(
		{ id: 'basic', label: 'Básica' },
		{ id: 'advanced', label: 'Avanzada' },
		{ id: 'final', label: 'Final' }
	);

	expect(
		reorderSection(content, 'final', 1).document.sections.map((section) => section.id)
	).toEqual(['basic', 'final', 'advanced']);
});

test('reorders an item and normalizes placement order', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'basic', label: 'Básica' });
	content.document.items.push(
		{
			id: 'algebra',
			seqId: 0,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			placements: [{ id: 'algebra-basic', sectionId: 'basic', order: 0 }]
		},
		{
			id: 'analysis',
			seqId: 1,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [{ id: 'analysis-basic', sectionId: 'basic', order: 1 }]
		}
	);

	const moved = moveItem(content, 'analysis', 'basic', 'basic', 0);
	expect(itemsInSection(moved.document, 'basic').map((item) => item.id)).toEqual([
		'analysis',
		'algebra'
	]);
	expect(moved.document.items.map((item) => item.placements[0]?.order)).toEqual([1, 0]);
});

test('moves a milestone between general milestones and a section', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'final', label: 'Final' });
	content.document.items.push({
		id: 'thesis',
		seqId: 0,
		kind: 'milestone',
		name: 'Tesis',
		placements: []
	});

	const placed = moveItem(content, 'thesis', null, 'final', 0);
	expect(placed.document.items[0].placements).toMatchObject([{ sectionId: 'final', order: 0 }]);
	const unplaced = moveItem(placed, 'thesis', 'final', null, 0);
	expect(unplaced.document.items[0].placements).toEqual([]);
});

test('reorders unplaced milestones without changing stable sequence ids', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push(
		{ id: 'language', seqId: 2, kind: 'milestone', name: 'Idioma', placements: [] },
		{ id: 'thesis', seqId: 7, kind: 'milestone', name: 'Tesis', placements: [] }
	);

	const moved = moveItem(content, 'thesis', null, null, 0);
	expect(moved.document.items.map((item) => ({ id: item.id, seqId: item.seqId }))).toEqual([
		{ id: 'thesis', seqId: 7 },
		{ id: 'language', seqId: 2 }
	]);
});

test('keeps two placements in one section when their native tuples differ', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'basic', label: 'Básica' });
	content.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'annual', sectionId: 'basic', term: 'annual' }]
	});
	content.document.nextSeqId = 1;
	const result = placeItem(content, 'algebra', 'basic', undefined, 'firstSemester');
	expect(result.document.items[0].placements).toHaveLength(2);
	expect(new Set(result.document.items[0].placements.map((placement) => placement.id)).size).toBe(
		2
	);
});

test('does not duplicate an identical placement tuple', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'basic', label: 'Básica' });
	content.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'annual', sectionId: 'basic', term: 'annual' }]
	});
	expect(
		placeItem(content, 'algebra', 'basic', undefined, 'annual').document.items[0].placements
	).toHaveLength(1);
});

test('rejects removal when a native requirement references the item', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push(
		{ id: 'algebra', seqId: 0, kind: 'course', name: 'Álgebra', type: 'mandatory', placements: [] },
		{
			id: 'analysis',
			seqId: 1,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [],
			requirements: { enroll: { type: 'item', itemId: 'algebra', state: 'passed' } }
		}
	);
	expect(() => removeItem(content, 'algebra')).toThrow(ReferencedItemError);
	expect(content.document.items).toHaveLength(2);
});

test('removes an unreferenced item', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	expect(removeItem(content, 'algebra').document.items).toEqual([]);
});

test('ignores an incomplete graduation block when finding item references', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	content.document.requirements.graduation = [{ id: 'degree', label: 'Título' }];

	expect(findSectionReferences(content, 'missing')).toEqual([]);
	expect(removeItem(content, 'algebra').document.requirements.graduation).toEqual([
		{ id: 'degree', label: 'Título' }
	]);
});

test('finds nested section selectors in item and graduation requirements', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'analysis',
		seqId: 0,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: [],
		requirements: {
			enroll: {
				type: 'all',
				rules: [
					{
						type: 'percent',
						selector: { type: 'sections', sectionIds: ['advanced'] },
						minPercent: 50,
						state: 'passed'
					}
				]
			}
		}
	});
	content.document.requirements.graduation = [
		{
			id: 'graduation',
			label: 'Egreso',
			expr: {
				type: 'sum',
				selector: { type: 'section', sectionId: 'advanced' },
				metric: 'credits',
				min: 2,
				state: 'passed'
			}
		}
	];

	expect(findSectionReferences(content, 'advanced')).toEqual([
		{ scope: 'item:analysis:enroll' },
		{ scope: 'graduation:graduation' }
	]);
	expect(findMissingSectionReferences(content, new Set())).toEqual([
		{ scope: 'item:analysis:enroll' },
		{ scope: 'graduation:graduation' }
	]);
});

test('rejects removal of an empty section referenced by a requirement selector', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	content.document.items.push({
		id: 'analysis',
		seqId: 0,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: [],
		requirements: {
			complete: {
				type: 'count',
				selector: { type: 'section', sectionId: 'advanced' },
				min: 1,
				state: 'passed'
			}
		}
	});

	expect(() => removeSection(content, 'advanced')).toThrow(
		'Move or update the requirements that reference this section first.'
	);
	expect(content.document.sections).toEqual([{ id: 'advanced', label: 'Avanzada' }]);
});

test('marks only the milestone completion requirement scope unknown', () => {
	const result = addMilestone(emptyDraftPlanContent(), {
		id: 'thesis',
		seqId: 0,
		kind: 'milestone',
		name: 'Tesis'
	});
	expect(result.unknownRequirements.map((entry) => entry.scope)).toEqual(['item:thesis:complete']);
});

test('rejects duplicate placement IDs and exact tuples', () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'basic', label: 'Básica' });
	content.document.items.push({
		id: 'a',
		seqId: 0,
		kind: 'course',
		name: 'A',
		type: 'mandatory',
		placements: [{ id: 'same', sectionId: 'basic' }]
	});
	expect(() => placeItem(content, 'a', 'basic')).not.toThrow();
	content.document.items.push({
		id: 'b',
		seqId: 1,
		kind: 'course',
		name: 'B',
		type: 'mandatory',
		placements: [{ id: 'same', sectionId: 'basic', term: 'annual' }]
	});
	expect(() => placeItem(content, 'a', 'basic', 1)).toThrow('Placement IDs');
});
