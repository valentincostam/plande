import type { RawCourse } from './raw-course';
import type { DegreeProgressConfig } from './degree-progress';

export type DegreeSource = {
	id: number;
	label: string;
	url: string;
};

export type DegreeNote = {
	id: number;
	text: string;
};

export type DegreeData = {
	courses: RawCourse[];
	degree: string;
	years: number;
	college: string;
	studyProgram: string;
	sources: DegreeSource[];
	notes?: DegreeNote[];
	progress: DegreeProgressConfig;
};
