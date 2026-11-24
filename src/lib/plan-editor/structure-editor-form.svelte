<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount, untrack } from 'svelte';
	import { z } from 'zod';
	import { draftPlanContentSchema, type DraftPlanContent } from './draft-plan-content';
	import { mergeSectionPatches, type SectionPatch } from './section-patches';
	import {
		editorChanges,
		changeKey,
		choiceKey,
		changeValue,
		type EditorRecoveries
	} from './editor-changes';
	import { resolveEditorChange } from './editor-conflict-resolution';
	import StructureEditor from './structure-editor.svelte';
	import DraftImportEditor from './draft-import-editor.svelte';
	import { isEmptyDraft } from './draft-import';
	import Button from './ui/button.svelte';
	import { LoaderCircle } from '@lucide/svelte';

	let {
		content: initial,
		version,
		planId,
		subject,
		publishedItemIds = []
	}: {
		content: DraftPlanContent;
		version: number;
		planId: string;
		subject: string;
		publishedItemIds?: readonly string[];
	} = $props();
	const snapshotSchema = z.strictObject({
		content: draftPlanContentSchema,
		version: z.number().int().nonnegative()
	});
	const recoverySchema = z.strictObject({
		content: draftPlanContentSchema,
		historyVersion: z.number().int().nonnegative()
	});
	const recoveriesSchema = z.strictObject({
		items: z.record(z.string(), recoverySchema),
		sections: z.record(z.string(), recoverySchema)
	});
	const pendingSchema = z.strictObject({
		base: snapshotSchema,
		content: draftPlanContentSchema,
		recoveries: recoveriesSchema.optional().default({ items: {}, sections: {} })
	});
	let base = $state(untrack(() => ({ content: structuredClone(initial), version })));
	let remote = $state(untrack(() => ({ content: structuredClone(initial), version })));
	let content = $state<DraftPlanContent>(untrack(() => structuredClone(initial)));
	let recoveries = $state<EditorRecoveries>({ items: {}, sections: {} });
	let choices = $state<Record<string, 'local' | 'remote'>>({});
	let saving = $state(false);
	let importing = $state(false);
	let ready = $state(false);
	let storageError = $state('');
	let accountChanged = $state(false);
	let resolutionError = $state('');
	let unreadableCache = $state(false);
	const storageKey = $derived(`plande-draft-pending:${subject}:${planId}`);
	const patches = $derived(
		editorChanges(
			$state.snapshot(base.content),
			$state.snapshot(content),
			$state.snapshot(recoveries)
		)
	);
	const recoveryHistory = $derived(
		new Map(
			[...Object.values(recoveries.items), ...Object.values(recoveries.sections)].map(
				(recovery) => [recovery.historyVersion, structuredClone($state.snapshot(recovery.content))]
			)
		)
	);
	const merge = $derived(
		patches.length
			? mergeSectionPatches(
					$state.snapshot(base.content),
					$state.snapshot(remote.content),
					$state.snapshot(patches),
					recoveryHistory
				)
			: { content: $state.snapshot(remote.content) }
	);
	const conflicts = $derived('conflicts' in merge ? (merge.conflicts ?? []) : []);
	const alternatives = $derived(patches.filter((patch) => conflicts.includes(changeKey(patch))));

	onMount(() => {
		try {
			const stored = localStorage.getItem(storageKey);
			if (stored) {
				const pending = pendingSchema.parse(JSON.parse(stored));
				const pendingHistory = new Map(
					[
						...Object.values(pending.recoveries.items),
						...Object.values(pending.recoveries.sections)
					].map((recovery) => [recovery.historyVersion, structuredClone(recovery.content)])
				);
				const recovered = mergeSectionPatches(
					pending.base.content,
					$state.snapshot(remote.content),
					editorChanges(pending.base.content, pending.content, pending.recoveries),
					pendingHistory
				);
				if (
					!('conflicts' in recovered) &&
					JSON.stringify(recovered.content) === JSON.stringify(remote.content)
				)
					localStorage.removeItem(storageKey);
				else {
					base = pending.base;
					content = pending.content;
					recoveries = pending.recoveries;
				}
			}
		} catch {
			unreadableCache = true;
			storageError =
				'No pudimos recuperar la copia local anterior y no la borramos. Los cambios nuevos no tendrán copia local: guardalos antes de cerrar o recargar.';
		}
		ready = true;
	});

	function persist() {
		if (unreadableCache) return;
		try {
			if (patches.length)
				localStorage.setItem(storageKey, JSON.stringify({ base, content, recoveries }));
			else localStorage.removeItem(storageKey);
			storageError = '';
		} catch {
			storageError = 'No pudimos conservar una copia local. Guardá antes de cerrar o recargar.';
		}
	}
	$effect(() => {
		if (ready) persist();
	});

	function choose(key: string, choice: 'local' | 'remote') {
		resolutionError = '';
		choices = { ...choices, [key]: choice };
		if (!alternatives.every((patch) => choices[choiceKey(patch)])) return;
		let resolved = merge.content;
		let nextRecoveries = structuredClone($state.snapshot(recoveries));
		for (const patch of alternatives) {
			if (choices[choiceKey(patch)] === 'local') {
				const itemId = itemIdFor(patch);
				const sectionId = sectionIdFor(patch);
				const historical = (itemId ? nextRecoveries.items[itemId] : undefined) ??
					(sectionId ? nextRecoveries.sections[sectionId] : undefined) ?? {
						historyVersion: base.version,
						content: $state.snapshot(base.content)
					};
				const chosen = resolveEditorChange(
					$state.snapshot(remote.content),
					resolved,
					$state.snapshot(content),
					$state.snapshot(patch),
					{ version: historical.historyVersion, content: historical.content }
				);
				if (!chosen) {
					resolutionError =
						'Ese cambio no se puede aplicar sobre el borrador actual. Conservamos tu copia para que puedas corregirla.';
					return;
				}
				if (itemId && !remote.content.document.items.some((item) => item.id === itemId))
					nextRecoveries.items[itemId] ??= historical;
				if (
					sectionId &&
					!remote.content.document.sections.some((section) => section.id === sectionId)
				)
					nextRecoveries.sections[sectionId] ??= historical;
				resolved = chosen;
			}
		}
		base = structuredClone($state.snapshot(remote));
		content = resolved;
		recoveries = nextRecoveries;
		choices = {};
	}

	function itemIdFor(patch: SectionPatch): string | undefined {
		if (patch.op === 'course.create' || patch.op === 'milestone.create') return patch.item.id;
		if (
			patch.op === 'item.rename' ||
			patch.op === 'item.remove' ||
			patch.op === 'item.restore' ||
			patch.op === 'course.patch' ||
			patch.op === 'requirement.replace' ||
			patch.op === 'placement.create' ||
			patch.op === 'placement.patch' ||
			patch.op === 'placement.remove'
		)
			return patch.itemId;
	}

	function sectionIdFor(patch: SectionPatch): string | undefined {
		if (patch.op === 'section.create') return patch.section.id;
		if (
			patch.op === 'section.rename' ||
			patch.op === 'section.remove' ||
			patch.op === 'section.restore' ||
			patch.op === 'section.reorder'
		)
			return patch.sectionId;
	}
</script>

{#if resolutionError}<p role="alert" class="my-3 text-sm text-red-700">{resolutionError}</p>{/if}

{#if storageError}<p role="alert" class="my-3 text-sm text-amber-800">{storageError}</p>{/if}
{#each alternatives as patch (choiceKey(patch))}
	{@const localValue = changeValue(patch, $state.snapshot(content))}
	{@const remoteValue = changeValue(patch, $state.snapshot(remote.content))}
	{@const nameChange = [
		'section.rename',
		'item.rename',
		'course.rename',
		'section.create',
		'course.create',
		'milestone.create'
	].includes(patch.op)}
	{@const deletedItemId = itemIdFor(patch)}
	{@const deletedItem =
		deletedItemId && !remote.content.document.items.some((item) => item.id === deletedItemId)}
	{@const deletedItemKind = deletedItemId
		? content.document.items.find((item) => item.id === deletedItemId)?.kind
		: undefined}
	{@const deletedSectionId = sectionIdFor(patch)}
	{@const deletedSection =
		deletedSectionId &&
		!remote.content.document.sections.some((section) => section.id === deletedSectionId)}
	{@const heading = deletedItem
		? deletedItemKind === 'milestone'
			? 'Recuperá el hito eliminado'
			: 'Recuperá la materia eliminada'
		: deletedSection
			? 'Recuperá la sección eliminada'
			: nameChange
				? 'Elegí qué nombre conservar'
				: 'Elegí qué cambio conservar'}
	<section aria-label={heading} class="border-border bg-muted/30 my-6 rounded-lg border p-4 sm:p-6">
		<h3 class="font-semibold">{heading}</h3>
		<div class="mt-4 grid gap-6 sm:grid-cols-2">
			<div>
				<p class="text-sm">Tu cambio</p>
				<p>{localValue}</p>
				<Button
					variant="outline"
					class="mt-1 h-auto min-h-9 justify-start py-2 text-left whitespace-normal"
					onclick={() => choose(choiceKey(patch), 'local')}
					aria-pressed={choices[choiceKey(patch)] === 'local'}
					>{deletedItem
						? deletedItemKind === 'milestone'
							? 'Recuperar mi hito'
							: 'Recuperar mi materia'
						: deletedSection
							? 'Recuperar mi sección'
							: nameChange
								? 'Usar mi nombre'
								: 'Usar mi cambio'}: {localValue}</Button
				>
			</div>
			<div>
				<p class="text-sm">Último cambio guardado</p>
				<p>{remoteValue}</p>
				<Button
					variant="outline"
					class="mt-1 h-auto min-h-9 justify-start py-2 text-left whitespace-normal"
					onclick={() => choose(choiceKey(patch), 'remote')}
					aria-pressed={choices[choiceKey(patch)] === 'remote'}
					>{nameChange ? 'Usar el nombre más reciente' : 'Usar el cambio más reciente'}: {remoteValue}</Button
				>
			</div>
		</div>
	</section>
{/each}

{#if ready && !accountChanged && !unreadableCache && isEmptyDraft(remote.content)}
	<DraftImportEditor
		version={remote.version}
		{subject}
		allowed={!patches.length && isEmptyDraft(content)}
		onsubmittingchange={(value) => (importing = value)}
	/>
{/if}

<form
	method="POST"
	action="?/editSections"
	use:enhance={() => {
		saving = true;
		persist();
		return async ({ result, update }) => {
			try {
				if (
					result.type === 'failure' &&
					result.data &&
					'accountChanged' in result.data &&
					result.data.accountChanged
				)
					accountChanged = true;
				if (result.type === 'failure' && result.data && 'editorConflict' in result.data) {
					const latest = snapshotSchema.safeParse(result.data.editorConflict);
					if (latest.success) {
						remote = latest.data;
						choices = {};
					}
				}
				if (!unreadableCache && (result.type === 'redirect' || result.type === 'success')) {
					try {
						localStorage.removeItem(storageKey);
					} catch {
						/* The next load reconciles an older copy. */
					}
				}
				await update({ reset: false });
			} finally {
				saving = false;
			}
		};
	}}
>
	<input type="hidden" name="operation" value="patches" />
	<input type="hidden" name="editorSubject" value={subject} />
	<input type="hidden" name="baseVersion" value={base.version} />
	<input type="hidden" name="patches" value={JSON.stringify(patches)} />
	<fieldset
		disabled={!ready || saving || importing || accountChanged}
		class="min-w-0 pb-20"
		aria-busy={!ready || saving || importing}
	>
		<StructureEditor
			{content}
			basicOnly
			metadataEnabled
			{publishedItemIds}
			oncontentchange={(next) => {
				content = next;
				choices = {};
			}}
		/>
	</fieldset>
	<div
		class="bg-card sticky bottom-4 z-20 mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-[var(--shadow-border-hover)]"
	>
		<p role="status" class="text-muted-foreground text-sm">
			{saving
				? 'Guardando cambios…'
				: patches.length
					? 'Cambios sin guardar'
					: 'Sin cambios pendientes'}
		</p>
		<Button
			type="submit"
			disabled={!ready ||
				saving ||
				importing ||
				accountChanged ||
				patches.length === 0 ||
				alternatives.length > 0}
			>{#if saving}<LoaderCircle class="size-4 animate-spin" aria-hidden="true" />{/if}Guardar
			cambios</Button
		>
	</div>
</form>
