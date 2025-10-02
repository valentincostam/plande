import { decodeCoursesStates } from '$lib/course-state';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { utnFrcuIsiData } from './utn-frcu-isi-data';
import { utnFrcuIeData } from './utn-frcu-ie-data';
import { ucuFauArqData } from './ucu-fau-arq-data';
import { uaderFcytLsiData } from './uader-fcyt-lsi-data';
import { unerFcsMedData } from './uner-fcs-med-data';
import { utnFrcuIcData } from './utn-frcu-ic-data';
import { utnFrcuLoiData } from './utn-frcu-loi-data';
import { uncaFcaTupazsaData } from './unca-fca-tupazsa-data';
import { udemmLicPsicologiaData } from './udemm-lic-psicologia-data';

export const load: PageLoad = ({ params, url }) => {
	const { slug } = params;

	const stateLetters = url.searchParams.get('estado');
	const strictMode = url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('codigos');
	const isStrictModeEnabled = strictMode ? strictMode === 'si' : true;
	const showCodes = showCodesParam ? showCodesParam === 'si' : false;

	if (slug === 'utn-frcu-isi') {
		return {
			...utnFrcuIsiData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'utn-frcu-ie') {
		return {
			...utnFrcuIeData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'utn-frcu-ic') {
		return {
			...utnFrcuIcData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'utn-frcu-loi') {
		return {
			...utnFrcuLoiData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'ucu-fau-arq') {
		return {
			...ucuFauArqData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'uader-fcyt-lsi') {
		return {
			...uaderFcytLsiData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'uner-fcs-med') {
		return {
			...unerFcsMedData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'unca-fca-tupazsa') {
		return {
			...uncaFcaTupazsaData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	if (slug === 'udemm-lic-psicologia') {
		return {
			...udemmLicPsicologiaData,
			slug,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled,
			showCodes
		};
	}

	error(404, {
		message: 'Not found'
	});
};
