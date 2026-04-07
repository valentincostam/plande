import { decodeCoursesStates } from '$lib/course-state';
import { decodeGrades } from '$lib/grade-encoding';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import type { PageLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getStudyPlanSlugWithYear } from '$lib/study-plan';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from './data/all-study-plans';

export const load: PageLoad = ({ params, url }) => {
	const { slug } = params;
	const slugLower = slug.toLowerCase();

	// Read from short params first, fallback to long params for backwards compatibility
	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');
	const strictMode = url.searchParams.get('r') || url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('c') || url.searchParams.get('codigos');
	const isStrictModeEnabled = strictMode ? strictMode === 'si' : true;
	const showCodes = showCodesParam ? showCodesParam === 'si' : false;

	// Try slug with year first (canonical)
	let nativeStudyPlan = studyPlanSlugWithYearMap[slugLower];

	if (!nativeStudyPlan) {
		// Try slug without year (backwards compatibility) and redirect to canonical URL
		nativeStudyPlan = studyPlanSlugMap[slugLower];
		if (nativeStudyPlan) {
			const canonicalSlug = getStudyPlanSlugWithYear(studyPlanDataToCatalogEntry(nativeStudyPlan));
			const searchParams = url.searchParams.toString();
			const redirectUrl = `/${canonicalSlug}${searchParams ? `?${searchParams}` : ''}`;
			redirect(301, redirectUrl);
		}
	}

	if (!nativeStudyPlan) {
		error(404, {
			message: 'Not found'
		});
	}

	const studyPlan = studyPlanDataToCatalogEntry(nativeStudyPlan);

	return {
		studyPlan,
		nativeStudyPlan,
		slug,
		coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
		coursesGrades: gradeLetters ? decodeGrades(gradeLetters) : [],
		isStrictModeEnabled,
		showCodes
	};
};
