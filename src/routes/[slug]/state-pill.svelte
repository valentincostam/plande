<script lang="ts">
	import {
		courseBgColors,
		courseStates,
		feminineCourseStateLabels,
		masculineCourseStateLabels
	} from '$lib/course-state';
	import type { CourseState } from '$lib/course-state';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		state: CourseState;
		gender?: 'feminine' | 'masculine';
		plural?: boolean;
	};

	let { state, class: className, gender = 'feminine', plural = false }: Props = $props();

	const getPluralSuffix = (state: CourseState) => {
		if (state === courseStates.inProgress) {
			return '';
		}

		if (state === courseStates.taken) {
			return 'es';
		}

		return 's';
	};
</script>

<span
	class={[
		courseBgColors[state],
		'inline-block rounded-md px-2 py-1 leading-none whitespace-nowrap',
		className
	]}
>
	{gender === 'feminine'
		? feminineCourseStateLabels[state]
		: masculineCourseStateLabels[state]}{plural ? getPluralSuffix(state) : ''}
</span>
