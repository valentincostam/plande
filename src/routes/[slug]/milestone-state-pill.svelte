<script lang="ts">
	import { milestoneStates, type MilestoneState } from '$lib/study-plan-data';
	import { courseBgColors, courseStates } from '$lib/course-state';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		state: MilestoneState;
		class?: ClassValue;
	};

	let { state, class: className }: Props = $props();

	const labelByState = {
		[milestoneStates.pending]: 'Pendiente',
		[milestoneStates.completed]: 'Completado'
	} as const;

	const classByState = {
		[milestoneStates.pending]: courseBgColors[courseStates.notTaken],
		[milestoneStates.completed]: courseBgColors[courseStates.passed]
	} as const;
</script>

<span
	class={[
		classByState[state],
		'inline-block rounded-md px-2 py-1 leading-none whitespace-nowrap',
		className
	]}
>
	{labelByState[state]}
</span>
