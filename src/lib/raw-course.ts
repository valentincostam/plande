import type { CourseState } from './course-state';
import type { CourseTag } from './course-tag';
import type { CourseTerm } from './course-term';

export type RawCourseRequirement = {
	id: number;
	requiredCourseId: number;
	requiredState: CourseState;
};

export type RawCourse = {
	id: number;
	name: string;
	year: number;
	hours: number;
	term: CourseTerm;
	requirements?: RawCourseRequirement[];
	tag?: CourseTag;
};
