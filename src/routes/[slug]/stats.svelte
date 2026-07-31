<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import { courseTypes, isElectiveOrOptative } from '$lib/course-type';
	import type { GraduationRequirement } from '$lib/study-plan-data';
	import type { GraduationRequirementResult } from '$lib/requirement-evaluator';
	import type { StudyPlanViewItem, StudyPlanViewSection } from '$lib/study-plan-view';
	import Stat from './stat.svelte';

	type Props = {
		graduationBlocks?: GraduationRequirementResult[];
		graduationRequirements?: GraduationRequirement[];
		items: StudyPlanViewItem[];
		sections: StudyPlanViewSection[];
	};

	let {
		items,
		sections,
		graduationRequirements = [],
		graduationBlocks = []
	}: Props = $props();

	const someCourseHasHours = $derived(items.some((item) => item.item.def.hours));

	const hasOptativeCourses = $derived(
		items.some((item) => item.item.def.type === courseTypes.optative)
	);

	const hasElectiveCourses = $derived(
		items.some((item) => item.item.def.type === courseTypes.elective)
	);

	const passedCourses = $derived(items.filter((item) => item.item.state === courseStates.passed));

	const passedYears = $derived(
		sections.filter(
			(section) => section.year !== undefined && section.section.state === courseStates.passed
		)
	);

	const inProgressCourseHours = $derived(
		items
			.filter((item) => item.item.state === courseStates.inProgress)
			.reduce((acc, item) => acc + (item.item.def.hours ?? 0), 0)
	);

	const electiveCourses = $derived(
		items.filter((item) => isElectiveOrOptative(item.item.def.type))
	);

	const passedElectiveCourses = $derived(
		electiveCourses.filter((item) => item.item.state === courseStates.passed)
	);

	const mandatoryCourses = $derived(
		items.filter((item) => item.item.def.type === courseTypes.mandatory)
	);

	const passedMandatoryCourses = $derived(
		mandatoryCourses.filter((item) => item.item.state === courseStates.passed)
	);

	const passedElectiveHours = $derived(
		passedElectiveCourses.reduce((acc, item) => acc + (item.item.def.hours ?? 0), 0)
	);

	const requiredGroupedCoursesLabel = $derived.by(() => {
		if (hasElectiveCourses && hasOptativeCourses)
			return 'Materias electivas y optativas requeridas aprobadas';
		if (hasOptativeCourses) return 'Materias optativas requeridas aprobadas';
		return 'Materias electivas requeridas aprobadas';
	});

	const availableGroupedCoursesDescription = $derived.by(() => {
		if (hasElectiveCourses && hasOptativeCourses) {
			return `${electiveCourses.length} electivas y optativas disponibles en el plan`;
		}
		if (hasOptativeCourses) return `${electiveCourses.length} optativas disponibles en el plan`;
		return `${electiveCourses.length} electivas disponibles en el plan`;
	});

	const countGraduationRequirements = $derived(
		graduationRequirements.filter(
			(requirement) => requirement.expr.type === 'count'
		)
	);
	const sumGraduationRequirements = $derived(
		graduationRequirements.filter((requirement) => requirement.expr.type === 'sum')
	);
	const requiredElectiveCount = $derived(
		countGraduationRequirements.reduce(
			(total, requirement) =>
				total + (requirement.expr.type === 'count' ? requirement.expr.min : 0),
			0
		)
	);
	const requiredElectiveHours = $derived(
		sumGraduationRequirements.reduce(
			(total, requirement) =>
				total + (requirement.expr.type === 'sum' ? requirement.expr.min : 0),
			0
		)
	);

	const countRequirementDetails = $derived(
		graduationRequirements
			.flatMap((requirement) =>
				requirement.expr.type === 'count' ? [{ requirement, expr: requirement.expr }] : []
			)
			.map(({ requirement, expr }) => {
				const selector = expr.selector;
				const matchingItems = items.filter((item) => {
					switch (selector.type) {
						case 'items':
							return selector.itemIds.includes(item.item.def.id);
						case 'tag':
							return item.item.def.tags?.includes(selector.tag) ?? false;
						case 'section':
							return item.item.def.placements.some(
								(placement) => placement.sectionId === selector.sectionId
							);
						case 'all':
							return (
								item.item.def.kind === 'course' &&
								(selector.courseType === undefined || item.item.def.type === selector.courseType)
							);
						case 'sections':
							return item.item.def.placements.some(
								(placement) =>
									selector.sectionIds.includes(placement.sectionId) &&
									(selector.term === undefined || placement.term === selector.term)
							);
					}
				});
				const rawPassedCount = matchingItems.filter(
					(item) => item.item.state === courseStates.passed
				).length;
				const block = graduationBlocks.find((candidate) => candidate.id === requirement.id);
				return {
					label: requirement.label,
					value: block?.completedUnits ?? 0,
					total: expr.min,
					summary: `${rawPassedCount} de ${expr.min} mat.`
				};
			})
	);

	const passedRequiredElectiveCount = $derived(
		countRequirementDetails.length > 0
			? countRequirementDetails.reduce((total, detail) => total + (detail.value ?? 0), 0)
			: Math.min(passedElectiveCourses.length, requiredElectiveCount)
	);

	const passedCoursesWithGrade = $derived(
		passedCourses.filter((item) => item.item.grade !== undefined && item.item.grade !== null)
	);

	const average = $derived(
		passedCoursesWithGrade.length > 0
			? passedCoursesWithGrade.reduce((acc, item) => acc + (item.item.grade ?? 0), 0) /
					passedCoursesWithGrade.length
			: 0
	);
</script>

<ul class="grid gap-2 px-3 md:px-0">
	<Stat label="Materias aprobadas" value={passedCourses.length} total={items.length} unit="mat." />
	<Stat
		label="Materias obligatorias aprobadas"
		value={passedMandatoryCourses.length}
		total={mandatoryCourses.length}
		unit="mat."
	/>
	{#if hasElectiveCourses || hasOptativeCourses}
		{#if countGraduationRequirements.length > 0}
			<Stat
				label={requiredGroupedCoursesLabel}
				description={availableGroupedCoursesDescription}
				details={countRequirementDetails.length > 1 ? countRequirementDetails : []}
				value={passedRequiredElectiveCount}
				total={requiredElectiveCount}
				unit="mat."
			/>
		{:else}
			<Stat
				label={hasElectiveCourses && hasOptativeCourses
					? 'Materias electivas y optativas aprobadas'
					: hasOptativeCourses
						? 'Materias optativas aprobadas'
						: 'Materias electivas aprobadas'}
				value={passedElectiveCourses.length}
				total={electiveCourses.length}
				unit="mat."
			/>
		{/if}
	{/if}
	<Stat
		label="Años aprobados"
		value={passedYears.length}
		total={sections.filter((section) => section.year !== undefined).length}
		unit="años"
	/>
	{#if sumGraduationRequirements.length > 0}
		<Stat
			label="Horas cátedra de materias electivas aprobadas"
			value={passedElectiveHours}
			total={requiredElectiveHours}
			unit="hs."
		/>
	{/if}
	{#if someCourseHasHours}
		<Stat label="Horas cátedra semanales en curso" value={inProgressCourseHours} unit="hs." />
	{/if}
	{#if passedCoursesWithGrade.length > 0}
		<Stat
			label="Promedio sin aplazos"
			description={`De ${passedCoursesWithGrade.length} ${
				passedCoursesWithGrade.length === 1 ? 'materia' : 'materias'
			} con nota de aprobación`}
			value={average}
		/>
	{/if}
</ul>
