<script lang="ts">
	import { isTransversal } from '$lib/course-attribute';
	import { courseStates } from '$lib/course-state';
	import { isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import { milestoneStates } from '$lib/study-plan-data';
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
	const requirementIsMilestone = $derived(requirement.item.item.def.kind === 'milestone');
	const courseIsTransversal = $derived(
		requirement.item.item.def.kind === 'course' &&
			isTransversal(requirement.item.item.def.attributes ?? [])
	);
	const courseIsElectiveOrOptative = $derived(
		requirement.item.item.def.kind === 'course' &&
			isElectiveOrOptative(requirement.item.item.def.type)
	);
	const courseLabel = $derived(
		courseIsElectiveOrOptative && requirement.item.item.def.kind === 'course'
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
		{#if requirementIsMilestone}{:else if requirement.item.year !== undefined && !courseIsTransversal}
			de
			<span class="whitespace-nowrap">
				<Ordinal number={requirement.item.year} noun="año" />
			</span>
		{:else if courseIsTransversal}
			({courseLabel})
		{/if}
		{#if requirementIsMilestone}
			debe estar completado
		{:else}
			debe estar {#if requirement.requiredState !== courseStates.passed}al menos
			{/if}
			<StatePill
				state={requirement.requiredState === 'completed'
					? courseStates.passed
					: requirement.requiredState}
			/>
		{/if}

		{#if !isRequirementMet}
			pero está
			{#if requirementIsMilestone}
				<span
					class="inline-block rounded-md bg-gray-600 px-2 py-1 leading-none whitespace-nowrap text-white dark:text-gray-100"
				>
					{requirement.item.item.state === milestoneStates.completed ? 'Completado' : 'Pendiente'}
				</span>
			{:else}
				<StatePill
					state={requirement.item.item.state as (typeof courseStates)[keyof typeof courseStates]}
				/>
			{/if}
		{/if}
	</span>
</li>
