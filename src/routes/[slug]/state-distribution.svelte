<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { courseStates, feminineCourseStateLabels } from '$lib/course-state';
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
			<div class="state-not-taken h-full basis-0" style={`flex-grow: ${pctNotTaken}`}></div>
		{/if}
		{#if pctInProgress > 0}
			<div class="state-in-progress h-full basis-0" style={`flex-grow: ${pctInProgress}`}></div>
		{/if}
		{#if pctTaken > 0}
			<div class="state-taken h-full basis-0" style={`flex-grow: ${pctTaken}`}></div>
		{/if}
		{#if pctPassed > 0}
			<div class="state-passed h-full basis-0" style={`flex-grow: ${pctPassed}`}></div>
		{/if}
	</div>
	<div class="grid grid-cols-2 gap-2 text-xs text-gray-600 sm:grid-cols-4">
		<div class="flex items-center gap-2">
			<span class="state-not-taken h-2 w-2 rounded-sm"></span>{feminineCourseStateLabels[
				courseStates.notTaken
			]} ({countNotTaken})
		</div>
		<div class="flex items-center gap-2">
			<span class="state-in-progress h-2 w-2 rounded-sm"></span>{feminineCourseStateLabels[
				courseStates.inProgress
			]} ({countInProgress})
		</div>
		<div class="flex items-center gap-2">
			<span class="state-taken h-2 w-2 rounded-sm"></span>{feminineCourseStateLabels[
				courseStates.taken
			]} ({countTaken})
		</div>
		<div class="flex items-center gap-2">
			<span class="state-passed h-2 w-2 rounded-sm"></span>{feminineCourseStateLabels[
				courseStates.passed
			]} ({countPassed})
		</div>
	</div>
</div>

<style>
	.state-not-taken {
		background-color: var(--course-state-chart-not-taken);
	}

	.state-in-progress {
		background-color: var(--course-state-chart-in-progress);
	}

	.state-taken {
		background-color: var(--course-state-chart-taken);
	}

	.state-passed {
		background-color: var(--course-state-chart-passed);
	}
</style>
