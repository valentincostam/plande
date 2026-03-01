<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTypes, isElectiveOrOptative } from '$lib/course-type';
	import type { Course } from '$lib/course.svelte';
	import type { Year } from '$lib/year.svelte';
	import type { DegreeProgressConfig } from '$lib/degree-progress';
	import Stat from './stat.svelte';

	type Props = {
		courses: Course[];
		years: Year[];
		progress: DegreeProgressConfig;
	};

	let { courses, years, progress }: Props = $props();

	const someCourseHasHours = $derived(courses.some((course) => course.hours));

	const hasOptativeCourses = $derived(
		courses.some((course) => course.type === courseTypes.optative)
	);

	const hasElectiveCourses = $derived(
		courses.some((course) => course.type === courseTypes.elective)
	);

	const passedCourses = $derived(courses.filter((course) => course.state === courseStates.passed));

	const passedYears = $derived(years.filter((year) => year.state === courseStates.passed));

	const inProgressCourseHours = $derived(
		courses
			.filter((course) => course.state === courseStates.inProgress)
			.reduce((acc, course) => acc + (course.hours ?? 0), 0)
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

	const passedElectiveHours = $derived(
		passedElectiveCourses.reduce((acc, course) => acc + (course.hours ?? 0), 0)
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
</script>

<ul class="grid gap-2 px-3 md:px-0">
	<Stat
		label="Materias aprobadas"
		value={passedCourses.length}
		total={courses.length}
		unit="mat."
	/>
	<Stat
		label="Materias obligatorias aprobadas"
		value={passedMandatoryCourses.length}
		total={mandatoryCourses.length}
		unit="mat."
	/>
	{#if hasElectiveCourses || hasOptativeCourses}
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
	<Stat label="Años aprobados" value={passedYears.length} total={years.length} unit="años" />
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
