<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTerms, courseTermLabels } from '$lib/course-term';
	import type { StudyPlanViewItem } from '$lib/study-plan-view';
	import Section from './section.svelte';
	import AvailableCoursesTerm from './available-courses-term.svelte';

	type Props = {
		items: StudyPlanViewItem[];
		isStrictModeEnabled: boolean;
		showCodes: boolean;
		viewMode: 'list' | 'diagram';
		onNavigateToDiagram: (courseId: string) => void;
	};

	let { items, isStrictModeEnabled, showCodes, viewMode, onNavigateToDiagram }: Props = $props();

	const notTakenCourses = $derived(
		items.filter((item) => item.item.state === courseStates.notTaken)
	);

	const availableCourses = $derived(notTakenCourses.filter((item) => item.item.isEnabled));

	const areAllCoursesAvailable = $derived(
		(availableCourses.length > 0 && availableCourses.length === items.length) ||
			!isStrictModeEnabled
	);

	const annualAvailableCourses = $derived(
		availableCourses.filter((item) => item.term === courseTerms.annual)
	);

	const firstSemesterAvailableCourses = $derived(
		availableCourses.filter((item) => item.term === courseTerms.firstSemester)
	);

	const secondSemesterAvailableCourses = $derived(
		availableCourses.filter((item) => item.term === courseTerms.secondSemester)
	);

	const semestralAvailableCourses = $derived(
		availableCourses.filter((item) => item.term === courseTerms.semestral)
	);

	const annualOrSemestralAvailableCourses = $derived(
		availableCourses.filter((item) => item.term === courseTerms.annualOrSemestral)
	);

	const unknownAvailableCourses = $derived(
		availableCourses.filter((item) => item.term === undefined || item.term === courseTerms.unknown)
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
