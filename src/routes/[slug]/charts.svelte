<script lang="ts">
	import type { StudyPlanViewItem, StudyPlanViewSection } from '$lib/study-plan-view';
	import Donut from './donut.svelte';
	import StateDistribution from './state-distribution.svelte';
	import YearlyCourseProgress from './yearly-course-progress.svelte';

	type Props = {
		items: StudyPlanViewItem[];
		sections: StudyPlanViewSection[];
		percentage: number;
	};

	let { items, sections, percentage }: Props = $props();
</script>

<div class="grid gap-3 px-3 md:grid-cols-[1fr_3fr] md:px-0">
	<div
		class="flex items-center justify-between gap-3 rounded-md bg-gray-100 px-6 py-3 md:flex-col md:justify-start"
	>
		<span class="text-gray-700 md:text-center">Avance de carrera</span>
		<div class="w-18 shrink-0 md:w-24">
			<Donut progress={percentage} strokeWidth={12} />
		</div>
	</div>

	<StateDistribution {items} class="md:col-span-2" />

	<YearlyCourseProgress {sections} class="md:col-start-2 md:row-start-1" />
</div>
