<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { countAllDependents } from '$lib/course.svelte';
	import { courseStates } from '$lib/course-state';
	import { courseTerms, type CourseTerm } from '$lib/course-term';
	import { courseTypes, isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import UnlockIcon from './unlock-icon.svelte';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import Ordinal from '$lib/ordinal.svelte';
	import CourseLink from './course-link.svelte';
	import Section from './section.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		courses: Course[];
		showCodes?: boolean;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: number) => void;
	};

	let { courses, showCodes = false, viewMode = 'list', onNavigateToDiagram }: Props = $props();

	const INITIAL_LIMIT = 10;

	let showPassedCourses = $state(true);
	let showElectiveCourses = $state(true);
	let showAll = $state(false);

	const electiveLabel = $derived.by(() => {
		const hasElective = courses.some((c) => c.type === courseTypes.elective);
		const hasOptative = courses.some((c) => c.type === courseTypes.optative);
		if (hasElective && hasOptative) return 'electivas/optativas';
		if (hasOptative) return 'optativas';
		return 'electivas';
	});

	type PriorityCourse = {
		course: Course;
		dependentCount: number;
	};

	const getTermSortOrder = (term: CourseTerm): number => {
		switch (term) {
			case courseTerms.annualOrSemestral:
				return 0;
			case courseTerms.annual:
				return 1;
			case courseTerms.firstSemester:
				return 2;
			case courseTerms.secondSemester:
				return 3;
			case courseTerms.semestral:
				return 4;
			case courseTerms.crossYear:
				return 5;
			case courseTerms.unknown:
			default:
				return 6;
		}
	};

	const priorityCourses = $derived.by(() => {
		const coursesWithDependents: PriorityCourse[] = courses.map((course) => ({
			course,
			dependentCount: countAllDependents(course)
		}));

		return coursesWithDependents.sort((a, b) => {
			// 1. Dependientes (descendente)
			if (b.dependentCount !== a.dependentCount) {
				return b.dependentCount - a.dependentCount;
			}

			// 2. Año (ascendente)
			const yearA = a.course.year ?? Infinity;
			const yearB = b.course.year ?? Infinity;
			if (yearA !== yearB) {
				return yearA - yearB;
			}

			// 3. Cuatrimestre (ascendente según orden definido)
			const termOrderA = getTermSortOrder(a.course.term);
			const termOrderB = getTermSortOrder(b.course.term);
			if (termOrderA !== termOrderB) {
				return termOrderA - termOrderB;
			}

			// 4. Alfabético
			return a.course.name.localeCompare(b.course.name, 'es');
		});
	});

	const filteredPriorityCourses = $derived(
		priorityCourses.filter(({ course }) => {
			if (!showPassedCourses && course.state === courseStates.passed) return false;
			if (!showElectiveCourses && isElectiveOrOptative(course.type)) return false;
			return true;
		})
	);

	const shouldShowExpandButton = $derived(filteredPriorityCourses.length > INITIAL_LIMIT);
	const visibleCourses = $derived(
		showAll ? filteredPriorityCourses : filteredPriorityCourses.slice(0, INITIAL_LIMIT)
	);
</script>

{#if priorityCourses.length > 0}
	<Section
		id="prioridad"
		title="Orden de prioridad sugerido"
		description="Todas las materias ordenadas por cantidad de otras que desbloquean. Las que están más arriba son requisito de más materias, así que conviene priorizarlas."
	>
		<div class="px-3">
			<div class="mb-3 flex flex-wrap gap-x-6 gap-y-3">
				<label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
					<input type="checkbox" bind:checked={showPassedCourses} class="h-4 w-4 rounded" />
					Mostrar materias aprobadas
				</label>
				<label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
					<input type="checkbox" bind:checked={showElectiveCourses} class="h-4 w-4 rounded" />
					Mostrar materias {electiveLabel}
				</label>
			</div>
			<table class="w-full text-left text-sm">
				<thead class="border-b border-gray-200 text-xs text-gray-500 uppercase">
					<tr>
						<th scope="col" class="py-2 pr-2">#</th>
						<th scope="col" class="py-2 pr-2">Materia</th>
						<th scope="col" class="py-2 text-right" title="Cantidad de materias que desbloquea">
							<UnlockIcon class="inline-block" />
						</th>
					</tr>
				</thead>
				<tbody>
					{#each visibleCourses as { course, dependentCount }, index (course.id)}
						<tr class="border-b border-gray-100 last:border-b-0">
							<td class="py-2 pr-2 align-top text-gray-400">{index + 1}</td>
							<td class="py-2 pr-2 align-top">
								<span class="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
									<CourseLink {course} {viewMode} {onNavigateToDiagram}>
										{#if showCodes && course.code}
											<span class="text-gray-400">{course.code}.</span>
										{/if}
										{course.name}
									</CourseLink>
									{#if course.year !== undefined}
										<span class="whitespace-nowrap">
											de <Ordinal number={course.year} noun="año" />
										</span>
									{/if}
									{#if isElectiveOrOptative(course.type)}
										<span
											class="inline-block rounded-md border border-gray-200 px-2 py-1 text-xs leading-none whitespace-nowrap text-gray-700"
										>
											{courseTypeLabels[course.type]}
										</span>
									{/if}
									<StatePill state={course.state} class="text-xs" />
								</span>
							</td>
							<td class="py-2 text-right align-top whitespace-nowrap text-gray-600"
								>{dependentCount}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if shouldShowExpandButton}
				<button
					onclick={() => (showAll = !showAll)}
					class="mt-2 flex w-full cursor-pointer items-center justify-center gap-1 py-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
					aria-expanded={showAll}
				>
					{showAll ? 'Mostrar menos' : 'Mostrar todas'}
					<ChevronDownIcon class={['h-4 w-4 transition-transform', showAll && 'rotate-180']} />
				</button>
			{/if}
		</div>
	</Section>
{/if}
