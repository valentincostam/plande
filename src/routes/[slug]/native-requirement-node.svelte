<script lang="ts">
	import type { ViewRequirementNode } from '$lib/study-plan-view';
	import { pluralFeminineCourseStateLabels, courseStates } from '$lib/course-state';
	import { courseTypes } from '$lib/course-type';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';
	import NativeRequirement from './native-requirement.svelte';
	import NativeRequirementNode from './native-requirement-node.svelte';

	type Props = {
		node: ViewRequirementNode;
		showCodes?: boolean;
	};

	let { node, showCodes = false }: Props = $props();

	const requiredStateLabel = (state?: string) => {
		if (!state || state === 'completed')
			return pluralFeminineCourseStateLabels[courseStates.passed];
		return pluralFeminineCourseStateLabels[state as keyof typeof pluralFeminineCourseStateLabels];
	};

	const courseTypePluralLabels = {
		[courseTypes.mandatory]: 'obligatorias',
		[courseTypes.elective]: 'electivas',
		[courseTypes.optative]: 'optativas'
	} as const;

	const selectorLabel = (quantNode: Extract<ViewRequirementNode, { nodeType: 'quant' }>) => {
		const selector = quantNode.selector;
		if (!selector) return 'materias';

		switch (selector.type) {
			case 'section':
				return `materias de ${quantNode.selectorSectionLabels?.[0] ?? selector.sectionId}`;
			case 'sections':
				return `materias de ${quantNode.selectorSectionLabels?.join(', ') ?? selector.sectionIds.join(', ')}`;
			case 'all':
				return selector.courseType
					? `materias ${courseTypePluralLabels[selector.courseType]}`
					: 'materias del plan';
			case 'items':
			case 'tag': {
				if (quantNode.selectorCoversAllCourses) return 'materias del plan';
				const courseType =
					quantNode.selectorCourseTypes?.length === 1
						? quantNode.selectorCourseTypes[0]
						: undefined;
				return courseType
					? `materias ${courseTypePluralLabels[courseType]}`
					: 'materias seleccionadas';
			}
		}
	};

	const selectorLabelWithArticle = (
		quantNode: Extract<ViewRequirementNode, { nodeType: 'quant' }>
	) => selectorLabel(quantNode).replace(/^materias/, 'las materias');

	const quantLabel = $derived.by(() => {
		if (node.nodeType !== 'quant') return '';
		if (node.label) return node.label;
		switch (node.variant) {
			case 'count':
				return `${node.totalUnits} ${selectorLabel(node)} ${requiredStateLabel(node.requiredState).toLowerCase()}`;
			case 'countOf':
				return `${node.totalUnits} de las siguientes opciones`;
			case 'percent':
				return `${node.minPercent}% de ${selectorLabelWithArticle(node)} (${node.totalUnits} de ${node.matchedItemCount}) ${requiredStateLabel(node.requiredState).toLowerCase()}`;
			case 'sum':
				return `${node.totalUnits} ${node.metric === 'credits' ? 'créditos' : 'horas'} de ${selectorLabel(node)} ${requiredStateLabel(node.requiredState).toLowerCase()}`;
		}
	});

	const quantProgress = $derived.by(() => {
		if (node.nodeType !== 'quant') return '';
		const unit =
			node.variant === 'sum' ? (node.metric === 'credits' ? 'créditos' : 'horas') : undefined;
		return `${node.completedUnits} de ${node.totalUnits}${unit ? ` ${unit}` : ''}`;
	});

	const quantDescription = $derived.by(() => {
		if (
			node.nodeType !== 'quant' ||
			node.variant !== 'percent' ||
			node.matchedItemCount === undefined ||
			node.metItemCount === undefined ||
			node.minPercent === undefined ||
			node.matchedItemCount === 0
		) {
			return undefined;
		}

		const state = requiredStateLabel(node.requiredState).toLowerCase();
		const currentPercent = Math.floor((node.metItemCount / node.matchedItemCount) * 100);
		const threshold = `${node.minPercent}% de ${selectorLabelWithArticle(node)} (${node.totalUnits} de ${node.matchedItemCount}) deben estar ${state}`;
		return node.met
			? `${threshold} y ${currentPercent}% lo está (${node.metItemCount} de ${node.matchedItemCount})`
			: `${threshold} pero solo el ${currentPercent}% lo está (${node.metItemCount} de ${node.matchedItemCount})`;
	});
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
			<span class="font-noto grid gap-1">
				<span>{quantLabel}</span>
				<span class="text-gray-500">{quantDescription ?? `(${quantProgress})`}</span>
			</span>
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
