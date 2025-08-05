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

	const passedCourses = $derived(courses.filter((course) => course.state === courseStates.passed));
	const passedYears = $derived(years.filter((year) => year.state === courseStates.passed));
	const inProgressCourseHours = $derived(
		courses
			.filter((course) => course.state === courseStates.inProgress)
			.reduce((acc, course) => acc + course.hours, 0)
	);
	const electiveCourses = courses.filter((course) => course.tag === courseTags.elective);
	const passedElectiveCourses = $derived(
		electiveCourses.filter((course) => course.state === courseStates.passed)
	);
	const mandatoryCourses = $derived(courses.filter((course) => course.tag !== courseTags.elective));
	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((course) => course.state === courseStates.passed)
	);
	const passedElectiveHours = $derived(
		passedElectiveCourses.reduce((acc, course) => acc + course.hours, 0)
	);
</script>

<ul class="grid gap-2">
	<Stat label="Materias aprobadas" value={passedCourses.length} total={courses.length} />
	<Stat
		label="Materias obligatorias aprobadas"
		value={passedMandatoryCourses.length}
		total={mandatoryCourses.length}
	/>
	<Stat
		label="Materias electivas aprobadas"
		value={passedElectiveCourses.length}
		total={electiveCourses.length}
	/>
	{#if requiredElectiveHours}
		<Stat
			label="Horas electivas aprobadas"
			value={passedElectiveHours}
			total={requiredElectiveHours}
		/>
	{/if}
	<Stat label="Años aprobados" value={passedYears.length} total={years.length} />
	<Stat label="Horas en curso" value={inProgressCourseHours} />
</ul>
