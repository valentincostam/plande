<script lang="ts">
	import { courseBgColors, femenineCourseStateLabels } from '$lib/course-state';
	import type { CourseState } from '$lib/course-state';

	type Props = {
		state: CourseState;
	};

	let { state }: Props = $props();
</script>

<span
	class={[
		courseBgColors[state],
		'inline-block rounded-md px-2 py-1 leading-none whitespace-nowrap'
	]}
>
	{femenineCourseStateLabels[state]}
</span>
