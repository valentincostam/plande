<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import type { Year } from '$lib/year.svelte';
	import { courseStates } from '$lib/course-state';
	import Donut from './donut.svelte';
	import StateDistribution from './state-distribution.svelte';
	import YearlyCourseProgress from './yearly-course-progress.svelte';

	type Props = {
		courses: Course[];
		years: Year[];
		requiredElectiveHours?: number;
	};

	let { courses, years, requiredElectiveHours }: Props = $props();

	// Distribución por estado movida a <StateDistribution />

	// Avance global (unidades: materias obligatorias + horas electivas requeridas si aplica)
	const mandatoryCourses = $derived(
		courses.filter((course) => !['elective', 'optative'].includes((course as any).tag))
	);
	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((course) => course.state === courseStates.passed)
	);

	const electiveCourses = $derived(
		courses.filter((course) => ['elective', 'optative'].includes((course as any).tag))
	);
	const passedElectiveHours = $derived(
		electiveCourses.reduce(
			(acc, c) => acc + (c.state === courseStates.passed ? (c.hours ?? 0) : 0),
			0
		)
	);
	const cappedPassedElectiveHours = $derived(
		requiredElectiveHours ? Math.min(passedElectiveHours, requiredElectiveHours) : 0
	);
	const progressTotalUnits = $derived(
		requiredElectiveHours
			? mandatoryCourses.length + requiredElectiveHours
			: mandatoryCourses.length
	);
	const progressCompletedUnits = $derived(
		passedMandatoryCourses.length + (requiredElectiveHours ? cappedPassedElectiveHours : 0)
	);
	const overallProgress = $derived(
		progressTotalUnits === 0 ? 0 : (progressCompletedUnits / progressTotalUnits) * 100
	);

	// Donut is rendered via <Donut /> component

	// Progreso por año movido a <YearlyCourseProgress />
</script>

<div class="grid gap-4 px-3 md:px-0">
	<!-- Donut de avance global -->
	{#if requiredElectiveHours}
		<div class="flex items-center gap-4 overflow-hidden bg-gray-100 p-4 md:rounded-md">
			<div class="w-[72px] shrink-0">
				<Donut progress={overallProgress} strokeWidth={12} />
			</div>
			<div class="grid">
				<span class="text-gray-700">Avance de carrera</span>
			</div>
		</div>
	{/if}

	<!-- Barra apilada por estado (componente) -->
	<StateDistribution {courses} />

	<!-- Progreso por año (componente) -->
	<YearlyCourseProgress {years} />
</div>
