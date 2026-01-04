<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { countAllDependents } from '$lib/course.svelte';
	import { courseTerms, type CourseTerm } from '$lib/course-term';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import UnlockIcon from './unlock-icon.svelte';
	import CourseLink from './course-link.svelte';
	import Section from './section.svelte';

	type Props = {
		courses: Course[];
		showCodes?: boolean;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: number) => void;
	};

	let { courses, showCodes = false, viewMode = 'list', onNavigateToDiagram }: Props = $props();

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
		const coursesWithDependents: PriorityCourse[] = courses
			.map((course) => ({
				course,
				dependentCount: countAllDependents(course)
			}))
			.filter((item) => item.dependentCount > 1);

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

	const formatPeriod = (course: Course): string => {
		const year = course.year;
		if (year === undefined) return '';

		const yearSup = getOrdinalSuperscript(year);
		const yearText = `${year}<sup>${yearSup}</sup> año`;

		switch (course.term) {
			case courseTerms.annual:
				return `${yearText}, anual`;
			case courseTerms.firstSemester:
				return `${yearText}, 1<sup>er</sup> cuat.`;
			case courseTerms.secondSemester:
				return `${yearText}, 2<sup>do</sup> cuat.`;
			case courseTerms.semestral:
			case courseTerms.crossYear:
			case courseTerms.unknown:
			default:
				return yearText;
		}
	};
</script>

{#if priorityCourses.length > 0}
	<Section
		id="prioridad"
		title="Orden de prioridad sugerido"
		description="Estas materias son requisito de muchas otras. Si las aprobás primero, vas a tener más opciones de materias para cursar después. No se incluyen materias que no desbloquean otras."
	>
		<div class="px-3">
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
					{#each priorityCourses as { course, dependentCount }, index}
						<tr class="border-b border-gray-100">
							<td class="py-2 pr-2 text-gray-400">{index + 1}</td>
							<td class="py-2 pr-2">
								<CourseLink {course} {viewMode} {onNavigateToDiagram}>
									{#if showCodes && course.code}
										<span class="text-gray-400">{course.code}.</span>
									{/if}
									{course.name}
								</CourseLink>
							</td>
							<td class="whitespace-nowrap py-2 pr-4 text-gray-600">
								{@html formatPeriod(course)}
							</td>
							<td class="whitespace-nowrap py-2 text-right text-gray-600">{dependentCount}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Section>
{/if}
