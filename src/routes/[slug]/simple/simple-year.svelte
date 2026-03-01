<script lang="ts">
	import type { Year } from '$lib/year.svelte';
	import Ordinal from '$lib/ordinal.svelte';
	import { courseStates } from '$lib/course-state';
	import StatePill from '../state-pill.svelte';
	import SimpleCourse from './simple-course.svelte';

	type Props = {
		year: Year;
	};

	let { year }: Props = $props();
</script>

<section aria-labelledby="year-{year.year}-heading">
	<header class="flex items-center gap-3 p-3">
		<h2 id="year-{year.year}-heading" class="text-lg font-bold">
			<Ordinal number={year.year} noun="Año" />
		</h2>
		{#if year.state === courseStates.passed}
			<StatePill state={courseStates.passed} gender="masculine" class="text-xs" />
		{/if}
	</header>

	<ul class="grid gap-1">
		{#each year.courses as course (course.id)}
			<SimpleCourse {course} />
		{/each}
	</ul>
</section>
