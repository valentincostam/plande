<script lang="ts">
	import type { RequirementExpr, RequirementState } from '$lib/study-plan-data';
	import { describeRequirement } from '$lib/formatters/study-plan-document';
	import { MoreHorizontal, Plus } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { DraftPlanContent } from './draft-plan-content';
	import RequirementExpressionEditor from './requirement-expression-editor.svelte';
	import SetThresholdEditor from './set-threshold-editor.svelte';
	import Button from './ui/button.svelte';
	import Select from './ui/select.svelte';

	let {
		content,
		ownerId,
		expression,
		onexpressionchange,
		onremove
	}: {
		content: DraftPlanContent;
		ownerId?: string;
		expression: RequirementExpr;
		onexpressionchange: (expression: RequirementExpr) => void;
		onremove?: () => void;
	} = $props();

	const dialogId = $props.id();
	const courseStates: RequirementState[] = ['inProgress', 'taken', 'passed', 'completed'];
	const stateLabels: Record<RequirementState, string> = {
		inProgress: 'En curso',
		taken: 'Regularizada',
		passed: 'Aprobada',
		completed: 'Completada'
	};
	let open = $state(false);
	let countOpen = $state(false);
	let minimum = $state('');
	let dialogMode = $state<'add' | 'edit'>('add');
	let inputKind = $state<'item' | 'set'>('item');
	let combination = $state<'all' | 'any'>('all');
	let targetId = $state('');
	let selectedState = $state<RequirementState | ''>('');
	let opener = $state<HTMLElement | undefined>(undefined);
	let countOpener = $state<HTMLElement | undefined>(undefined);
	let combinationTrigger = $state<HTMLButtonElement | null>(null);
	const target = $derived(content.document.items.find((item) => item.id === targetId));
	const stateChoices = $derived<RequirementState[]>(
		target?.kind === 'milestone' ? ['completed'] : courseStates
	);
	const canAdd = $derived(Boolean(target && selectedState && stateChoices.includes(selectedState)));
	const combinationOptions = [
		{ value: 'all', label: 'Deben cumplirse todas' },
		{ value: 'any', label: 'Alcanza con una alternativa' },
		{ value: 'countOf', label: 'Se cumple una cantidad' }
	];
	const inputKindOptions = [
		{ value: 'item', label: 'Una materia o hito' },
		{ value: 'set', label: 'Un conjunto con objetivo' }
	];
	const targetOptions = $derived([
		...(targetId && (!target || targetId === ownerId)
			? [
					{
						value: targetId,
						label: targetId === ownerId ? 'Este mismo ítem' : `Ítem no disponible: ${targetId}`,
						disabled: true
					}
				]
			: []),
		...content.document.items
			.filter((item) => item.id !== ownerId)
			.map((item) => ({ value: item.id, label: item.name || 'Ítem sin nombre' }))
	]);
	const stateOptions = $derived(
		stateChoices.map((choice) => ({ value: choice, label: stateLabels[choice] }))
	);
	type GroupExpression = Extract<RequirementExpr, { type: 'all' | 'any' | 'countOf' }>;
	const group = $derived<GroupExpression | undefined>(
		['all', 'any', 'countOf'].includes(expression.type)
			? (expression as GroupExpression)
			: undefined
	);
	function openAdd(nextCombination: 'all' | 'any', nextOpener: HTMLElement) {
		dialogMode = 'add';
		inputKind = 'item';
		combination = nextCombination;
		targetId = '';
		selectedState = '';
		opener = nextOpener;
		open = true;
	}
	function openEdit(nextOpener: HTMLElement) {
		dialogMode = 'edit';
		inputKind = expression.type === 'item' ? 'item' : 'set';
		targetId = expression.type === 'item' ? expression.itemId : '';
		selectedState = expression.type === 'item' ? expression.state : '';
		opener = nextOpener;
		open = true;
	}
	function chooseTarget(id: string) {
		const nextTarget = content.document.items.find((item) => item.id === id);
		if (!nextTarget || nextTarget.id === ownerId) return;
		targetId = id;
		selectedState = nextTarget.kind === 'milestone' ? 'completed' : '';
	}
	function addCondition() {
		if (!canAdd || !selectedState) return;
		confirmExpression({ type: 'item', itemId: targetId, state: selectedState });
	}
	function confirmExpression(next: RequirementExpr) {
		if (dialogMode === 'edit') onexpressionchange(next);
		else if (group) onexpressionchange({ ...group, rules: [...group.rules, next] });
		else onexpressionchange({ type: combination, rules: [expression, next] });
		open = false;
	}
	function changeCombination(next: 'all' | 'any' | 'countOf', nextOpener?: HTMLElement) {
		if (!group) return;
		if (next === 'countOf') {
			minimum = group.type === 'countOf' ? String(group.min) : '';
			countOpener = nextOpener;
			countOpen = true;
			return;
		}
		onexpressionchange({
			type: next,
			rules: group.rules,
			...(group.label === undefined ? {} : { label: group.label })
		});
	}
	function confirmMinimum() {
		if (!group || minimum.trim() === '' || !Number.isFinite(Number(minimum))) return;
		onexpressionchange({ ...group, type: 'countOf', min: Number(minimum) });
		countOpen = false;
	}
	function changeChild(index: number, next: RequirementExpr) {
		if (group)
			onexpressionchange({
				...group,
				rules: group.rules.map((child, childIndex) => (childIndex === index ? next : child))
			});
	}
	function removeChild(index: number) {
		if (group && group.rules.length > 1)
			onexpressionchange({
				...group,
				rules: group.rules.filter((_, childIndex) => childIndex !== index)
			});
	}
</script>

{#if group}
	<Field.Set class="gap-4">
		<div class="flex flex-wrap items-end justify-between gap-3">
			<Field.Field class="max-w-sm min-w-56 grow">
				<Field.Label for={`${dialogId}-combination`}>Cómo se cumplen</Field.Label>
				<Select
					bind:ref={combinationTrigger}
					id={`${dialogId}-combination`}
					value={group.type}
					options={combinationOptions}
					onvaluechange={(value) =>
						changeCombination(value as 'all' | 'any' | 'countOf', combinationTrigger ?? undefined)}
				/>
			</Field.Field>
			{#if group.type === 'countOf'}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onclick={(event) => changeCombination('countOf', event.currentTarget)}
					>{group.min} de {group.rules.length}</Button
				>
			{/if}
		</div>
		<div class="divide-border divide-y border-y">
			{#each group.rules as child, index (index)}
				<RequirementExpressionEditor
					{content}
					{ownerId}
					expression={child}
					onexpressionchange={(next) => changeChild(index, next)}
					onremove={group.rules.length > 1 ? () => removeChild(index) : undefined}
				/>
			{/each}
		</div>
		<Button
			type="button"
			variant="outline"
			size="sm"
			class="self-start"
			onclick={(event) => openAdd(group.type === 'all' ? 'all' : 'any', event.currentTarget)}
			><Plus class="size-4" />
			{group.type === 'any' ? 'Agregar alternativa' : 'Agregar condición'}</Button
		>
	</Field.Set>
{:else}
	<div class="flex min-w-0 items-center gap-3 py-2.5">
		<p class="text-muted-foreground min-w-0 grow leading-5">
			{describeRequirement(expression, content.document)}
		</p>
		<DropdownMenu>
			<DropdownMenuTrigger
				class="hover:bg-muted inline-flex size-8 shrink-0 items-center justify-center rounded-md"
				aria-label="Acciones de la condición"
			>
				<MoreHorizontal class="size-4" strokeWidth={2} />
			</DropdownMenuTrigger>
			<DropdownMenuContent class="plan-editor min-w-52" align="end">
				<DropdownMenuItem onclick={(event) => openEdit(event.currentTarget)}>
					Editar condición
				</DropdownMenuItem>
				<DropdownMenuItem onclick={(event) => openAdd('all', event.currentTarget)}>
					Agregar condición con Y
				</DropdownMenuItem>
				<DropdownMenuItem onclick={(event) => openAdd('any', event.currentTarget)}>
					Agregar alternativa con O
				</DropdownMenuItem>
				{#if onremove}
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" onclick={onremove}>
						Quitar condición
					</DropdownMenuItem>
				{/if}
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
{/if}

<Dialog.Root bind:open>
	<Dialog.Content
		class="plan-editor max-h-[85dvh] overflow-y-auto overscroll-contain sm:max-w-lg"
		aria-describedby={undefined}
		showCloseButton={false}
		onCloseAutoFocus={(event) => {
			if (!opener?.isConnected) return;
			event.preventDefault();
			opener.focus();
		}}
	>
		<Dialog.Header
			><Dialog.Title
				>{dialogMode === 'edit' ? 'Editar condición' : 'Agregar condición'}</Dialog.Title
			></Dialog.Header
		>
		{#if dialogMode === 'add'}
			<Field.Field
				><Field.Label for={`${dialogId}-input-kind`}>La condición se refiere a</Field.Label>
				<Select id={`${dialogId}-input-kind`} bind:value={inputKind} options={inputKindOptions} />
			</Field.Field>
		{/if}
		{#if inputKind === 'set' && open}
			<SetThresholdEditor
				{content}
				{ownerId}
				expression={dialogMode === 'edit' && ['count', 'percent', 'sum'].includes(expression.type)
					? (expression as Extract<RequirementExpr, { type: 'count' | 'percent' | 'sum' }>)
					: undefined}
				onconfirm={confirmExpression}
				oncancel={() => (open = false)}
			/>
		{:else}
			<Field.Group class="gap-4">
				<Field.Field
					><Field.Label for={`${dialogId}-target`}>Materia o hito requerido</Field.Label>
					<Select
						id={`${dialogId}-target`}
						value={targetId}
						options={targetOptions}
						placeholder="Elegí una materia o hito"
						onvaluechange={chooseTarget}
					/>
				</Field.Field>
				{#if target}<Field.Field
						><Field.Label for={`${dialogId}-state`}>Estado requerido</Field.Label>
						<Select
							id={`${dialogId}-state`}
							value={selectedState}
							options={stateOptions}
							placeholder="Elegí el estado requerido"
							onvaluechange={(value) => (selectedState = value as RequirementState)}
						/>
					</Field.Field>{/if}
			</Field.Group>
			<div class="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancelar</Button
				><Button type="button" disabled={!canAdd} onclick={addCondition}
					>{dialogMode === 'edit' ? 'Guardar condición' : 'Agregar condición'}</Button
				>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={countOpen}>
	<Dialog.Content
		class="plan-editor max-h-[85dvh] overflow-y-auto overscroll-contain"
		showCloseButton={false}
		onCloseAutoFocus={(event) => {
			if (!countOpener?.isConnected) return;
			event.preventDefault();
			countOpener.focus();
		}}
	>
		<Dialog.Header
			><Dialog.Title>Cantidad de condiciones</Dialog.Title><Dialog.Description
				>Cuántas condiciones deben cumplirse.</Dialog.Description
			></Dialog.Header
		>
		<Field.Field
			><Field.Label for={`${dialogId}-minimum`}>Condiciones mínimas</Field.Label><Input
				id={`${dialogId}-minimum`}
				type="number"
				min="1"
				step="1"
				value={minimum}
				oninput={(event) => (minimum = event.currentTarget.value)}
			/></Field.Field
		>
		<div class="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
			<Button type="button" variant="outline" onclick={() => (countOpen = false)}>Cancelar</Button
			><Button
				type="button"
				disabled={minimum.trim() === '' || !Number.isFinite(Number(minimum))}
				onclick={confirmMinimum}>Confirmar cantidad</Button
			>
		</div>
	</Dialog.Content>
</Dialog.Root>
