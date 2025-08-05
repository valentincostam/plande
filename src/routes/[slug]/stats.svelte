<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTags } from '$lib/course-tag';
	import type { Course } from '$lib/course.svelte';
	import type { Year } from '$lib/year.svelte';
	import Stat from './stat.svelte';

	type Props = {
		courses: Course[];
		years: Year[];
		requiredElectiveHours?: number;
	};

	let { courses, years, requiredElectiveHours }: Props = $props();

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

	const mandatoryCourses = $derived(courses.filter((course) => course.tag !== courseTags.elective));

	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((course) => course.state === courseStates.passed)
	);

	const passedElectiveHours = $derived(
		passedElectiveCourses.reduce((acc, course) => acc + (course.hours ?? 0), 0)
	);
</script>

<ul class="grid gap-2">
	<Stat label="Materias aprobadas" value={passedCourses.length} total={courses.length} />
	<Stat
		label="Materias obligatorias aprobadas"
		value={passedMandatoryCourses.length}
		total={mandatoryCourses.length}
	/>
	{#if hasElectiveCourses || hasOptativeCourses}
		<Stat
			label={hasOptativeCourses ? 'Materias optativas aprobadas' : 'Materias electivas aprobadas'}
			value={passedElectiveCourses.length}
			total={electiveCourses.length}
		/>
	{/if}
	{#if requiredElectiveHours}
		<Stat
			label="Horas electivas aprobadas"
			value={passedElectiveHours}
			total={requiredElectiveHours}
		/>
	{/if}
	<Stat label="Años aprobados" value={passedYears.length} total={years.length} />
	{#if someCourseHasHours}
		<Stat label="Horas en curso" value={inProgressCourseHours} />
	{/if}
</ul>
