import type { CourseAttribute } from './course-attribute';
import { courseStates, isCourseStateGreaterOrEqual, type CourseState } from './course-state';
import type { CourseTerm } from './course-term';
import { type CourseType } from './course-type';
import {
	requiredFor,
	type RawCourse,
	type RawCourseRequirement,
	type RequiredFor
} from './raw-course';

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
	year?: number;
	term: CourseTerm;
	hours?: number;
	code?: string;
	requirementsForEnrollment?: CourseRequirement[];
	requirementsForCompletion?: CourseRequirement[];
	type: CourseType;
	attributes: CourseAttribute[];
	state?: CourseState;
	grade?: number;
	dependents?: CourseDependent[];
	crossYear?: CrossYearInfo;
	isStrictModeEnabled: () => boolean;
};

export class Course {
	id: number;
	name: string;
	year?: number;
	term: CourseTerm;
	hours?: number;
	code?: string;
	type: CourseType;
	attributes: CourseAttribute[];
	state = $state<CourseState>(courseStates.notTaken);
	grade = $state<number | undefined>();
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
		this.type = properties.type;
		this.attributes = properties.attributes;
		this.hours = properties.hours;
		this.code = properties.code;
		this.crossYear = properties.crossYear;
		this.state = properties.state || courseStates.notTaken;
		this.grade = properties.grade;
		this.isStrictModeEnabled = properties.isStrictModeEnabled;
		this.dependents = properties.dependents || [];

		$effect(() => {
			if (!this.isEnabled && this.state !== courseStates.notTaken) {
				this.state = courseStates.notTaken;
			}

			if (!this.canPass && this.state === courseStates.passed) {
				this.state = courseStates.notTaken;
			}
		});
	}
}

const createCourseWithoutCorrelatives = (
	rawCourse: RawCourse,
	isStrictModeEnabled: () => boolean,
	state?: CourseState,
	grade?: number
) =>
	new Course({
		id: rawCourse.id,
		name: rawCourse.name,
		year: rawCourse.year,
		term: rawCourse.term,
		hours: rawCourse.hours,
		code: rawCourse.code,
		type: rawCourse.type,
		attributes: rawCourse.attributes ?? [],
		crossYear: rawCourse.crossYear,
		state: state || courseStates.notTaken,
		grade,
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
	isStrictModeEnabled: () => boolean,
	coursesGrades: (number | undefined)[] = []
) => {
	const courses = rawCourses.map((rawCourse, index) =>
		createCourseWithoutCorrelatives(
			rawCourse,
			isStrictModeEnabled,
			coursesStates[index],
			coursesGrades[index]
		)
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

export const countAllDependents = (course: Course): number => {
	const visited = new Set<number>();
	const queue: Course[] = [course];

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

export const toKebabCase = (name: string) => name.replace(/\s+/g, '-');
