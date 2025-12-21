<script lang="ts">
	import { courseTermLabels, courseTerms } from '$lib/course-term';
	import { courseTags } from '$lib/course-tag';
	import type { Course as CourseType } from '$lib/course.svelte';

	import Course from './course.svelte';
	import Term from './term.svelte';
	import { getCourseEffectiveTerm } from '$lib/year.svelte';

	type Props = {
		courses: CourseType[];
		showCodes?: boolean;
		title?: string;
	};

	let { courses, showCodes = false, title }: Props = $props();

	const hasElectiveCourses = $derived(
		courses.some(
			(course) => course.tag === courseTags.elective || course.tag === courseTags.optative
		)
	);

	const defaultTitle = $derived(
		hasElectiveCourses ? 'Materias Electivas' : 'Materias Transversales'
	);

	const displayTitle = $derived(title ?? defaultTitle);

	const annualCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.annual)
	);

	const firstSemesterCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.firstSemester)
	);

	const secondSemesterCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.secondSemester)
	);

	const semestralCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.semestral)
	);

	const unknownCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.unknown)
	);
</script>

<article>
	<header>
		<h2 class="p-3 text-lg font-bold">
			{displayTitle}
		</h2>
	</header>

	{#if annualCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.annual]} courses={annualCourses}>
			{#each annualCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if firstSemesterCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.firstSemester]} courses={firstSemesterCourses}>
			{#each firstSemesterCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if secondSemesterCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.secondSemester]} courses={secondSemesterCourses}>
			{#each secondSemesterCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if semestralCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.semestral]} courses={semestralCourses}>
			{#each semestralCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}

	{#if unknownCourses.length > 0}
		<Term courses={unknownCourses}>
			{#each unknownCourses as course}
				<Course {course} {showCodes} />
			{/each}
		</Term>
	{/if}
</article>
