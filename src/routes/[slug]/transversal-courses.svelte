<script lang="ts">
	import { courseTermLabels, courseTerms } from '$lib/course-term';
	import type { Course as CourseType } from '$lib/course.svelte';

	import Course from './course.svelte';
	import Term from './term.svelte';
	import { getCourseEffectiveTerm } from '$lib/year.svelte';

	type Props = {
		courses: CourseType[];
		showCodes?: boolean;
		title?: string;
	};

	let { courses, showCodes = false, title = 'Materias Electivas' }: Props = $props();

	const annualCourses = courses.filter(
		(course) => getCourseEffectiveTerm(course) === courseTerms.annual
	);

	const firstSemesterCourses = courses.filter(
		(course) => getCourseEffectiveTerm(course) === courseTerms.firstSemester
	);

	const secondSemesterCourses = courses.filter(
		(course) => getCourseEffectiveTerm(course) === courseTerms.secondSemester
	);

	const semestralCourses = courses.filter(
		(course) => getCourseEffectiveTerm(course) === courseTerms.semestral
	);
</script>

<article>
	<header
		class="sticky top-0 z-10 flex items-center justify-between bg-white shadow-[-2px_0_0_#FFFFFF,2px_0_0_#FFFFFF]"
	>
		<div class="flex items-center gap-3 p-3">
			<h2 class="text-lg font-bold">
				{title}
			</h2>
		</div>
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
</article>
