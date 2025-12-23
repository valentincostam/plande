<script lang="ts">
	import { isTransversal } from '$lib/course-attribute';
	import { toKebabCase, type CourseDependent } from '$lib/course.svelte';
	import { isElectiveOrOptative, courseTypeLabels } from '$lib/course-type';
	import { requiredForLabels } from '$lib/raw-course';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		dependent: CourseDependent;
		isRequirementMet: boolean;
		showCodes?: boolean;
	};

	let { dependent, isRequirementMet, showCodes = false }: Props = $props();

	const courseIsTransversal = $derived(isTransversal(dependent.dependentCourse.attributes));
	const courseIsElectiveOrOptative = $derived(isElectiveOrOptative(dependent.dependentCourse.type));

	const courseLabel = $derived(
		courseIsElectiveOrOptative
			? courseTypeLabels[dependent.dependentCourse.type].toLowerCase()
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
			href={`#${toKebabCase(dependent.dependentCourse.name)}`}
			onclick={handleSmoothScroll}
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			{#if showCodes && dependent.dependentCourse.code}
				<span class="opacity-60">{dependent.dependentCourse.code}.</span>
			{/if}
			{dependent.dependentCourse.name}
		</a>
		{#if dependent.dependentCourse.year !== undefined && !courseIsTransversal}
			de
			<span class="whitespace-nowrap">
				{dependent.dependentCourse.year}<sup
					>{getOrdinalSuperscript(dependent.dependentCourse.year)}</sup
				>
				año
			</span>
		{:else if courseIsTransversal}
			({courseLabel})
		{/if}
		necesita esta materia al menos <StatePill state={dependent.requiredState} /> para
		{requiredForLabels[dependent.requiredFor]}
	</span>
</li>
