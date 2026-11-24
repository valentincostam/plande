import { preparePlan } from '$lib/prepare-plan';
import type { RequirementExpr, Selector } from '$lib/study-plan-data';
import { draftPlanContentSchema, type DraftPlanContent } from './draft-plan-content';
import { completeDraftStructure } from './graduation-field';

export const DRAFT_IMPORT_LIMITS = {
	utf8Bytes: 512 * 1024,
	depth: 48,
	nodes: 20_000,
	items: 1_000,
	sections: 200,
	graduation: 200
} as const;

export type DraftImportDiagnostic = { code: string; path: string; message: string };
export type DraftImportResult =
	| { ok: true; content: DraftPlanContent; diagnostics: DraftImportDiagnostic[] }
	| { ok: false; diagnostics: DraftImportDiagnostic[] };

const diagnostic = (code: string, path: string, message: string): DraftImportDiagnostic => ({
	code,
	path,
	message
});
const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
const schemaFields = new Set([
	'schemaVersion',
	'document',
	'nextSeqId',
	'sections',
	'items',
	'requirements',
	'graduation',
	'unknownRequirements',
	'unsupportedContent',
	'id',
	'label',
	'year',
	'seqId',
	'kind',
	'name',
	'type',
	'code',
	'tags',
	'placements',
	'sectionId',
	'term',
	'order',
	'enroll',
	'complete',
	'expr',
	'weight',
	'scope',
	'note',
	'value',
	'hours',
	'totalHours',
	'credits',
	'attributes',
	'state',
	'rules',
	'min',
	'minPercent',
	'selector',
	'metric',
	'itemId',
	'courseType',
	'tag',
	'sectionIds',
	'itemIds',
	'path'
]);

const safeSchemaPath = (segments: PropertyKey[]) => {
	const safe: string[] = [];
	for (const segment of segments) {
		if (typeof segment === 'number') safe.push(String(segment));
		else if (typeof segment === 'string' && schemaFields.has(segment)) safe.push(segment);
		else break;
	}
	return safe.length ? `/${safe.join('/')}` : '/';
};

const schemaMessage = (code: string) => {
	if (code === 'unrecognized_keys') return 'El objeto contiene campos no permitidos.';
	if (code === 'invalid_type') return 'El campo tiene un tipo no válido.';
	if (code === 'invalid_value') return 'El campo tiene un valor no permitido.';
	if (code === 'too_small' || code === 'too_big') return 'El campo no cumple el tamaño permitido.';
	return 'El JSON no cumple el contrato de importación.';
};

const inspectInput = (value: unknown): DraftImportDiagnostic | undefined => {
	let nodes = 0;
	const visit = (
		current: unknown,
		path: string,
		depth: number
	): DraftImportDiagnostic | undefined => {
		nodes += 1;
		if (nodes > DRAFT_IMPORT_LIMITS.nodes)
			return diagnostic('limit_nodes', path, 'El JSON supera la cantidad máxima de nodos.');
		if (depth > DRAFT_IMPORT_LIMITS.depth)
			return diagnostic('limit_depth', path, 'El JSON supera la profundidad máxima.');
		if (Array.isArray(current)) {
			for (const [index, entry] of current.entries()) {
				const issue = visit(entry, `${path}/${index}`, depth + 1);
				if (issue) return issue;
			}
			return undefined;
		}
		if (typeof current !== 'object' || current === null) return undefined;
		for (const [key, entry] of Object.entries(current)) {
			if (forbiddenKeys.has(key))
				return diagnostic(
					'forbidden_key',
					`${path}/${key}`,
					'El JSON contiene una clave no permitida.'
				);
			const issue = visit(entry, `${path}/object`, depth + 1);
			if (issue) return issue;
		}
		return undefined;
	};
	return visit(value, '', 0);
};

const mapSelector = (
	selector: Selector,
	itemIds: Map<string, string>,
	sectionIds: Map<string, string>
) => {
	if (selector.type === 'items')
		return { ...selector, itemIds: selector.itemIds.map((id) => itemIds.get(id)!) };
	if (selector.type === 'section')
		return { ...selector, sectionId: sectionIds.get(selector.sectionId)! };
	if (selector.type === 'sections')
		return { ...selector, sectionIds: selector.sectionIds.map((id) => sectionIds.get(id)!) };
	return selector;
};

const mapExpression = (
	expression: RequirementExpr,
	itemIds: Map<string, string>,
	sectionIds: Map<string, string>
): RequirementExpr => {
	if (expression.type === 'item') return { ...expression, itemId: itemIds.get(expression.itemId)! };
	if (expression.type === 'all' || expression.type === 'any' || expression.type === 'countOf')
		return {
			...expression,
			rules: expression.rules.map((rule) => mapExpression(rule, itemIds, sectionIds))
		};
	return { ...expression, selector: mapSelector(expression.selector, itemIds, sectionIds) };
};

const referenceDiagnostics = (content: DraftPlanContent): DraftImportDiagnostic[] => {
	const itemIds = new Set(content.document.items.map((item) => item.id));
	const sectionIds = new Set(content.document.sections.map((section) => section.id));
	const graduationIds = new Set(content.document.requirements.graduation?.map((block) => block.id));
	const placementIds = new Set<string>();
	const diagnostics: DraftImportDiagnostic[] = [];
	const unique = (ids: string[], path: string, label: string) => {
		if (new Set(ids).size !== ids.length)
			diagnostics.push(
				diagnostic('duplicate_id', path, `Hay identificadores de ${label} repetidos.`)
			);
	};
	unique(
		content.document.items.map((item) => item.id),
		'/document/items',
		'ítems'
	);
	unique(
		content.document.sections.map((section) => section.id),
		'/document/sections',
		'secciones'
	);
	unique(
		content.document.requirements.graduation?.map((block) => block.id) ?? [],
		'/document/requirements/graduation',
		'bloques de graduación'
	);
	const checkExpression = (expression: RequirementExpr, path: string): void => {
		if (expression.type === 'item') {
			if (!itemIds.has(expression.itemId))
				diagnostics.push(
					diagnostic('missing_item', path, 'El requisito referencia un ítem inexistente.')
				);
			return;
		}
		if (expression.type === 'all' || expression.type === 'any' || expression.type === 'countOf') {
			expression.rules.forEach((rule, index) => checkExpression(rule, `${path}/rules/${index}`));
			return;
		}
		if (expression.selector.type === 'items') {
			if (expression.selector.itemIds.some((id) => !itemIds.has(id)))
				diagnostics.push(
					diagnostic('missing_item', path, 'El selector referencia un ítem inexistente.')
				);
		} else if (expression.selector.type === 'section') {
			if (!sectionIds.has(expression.selector.sectionId))
				diagnostics.push(
					diagnostic('missing_section', path, 'El selector referencia una sección inexistente.')
				);
		} else if (
			expression.selector.type === 'sections' &&
			expression.selector.sectionIds.some((id) => !sectionIds.has(id))
		)
			diagnostics.push(
				diagnostic('missing_section', path, 'El selector referencia una sección inexistente.')
			);
	};
	content.document.items.forEach((item, index) => {
		for (const scope of ['enroll', 'complete'] as const) {
			const expression = item.requirements?.[scope];
			if (expression) checkExpression(expression, `/document/items/${index}/requirements/${scope}`);
		}
		item.placements.forEach((placement, placementIndex) => {
			if (placementIds.has(placement.id))
				diagnostics.push(
					diagnostic(
						'duplicate_id',
						`/document/items/${index}/placements/${placementIndex}`,
						'Hay ubicaciones repetidas.'
					)
				);
			placementIds.add(placement.id);
			if (!sectionIds.has(placement.sectionId))
				diagnostics.push(
					diagnostic(
						'missing_section',
						`/document/items/${index}/placements/${placementIndex}`,
						'La ubicación referencia una sección inexistente.'
					)
				);
		});
	});
	content.document.requirements.graduation?.forEach((block, index) => {
		if (block.expr) checkExpression(block.expr, `/document/requirements/graduation/${index}/expr`);
	});
	for (const unknown of content.unknownRequirements) {
		const item = /^item:([^:]+):(enroll|complete)$/.exec(unknown.scope);
		const graduation = /^graduation:([^:]+)$/.exec(unknown.scope);
		if ((item && !itemIds.has(item[1]!)) || (graduation && !graduationIds.has(graduation[1]!)))
			diagnostics.push(
				diagnostic(
					'missing_reference',
					'/unknownRequirements',
					'Una duda referencia contenido inexistente.'
				)
			);
	}
	for (const unsupported of content.unsupportedContent) {
		const item = /^document\/items\/([^/]+)\//.exec(unsupported.path);
		const graduation = /^document\/requirements\/graduation\/([^/]+)$/.exec(unsupported.path);
		if ((item && !itemIds.has(item[1]!)) || (graduation && !graduationIds.has(graduation[1]!)))
			diagnostics.push(
				diagnostic(
					'missing_reference',
					'/unsupportedContent',
					'El contenido no admitido referencia contenido inexistente.'
				)
			);
	}
	return diagnostics;
};

const remap = (content: DraftPlanContent): DraftPlanContent => {
	const sectionIds = new Map(
		content.document.sections.map((section, index) => [section.id, `import-section-${index + 1}`])
	);
	const itemIds = new Map(
		content.document.items.map((item, index) => [item.id, `import-item-${index + 1}`])
	);
	const placementIds = new Map<string, string>();
	let placementIndex = 0;
	for (const item of content.document.items)
		for (const placement of item.placements)
			placementIds.set(placement.id, `import-placement-${++placementIndex}`);
	const graduationIds = new Map(
		(content.document.requirements.graduation ?? []).map((block, index) => [
			block.id,
			`import-graduation-${index + 1}`
		])
	);
	const mapScope = (scope: string) => {
		const item = /^item:([^:]+):(enroll|complete)$/.exec(scope);
		if (item) return `item:${itemIds.get(item[1]!)!}:${item[2]!}`;
		const graduation = /^graduation:([^:]+)$/.exec(scope);
		return `graduation:${graduationIds.get(graduation![1])!}`;
	};
	const mapUnsupportedPath = (path: string) =>
		path
			.replace(/^document\/items\/([^/]+)/, (_, id: string) => `document/items/${itemIds.get(id)!}`)
			.replace(
				/^document\/requirements\/graduation\/([^/]+)/,
				(_, id: string) => `document/requirements/graduation/${graduationIds.get(id)!}`
			);
	return {
		...content,
		document: {
			...content.document,
			nextSeqId: content.document.items.length,
			sections: content.document.sections.map((section) => ({
				...section,
				id: sectionIds.get(section.id)!
			})),
			items: content.document.items.map((item, index) => ({
				...item,
				id: itemIds.get(item.id)!,
				seqId: index,
				placements: item.placements.map((placement) => ({
					...placement,
					id: placementIds.get(placement.id)!,
					sectionId: sectionIds.get(placement.sectionId)!
				})),
				requirements: item.requirements && {
					...item.requirements,
					...(item.requirements.enroll
						? { enroll: mapExpression(item.requirements.enroll, itemIds, sectionIds) }
						: {}),
					...(item.requirements.complete
						? { complete: mapExpression(item.requirements.complete, itemIds, sectionIds) }
						: {})
				}
			})),
			requirements: {
				graduation: content.document.requirements.graduation?.map((block) => ({
					...block,
					id: graduationIds.get(block.id)!,
					...(block.expr ? { expr: mapExpression(block.expr, itemIds, sectionIds) } : {})
				}))
			}
		},
		unknownRequirements: content.unknownRequirements.map((unknown) => ({
			...unknown,
			scope: mapScope(unknown.scope)
		})),
		unsupportedContent: content.unsupportedContent.map((unsupported) => ({
			...unsupported,
			path: mapUnsupportedPath(unsupported.path)
		}))
	};
};

const withConservativeUnknowns = (content: DraftPlanContent): DraftPlanContent => {
	const unknownRequirements = [...content.unknownRequirements];
	const addUnknown = (scope: string) => {
		if (!unknownRequirements.some((unknown) => unknown.scope === scope))
			unknownRequirements.push({ scope, note: 'Todavía no comprobado.' });
	};
	for (const item of content.document.items) {
		if (item.kind === 'course' && !item.requirements?.enroll) addUnknown(`item:${item.id}:enroll`);
		if (!item.requirements?.complete) addUnknown(`item:${item.id}:complete`);
	}
	for (const block of content.document.requirements.graduation ?? []) {
		if (!block.expr) addUnknown(`graduation:${block.id}`);
	}
	return { ...content, unknownRequirements };
};

export const isEmptyDraft = (content: DraftPlanContent) =>
	content.document.nextSeqId === 0 &&
	content.document.sections.length === 0 &&
	content.document.items.length === 0 &&
	(content.document.requirements.graduation?.length ?? 0) === 0 &&
	content.unknownRequirements.length === 0 &&
	content.unsupportedContent.length === 0;

export const parseDraftImport = (text: string): DraftImportResult => {
	if (new TextEncoder().encode(text).byteLength > DRAFT_IMPORT_LIMITS.utf8Bytes)
		return {
			ok: false,
			diagnostics: [diagnostic('limit_size', '', 'El JSON supera el tamaño máximo.')]
		};
	let input: unknown;
	try {
		input = JSON.parse(text);
	} catch {
		return {
			ok: false,
			diagnostics: [diagnostic('invalid_json', '', 'El texto no es JSON válido.')]
		};
	}
	const inspected = inspectInput(input);
	if (inspected) return { ok: false, diagnostics: [inspected] };
	const parsed = draftPlanContentSchema.safeParse(input);
	if (!parsed.success)
		return {
			ok: false,
			diagnostics: [
				diagnostic(
					'invalid_schema',
					safeSchemaPath(parsed.error.issues[0]?.path ?? []),
					schemaMessage(parsed.error.issues[0]?.code ?? '')
				)
			]
		};
	const content = parsed.data;
	const limits: Array<[number, number, string, string]> = [
		[content.document.items.length, DRAFT_IMPORT_LIMITS.items, 'limit_items', '/document/items'],
		[
			content.document.sections.length,
			DRAFT_IMPORT_LIMITS.sections,
			'limit_sections',
			'/document/sections'
		],
		[
			content.document.requirements.graduation?.length ?? 0,
			DRAFT_IMPORT_LIMITS.graduation,
			'limit_graduation',
			'/document/requirements/graduation'
		]
	];
	for (const [size, limit, code, path] of limits) {
		if (size > limit)
			return {
				ok: false,
				diagnostics: [diagnostic(code, path, 'El JSON supera el límite permitido.')]
			};
	}
	const references = referenceDiagnostics(content);
	if (references.length) return { ok: false, diagnostics: references };
	const imported = draftPlanContentSchema.parse(withConservativeUnknowns(remap(content)));
	const structure = completeDraftStructure(imported);
	const diagnostics: DraftImportDiagnostic[] = [];
	if (structure) {
		try {
			preparePlan(structure);
		} catch {
			diagnostics.push(
				diagnostic('academic_validation', '/document', 'El contenido requiere revisión académica.')
			);
		}
	}
	return { ok: true, content: imported, diagnostics };
};
