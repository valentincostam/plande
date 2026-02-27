<script lang="ts">
	import { courseTermLabels, courseTerms } from '$lib/course-term';
	import { isElectiveOrOptative } from '$lib/course-type';
	import type { Course as CourseType } from '$lib/course.svelte';

	import Course from './course.svelte';
	import Term from './term.svelte';
	import Section from './section.svelte';
	import { getCourseEffectiveTerm } from '$lib/year.svelte';

	type Props = {
		courses: CourseType[];
		showCodes?: boolean;
		title?: string;
	};

	let { courses, showCodes = false, title }: Props = $props();

	const allCoursesAreElective = $derived(
		courses.length > 0 && courses.every((course) => isElectiveOrOptative(course.type))
	);

	const defaultTitle = $derived(
		allCoursesAreElective ? 'Materias Electivas' : 'Materias Transversales'
	);

	const displayTitle = $derived(title ?? defaultTitle);

	const sectionId = $derived(allCoursesAreElective ? 'electivas' : 'transversales');

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

	const annualOrSemestralCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.annualOrSemestral)
	);

	const unknownCourses = $derived(
		courses.filter((course) => getCourseEffectiveTerm(course) === courseTerms.unknown)
	);
</script>

<Section id={sectionId} title={displayTitle}>
	{#if annualOrSemestralCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.annualOrSemestral]} courses={annualOrSemestralCourses}>
			{#each annualOrSemestralCourses as course}
				<Course {course} {showCodes} hideTypeBadge={allCoursesAreElective} />
			{/each}
		</Term>
	{/if}

	{#if annualCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.annual]} courses={annualCourses}>
			{#each annualCourses as course}
				<Course {course} {showCodes} hideTypeBadge={allCoursesAreElective} />
			{/each}
		</Term>
	{/if}

	{#if firstSemesterCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.firstSemester]} courses={firstSemesterCourses}>
			{#each firstSemesterCourses as course}
				<Course {course} {showCodes} hideTypeBadge={allCoursesAreElective} />
			{/each}
		</Term>
	{/if}

	{#if secondSemesterCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.secondSemester]} courses={secondSemesterCourses}>
			{#each secondSemesterCourses as course}
				<Course {course} {showCodes} hideTypeBadge={allCoursesAreElective} />
			{/each}
		</Term>
	{/if}

	{#if semestralCourses.length > 0}
		<Term title={courseTermLabels[courseTerms.semestral]} courses={semestralCourses}>
			{#each semestralCourses as course}
				<Course {course} {showCodes} hideTypeBadge={allCoursesAreElective} />
			{/each}
		</Term>
	{/if}

	{#if unknownCourses.length > 0}
		<Term courses={unknownCourses}>
			{#each unknownCourses as course}
				<Course {course} {showCodes} hideTypeBadge={allCoursesAreElective} />
			{/each}
		</Term>
	{/if}
</Section>
