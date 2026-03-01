<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import type { Course } from '$lib/course.svelte';
	import StatePill from '../state-pill.svelte';

	type Props = {
		course: Course;
	};

	let { course }: Props = $props();

	const numberFormatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 });
</script>

<li class="border-b border-gray-100 p-3 last:border-b-0">
	<div class="flex items-center justify-between gap-3">
		<span class="font-noto tracking-tight">{course.name}</span>
		<span class="flex shrink-0 items-center gap-3">
			{#if course.state === courseStates.passed && course.grade !== undefined}
				<span class="text-sm font-medium text-green-700">
					{numberFormatter.format(course.grade)}
				</span>
			{/if}
			<StatePill state={course.state} class="text-xs" />
		</span>
	</div>
</li>
