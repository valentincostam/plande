import { isTransversal } from './course-attribute';
import type { CourseState } from './course-state';
import { courseTerms } from './course-term';
import { isElectiveOrOptative } from './course-type';
import type { DegreeProgressConfig } from './degree-progress';
import type { RawCourse, RawCourseRequirement } from './raw-course';
import { requiredFor } from './raw-course';
import type { StudyPlan } from './study-plan';
import type { PlanSessionOptions } from './plan-session.svelte';
import { PlanSession } from './plan-session.svelte';
import { preparePlan, type PreparePlanOptions } from './prepare-plan';
import { grad, place, req } from './study-plan-v5-helpers';
import type {
	GraduationRequirement,
	PlanItem,
	RequirementExpr,
	RequirementState,
	Section,
	StudyPlanData
} from './study-plan-v5';

const getOrdinalSuperscript = (number: number) => {
	if (number === 1) return 'er';
	if (number === 2) return 'do';
	if (number === 3) return 'er';
	return 'to';
};

const getOrdinalPrefix = (number: number) => `${number}${getOrdinalSuperscript(number)}`;

const legacyItemId = (courseId: number) => courseId.toString();

const mapLegacyRequirementState = (state: CourseState): RequirementState => {
	if (state === 'inProgress') return 'inProgress';
	if (state === 'taken') return 'taken';
	if (state === 'passed') return 'passed';
	return 'taken';
};

const buildRequirementExpr = (
	requirements: RawCourseRequirement[] | undefined
): RequirementExpr | undefined => {
	if (!requirements || requirements.length === 0) return undefined;

	const rules = requirements.map((requirement) =>
		req.item(
			legacyItemId(requirement.requiredCourseId),
			mapLegacyRequirementState(requirement.requiredState)
		)
	);

	return rules.length === 1 ? rules[0] : req.all(...rules);
};

const createLegacyExtraSection = (courses: RawCourse[]): Section | undefined => {
	const legacyExtraCourses = courses.filter(
		(course) =>
			isTransversal(course.attributes ?? []) || (isElectiveOrOptative(course.type) && !course.year)
	);

	if (legacyExtraCourses.length === 0) return undefined;

	const allElective = legacyExtraCourses.every((course) => isElectiveOrOptative(course.type));

	return {
		id: allElective ? 'electivas' : 'transversales',
		label: allElective ? 'Materias Electivas' : 'Materias Transversales'
	};
};

const mapLegacyPlacements = (course: RawCourse, extraSection: Section | undefined) => {
	const placements = [];

	if (course.year) {
		placements.push(place.year(course.year, course.term));
	} else if (extraSection) {
		placements.push(place.section(extraSection.id, course.term));
	}

	if (course.crossYear) {
		placements.push(place.year(course.crossYear.spansToYear, course.crossYear.endsInTerm));
	}

	return placements;
};

const createGraduationRequirements = (
	progress: DegreeProgressConfig,
	courses: RawCourse[]
): GraduationRequirement[] => {
	const graduation: GraduationRequirement[] = [
		grad.allMandatory('mandatory', 'Materias obligatorias')
	];
	const electiveProgressTag = 'legacy-progress-elective';
	const hasElectives = courses.some((course) => isElectiveOrOptative(course.type));

	if (!hasElectives) return graduation;

	switch (progress.type) {
		case 'mandatory-only':
			return graduation;
		case 'mandatory-plus-elective-count':
			graduation.push(
				grad.countTag(
					'elective-count',
					'Materias electivas requeridas',
					electiveProgressTag,
					progress.requiredElectiveCount ?? 1,
					'passed'
				)
			);
			return graduation;
		case 'mandatory-plus-elective-hours':
			graduation.push(
				grad.sumTag(
					'elective-hours',
					'Horas electivas requeridas',
					electiveProgressTag,
					'hours',
					progress.requiredElectiveHours ?? 0,
					'passed'
				)
			);
			return graduation;
	}
};

export const adaptLegacyStudyPlanToV5 = (studyPlan: StudyPlan): StudyPlanData => {
	const yearSections: Section[] = Array.from({ length: studyPlan.durationYears }, (_, index) => ({
		id: `year-${index + 1}`,
		label: `${getOrdinalPrefix(index + 1)} Año`
	}));

	const extraSection = createLegacyExtraSection(studyPlan.courses);
	const items: PlanItem[] = studyPlan.courses.map((course, index) => {
		const enrollRequirements = course.requirements?.filter(
			(requirement) => requirement.requiredFor === requiredFor.enroll
		);
		const completeRequirements = course.requirements?.filter(
			(requirement) => requirement.requiredFor === requiredFor.complete
		);

		const tags = [
			...(isElectiveOrOptative(course.type) ? ['legacy-progress-elective'] : []),
			...(course.year ? [`legacy-year-${course.year}`] : [])
		];

		return {
			id: legacyItemId(course.id),
			seqId: index + 1,
			kind: 'course',
			name: course.name,
			code: course.code,
			type: course.type,
			hours: course.hours,
			attributes: course.attributes,
			tags: tags.length > 0 ? tags : undefined,
			placements: mapLegacyPlacements(course, extraSection),
			requirements: {
				enroll: buildRequirementExpr(enrollRequirements),
				complete: buildRequirementExpr(completeRequirements)
			}
		};
	});

	return {
		info: {
			degreeName: studyPlan.degreeName,
			degreeSlug: studyPlan.degreeSlug,
			universityName: studyPlan.universityName,
			universitySlug: studyPlan.universitySlug,
			collegeName: studyPlan.collegeName,
			collegeSlug: studyPlan.collegeSlug,
			year: studyPlan.year,
			sources: studyPlan.sources,
			notes: studyPlan.notes
		},
		sections: extraSection ? [...yearSections, extraSection] : yearSections,
		items,
		requirements: {
			graduation: createGraduationRequirements(studyPlan.progress, studyPlan.courses)
		}
	};
};

export const createLegacyCompatiblePlanSession = (
	studyPlan: StudyPlan,
	options: PlanSessionOptions = {},
	prepareOptions?: PreparePlanOptions
) => {
	const plan = adaptLegacyStudyPlanToV5(studyPlan);
	const prepared = preparePlan(plan, prepareOptions);
	return new PlanSession(prepared, options);
};
