import { courseStates } from '$lib/course-state';
import { preparePlan, type PlanStructure, type PreparedPlan } from '$lib/prepare-plan';
import {
	evaluateGraduation,
	type GraduationProgress,
	type RequirementContext,
	type RequirementContextItem
} from '$lib/requirement-evaluator';
import { milestoneStates, type ItemState, type PlanItem } from '$lib/study-plan-data';
import type { DraftPlanContent } from './draft-plan-content';
import { completeDraftStructure } from './graduation-field';

export type GraduationPreview =
	| { kind: 'unavailable'; message: string }
	| { kind: 'ready'; progress: GraduationProgress };

const defaultState = (item: PlanItem): ItemState =>
	item.kind === 'course' ? courseStates.notTaken : milestoneStates.pending;

const previewContext = <TPlan extends PlanStructure>(
	prepared: PreparedPlan<TPlan>,
	states: Record<string, ItemState>
): RequirementContext => {
	const items = (ids: string[]): RequirementContextItem[] =>
		ids.flatMap((id) => {
			const item = prepared.itemsById.get(id);
			return item ? [{ item, state: states[id] ?? defaultState(item) }] : [];
		});
	return {
		getItem: (id) => items([id])[0],
		getAllItems: () => items(prepared.orderedItems.map((item) => item.id)),
		getItemsByTag: (tag) => items(prepared.itemIdsByTag.get(tag) ?? []),
		getItemsBySection: (sectionId) => items(prepared.itemIdsBySection.get(sectionId) ?? [])
	};
};

export const previewGraduation = (
	content: DraftPlanContent,
	states: Record<string, ItemState>
): GraduationPreview => {
	const structure = completeDraftStructure(content);
	if (!structure)
		return {
			kind: 'unavailable',
			message: 'Completá los requisitos de egreso para ver el avance.'
		};
	if (
		content.unknownRequirements.some((requirement) => requirement.scope.startsWith('graduation:'))
	)
		return { kind: 'unavailable', message: 'Hay requisitos de egreso todavía no comprobados.' };
	try {
		const prepared = preparePlan(structure);
		return {
			kind: 'ready',
			progress: evaluateGraduation(
				prepared.plan.requirements?.graduation,
				previewContext(prepared, states)
			)
		};
	} catch {
		return { kind: 'unavailable', message: 'No se puede calcular el avance con estos requisitos.' };
	}
};
