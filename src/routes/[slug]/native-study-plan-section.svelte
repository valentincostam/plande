<script lang="ts">
	import type { StudyPlanViewSection } from '$lib/study-plan-view';
	import AnchoredHeading from './anchored-heading.svelte';
	import BulkStateSelect from './bulk-state-select.svelte';
	import Section from './section.svelte';
	import { courseStates, type CourseState } from '$lib/course-state';
	import StatePill from './state-pill.svelte';
	import Ordinal from '$lib/ordinal.svelte';
	import NativeStudyPlanTerm from './native-study-plan-term.svelte';
	import { getOrdinalPrefix } from '$lib/ordinal';
	import { isElectiveOrOptative } from '$lib/course-type';

	type Props = {
		section: StudyPlanViewSection;
		showCodes?: boolean;
		useCycleButton?: boolean;
		showBulkSelect?: boolean;
	};

	let {
		section,
		showCodes = false,
		useCycleButton = false,
		showBulkSelect = false
	}: Props = $props();
	let selectValue = $state<CourseState | ''>('');

	const yearOrdinalPrefix = $derived(section.year ? getOrdinalPrefix(section.year) : undefined);
	const yearId = $derived(section.year ? `${yearOrdinalPrefix}-año` : section.id);
	const headingId = $derived(`${yearId}-heading`);
	const sectionItemTypes = $derived(
		section.terms.flatMap((term) => term.items).map((item) => item.item.def.type)
	);
	const hideRedundantTypeBadge = $derived(
		sectionItemTypes.length > 0 &&
			sectionItemTypes.every((type) => type !== undefined && isElectiveOrOptative(type)) &&
			new Set(sectionItemTypes).size === 1
	);

	function onchange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const newState = target.value as CourseState;
		if (newState) {
			section.terms
				.flatMap((term) => term.items)
				.forEach((item) => {
					if (item.item.def.kind === 'course') {
						item.item.setState(newState);
					}
				});
		}
		selectValue = '';
	}
</script>

{#if section.year !== undefined}
	<section aria-labelledby={headingId} id={yearId}>
		<header class="flex items-center justify-between">
			<div class="flex items-center gap-3 p-3">
				<AnchoredHeading
					id={yearId}
					{headingId}
					ariaLabel={`Copiar enlace a ${yearOrdinalPrefix} año`}
					class="text-lg font-bold"
				>
					<Ordinal number={section.year} noun="Año" />
				</AnchoredHeading>
				{#if section.section.state === courseStates.passed}
					<StatePill state={courseStates.passed} gender="masculine" class="text-xs" />
				{/if}
			</div>
			{#if showBulkSelect}
				<BulkStateSelect
					id={`${section.id}-state-select`}
					label={`Cambiar estado de todas las materias de ${section.year}° año`}
					{onchange}
					bind:value={selectValue}
					canPass={true}
				/>
			{/if}
		</header>
		{#each section.terms as term (`${section.id}-${term.term ?? 'no-term'}`)}
			<NativeStudyPlanTerm {term} sectionId={section.id} {showCodes} {useCycleButton} />
		{/each}
	</section>
{:else}
	<Section id={section.id} title={section.title}>
		{#each section.terms as term (`${section.id}-${term.term ?? 'no-term'}`)}
			<NativeStudyPlanTerm
				{term}
				sectionId={section.id}
				{showCodes}
				{useCycleButton}
				hideTypeBadge={hideRedundantTypeBadge}
			/>
		{/each}
	</Section>
{/if}
