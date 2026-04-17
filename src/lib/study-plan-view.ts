import { courseTermLabels, type CourseTerm } from './course-term';
import { courseStates, isCourseStateGreaterOrEqual, type CourseState } from './course-state';
import type { GraduationProgress } from './requirement-evaluator';
import type { PlanSession, PlanItemState, SectionState } from './plan-session.svelte';
import type { PlanItem, RequirementExpr, RequirementState, Selector } from './study-plan-data';

const toKebabCase = (name: string) => name.replace(/\s+/g, '-');

type CoursePlanItem = Extract<PlanItem, { kind: 'course' }>;
export type CoursePlanItemState = Omit<PlanItemState, 'def' | 'state'> & {
	def: CoursePlanItem;
	state: CourseState;
};

export type ViewAtomicRequirement = {
	id: string;
	item: StudyPlanViewItem;
	requiredState: RequirementState;
	kind: 'enroll' | 'complete';
};

export type ViewDependent = {
	id: string;
	item: StudyPlanViewItem;
	requiredState: RequirementState;
	kind: 'enroll' | 'complete';
};

export type RequirementView = {
	label: string;
	kind: 'enroll' | 'complete' | 'graduation';
};

export type StudyPlanViewItem = {
	item: CoursePlanItemState;
	anchorId: string;
	diagramNodeId: number;
	year?: number;
	term?: CourseTerm;
	requirementsForEnrollment: ViewAtomicRequirement[];
	requirementsForCompletion: ViewAtomicRequirement[];
	requirementSummariesForEnrollment: RequirementView[];
	requirementSummariesForCompletion: RequirementView[];
	dependents: ViewDependent[];
	totalDependentCount: number;
};

export type StudyPlanViewTerm = {
	term?: CourseTerm;
	title?: string;
	items: StudyPlanViewItem[];
};

export type StudyPlanViewSection = {
	id: string;
	title: string;
	year?: number;
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

const extractAtomicRequirements = (
	expr: RequirementExpr | undefined,
	kind: 'enroll' | 'complete',
	itemsById: Map<string, StudyPlanViewItem>,
	ownerId: string,
	prefix: string
): ViewAtomicRequirement[] => {
	if (!expr) return [];

	switch (expr.type) {
		case 'item': {
			const item = itemsById.get(expr.itemId);
			if (!item) return [];
			return [
				{
					id: `${ownerId}-${prefix}-${expr.itemId}`,
					item,
					requiredState: expr.state,
					kind
				}
			];
		}
		case 'all':
		case 'any':
			return expr.rules.flatMap((rule, index) =>
				extractAtomicRequirements(rule, kind, itemsById, ownerId, `${prefix}-${index}`)
			);
		case 'count':
		case 'percent':
		case 'sum':
			return [];
	}
};

const buildDependents = (
	owner: StudyPlanViewItem,
	allItems: StudyPlanViewItem[]
): ViewDependent[] => {
	return allItems.flatMap((candidate) => [
		...candidate.requirementsForEnrollment
			.filter((requirement) => requirement.item.item.def.id === owner.item.def.id)
			.map((requirement) => ({
				id: `${candidate.item.def.id}-${requirement.id}`,
				item: candidate,
				requiredState: requirement.requiredState,
				kind: requirement.kind
			})),
		...candidate.requirementsForCompletion
			.filter((requirement) => requirement.item.item.def.id === owner.item.def.id)
			.map((requirement) => ({
				id: `${candidate.item.def.id}-${requirement.id}`,
				item: candidate,
				requiredState: requirement.requiredState,
				kind: requirement.kind
			}))
	]);
};

export const countAllViewDependents = (
	item: StudyPlanViewItem,
	itemsById: Map<string, StudyPlanViewItem>
) => {
	const visited = new Set<string>();
	const queue: StudyPlanViewItem[] = [item];

	while (queue.length > 0) {
		const current = queue.shift()!;
		for (const dependent of current.dependents) {
			if (visited.has(dependent.item.item.def.id)) continue;
			visited.add(dependent.item.item.def.id);
			const next = itemsById.get(dependent.item.item.def.id);
			if (next) queue.push(next);
		}
	}

	return visited.size;
};

export const isViewRequirementMet = (requirement: ViewAtomicRequirement) =>
	isCourseStateGreaterOrEqual(
		requirement.item.item.state,
		requirement.requiredState === 'completed' ? courseStates.passed : requirement.requiredState
	);

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
	const itemViews = session.getCourseItems().map<StudyPlanViewItem>((item) => ({
		item: item as CoursePlanItemState,
		anchorId: toKebabCase(item.def.name),
		diagramNodeId: Number.isFinite(Number(item.def.id)) ? Number(item.def.id) : item.def.seqId,
		year: (() => {
			const placement = item.def.placements[0];
			const match = placement ? /^year-(\d+)$/.exec(placement.sectionId) : null;
			return match ? Number(match[1]) : undefined;
		})(),
		term: item.def.placements[0]?.term,
		requirementsForEnrollment: [],
		requirementsForCompletion: [],
		requirementSummariesForEnrollment: buildRequirementViews(
			item.def.requirements?.enroll,
			'enroll'
		),
		requirementSummariesForCompletion: buildRequirementViews(
			item.def.requirements?.complete,
			'complete'
		),
		dependents: [],
		totalDependentCount: 0
	}));

	const itemViewsById = new Map(itemViews.map((item) => [item.item.def.id, item]));
	for (const itemView of itemViews) {
		itemView.requirementsForEnrollment = extractAtomicRequirements(
			itemView.item.def.requirements?.enroll,
			'enroll',
			itemViewsById,
			itemView.item.def.id,
			'enroll'
		);
		itemView.requirementsForCompletion = extractAtomicRequirements(
			itemView.item.def.requirements?.complete,
			'complete',
			itemViewsById,
			itemView.item.def.id,
			'complete'
		);
	}
	for (const itemView of itemViews) {
		itemView.dependents = buildDependents(itemView, itemViews);
	}
	for (const itemView of itemViews) {
		itemView.totalDependentCount = countAllViewDependents(itemView, itemViewsById);
	}

	const sections = session.sections.map<StudyPlanViewSection>((sectionState) => {
		const terms = new Map<string, StudyPlanViewTerm>();
		const yearMatch = /^year-(\d+)$/.exec(sectionState.def.id);

		for (const item of sortSectionItems(sectionState.items, sectionState.def.id)) {
			if (item.def.kind !== 'course') continue;
			const placement = item.def.placements.find(
				(entry) => entry.sectionId === sectionState.def.id
			);
			const key = placement?.term ?? 'no-term';
			if (!terms.has(key)) {
				terms.set(key, {
					term: placement?.term,
					title: placement?.term ? courseTermLabels[placement.term] : undefined,
					items: []
				});
			}
			const itemView = itemViewsById.get(item.def.id);
			if (itemView) {
				terms.get(key)!.items.push(itemView);
			}
		}

		return {
			id: sectionState.def.id,
			title: sectionState.def.label,
			year: yearMatch ? Number(yearMatch[1]) : undefined,
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
