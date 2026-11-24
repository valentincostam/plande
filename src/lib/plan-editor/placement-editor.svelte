<script lang="ts">
	import { courseTermLabels, courseTerms, type CourseTerm } from '$lib/course-term';
	import { ArrowDown, ArrowUp, MoreHorizontal, Plus, Trash2 } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu/index.js';
	import type { DraftPlanContent, EditorPlacement } from './draft-plan-content';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';
	import Select from './ui/select.svelte';

	let {
		content,
		itemId,
		oncontentchange
	}: {
		content: DraftPlanContent;
		itemId: string;
		oncontentchange: (content: DraftPlanContent) => void;
	} = $props();
	let adding = $state(false);
	let editing = $state(false);
	let editOpener = $state<HTMLElement | undefined>(undefined);
	let newSectionId = $state('');
	let newTerm = $state('');
	let newOrder = $state('');
	let validationError = $state<string | null>(null);
	const headingId = $props.id();
	const fieldId = `${headingId}-fields`;
	type ParsedOrder =
		| { kind: 'valid'; value: number | undefined }
		| { kind: 'invalid'; error: string };

	const item = $derived(content.document.items.find((candidate) => candidate.id === itemId));
	const sections = $derived(content.document.sections);
	const placements = $derived(
		item
			? [...item.placements].toSorted(
					(left, right) => (left.order ?? 0) - (right.order ?? 0) || left.id.localeCompare(right.id)
				)
			: []
	);
	const termOptions = Object.values(courseTerms);
	const sectionOptions = $derived(
		sections.map((section) => ({
			value: section.id,
			label: section.label || 'Sección sin título'
		}))
	);
	const periodOptions = [
		{ value: '', label: 'Sin período indicado' },
		...termOptions.map((term) => ({
			value: term,
			label: courseTermLabels[term] || 'Período sin especificar'
		}))
	];

	const sectionLabel = (sectionId: string) =>
		sections.find((section) => section.id === sectionId)?.label || 'Sección sin título';
	const termLabel = (term: CourseTerm | undefined) =>
		term === undefined
			? 'Sin período indicado'
			: courseTermLabels[term] || 'Período sin especificar';
	const tupleMatches = (left: EditorPlacement, right: EditorPlacement) =>
		left.sectionId === right.sectionId && left.term === right.term && left.order === right.order;
	const parsedOrder = (value: string): ParsedOrder => {
		if (value.trim() === '') return { kind: 'valid', value: undefined };
		const number = Number(value);
		return Number.isFinite(number)
			? { kind: 'valid', value: number }
			: { kind: 'invalid', error: 'La posición debe ser un número válido.' };
	};

	const updateContent = (placements: EditorPlacement[]) => {
		if (!item) return;
		oncontentchange({
			...content,
			document: {
				...content.document,
				items: content.document.items.map((candidate) =>
					candidate.id === item.id ? { ...candidate, placements } : candidate
				)
			}
		});
	};

	const updatePlacement = (placementId: string, patch: Partial<EditorPlacement>) => {
		if (!item) return;
		const current = item.placements.find((placement) => placement.id === placementId);
		if (!current) {
			validationError = 'No encontramos la ubicación que querías modificar.';
			return;
		}
		const candidate = { ...current, ...patch };
		if ('term' in patch && patch.term === undefined) delete candidate.term;
		if ('order' in patch && patch.order === undefined) delete candidate.order;
		if (
			item.placements.some(
				(placement) => placement.id !== placementId && tupleMatches(placement, candidate)
			)
		) {
			validationError = 'Ya existe una ubicación con esa sección, período y posición.';
			return;
		}
		validationError = null;
		updateContent(
			item.placements.map((placement) => (placement.id === placementId ? candidate : placement))
		);
	};

	const removePlacement = (placementId: string) => {
		if (!item) return;
		validationError = null;
		updateContent(item.placements.filter((placement) => placement.id !== placementId));
	};

	const movePlacement = (placement: EditorPlacement, direction: -1 | 1) =>
		updatePlacement(placement.id, { order: (placement.order ?? 0) + direction });

	const beginAdding = () => {
		newSectionId = sections[0]?.id ?? '';
		newTerm = '';
		newOrder = '';
		validationError = null;
		adding = true;
	};

	const addPlacement = () => {
		if (!item) return;
		if (!newSectionId) {
			validationError = 'Elegí una sección para la ubicación.';
			return;
		}
		const order = parsedOrder(newOrder);
		if (order.kind === 'invalid') {
			validationError = order.error;
			return;
		}
		const placement: EditorPlacement = {
			id: crypto.randomUUID(),
			sectionId: newSectionId,
			...(newTerm ? { term: newTerm as CourseTerm } : {}),
			...(order.value === undefined ? {} : { order: order.value })
		};
		if (item.placements.some((candidate) => tupleMatches(candidate, placement))) {
			validationError = 'Ya existe una ubicación con esa sección, período y posición.';
			return;
		}
		validationError = null;
		updateContent([...item.placements, placement]);
		adding = false;
	};
</script>

<div
	id={headingId}
	class="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-start sm:gap-4"
>
	<p class="font-medium">Ubicación</p>
	<div class="text-muted-foreground min-w-0 space-y-1 leading-6">
		{#if !item}
			<p role="alert">No encontramos este elemento.</p>
		{:else if placements.length === 0}
			<p>Sin ubicación.</p>
		{:else}
			{#each placements as placement (placement.id)}
				<p>
					{sectionLabel(placement.sectionId)} · {termLabel(placement.term)}{placement.order ===
					undefined
						? ''
						: ` · Posición ${placement.order}`}
				</p>
			{/each}
		{/if}
	</div>
	<Button
		variant="outline"
		size="sm"
		class="justify-self-start"
		disabled={!item}
		onclick={(event) => {
			editOpener = event.currentTarget;
			editing = true;
		}}>Editar</Button
	>
</div>

<Dialog.Root bind:open={editing}>
	<Dialog.Content
		class="plan-editor max-h-[85dvh] overflow-y-auto overscroll-contain sm:max-w-2xl"
		showCloseButton={false}
		onCloseAutoFocus={(event) => {
			if (!editOpener?.isConnected) return;
			event.preventDefault();
			editOpener.focus();
		}}
	>
		<Dialog.Header>
			<Dialog.Title>Ubicaciones</Dialog.Title>
			<Dialog.Description>
				Un elemento puede aparecer en más de una sección o período.
			</Dialog.Description>
		</Dialog.Header>
		{#if validationError}
			<p
				class="border-destructive/50 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
				role="alert"
			>
				{validationError}
			</p>
		{/if}
		<div class="divide-border divide-y">
			{#each placements as placement, index (placement.id)}
				<fieldset
					class="grid grid-cols-2 gap-3 py-4 first:pt-1 sm:grid-cols-[minmax(12rem,1.3fr)_minmax(11rem,1fr)_5rem_auto]"
				>
					<legend class="sr-only">Ubicación {index + 1}</legend>
					<label
						class="col-span-2 grid gap-1.5 text-sm sm:col-span-1"
						for={`${fieldId}-${placement.id}-section`}
					>
						<span class="font-medium">Sección</span>
						<Select
							id={`${fieldId}-${placement.id}-section`}
							value={placement.sectionId}
							options={sectionOptions}
							onvaluechange={(value) => updatePlacement(placement.id, { sectionId: value })}
						/>
					</label>
					<label
						class="col-span-2 grid gap-1.5 text-sm sm:col-span-1"
						for={`${fieldId}-${placement.id}-term`}
					>
						<span class="font-medium">Período</span>
						<Select
							id={`${fieldId}-${placement.id}-term`}
							value={placement.term ?? ''}
							options={periodOptions}
							onvaluechange={(value) =>
								updatePlacement(placement.id, {
									term: value ? (value as CourseTerm) : undefined
								})}
						/>
					</label>
					<label class="grid gap-1.5 text-sm" for={`${fieldId}-${placement.id}-order`}>
						<span class="font-medium">Posición</span>
						<Input
							id={`${fieldId}-${placement.id}-order`}
							type="number"
							value={placement.order ?? ''}
							oninput={(event) => {
								const order = parsedOrder(event.currentTarget.value);
								if (order.kind === 'invalid') validationError = order.error;
								else updatePlacement(placement.id, { order: order.value });
							}}
						/>
					</label>
					<div class="self-end justify-self-end">
						<DropdownMenu>
							<DropdownMenuTrigger
								class="hover:bg-muted inline-flex size-8 items-center justify-center rounded-md"
								aria-label={`Acciones de ubicación ${index + 1}`}
							>
								<MoreHorizontal class="size-4" strokeWidth={2} />
							</DropdownMenuTrigger>
							<DropdownMenuContent class="plan-editor min-w-44" align="end">
								<DropdownMenuItem onclick={() => movePlacement(placement, -1)}>
									<ArrowUp /> Subir
								</DropdownMenuItem>
								<DropdownMenuItem onclick={() => movePlacement(placement, 1)}>
									<ArrowDown /> Bajar
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									variant="destructive"
									onclick={() => removePlacement(placement.id)}
								>
									<Trash2 /> Retirar
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</fieldset>
			{:else}
				<p class="text-muted-foreground py-5 text-sm">Todavía no hay ubicaciones.</p>
			{/each}
		</div>
		{#if adding}
			<fieldset
				class="border-border grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-[minmax(12rem,1.3fr)_minmax(11rem,1fr)_5rem]"
			>
				<legend class="mb-2 font-medium sm:col-span-3">Nueva ubicación</legend>
				<label class="col-span-2 grid gap-1.5 text-sm sm:col-span-1" for={`${fieldId}-new-section`}>
					<span class="font-medium">Sección</span>
					<Select
						bind:value={newSectionId}
						id={`${fieldId}-new-section`}
						options={sectionOptions}
						placeholder="Elegí una sección"
					/>
				</label>
				<label class="col-span-2 grid gap-1.5 text-sm sm:col-span-1" for={`${fieldId}-new-term`}>
					<span class="font-medium">Período</span>
					<Select bind:value={newTerm} id={`${fieldId}-new-term`} options={periodOptions} />
				</label>
				<label class="grid gap-1.5 text-sm" for={`${fieldId}-new-order`}>
					<span class="font-medium">Posición</span>
					<Input id={`${fieldId}-new-order`} type="number" bind:value={newOrder} />
				</label>
				<div class="col-span-2 flex flex-wrap gap-2 sm:col-span-3">
					<Button onclick={addPlacement}>Agregar</Button>
					<Button variant="outline" onclick={() => (adding = false)}>Cancelar</Button>
				</div>
			</fieldset>
		{:else}
			<Button
				class="justify-self-start"
				variant="outline"
				onclick={beginAdding}
				disabled={sections.length === 0}
			>
				<Plus class="size-4" /> Agregar ubicación
			</Button>
		{/if}
		{#if sections.length === 0}
			<p class="text-sm" role="alert">Agregá una sección antes de crear una ubicación.</p>
		{/if}
		<div class="flex justify-end pt-1">
			<Button type="button" onclick={() => (editing = false)}>Listo</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
