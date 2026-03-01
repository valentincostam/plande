<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTypes, isElectiveOrOptative } from '$lib/course-type';
	import { calculateDegreeProgress, type DegreeProgressConfig } from '$lib/degree-progress';
	import type { Course } from '$lib/course.svelte';

	type Props = {
		courses: Course[];
		progress: DegreeProgressConfig;
	};

	let { courses, progress }: Props = $props();

	const degreeProgress = $derived(calculateDegreeProgress(courses, progress));

	const passedCourses = $derived(courses.filter((course) => course.state === courseStates.passed));

	const hasElectiveCourses = $derived(
		courses.some((course) => course.type === courseTypes.elective)
	);

	const hasOptativeCourses = $derived(
		courses.some((course) => course.type === courseTypes.optative)
	);

	const electiveCourses = $derived(courses.filter((course) => isElectiveOrOptative(course.type)));

	const passedElectiveCourses = $derived(
		electiveCourses.filter((course) => course.state === courseStates.passed)
	);

	const mandatoryCourses = $derived(
		courses.filter((course) => course.type === courseTypes.mandatory)
	);

	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((course) => course.state === courseStates.passed)
	);

	const passedCoursesWithGrade = $derived(
		passedCourses.filter((course) => course.grade !== undefined && course.grade !== null)
	);

	const average = $derived(
		passedCoursesWithGrade.length > 0
			? passedCoursesWithGrade.reduce((acc, course) => acc + (course.grade ?? 0), 0) /
					passedCoursesWithGrade.length
			: 0
	);

	const numberFormatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 });

	const requiredElectiveCount = $derived(
		progress.type === 'mandatory-plus-elective-count' ? (progress.requiredElectiveCount ?? 1) : 0
	);

	const passedRequiredElectiveCount = $derived(
		Math.min(passedElectiveCourses.length, requiredElectiveCount)
	);

	const electiveLabel = $derived.by(() => {
		if (progress.type === 'mandatory-plus-elective-count') {
			return 'Materias electivas requeridas aprobadas';
		}
		if (hasElectiveCourses && hasOptativeCourses) {
			return 'Materias electivas/optativas aprobadas';
		}
		if (hasOptativeCourses) {
			return 'Materias optativas aprobadas';
		}
		return 'Materias electivas aprobadas';
	});
</script>

<section aria-labelledby="stats-heading">
	<h2 id="stats-heading" class="p-3 text-lg font-bold">Estadísticas</h2>

	<ul>
		<li class="flex items-center justify-between gap-3 border-b border-gray-100 p-3">
			<span class="flex-1">Avance de carrera</span>
			<span class="font-bold text-gray-700">{Math.round(degreeProgress.percentage)}%</span>
		</li>

		<li class="flex items-center justify-between gap-3 border-b border-gray-100 p-3">
			<span class="flex-1">Materias obligatorias aprobadas</span>
			<span>
				<span class="font-bold text-gray-700">{passedMandatoryCourses.length}</span>
				<span class="text-gray-500">de {mandatoryCourses.length}</span>
			</span>
		</li>

		{#if hasElectiveCourses || hasOptativeCourses}
			<li
				class="flex items-center justify-between gap-3 border-b border-gray-100 p-3 last:border-b-0"
			>
				<span class="flex-1">
					{electiveLabel}
					{#if progress.type === 'mandatory-plus-elective-count'}
						<span class="block text-xs text-gray-500"
							>{electiveCourses.length} electivas disponibles en el plan</span
						>
					{/if}
				</span>
				<span>
					<span class="font-bold text-gray-700"
						>{progress.type === 'mandatory-plus-elective-count'
							? passedRequiredElectiveCount
							: passedElectiveCourses.length}</span
					>
					<span class="text-gray-500"
						>de {progress.type === 'mandatory-plus-elective-count'
							? requiredElectiveCount
							: electiveCourses.length}</span
					>
				</span>
			</li>
		{/if}

		{#if passedCoursesWithGrade.length > 0}
			<li class="flex items-center justify-between gap-3 p-3">
				<span class="flex-1">Promedio</span>
				<span class="font-bold text-green-700">{numberFormatter.format(average)}</span>
			</li>
		{/if}
	</ul>
</section>
