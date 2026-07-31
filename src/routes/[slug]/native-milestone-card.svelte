<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { StudyPlanViewMilestone } from '$lib/study-plan-view';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import MilestoneStateSelect from './milestone-state-select.svelte';
	import NativeDependent from './native-dependent.svelte';
	import NativeRequirementNode from './native-requirement-node.svelte';

	type Props = {
		item: StudyPlanViewMilestone;
		domId?: string;
	};

	let { item, domId = item.anchorId }: Props = $props();
	let isExpanded = $state(false);

	const hasCompletionRequirements = $derived(item.requirementTreeForCompletion.length > 0);
	const canComplete = $derived(item.item.canComplete);
	const directDependentCount = $derived(
		new Set(item.dependents.map((dependent) => dependent.item.item.def.id)).size
	);
	const indirectDependentsCount = $derived(item.totalDependentCount - directDependentCount);

	function handleClick() {
		isExpanded = !isExpanded;
	}
</script>

<li
	id={domId}
	class="overflow-hidden bg-gray-200 transition-colors focus-within:outline-2 focus-within:outline-blue-500 md:first:rounded-t-md md:last:rounded-b-md dark:bg-gray-200"
>
	<div class="flex items-center pr-3">
		<button
			type="button"
			onclick={handleClick}
			aria-expanded={isExpanded}
			aria-controls={`${domId}-details`}
			aria-label={item.item.def.name}
			class="flex grow cursor-pointer items-center gap-3 p-3 focus:outline-none"
		>
			<ChevronDownIcon
				class={[isExpanded && 'rotate-180', 'h-5 w-5 flex-none text-gray-700 transition-transform']}
			/>
			<span class="font-noto grow text-left tracking-tight select-none">{item.item.def.name}</span>
		</button>
		<MilestoneStateSelect
			id={`${domId}-state`}
			bind:value={item.item.state}
			{canComplete}
			milestoneName={item.item.def.name}
		/>
	</div>

	{#if isExpanded}
		<div
			id={`${domId}-details`}
			role="region"
			aria-label={`Detalles de ${item.item.def.name}`}
			class="px-3 pb-3"
			transition:slide={{ duration: 200 }}
		>
			<ul class="grid gap-4 rounded-md bg-white p-3 text-sm dark:bg-gray-50">
				{#if hasCompletionRequirements}
					<li class="grid gap-2">
						<strong>Requisitos para completarlo</strong>
						<ul class="grid gap-2" aria-label="Requisitos para completarlo">
							{#each item.requirementTreeForCompletion as node (node.id)}
								<NativeRequirementNode {node} />
							{/each}
						</ul>
					</li>
				{:else}
					<li><strong>Requisitos para completarlo:</strong> Ninguno</li>
				{/if}
				{#if item.dependents.length > 0}
					<li class="grid gap-2">
						<strong>Materias que desbloquea</strong>
						<ul class="grid gap-2" aria-label="Materias que desbloquea">
							{#each item.dependents as dependent (dependent.id)}
								<NativeDependent
									{dependent}
									ownerItem={item.item.def}
									currentState={item.item.state}
								/>
							{/each}
						</ul>
					</li>
				{:else}
					<li><strong>Materias que desbloquea:</strong> Ninguna</li>
				{/if}
				{#if item.dependents.length > 0}
					<li>
						<strong>Cantidad total de materias que desbloquea:</strong>
						{item.totalDependentCount}
						{#if indirectDependentsCount > 0}
							<span class="text-gray-500">
								({directDependentCount} directamente, {indirectDependentsCount} indirectamente)
							</span>
						{/if}
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</li>
