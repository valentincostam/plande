<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import type { Year } from '$lib/year.svelte';
	import type { CareerProgressConfig } from '$lib/career-progress';
	import { calculateCareerProgress } from '$lib/career-progress';
	import Donut from './donut.svelte';
	import StateDistribution from './state-distribution.svelte';
	import YearlyCourseProgress from './yearly-course-progress.svelte';

	type Props = {
		courses: Course[];
		years: Year[];
		progress: CareerProgressConfig;
	};

	let { courses, years, progress }: Props = $props();

	const careerProgress = $derived(() => calculateCareerProgress(courses, progress));
</script>

<div class="grid gap-3 px-3 md:px-0">
	<div class="flex items-center justify-between gap-3 rounded-md bg-gray-100 px-6 py-3">
		<span class="text-gray-700">Avance de carrera</span>
		<div class="w-18 shrink-0">
			<Donut progress={careerProgress().percentage} strokeWidth={12} />
		</div>
	</div>

	<StateDistribution {courses} />

	<YearlyCourseProgress {years} />
</div>
