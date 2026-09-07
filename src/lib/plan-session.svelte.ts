import { courseStates, type CourseState } from './course-state';
import {
	comparableCourseStateToItemState,
	decodeItemStates,
	encodeItemStates
} from './study-plan-url-state';
import type { PreparedPlan } from './prepare-plan';
import type { DependentEdge, Section } from './study-plan-data';
import type {
	GraduationProgress,
	RequirementContext,
	RequirementContextItem
} from './requirement-evaluator';
import { evaluateGraduation, evaluateRequirement } from './requirement-evaluator';
import { normalizeItemState } from './normalize-item-state';
import { milestoneStates, type ItemState, type PlanItem } from './study-plan-data';

export type PlanSessionOptions = {
	strictMode?: boolean;
	// Raw states ordered by seqId over ALL items (courses and milestones), as
	// decoded from the URL/localStorage letter stream.
	initialStates?: CourseState[];
	// Grades ordered the same way; milestone positions are ignored.
	initialGrades?: (number | undefined)[];
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
		return !req || evaluateRequirement(req, this.session.context, this.def.id);
	});
	canComplete = $derived.by(() => {
		if (this.session.isInitializing) return true;
		if (!this.session.strictMode) return true;
		const req = this.def.requirements?.complete;
		return !req || evaluateRequirement(req, this.session.context, this.def.id);
	});
	// A course can only be passed (and a milestone completed) when its
	// completion requirement holds; alias kept for readability at call sites.
	get canPass() {
		return this.canComplete;
	}

	constructor(def: PlanItem, session: PlanSession, initialState: ItemState, grade?: number) {
		this.def = def;
		this.session = session;
		this.state = initialState;
		this.grade = grade;
		this.dependents = session.prepared.dependentEdgesByItemId.get(def.id) ?? [];
	}

	setState(state: ItemState) {
		if (
			this.session.strictMode &&
			normalizeItemState(this.def, state, {
				isEnabled: this.isEnabled,
				canComplete: this.canComplete
			}) !== state
		) {
			return false;
		}

		this.state = state;
		return true;
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
	// All items ordered by seqId — the canonical serialization order.
	items: PlanItemState[];
	courseItems: PlanItemState[];
	milestoneItems: PlanItemState[];
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
		const contextItemsById = new Map<string, RequirementContextItem>();
		const contextArraysByTag = new Map<string, RequirementContextItem[]>();
		const contextArraysBySection = new Map<string, RequirementContextItem[]>();
		let allContextItems: RequirementContextItem[] | undefined;
		const getContextItem = (itemId: string) => {
			const cached = contextItemsById.get(itemId);
			if (cached) return cached;
			const itemState = this.itemsById.get(itemId);
			if (!itemState) return undefined;
			const contextItem = {
				item: itemState.def,
				get state() {
					return itemState.state;
				}
			};
			contextItemsById.set(itemId, contextItem);
			return contextItem;
		};
		const getContextItems = (ids: string[]) =>
			ids.map(getContextItem).filter((item): item is RequirementContextItem => item !== undefined);
		this.context = {
			getItem: getContextItem,
			getAllItems: () =>
				(allContextItems ??= getContextItems(this.items.map((item) => item.def.id))),
			getItemsByTag: (tag) => {
				const cached = contextArraysByTag.get(tag);
				if (cached) return cached;
				const items = getContextItems(prepared.itemIdsByTag.get(tag) ?? []);
				contextArraysByTag.set(tag, items);
				return items;
			},
			getItemsBySection: (sectionId) => {
				const cached = contextArraysBySection.get(sectionId);
				if (cached) return cached;
				const items = getContextItems(prepared.itemIdsBySection.get(sectionId) ?? []);
				contextArraysBySection.set(sectionId, items);
				return items;
			}
		};

		const initialStates = options.initialStates ?? [];
		const initialGrades = options.initialGrades ?? [];

		this.items = prepared.orderedItems.map(
			(item, index) =>
				new PlanItemState(
					item,
					this,
					comparableCourseStateToItemState(item, initialStates[index]),
					item.kind === 'course' ? initialGrades[index] : undefined
				)
		);

		this.courseItems = this.items.filter((item) => item.def.kind === 'course');
		this.milestoneItems = this.items.filter((item) => item.def.kind === 'milestone');
		this.itemsById = new Map(this.items.map((item) => [item.def.id, item]));

		this.sections = prepared.plan.sections.map((section) => {
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
		return this.courseItems;
	}

	getMilestoneItems() {
		return this.milestoneItems;
	}

	serializeStates() {
		return encodeItemStates(this.items.map((item) => ({ def: item.def, state: item.state })));
	}

	applySerializedStates(encoded: string) {
		this.applyStates(decodeItemStates(encoded));
	}

	applyStates(states: CourseState[]) {
		this.items.forEach((item, index) => {
			const next = comparableCourseStateToItemState(item.def, states[index]);
			if (item.state !== next) {
				item.state = next;
			}
		});
	}

	setCourseStates(itemIds: string[], state: CourseState) {
		const items = dedupeItemStatesById(
			itemIds
				.map((itemId) => this.itemsById.get(itemId))
				.filter((item): item is PlanItemState => item !== undefined && item.def.kind === 'course')
		);

		if (items.length === 0) return false;

		const previousStates = items.map((item) => item.state);
		items.forEach((item) => {
			item.state = state;
		});

		if (this.strictMode) {
			const allowed = items.every((item) => {
				const enroll = item.def.requirements?.enroll;
				const complete = item.def.requirements?.complete;
				return (
					normalizeItemState(item.def, state, {
						isEnabled: !enroll || evaluateRequirement(enroll, this.context, item.def.id),
						canComplete: !complete || evaluateRequirement(complete, this.context, item.def.id)
					}) === state
				);
			});

			if (!allowed) {
				items.forEach((item, index) => {
					item.state = previousStates[index];
				});
				return false;
			}
		}

		return true;
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
