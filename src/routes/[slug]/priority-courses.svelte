<script lang="ts">
	import type { StudyPlanViewItem } from '$lib/study-plan-view';
	import { courseStates } from '$lib/course-state';
	import { courseTerms, type CourseTerm } from '$lib/course-term';
	import { courseTypes, isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import UnlockIcon from './unlock-icon.svelte';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import Ordinal from '$lib/ordinal.svelte';
	import NativeCourseLink from './native-course-link.svelte';
	import Section from './section.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		items: StudyPlanViewItem[];
		showCodes?: boolean;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: string) => void;
	};

	let { items, showCodes = false, viewMode = 'list', onNavigateToDiagram }: Props = $props();

	const INITIAL_LIMIT = 10;

	let showPassedCourses = $state(true);
	let showElectiveCourses = $state(true);
	let showAll = $state(false);

	const electiveLabel = $derived.by(() => {
		const hasElective = items.some((item) => item.item.def.type === courseTypes.elective);
		const hasOptative = items.some((item) => item.item.def.type === courseTypes.optative);
		if (hasElective && hasOptative) return 'electivas/optativas';
		if (hasOptative) return 'optativas';
		return 'electivas';
	});

	type PriorityCourse = {
		item: StudyPlanViewItem;
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
		const coursesWithDependents: PriorityCourse[] = items.map((item) => ({
			item,
			dependentCount: item.totalDependentCount
		}));

		return coursesWithDependents.sort((a, b) => {
			// 1. Dependientes (descendente)
			if (b.dependentCount !== a.dependentCount) {
				return b.dependentCount - a.dependentCount;
			}

			// 2. Año (ascendente)
			const yearA = a.item.year ?? Infinity;
			const yearB = b.item.year ?? Infinity;
			if (yearA !== yearB) {
				return yearA - yearB;
			}

			// 3. Cuatrimestre (ascendente según orden definido)
			const termOrderA = getTermSortOrder(a.item.term ?? courseTerms.unknown);
			const termOrderB = getTermSortOrder(b.item.term ?? courseTerms.unknown);
			if (termOrderA !== termOrderB) {
				return termOrderA - termOrderB;
			}

			// 4. Alfabético
			return a.item.item.def.name.localeCompare(b.item.item.def.name, 'es');
		});
	});

	const filteredPriorityCourses = $derived(
		priorityCourses.filter(({ item }) => {
			if (!showPassedCourses && item.item.state === courseStates.passed) return false;
			if (!showElectiveCourses && isElectiveOrOptative(item.item.def.type)) return false;
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
				<label class="flex cursor-pointer items-center gap-2 text-gray-600">
					<input
						type="checkbox"
						bind:checked={showPassedCourses}
						class="h-5 w-5 rounded-sm ring-offset-gray-100 focus:ring-blue-500 dark:border-0 dark:bg-blue-300 dark:not-checked:bg-gray-300"
					/>
					Mostrar materias aprobadas
				</label>
				<label class="flex cursor-pointer items-center gap-2 text-gray-600">
					<input
						type="checkbox"
						bind:checked={showElectiveCourses}
						class="h-5 w-5 rounded-sm ring-offset-gray-100 focus:ring-blue-500 dark:border-0 dark:bg-blue-300 dark:not-checked:bg-gray-300"
					/>
					Mostrar materias {electiveLabel}
				</label>
			</div>
			<table class="w-full">
				<thead class="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
					<tr>
						<th scope="col" class="py-2 pr-2">#</th>
						<th scope="col" class="py-2 pr-2">Materia</th>
						<th scope="col" class="py-2 text-right" title="Cantidad de materias que desbloquea">
							<UnlockIcon class="inline-block" />
						</th>
					</tr>
				</thead>
				<tbody class="text-sm">
					{#each visibleCourses as { item, dependentCount }, index (item.item.def.id)}
						<tr class="border-b border-gray-100 last:border-b-0">
							<td class="py-2 pr-2 align-top text-gray-400">{index + 1}</td>
							<td class="py-2 pr-2 align-top">
								<span class="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
									<NativeCourseLink {item} {viewMode} {onNavigateToDiagram}>
										{#if showCodes && item.item.def.code}
											<span class="text-gray-400">{item.item.def.code}.</span>
										{/if}
										{item.item.def.name}
									</NativeCourseLink>
									{#if item.year !== undefined}
										<span class="whitespace-nowrap text-gray-500">
											de <Ordinal number={item.year} noun="año" />
										</span>
									{/if}
									{#if isElectiveOrOptative(item.item.def.type)}
										<span
											class="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs leading-none whitespace-nowrap text-gray-700"
										>
											{courseTypeLabels[item.item.def.type]}
										</span>
									{/if}
									<StatePill state={item.item.state} class="text-xs" />
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
