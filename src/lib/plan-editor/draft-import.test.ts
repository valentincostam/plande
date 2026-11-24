import { expect, test } from 'vitest';
import { DRAFT_IMPORT_LIMITS, isEmptyDraft, parseDraftImport } from './draft-import';

test('remaps a valid external draft while preserving requirements and multiple placements', () => {
	const result = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: {
				nextSeqId: 8,
				sections: [{ id: 'basic', label: 'Básica' }],
				items: [
					{
						id: 'analysis',
						seqId: 7,
						kind: 'course',
						name: 'Análisis',
						type: 'mandatory',
						placements: [
							{ id: 'annual', sectionId: 'basic', term: 'annual' },
							{ id: 'first', sectionId: 'basic', term: 'firstSemester' }
						]
					}
				],
				requirements: {
					graduation: [
						{
							id: 'degree',
							label: 'Título',
							expr: {
								type: 'count',
								selector: { type: 'sections', sectionIds: ['basic'], term: 'annual' },
								min: 1,
								state: 'passed'
							}
						}
					]
				}
			},
			unknownRequirements: [],
			unsupportedContent: []
		})
	);

	expect(result).toMatchObject({ ok: true, diagnostics: [] });
	if (!result.ok) throw new Error('Expected imported draft.');
	expect(result.content.document).toMatchObject({
		nextSeqId: 1,
		sections: [{ id: 'import-section-1', label: 'Básica' }],
		items: [
			{
				id: 'import-item-1',
				seqId: 0,
				placements: [
					{ id: 'import-placement-1', sectionId: 'import-section-1', term: 'annual' },
					{ id: 'import-placement-2', sectionId: 'import-section-1', term: 'firstSemester' }
				]
			}
		],
		requirements: {
			graduation: [
				{
					id: 'import-graduation-1',
					expr: {
						selector: { type: 'sections', sectionIds: ['import-section-1'], term: 'annual' }
					}
				}
			]
		}
	});
	expect(isEmptyDraft(result.content)).toBe(false);
	expect(result.content.unknownRequirements).toEqual([
		{ scope: 'item:import-item-1:enroll', note: 'Todavía no comprobado.' },
		{ scope: 'item:import-item-1:complete', note: 'Todavía no comprobado.' }
	]);
});

test('rejects forbidden keys and missing references without returning pasted values', () => {
	const forbidden = parseDraftImport('{"schemaVersion":1,"__proto__":{}}');
	const missing = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: {
				nextSeqId: 1,
				sections: [],
				items: [
					{
						id: 'course',
						seqId: 0,
						kind: 'course',
						name: 'Nombre no debe aparecer en diagnóstico',
						type: 'mandatory',
						placements: [],
						requirements: {
							enroll: { type: 'item', itemId: 'missing', state: 'passed' }
						}
					}
				],
				requirements: {}
			},
			unknownRequirements: [],
			unsupportedContent: []
		})
	);

	expect(forbidden).toEqual({
		ok: false,
		diagnostics: [
			{
				code: 'forbidden_key',
				path: '/__proto__',
				message: 'El JSON contiene una clave no permitida.'
			}
		]
	});
	expect(missing).toMatchObject({
		ok: false,
		diagnostics: [{ code: 'missing_item', path: '/document/items/0/requirements/enroll' }]
	});
	expect(JSON.stringify(missing)).not.toContain('Nombre no debe aparecer en diagnóstico');
});

test('reports invalid schema fields with safe paths and stable messages', () => {
	const result = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: { nextSeqId: 0, sections: [], items: [], requirements: {} },
			unknownRequirements: [],
			unsupportedContent: [],
			unexpectedExternalKey: true
		})
	);

	expect(result).toEqual({
		ok: false,
		diagnostics: [
			{
				code: 'invalid_schema',
				path: '/',
				message: 'El objeto contiene campos no permitidos.'
			}
		]
	});
});

test('keeps supported unknown requirements and recognizes only a fully empty draft', () => {
	const empty = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: { nextSeqId: 0, sections: [], items: [], requirements: {} },
			unknownRequirements: [],
			unsupportedContent: []
		})
	);
	const incompleteGraduation = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: {
				nextSeqId: 0,
				sections: [],
				items: [],
				requirements: { graduation: [{ id: 'degree', label: 'Título' }] }
			},
			unknownRequirements: [{ scope: 'graduation:degree', note: 'Conservar esta duda.' }],
			unsupportedContent: []
		})
	);

	expect(empty.ok).toBe(true);
	if (!empty.ok) throw new Error('Expected empty import.');
	expect(isEmptyDraft(empty.content)).toBe(true);
	expect(incompleteGraduation).toMatchObject({
		ok: true,
		content: {
			document: { requirements: { graduation: [{ id: 'import-graduation-1', label: 'Título' }] } },
			unknownRequirements: [
				{ scope: 'graduation:import-graduation-1', note: 'Conservar esta duda.' }
			]
		}
	});
	expect(parseDraftImport(' '.repeat(DRAFT_IMPORT_LIMITS.utf8Bytes + 1))).toMatchObject({
		ok: false,
		diagnostics: [{ code: 'limit_size', path: '' }]
	});
});

test('rejects duplicate identities and unsupported paths with missing targets', () => {
	const result = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: {
				nextSeqId: 0,
				sections: [
					{ id: 'same', label: 'Una' },
					{ id: 'same', label: 'Dos' }
				],
				items: [],
				requirements: {}
			},
			unknownRequirements: [],
			unsupportedContent: [{ path: 'document/items/missing/attributes', value: [] }]
		})
	);

	expect(result).toMatchObject({
		ok: false,
		diagnostics: [
			{ code: 'duplicate_id', path: '/document/sections' },
			{ code: 'missing_reference', path: '/unsupportedContent' }
		]
	});
});

test('enforces depth and node limits before schema validation', () => {
	let deep: unknown = 0;
	for (let index = 0; index <= DRAFT_IMPORT_LIMITS.depth; index += 1) deep = { value: deep };
	const nodes = Array.from({ length: DRAFT_IMPORT_LIMITS.nodes + 1 }, () => 0);

	expect(parseDraftImport(JSON.stringify(deep))).toMatchObject({
		ok: false,
		diagnostics: [{ code: 'limit_depth' }]
	});
	expect(parseDraftImport(JSON.stringify(nodes))).toMatchObject({
		ok: false,
		diagnostics: [{ code: 'limit_nodes' }]
	});
});

test('preserves supported unknown and unsupported content while remapping their targets', () => {
	const result = parseDraftImport(
		JSON.stringify({
			schemaVersion: 1,
			document: {
				nextSeqId: 1,
				sections: [],
				items: [
					{
						id: 'course',
						seqId: 0,
						kind: 'course',
						name: 'Curso',
						type: 'mandatory',
						placements: []
					}
				],
				requirements: {}
			},
			unknownRequirements: [{ scope: 'item:course:enroll', note: 'Conservar.' }],
			unsupportedContent: [{ path: 'document/items/course/attributes', value: ['externo'] }]
		})
	);

	expect(result).toMatchObject({
		ok: true,
		content: {
			unknownRequirements: [
				{ scope: 'item:import-item-1:enroll', note: 'Conservar.' },
				{ scope: 'item:import-item-1:complete', note: 'Todavía no comprobado.' }
			],
			unsupportedContent: [{ path: 'document/items/import-item-1/attributes', value: ['externo'] }]
		}
	});
});
