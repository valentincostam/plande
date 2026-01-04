<script lang="ts">
	import { courseAttributeLabels, isTransversal } from '$lib/course-attribute';
	import type { Course } from '$lib/course.svelte';
	import { countAllDependents } from '$lib/course.svelte';
	import { courseTypeLabels, isElectiveOrOptative } from '$lib/course-type';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import CourseLink from './course-link.svelte';

	type Props = {
		course: Course;
		showCodes?: boolean;
		hideTypeForTransversal?: boolean;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: number) => void;
	};

	let {
		course,
		showCodes = false,
		hideTypeForTransversal = false,
		viewMode = 'list',
		onNavigateToDiagram
	}: Props = $props();

	const totalDependents = $derived(countAllDependents(course));
	const courseIsTransversal = $derived(isTransversal(course.attributes));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(course.type));

	const showTypeLabel = $derived(
		courseIsElectiveOrOptative && !(courseIsTransversal && hideTypeForTransversal)
	);

	const showTransversalLabel = $derived(courseIsTransversal && !courseIsElectiveOrOptative);
</script>

<li>
	<CourseLink {course} {viewMode} {onNavigateToDiagram}>
		{#if showCodes && course.code}
			<span class="opacity-60">{course.code}.</span>
		{/if}
		{course.name}
	</CourseLink>
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
