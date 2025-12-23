<script lang="ts">
	import { courseAttributeLabels, isTransversal } from '$lib/course-attribute';
	import type { Course } from '$lib/course.svelte';
	import { toKebabCase, countAllDependents } from '$lib/course.svelte';
	import { courseTypeLabels, isElectiveOrOptative } from '$lib/course-type';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import { handleSmoothScroll } from '$lib/smooth-scroll';

	type Props = {
		course: Course;
		showCodes?: boolean;
		hideTypeForTransversal?: boolean;
	};

	let { course, showCodes = false, hideTypeForTransversal = false }: Props = $props();

	const totalDependents = $derived(countAllDependents(course));
	const courseIsTransversal = $derived(isTransversal(course.attributes));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(course.type));

	// Show type label unless:
	// - It's mandatory (no need to label)
	// - It's transversal and we're hiding type for transversal (context already shows it)
	const showTypeLabel = $derived(
		courseIsElectiveOrOptative && !(courseIsTransversal && hideTypeForTransversal)
	);

	// Show "(transversal)" only for mandatory transversal courses
	// Elective/optative courses are already flexible, so no need to mark as transversal
	const showTransversalLabel = $derived(courseIsTransversal && !courseIsElectiveOrOptative);
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
	{#if showTypeLabel}
		({courseTypeLabels[course.type].toLowerCase()})
	{/if}
	{#if showTransversalLabel}
		({courseAttributeLabels.transversal.toLowerCase()})
	{/if}
	{#if course.year !== undefined}
		<span class="whitespace-nowrap">
			de {course.year}<sup>{getOrdinalSuperscript(course.year)}</sup> año
		</span>
	{/if}
	{#if totalDependents > 0}
		<span class="text-gray-400">({totalDependents})</span>
	{/if}
</li>
