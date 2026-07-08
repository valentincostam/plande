import type { DegreeProgressConfig } from './degree-progress';
import { PlanSession } from './plan-session.svelte';
import { preparePlan } from './prepare-plan';
import type { GraduationRequirement } from './study-plan-data';
import type { RawCourseRequirement, RawCourse } from './raw-course';
import type { StudyPlan, StudyPlanCatalogEntry } from './study-plan';
import { buildStudyPlanView, type StudyPlanViewItem } from './study-plan-view';
import {
	getStudyPlanDataSlug,
	getStudyPlanDataSlugWithYear,
	type StudyPlanData
} from './study-plan-data';

const getDurationYears = (plan: StudyPlanData) =>
	plan.sections.reduce((max, section) => {
		const match = /^year-(\d+)$/.exec(section.id);
		return match ? Math.max(max, Number(match[1])) : max;
	}, 0);

export const getDurationYearsFromPlanData = getDurationYears;

const inferProgressConfig = (
	graduation: GraduationRequirement[] | undefined
): DegreeProgressConfig => {
	const exprs = graduation?.map((requirement) => requirement.expr) ?? [];
	const sumExpr = exprs.find((expr) => expr.type === 'sum');
	const countExprs = exprs.filter((expr) => expr.type === 'count');

	if (sumExpr?.type === 'sum') {
		return {
			type: 'mandatory-plus-elective-hours',
			requiredElectiveHours: sumExpr.min
		};
	}

	if (countExprs.length > 0) {
		return {
			type: 'mandatory-plus-elective-count',
			requiredElectiveCount: countExprs.reduce(
				(total, expr) => total + (expr.type === 'count' ? expr.min : 0),
				0
			)
		};
	}

	return { type: 'mandatory-only' };
};

export const studyPlanDataToCatalogEntry = (plan: StudyPlanData): StudyPlanCatalogEntry => ({
	degreeName: plan.info.degreeName,
	degreeSlug: plan.info.degreeSlug,
	universityName: plan.info.universityName,
	universitySlug: plan.info.universitySlug,
	collegeName: plan.info.collegeName,
	collegeSlug: plan.info.collegeSlug,
	durationYears: getDurationYears(plan),
	year: plan.info.year,
	sources: plan.info.sources ?? [],
	notes: plan.info.notes,
	progress: inferProgressConfig(plan.requirements?.graduation)
});

export const studyPlanDataToStudyPlan = (plan: StudyPlanData): StudyPlan => {
	const session = new PlanSession(preparePlan(plan));
	const view = buildStudyPlanView(session);
	const viewItems = view.sections.flatMap((section) =>
		section.terms.flatMap((term) => term.items)
	);
	const orderedItems = session
		.getCourseItems()
		.map((item) => viewItems.find((entry) => entry.item.def.id === item.def.id))
		.filter(
			(entry): entry is StudyPlanViewItem =>
				entry !== undefined && entry.item.def.kind === 'course'
		);
	let nextRequirementId = 1;
	const getExportId = (itemId: string) => {
		const numericId = Number(itemId);
		if (Number.isFinite(numericId)) return numericId;
		const item = session.itemsById.get(itemId);
		if (!item) throw new Error(`Missing export item for ${itemId}`);
		return item.def.seqId;
	};

	const courses: RawCourse[] = orderedItems.map((entry) => {
		const requirements: RawCourseRequirement[] = [
			...entry.requirementsForEnrollment.map((requirement) => ({
				requiredCourseId: getExportId(requirement.item.item.def.id),
				requiredState:
					requirement.requiredState === 'completed' ? 'passed' : requirement.requiredState,
				requiredFor: 'enroll' as const
			})),
			...entry.requirementsForCompletion.map((requirement) => ({
				requiredCourseId: getExportId(requirement.item.item.def.id),
				requiredState:
					requirement.requiredState === 'completed' ? 'passed' : requirement.requiredState,
				requiredFor: 'complete' as const
			}))
		].map((requirement) => ({
			id: nextRequirementId++,
			requiredCourseId: requirement.requiredCourseId,
			requiredState: requirement.requiredState,
			requiredFor: requirement.requiredFor
		}));

		return {
			id: getExportId(entry.item.def.id),
			code: entry.item.def.code,
			name: entry.item.def.name,
			year: entry.year,
			hours: entry.item.def.hours,
			term: entry.term ?? 'unknown',
			requirements,
			type: entry.item.def.type,
			attributes: entry.item.def.attributes,
			crossYear:
				entry.item.def.placements.length > 1 && entry.year !== undefined
					? (() => {
							const nextPlacement = entry.item.def.placements[1];
							const match = nextPlacement ? /^year-(\d+)$/.exec(nextPlacement.sectionId) : null;
							return match
								? {
										spansToYear: Number(match[1]),
										endsInTerm: nextPlacement.term ?? entry.term ?? 'unknown'
									}
								: undefined;
						})()
					: undefined
		};
	});

	return {
		...studyPlanDataToCatalogEntry(plan),
		courses
	};
};

export const buildStudyPlanCatalogMaps = <T extends StudyPlanData>(plans: T[]) => {
	const slugWithYearMap: Record<string, T> = Object.fromEntries(
		plans.map((plan) => [getStudyPlanDataSlugWithYear(plan), plan])
	);

	const slugMap: Record<string, T> = plans
		.toSorted((a, b) => (b.info.year ?? 0) - (a.info.year ?? 0))
		.reduce(
			(acc, plan) => {
				const slug = getStudyPlanDataSlug(plan);
				if (!(slug in acc)) {
					acc[slug] = plan;
				}
				return acc;
			},
			{} as Record<string, T>
		);

	return { slugMap, slugWithYearMap };
};
