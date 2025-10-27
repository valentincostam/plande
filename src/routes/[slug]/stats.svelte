<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTags } from '$lib/course-tag';
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

	const someCourseHasHours = courses.some((course) => course.hours);

	const hasOptativeCourses = courses.some((course) => course.tag === courseTags.optative);

	const hasElectiveCourses = courses.some((course) => course.tag === courseTags.elective);

	const passedCourses = $derived(courses.filter((course) => course.state === courseStates.passed));

	const passedYears = $derived(years.filter((year) => year.state === courseStates.passed));

	const inProgressCourseHours = $derived(
		courses
			.filter((course) => course.state === courseStates.inProgress)
			.reduce((acc, course) => acc + (course.hours ?? 0), 0)
	);

	const electiveCourses = courses.filter(
		(course) => course.tag === courseTags.elective || course.tag === courseTags.optative
	);

	const passedElectiveCourses = $derived(
		electiveCourses.filter((course) => course.state === courseStates.passed)
	);

	const mandatoryCourses = $derived(
		courses.filter(
			(course) => course.tag !== courseTags.elective && course.tag !== courseTags.optative
		)
	);

	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((course) => course.state === courseStates.passed)
	);

	const passedElectiveHours = $derived(
		passedElectiveCourses.reduce((acc, course) => acc + (course.hours ?? 0), 0)
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
			label={hasOptativeCourses ? 'Materias optativas aprobadas' : 'Materias electivas aprobadas'}
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
</ul>
