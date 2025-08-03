import { courseStates, type CourseState } from './course-state';
import type { CourseTag } from './course-tag';
import type { CourseTerm } from './course-term';
import type { RawCourse, RawCourseRequirement } from './raw-course';

export type CourseRequirement = {
	id: number;
	requiredCourse: Course;
	requiredState: CourseState;
};

export type CourseDependent = {
	requiredCourseId: number;
	dependentCourse: Course;
	requiredState: CourseState;
};

type CourseProperties = {
	id: number;
	name: string;
	year: number;
	term: CourseTerm;
	hours: number;
	requirements?: CourseRequirement[];
	tag?: CourseTag;
	state?: CourseState;
	dependents?: CourseDependent[];
	isStrictModeEnabled: () => boolean;
};

export class Course {
	id: number;
	name: string;
	year: number;
	term: CourseTerm;
	hours: number;
	tag?: CourseTag;
	state: CourseState;
	requirements: CourseRequirement[];
	dependents: CourseDependent[];
	isStrictModeEnabled: () => boolean;
	isEnabled = $derived.by(() => {
		if (!this.isStrictModeEnabled()) return true;

		return this.requirements.every(
			(req) =>
				req.requiredCourse.state === req.requiredState ||
				req.requiredCourse.state === courseStates.passed
		);
	});

	constructor(properties: CourseProperties) {
		this.id = properties.id;
		this.name = properties.name;
		this.year = properties.year;
		this.term = properties.term;
		this.requirements = properties.requirements || [];
		this.tag = properties.tag;
		this.hours = properties.hours;
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
		tag: rawCourse.tag,
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
		requiredState: requirement.requiredState
	};
};

const createCourseRequirements = (course: RawCourse, allCourses: Course[]): CourseRequirement[] => {
	if (!course.requirements) return [];

	return course.requirements.map((requirement) => createCourseRequirement(requirement, allCourses));
};

const createCourseDependent = (
	requirement: CourseRequirement,
	course: Course
): CourseDependent => ({
	requiredCourseId: requirement.requiredCourse.id,
	dependentCourse: course,
	requiredState: requirement.requiredState
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
			course.requirements = createCourseRequirements(rawCourse, courses);
		}
	});

	const allCourseDependents = courses.flatMap(
		(course) =>
			course.requirements?.map((requirement) => createCourseDependent(requirement, course)) ?? []
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
