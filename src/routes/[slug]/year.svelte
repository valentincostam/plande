<script lang="ts">
	import { courseTermLabels, courseTerms } from '$lib/course-term';

	import Course from './course.svelte';
	import Term from './term.svelte';
	import { getOrdinalSuperscript, getCourseEffectiveTerm, type Year } from '$lib/year.svelte';
	import BulkStateSelect from './bulk-state-select.svelte';
	import { courseStates, type CourseState } from '$lib/course-state';
	import StatePill from './state-pill.svelte';

	type Props = {
		year: Year;
		showCodes?: boolean;
		showBulkSelect?: boolean;
	};

	let { year, showCodes = false, showBulkSelect = false }: Props = $props();

	let selectValue = $state<CourseState | ''>('');

	const annualCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.annual
	);

	const firstSemesterCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.firstSemester
	);

	const secondSemesterCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.secondSemester
	);

	const semestralCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.semestral
	);

	const unknownCourses = year.courses.filter(
		(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.unknown
	);

	const onchange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const newState = target.value as CourseState;

		if (newState) {
			// Cambiar el estado de todas las materias
			year.courses.forEach((course) => {
				course.state = newState;
			});
		}

		// Resetear el select al placeholder
		selectValue = '';
	};
</script>

<article>
	<header
		class="sticky top-0 z-10 flex items-center justify-between bg-white shadow-[-2px_0_0_#FFFFFF,2px_0_0_#FFFFFF]"
	>
		<div class="flex items-center gap-3 p-3">
			<h2 class="text-lg font-bold">
				{year.year}<sup>{getOrdinalSuperscript(year.year)}</sup> Año
			</h2>
			{#if year.state === courseStates.passed}
				<StatePill state={courseStates.passed} gender="masculine" class="text-xs" />
			{/if}
		</div>
		{#if showBulkSelect}
			<BulkStateSelect id={`year-${year.year}-state-select`} {onchange} bind:value={selectValue} />
		{/if}
	</header>

	{#if annualCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.annual]} courses={annualCourses} year={year.year}>
			{#each annualCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if firstSemesterCourses.length > 0}
		<Term
			title={courseTermLabels[courseTerms.firstSemester]}
			courses={firstSemesterCourses}
			year={year.year}
		>
			{#each firstSemesterCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if secondSemesterCourses.length > 0}
		<Term
			title={courseTermLabels[courseTerms.secondSemester]}
			courses={secondSemesterCourses}
			year={year.year}
		>
			{#each secondSemesterCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if semestralCourses.length > 0}
		<Term
			title={courseTermLabels[courseTerms.semestral]}
			courses={semestralCourses}
			year={year.year}
		>
			{#each semestralCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if unknownCourses.length > 0}
		<Term courses={unknownCourses} year={year.year}>
			{#each unknownCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}
</article>
