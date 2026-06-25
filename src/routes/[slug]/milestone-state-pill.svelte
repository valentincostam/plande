<script lang="ts">
	import { milestoneStates, type MilestoneState } from '$lib/study-plan-data';
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
		[milestoneStates.pending]: 'bg-gray-600 text-white dark:text-gray-100',
		[milestoneStates.completed]: 'bg-green-600 text-white dark:text-gray-100'
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
