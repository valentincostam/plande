<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { courseStates, femenineCourseStateLabels } from '$lib/course-state';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		courses: Course[];
		class?: ClassValue;
	};

	let { courses, class: className }: Props = $props();

	const totalCourses = $derived(courses.length);
	const countNotTaken = $derived(courses.filter((c) => c.state === courseStates.notTaken).length);
	const countInProgress = $derived(
		courses.filter((c) => c.state === courseStates.inProgress).length
	);
	const countTaken = $derived(courses.filter((c) => c.state === courseStates.taken).length);
	const countPassed = $derived(courses.filter((c) => c.state === courseStates.passed).length);

	const pct = (value: number, total: number) => (total === 0 ? 0 : (value / total) * 100);

	const pctNotTaken = $derived(pct(countNotTaken, totalCourses));
	const pctInProgress = $derived(pct(countInProgress, totalCourses));
	const pctTaken = $derived(pct(countTaken, totalCourses));
	const pctPassed = $derived(pct(countPassed, totalCourses));
</script>

<div class={['grid gap-3 rounded-md bg-gray-100 px-6 pt-3 pb-5', className]}>
	<div class="flex items-center justify-between">
		<span class="text-gray-700">Distribución de estados</span>
		<span class="text-xs text-gray-500">{totalCourses} materias</span>
	</div>
	<div class="flex h-2 w-full gap-0.5 overflow-hidden rounded">
		{#if pctNotTaken > 0}
			<div class="h-full basis-0 bg-gray-300" style={`flex-grow: ${pctNotTaken}`}></div>
		{/if}
		{#if pctInProgress > 0}
			<div class="h-full basis-0 bg-blue-400" style={`flex-grow: ${pctInProgress}`}></div>
		{/if}
		{#if pctTaken > 0}
			<div class="h-full basis-0 bg-amber-400" style={`flex-grow: ${pctTaken}`}></div>
		{/if}
		{#if pctPassed > 0}
			<div class="h-full basis-0 bg-green-500" style={`flex-grow: ${pctPassed}`}></div>
		{/if}
	</div>
	<div class="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 sm:grid-cols-4">
		<div class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-sm bg-gray-300"></span>{femenineCourseStateLabels[
				courseStates.notTaken
			]} ({countNotTaken})
		</div>
		<div class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-sm bg-blue-400"></span>{femenineCourseStateLabels[
				courseStates.inProgress
			]} ({countInProgress})
		</div>
		<div class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-sm bg-amber-400"></span>{femenineCourseStateLabels[
				courseStates.taken
			]} ({countTaken})
		</div>
		<div class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-sm bg-green-500"></span>{femenineCourseStateLabels[
				courseStates.passed
			]} ({countPassed})
		</div>
	</div>
</div>
