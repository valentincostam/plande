<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Course } from '$lib/course.svelte';
	import BulkStateSelect from './bulk-state-select.svelte';
	import type { CourseState } from '$lib/course-state';

	type Props = {
		children: Snippet;
		title?: string;
		courses: Course[];
		year?: number;
	};

	let { children, title, courses, year }: Props = $props();

	let selectValue = $state<CourseState | ''>('');

	const allCoursesEnabled = $derived(courses.every((course) => course.isEnabled));

	const onchange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const newState = target.value as CourseState;

		if (newState) {
			// Cambiar el estado de todas las materias
			courses.forEach((course) => {
				course.state = newState;
			});

			// Resetear el select al placeholder
			selectValue = '';
		}
	};
</script>

{#if title}
	<div class="flex items-center justify-between gap-3">
		<h3 class="p-3 text-sm text-gray-600">{title}</h3>
		{#if courses.length > 1 && allCoursesEnabled}
			<BulkStateSelect id={`${year ?? 'transversal'}-${title}-state-select`} {onchange} bind:value={selectValue} />
		{/if}
	</div>
{/if}
<ul class="grid gap-1">
	{@render children()}
</ul>
