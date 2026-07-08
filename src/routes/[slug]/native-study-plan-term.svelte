<script lang="ts">
	import type { StudyPlanViewItem, StudyPlanViewTerm } from '$lib/study-plan-view';
	import BulkStateSelect from './bulk-state-select.svelte';
	import type { CourseState } from '$lib/course-state';
	import NativeItemCard from './native-item-card.svelte';
	import NativeMilestoneCard from './native-milestone-card.svelte';

	type Props = {
		term: StudyPlanViewTerm;
		showCodes?: boolean;
		useCycleButton?: boolean;
		hideTypeBadge?: boolean;
	};

	let { term, showCodes = false, useCycleButton = false, hideTypeBadge = false }: Props = $props();
	let selectValue = $state<CourseState | ''>('');
	const courseItems = $derived(
		term.items.filter(
			(item): item is StudyPlanViewItem => item.item.def.kind === 'course'
		)
	);
	const allItemsEnabled = $derived(courseItems.every((item) => item.item.isEnabled));
	const canPass = $derived(courseItems.every((item) => item.item.canPass));

	function onchange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const newState = target.value as CourseState;
		if (newState) {
			courseItems.forEach((item) => {
				item.item.state = newState;
			});
		}
		selectValue = '';
	}
</script>

{#if term.items.length > 0}
	{#if term.title}
		<div class="flex items-center justify-between gap-3">
			<h3 class="p-3 text-sm text-gray-600">{term.title}</h3>
			{#if courseItems.length > 1 && allItemsEnabled}
				<BulkStateSelect
					id={`${term.items[0]?.item.def.id ?? 'term'}-${term.title}-state-select`}
					label={`Cambiar estado de todas las materias de ${term.title}`}
					{onchange}
					bind:value={selectValue}
					{canPass}
				/>
			{/if}
		</div>
	{/if}
	<ul class="grid gap-1">
		{#each term.items as item (item.item.def.id)}
			{#if item.item.def.kind === 'course'}
				<NativeItemCard
					item={item as StudyPlanViewItem}
					{showCodes}
					{useCycleButton}
					{hideTypeBadge}
				/>
			{:else}
				<NativeMilestoneCard {item} />
			{/if}
		{/each}
	</ul>
{/if}
