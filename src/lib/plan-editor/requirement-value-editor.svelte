<script lang="ts">
	import type { RequirementExpr, RequirementState } from '$lib/study-plan-data';
	import { describeRequirement } from '$lib/formatters/study-plan-document';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import type { DraftPlanContent } from './draft-plan-content';
	import type { RequirementValue } from './requirement-field';
	import RequirementExpressionEditor from './requirement-expression-editor.svelte';
	import SetThresholdDialog from './set-threshold-dialog.svelte';
	import Button from './ui/button.svelte';
	import Select from './ui/select.svelte';

	type Mode = 'unknown' | 'none' | 'item' | 'all' | 'any' | 'countOf' | 'set';

	let {
		content,
		ownerId,
		legend,
		value,
		allowNone = true,
		onvaluechange
	}: {
		content: DraftPlanContent;
		ownerId?: string;
		legend: string;
		value: RequirementValue;
		allowNone?: boolean;
		onvaluechange: (value: RequirementValue) => void;
	} = $props();

	const fieldId = $props.id();
	const defaultUnknownNote = 'Todavía no comprobado.';
	let editing = $state(false);
	let editOpener = $state<HTMLElement | undefined>(undefined);
	let pendingMode = $state<'item' | undefined>(undefined);
	let pendingTargetId = $state('');
	let setOpen = $state(false);
	let setOpener = $state<HTMLElement | undefined>(undefined);
	let modeTrigger = $state<HTMLButtonElement | null>(null);
	const courseStates: RequirementState[] = ['inProgress', 'taken', 'passed', 'completed'];
	const stateLabels: Record<RequirementState, string> = {
		inProgress: 'En curso',
		taken: 'Regularizada',
		passed: 'Aprobada',
		completed: 'Completada'
	};
	const requirement = $derived(value);
	const leaf = $derived(
		requirement.kind === 'expression' && requirement.expression.type === 'item'
			? requirement.expression
			: undefined
	);
	const group = $derived(
		requirement.kind === 'expression' &&
			['all', 'any', 'countOf'].includes(requirement.expression.type)
			? (requirement.expression as Extract<RequirementExpr, { type: 'all' | 'any' | 'countOf' }>)
			: undefined
	);
	const setExpression = $derived(
		requirement.kind === 'expression' &&
			['count', 'percent', 'sum'].includes(requirement.expression.type)
			? (requirement.expression as Extract<RequirementExpr, { type: 'count' | 'percent' | 'sum' }>)
			: undefined
	);
	const mode = $derived<Mode>(
		setOpen
			? 'set'
			: (pendingMode ??
					(requirement.kind === 'unknown'
						? 'unknown'
						: requirement.kind === 'none'
							? 'none'
							: leaf
								? 'item'
								: group
									? group.type
									: 'set'))
	);
	const targetId = $derived(pendingTargetId || leaf?.itemId || '');
	const target = $derived(content.document.items.find((item) => item.id === targetId));
	const selectedState = $derived(leaf ? (leaf.itemId === targetId ? leaf.state : '') : '');
	const selectableItems = $derived(content.document.items.filter((item) => item.id !== ownerId));
	const stateChoices = $derived<RequirementState[]>(
		target?.kind === 'milestone' ? ['completed'] : courseStates
	);
	const modeOptions = $derived([
		{ value: 'unknown', label: 'Todavía no comprobado' },
		...(allowNone ? [{ value: 'none', label: 'Sin requisitos' }] : []),
		{ value: 'item', label: 'Materia o hito' },
		{ value: 'set', label: 'Conjunto con objetivo' },
		...(['all', 'any', 'countOf'].includes(mode)
			? [{ value: mode, label: 'Varias condiciones' }]
			: [])
	]);
	const targetOptions = $derived([
		...(leaf && (targetId === ownerId || !target)
			? [
					{
						value: targetId,
						label: targetId === ownerId ? 'Este mismo ítem' : `Ítem no disponible: ${targetId}`,
						disabled: true
					}
				]
			: []),
		...selectableItems.map((item) => ({
			value: item.id,
			label: item.name || 'Ítem sin nombre'
		}))
	]);
	const stateOptions = $derived([
		...(selectedState && !stateChoices.includes(selectedState as RequirementState)
			? [{ value: selectedState, label: `Estado no válido: ${selectedState}`, disabled: true }]
			: []),
		...stateChoices.map((choice) => ({ value: choice, label: stateLabels[choice] }))
	]);
	const summary = $derived(
		requirement.kind === 'expression'
			? describeRequirement(requirement.expression, content.document)
			: requirement.kind === 'unknown'
				? requirement.note || defaultUnknownNote
				: 'Sin requisitos.'
	);
	const dialogTitle = $derived(`Requisito ${legend.toLocaleLowerCase('es')}`);
	const complexEditor = $derived(Boolean(group || setExpression));

	function change(next: RequirementValue) {
		pendingMode = undefined;
		pendingTargetId = '';
		onvaluechange($state.snapshot(next));
	}
	function markUnknown() {
		onvaluechange({ kind: 'unknown', note: defaultUnknownNote });
	}
	function changeMode(next: Mode, opener?: HTMLElement) {
		if (next === 'set') {
			setOpener = opener;
			setOpen = true;
			return;
		}
		if (next === 'item') {
			pendingMode = 'item';
			pendingTargetId = '';
			markUnknown();
			return;
		}
		if (next === 'unknown') change({ kind: 'unknown', note: defaultUnknownNote });
		if (next === 'none') change({ kind: 'none' });
	}
	function changeTarget(nextItemId: string) {
		const nextTarget = content.document.items.find((item) => item.id === nextItemId);
		if (!nextTarget || nextTarget.id === ownerId) return;
		if (nextTarget.kind === 'milestone') {
			change({
				kind: 'expression',
				expression: { type: 'item', itemId: nextItemId, state: 'completed' }
			});
			return;
		}
		pendingMode = 'item';
		pendingTargetId = nextItemId;
		markUnknown();
	}
	function changeState(nextState: string) {
		if (!target || !stateChoices.includes(nextState as RequirementState)) return;
		change({
			kind: 'expression',
			expression: { type: 'item', itemId: targetId, state: nextState as RequirementState }
		});
	}
	function changeExpression(expression: RequirementExpr) {
		change({ kind: 'expression', expression });
	}
</script>

<div class="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-start sm:gap-4">
	<p class="font-medium">{legend}</p>
	<p class="text-muted-foreground min-w-0 leading-6">{summary}</p>
	<Button
		type="button"
		variant="outline"
		size="sm"
		class="justify-self-start"
		onclick={(event) => {
			editOpener = event.currentTarget;
			editing = true;
		}}>Editar</Button
	>
</div>

<Dialog.Root bind:open={editing}>
	<Dialog.Content
		class={`plan-editor max-h-[85dvh] overflow-y-auto overscroll-contain ${complexEditor ? 'sm:max-w-xl' : 'sm:max-w-md'}`}
		aria-describedby={undefined}
		showCloseButton={false}
		onCloseAutoFocus={(event) => {
			if (!editOpener?.isConnected) return;
			event.preventDefault();
			editOpener.focus();
		}}
	>
		<Dialog.Header>
			<Dialog.Title>{dialogTitle}</Dialog.Title>
		</Dialog.Header>
		<Field.Group id={`${fieldId}-editor`} class="gap-5">
			<Field.Field class="sm:max-w-sm"
				><Field.Label for={`${fieldId}-mode`}>Tipo</Field.Label>
				<Select
					bind:ref={modeTrigger}
					id={`${fieldId}-mode`}
					value={mode}
					options={modeOptions}
					onvaluechange={(value) => changeMode(value as Mode, modeTrigger ?? undefined)}
				/>
			</Field.Field>
			{#if setExpression}
				<RequirementExpressionEditor
					{content}
					{ownerId}
					expression={setExpression}
					onexpressionchange={changeExpression}
				/>
			{:else if group}
				<RequirementExpressionEditor
					{content}
					{ownerId}
					expression={group}
					onexpressionchange={changeExpression}
				/>
			{:else if mode === 'item'}
				<Field.Field
					><Field.Label for={`${fieldId}-target`}>Materia o hito requerido</Field.Label>
					<Select
						id={`${fieldId}-target`}
						value={targetId}
						options={targetOptions}
						placeholder="Elegí una materia o hito"
						onvaluechange={changeTarget}
					/>
				</Field.Field>
				{#if targetId && target}
					<Field.Field
						><Field.Label for={`${fieldId}-state`}>Estado requerido</Field.Label>
						<Select
							id={`${fieldId}-state`}
							value={selectedState}
							options={stateOptions}
							placeholder="Elegí el estado requerido"
							onvaluechange={changeState}
						/>
					</Field.Field>
				{/if}
			{/if}
		</Field.Group>
		<div class="flex justify-end pt-1">
			<Button type="button" onclick={() => (editing = false)}>Listo</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>

<SetThresholdDialog
	bind:open={setOpen}
	{content}
	{ownerId}
	opener={setOpener}
	expression={setExpression}
	onconfirm={changeExpression}
/>
