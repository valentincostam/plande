<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { courseStates } from '$lib/course-state';
	import { courseTerms, courseTermLabels } from '$lib/course-term';
	import { getCourseEffectiveTerm } from '$lib/year.svelte';
	import Section from './section.svelte';
	import AvailableCoursesTerm from './available-courses-term.svelte';

	type Props = {
		courses: Course[];
		isStrictModeEnabled: boolean;
		showCodes: boolean;
		viewMode: 'list' | 'diagram';
		onNavigateToDiagram: (courseId: number) => void;
	};

	let { courses, isStrictModeEnabled, showCodes, viewMode, onNavigateToDiagram }: Props = $props();

	const notTakenCourses = $derived(
		courses.filter((course) => course.state === courseStates.notTaken)
	);

	const availableCourses = $derived(notTakenCourses.filter((course) => course.isEnabled));

	const areAllCoursesAvailable = $derived(
		(availableCourses.length > 0 && availableCourses.length === courses.length) ||
			!isStrictModeEnabled
	);

	const annualAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.annual
		)
	);

	const firstSemesterAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.firstSemester
		)
	);

	const secondSemesterAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.secondSemester
		)
	);

	const semestralAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.semestral
		)
	);

	const annualOrSemestralAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.annualOrSemestral
		)
	);

	const unknownAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.unknown
		)
	);
</script>

<Section id="disponibles" title="Qué podés cursar">
	{#if areAllCoursesAvailable}
		<p class="px-3">
			Todas las materias están disponibles para cursar{!isStrictModeEnabled
				? ' porque el modo estricto no está activado y los requisitos de las materias no son obligatorios'
				: ''}.
		</p>
	{:else if availableCourses.length === 0}
		<p class="px-3">No hay materias disponibles para cursar.</p>
	{:else}
		<div class="grid gap-5">
			<p class="px-3">
				{#if availableCourses.length == 1}
					En tu situación actual, esta es la materia que podés cursar.
				{:else}
					En tu situación actual, estas son las {availableCourses.length} materias que podés cursar.
				{/if}
				El número junto al candado indica cuántas materias desbloquea.
			</p>
			<AvailableCoursesTerm
				title={courseTermLabels[courseTerms.annualOrSemestral]}
				courses={annualOrSemestralAvailableCourses}
				{showCodes}
				{viewMode}
				{onNavigateToDiagram}
			/>
			<AvailableCoursesTerm
				title={courseTermLabels[courseTerms.annual]}
				courses={annualAvailableCourses}
				{showCodes}
				{viewMode}
				{onNavigateToDiagram}
			/>
			<AvailableCoursesTerm
				title={courseTermLabels[courseTerms.firstSemester]}
				courses={firstSemesterAvailableCourses}
				{showCodes}
				{viewMode}
				{onNavigateToDiagram}
			/>
			<AvailableCoursesTerm
				title={courseTermLabels[courseTerms.secondSemester]}
				courses={secondSemesterAvailableCourses}
				{showCodes}
				{viewMode}
				{onNavigateToDiagram}
			/>
			<AvailableCoursesTerm
				title={courseTermLabels[courseTerms.semestral]}
				courses={semestralAvailableCourses}
				{showCodes}
				{viewMode}
				{onNavigateToDiagram}
			/>
			<AvailableCoursesTerm
				title="Materias electivas"
				courses={unknownAvailableCourses}
				{showCodes}
				{viewMode}
				{onNavigateToDiagram}
				hideTypeForTransversal
			/>
		</div>
	{/if}
</Section>
