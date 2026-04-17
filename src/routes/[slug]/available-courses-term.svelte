<script lang="ts">
	import type { StudyPlanViewItem } from '$lib/study-plan-view';
	import AvailableCourseItem from './available-course-item.svelte';

	type Props = {
		title?: string;
		courses: StudyPlanViewItem[];
		showCodes?: boolean;
		hideTypeForTransversal?: boolean;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: string) => void;
	};

	let {
		title,
		courses,
		showCodes = false,
		hideTypeForTransversal = false,
		viewMode = 'list',
		onNavigateToDiagram
	}: Props = $props();
</script>

{#if courses.length > 0}
	<div class="grid gap-3">
		{#if title}
			<h4 class="px-3">
				<span class="font-bold">{title}</span>
				({courses.length}
				{courses.length === 1 ? 'materia' : 'materias'})
			</h4>
		{/if}
		<ul class="grid list-disc gap-2 px-9">
			{#each courses as item (item.item.def.id)}
				<AvailableCourseItem
					{item}
					{showCodes}
					{hideTypeForTransversal}
					{viewMode}
					{onNavigateToDiagram}
				/>
			{/each}
		</ul>
	</div>
{/if}
