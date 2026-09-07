<script lang="ts">
	import { Position, type NodeProps, type Node, Handle } from '@xyflow/svelte';
	import { courseAttributeLabels, isTransversal } from '$lib/course-attribute';
	import { courseBgColors, courseNameColors, courseStates } from '$lib/course-state';
	import { courseTypeLabels, isElectiveOrOptative } from '$lib/course-type';
	import type { CourseNodeData } from './diagram-utils';
	import StateSelect from '../state-select.svelte';

	type DiagramCourseNodeData = CourseNodeData & {
		useCycleButton: boolean;
		isSelected?: boolean;
		isHighlighted?: boolean;
	};

	let { data }: NodeProps<Node<DiagramCourseNodeData>> = $props();

	// Year ordinal suffix
	const yearSuffix = ['', '°', '°', '°', '°', '°', '°'];

	// Handle colors based on state
	const handleColors = {
		[courseStates.notTaken]: 'bg-gray-300!',
		[courseStates.inProgress]: 'bg-blue-500!',
		[courseStates.taken]: 'bg-amber-500!',
		[courseStates.passed]: 'bg-green-500!'
	};

	// Left handle: gray if blocked, green if canPass, amber if can enroll
	const leftHandleColor = $derived(
		!data.item.item.isEnabled
			? 'bg-gray-300!'
			: data.item.item.canPass
				? 'bg-green-500!'
				: 'bg-amber-500!'
	);
</script>

<div
	role="group"
	aria-label={data.isSelected
		? `${data.item.item.def.name}, seleccionada en el diagrama`
		: data.item.item.def.name}
	class={[
		'nodrag nopan pointer-events-auto relative z-10 flex max-w-70 min-w-60 items-center gap-2 rounded-md p-3 text-sm transition-all',
		courseBgColors[data.item.item.state],
		data.isSelected && 'ring-2 ring-blue-500 ring-offset-1 ring-offset-gray-50',
		data.isHighlighted && 'is-highlighted'
	]}
>
	<!-- Año -->
	<span
		class={[
			'flex-none rounded bg-white/60 px-1.5 py-1 text-[10px] font-medium dark:bg-gray-100/20',
			courseNameColors[data.item.item.state]
		]}
	>
		{#if data.item.year === undefined || isTransversal(data.item.item.def.attributes ?? [])}
			—
		{:else}
			{data.item.year}{yearSuffix[data.item.year] || '°'}
		{/if}
	</span>

	<!-- Nombre + Tag (wrap juntos) -->
	<span class="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1">
		<span
			class={[
				'font-noto leading-tight tracking-tight',
				data.item.item.isEnabled ? courseNameColors[data.item.item.state] : 'text-gray-500'
			]}
		>
			{data.item.item.def.name}
		</span>
		{#if isElectiveOrOptative(data.item.item.def.type)}
			<span
				class="rounded bg-white/80 px-1.5 py-0.5 text-[10px] leading-none text-gray-600 dark:bg-gray-100/20"
			>
				{courseTypeLabels[data.item.item.def.type]}
			</span>
		{/if}
		{#each (data.item.item.def.attributes ?? []).filter((attr) => attr !== 'transversal') as attr (attr)}
			<span
				class="rounded bg-white/80 px-1.5 py-0.5 text-[10px] leading-none text-gray-600 dark:bg-gray-100/20"
			>
				{courseAttributeLabels[attr]}
			</span>
		{/each}
	</span>

	<!-- Estado -->
	{#if data.item.item.isEnabled}
		<div class="nodrag nopan pointer-events-auto relative z-2">
			<StateSelect
				id={`diagram-${data.item.item.def.id}-state`}
				value={data.item.item.state}
				canPass={data.item.item.canPass}
				courseName={data.item.item.def.name}
				useCycleButton={data.useCycleButton}
				onstatechange={(state) => data.item.item.setState(state)}
			/>
		</div>
	{:else}
		<span
			class="w-22 flex-none rounded-md bg-gray-400 px-2 py-1 text-center text-xs text-white dark:bg-gray-500 dark:text-gray-100"
		>
			Bloqueada
		</span>
	{/if}

	<!-- Handles -->
	{#if data.item.requirementsForEnrollment.length > 0 || data.item.requirementsForCompletion.length > 0}
		<Handle
			type="target"
			position={Position.Left}
			class={['h-2.5! w-2.5! border-2! border-white!', leftHandleColor]}
		/>
	{/if}
	{#if data.item.dependents.length > 0}
		<Handle
			type="source"
			position={Position.Right}
			class={['h-2.5! w-2.5! border-2! border-white!', handleColors[data.item.item.state]]}
		/>
	{/if}
</div>

<style>
	.is-highlighted {
		outline: 2px solid transparent;
		animation: outline-fade-out 3s ease-in-out 1;
	}
</style>
