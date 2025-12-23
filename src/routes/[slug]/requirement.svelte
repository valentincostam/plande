<script lang="ts">
	import { isTransversal } from '$lib/course-attribute';
	import { isCourseStateGreaterOrEqual } from '$lib/course-state';
	import { toKebabCase, type CourseRequirement } from '$lib/course.svelte';
	import { isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		requirement: CourseRequirement;
		showCodes?: boolean;
	};

	let { requirement, showCodes = false }: Props = $props();

	const isRequirementMet = $derived(
		isCourseStateGreaterOrEqual(requirement.requiredCourse.state, requirement.requiredState)
	);

	const courseIsTransversal = $derived(isTransversal(requirement.requiredCourse.attributes));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(requirement.requiredCourse.type));

	// Show type label if elective/optative, otherwise show "transversal"
	const courseLabel = $derived(
		courseIsElectiveOrOptative
			? courseTypeLabels[requirement.requiredCourse.type].toLowerCase()
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
		<a
			href={`#${toKebabCase(requirement.requiredCourse.name)}`}
			onclick={handleSmoothScroll}
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			{#if showCodes && requirement.requiredCourse.code}
				<span class="opacity-60">{requirement.requiredCourse.code}.</span>
			{/if}
			{requirement.requiredCourse.name}
		</a>
		{#if requirement.requiredCourse.year !== undefined && !courseIsTransversal}
			de
			<span class="whitespace-nowrap">
				{requirement.requiredCourse.year}<sup
					>{getOrdinalSuperscript(requirement.requiredCourse.year)}</sup
				>
				año
			</span>
		{:else if courseIsTransversal}
			({courseLabel})
		{/if}
		debe estar al menos
		<StatePill state={requirement.requiredState} />

		{#if !isRequirementMet}
			pero está
			<StatePill state={requirement.requiredCourse.state} />
		{/if}
	</span>
</li>
