<script lang="ts">
	import type { ViewRequirementNode } from '$lib/study-plan-view';
	import { courseStates } from '$lib/course-state';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import NativeRequirement from './native-requirement.svelte';
	import NativeRequirementNode from './native-requirement-node.svelte';
	import NativeRequirementSelector from './native-requirement-selector.svelte';
	import StatePill from './state-pill.svelte';

	type Props = {
		node: ViewRequirementNode;
		showCodes?: boolean;
	};

	let { node, showCodes = false }: Props = $props();

	const requiredCourseState = (state?: string) =>
		state === 'completed' || state === undefined
			? courseStates.passed
			: (state as (typeof courseStates)[keyof typeof courseStates]);

	const currentPercent = (quantNode: Extract<ViewRequirementNode, { nodeType: 'quant' }>) =>
		quantNode.matchedItemCount && quantNode.metItemCount !== undefined
			? Math.floor((quantNode.metItemCount / quantNode.matchedItemCount) * 100)
			: 0;
</script>

{#if node.nodeType === 'item'}
	<NativeRequirement requirement={node.atomic} {showCodes} />
{:else if node.nodeType === 'group'}
	<li class="grid gap-2">
		<span class="flex items-baseline gap-1 leading-relaxed">
			{#if node.met}
				<CheckIcon class="h-5 w-5 flex-none translate-y-1.5 stroke-green-700" />
			{:else}
				<CloseIcon class="h-5 w-5 flex-none translate-y-1 stroke-red-700" />
			{/if}
			<span class="font-noto">
				{node.label ??
					(node.op === 'any' ? 'Alguna de estas opciones:' : 'Todas estas condiciones:')}
			</span>
		</span>
		<ul class="grid gap-2 pl-6">
			{#each node.children as child (child.id)}
				<NativeRequirementNode node={child} {showCodes} />
			{/each}
		</ul>
	</li>
{:else}
	<li class="grid gap-2">
		<span class="flex items-baseline gap-1 leading-relaxed">
			{#if node.met}
				<CheckIcon class="h-5 w-5 flex-none translate-y-1.5 stroke-green-700" />
			{:else}
				<CloseIcon class="h-5 w-5 flex-none translate-y-1 stroke-red-700" />
			{/if}
			{#if node.variant === 'count'}
				<span class="font-noto">
					{node.totalUnits}
					<NativeRequirementSelector {node} />&nbsp;
					<StatePill
						state={requiredCourseState(node.requiredState)}
						plural={node.totalUnits !== 1}
					/>{#if node.metItemCount === 0}, pero ninguna lo está.{:else if node.met}, y {node.metItemCount}
						{node.metItemCount === 1 ? 'lo está' : 'lo están'}.{:else}, pero solo
						{node.metItemCount}
						{node.metItemCount === 1 ? 'lo está' : 'lo están'}.{/if}
				</span>
			{:else if node.variant === 'percent'}
				<span class="font-noto">
					{node.minPercent}% de <NativeRequirementSelector {node} article />&nbsp;
					<StatePill state={requiredCourseState(node.requiredState)} plural />: se necesitan
					{node.totalUnits}{#if node.metItemCount === 0}, pero ninguna lo está.{:else if node.met}
						&nbsp;y&nbsp;{node.metItemCount} lo están, es decir, el {currentPercent(node)}%.{:else},
						pero solo
						{node.metItemCount} lo están, es decir, el {currentPercent(node)}%.{/if}
				</span>
			{:else if node.variant === 'sum'}
				<span class="font-noto">
					{node.totalUnits}
					{node.metric === 'credits'
						? 'créditos'
						: node.metric === 'totalHours'
							? 'horas totales'
							: 'horas'} de <NativeRequirementSelector {node} />&nbsp;
					<StatePill
						state={requiredCourseState(node.requiredState)}
						plural
					/>{#if node.completedUnits === 0}, pero todavía no se acumuló ninguna.{:else if node.met},
						y ya se acumularon
						{node.completedUnits}.{:else}, pero solo se acumularon {node.completedUnits}.{/if}
				</span>
			{:else}
				<span class="font-noto">
					{node.label ?? `${node.totalUnits} de las siguientes opciones`}: {#if node.completedUnits === 0}ninguna
						se cumple.{:else if node.met}{node.completedUnits} se cumplen.{:else}solo
						{node.completedUnits} se {node.completedUnits === 1 ? 'cumple' : 'cumplen'}.{/if}
				</span>
			{/if}
		</span>
		{#if node.children && node.children.length > 0}
			<ul class="grid gap-2 pl-6">
				{#each node.children as child (child.id)}
					<NativeRequirementNode node={child} {showCodes} />
				{/each}
			</ul>
		{/if}
	</li>
{/if}
