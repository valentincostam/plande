import type { CourseState } from './course-state';
import type { CourseTag } from './course-tag';
import type { CourseTerm } from './course-term';

export const requiredFor = {
	enroll: 'enroll',
	complete: 'complete'
} as const;

export type RequiredFor = (typeof requiredFor)[keyof typeof requiredFor];

export type RawCourseRequirement = {
	id: number;
	requiredCourseId: number;
	requiredState: CourseState;
	requiredFor: RequiredFor;
};

export type RawCourse = {
	id: number;
	name: string;
	year: number;
	hours?: number;
	term: CourseTerm;
	requirements?: RawCourseRequirement[];
	tag?: CourseTag;
};
