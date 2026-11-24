import { courseStates } from '$lib/course-state';
import { resolveSelector, type RequirementContext } from '$lib/requirement-evaluator';
import type {
	PlanItem,
	RequirementExpr,
	RequirementMetric,
	Selector,
	StudyPlanNote
} from '$lib/study-plan-data';
import { milestoneStates } from '$lib/study-plan-data';
import type { DraftPlanContent, EditorItem } from './draft-plan-content';

export type ReviewIdentity = {
	university: string;
	faculty: string | null;
	offer: string;
	campus?: string;
	modality?: string;
	year?: number;
	notes?: StudyPlanNote[];
};

export type ReviewSource = { id: string; label: string; url: string };

type ReviewContext = Record<string, unknown>;

export type ReviewUnit = {
	key: string;
	context: ReviewContext;
	fingerprint?: string;
	unavailable?: 'unknown_requirement' | 'unresolvable';
};

export type ReviewUnitsInput = {
	content: DraftPlanContent;
	identity: ReviewIdentity;
	sources: readonly ReviewSource[];
};

export type ReviewUnits = { units: ReviewUnit[] };

const canonical = (value: unknown): string => {
	if (value === undefined) return 'null';
	if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
	if (value && typeof value === 'object') {
		return `{${Object.entries(value)
			.filter(([, child]) => child !== undefined)
			.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
			.map(([key, child]) => `${JSON.stringify(key)}:${canonical(child)}`)
			.join(',')}}`;
	}
	return JSON.stringify(value);
};

const ready = (key: string, context: ReviewContext): ReviewUnit => ({
	key,
	context,
	fingerprint: canonical(context)
});

const unavailable = (key: string, context: ReviewContext, reason: ReviewUnit['unavailable']) => ({
	key,
	context,
	unavailable: reason
});

const itemContext = (item: EditorItem, content: DraftPlanContent) => ({
	id: item.id,
	name: item.name,
	seqId: item.seqId,
	kind: item.kind,
	code: item.code,
	tags: item.tags ?? [],
	...(item.kind === 'course'
		? {
				type: item.type,
				hours: item.hours,
				totalHours: item.totalHours,
				credits: item.credits,
				attributes: item.attributes ?? []
			}
		: {}),
	placements: item.placements.map((placement) => ({
		id: placement.id,
		term: placement.term,
		order: placement.order,
		section: content.document.sections.find((section) => section.id === placement.sectionId)
	}))
});

const hasUnknown = (content: DraftPlanContent, scope: string) =>
	content.unknownRequirements.some((candidate) => candidate.scope === scope);

const selectedItemContext = (
	item: PlanItem,
	selector: Selector,
	metric: RequirementMetric | undefined,
	content: DraftPlanContent
) => ({
	id: item.id,
	name: item.name,
	kind: item.kind,
	...(selector.type === 'tag' ? { tags: item.tags ?? [] } : {}),
	...(selector.type === 'all'
		? { kind: item.kind, ...(item.kind === 'course' ? { type: item.type } : {}) }
		: {}),
	...(selector.type === 'section' || selector.type === 'sections'
		? {
				placements: item.placements
					.filter((placement) =>
						selector.type === 'section'
							? placement.sectionId === selector.sectionId
							: selector.sectionIds.includes(placement.sectionId) &&
								(selector.term === undefined || placement.term === selector.term)
					)
					.map((placement) => ({
						term: placement.term,
						order: placement.order,
						section: content.document.sections.find((section) => section.id === placement.sectionId)
					}))
			}
		: {}),
	...(metric && item.kind === 'course' ? { [metric]: item[metric] } : {})
});

const selectorContext = (
	selector: Selector,
	context: RequirementContext,
	ownerItemId: string | undefined,
	metric: RequirementMetric | undefined,
	content: DraftPlanContent
): ReviewContext | undefined => {
	const matches = resolveSelector(selector, context, ownerItemId);
	if (
		matches.length === 0 ||
		(selector.type === 'items' && matches.length !== new Set(selector.itemIds).size)
	)
		return undefined;
	return {
		selector,
		items: matches.map(({ item }) => selectedItemContext(item, selector, metric, content))
	};
};

const expressionContext = (
	expression: RequirementExpr,
	context: RequirementContext,
	ownerItemId: string | undefined,
	content: DraftPlanContent
): ReviewContext | undefined => {
	switch (expression.type) {
		case 'item': {
			const item = context?.getItem(expression.itemId)?.item;
			return item
				? { ...expression, item: { id: item.id, name: item.name, kind: item.kind } }
				: undefined;
		}
		case 'all':
		case 'any':
		case 'countOf': {
			const rules = expression.rules.map((rule) =>
				expressionContext(rule, context, ownerItemId, content)
			);
			return rules.every(Boolean) ? { ...expression, rules } : undefined;
		}
		case 'count':
		case 'percent':
		case 'sum': {
			const selector = selectorContext(
				expression.selector,
				context,
				ownerItemId,
				expression.type === 'sum' ? expression.metric : undefined,
				content
			);
			return selector ? { ...expression, selector } : undefined;
		}
	}
};

const requirementContext = (content: DraftPlanContent): RequirementContext => {
	const items: PlanItem[] = content.document.items;
	const byId = new Map(items.map((item) => [item.id, item]));
	const byTag = new Map<string, string[]>();
	const bySection = new Map<string, string[]>();
	for (const item of items) {
		for (const tag of item.tags ?? []) byTag.set(tag, [...(byTag.get(tag) ?? []), item.id]);
		for (const placement of item.placements)
			bySection.set(placement.sectionId, [...(bySection.get(placement.sectionId) ?? []), item.id]);
	}
	const entries = (ids: string[]) =>
		ids.flatMap((id) => {
			const item = byId.get(id);
			return item
				? [
						{
							item,
							state: item.kind === 'course' ? courseStates.notTaken : milestoneStates.pending
						}
					]
				: [];
		});
	return {
		getItem: (id) => entries([id])[0],
		getAllItems: () => entries(items.map((item) => item.id)),
		getItemsByTag: (tag) => entries(byTag.get(tag) ?? []),
		getItemsBySection: (sectionId) => entries(bySection.get(sectionId) ?? [])
	};
};

export const reviewUnits = ({ content, identity, sources }: ReviewUnitsInput): ReviewUnits => {
	const sourceContext = sources
		.toSorted((left, right) => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0))
		.map((source) => ({ id: source.id, label: source.label, url: source.url }));
	const context = requirementContext(content);
	const units: ReviewUnit[] = [
		ready('identity', { identity, sections: content.document.sections, sources: sourceContext }),
		...sources
			.toSorted((left, right) => left.id.localeCompare(right.id))
			.map((source) => ready(`source:${source.id}`, { source }))
	];

	for (const item of content.document.items) {
		const key = `item:${item.id}`;
		const unitContext = { item: itemContext(item, content), sources: sourceContext };
		const scopes = ['enroll', 'complete'] as const;
		if (scopes.some((scope) => hasUnknown(content, `${key}:${scope}`))) {
			units.push(unavailable(key, unitContext, 'unknown_requirement'));
			continue;
		}
		const requirements = scopes.flatMap((scope) => {
			const expression = item.requirements?.[scope];
			if (!expression) return [];
			const resolved = expressionContext(expression, context, item.id, content);
			return resolved ? [{ scope, expression: resolved }] : [undefined];
		});
		if (requirements.includes(undefined)) units.push(unavailable(key, unitContext, 'unresolvable'));
		else units.push(ready(key, { ...unitContext, requirements }));
	}

	for (const block of content.document.requirements.graduation ?? []) {
		const key = `graduation:${block.id}`;
		const unitContext = {
			block: { id: block.id, label: block.label, weight: block.weight },
			sources: sourceContext
		};
		if (!block.expr || hasUnknown(content, key)) {
			units.push(unavailable(key, unitContext, 'unknown_requirement'));
			continue;
		}
		const expression = expressionContext(block.expr, context, undefined, content);
		units.push(
			expression
				? ready(key, { ...unitContext, expression })
				: unavailable(key, unitContext, 'unresolvable')
		);
	}

	return { units };
};
