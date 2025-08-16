<script lang="ts">
	import {
		courseBgColors,
		femenineCourseStateLabels,
		masculineCourseStateLabels
	} from '$lib/course-state';
	import type { CourseState } from '$lib/course-state';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		state: CourseState;
		gender?: 'femenine' | 'masculine';
	};

	let { state, class: className, gender = 'femenine' }: Props = $props();
</script>

<span
	class={[
		courseBgColors[state],
		'inline-block rounded-md px-2 py-1 leading-none whitespace-nowrap',
		className
	]}
>
	{gender === 'femenine' ? femenineCourseStateLabels[state] : masculineCourseStateLabels[state]}
</span>
