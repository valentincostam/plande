import { courseTermLabels, type CourseTerm } from './course-term';
import type { CourseState } from './course-state';
import type { CourseType } from './course-type';
import type { GraduationProgress } from './requirement-evaluator';
import { evaluateProgress, meetsRequirementState, resolveSelector } from './requirement-evaluator';
import type { PlanSession, PlanItemState, SectionState } from './plan-session.svelte';
import type {
	MilestoneState,
	PlanItem,
	RequirementExpr,
	RequirementState,
	Selector
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
type MilestonePlanItem = Extract<PlanItem, { kind: 'milestone' }>;
export type CoursePlanItemState = Omit<PlanItemState, 'def' | 'state'> & {
	def: CoursePlanItem;
	state: CourseState;
	setState: PlanItemState['setState'];
};
export type MilestonePlanItemState = Omit<PlanItemState, 'def' | 'state'> & {
	def: MilestonePlanItem;
	state: MilestoneState;
	setState: PlanItemState['setState'];
};

export type StudyPlanViewMilestone = {
	item: MilestonePlanItemState;
	anchorId: string;
	diagramNodeId: number;
	year?: number;
	term?: CourseTerm;
	// Item-level references, used for dependents and export
	requirementsForEnrollment: ViewAtomicRequirement[];
	requirementsForCompletion: ViewAtomicRequirement[];
	// Full requirement tree, used for rendering
	requirementTreeForEnrollment: ViewRequirementNode[];
	requirementTreeForCompletion: ViewRequirementNode[];
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

// Structured requirement tree for rendering. Components own all user-facing
// copy; this carries only data.
export type ViewRequirementNode =
	| {
			nodeType: 'item';
			id: string;
			atomic: ViewAtomicRequirement;
			met: boolean;
	  }
	| {
			nodeType: 'group';
			id: string;
			op: 'all' | 'any';
			label?: string;
			met: boolean;
			children: ViewRequirementNode[];
	  }
	| {
			nodeType: 'quant';
			id: string;
			variant: 'count' | 'countOf' | 'percent' | 'sum';
			label?: string;
			met: boolean;
			completedUnits: number;
			totalUnits: number;
			requiredState?: RequirementState;
			metric?: 'hours' | 'totalHours' | 'credits';
			minPercent?: number;
			matchedItemCount?: number;
			metItemCount?: number;
			selector?: Selector;
			selectorCourseTypes?: CourseType[];
			selectorSections?: Array<{ id: string; label: string; year?: number }>;
			selectorCoversAllCourses?: boolean;
			children?: ViewRequirementNode[];
	  };

export type StudyPlanViewItem = {
	item: CoursePlanItemState;
	anchorId: string;
	diagramNodeId: number;
	year?: number;
	term?: CourseTerm;
	// Item-level references, used for dependents and export
	requirementsForEnrollment: ViewAtomicRequirement[];
	requirementsForCompletion: ViewAtomicRequirement[];
	// Full requirement tree, used for rendering
	requirementTreeForEnrollment: ViewRequirementNode[];
	requirementTreeForCompletion: ViewRequirementNode[];
	dependents: ViewDependent[];
	totalDependentCount: number;
};

export type StudyPlanViewTerm = {
	term?: CourseTerm;
	title?: string;
	items: LinkedStudyPlanViewItem[];
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

const buildRequirementTree = (
	expr: RequirementExpr,
	kind: 'enroll' | 'complete',
	itemsById: Map<string, LinkedStudyPlanViewItem>,
	ownerId: string,
	session: PlanSession,
	prefix: string
): ViewRequirementNode | undefined => {
	switch (expr.type) {
		case 'item': {
			const item = itemsById.get(expr.itemId);
			if (!item) return undefined;
			const atomic: ViewAtomicRequirement = {
				id: `${ownerId}-${prefix}-${expr.itemId}`,
				item,
				requiredState: expr.state,
				kind
			};
			return {
				nodeType: 'item',
				id: atomic.id,
				atomic,
				get met() {
					return isViewRequirementMet(atomic);
				}
			};
		}
		case 'all':
		case 'any': {
			const children = expr.rules
				.map((rule, index) =>
					buildRequirementTree(rule, kind, itemsById, ownerId, session, `${prefix}-${index}`)
				)
				.filter((node): node is ViewRequirementNode => node !== undefined);
			return {
				nodeType: 'group',
				id: `${ownerId}-${prefix}`,
				op: expr.type,
				label: expr.label,
				get met() {
					return evaluateProgress(expr, session.context, ownerId).met;
				},
				children
			};
		}
		case 'countOf': {
			const children = expr.rules
				.map((rule, index) =>
					buildRequirementTree(rule, kind, itemsById, ownerId, session, `${prefix}-${index}`)
				)
				.filter((node): node is ViewRequirementNode => node !== undefined);
			return {
				nodeType: 'quant',
				id: `${ownerId}-${prefix}`,
				variant: 'countOf',
				label: expr.label,
				get met() {
					return evaluateProgress(expr, session.context, ownerId).met;
				},
				get completedUnits() {
					return evaluateProgress(expr, session.context, ownerId).completedUnits;
				},
				get totalUnits() {
					return evaluateProgress(expr, session.context, ownerId).totalUnits;
				},
				children
			};
		}
		case 'count':
		case 'percent':
		case 'sum': {
			const matchedItems = resolveSelector(expr.selector, session.context, ownerId);
			const matchedItemCount = matchedItems.length;
			const allSelectableCourseIds = session.prepared.plan.items
				.filter((item) => item.kind === 'course' && item.id !== ownerId)
				.map((item) => item.id);
			const matchedIds = new Set(matchedItems.map(({ item }) => item.id));
			const selectorCourseTypes = [
				...new Set(matchedItems.flatMap(({ item }) => (item.kind === 'course' ? [item.type] : [])))
			];
			const selectorSectionIds =
				expr.selector.type === 'section'
					? [expr.selector.sectionId]
					: expr.selector.type === 'sections'
						? expr.selector.sectionIds
						: [];
			return {
				nodeType: 'quant',
				id: `${ownerId}-${prefix}`,
				variant: expr.type,
				label: expr.label,
				get met() {
					return evaluateProgress(expr, session.context, ownerId).met;
				},
				get completedUnits() {
					return evaluateProgress(expr, session.context, ownerId).completedUnits;
				},
				get totalUnits() {
					return evaluateProgress(expr, session.context, ownerId).totalUnits;
				},
				requiredState: expr.state,
				metric: expr.type === 'sum' ? expr.metric : undefined,
				minPercent: expr.type === 'percent' ? expr.minPercent : undefined,
				matchedItemCount,
				selector: expr.selector,
				selectorCourseTypes,
				selectorCoversAllCourses:
					matchedIds.size === allSelectableCourseIds.length &&
					allSelectableCourseIds.every((itemId) => matchedIds.has(itemId)),
				selectorSections: selectorSectionIds.map((sectionId) => {
					const section = session.prepared.plan.sections.find((entry) => entry.id === sectionId);
					return {
						id: sectionId,
						label: section?.label ?? sectionId,
						year: section?.year
					};
				}),
				get metItemCount() {
					return resolveSelector(expr.selector, session.context, ownerId).filter((entry) =>
						meetsRequirementState(entry.item, entry.state, expr.state)
					).length;
				}
			};
		}
	}
};

// A root all() without label renders as a flat list, exactly like the legacy
// atomic requirement list for classic plans.
const buildRequirementTreeRoots = (
	expr: RequirementExpr | undefined,
	kind: 'enroll' | 'complete',
	itemsById: Map<string, LinkedStudyPlanViewItem>,
	ownerId: string,
	session: PlanSession
): ViewRequirementNode[] => {
	if (!expr) return [];
	const root = buildRequirementTree(expr, kind, itemsById, ownerId, session, kind);
	if (!root) return [];
	if (root.nodeType === 'group' && root.op === 'all' && !root.label) {
		return root.children;
	}
	return [root];
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

// Course dependents keep the legacy ENROLLMENT-only semantics used by priority
// ranking. Milestones also expose completion dependents because those are their
// primary purpose in plans such as language sufficiency exams.
const buildDependents = (
	owner: LinkedStudyPlanViewItem,
	allItems: LinkedStudyPlanViewItem[]
): ViewDependent[] => {
	return allItems.flatMap((candidate) => {
		const requirements =
			owner.item.def.kind === 'milestone'
				? [...candidate.requirementsForEnrollment, ...candidate.requirementsForCompletion]
				: candidate.requirementsForEnrollment;

		return requirements
			.filter((requirement) => requirement.item.item.def.id === owner.item.def.id)
			.map((requirement) => ({
				id: `${candidate.item.def.id}-${requirement.id}`,
				item: candidate,
				requiredState: requirement.requiredState,
				kind: requirement.kind
			}));
	});
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
	const sectionsById = new Map(
		session.prepared.plan.sections.map((section) => [section.id, section])
	);
	const linkedItemViews = session.items.map<LinkedStudyPlanViewItem>((item) => {
		const viewFields = {
			anchorId: toKebabCase(item.def.name),
			diagramNodeId: Number.isFinite(Number(item.def.id)) ? Number(item.def.id) : item.def.seqId,
			year: sectionsById.get(item.def.placements[0]?.sectionId ?? '')?.year,
			term: item.def.placements[0]?.term,
			requirementsForEnrollment: [],
			requirementsForCompletion: [],
			requirementTreeForEnrollment: [],
			requirementTreeForCompletion: [],
			dependents: [],
			totalDependentCount: 0
		};

		return item.def.kind === 'course'
			? { item: item as CoursePlanItemState, ...viewFields }
			: { item: item as MilestonePlanItemState, ...viewFields };
	});
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
		itemView.requirementTreeForEnrollment = buildRequirementTreeRoots(
			itemView.item.def.requirements?.enroll,
			'enroll',
			itemViewsById,
			itemView.item.def.id,
			session
		);
		itemView.requirementTreeForCompletion = buildRequirementTreeRoots(
			itemView.item.def.requirements?.complete,
			'complete',
			itemViewsById,
			itemView.item.def.id,
			session
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
				if (itemView) {
					terms.get(key)!.items.push(itemView);
				}
			}

			return {
				id: sectionState.def.id,
				title: sectionState.def.label,
				year: sectionState.def.year,
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
		get graduation() {
			return session.graduation;
		}
	};
};
