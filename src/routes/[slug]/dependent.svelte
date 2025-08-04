<script lang="ts">
	import { toKebabCase, type CourseDependent } from '$lib/course.svelte';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		dependent: CourseDependent;
		isRequirementMet: boolean;
	};

	let { dependent, isRequirementMet }: Props = $props();
</script>

<li class="flex gap-1">
	{#if isRequirementMet}
		<CheckIcon class="h-5 w-5 flex-none stroke-green-700" />
	{:else}
		<CloseIcon class="h-5 w-5 flex-none stroke-red-700" />
	{/if}

	<span>
		<a
			href={`#${toKebabCase(dependent.dependentCourse.name)}`}
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			{dependent.dependentCourse.name}
		</a>
		(<span class="whitespace-nowrap">
			{dependent.dependentCourse.year}<sup
				>{getOrdinalSuperscript(dependent.dependentCourse.year)}</sup
			>
			año
		</span>) necesita esta materia al menos <StatePill state={dependent.requiredState} />
	</span>
</li>
