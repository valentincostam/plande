<script lang="ts">
	import { courseStates } from '$lib/course-state';
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
		[requirement.requiredState, courseStates.passed].includes(requirement.requiredCourse.state)
	);
</script>

<li class="flex gap-1">
	{#if isRequirementMet}
		<CheckIcon class="h-5 w-5 flex-none stroke-green-700" />
	{:else}
		<CloseIcon class="h-5 w-5 flex-none stroke-red-700" />
	{/if}

	<span class={[isRequirementMet && 'opacity-70']}>
		<a
			href={`#${toKebabCase(requirement.requiredCourse.name)}`}
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			{requirement.requiredCourse.name}
		</a>
		({requirement.requiredCourse.year}<sup
			>{getOrdinalSuperscript(requirement.requiredCourse.year)}</sup
		>
		año) debe estar al menos
		<StatePill state={requirement.requiredState} />

		{#if !isRequirementMet}
			pero está
			<StatePill state={requirement.requiredCourse.state} />
		{/if}
	</span>
</li>
