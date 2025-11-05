import { decodeCoursesStates } from '$lib/course-state';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { utnFrcuIsi2023 } from './data/utn-frcu-isi-2023';
import { utnFrcuIe2023 } from './data/utn-frcu-ie-2023';
import { ucuFauArq2007 } from './data/ucu-fau-arq-2007';
import { uaderFcytLsi2010 } from './data/uader-fcyt-lsi-2010';
import { uaderFcytIt } from './data/uader-fcyt-it';
import { unerFcsMed2022 } from './data/uner-fcs-med-2022';
import { utnFrcuIc2023 } from './data/utn-frcu-ic-2023';
import { utnFrcuLoi1995 } from './data/utn-frcu-loi-1995';
import { uncaFcaTupazsa } from './data/unca-fca-tupazsa';
import { udemmLp } from './data/udemm-lp';
import { udemmLpe } from './data/udemm-lpe';
import { utnFrbaIq1995 } from './data/utn-frba-iq-1995';
import { unrFapydLdg } from './data/unr-fapyd-ldg';
import { unerFcecoCP2020 } from './data/uner-fceco-cp-2020';
import { getStudyPlanSlug, getStudyPlanSlugWithYear } from '$lib/study-plan';

const studyPlanSlugMap = {
	[getStudyPlanSlug(uaderFcytIt)]: uaderFcytIt,
	[getStudyPlanSlug(uaderFcytIt)]: uaderFcytIt,
	[getStudyPlanSlug(uaderFcytLsi2010)]: uaderFcytLsi2010,
	[getStudyPlanSlug(ucuFauArq2007)]: ucuFauArq2007,
	[getStudyPlanSlug(udemmLp)]: udemmLp,
	[getStudyPlanSlug(udemmLpe)]: udemmLpe,
	[getStudyPlanSlug(uncaFcaTupazsa)]: uncaFcaTupazsa,
	[getStudyPlanSlug(unerFcsMed2022)]: unerFcsMed2022,
	[getStudyPlanSlug(utnFrbaIq1995)]: utnFrbaIq1995,
	[getStudyPlanSlug(utnFrcuIc2023)]: utnFrcuIc2023,
	[getStudyPlanSlug(utnFrcuIe2023)]: utnFrcuIe2023,
	[getStudyPlanSlug(utnFrcuIsi2023)]: utnFrcuIsi2023,
	[getStudyPlanSlug(utnFrcuLoi1995)]: utnFrcuLoi1995,
	[getStudyPlanSlug(unrFapydLdg)]: unrFapydLdg,
	[getStudyPlanSlug(unerFcecoCP2020)]: unerFcecoCP2020
};

const studyPlanSlugWithYearMap = {
	[getStudyPlanSlugWithYear(uaderFcytIt)]: uaderFcytIt,
	[getStudyPlanSlugWithYear(uaderFcytIt)]: uaderFcytIt,
	[getStudyPlanSlugWithYear(uaderFcytLsi2010)]: uaderFcytLsi2010,
	[getStudyPlanSlugWithYear(ucuFauArq2007)]: ucuFauArq2007,
	[getStudyPlanSlugWithYear(udemmLp)]: udemmLp,
	[getStudyPlanSlugWithYear(udemmLpe)]: udemmLpe,
	[getStudyPlanSlugWithYear(uncaFcaTupazsa)]: uncaFcaTupazsa,
	[getStudyPlanSlugWithYear(unerFcsMed2022)]: unerFcsMed2022,
	[getStudyPlanSlugWithYear(utnFrbaIq1995)]: utnFrbaIq1995,
	[getStudyPlanSlugWithYear(utnFrcuIc2023)]: utnFrcuIc2023,
	[getStudyPlanSlugWithYear(utnFrcuIe2023)]: utnFrcuIe2023,
	[getStudyPlanSlugWithYear(utnFrcuIsi2023)]: utnFrcuIsi2023,
	[getStudyPlanSlugWithYear(utnFrcuLoi1995)]: utnFrcuLoi1995,
	[getStudyPlanSlugWithYear(unrFapydLdg)]: unrFapydLdg,
	[getStudyPlanSlugWithYear(unerFcecoCP2020)]: unerFcecoCP2020
};

export const load: PageLoad = ({ params, url }) => {
	const { slug } = params;

	const stateLetters = url.searchParams.get('estado');
	const strictMode = url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('codigos');
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
		isStrictModeEnabled,
		showCodes
	};
};
