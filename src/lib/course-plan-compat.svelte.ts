import { SvelteSet } from 'svelte/reactivity';
import type { CourseAttribute } from './course-attribute';
import type { CourseState } from './course-state';
import type { CourseTerm } from './course-term';
import type { CourseType } from './course-type';
import type { CourseDependent, CourseRequirement, CrossYearInfo } from './course.svelte';
import type { PlanSession, PlanItemState } from './plan-session.svelte';
import { courseStates, isCourseStateGreaterOrEqual } from './course-state';
import { requiredFor, type RawCourse, type RequiredFor } from './raw-course';
import type { PlanItem, RequirementExpr, RequirementState, StudyPlanData } from './study-plan-data';

export type CompatCourseRequirement = Omit<CourseRequirement, 'requiredCourse'> & {
	requiredCourse: CompatCourse;
};

export type CompatCourseDependent = Omit<CourseDependent, 'dependentCourse'> & {
	dependentCourse: CompatCourse;
};

export class CompatCourse {
	id: number;
	name: string;
	year?: number;
	term: CourseTerm;
	hours?: number;
	code?: string;
	type: CourseType;
	attributes: CourseAttribute[];
	crossYear?: CrossYearInfo;
	itemState: PlanItemState;
	requirementsForEnrollment: CompatCourseRequirement[] = [];
	requirementsForCompletion: CompatCourseRequirement[] = [];
	dependents: CompatCourseDependent[] = [];
	isStrictModeEnabled: () => boolean;

	constructor(props: {
		id: number;
		name: string;
		year?: number;
		term: CourseTerm;
		hours?: number;
		code?: string;
		type: CourseType;
		attributes: CourseAttribute[];
		crossYear?: CrossYearInfo;
		itemState: PlanItemState;
		isStrictModeEnabled: () => boolean;
	}) {
		this.id = props.id;
		this.name = props.name;
		this.year = props.year;
		this.term = props.term;
		this.hours = props.hours;
		this.code = props.code;
		this.type = props.type;
		this.attributes = props.attributes;
		this.crossYear = props.crossYear;
		this.itemState = props.itemState;
		this.isStrictModeEnabled = props.isStrictModeEnabled;
	}

	get state(): CourseState {
		return this.itemState.state as CourseState;
	}

	set state(value: CourseState) {
		this.itemState.state = value;
	}

	get grade() {
		return this.itemState.grade;
	}

	set grade(value: number | undefined) {
		this.itemState.grade = value;
	}

	get isEnabled() {
		return this.itemState.isEnabled;
	}

	get canPass() {
		return this.itemState.canPass;
	}
}

const dedupeByCourseId = <
	T extends { dependentCourse?: CompatCourse; requiredCourse?: CompatCourse }
>(
	items: T[],
	getId: (item: T) => number
) => {
	const map = new Map<number, T>();
	for (const item of items) {
		const id = getId(item);
		if (!map.has(id)) map.set(id, item);
	}
	return [...map.values()];
};

export const createCompatCoursesFromSession = (
	studyPlan: { courses: RawCourse[] },
	session: PlanSession
) => {
	const compatCourses = studyPlan.courses.map((rawCourse) => {
		const itemState = session.itemsById.get(rawCourse.id.toString());
		if (!itemState) {
			throw new Error(`Session item not found for course ${rawCourse.id}`);
		}

		return new CompatCourse({
			id: rawCourse.id,
			name: rawCourse.name,
			year: rawCourse.year,
			term: rawCourse.term,
			hours: rawCourse.hours,
			code: rawCourse.code,
			type: rawCourse.type,
			attributes: rawCourse.attributes ?? [],
			crossYear: rawCourse.crossYear,
			itemState,
			isStrictModeEnabled: () => session.strictMode
		});
	});

	const compatById = new Map(compatCourses.map((course) => [course.id, course]));

	for (const rawCourse of studyPlan.courses) {
		const compatCourse = compatById.get(rawCourse.id)!;
		const enrollRequirements = (rawCourse.requirements ?? [])
			.filter((requirement) => requirement.requiredFor === requiredFor.enroll)
			.map((requirement) => ({
				id: requirement.id,
				requiredCourse: compatById.get(requirement.requiredCourseId)!,
				requiredState: requirement.requiredState,
				requiredFor: requirement.requiredFor
			}));

		const completionRequirements = (rawCourse.requirements ?? [])
			.filter((requirement) => requirement.requiredFor === requiredFor.complete)
			.map((requirement) => ({
				id: requirement.id,
				requiredCourse: compatById.get(requirement.requiredCourseId)!,
				requiredState: requirement.requiredState,
				requiredFor: requirement.requiredFor
			}));

		compatCourse.requirementsForEnrollment = dedupeByCourseId(
			enrollRequirements,
			(requirement) => requirement.requiredCourse.id
		);
		compatCourse.requirementsForCompletion = dedupeByCourseId(
			completionRequirements,
			(requirement) => requirement.requiredCourse.id
		);
	}

	for (const compatCourse of compatCourses) {
		compatCourse.dependents = studyPlan.courses
			.flatMap((rawCourse) =>
				(rawCourse.requirements ?? [])
					.filter((requirement) => requirement.requiredCourseId === compatCourse.id)
					.map((requirement) => ({ rawCourse, requirement }))
			)
			.map(({ rawCourse, requirement }) => {
				const dependentCourse = compatById.get(rawCourse.id);
				if (!dependentCourse) return undefined;

				return {
					requiredCourseId: compatCourse.id,
					dependentCourse,
					requiredState: requirement.requiredState,
					requiredFor: requirement.requiredFor
				};
			})
			.filter((dependent): dependent is CompatCourseDependent => dependent !== undefined);
	}

	return compatCourses;
};

const mapRequirementState = (state: RequirementState): CourseState => {
	switch (state) {
		case 'inProgress':
			return courseStates.inProgress;
		case 'taken':
			return courseStates.taken;
		case 'passed':
		case 'completed':
			return courseStates.passed;
	}
};

const extractCompatRequirements = (
	expr: RequirementExpr | undefined,
	requiredForValue: RequiredFor,
	compatById: Map<string, CompatCourse>,
	ownerId: string,
	prefix: string
): CompatCourseRequirement[] => {
	if (!expr) return [];

	switch (expr.type) {
		case 'item': {
			const requiredCourse = compatById.get(expr.itemId);
			if (!requiredCourse) return [];
			return [
				{
					id: Number(`${ownerId}${expr.itemId}`),
					requiredCourse,
					requiredState: mapRequirementState(expr.state),
					requiredFor: requiredForValue
				}
			];
		}
		case 'all':
		case 'any':
			return expr.rules.flatMap((rule, index) =>
				extractCompatRequirements(rule, requiredForValue, compatById, ownerId, `${prefix}-${index}`)
			);
		case 'count':
		case 'percent':
		case 'sum':
			return [];
	}
};

const getPrimaryPlacement = (item: PlanItem) => item.placements[0];

const getYearFromPlacement = (item: PlanItem) => {
	const sectionId = getPrimaryPlacement(item)?.sectionId;
	if (!sectionId) return undefined;
	const match = /^year-(\d+)$/.exec(sectionId);
	return match ? Number(match[1]) : undefined;
};

const getCrossYearFromPlacements = (item: PlanItem): CrossYearInfo | undefined => {
	if (item.placements.length < 2) return undefined;
	const primary = item.placements[0];
	const secondary = item.placements[1];
	const primaryYear = primary ? /^year-(\d+)$/.exec(primary.sectionId)?.[1] : undefined;
	const secondaryYear = secondary ? /^year-(\d+)$/.exec(secondary.sectionId)?.[1] : undefined;
	if (!secondaryYear || primaryYear === secondaryYear) return undefined;
	return {
		spansToYear: Number(secondaryYear),
		endsInTerm: secondary.term ?? primary.term!
	};
};

export const createCompatCoursesFromNativePlanSession = (
	studyPlan: StudyPlanData,
	session: PlanSession
) => {
	const compatCourses = studyPlan.items
		.filter((item) => item.kind === 'course')
		.map((item) => {
			const itemState = session.itemsById.get(item.id);
			if (!itemState) {
				throw new Error(`Session item not found for native course ${item.id}`);
			}

			return new CompatCourse({
				id: Number(item.id),
				name: item.name,
				year: getYearFromPlacement(item),
				term: getPrimaryPlacement(item)?.term ?? 'semestral',
				hours: item.hours,
				code: item.code,
				type: item.type,
				attributes: item.attributes ?? [],
				crossYear: getCrossYearFromPlacements(item),
				itemState,
				isStrictModeEnabled: () => session.strictMode
			});
		});

	const compatById = new Map(compatCourses.map((course) => [course.id.toString(), course]));

	for (const item of studyPlan.items) {
		if (item.kind !== 'course') continue;
		const compatCourse = compatById.get(item.id);
		if (!compatCourse) continue;

		compatCourse.requirementsForEnrollment = dedupeByCourseId(
			extractCompatRequirements(
				item.requirements?.enroll,
				requiredFor.enroll,
				compatById,
				item.id,
				'enroll'
			),
			(requirement) => requirement.requiredCourse.id
		);
		compatCourse.requirementsForCompletion = dedupeByCourseId(
			extractCompatRequirements(
				item.requirements?.complete,
				requiredFor.complete,
				compatById,
				item.id,
				'complete'
			),
			(requirement) => requirement.requiredCourse.id
		);
	}

	for (const compatCourse of compatCourses) {
		compatCourse.dependents = studyPlan.items
			.filter((item) => item.kind === 'course' && item.id !== compatCourse.id.toString())
			.flatMap((item) => {
				const dependentCourse = compatById.get(item.id);
				if (!dependentCourse) return [];

				return [
					...extractCompatRequirements(
						item.requirements?.enroll,
						requiredFor.enroll,
						compatById,
						item.id,
						'dep-enroll'
					),
					...extractCompatRequirements(
						item.requirements?.complete,
						requiredFor.complete,
						compatById,
						item.id,
						'dep-complete'
					)
				]
					.filter((requirement) => requirement.requiredCourse.id === compatCourse.id)
					.map((requirement) => ({
						requiredCourseId: compatCourse.id,
						dependentCourse,
						requiredState: requirement.requiredState,
						requiredFor: requirement.requiredFor
					}));
			});
	}

	return compatCourses;
};

export const countAllCompatDependents = (course: CompatCourse): number => {
	const visited = new SvelteSet<number>();
	const queue: CompatCourse[] = [course];

	while (queue.length > 0) {
		const current = queue.shift()!;
		for (const dep of current.dependents) {
			if (visited.has(dep.dependentCourse.id)) continue;
			visited.add(dep.dependentCourse.id);
			queue.push(dep.dependentCourse);
		}
	}

	return visited.size;
};

export const isCompatRequirementMet = (requirement: CompatCourseRequirement) =>
	isCourseStateGreaterOrEqual(requirement.requiredCourse.state, requirement.requiredState);
