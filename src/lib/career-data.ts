import type { RawCourse } from './raw-course';
import type { CareerProgressConfig } from './career-progress';

export interface CareerSource {
	id: number;
	label: string;
	url: string;
}

export interface CareerNote {
	id: number;
	text: string;
}

export interface CareerData {
	courses: RawCourse[];
	degree: string;
	years: number;
	college: string;
	studyProgram: string;
	sources: CareerSource[];
	notes?: CareerNote[];
	progress: CareerProgressConfig;
}
