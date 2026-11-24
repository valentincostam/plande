<script lang="ts">
	import { untrack } from 'svelte';
	import type {
		RequirementExpr,
		RequirementMetric,
		RequirementState,
		Selector
	} from '$lib/study-plan-data';
	import { courseTermLabels, type CourseTerm } from '$lib/course-term';
	import { courseTypeLabels, type CourseType } from '$lib/course-type';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { DraftPlanContent } from './draft-plan-content';
	import Button from './ui/button.svelte';
	import Select from './ui/select.svelte';

	type SetExpression = Extract<RequirementExpr, { type: 'count' | 'percent' | 'sum' }>;
	type ConditionType = SetExpression['type'] | '';
	type SelectorType = Selector['type'] | '';

	let {
		content,
		ownerId,
		expression,
		onconfirm,
		oncancel
	}: {
		content: DraftPlanContent;
		ownerId?: string;
		expression?: SetExpression;
		onconfirm: (expression: SetExpression) => void;
		oncancel: () => void;
	} = $props();

	const editorId = $props.id();
	const stateLabels: Record<RequirementState, string> = {
		inProgress: 'En curso',
		taken: 'Regularizada',
		passed: 'Aprobada',
		completed: 'Completada'
	};
	const states: RequirementState[] = ['inProgress', 'taken', 'passed', 'completed'];
	const metrics: Array<[RequirementMetric, string]> = [
		['hours', 'Horas'],
		['totalHours', 'Horas totales'],
		['credits', 'Créditos']
	];
	const conditionOptions = [
		{ value: 'count', label: 'Cantidad de materias o hitos' },
		{ value: 'percent', label: 'Porcentaje' },
		{ value: 'sum', label: 'Horas o créditos' }
	];
	const selectorOptions = [
		{ value: 'items', label: 'Materias e hitos elegidos' },
		{ value: 'tag', label: 'Materias e hitos con etiqueta' },
		{ value: 'section', label: 'Una sección' },
		{ value: 'sections', label: 'Varias secciones' },
		{ value: 'all', label: 'Todas las materias' }
	];
	const initialExpression = untrack(() => expression);
	const selector = initialExpression?.selector;
	let conditionType = $state<ConditionType>(initialExpression?.type ?? '');
	let selectorType = $state<SelectorType>(selector?.type ?? '');
	let itemIds = $state<string[]>(selector?.type === 'items' ? [...selector.itemIds] : []);
	let tag = $state(selector?.type === 'tag' ? selector.tag : '');
	let sectionId = $state(selector?.type === 'section' ? selector.sectionId : '');
	let sectionIds = $state<string[]>(selector?.type === 'sections' ? [...selector.sectionIds] : []);
	let term = $state<CourseTerm | ''>(selector?.type === 'sections' ? (selector.term ?? '') : '');
	let courseType = $state<CourseType | ''>(
		selector?.type === 'all' ? (selector.courseType ?? '') : ''
	);
	let requiredState = $state<RequirementState | ''>(initialExpression?.state ?? '');
	let metric = $state<RequirementMetric | ''>(
		initialExpression?.type === 'sum' ? initialExpression.metric : ''
	);
	let threshold = $state(
		initialExpression
			? String(
					initialExpression.type === 'percent'
						? initialExpression.minPercent
						: initialExpression.min
				)
			: ''
	);
	const availableItems = $derived(content.document.items);
	const missingItemIds = $derived(
		itemIds.filter((id) => !content.document.items.some((item) => item.id === id))
	);
	const missingSectionIds = $derived(
		sectionIds.filter((id) => !content.document.sections.some((section) => section.id === id))
	);
	const allSelectorNote = $derived(ownerId ? 'Todas las materias, excepto este ítem.' : '');
	const tags = $derived(
		[...new Set(content.document.items.flatMap((item) => item.tags ?? []))].toSorted(
			(left, right) => left.localeCompare(right, 'es')
		)
	);
	const tagOptions = $derived([
		...(tag && !tags.includes(tag) ? [{ value: tag, label: tag, disabled: true }] : []),
		...tags.map((value) => ({ value, label: value }))
	]);
	const sectionOptions = $derived([
		...(sectionId && !content.document.sections.some((section) => section.id === sectionId)
			? [{ value: sectionId, label: `Sección no disponible: ${sectionId}`, disabled: true }]
			: []),
		...content.document.sections.map((section) => ({
			value: section.id,
			label: section.label || 'Sección sin título'
		}))
	]);
	const termOptions = [
		{ value: '', label: 'Cualquier período' },
		...Object.entries(courseTermLabels)
			.filter(([, label]) => label)
			.map(([value, label]) => ({ value, label }))
	];
	const courseTypeOptions = [
		{ value: '', label: 'Todas' },
		...Object.entries(courseTypeLabels).map(([value, label]) => ({ value, label }))
	];
	const stateOptions = states.map((value) => ({ value, label: stateLabels[value] }));
	const metricOptions = metrics.map(([value, label]) => ({ value, label }));
	const selectorReady = $derived(
		selectorType === 'items'
			? itemIds.length > 0
			: selectorType === 'tag'
				? tag.trim() !== ''
				: selectorType === 'section'
					? sectionId !== ''
					: selectorType === 'sections'
						? sectionIds.length > 0
						: selectorType === 'all'
							? true
							: false
	);
	const thresholdNumber = $derived(Number(threshold));
	const thresholdReady = $derived(threshold.trim() !== '' && Number.isFinite(thresholdNumber));
	const canConfirm = $derived(
		conditionType !== '' &&
			selectorReady &&
			requiredState !== '' &&
			thresholdReady &&
			(conditionType !== 'sum' || metric !== '')
	);

	function toggle(values: string[], value: string) {
		return values.includes(value)
			? values.filter((candidate) => candidate !== value)
			: [...values, value];
	}

	function selectCondition(next: ConditionType) {
		conditionType = next;
		if (next !== 'sum') metric = '';
	}

	function selectSelector(next: SelectorType) {
		selectorType = next;
	}

	function selectedSelector(): Selector | undefined {
		switch (selectorType) {
			case 'items':
				return { type: 'items', itemIds };
			case 'tag':
				return { type: 'tag', tag };
			case 'section':
				return { type: 'section', sectionId };
			case 'sections':
				return { type: 'sections', sectionIds, ...(term ? { term } : {}) };
			case 'all':
				return { type: 'all', ...(courseType ? { courseType } : {}) };
		}
	}

	function confirm() {
		const selected = selectedSelector();
		if (!canConfirm || !selected || !requiredState) return;
		const label = expression?.label === undefined ? {} : { label: expression.label };
		if (conditionType === 'count')
			onconfirm({
				type: 'count',
				selector: selected,
				min: thresholdNumber,
				state: requiredState,
				...label
			});
		if (conditionType === 'percent')
			onconfirm({
				type: 'percent',
				selector: selected,
				minPercent: thresholdNumber,
				state: requiredState,
				...label
			});
		if (conditionType === 'sum' && metric)
			onconfirm({
				type: 'sum',
				selector: selected,
				metric,
				min: thresholdNumber,
				state: requiredState,
				...label
			});
	}
</script>

<Field.Group class="gap-4">
	<Field.Field>
		<Field.Label for={`${editorId}-type`}>Objetivo</Field.Label>
		<Select
			id={`${editorId}-type`}
			value={conditionType}
			options={conditionOptions}
			placeholder="Elegí un tipo de condición"
			onvaluechange={(value) => selectCondition(value as ConditionType)}
		/>
	</Field.Field>

	{#if conditionType}
		<Field.Field>
			<Field.Label for={`${editorId}-selector`}>Materias incluidas</Field.Label>
			<Select
				id={`${editorId}-selector`}
				value={selectorType}
				options={selectorOptions}
				placeholder="Elegí un conjunto"
				onvaluechange={(value) => selectSelector(value as SelectorType)}
			/>
		</Field.Field>

		{#if selectorType === 'items'}
			<Field.Set class="gap-2">
				<Field.Legend variant="label">Materias e hitos del conjunto</Field.Legend>
				{#each missingItemIds as id (id)}
					<Field.Label class="min-h-11 items-center rounded-lg border px-3 opacity-60"
						><Checkbox checked disabled />Ítem no disponible: {id}</Field.Label
					>
				{/each}
				{#each availableItems as item (item.id)}
					<Field.Label
						class="min-h-11 items-center rounded-lg border px-3"
						onclick={() => (itemIds = toggle(itemIds, item.id))}
						><Checkbox
							checked={itemIds.includes(item.id)}
							onclick={(event) => {
								event.stopPropagation();
								itemIds = toggle(itemIds, item.id);
							}}
						/>{item.name || 'Ítem sin nombre'}</Field.Label
					>
				{/each}
			</Field.Set>
		{:else if selectorType === 'tag'}
			<Field.Field>
				<Field.Label for={`${editorId}-tag`}>Etiqueta</Field.Label>
				<Select
					id={`${editorId}-tag`}
					value={tag}
					options={tagOptions}
					placeholder="Elegí una etiqueta"
					onvaluechange={(value) => (tag = value)}
				/>
			</Field.Field>
		{:else if selectorType === 'section'}
			<Field.Field>
				<Field.Label for={`${editorId}-section`}>Sección</Field.Label>
				<Select
					id={`${editorId}-section`}
					value={sectionId}
					options={sectionOptions}
					placeholder="Elegí una sección"
					onvaluechange={(value) => (sectionId = value)}
				/>
			</Field.Field>
		{:else if selectorType === 'sections'}
			<Field.Set class="gap-2">
				<Field.Legend variant="label">Secciones del conjunto</Field.Legend>
				{#each missingSectionIds as id (id)}
					<Field.Label class="min-h-11 items-center rounded-lg border px-3 opacity-60"
						><Checkbox checked disabled />Sección no disponible: {id}</Field.Label
					>
				{/each}
				{#each content.document.sections as section (section.id)}<Field.Label
						class="min-h-11 items-center rounded-lg border px-3"
						onclick={() => (sectionIds = toggle(sectionIds, section.id))}
						><Checkbox
							checked={sectionIds.includes(section.id)}
							onclick={(event) => {
								event.stopPropagation();
								sectionIds = toggle(sectionIds, section.id);
							}}
						/>{section.label || 'Sección sin título'}</Field.Label
					>{/each}
			</Field.Set>
			<Field.Field>
				<Field.Label for={`${editorId}-term`}>Período</Field.Label>
				<Select
					id={`${editorId}-term`}
					value={term}
					options={termOptions}
					onvaluechange={(value) => (term = value as CourseTerm | '')}
				/>
			</Field.Field>
		{:else if selectorType === 'all'}
			<Field.Description>{allSelectorNote}</Field.Description>
			<Field.Field>
				<Field.Label for={`${editorId}-course-type`}>Tipo de materia</Field.Label>
				<Select
					id={`${editorId}-course-type`}
					value={courseType}
					options={courseTypeOptions}
					onvaluechange={(value) => (courseType = value as CourseType | '')}
				/>
			</Field.Field>
		{/if}

		{#if selectorType}
			<Field.Field>
				<Field.Label for={`${editorId}-state`}>Estado requerido</Field.Label>
				<Select
					id={`${editorId}-state`}
					value={requiredState}
					options={stateOptions}
					placeholder="Elegí el estado requerido"
					onvaluechange={(value) => (requiredState = value as RequirementState)}
				/>
			</Field.Field>
			{#if conditionType === 'sum'}<Field.Field>
					<Field.Label for={`${editorId}-metric`}>Medida</Field.Label>
					<Select
						id={`${editorId}-metric`}
						value={metric}
						options={metricOptions}
						placeholder="Elegí una métrica"
						onvaluechange={(value) => (metric = value as RequirementMetric)}
					/>
				</Field.Field>{/if}
			<Field.Field
				><Field.Label for={`${editorId}-threshold`}>
					{conditionType === 'count'
						? 'Cantidad mínima'
						: conditionType === 'percent'
							? 'Porcentaje mínimo'
							: 'Total mínimo'}</Field.Label
				>
				<Input
					id={`${editorId}-threshold`}
					type="number"
					step="any"
					value={threshold}
					oninput={(event) => (threshold = event.currentTarget.value)}
				/></Field.Field
			>
		{/if}
	{/if}

	<div class="flex flex-wrap justify-end gap-2">
		<Button type="button" variant="outline" onclick={oncancel}>Cancelar</Button>
		<Button type="button" disabled={!canConfirm} onclick={confirm}>Confirmar condición</Button>
	</div>
</Field.Group>
