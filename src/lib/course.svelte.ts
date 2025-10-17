import { courseStates, isCourseStateGreaterOrEqual, type CourseState } from './course-state';
import type { CourseTag } from './course-tag';
import type { CourseTerm } from './course-term';
import {
	requiredFor,
	type RawCourse,
	type RawCourseRequirement,
	type RequiredFor
} from './raw-course';

export const TRANSVERSAL_YEAR = -1;

export type CourseRequirement = {
	id: number;
	requiredCourse: Course;
	requiredState: CourseState;
	requiredFor: RequiredFor;
};

export type CourseDependent = {
	requiredCourseId: number;
	dependentCourse: Course;
	requiredState: CourseState;
	requiredFor: RequiredFor;
};

export type CrossYearInfo = {
	spansToYear: number;
	endsInTerm: CourseTerm;
};

type CourseProperties = {
	id: number;
	name: string;
	year: number;
	term: CourseTerm;
	hours?: number;
	code?: string;
	requirementsForEnrollment?: CourseRequirement[];
	requirementsForCompletion?: CourseRequirement[];
	tag?: CourseTag;
	state?: CourseState;
	dependents?: CourseDependent[];
	crossYear?: CrossYearInfo;
	isStrictModeEnabled: () => boolean;
};

export class Course {
	id: number;
	name: string;
	year: number;
	term: CourseTerm;
	hours?: number;
	code?: string;
	tag?: CourseTag;
	state: CourseState;
	requirementsForEnrollment: CourseRequirement[];
	requirementsForCompletion: CourseRequirement[];
	dependents: CourseDependent[];
	crossYear?: CrossYearInfo;
	isStrictModeEnabled: () => boolean;
	isEnabled = $derived.by(() => {
		if (!this.isStrictModeEnabled()) return true;

		return this.requirementsForEnrollment.every((req) =>
			isCourseStateGreaterOrEqual(req.requiredCourse.state, req.requiredState)
		);
	});
	canPass = $derived.by(() => {
		if (!this.isStrictModeEnabled()) return true;

		return (
			!this.requirementsForCompletion ||
			this.requirementsForCompletion.every((req) =>
				isCourseStateGreaterOrEqual(req.requiredCourse.state, req.requiredState)
			)
		);
	});

	constructor(properties: CourseProperties) {
		this.id = properties.id;
		this.name = properties.name;
		this.year = properties.year;
		this.term = properties.term;
		this.requirementsForEnrollment = properties.requirementsForEnrollment || [];
		this.requirementsForCompletion = properties.requirementsForCompletion || [];
		this.tag = properties.tag;
		this.hours = properties.hours;
		this.code = properties.code;
		this.crossYear = properties.crossYear;
		this.state = $state(properties.state || courseStates.notTaken);
		this.isStrictModeEnabled = properties.isStrictModeEnabled;
		this.dependents = properties.dependents || [];

		$effect(() => {
			if (!this.isEnabled && this.state !== courseStates.notTaken) {
				this.state = courseStates.notTaken;
			}
		});
	}
}

const createCourseWithoutCorrelatives = (
	rawCourse: RawCourse,
	isStrictModeEnabled: () => boolean,
	state?: CourseState
) =>
	new Course({
		id: rawCourse.id,
		name: rawCourse.name,
		year: rawCourse.year,
		term: rawCourse.term,
		hours: rawCourse.hours,
		code: rawCourse.code,
		tag: rawCourse.tag,
		crossYear: rawCourse.crossYear,
		state: state || courseStates.notTaken,
		isStrictModeEnabled
	});

const createCourseRequirement = (
	requirement: RawCourseRequirement,
	allCourses: Course[]
): CourseRequirement => {
	const requiredCourse = allCourses.find((course) => course.id === requirement.requiredCourseId);

	if (!requiredCourse) {
		throw new Error(`Course ${requirement.requiredCourseId} not found`);
	}

	return {
		id: requirement.id,
		requiredCourse,
		requiredState: requirement.requiredState,
		requiredFor: requirement.requiredFor
	};
};

const createCourseRequirementsForEnrollment = (
	course: RawCourse,
	allCourses: Course[]
): CourseRequirement[] => {
	if (!course.requirements) return [];

	return course.requirements
		.filter((requirement) => requirement.requiredFor === requiredFor.enroll)
		.map((requirement) => createCourseRequirement(requirement, allCourses));
};

const createCourseRequirementsForCompletion = (
	course: RawCourse,
	allCourses: Course[]
): CourseRequirement[] => {
	if (!course.requirements) return [];

	return course.requirements
		.filter((requirement) => requirement.requiredFor === requiredFor.complete)
		.map((requirement) => createCourseRequirement(requirement, allCourses));
};

const createCourseDependent = (
	requirement: CourseRequirement,
	course: Course
): CourseDependent => ({
	requiredCourseId: requirement.requiredCourse.id,
	dependentCourse: course,
	requiredState: requirement.requiredState,
	requiredFor: requirement.requiredFor
});

export const createCourses = (
	rawCourses: RawCourse[],
	coursesStates: CourseState[],
	isStrictModeEnabled: () => boolean
) => {
	const courses = rawCourses.map((rawCourse, index) =>
		createCourseWithoutCorrelatives(rawCourse, isStrictModeEnabled, coursesStates[index])
	);

	// Add requirements
	courses.forEach((course) => {
		const rawCourse = rawCourses.find((raw) => raw.id === course.id);

		if (rawCourse) {
			course.requirementsForEnrollment = createCourseRequirementsForEnrollment(rawCourse, courses);
			course.requirementsForCompletion = createCourseRequirementsForCompletion(rawCourse, courses);
		}
	});

	const allCourseDependents = courses.flatMap(
		(course) =>
			course.requirementsForEnrollment?.map((requirement) =>
				createCourseDependent(requirement, course)
			) ?? []
	);

	const courseDependentsMap = allCourseDependents.reduce(
		(dependentsMap, courseDependent) => {
			dependentsMap[courseDependent.requiredCourseId] = [
				...(dependentsMap[courseDependent.requiredCourseId] ?? []),
				courseDependent
			];
			return dependentsMap;
		},
		{} as Record<number, CourseDependent[]>
	);

	// Add dependents
	courses.forEach((course) => {
		course.dependents = courseDependentsMap[course.id] || [];
	});

	return courses;
};

export const toKebabCase = (name: string) => name.replace(/\s+/g, '-');
