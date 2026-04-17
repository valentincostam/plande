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
	import { isViewRequirementMet, type ViewAtomicRequirement } from '$lib/study-plan-view';

	type Props = {
		requirement: ViewAtomicRequirement;
		showCodes?: boolean;
	};

	let { requirement, showCodes = false }: Props = $props();

	const isRequirementMet = $derived(isViewRequirementMet(requirement));
	const courseIsTransversal = $derived(isTransversal(requirement.item.item.def.attributes ?? []));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(requirement.item.item.def.type));
	const courseLabel = $derived(
		courseIsElectiveOrOptative
			? courseTypeLabels[requirement.item.item.def.type].toLowerCase()
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
		<Link href={`#${requirement.item.anchorId}`} onclick={handleSmoothScroll} class="font-noto">
			{#if showCodes && requirement.item.item.def.code}
				<span class="opacity-60">{requirement.item.item.def.code}. </span>
			{/if}
			{requirement.item.item.def.name}
		</Link>
		{#if requirement.item.year !== undefined && !courseIsTransversal}
			de
			<span class="whitespace-nowrap">
				<Ordinal number={requirement.item.year} noun="año" />
			</span>
		{:else if courseIsTransversal}
			({courseLabel})
		{/if}
		debe estar {#if requirement.requiredState !== courseStates.passed}al menos
		{/if}
		<StatePill
			state={requirement.requiredState === 'completed'
				? courseStates.passed
				: requirement.requiredState}
		/>

		{#if !isRequirementMet}
			pero está
			<StatePill state={requirement.item.item.state} />
		{/if}
	</span>
</li>
