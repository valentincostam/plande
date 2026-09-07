<script lang="ts">
	import { milestoneStates, type MilestoneState } from '$lib/study-plan-data';

	type Props = {
		id: string;
		value: MilestoneState;
		canComplete: boolean;
		milestoneName: string;
		onstatechange?: (state: MilestoneState) => void;
	};

	let { id, value, canComplete, milestoneName, onstatechange }: Props = $props();

	const labels = {
		[milestoneStates.pending]: 'Pendiente',
		[milestoneStates.completed]: 'Completado'
	} as const;

	const backgroundColors = {
		[milestoneStates.pending]: 'bg-gray-600',
		[milestoneStates.completed]: 'bg-green-600'
	} as const;

	const isEnabled = $derived(canComplete || value === milestoneStates.completed);
	const currentLabel = $derived(labels[value]);
	const stateControlLabel = $derived(`Estado de ${milestoneName}: ${currentLabel}`);
</script>

<select
	{id}
	{value}
	onchange={(event) => onstatechange?.((event.target as HTMLSelectElement).value as MilestoneState)}
	aria-label={stateControlLabel}
	disabled={!isEnabled}
	class={[
		backgroundColors[value],
		!isEnabled && 'opacity-50',
		'w-22 shrink-0 rounded-md border-none px-2 py-1 text-xs text-white transition-colors duration-200 ease-out select-none dark:text-gray-100',
		'cursor-pointer touch-manipulation focus:ring-0 focus:outline-2 focus:outline-offset-1 focus:outline-blue-500'
	]}
	title={currentLabel}
>
	<option value={milestoneStates.pending}>{labels[milestoneStates.pending]}</option>
	<option value={milestoneStates.completed} disabled={!canComplete}>
		{labels[milestoneStates.completed]}
	</option>
</select>

<style>
	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: none;
		text-align-last: center;
	}

	select::-ms-expand {
		display: none;
	}
</style>
