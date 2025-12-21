<script lang="ts">
	import { courseTagLabels, courseTags } from '$lib/course-tag';
	import type { Course } from '$lib/course.svelte';
	import { toKebabCase, TRANSVERSAL_YEAR, countAllDependents } from '$lib/course.svelte';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import { handleSmoothScroll } from '$lib/smooth-scroll';

	type Props = {
		course: Course;
		showCodes?: boolean;
	};

	let { course, showCodes = false }: Props = $props();

	const totalDependents = $derived(countAllDependents(course));
</script>

<li>
	<a
		href={`#${toKebabCase(course.name)}`}
		onclick={handleSmoothScroll}
		class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
	>
		{#if showCodes && course.code}
			<span class="opacity-60">{course.code}.</span>
		{/if}
		{course.name}
	</a>
	{#if course.tag === courseTags.elective}
		({courseTagLabels[course.tag].toLowerCase()})
	{:else if course.tag === courseTags.optative}
		({courseTagLabels[course.tag].toLowerCase()})
	{/if}
	{#if course.year === TRANSVERSAL_YEAR}
		{#if course.tag === courseTags.elective}
			({courseTagLabels[course.tag].toLowerCase()})
		{:else if course.tag === courseTags.optative}
			({courseTagLabels[course.tag].toLowerCase()})
		{:else}
			(transversal)
		{/if}
	{:else}
		<span class="whitespace-nowrap">
			de {course.year}<sup>{getOrdinalSuperscript(course.year)}</sup> año
		</span>
	{/if}
	{#if totalDependents > 0}
		<span class="text-gray-400">({totalDependents})</span>
	{/if}
</li>
