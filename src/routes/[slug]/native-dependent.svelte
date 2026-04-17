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
	import type { ViewDependent } from '$lib/study-plan-view';
	import { isCourseStateGreaterOrEqual } from '$lib/course-state';

	type Props = {
		dependent: ViewDependent;
		currentState: (typeof courseStates)[keyof typeof courseStates];
		showCodes?: boolean;
	};

	let { dependent, currentState, showCodes = false }: Props = $props();

	const isRequirementMet = $derived(
		isCourseStateGreaterOrEqual(
			currentState,
			dependent.requiredState === 'completed' ? courseStates.passed : dependent.requiredState
		)
	);
	const courseIsTransversal = $derived(isTransversal(dependent.item.item.def.attributes ?? []));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(dependent.item.item.def.type));
	const courseLabel = $derived(
		courseIsElectiveOrOptative
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
		necesita esta materia {#if dependent.requiredState !== courseStates.passed}al menos
		{/if}
		<StatePill
			state={dependent.requiredState === 'completed'
				? courseStates.passed
				: dependent.requiredState}
		/>
		para {dependent.kind === 'enroll' ? 'cursar' : 'rendir'}
	</span>
</li>
