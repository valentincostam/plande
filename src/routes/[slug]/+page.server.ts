import { decodeItemStates } from '$lib/study-plan-url-state';
import { decodeGrades } from '$lib/grade-encoding';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getCanonicalStudyPlanSlug, loadStudyPlan } from './data/study-plan-loaders';

export const load: PageServerLoad = async ({ params, url }) => {
	const slug = params.slug.toLowerCase();
	const canonicalSlug = getCanonicalStudyPlanSlug(slug);
	const nativeStudyPlan = await loadStudyPlan(canonicalSlug);

	if (!nativeStudyPlan) error(404, { message: 'Not found' });
	if (slug !== canonicalSlug) {
		const searchParams = url.searchParams.toString();
		redirect(301, `/${canonicalSlug}${searchParams ? `?${searchParams}` : ''}`);
	}

	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');
	const strictMode = url.searchParams.get('r') || url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('c') || url.searchParams.get('codigos');

	return {
		studyPlan: studyPlanDataToCatalogEntry(nativeStudyPlan),
		nativeStudyPlan,
		slug,
		itemStates: stateLetters ? decodeItemStates(stateLetters) : [],
		itemGrades: gradeLetters ? decodeGrades(gradeLetters) : [],
		isStrictModeEnabled: strictMode ? strictMode === 'si' : true,
		showCodes: showCodesParam ? showCodesParam === 'si' : false
	};
};
