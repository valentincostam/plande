import { courseTermLabels, type CourseTerm } from './course-term';
import { courseStates, isCourseStateGreaterOrEqual, type CourseState } from './course-state';
import type { GraduationProgress } from './requirement-evaluator';
import {
	evaluateRequirement,
	meetsRequirementState,
	resolveSelector
} from './requirement-evaluator';
import type { PlanSession, PlanItemState, SectionState } from './plan-session.svelte';
import {
	milestoneStates,
	type PlanItem,
	type RequirementExpr,
	type RequirementState,
	type Selector
} from './study-plan-data';

const toKebabCase = (name: string) => name.replace(/\s+/g, '-');

const termSortOrder: Record<string, number> = {
	annualOrSemestral: 0,
	annual: 1,
	firstSemester: 2,
	secondSemester: 3,
	semestral: 4,
	'no-term': 5
};

type CoursePlanItem = Extract<PlanItem, { kind: 'course' }>;
export type CoursePlanItemState = Omit<PlanItemState, 'def' | 'state'> & {
	def: CoursePlanItem;
	state: CourseState;
	setState: PlanItemState['setState'];
};

export type StudyPlanViewMilestone = {
	item: PlanItemState;
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

export type LinkedStudyPlanViewItem = StudyPlanViewItem | StudyPlanViewMilestone;

export type ViewAtomicRequirement = {
	id: string;
	item: LinkedStudyPlanViewItem;
	requiredState: RequirementState;
	kind: 'enroll' | 'complete';
};

export type ViewDependent = {
	id: string;
	item: LinkedStudyPlanViewItem;
	requiredState: RequirementState;
	kind: 'enroll' | 'complete';
};

export type RequirementView = {
	label: string;
	kind: 'enroll' | 'complete' | 'graduation';
	isMet: boolean;
	description?: string;
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
	additionalRequirements: StudyPlanViewMilestone[];
	graduation: GraduationProgress;
};

const describeSelector = (expr: RequirementExpr): string => {
	switch (expr.type) {
		case 'item':
			return `Item ${expr.itemId} ${expr.state}`;
		case 'all':
			if (expr.label) return expr.label;
			return expr.rules.map(describeSelector).join(' y ');
		case 'any':
			if (expr.label) return expr.label;
			return expr.rules.map(describeSelector).join(' o ');
		case 'count':
			if (expr.label) return expr.label;
			return `${expr.min} items de ${describeSelectorSource(expr.selector)}`;
		case 'countOf':
			if (expr.label) return expr.label;
			return `${expr.min} de: ${expr.rules.map(describeSelector).join(', ')}`;
		case 'percent':
			if (expr.label) return expr.label;
			return `${expr.minPercent}% de ${describeSelectorSource(expr.selector)}`;
		case 'sum':
			if (expr.label) return expr.label;
			return `${expr.min} ${expr.metric} de ${describeSelectorSource(expr.selector)}`;
	}
};

const describeSelectorSource = (selector: Selector) => {
	switch (selector.type) {
		case 'items':
			return 'items especificos';
		case 'tag':
			return `tag ${selector.tag}`;
		case 'section':
			return `section ${selector.sectionId}`;
		case 'all':
			return selector.courseType ? `todas las ${selector.courseType}` : 'todas las materias';
		case 'sections':
			return `sections ${selector.sectionIds.join(', ')}`;
	}
};

const formatPercentRequirementDescription = (
	expr: Extract<RequirementExpr, { type: 'percent' }>,
	session: PlanSession
) => {
	const items = resolveSelector(expr.selector, session.context);
	const total = items.length;
	if (total === 0) return undefined;

	const metCount = items.filter((item) =>
		meetsRequirementState(item.item, item.state, expr.state)
	).length;
	const requiredCount = Math.ceil((expr.minPercent / 100) * total);
	const currentPercent = Math.floor((metCount / total) * 100);

	if (metCount >= requiredCount) {
		return `${expr.minPercent}% de las materias (${requiredCount} de ${total}) deben estar aprobadas y ${currentPercent}% lo está (${metCount} de ${total})`;
	}

	return `${expr.minPercent}% de las materias (${requiredCount} de ${total}) deben estar aprobadas pero solo el ${currentPercent}% lo está (${metCount} de ${total})`;
};

const describeRequirementView = (expr: RequirementExpr, session: PlanSession) => {
	if (expr.type === 'percent') {
		return {
			label: expr.label ?? `${expr.minPercent}% de ${describeSelectorSource(expr.selector)}`,
			description: formatPercentRequirementDescription(expr, session)
		};
	}

	return { label: describeSelector(expr) };
};

export const buildRequirementViews = (
	expr: RequirementExpr | undefined,
	kind: RequirementView['kind'],
	session: PlanSession
) => {
	if (!expr) return [];
	const description = describeRequirementView(expr, session);
	return [
		{
			label: description.label,
			kind,
			isMet: evaluateRequirement(expr, session.context),
			description: description.description
		}
	];
};

const extractAtomicRequirements = (
	expr: RequirementExpr | undefined,
	kind: 'enroll' | 'complete',
	itemsById: Map<string, LinkedStudyPlanViewItem>,
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
		case 'countOf':
		case 'percent':
		case 'sum':
			return [];
	}
};

const buildDependents = (
	owner: LinkedStudyPlanViewItem,
	allItems: LinkedStudyPlanViewItem[]
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
	item: LinkedStudyPlanViewItem,
	itemsById: Map<string, LinkedStudyPlanViewItem>
) => {
	const visited = new Set<string>();
	const queue: LinkedStudyPlanViewItem[] = [item];

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
	meetsRequirementState(
		requirement.item.item.def,
		requirement.item.item.state,
		requirement.requiredState
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
	const linkedItemViews = session.items.map<LinkedStudyPlanViewItem>((item) => ({
		item: item.def.kind === 'course' ? (item as CoursePlanItemState) : item,
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
			'enroll',
			session
		),
		requirementSummariesForCompletion: buildRequirementViews(
			item.def.requirements?.complete,
			'complete',
			session
		),
		dependents: [],
		totalDependentCount: 0
	}));
	const itemViews = linkedItemViews.filter(
		(item): item is StudyPlanViewItem => item.item.def.kind === 'course'
	);

	const itemViewsById = new Map(linkedItemViews.map((item) => [item.item.def.id, item]));
	for (const itemView of linkedItemViews) {
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
	for (const itemView of linkedItemViews) {
		itemView.dependents = buildDependents(itemView, linkedItemViews);
	}
	for (const itemView of linkedItemViews) {
		itemView.totalDependentCount = countAllViewDependents(itemView, itemViewsById);
	}

	const sections = session.sections
		.map<StudyPlanViewSection>((sectionState) => {
			const terms = new Map<string, StudyPlanViewTerm>();
			const yearMatch = /^year-(\d+)$/.exec(sectionState.def.id);

			for (const item of sortSectionItems(sectionState.items, sectionState.def.id)) {
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
				if (itemView && itemView.item.def.kind === 'course') {
					terms.get(key)!.items.push(itemView as StudyPlanViewItem);
				}
			}

			return {
				id: sectionState.def.id,
				title: sectionState.def.label,
				year: yearMatch ? Number(yearMatch[1]) : undefined,
				section: sectionState,
				terms: [...terms.values()].sort((a, b) => {
					const aKey = a.term ?? 'no-term';
					const bKey = b.term ?? 'no-term';
					return (termSortOrder[aKey] ?? 999) - (termSortOrder[bKey] ?? 999);
				})
			};
		})
		.filter((section) => section.terms.length > 0);

	const additionalRequirements = session
		.getMilestoneItems()
		.filter((item) => item.def.placements.length === 0);

	return {
		info: session.prepared.plan.info,
		sections,
		additionalRequirements: additionalRequirements
			.map((item) => itemViewsById.get(item.def.id))
			.filter((item): item is StudyPlanViewMilestone => item !== undefined),
		graduation: session.graduation
	};
};
