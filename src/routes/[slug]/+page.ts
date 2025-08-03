import { decodeCoursesStates } from '$lib/course-state';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { utnFrcuIsiData } from './utn-frcu-isi-data';

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

	error(404, {
		message: 'Not found'
	});
};
