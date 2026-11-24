import type { DraftPlanContent } from './draft-plan-content';
import type { RequirementScope, RequirementValue } from './section-patches';

export type { RequirementValue } from './section-patches';

const requirementScope = (itemId: string, scope: RequirementScope) => `item:${itemId}:${scope}`;

export const readRequirementField = (
	content: DraftPlanContent,
	itemId: string,
	scope: RequirementScope
): RequirementValue => {
	const item = content.document.items.find((candidate) => candidate.id === itemId);
	const expression = item?.requirements?.[scope];
	if (expression) return { kind: 'expression', expression: structuredClone(expression) };
	const unknown = content.unknownRequirements.find(
		(candidate) => candidate.scope === requirementScope(itemId, scope)
	);
	return unknown ? { kind: 'unknown', note: unknown.note } : { kind: 'none' };
};

export const replaceRequirementField = (
	content: DraftPlanContent,
	itemId: string,
	scope: RequirementScope,
	value: RequirementValue
): DraftPlanContent => {
	const result = structuredClone(content);
	const item = result.document.items.find((candidate) => candidate.id === itemId);
	if (!item) throw new Error(`Unknown item: ${itemId}`);
	const markerScope = requirementScope(itemId, scope);

	result.unknownRequirements = result.unknownRequirements.filter(
		(candidate) => candidate.scope !== markerScope
	);
	if (value.kind !== 'expression') {
		if (item.requirements) {
			delete item.requirements[scope];
			if (Object.keys(item.requirements).length === 0) delete item.requirements;
		}
		if (value.kind === 'unknown')
			result.unknownRequirements.push({ scope: markerScope, note: value.note });
		return result;
	}
	item.requirements = { ...item.requirements, [scope]: structuredClone(value.expression) };
	return result;
};
