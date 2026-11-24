import { expect, test } from 'vitest';
import { parseDraftPlanContent } from './draft-plan-content';

test('treats only the legacy empty object as an empty editor document', () => {
	expect(parseDraftPlanContent({}).document).toMatchObject({
		nextSeqId: 0,
		sections: [],
		items: []
	});
	expect(() => parseDraftPlanContent([])).toThrow();
});

test('preserves a requirement tree as one native expression', () => {
	const content = parseDraftPlanContent({
		schemaVersion: 1,
		document: {
			nextSeqId: 1,
			sections: [],
			items: [],
			requirements: {
				graduation: [
					{
						id: 'graduate',
						label: 'Final',
						expr: { type: 'any', rules: [{ type: 'item', itemId: 'thesis', state: 'completed' }] }
					}
				]
			}
		},
		unknownRequirements: [],
		unsupportedContent: []
	});
	expect(content.document.requirements.graduation?.[0].expr).toEqual({
		type: 'any',
		rules: [{ type: 'item', itemId: 'thesis', state: 'completed' }]
	});
});
