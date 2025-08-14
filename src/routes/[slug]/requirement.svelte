<script lang="ts">
	import { isCourseStateGreaterOrEqual } from '$lib/course-state';
	import { toKebabCase, type CourseRequirement } from '$lib/course.svelte';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		requirement: CourseRequirement;
	};

	let { requirement }: Props = $props();

	const isRequirementMet = $derived(
		isCourseStateGreaterOrEqual(requirement.requiredCourse.state, requirement.requiredState)
	);
</script>

<li class="flex items-baseline gap-1 leading-relaxed">
	{#if isRequirementMet}
		<CheckIcon class="h-5 w-5 flex-none translate-y-1.5 stroke-green-700" />
	{:else}
		<CloseIcon class="h-5 w-5 flex-none translate-y-1 stroke-red-700" />
	{/if}

	<span>
		<a
			href={`#${toKebabCase(requirement.requiredCourse.name)}`}
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			{requirement.requiredCourse.name}
		</a>
		(<span class="whitespace-nowrap">
			{requirement.requiredCourse.year}<sup
				>{getOrdinalSuperscript(requirement.requiredCourse.year)}</sup
			>
			año
		</span>) debe estar al menos
		<StatePill state={requirement.requiredState} />

		{#if !isRequirementMet}
			pero está
			<StatePill state={requirement.requiredCourse.state} />
		{/if}
	</span>
</li>
