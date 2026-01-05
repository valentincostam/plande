<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { countAllDependents } from '$lib/course.svelte';
	import { courseStates } from '$lib/course-state';
	import { courseTerms, type CourseTerm } from '$lib/course-term';
	import { courseTypes, isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import UnlockIcon from './unlock-icon.svelte';
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

	let showPassedCourses = $state(true);
	let showElectiveCourses = $state(true);

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
			case courseTerms.annual:
				return 0;
			case courseTerms.firstSemester:
				return 1;
			case courseTerms.secondSemester:
				return 2;
			case courseTerms.semestral:
				return 3;
			case courseTerms.crossYear:
				return 4;
			case courseTerms.unknown:
			default:
				return 5;
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

	</script>

{#if priorityCourses.length > 0}
	<Section
		id="prioridad"
		title="Orden de prioridad sugerido"
		description="Estas materias son requisito de muchas otras. Si las aprobás primero, vas a tener más opciones de materias para cursar después. Si estás indeciso entre dos materias, priorizá la que aparezca más arriba en esta lista."
	>
		<div class="px-3">
			<div class="mb-3 flex flex-wrap gap-x-4 gap-y-2">
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
				<thead class="border-b border-gray-200 text-xs uppercase text-gray-500">
					<tr>
						<th scope="col" class="py-2 pr-2">#</th>
						<th scope="col" class="py-2 pr-2">Materia</th>
						<th scope="col" class="whitespace-nowrap py-2 pr-4">Período</th>
						<th scope="col" class="py-2 text-right" title="Cantidad de materias que desbloquea">
							<UnlockIcon class="inline-block" />
						</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredPriorityCourses as { course, dependentCount }, index}
						<tr class="border-b border-gray-100">
							<td class="py-2 pr-2 align-top text-gray-400">{index + 1}</td>
							<td class="py-2 pr-2 align-top">
								<span class="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
									<CourseLink {course} {viewMode} {onNavigateToDiagram}>
										{#if showCodes && course.code}
											<span class="text-gray-400">{course.code}.</span>
										{/if}
										{course.name}
									</CourseLink>
									{#if isElectiveOrOptative(course.type)}
										<span class="inline-block rounded-md px-2 py-1 text-xs leading-none whitespace-nowrap text-gray-700 border border-gray-200">
											{courseTypeLabels[course.type]}
										</span>
									{/if}
									<StatePill state={course.state} class="text-xs" />
								</span>
							</td>
							<td class="whitespace-nowrap py-2 pr-4 align-top text-gray-600">
								{#if course.year !== undefined}
									<Ordinal number={course.year} noun="año" />{#if course.term === courseTerms.annual}, anual{:else if course.term === courseTerms.firstSemester}, <Ordinal number={1} noun="cuat." />{:else if course.term === courseTerms.secondSemester}, <Ordinal number={2} noun="cuat." />{/if}
								{/if}
							</td>
							<td class="whitespace-nowrap py-2 align-top text-right text-gray-600">{dependentCount}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Section>
{/if}
