<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTypes, isElectiveOrOptative } from '$lib/course-type';
	import type { DegreeProgressConfig } from '$lib/degree-progress';
	import type { StudyPlanViewItem, StudyPlanViewSection } from '$lib/study-plan-view';
	import Stat from './stat.svelte';

	type Props = {
		items: StudyPlanViewItem[];
		sections: StudyPlanViewSection[];
		progress: DegreeProgressConfig;
	};

	let { items, sections, progress }: Props = $props();

	const someCourseHasHours = $derived(items.some((item) => item.item.def.hours));

	const hasOptativeCourses = $derived(
		items.some((item) => item.item.def.type === courseTypes.optative)
	);

	const hasElectiveCourses = $derived(
		items.some((item) => item.item.def.type === courseTypes.elective)
	);

	const passedCourses = $derived(items.filter((item) => item.item.state === courseStates.passed));

	const passedYears = $derived(
		sections.filter(
			(section) => section.year !== undefined && section.section.state === courseStates.passed
		)
	);

	const inProgressCourseHours = $derived(
		items
			.filter((item) => item.item.state === courseStates.inProgress)
			.reduce((acc, item) => acc + (item.item.def.hours ?? 0), 0)
	);

	const electiveCourses = $derived(
		items.filter((item) => isElectiveOrOptative(item.item.def.type))
	);

	const passedElectiveCourses = $derived(
		electiveCourses.filter((item) => item.item.state === courseStates.passed)
	);

	const mandatoryCourses = $derived(
		items.filter((item) => item.item.def.type === courseTypes.mandatory)
	);

	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((item) => item.item.state === courseStates.passed)
	);

	const passedElectiveHours = $derived(
		passedElectiveCourses.reduce((acc, item) => acc + (item.item.def.hours ?? 0), 0)
	);

	const requiredElectiveCount = $derived(
		progress.type === 'mandatory-plus-elective-count' ? (progress.requiredElectiveCount ?? 1) : 0
	);

	const passedRequiredElectiveCount = $derived(
		Math.min(passedElectiveCourses.length, requiredElectiveCount)
	);

	const passedCoursesWithGrade = $derived(
		passedCourses.filter((item) => item.item.grade !== undefined && item.item.grade !== null)
	);

	const average = $derived(
		passedCoursesWithGrade.length > 0
			? passedCoursesWithGrade.reduce((acc, item) => acc + (item.item.grade ?? 0), 0) /
					passedCoursesWithGrade.length
			: 0
	);
</script>

<ul class="grid gap-2 px-3 md:px-0">
	<Stat label="Materias aprobadas" value={passedCourses.length} total={items.length} unit="mat." />
	<Stat
		label="Materias obligatorias aprobadas"
		value={passedMandatoryCourses.length}
		total={mandatoryCourses.length}
		unit="mat."
	/>
	{#if hasElectiveCourses || hasOptativeCourses}
		{#if progress.type === 'mandatory-plus-elective-count'}
			<Stat
				label="Materias electivas requeridas aprobadas"
				description={`${electiveCourses.length} electivas disponibles en el plan`}
				value={passedRequiredElectiveCount}
				total={requiredElectiveCount}
				unit="mat."
			/>
		{:else}
			<Stat
				label={hasElectiveCourses && hasOptativeCourses
					? 'Materias electivas y optativas aprobadas'
					: hasOptativeCourses
						? 'Materias optativas aprobadas'
						: 'Materias electivas aprobadas'}
				value={passedElectiveCourses.length}
				total={electiveCourses.length}
				unit="mat."
			/>
		{/if}
	{/if}
	<Stat
		label="Años aprobados"
		value={passedYears.length}
		total={sections.filter((section) => section.year !== undefined).length}
		unit="años"
	/>
	{#if progress.type === 'mandatory-plus-elective-hours'}
		<Stat
			label="Horas cátedra de materias electivas aprobadas"
			value={passedElectiveHours}
			total={progress.requiredElectiveHours ?? 0}
			unit="hs."
		/>
	{/if}
	{#if someCourseHasHours}
		<Stat label="Horas cátedra semanales en curso" value={inProgressCourseHours} unit="hs." />
	{/if}
	{#if passedCoursesWithGrade.length > 0}
		<Stat
			label="Promedio sin aplazos"
			description={`De ${passedCoursesWithGrade.length} ${
				passedCoursesWithGrade.length === 1 ? 'materia' : 'materias'
			} con nota de aprobación`}
			value={average}
		/>
	{/if}
</ul>
