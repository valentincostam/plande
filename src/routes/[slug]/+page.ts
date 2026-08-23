import { decodeCoursesStates } from '$lib/course-state';
import { decodeGrades } from '$lib/grade-encoding';
import type { PageLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from './study-plan-maps';
import { getStudyPlanSlugWithYear } from '$lib/study-plan';

export const load: PageLoad = ({ params, url }) => {
	const { slug } = params;
	const slugLower = slug.toLowerCase();

	// Read from short params first, fallback to long params for backwards compatibility
	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');
	const strictMode = url.searchParams.get('r') || url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('c') || url.searchParams.get('codigos');
	const hasUrlProgress = stateLetters !== null || gradeLetters !== null;
	const isStrictModeEnabled = strictMode ? strictMode === 'si' : true;
	const showCodes = showCodesParam ? showCodesParam === 'si' : false;

	// Try slug with year first (canonical)
	let studyPlan = studyPlanSlugWithYearMap[slugLower];

	if (!studyPlan) {
		// Try slug without year (backwards compatibility) and redirect to canonical URL
		studyPlan = studyPlanSlugMap[slugLower];
		if (studyPlan) {
			const canonicalSlug = getStudyPlanSlugWithYear(studyPlan);
			const searchParams = url.searchParams.toString();
			const redirectUrl = `/${canonicalSlug}${searchParams ? `?${searchParams}` : ''}`;
			redirect(301, redirectUrl);
		}
	}

	if (!studyPlan) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		studyPlan,
		slug,
		coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
		coursesGrades: gradeLetters ? decodeGrades(gradeLetters) : [],
		hasUrlProgress,
		hasUrlShowCodes: showCodesParam !== null,
		isStrictModeEnabled,
		showCodes
	};
};
