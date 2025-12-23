<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import AvailableCourseItem from './available-course-item.svelte';

	type Props = {
		title?: string;
		courses: Course[];
		showCodes?: boolean;
		hideTypeForTransversal?: boolean;
	};

	let { title, courses, showCodes = false, hideTypeForTransversal = false }: Props = $props();
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
			{#each courses as course}
				<AvailableCourseItem {course} {showCodes} {hideTypeForTransversal} />
			{/each}
		</ul>
	</div>
{/if}
