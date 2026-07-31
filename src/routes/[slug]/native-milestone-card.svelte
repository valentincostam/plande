<script lang="ts">
	import { milestoneStates } from '$lib/study-plan-data';
	import { slide } from 'svelte/transition';
	import type { StudyPlanViewMilestone } from '$lib/study-plan-view';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import MilestoneStatePill from './milestone-state-pill.svelte';
	import NativeRequirementNode from './native-requirement-node.svelte';

	type Props = {
		item: StudyPlanViewMilestone;
		domId?: string;
	};

	let { item, domId = item.anchorId }: Props = $props();
	let isExpanded = $state(false);

	const hasCompletionRequirements = $derived(item.requirementTreeForCompletion.length > 0);
	const canComplete = $derived(item.item.canComplete);

	const stateControlLabel = $derived(
		`Estado de ${item.item.def.name}: ${item.item.state === milestoneStates.completed ? 'Completado' : 'Pendiente'}`
	);

	function handleClick() {
		isExpanded = !isExpanded;
	}

	function toggleState() {
		if (item.item.state !== milestoneStates.completed && !canComplete) return;
		item.item.state =
			item.item.state === milestoneStates.completed
				? milestoneStates.pending
				: milestoneStates.completed;
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
		<button
			type="button"
			onclick={toggleState}
			aria-label={stateControlLabel}
			disabled={!canComplete && item.item.state !== milestoneStates.completed}
			class="cursor-pointer rounded-md focus:outline-2 focus:outline-blue-500"
		>
			<MilestoneStatePill
				state={item.item.state as (typeof milestoneStates)[keyof typeof milestoneStates]}
				class="text-xs"
			/>
		</button>
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
						<ul class="grid gap-2">
							{#each item.requirementTreeForCompletion as node (node.id)}
								<NativeRequirementNode {node} />
							{/each}
						</ul>
					</li>
				{:else}
					<li><strong>Requisitos para completarlo:</strong> Ninguno</li>
				{/if}
			</ul>
		</div>
	{/if}
</li>
