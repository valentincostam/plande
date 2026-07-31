<script lang="ts">
	import { courseAttributeLabels, isTransversal } from '$lib/course-attribute';
	import type { StudyPlanViewItem } from '$lib/study-plan-view';
	import { courseTypeLabels, isElectiveOrOptative } from '$lib/course-type';
	import Ordinal from '$lib/ordinal.svelte';
	import NativeCourseLink from './native-course-link.svelte';
	import UnlockIcon from './unlock-icon.svelte';

	type Props = {
		item: StudyPlanViewItem;
		showCodes?: boolean;
		hideTypeForTransversal?: boolean;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: string) => void;
	};

	let {
		item,
		showCodes = false,
		hideTypeForTransversal = false,
		viewMode = 'list',
		onNavigateToDiagram
	}: Props = $props();

	const totalDependents = $derived(item.totalDependentCount);
	const courseIsTransversal = $derived(isTransversal(item.item.def.attributes ?? []));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(item.item.def.type));

	const showTypeLabel = $derived(
		courseIsElectiveOrOptative && !(courseIsTransversal && hideTypeForTransversal)
	);

	const showTransversalLabel = $derived(courseIsTransversal && !courseIsElectiveOrOptative);
</script>

<li>
	<NativeCourseLink {item} {viewMode} {onNavigateToDiagram}>
		{#if showCodes && item.item.def.code}
			<span class="opacity-60">{item.item.def.code}.</span>
		{/if}
		{item.item.def.name}
	</NativeCourseLink>
	{#if showTypeLabel}
		({courseTypeLabels[item.item.def.type].toLowerCase()})
	{/if}
	{#if showTransversalLabel}
		({courseAttributeLabels.transversal.toLowerCase()})
	{/if}
	{#if item.year !== undefined}
		<span class="whitespace-nowrap text-gray-500">
			de <Ordinal number={item.year} noun="año" />
		</span>
	{/if}
	{#if totalDependents > 0}
		<span
			class="inline-flex items-center gap-0.5 rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-500"
			aria-label="Desbloquea {totalDependents} {totalDependents === 1 ? 'materia' : 'materias'}"
			title="Desbloquea {totalDependents} {totalDependents === 1 ? 'materia' : 'materias'}"
		>
			<UnlockIcon class="size-3" />
			{totalDependents}
		</span>
	{/if}
</li>
