<script lang="ts">
	import type { ViewRequirementNode } from '$lib/study-plan-view';
	import { courseTypes } from '$lib/course-type';
	import Ordinal from '$lib/ordinal.svelte';

	type QuantNode = Extract<ViewRequirementNode, { nodeType: 'quant' }>;

	type Props = {
		node: QuantNode;
		article?: boolean;
	};

	let { node, article = false }: Props = $props();

	const courseTypePluralLabels = {
		[courseTypes.mandatory]: 'obligatorias',
		[courseTypes.elective]: 'electivas',
		[courseTypes.optative]: 'optativas'
	} as const;

	const inferredCourseType = $derived(
		node.selectorCourseTypes?.length === 1 ? node.selectorCourseTypes[0] : undefined
	);
</script>

{#if node.selector?.type === 'section'}
	{article ? 'las materias de ' : 'materias de '}
	{#if node.selectorSections?.[0]?.year !== undefined}
		<Ordinal number={node.selectorSections[0].year} noun="año" />
	{:else}
		{node.selectorSections?.[0]?.label ?? node.selector.sectionId}
	{/if}
{:else if node.selector?.type === 'sections'}
	{article ? 'las materias de ' : 'materias de '}
	{#each node.selectorSections ?? [] as section, index (section.id)}
		{#if index > 0}{index === (node.selectorSections?.length ?? 0) - 1
				? ' y '
				: ', '}{/if}{#if section.year !== undefined}<Ordinal
				number={section.year}
				noun="año"
			/>{:else}{section.label}{/if}
	{/each}
{:else if node.selector?.type === 'all'}
	{`${article ? 'las materias' : 'materias'} ${node.selector.courseType ? courseTypePluralLabels[node.selector.courseType] : 'del plan'}`}
{:else if node.selector?.type === 'items' || node.selector?.type === 'tag'}
	{`${article ? 'las materias' : 'materias'} ${node.selectorCoversAllCourses ? 'del plan' : inferredCourseType ? courseTypePluralLabels[inferredCourseType] : 'seleccionadas'}`}
{/if}
