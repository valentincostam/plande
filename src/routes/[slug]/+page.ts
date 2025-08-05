import { decodeCoursesStates } from '$lib/course-state';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { utnFrcuIsiData } from './utn-frcu-isi-data';
import { utnFrcuIeData } from './utn-frcu-ie-data';
import { ucuFauArqData } from './ucu-fau-arq';

export const load: PageLoad = ({ params, url }) => {
	const { slug } = params;

	const stateLetters = url.searchParams.get('estado');
	const strictMode = url.searchParams.get('estricto');
	const isStrictModeEnabled = strictMode ? strictMode === 'si' : true;

	if (slug === 'utn-frcu-isi') {
		return {
			...utnFrcuIsiData,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled
		};
	}

	if (slug === 'utn-frcu-ie') {
		return {
			...utnFrcuIeData,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled
		};
	}

	if (slug === 'ucu-fau-arq') {
		return {
			...ucuFauArqData,
			coursesStates: stateLetters ? decodeCoursesStates(stateLetters) : [],
			isStrictModeEnabled
		};
	}

	error(404, {
		message: 'Not found'
	});
};
