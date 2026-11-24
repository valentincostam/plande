<script lang="ts">
	import { tick } from 'svelte';
	import {
		ArrowDown,
		ArrowUp,
		ChevronDown,
		ChevronRight,
		GripVertical,
		MoreHorizontal,
		Plus
	} from '@lucide/svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuSub,
		DropdownMenuSubContent,
		DropdownMenuSubTrigger,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu/index.js';
	import { courseTypes } from '$lib/course-type';
	import type { DraftPlanContent } from './draft-plan-content';
	import Button from './ui/button.svelte';
	import CourseFields from './course-fields.svelte';
	import RequirementEditor from './requirement-editor.svelte';
	import GraduationEditor from './graduation-editor.svelte';
	import GraduationPreview from './graduation-preview.svelte';
	import { requirementDiagnostics } from './requirement-diagnostics';
	import { describeRequirement } from '$lib/formatters/study-plan-document';
	import { insertionOrders } from './insertion-order';
	import PlacementEditor from './placement-editor.svelte';
	import RetireElement from './retire-element.svelte';
	import {
		addCourse,
		addMilestone,
		addSection,
		itemsInSection,
		moveItem,
		patchCourse,
		patchItemName,
		renameSection,
		reorderSection
	} from './structure';

	let {
		content,
		basicOnly = false,
		metadataEnabled = false,
		publishedItemIds = [],
		oncontentchange
	}: {
		content: DraftPlanContent;
		basicOnly?: boolean;
		metadataEnabled?: boolean;
		publishedItemIds?: readonly string[];
		oncontentchange: (content: DraftPlanContent) => void;
	} = $props();

	type DragPayload =
		| { kind: 'section'; sectionId: string }
		| { kind: 'item'; itemId: string; sectionId: string | null };

	let expandedItemId = $state<string | null>(null);
	let sectionInputs = $state<Record<string, HTMLTextAreaElement>>({});
	let itemInputs = $state<Record<string, HTMLTextAreaElement>>({});
	let actionTriggers: Record<string, HTMLButtonElement | null> = $state({});
	let retireOpen: Record<string, boolean> = $state({});
	let dragging = $state<DragPayload | null>(null);
	let dropTarget = $state<string | null>(null);
	let moveAnnouncement = $state('');

	const unplacedMilestones = $derived(
		content.document.items.filter(
			(item) => item.kind === 'milestone' && item.placements.length === 0
		)
	);
	const detailsEnabled = $derived(!basicOnly || metadataEnabled);
	const diagnostics = $derived(requirementDiagnostics($state.snapshot(content)));

	const change = (next: DraftPlanContent) => oncontentchange(next);
	const newId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
	const nextSeqId = () => content.document.nextSeqId;
	const sectionName = (sectionId: string | null) =>
		sectionId === null
			? 'Hitos generales'
			: content.document.sections.find((section) => section.id === sectionId)?.label ||
				'Sección sin título';

	const announceMove = (label: string, destination: string) => {
		moveAnnouncement = `${label || 'Elemento sin nombre'} se movió a ${destination}.`;
	};

	const addBlankSection = async () => {
		const id = newId('section');
		change(addSection(content, { id, label: '' }));
		await tick();
		sectionInputs[id]?.focus();
	};

	const addBlankCourse = async (sectionId: string) => {
		const id = newId('course');
		change(
			addCourse(
				content,
				{ id, seqId: nextSeqId(), kind: 'course', name: '', type: courseTypes.mandatory },
				sectionId
			)
		);
		expandedItemId = id;
		await tick();
		itemInputs[id]?.focus();
	};

	const addBlankMilestone = async (sectionId?: string) => {
		const id = newId('milestone');
		change(
			addMilestone(content, { id, seqId: nextSeqId(), kind: 'milestone', name: '' }, sectionId)
		);
		expandedItemId = id;
		await tick();
		itemInputs[id]?.focus();
	};

	const addCourseBelow = async (itemId: string, sectionId: string) => {
		const id = newId('course');
		const sectionItems = itemsInSection(content.document, sectionId);
		const placements = sectionItems.map(
			(item) => item.placements.find((placement) => placement.sectionId === sectionId)!
		);
		const selected = sectionItems
			.find((item) => item.id === itemId)
			?.placements.find((placement) => placement.sectionId === sectionId);
		if (!selected) return;
		const orders = insertionOrders(placements, selected.id);
		if (!orders) return;
		const next = addCourse(
			content,
			{ id, seqId: nextSeqId(), kind: 'course', name: '', type: courseTypes.mandatory },
			sectionId
		);
		const createdPlacementId = next.document.items.find((item) => item.id === id)?.placements[0]
			?.id;
		change({
			...next,
			document: {
				...next.document,
				items: next.document.items.map((item) => ({
					...item,
					placements: item.placements.map((placement) => ({
						...placement,
						...(placement.id === createdPlacementId
							? { order: orders.inserted }
							: orders.existing.has(placement.id)
								? { order: orders.existing.get(placement.id)! }
								: {})
					}))
				}))
			}
		});
		expandedItemId = id;
		await tick();
		itemInputs[id]?.focus();
	};

	const addSectionBelow = async (sectionId: string) => {
		const id = newId('section');
		const next = addSection(content, { id, label: '' });
		const index = next.document.sections.findIndex((section) => section.id === sectionId);
		change(reorderSection(next, id, index + 1));
		await tick();
		sectionInputs[id]?.focus();
	};

	const moveSectionBy = (sectionId: string, offset: number) => {
		const index = content.document.sections.findIndex((section) => section.id === sectionId);
		const section = content.document.sections[index];
		if (!section) return;
		const target = Math.max(0, Math.min(index + offset, content.document.sections.length - 1));
		if (target === index) return;
		change(reorderSection(content, sectionId, target));
		announceMove(section.label || 'Sección sin título', `la posición ${target + 1}`);
	};

	const moveItemTo = (
		itemId: string,
		fromSectionId: string | null,
		toSectionId: string | null,
		targetIndex: number
	) => {
		const item = content.document.items.find((candidate) => candidate.id === itemId);
		if (!item) return;
		const next = moveItem(content, itemId, fromSectionId, toSectionId, targetIndex);
		if (next === content) return;
		change(next);
		announceMove(item.name, sectionName(toSectionId));
	};

	const moveItemBy = (itemId: string, sectionId: string, offset: number) => {
		const items = itemsInSection(content.document, sectionId);
		const index = items.findIndex((item) => item.id === itemId);
		const target = Math.max(0, Math.min(index + offset, items.length - 1));
		if (index < 0 || target === index) return;
		moveItemTo(itemId, sectionId, sectionId, target);
	};

	const startDrag = (event: DragEvent, payload: DragPayload) => {
		dragging = payload;
		dropTarget = null;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/plain', JSON.stringify(payload));
		}
	};

	const endDrag = () => {
		dragging = null;
		dropTarget = null;
	};

	const sectionDragOver = (event: DragEvent, sectionIndex: number) => {
		if (dragging?.kind !== 'section') return;
		event.preventDefault();
		const bounds =
			event.currentTarget instanceof HTMLElement
				? event.currentTarget.getBoundingClientRect()
				: null;
		const index =
			bounds && event.clientY > bounds.top + bounds.height / 2 ? sectionIndex + 1 : sectionIndex;
		dropTarget = `section:${index}`;
	};

	const dropSection = (event: DragEvent) => {
		if (dragging?.kind !== 'section' || !dropTarget?.startsWith('section:')) return;
		event.preventDefault();
		const originalIndex = content.document.sections.findIndex(
			(section) => section.id === dragging?.sectionId
		);
		let targetIndex = Number(dropTarget.split(':')[1]);
		if (originalIndex < targetIndex) targetIndex -= 1;
		const section = content.document.sections[originalIndex];
		change(reorderSection(content, dragging.sectionId, targetIndex));
		announceMove(section?.label || 'Sección sin título', `la posición ${targetIndex + 1}`);
		endDrag();
	};

	const itemDragOver = (
		event: DragEvent,
		sectionId: string | null,
		itemIndex: number,
		itemCount: number
	) => {
		if (dragging?.kind !== 'item') return;
		const draggedItemId = dragging.itemId;
		if (sectionId === null) {
			const item = content.document.items.find((candidate) => candidate.id === draggedItemId);
			if (item?.kind !== 'milestone') return;
		}
		event.preventDefault();
		event.stopPropagation();
		const bounds =
			event.currentTarget instanceof HTMLElement
				? event.currentTarget.getBoundingClientRect()
				: null;
		const index =
			bounds && event.clientY > bounds.top + bounds.height / 2 ? itemIndex + 1 : itemIndex;
		dropTarget = `item:${sectionId ?? 'general'}:${Math.min(index, itemCount)}`;
	};

	const itemListDragOver = (event: DragEvent, sectionId: string | null, itemCount: number) => {
		if (dragging?.kind !== 'item') return;
		const draggedItemId = dragging.itemId;
		if (sectionId === null) {
			const item = content.document.items.find((candidate) => candidate.id === draggedItemId);
			if (item?.kind !== 'milestone') return;
		}
		event.preventDefault();
		event.stopPropagation();
		dropTarget = `item:${sectionId ?? 'general'}:${itemCount}`;
	};

	const dropItem = (event: DragEvent, sectionId: string | null) => {
		if (dragging?.kind !== 'item' || !dropTarget?.startsWith('item:')) return;
		event.preventDefault();
		event.stopPropagation();
		const targetIndex = Number(dropTarget.split(':').at(-1));
		moveItemTo(dragging.itemId, dragging.sectionId, sectionId, targetIndex);
		endDrag();
	};
</script>

<div class="font-noto space-y-6">
	<p class="sr-only" aria-live="polite">{moveAnnouncement}</p>

	{#if diagnostics.length}
		<div
			role="status"
			class="rounded-xl border border-amber-300/80 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"
		>
			<p class="font-semibold">El borrador todavía necesita ajustes</p>
			{#each diagnostics as diagnostic (diagnostic)}<p class="mt-1">{diagnostic}</p>{/each}
			<p class="mt-2 text-amber-800 dark:text-amber-200">
				Podés guardarlo ahora y completar estos datos después.
			</p>
		</div>
	{/if}

	<div class="space-y-4">
		{#each content.document.sections as section, sectionIndex (section.id)}
			{@const sectionItems = itemsInSection(content.document, section.id)}
			<Card
				class={`editor-section ring-ring/35 overflow-visible py-0 ${dropTarget === `section:${sectionIndex}` || dropTarget === `section:${sectionIndex + 1}` ? 'ring-2' : ''}`}
				ondragover={(event) => sectionDragOver(event, sectionIndex)}
				ondrop={dropSection}
			>
				<CardHeader class="group/section border-border border-b px-3 py-3 sm:px-4">
					<div class="flex min-w-0 items-center gap-2">
						<button
							type="button"
							draggable="true"
							class="drag-handle text-muted-foreground hover:bg-muted hover:text-foreground hidden size-8 shrink-0 cursor-grab items-center justify-center rounded-lg opacity-0 transition-opacity duration-150 ease-out focus-visible:opacity-100 active:cursor-grabbing sm:flex sm:group-hover/section:opacity-100"
							aria-label={`Arrastrar sección ${section.label || 'sin título'}`}
							ondragstart={(event) => startDrag(event, { kind: 'section', sectionId: section.id })}
							ondragend={endDrag}
						>
							<GripVertical class="size-4" strokeWidth={2} aria-hidden="true" />
						</button>
						<h2 id={`section-${section.id}`} class="sr-only">
							{section.label || 'Sección sin título'}
						</h2>
						<textarea
							bind:this={sectionInputs[section.id]}
							class="focus-visible:border-ring focus-visible:ring-ring/50 field-sizing-content min-w-0 grow resize-none rounded-md border border-transparent bg-transparent px-2 py-1 text-base font-bold outline-none focus-visible:ring-2 sm:text-lg"
							rows={1}
							value={section.label}
							oninput={(event) =>
								change(renameSection(content, section.id, event.currentTarget.value))}
							placeholder="Título de sección"
							aria-label="Título de sección"
						></textarea>
						<Badge variant="secondary" class="hidden tabular-nums sm:inline-flex">
							{sectionItems.length}
							{sectionItems.length === 1 ? 'elemento' : 'elementos'}
						</Badge>
						<DropdownMenu>
							<DropdownMenuTrigger
								bind:ref={
									() => actionTriggers[`section-${section.id}`] ?? null,
									(value) => (actionTriggers[`section-${section.id}`] = value)
								}
								class="hover:bg-muted inline-flex size-9 shrink-0 items-center justify-center rounded-lg"
								aria-label={`Acciones de sección ${section.label || 'sin título'}`}
							>
								<MoreHorizontal class="size-4" strokeWidth={2} />
							</DropdownMenuTrigger>
							<DropdownMenuContent class="plan-editor min-w-48" align="end">
								<DropdownMenuItem
									disabled={sectionIndex === 0}
									onclick={() => moveSectionBy(section.id, -1)}
								>
									<ArrowUp /> Subir sección
								</DropdownMenuItem>
								<DropdownMenuItem
									disabled={sectionIndex === content.document.sections.length - 1}
									onclick={() => moveSectionBy(section.id, 1)}
								>
									<ArrowDown /> Bajar sección
								</DropdownMenuItem>
								<DropdownMenuItem onclick={() => addSectionBelow(section.id)}>
									<Plus /> Agregar sección debajo
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									variant="destructive"
									onclick={() => (retireOpen[`section-${section.id}`] = true)}
								>
									Retirar sección
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<RetireElement
							{content}
							targetId={section.id}
							kind="section"
							label={section.label || 'sección sin título'}
							bind:open={
								() => retireOpen[`section-${section.id}`] ?? false,
								(value) => (retireOpen[`section-${section.id}`] = value)
							}
							trigger={false}
							returnFocus={actionTriggers[`section-${section.id}`]}
							oncontentchange={change}
						/>
					</div>
				</CardHeader>

				<CardContent
					class="px-3 py-2 sm:px-4 sm:py-3"
					ondragover={(event) => itemListDragOver(event, section.id, sectionItems.length)}
					ondrop={(event) => dropItem(event, section.id)}
				>
					<ul class="divide-border divide-y" aria-labelledby={`section-${section.id}`}>
						{#each sectionItems as item, itemIndex (item.id)}
							<li
								class="editor-item transition-[opacity,transform] duration-150 ease-out"
								class:opacity-45={dragging?.kind === 'item' && dragging.itemId === item.id}
								ondragover={(event) =>
									itemDragOver(event, section.id, itemIndex, sectionItems.length)}
								ondrop={(event) => dropItem(event, section.id)}
							>
								<div class="group/item relative flex min-w-0 items-center gap-1.5 py-2.5 sm:gap-2">
									{#if detailsEnabled}
										<Button
											variant="ghost"
											size="icon"
											class="size-8"
											onclick={() => (expandedItemId = expandedItemId === item.id ? null : item.id)}
											aria-expanded={expandedItemId === item.id}
											aria-controls={`details-${section.id}-${item.id}`}
											aria-label={`${expandedItemId === item.id ? 'Ocultar' : 'Mostrar'} detalle de ${item.name || 'elemento'}`}
										>
											{#if expandedItemId === item.id}<ChevronDown size={16} />{:else}<ChevronRight
													size={16}
												/>{/if}
										</Button>
									{/if}
									<textarea
										bind:this={itemInputs[item.id]}
										class="focus-visible:border-ring focus-visible:ring-ring/50 field-sizing-content min-w-0 grow resize-none rounded-md border border-transparent bg-transparent px-2 py-1.5 font-medium outline-none focus-visible:ring-2"
										rows={1}
										value={item.name}
										oninput={(event) =>
											change(patchItemName(content, item.id, event.currentTarget.value))}
										placeholder={item.kind === 'course' ? 'Nombre de materia' : 'Nombre del hito'}
										aria-label={item.kind === 'course' ? 'Nombre de materia' : 'Nombre del hito'}
									></textarea>
									{#if item.kind === 'milestone'}
										<Badge variant="outline" class="hidden sm:inline-flex">Hito</Badge>
									{:else if item.credits !== undefined || item.hours !== undefined}
										<Badge variant="secondary" class="hidden tabular-nums sm:inline-flex">
											{item.credits === undefined ? `${item.hours} hs` : `${item.credits} cr`}
										</Badge>
									{/if}
									<button
										type="button"
										draggable="true"
										class="drag-handle text-muted-foreground hover:bg-muted hover:text-foreground hidden size-8 shrink-0 cursor-grab items-center justify-center rounded-md opacity-0 transition-opacity duration-150 ease-out focus-visible:opacity-100 active:cursor-grabbing sm:flex sm:group-hover/item:opacity-100"
										aria-label={`Arrastrar ${item.kind === 'course' ? 'materia' : 'hito'} ${item.name || 'sin nombre'}`}
										ondragstart={(event) =>
											startDrag(event, {
												kind: 'item',
												itemId: item.id,
												sectionId: section.id
											})}
										ondragend={endDrag}
									>
										<GripVertical class="size-4" strokeWidth={2} aria-hidden="true" />
									</button>
									<DropdownMenu>
										<DropdownMenuTrigger
											bind:ref={
												() => actionTriggers[`item-${item.id}`] ?? null,
												(value) => (actionTriggers[`item-${item.id}`] = value)
											}
											class="hover:bg-muted inline-flex size-9 shrink-0 items-center justify-center rounded-lg"
											aria-label={`Acciones de ${item.name || 'elemento'}`}
										>
											<MoreHorizontal class="size-4" strokeWidth={2} />
										</DropdownMenuTrigger>
										<DropdownMenuContent class="plan-editor min-w-52" align="end">
											<DropdownMenuItem
												disabled={itemIndex === 0}
												onclick={() => moveItemBy(item.id, section.id, -1)}
												><ArrowUp /> Subir</DropdownMenuItem
											>
											<DropdownMenuItem
												disabled={itemIndex === sectionItems.length - 1}
												onclick={() => moveItemBy(item.id, section.id, 1)}
												><ArrowDown /> Bajar</DropdownMenuItem
											>
											<DropdownMenuSub>
												<DropdownMenuSubTrigger>Mover a</DropdownMenuSubTrigger>
												<DropdownMenuSubContent class="plan-editor min-w-52">
													{#each content.document.sections as destination (destination.id)}
														{#if destination.id !== section.id}
															<DropdownMenuItem
																onclick={() =>
																	moveItemTo(
																		item.id,
																		section.id,
																		destination.id,
																		itemsInSection(content.document, destination.id).length
																	)}
															>
																{destination.label || 'Sección sin título'}
															</DropdownMenuItem>
														{/if}
													{/each}
													{#if item.kind === 'milestone'}
														<DropdownMenuItem
															onclick={() => moveItemTo(item.id, section.id, null, 0)}
															>Hitos generales</DropdownMenuItem
														>
													{/if}
												</DropdownMenuSubContent>
											</DropdownMenuSub>
											<DropdownMenuItem onclick={() => addCourseBelow(item.id, section.id)}>
												<Plus /> Insertar materia debajo
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												variant="destructive"
												onclick={() => (retireOpen[`item-${item.id}`] = true)}
												>Retirar</DropdownMenuItem
											>
										</DropdownMenuContent>
									</DropdownMenu>
									<RetireElement
										{content}
										targetId={item.id}
										kind="item"
										label={item.name || 'elemento sin nombre'}
										wasPublished={publishedItemIds.includes(item.id)}
										bind:open={
											() => retireOpen[`item-${item.id}`] ?? false,
											(value) => (retireOpen[`item-${item.id}`] = value)
										}
										trigger={false}
										returnFocus={actionTriggers[`item-${item.id}`]}
										oncontentchange={change}
									/>
								</div>

								{#if detailsEnabled && expandedItemId === item.id}
									<div
										id={`details-${section.id}-${item.id}`}
										class="border-border bg-muted/25 grid gap-5 border-t px-2 py-5 text-sm sm:px-10 [&>*+*]:border-t [&>*+*]:pt-5"
									>
										{#if item.kind === 'course'}
											<CourseFields
												{item}
												onpatch={(patch) => change(patchCourse(content, item.id, patch))}
											/>
											<RequirementEditor
												{content}
												itemId={item.id}
												scope="enroll"
												oncontentchange={change}
											/>
										{/if}
										<RequirementEditor
											{content}
											itemId={item.id}
											scope="complete"
											oncontentchange={change}
										/>
										<PlacementEditor {content} itemId={item.id} oncontentchange={change} />
										{#if item.kind === 'milestone' && item.requirements?.enroll}
											<p>
												Condición de inicio conservada: {describeRequirement(
													item.requirements.enroll,
													content.document
												)}
											</p>
										{/if}
									</div>
								{/if}
							</li>
						{:else}
							<li class="text-muted-foreground px-2 py-8 text-center text-sm">
								Esta sección está vacía. Agregá una materia o arrastrá un elemento hasta acá.
							</li>
						{/each}
					</ul>

					<div class="border-border mt-2 flex flex-col gap-2 border-t pt-3 sm:flex-row">
						<Button
							variant="outline"
							class="h-9 grow border-dashed"
							aria-label="+ Materia"
							onclick={() => addBlankCourse(section.id)}><Plus class="size-4" /> Materia</Button
						>
						<Button
							variant="outline"
							class="h-9 grow border-dashed sm:grow-0"
							aria-label="+ Hito"
							onclick={() => addBlankMilestone(section.id)}><Plus class="size-4" /> Hito</Button
						>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	<Button
		variant="outline"
		class="h-10 w-full border-dashed"
		aria-label="+ Agregar sección"
		onclick={addBlankSection}
	>
		<Plus class="size-4" /> Agregar sección
	</Button>

	<Card class="overflow-visible py-0">
		<CardHeader class="border-border border-b px-4 py-4">
			<div class="flex items-center justify-between gap-3">
				<div>
					<h2 id="general-milestones-heading" class="font-semibold">Hitos generales</h2>
					<p class="text-muted-foreground mt-0.5 text-sm">
						Requisitos que no pertenecen a una sección concreta.
					</p>
				</div>
				<Badge variant="secondary" class="tabular-nums">{unplacedMilestones.length}</Badge>
			</div>
		</CardHeader>
		<CardContent
			class="px-3 py-2 sm:px-4 sm:py-3"
			ondragover={(event) => itemListDragOver(event, null, unplacedMilestones.length)}
			ondrop={(event) => dropItem(event, null)}
		>
			<ul class="divide-border divide-y" aria-labelledby="general-milestones-heading">
				{#each unplacedMilestones as item, itemIndex (item.id)}
					<li
						class="transition-[opacity,transform] duration-150 ease-out"
						class:opacity-45={dragging?.kind === 'item' && dragging.itemId === item.id}
						ondragover={(event) => itemDragOver(event, null, itemIndex, unplacedMilestones.length)}
						ondrop={(event) => dropItem(event, null)}
					>
						<div class="group/item relative flex min-w-0 items-center gap-2 py-2.5">
							<Button
								variant="ghost"
								size="icon"
								class="size-8"
								onclick={() => (expandedItemId = expandedItemId === item.id ? null : item.id)}
								aria-expanded={expandedItemId === item.id}
								aria-controls={`details-general-${item.id}`}
								aria-label={`${expandedItemId === item.id ? 'Ocultar' : 'Mostrar'} detalle de ${item.name || 'hito'}`}
							>
								{#if expandedItemId === item.id}<ChevronDown size={16} />{:else}<ChevronRight
										size={16}
									/>{/if}
							</Button>
							<textarea
								bind:this={itemInputs[item.id]}
								class="focus-visible:border-ring focus-visible:ring-ring/50 field-sizing-content min-w-0 grow resize-none rounded-md border border-transparent bg-transparent px-2 py-1.5 font-medium outline-none focus-visible:ring-2"
								rows={1}
								value={item.name}
								oninput={(event) =>
									change(patchItemName(content, item.id, event.currentTarget.value))}
								placeholder="Nombre del hito"
								aria-label="Nombre del hito general"
							></textarea>
							<button
								type="button"
								draggable="true"
								class="drag-handle text-muted-foreground hover:bg-muted hover:text-foreground hidden size-8 shrink-0 cursor-grab items-center justify-center rounded-md opacity-0 transition-opacity duration-150 ease-out focus-visible:opacity-100 active:cursor-grabbing sm:flex sm:group-hover/item:opacity-100"
								aria-label={`Arrastrar hito ${item.name || 'sin nombre'}`}
								ondragstart={(event) =>
									startDrag(event, { kind: 'item', itemId: item.id, sectionId: null })}
								ondragend={endDrag}
							>
								<GripVertical class="size-4" strokeWidth={2} aria-hidden="true" />
							</button>
							<DropdownMenu>
								<DropdownMenuTrigger
									bind:ref={
										() => actionTriggers[`item-${item.id}`] ?? null,
										(value) => (actionTriggers[`item-${item.id}`] = value)
									}
									class="hover:bg-muted inline-flex size-9 shrink-0 items-center justify-center rounded-lg"
									aria-label={`Acciones de ${item.name || 'hito'}`}
								>
									<MoreHorizontal class="size-4" strokeWidth={2} />
								</DropdownMenuTrigger>
								<DropdownMenuContent class="plan-editor min-w-52" align="end">
									<DropdownMenuItem
										disabled={itemIndex === 0}
										onclick={() => moveItemTo(item.id, null, null, itemIndex - 1)}
										><ArrowUp /> Subir</DropdownMenuItem
									>
									<DropdownMenuItem
										disabled={itemIndex === unplacedMilestones.length - 1}
										onclick={() => moveItemTo(item.id, null, null, itemIndex + 1)}
										><ArrowDown /> Bajar</DropdownMenuItem
									>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>Mover a</DropdownMenuSubTrigger>
										<DropdownMenuSubContent class="plan-editor min-w-52">
											{#each content.document.sections as destination (destination.id)}
												<DropdownMenuItem
													onclick={() =>
														moveItemTo(
															item.id,
															null,
															destination.id,
															itemsInSection(content.document, destination.id).length
														)}
												>
													{destination.label || 'Sección sin título'}
												</DropdownMenuItem>
											{/each}
										</DropdownMenuSubContent>
									</DropdownMenuSub>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										variant="destructive"
										onclick={() => (retireOpen[`item-${item.id}`] = true)}>Retirar</DropdownMenuItem
									>
								</DropdownMenuContent>
							</DropdownMenu>
							<RetireElement
								{content}
								targetId={item.id}
								kind="item"
								label={item.name || 'hito sin nombre'}
								wasPublished={publishedItemIds.includes(item.id)}
								bind:open={
									() => retireOpen[`item-${item.id}`] ?? false,
									(value) => (retireOpen[`item-${item.id}`] = value)
								}
								trigger={false}
								returnFocus={actionTriggers[`item-${item.id}`]}
								oncontentchange={change}
							/>
						</div>
						{#if expandedItemId === item.id}
							<div
								id={`details-general-${item.id}`}
								class="border-border bg-muted/25 grid gap-5 border-t px-2 py-5 text-sm sm:px-10 [&>*+*]:border-t [&>*+*]:pt-5"
							>
								<RequirementEditor
									{content}
									itemId={item.id}
									scope="complete"
									oncontentchange={change}
								/>
								{#if item.requirements?.enroll}
									<p>
										Condición de inicio conservada: {describeRequirement(
											item.requirements.enroll,
											content.document
										)}
									</p>
								{/if}
							</div>
						{/if}
					</li>
				{:else}
					<li class="text-muted-foreground py-5 text-center text-sm">
						Todavía no hay hitos generales.
					</li>
				{/each}
			</ul>
			<Button
				variant="outline"
				class="mt-3 h-9 w-full border-dashed"
				aria-label="+ Agregar hito general"
				onclick={() => addBlankMilestone()}><Plus class="size-4" /> Agregar hito general</Button
			>
		</CardContent>
	</Card>

	<Card class="p-4 sm:p-5">
		<GraduationEditor {content} oncontentchange={change} />
	</Card>
	<GraduationPreview {content} />
</div>
