<script lang="ts">
	import { courseTermLabels, courseTerms } from '$lib/course-term';

	import Course from './course.svelte';
	import Term from './term.svelte';
	import { getCourseEffectiveTerm, getOrdinalPrefix, type Year } from '$lib/year.svelte';
	import Ordinal from '$lib/ordinal.svelte';
	import BulkStateSelect from './bulk-state-select.svelte';
	import { courseStates, type CourseState } from '$lib/course-state';
	import StatePill from './state-pill.svelte';
	import AnchoredHeading from './anchored-heading.svelte';

	type Props = {
		year: Year;
		showCodes?: boolean;
		showBulkSelect?: boolean;
	};

	let { year, showCodes = false, showBulkSelect = false }: Props = $props();

	let selectValue = $state<CourseState | ''>('');

	const yearOrdinalPrefix = $derived(getOrdinalPrefix(year.year));

	const yearId = $derived(`${yearOrdinalPrefix}-año`);
	const headingId = $derived(`${yearId}-heading`);

	const annualCourses = $derived(
		year.courses.filter(
			(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.annual
		)
	);

	const firstSemesterCourses = $derived(
		year.courses.filter(
			(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.firstSemester
		)
	);

	const secondSemesterCourses = $derived(
		year.courses.filter(
			(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.secondSemester
		)
	);

	const semestralCourses = $derived(
		year.courses.filter(
			(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.semestral
		)
	);

	const annualOrSemestralCourses = $derived(
		year.courses.filter(
			(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.annualOrSemestral
		)
	);

	const unknownCourses = $derived(
		year.courses.filter(
			(course) => getCourseEffectiveTerm(course, year.year) === courseTerms.unknown
		)
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

<section aria-labelledby={headingId} id={yearId}>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-3 p-3">
			<AnchoredHeading
				id={yearId}
				{headingId}
				ariaLabel={`Copiar enlace a ${yearOrdinalPrefix} año`}
				class="text-lg font-bold"
			>
				<Ordinal number={year.year} noun="Año" />
			</AnchoredHeading>
			{#if year.state === courseStates.passed}
				<StatePill state={courseStates.passed} gender="masculine" class="text-xs" />
			{/if}
		</div>
		{#if showBulkSelect}
			<BulkStateSelect
				id={`year-${year.year}-state-select`}
				label={`Cambiar estado de todas las materias de ${year.year}° año`}
				{onchange}
				bind:value={selectValue}
				canPass
			/>
		{/if}
	</header>

	{#if annualOrSemestralCourses.length > 0}
		<Term
			title={courseTermLabels[courseTerms.annualOrSemestral]}
			courses={annualOrSemestralCourses}
			year={year.year}
		>
			{#each annualOrSemestralCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

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
</section>
