import type { CourseTerm } from './course-term';
import type { GraduationProgress } from './requirement-evaluator';
import type { PlanSession, PlanItemState, SectionState } from './plan-session.svelte';
import type { RequirementExpr, Selector } from './study-plan-data';

export type RequirementView = {
	label: string;
	kind: 'enroll' | 'complete' | 'graduation';
};

export type StudyPlanViewTerm = {
	term?: CourseTerm;
	items: PlanItemState[];
};

export type StudyPlanViewSection = {
	section: SectionState;
	terms: StudyPlanViewTerm[];
};

export type StudyPlanView = {
	info: PlanSession['prepared']['plan']['info'];
	sections: StudyPlanViewSection[];
	additionalRequirements: PlanItemState[];
	graduation: GraduationProgress;
};

const describeSelector = (expr: RequirementExpr): string => {
	switch (expr.type) {
		case 'item':
			return `Item ${expr.itemId} ${expr.state}`;
		case 'all':
			return expr.rules.map(describeSelector).join(' y ');
		case 'any':
			return expr.rules.map(describeSelector).join(' o ');
		case 'count':
			return `${expr.min} items de ${describeSelectorSource(expr.selector)}`;
		case 'percent':
			return `${expr.minPercent}% de ${describeSelectorSource(expr.selector)}`;
		case 'sum':
			return `${expr.min} ${expr.metric} de ${describeSelectorSource(expr.selector)}`;
	}
};

const describeSelectorSource = (selector: Selector) => {
	if (selector.type === 'items') return 'items especificos';
	if (selector.type === 'tag') return `tag ${selector.tag}`;
	return `section ${selector.sectionId}`;
};

export const buildRequirementViews = (
	expr: RequirementExpr | undefined,
	kind: RequirementView['kind']
) => {
	if (!expr) return [];
	return [{ label: describeSelector(expr), kind }];
};

const sortSectionItems = (items: PlanItemState[], sectionId: string) => {
	return [...items].sort((a, b) => {
		const placementA = a.def.placements.find((placement) => placement.sectionId === sectionId);
		const placementB = b.def.placements.find((placement) => placement.sectionId === sectionId);
		const orderA = placementA?.order;
		const orderB = placementB?.order;

		if (orderA !== undefined && orderB !== undefined && orderA !== orderB) {
			return orderA - orderB;
		}

		if (orderA !== undefined && orderB === undefined) return -1;
		if (orderA === undefined && orderB !== undefined) return 1;

		return a.def.seqId - b.def.seqId;
	});
};

export const buildStudyPlanView = (session: PlanSession): StudyPlanView => {
	const sections = session.sections.map<StudyPlanViewSection>((sectionState) => {
		const terms = new Map<string, StudyPlanViewTerm>();

		for (const item of sortSectionItems(sectionState.items, sectionState.def.id)) {
			const placement = item.def.placements.find(
				(entry) => entry.sectionId === sectionState.def.id
			);
			const key = placement?.term ?? 'no-term';
			if (!terms.has(key)) {
				terms.set(key, { term: placement?.term, items: [] });
			}
			terms.get(key)!.items.push(item);
		}

		return {
			section: sectionState,
			terms: [...terms.values()]
		};
	});

	const additionalRequirements = session
		.getMilestoneItems()
		.filter((item) => item.def.placements.length === 0);

	return {
		info: session.prepared.plan.info,
		sections,
		additionalRequirements,
		graduation: session.graduation
	};
};
