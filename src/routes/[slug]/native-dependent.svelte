<script lang="ts">
	import { isTransversal } from '$lib/course-attribute';
	import { courseStates } from '$lib/course-state';
	import { isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import Ordinal from '$lib/ordinal.svelte';
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import Link from '$lib/link.svelte';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import StatePill from './state-pill.svelte';
	import MilestoneStatePill from './milestone-state-pill.svelte';
	import type { ViewDependent } from '$lib/study-plan-view';
	import type { ItemState, PlanItem } from '$lib/study-plan-data';
	import { meetsRequirementState } from '$lib/requirement-evaluator';

	type Props = {
		dependent: ViewDependent;
		ownerItem: PlanItem;
		currentState: ItemState;
		showCodes?: boolean;
	};

	let { dependent, ownerItem, currentState, showCodes = false }: Props = $props();

	const isRequirementMet = $derived(
		meetsRequirementState(ownerItem, currentState, dependent.requiredState)
	);
	const courseIsTransversal = $derived(
		dependent.item.item.def.kind === 'course' &&
			isTransversal(dependent.item.item.def.attributes ?? [])
	);
	const courseIsElectiveOrOptative = $derived(
		dependent.item.item.def.kind === 'course' && isElectiveOrOptative(dependent.item.item.def.type)
	);
	const courseLabel = $derived(
		courseIsElectiveOrOptative && dependent.item.item.def.kind === 'course'
			? courseTypeLabels[dependent.item.item.def.type].toLowerCase()
			: 'transversal'
	);
</script>

<li class="flex items-baseline gap-1 leading-relaxed">
	{#if isRequirementMet}
		<CheckIcon class="h-5 w-5 flex-none translate-y-1.5 stroke-green-700" />
	{:else}
		<CloseIcon class="h-5 w-5 flex-none translate-y-1 stroke-red-700" />
	{/if}

	<span class="font-noto">
		<Link href={`#${dependent.item.anchorId}`} onclick={handleSmoothScroll} class="font-noto">
			{#if showCodes && dependent.item.item.def.code}
				<span class="opacity-60">{dependent.item.item.def.code}. </span>
			{/if}
			{dependent.item.item.def.name}
		</Link>
		{#if dependent.item.year !== undefined && !courseIsTransversal}
			de
			<span class="whitespace-nowrap">
				<Ordinal number={dependent.item.year} noun="año" />
			</span>
		{:else if courseIsTransversal}
			({courseLabel})
		{/if}
		necesita {ownerItem.kind === 'milestone' ? 'este hito' : 'esta materia'}
		{#if ownerItem.kind !== 'milestone' && dependent.requiredState !== courseStates.passed}al menos
		{/if}
		{#if ownerItem.kind === 'milestone'}
			<MilestoneStatePill state="completed" />
		{:else}
			<StatePill
				state={dependent.requiredState === 'completed'
					? courseStates.passed
					: dependent.requiredState}
			/>
		{/if}
		para {dependent.kind === 'enroll' ? 'cursar' : 'rendir'}
	</span>
</li>
