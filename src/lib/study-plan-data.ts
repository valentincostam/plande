import type { CourseAttribute } from './course-attribute';
import type { CourseState } from './course-state';
import type { CourseTerm } from './course-term';
import type { CourseType } from './course-type';

export type StudyPlanSource = {
	id: number;
	label: string;
	url: string;
};

export type StudyPlanNote = {
	id: number;
	text: string;
};

export type StudyPlanInfo = {
	degreeName: string;
	degreeSlug: string;
	universityName: string;
	universitySlug: string;
	collegeName?: string;
	collegeSlug?: string;
	year?: number;
	sources?: StudyPlanSource[];
	notes?: StudyPlanNote[];
};

export type Section = {
	id: string;
	label: string;
};

export type Placement = {
	sectionId: string;
	term?: CourseTerm;
	order?: number;
};

export const milestoneStates = {
	pending: 'pending',
	completed: 'completed'
} as const;

export type MilestoneState = (typeof milestoneStates)[keyof typeof milestoneStates];
export type CourseItemState = CourseState;
export type ItemState = CourseItemState | MilestoneState;

export const requirementStates = {
	inProgress: 'inProgress',
	taken: 'taken',
	passed: 'passed',
	completed: 'completed'
} as const;

export type RequirementState = (typeof requirementStates)[keyof typeof requirementStates];

export type Selector =
	| { type: 'items'; itemIds: string[] }
	| { type: 'tag'; tag: string }
	| { type: 'section'; sectionId: string };

export type RequirementExpr =
	| { type: 'item'; itemId: string; state: RequirementState }
	| { type: 'all'; rules: RequirementExpr[] }
	| { type: 'any'; rules: RequirementExpr[] }
	| { type: 'count'; selector: Selector; min: number; state: RequirementState }
	| { type: 'percent'; selector: Selector; minPercent: number; state: RequirementState }
	| {
			type: 'sum';
			selector: Selector;
			metric: 'hours' | 'credits';
			min: number;
			state: RequirementState;
	  };

export type GraduationRequirement =
	| {
			id: string;
			label: string;
			type: 'allMandatory';
			weight?: number;
	  }
	| {
			id: string;
			label: string;
			type: 'item';
			itemId: string;
			state: 'passed' | 'completed';
			weight?: number;
	  }
	| {
			id: string;
			label: string;
			type: 'count';
			selector: Selector;
			min: number;
			state: 'passed' | 'completed';
			weight?: number;
	  }
	| {
			id: string;
			label: string;
			type: 'sum';
			selector: Selector;
			metric: 'hours' | 'credits';
			min: number;
			state: 'passed' | 'completed';
			weight?: number;
	  };

type BasePlanItem = {
	id: string;
	seqId: number;
	name: string;
	code?: string;
	tags?: string[];
	placements: Placement[];
	requirements?: {
		enroll?: RequirementExpr;
		complete?: RequirementExpr;
	};
};

export type CoursePlanItem = BasePlanItem & {
	kind: 'course';
	type: CourseType;
	hours?: number;
	credits?: number;
	attributes?: CourseAttribute[];
};

export type MilestonePlanItem = BasePlanItem & {
	kind: 'milestone';
	type?: never;
	hours?: never;
	credits?: never;
	attributes?: never;
};

export type PlanItem = CoursePlanItem | MilestonePlanItem;

export type DependentEdge = {
	sourceItemId: string;
	targetItemId: string;
	requiredFor: 'enroll' | 'complete';
	kind: 'direct' | 'alternative';
};

export type StudyPlanData = {
	info: StudyPlanInfo;
	sections: Section[];
	items: PlanItem[];
	requirements?: {
		graduation?: GraduationRequirement[];
	};
};

export const getStudyPlanDataSlug = ({ info }: StudyPlanData) => {
	return [info.universitySlug, info.collegeSlug, info.degreeSlug]
		.filter(Boolean)
		.join('-')
		.toLowerCase();
};

export const getStudyPlanDataSlugWithYear = ({ info }: StudyPlanData) => {
	return [info.universitySlug, info.collegeSlug, info.degreeSlug, info.year]
		.filter(Boolean)
		.join('-')
		.toLowerCase();
};

export const getSectionIdForYear = (year: number) => `year-${year}`;

export const isCoursePlanItem = (item: PlanItem): item is CoursePlanItem => item.kind === 'course';

export const isMilestonePlanItem = (item: PlanItem): item is MilestonePlanItem =>
	item.kind === 'milestone';
