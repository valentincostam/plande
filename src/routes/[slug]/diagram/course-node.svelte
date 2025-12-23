<script lang="ts">
	import { Position, type NodeProps, type Node, Handle } from '@xyflow/svelte';
	import { TRANSVERSAL_YEAR, type Course } from '$lib/course.svelte';
	import { courseBgColors, courseNameColors, courseStates } from '$lib/course-state';
	import { courseTagLabels } from '$lib/course-tag';
	import StateSelect from '../state-select.svelte';

	let { data }: NodeProps<Node<{ course: Course; isSelected?: boolean }>> = $props();

	// Year ordinal suffix
	const yearSuffix = ['', '°', '°', '°', '°', '°', '°'];

	// Handle colors based on state
	const handleColors = {
		[courseStates.notTaken]: 'bg-gray-300'!,
		[courseStates.inProgress]: 'bg-blue-500'!,
		[courseStates.taken]: 'bg-amber-500'!,
		[courseStates.passed]: 'bg-green-500!'
	};

	// Left handle: gray if blocked, green if canPass, amber if can enroll
	const leftHandleColor = $derived(
		!data.course.isEnabled
			? 'bg-gray-300!'
			: data.course.canPass
				? 'bg-green-500!'
				: 'bg-amber-500!'
	);
</script>

<div
	class={[
		'flex max-w-[280px] min-w-[240px] items-center gap-2 rounded-md p-3 text-sm transition-all',
		courseBgColors[data.course.state],
		data.isSelected && 'ring-2 ring-blue-500 ring-offset-1'
	]}
>
	<!-- Año -->
	<span
		class={[
			'flex-none rounded bg-white/60 px-1.5 py-1 text-[10px] font-medium',
			courseNameColors[data.course.state]
		]}
	>
		{#if data.course.year === TRANSVERSAL_YEAR}
			—
		{:else}
			{data.course.year}{yearSuffix[data.course.year] || '°'}
		{/if}
	</span>

	<!-- Nombre + Tag (wrap juntos) -->
	<span class="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1">
		<span
			class={[
				'font-noto leading-tight tracking-tight',
				data.course.isEnabled ? courseNameColors[data.course.state] : 'text-gray-500'
			]}
		>
			{data.course.name}
		</span>
		{#if data.course.tag}
			<span class="rounded bg-white/80 px-1.5 py-0.5 text-[10px] leading-none text-gray-600">
				{courseTagLabels[data.course.tag]}
			</span>
		{/if}
	</span>

	<!-- Estado -->
	{#if data.course.isEnabled}
		<StateSelect
			id={`diagram-${data.course.id}-state`}
			bind:value={data.course.state}
			canPass={data.course.canPass}
			courseName={data.course.name}
		/>
	{:else}
		<span class="flex-none rounded-md bg-gray-400 px-2 py-1 text-xs text-white"> Bloqueada </span>
	{/if}

	<!-- Handles -->
	{#if data.course.requirementsForEnrollment.length > 0 || data.course.requirementsForCompletion.length > 0}
		<Handle
			type="target"
			position={Position.Left}
			class={['h-2.5! w-2.5! border-2! border-white!', leftHandleColor]}
		/>
	{/if}
	{#if data.course.dependents.length > 0}
		<Handle
			type="source"
			position={Position.Right}
			class={['h-2.5! w-2.5! border-2! border-white!', handleColors[data.course.state]]}
		/>
	{/if}
</div>
