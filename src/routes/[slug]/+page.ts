import { decodeCoursesStates } from '$lib/course-state';
import { decodeGrades } from '$lib/grade-encoding';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from './study-plan-maps';

export const load: PageLoad = ({ params, url }) => {
	const { slug } = params;

	// Read from short params first, fallback to long params for backwards compatibility
	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');
	const strictMode = url.searchParams.get('r') || url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('c') || url.searchParams.get('codigos');
	const isStrictModeEnabled = strictMode ? strictMode === 'si' : true;
	const showCodes = showCodesParam ? showCodesParam === 'si' : false;

	const studyPlan =
		studyPlanSlugMap[slug.toLowerCase()] ?? studyPlanSlugWithYearMap[slug.toLowerCase()];

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
		isStrictModeEnabled,
		showCodes
	};
};
