import { courseStates, type CourseState } from './course-state';
import {
	decodeCourseItemStates,
	decodeMilestoneStates,
	encodeCourseItemStates,
	encodeMilestoneStates,
	sortItemsBySeqId
} from './study-plan-v5-url-state';
import type { PreparedPlan } from './prepare-plan';
import type { DependentEdge, Section } from './study-plan-v5';
import type { GraduationProgress, RequirementContext } from './requirement-evaluator';
import { evaluateGraduation, evaluateRequirement } from './requirement-evaluator';
import { normalizeItemState } from './normalize-item-state';
import { milestoneStates, type ItemState, type PlanItem } from './study-plan-v5';

export type PlanSessionOptions = {
	strictMode?: boolean;
	initialCourseStates?: CourseState[];
	initialMilestoneStates?: (typeof milestoneStates)[keyof typeof milestoneStates][];
	initialGrades?: (number | undefined)[];
};

const getInitialItemState = (
	item: PlanItem,
	initialCourseStates: CourseState[],
	initialMilestoneStates: (typeof milestoneStates)[keyof typeof milestoneStates][],
	indexByKind: { course: number; milestone: number }
): ItemState => {
	if (item.kind === 'course') {
		const state = initialCourseStates[indexByKind.course];
		indexByKind.course += 1;
		return state ?? courseStates.notTaken;
	}

	const state = initialMilestoneStates[indexByKind.milestone];
	indexByKind.milestone += 1;
	return state ?? milestoneStates.pending;
};

const getComparableSectionState = (item: PlanItemState): CourseState => {
	if (item.def.kind === 'course') {
		return item.state as CourseState;
	}

	return item.state === milestoneStates.completed ? courseStates.passed : courseStates.notTaken;
};

export const deriveSectionState = (items: PlanItemState[]) => {
	const states = items.map(getComparableSectionState);

	if (states.some((state) => state === courseStates.inProgress)) {
		return courseStates.inProgress;
	}

	if (states.some((state) => state === courseStates.notTaken)) {
		return courseStates.notTaken;
	}

	if (states.some((state) => state === courseStates.taken)) {
		return courseStates.taken;
	}

	if (states.length > 0 && states.every((state) => state === courseStates.passed)) {
		return courseStates.passed;
	}

	return courseStates.notTaken;
};

export class PlanItemState {
	def: PlanItem;
	session: PlanSession;
	state = $state<ItemState>(courseStates.notTaken);
	grade = $state<number | undefined>();
	dependents: DependentEdge[];
	isEnabled = $derived.by(() => {
		if (this.session.isInitializing) return true;
		if (!this.session.strictMode) return true;
		const req = this.def.requirements?.enroll;
		return !req || evaluateRequirement(req, this.session.context);
	});
	canPass = $derived.by(() => {
		if (this.session.isInitializing) return true;
		if (this.def.kind !== 'course') return this.canComplete;
		if (!this.session.strictMode) return true;
		const req = this.def.requirements?.complete;
		return !req || evaluateRequirement(req, this.session.context);
	});
	canComplete = $derived.by(() => {
		if (this.session.isInitializing) return true;
		if (!this.session.strictMode) return true;
		const req = this.def.requirements?.complete;
		return !req || evaluateRequirement(req, this.session.context);
	});

	constructor(def: PlanItem, session: PlanSession, initialState: ItemState, grade?: number) {
		this.def = def;
		this.session = session;
		this.state = initialState;
		this.grade = grade;
		this.dependents = session.prepared.dependentEdgesByItemId.get(def.id) ?? [];

		$effect(() => {
			if (this.session.isInitializing) return;

			const corrected = normalizeItemState(this.def, this.state, {
				isEnabled: this.isEnabled,
				canPass: this.canPass,
				canComplete: this.canComplete
			});

			if (corrected !== this.state) {
				this.state = corrected;
			}
		});
	}
}

export class SectionState {
	def: Section;
	items: PlanItemState[];
	isEnabled = $derived.by(() => this.items.every((item) => item.isEnabled));
	canPass = $derived.by(() => this.items.every((item) => item.canPass));
	state = $derived.by(() => deriveSectionState(this.items));

	constructor(def: Section, items: PlanItemState[]) {
		this.def = def;
		this.items = items;
	}
}

export class PlanSession {
	prepared: PreparedPlan;
	isInitializing = $state(true);
	strictMode = $state(true);
	items: PlanItemState[];
	itemsById: Map<string, PlanItemState>;
	sections: SectionState[];
	context: RequirementContext;
	graduation = $derived.by<GraduationProgress>(() =>
		evaluateGraduation(this.prepared.plan.requirements?.graduation ?? [], this.context)
	);

	constructor(prepared: PreparedPlan, options: PlanSessionOptions = {}) {
		this.prepared = prepared;
		this.strictMode = options.strictMode ?? true;
		this.itemsById = new Map();
		this.context = {
			getItem: (itemId) => {
				const item = this.itemsById.get(itemId);
				return item ? { item: item.def, state: item.state } : undefined;
			},
			getAllItems: () => this.items.map((item) => ({ item: item.def, state: item.state })),
			getItemsByTag: (tag) =>
				(prepared.itemIdsByTag.get(tag) ?? [])
					.map((itemId) => this.itemsById.get(itemId))
					.filter((item): item is PlanItemState => item !== undefined)
					.map((item) => ({ item: item.def, state: item.state })),
			getItemsBySection: (sectionId) =>
				(prepared.itemIdsBySection.get(sectionId) ?? [])
					.map((itemId) => this.itemsById.get(itemId))
					.filter((item): item is PlanItemState => item !== undefined)
					.map((item) => ({ item: item.def, state: item.state }))
		};

		const initialCourseStates = options.initialCourseStates ?? [];
		const initialMilestoneStates = options.initialMilestoneStates ?? [];
		const initialGrades = options.initialGrades ?? [];
		const indexByKind = { course: 0, milestone: 0 };

		this.items = prepared.orderedItems.map(
			(item) =>
				new PlanItemState(
					item,
					this,
					getInitialItemState(item, initialCourseStates, initialMilestoneStates, indexByKind),
					item.kind === 'course' ? initialGrades[indexByKind.course - 1] : undefined
				)
		);

		this.itemsById = new Map(this.items.map((item) => [item.def.id, item]));

		this.sections = prepared.sections.map((section) => {
			const sectionItems = dedupeItemStatesById(
				(prepared.itemIdsBySection.get(section.id) ?? [])
					.map((itemId) => this.itemsById.get(itemId))
					.filter((item): item is PlanItemState => item !== undefined)
			);
			return new SectionState(section, sectionItems);
		});

		this.isInitializing = false;
	}

	getCourseItems() {
		return sortItemsBySeqId(
			this.items.filter((item) => item.def.kind === 'course').map((item) => item.def)
		).map((def) => this.itemsById.get(def.id)!) as PlanItemState[];
	}

	getMilestoneItems() {
		return sortItemsBySeqId(
			this.items.filter((item) => item.def.kind === 'milestone').map((item) => item.def)
		).map((def) => this.itemsById.get(def.id)!) as PlanItemState[];
	}

	serializeCourseStates() {
		return encodeCourseItemStates(this.getCourseItems().map((item) => item.state as CourseState));
	}

	applySerializedCourseStates(encoded: string) {
		const states = decodeCourseItemStates(encoded);
		this.getCourseItems().forEach((item, index) => {
			item.state = states[index] ?? courseStates.notTaken;
		});
	}

	serializeMilestoneStates() {
		return encodeMilestoneStates(
			this.getMilestoneItems().map(
				(item) => item.state as (typeof milestoneStates)[keyof typeof milestoneStates]
			)
		);
	}

	applySerializedMilestoneStates(encoded: string) {
		const states = decodeMilestoneStates(encoded);
		this.getMilestoneItems().forEach((item, index) => {
			item.state = states[index] ?? milestoneStates.pending;
		});
	}

	reset() {
		for (const item of this.items) {
			item.state = item.def.kind === 'course' ? courseStates.notTaken : milestoneStates.pending;
			item.grade = undefined;
		}
		this.strictMode = true;
	}
}

const dedupeItemStatesById = (items: PlanItemState[]) => {
	const map = new Map<string, PlanItemState>();
	for (const item of items) {
		if (!map.has(item.def.id)) {
			map.set(item.def.id, item);
		}
	}
	return [...map.values()];
};
