import type { PlanStructure } from '$lib/prepare-plan';
import type { GraduationRequirement, RequirementExpr } from '$lib/study-plan-data';
import type { DraftPlanContent } from './draft-plan-content';

export type GraduationRequirementValue =
	| { kind: 'unknown'; note: string }
	| { kind: 'expression'; expression: RequirementExpr };

const scope = (blockId: string) => `graduation:${blockId}`;

export const readGraduationRequirement = (
	content: DraftPlanContent,
	blockId: string
): GraduationRequirementValue => {
	const block = content.document.requirements.graduation?.find(
		(candidate) => candidate.id === blockId
	);
	if (block?.expr) return { kind: 'expression', expression: structuredClone(block.expr) };
	return {
		kind: 'unknown',
		note:
			content.unknownRequirements.find((candidate) => candidate.scope === scope(blockId))?.note ??
			'Todavía no comprobado.'
	};
};

export const replaceGraduationRequirement = (
	content: DraftPlanContent,
	blockId: string,
	value: GraduationRequirementValue
): DraftPlanContent => {
	const result = structuredClone(content);
	const block = result.document.requirements.graduation?.find(
		(candidate) => candidate.id === blockId
	);
	if (!block) throw new Error(`Unknown graduation block: ${blockId}`);
	result.unknownRequirements = result.unknownRequirements.filter(
		(candidate) => candidate.scope !== scope(blockId)
	);
	if (value.kind === 'unknown') {
		delete block.expr;
		result.unknownRequirements.push({ scope: scope(blockId), note: value.note });
	} else block.expr = structuredClone(value.expression);
	return result;
};

export const completeDraftStructure = (content: DraftPlanContent): PlanStructure | undefined => {
	const graduation: GraduationRequirement[] = [];
	for (const block of content.document.requirements.graduation ?? []) {
		if (!block.expr) return undefined;
		graduation.push({
			id: block.id,
			label: block.label,
			expr: block.expr,
			...(block.weight === undefined ? {} : { weight: block.weight })
		});
	}
	return {
		sections: content.document.sections,
		items: content.document.items,
		requirements: graduation.length ? { graduation } : {}
	};
};
