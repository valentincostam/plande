<script lang="ts">
	import { enhance } from '$app/forms';
	import type { DraftPlanContent, EditorItem } from './draft-plan-content';
	import { parseDraftImport, type DraftImportDiagnostic } from './draft-import';
	import { draftImportPrompt, draftImportRepairPrompt } from './draft-import-prompt';
	import { courseTypeLabels } from '$lib/course-type';
	import { courseTermLabels } from '$lib/course-term';
	import { describeRequirement } from '$lib/formatters/study-plan-document';
	import { itemsInSection } from './structure';
	import Button from './ui/button.svelte';

	let {
		version,
		subject,
		allowed = true,
		onsubmittingchange
	}: {
		version: number;
		subject: string;
		allowed?: boolean;
		onsubmittingchange?: (value: boolean) => void;
	} = $props();

	let response = $state('');
	let preview = $state<DraftPlanContent | undefined>(undefined);
	let diagnostics = $state<DraftImportDiagnostic[]>([]);
	let copyError = $state('');
	let showPrompt = $state(false);
	let importError = $state('');
	let submitting = $state(false);
	const canConfirm = $derived(Boolean(preview));

	function resetValidation() {
		preview = undefined;
		diagnostics = [];
		importError = '';
	}

	function validate() {
		const result = parseDraftImport(response);
		preview = result.ok ? result.content : undefined;
		diagnostics = result.diagnostics;
	}

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(draftImportPrompt);
			copyError = '';
			showPrompt = false;
		} catch {
			copyError = 'No pudimos copiarlo. Seleccioná y copiá el texto siguiente.';
			showPrompt = true;
		}
	}

	async function copyRepairPrompt() {
		try {
			await navigator.clipboard.writeText(draftImportRepairPrompt(diagnostics));
			copyError = '';
		} catch {
			copyError = 'No pudimos copiarlo. Seleccioná y copiá el pedido de corrección.';
		}
	}

	function cancel() {
		response = '';
		resetValidation();
		copyError = '';
		showPrompt = false;
	}

	function unknownNote(content: DraftPlanContent, scope: string) {
		return content.unknownRequirements.find((entry) => entry.scope === scope)?.note;
	}

	function itemDetails(item: EditorItem) {
		const details = [item.code, item.kind === 'course' ? courseTypeLabels[item.type] : 'Hito'];
		if (item.kind === 'course') {
			if (item.hours !== undefined) details.push(`${item.hours} horas`);
			if (item.totalHours !== undefined) details.push(`${item.totalHours} horas totales`);
			if (item.credits !== undefined) details.push(`${item.credits} créditos`);
		}
		return details.filter(Boolean).join(' · ');
	}

	function placementDetails(item: EditorItem, sectionId: string) {
		return item.placements
			.filter((placement) => placement.sectionId === sectionId)
			.map((placement) =>
				[
					placement.term === undefined ? undefined : courseTermLabels[placement.term],
					placement.order === undefined ? undefined : `Orden: ${placement.order}`
				]
					.filter(Boolean)
					.join(' · ')
			)
			.filter(Boolean)
			.join(' / ');
	}

	function isDiagnostic(value: unknown): value is DraftImportDiagnostic {
		return (
			typeof value === 'object' &&
			value !== null &&
			'code' in value &&
			typeof value.code === 'string' &&
			'path' in value &&
			typeof value.path === 'string' &&
			'message' in value &&
			typeof value.message === 'string'
		);
	}
</script>

<details class="rounded border border-gray-300 p-3">
	<summary class="cursor-pointer font-medium">Importar con mi IA</summary>
	<div class="mt-3 grid gap-3">
		<p class="text-sm text-gray-600">
			Copiá el prompt, usalo con tu IA y pegá solo su respuesta JSON.
		</p>
		<div class="flex flex-wrap gap-2">
			<Button type="button" variant="outline" onclick={copyPrompt}>Copiar prompt</Button>
			<Button type="button" variant="ghost" onclick={() => (showPrompt = !showPrompt)}
				>{showPrompt ? 'Ocultar prompt' : 'Ver prompt'}</Button
			>
		</div>
		{#if copyError}<p role="alert" class="text-sm text-amber-800">{copyError}</p>{/if}
		{#if showPrompt}
			<textarea
				class="min-h-48 w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
				readonly
				value={draftImportPrompt}
				aria-label="Prompt para copiar"
			></textarea>
		{/if}

		<label class="grid gap-1" for="draft-import-response">
			<span>Respuesta JSON</span>
			<textarea
				id="draft-import-response"
				class="min-h-48 w-full rounded border border-gray-300 bg-transparent p-2 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
				value={response}
				oninput={(event) => {
					response = event.currentTarget.value;
					resetValidation();
				}}
			></textarea>
		</label>
		<div class="flex flex-wrap gap-2">
			<Button type="button" variant="outline" disabled={response.trim() === ''} onclick={validate}
				>Validar</Button
			>
			<Button type="button" variant="ghost" onclick={cancel}>Cancelar</Button>
		</div>

		{#if diagnostics.length}
			<section aria-labelledby="draft-import-diagnostics" class="grid gap-2">
				<h3 id="draft-import-diagnostics" class="font-medium">Corregí la respuesta</h3>
				<ul class="grid gap-1 text-sm">
					{#each diagnostics as diagnostic, index (`${diagnostic.code}:${diagnostic.path}:${index}`)}
						<li><code>{diagnostic.code}</code> {diagnostic.path}: {diagnostic.message}</li>
					{/each}
				</ul>
				<Button type="button" variant="outline" onclick={copyRepairPrompt}
					>Copiar pedido de corrección</Button
				>
				<textarea
					class="min-h-32 w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
					readonly
					value={draftImportRepairPrompt(diagnostics)}
					aria-label="Pedido de corrección para copiar"
				></textarea>
			</section>
		{/if}

		{#if preview}
			<section aria-labelledby="draft-import-preview" class="grid gap-2">
				<h3 id="draft-import-preview" class="font-medium">Vista previa</h3>
				{#each preview.document.sections as section (section.id)}
					<div class="border-l border-gray-300 pl-3">
						<h4>
							{section.label || 'Sección sin título'}{section.year === undefined
								? ''
								: ` · Año ${section.year}`}
						</h4>
						<ul class="text-sm">
							{#each itemsInSection(preview.document, section.id) as item (item.id)}
								<li>
									<span>{item.name || 'Ítem sin nombre'}</span>
									<div>{itemDetails(item)}</div>
									{#if placementDetails(item, section.id)}
										<div>{placementDetails(item, section.id)}</div>
									{/if}
									{#if item.tags?.length}<div>Etiquetas: {item.tags.join(', ')}</div>{/if}
									{#if item.requirements?.enroll}
										<div>
											Para cursar: {describeRequirement(item.requirements.enroll, preview.document)}
										</div>
									{/if}
									{#if unknownNote(preview, `item:${item.id}:enroll`)}
										<div>Para cursar: {unknownNote(preview, `item:${item.id}:enroll`)}</div>
									{/if}
									{#if item.requirements?.complete}
										<div>
											Para completar: {describeRequirement(
												item.requirements.complete,
												preview.document
											)}
										</div>
									{/if}
									{#if unknownNote(preview, `item:${item.id}:complete`)}
										<div>Para completar: {unknownNote(preview, `item:${item.id}:complete`)}</div>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
				{#if preview.document.items.some((item) => item.placements.length === 0)}
					<div class="border-l border-gray-300 pl-3">
						<h4>Sin ubicación</h4>
						<ul class="text-sm">
							{#each preview.document.items.filter((item) => item.placements.length === 0) as item (item.id)}
								<li>
									<span>{item.name || 'Ítem sin nombre'}</span>
									<div>{itemDetails(item)}</div>
									{#if item.tags?.length}<div>Etiquetas: {item.tags.join(', ')}</div>{/if}
									{#if item.requirements?.enroll}
										<div>
											Para cursar: {describeRequirement(item.requirements.enroll, preview.document)}
										</div>
									{/if}
									{#if unknownNote(preview, `item:${item.id}:enroll`)}
										<div>Para cursar: {unknownNote(preview, `item:${item.id}:enroll`)}</div>
									{/if}
									{#if item.requirements?.complete}
										<div>
											Para completar: {describeRequirement(
												item.requirements.complete,
												preview.document
											)}
										</div>
									{/if}
									{#if unknownNote(preview, `item:${item.id}:complete`)}
										<div>Para completar: {unknownNote(preview, `item:${item.id}:complete`)}</div>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if preview.document.requirements.graduation?.length}
					<div class="border-l border-gray-300 pl-3">
						<h4>Graduación</h4>
						<ul class="text-sm">
							{#each preview.document.requirements.graduation as requirement (requirement.id)}
								<li>
									<span>{requirement.label || 'Condición sin etiqueta'}</span>
									{#if requirement.weight !== undefined}<div>Peso: {requirement.weight}</div>{/if}
									{#if requirement.expr}
										<div>{describeRequirement(requirement.expr, preview.document)}</div>
									{/if}
									{#if unknownNote(preview, `graduation:${requirement.id}`)}
										<div>{unknownNote(preview, `graduation:${requirement.id}`)}</div>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if preview.unsupportedContent.length}
					<div class="border-l border-gray-300 pl-3">
						<h4>Dudas conservadas</h4>
						<ul class="text-sm">
							{#each preview.unsupportedContent as unsupported, index (`${unsupported.path}:${index}`)}
								<li>
									<details>
										<summary>Contenido sin editor: {unsupported.path}</summary>
										<pre class="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(
												unsupported.value,
												null,
												2
											)}</pre>
									</details>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</section>
		{/if}

		<form
			method="POST"
			action="?/importDraft"
			use:enhance={() => {
				submitting = true;
				onsubmittingchange?.(true);
				importError = '';
				return async ({ result, update }) => {
					try {
						if (result.type === 'failure') {
							importError =
								(typeof result.data === 'object' &&
									result.data &&
									'error' in result.data &&
									typeof result.data.error === 'string' &&
									result.data.error) ||
								'No pudimos importar el borrador.';
							if (
								typeof result.data === 'object' &&
								result.data &&
								'importDiagnostics' in result.data &&
								Array.isArray(result.data.importDiagnostics)
							)
								diagnostics = result.data.importDiagnostics.filter(isDiagnostic);
							return;
						}
						if (result.type === 'error') {
							importError =
								'No pudimos importar el borrador. Conservamos tu respuesta para reintentar.';
							return;
						}
						await update();
					} finally {
						submitting = false;
						onsubmittingchange?.(false);
					}
				};
			}}
		>
			<input type="hidden" name="json" value={response} />
			<input type="hidden" name="baseVersion" value={version} />
			<input type="hidden" name="editorSubject" value={subject} />
			{#if !allowed}
				<p role="status" class="text-sm text-amber-800">
					El borrador tiene cambios locales. Conservamos la respuesta, pero no podemos importarla
					sobre esos cambios.
				</p>
			{/if}
			{#if importError}<p role="alert" class="text-sm text-red-700">{importError}</p>{/if}
			<Button type="submit" disabled={!canConfirm || !allowed || submitting}
				>Confirmar importación</Button
			>
		</form>
	</div>
</details>
