<script lang="ts">
	import { courseTermLabels, courseTerms } from '$lib/course-term';

	import Course from './course.svelte';
	import Term from './term.svelte';
	import { getOrdinalSuperscript, getCourseEffectiveTerm, type Year } from '$lib/year.svelte';
	import StateSelect from './state-select.svelte';
	import { type CourseState } from '$lib/course-state';

	type Props = {
		year: Year;
		showCodes?: boolean;
	};

	let { year, showCodes = false }: Props = $props();

	const annualCourses = year.courses.filter((course) => getCourseEffectiveTerm(course, year.year) === courseTerms.annual);

	const firstSemesterCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.firstSemester
	);

	const secondSemesterCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.secondSemester
	);

	const semestralCourses = year.courses.filter((course) => getCourseEffectiveTerm(course, year.year) === courseTerms.semestral);

	const onchange = (event: Event) => {
		const newState = (event.target as HTMLSelectElement).value as CourseState;
		year.state = newState;
		year.courses.forEach((course) => (course.state = newState));
	};
</script>

<article>
	<header
		class="sticky top-0 z-10 flex items-center justify-between bg-white p-3 shadow-[-2px_0_0_#FFFFFF,2px_0_0_#FFFFFF]"
	>
		<h2 class="text-lg font-bold">
			{year.year}<sup>{getOrdinalSuperscript(year.year)}</sup> Año
		</h2>

		<StateSelect
			id={`year-${year.year}`}
			value={year.state}
			isEnabled={year.isEnabled}
			canPass={year.canPass}
			{onchange}
			gender="masculine"
		/>
	</header>

	{#if annualCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.annual]}>
			{#each annualCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if firstSemesterCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.firstSemester]}>
			{#each firstSemesterCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if secondSemesterCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.secondSemester]}>
			{#each secondSemesterCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if semestralCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.semestral]}>
			{#each semestralCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}
</article>
