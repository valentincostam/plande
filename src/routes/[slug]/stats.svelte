<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTags } from '$lib/course-tag';
	import type { Course } from '$lib/course.svelte';
	import type { Year } from '$lib/year.svelte';
	import type { CareerProgressConfig } from '$lib/career-progress';
	import Stat from './stat.svelte';

	type Props = {
		courses: Course[];
		years: Year[];
		progress: CareerProgressConfig;
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

	const estimatedGraduationDate = $derived.by(() => {
		const remainingYears = years.filter((year) => year.state !== courseStates.passed);
		if (remainingYears.length === 0) {
			return 'Ya completado';
		}

		const currentDate = new Date();
		const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)

		// Argentine academic calendar: 
		// First semester: March-July (months 2-6)
		// Second semester: August-December (months 7-11)
		const isFirstSemester = currentMonth >= 2 && currentMonth <= 6;

		// Calculate remaining semesters based on remaining years
		let remainingSemesters = remainingYears.length * 2;

		// If we have in-progress years, adjust calculation
		const inProgressYears = years.filter((year) => year.state === courseStates.inProgress);
		if (inProgressYears.length > 0) {
			// If we're in first semester (March-July), we need full remaining years * 2
			// If we're in second semester (Aug-Dec), we need (remaining years * 2) - 1
			if (!isFirstSemester) {
				remainingSemesters = remainingSemesters - 1;
			}
		}

		// Start from current academic position
		let targetYear = currentDate.getFullYear();
		
		// If we're before March, we're still in previous academic year
		if (currentMonth < 2) {
			// We're in January-February, so academic year hasn't started yet
			remainingSemesters = remainingYears.length * 2;
		}

		// Calculate final semester: each remaining semester = 6 months forward
		const semestersFromMarch = remainingSemesters;
		const finalMonth = 2 + (semestersFromMarch * 6); // Start from March (month 2)
		
		let finalYear = targetYear;
		let adjustedMonth = finalMonth;
		
		// Adjust for years
		while (adjustedMonth >= 12) {
			adjustedMonth -= 12;
			finalYear += 1;
		}

		// Determine if graduation is in July (end of first semester) or December (end of second semester)
		if (remainingSemesters % 2 === 1) {
			// Odd number of semesters = ends in first semester = July
			return `Julio ${finalYear}`;
		} else {
			// Even number of semesters = ends in second semester = December
			return `Diciembre ${finalYear}`;
		}
	});
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
			label="Horas electivas aprobadas"
			value={passedElectiveHours}
			total={progress.requiredElectiveHours ?? 0}
			unit="hs."
		/>
	{/if}
	{#if someCourseHasHours}
		<Stat label="Horas semanales en curso" value={inProgressCourseHours} unit="hs." />
	{/if}
	<li class=" overflow-hidden rounded-md bg-gray-100 px-6 py-3 text-center">
		<div class="text-gray-700">Graduación estimada</div>
		<div class="text-2xl font-bold whitespace-nowrap text-gray-600">
			{estimatedGraduationDate}
		</div>
	</li>
</ul>
