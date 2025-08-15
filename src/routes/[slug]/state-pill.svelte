<script lang="ts">
	import { courseBgColors, femenineCourseStateLabels } from '$lib/course-state';
	import type { CourseState } from '$lib/course-state';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		state: CourseState;
	};

	let { state, class: className }: Props = $props();
</script>

<span
	class={[
		courseBgColors[state],
		'inline-block rounded-md px-2 py-1 leading-none whitespace-nowrap',
		className
	]}
>
	{femenineCourseStateLabels[state]}
</span>
