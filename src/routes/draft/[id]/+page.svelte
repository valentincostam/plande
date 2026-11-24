<script lang="ts">
	import '$lib/plan-editor/editor.css';
	import { resolve } from '$app/paths';
	import { ArrowLeft, ArrowRight, ChevronDown } from '@lucide/svelte';
	import Input from '$lib/plan-editor/ui/input.svelte';
	import Button from '$lib/plan-editor/ui/button.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Card } from '$lib/components/ui/card/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import StructureEditorForm from '$lib/plan-editor/structure-editor-form.svelte';
	import DraftSourceForm from '$lib/plan-editor/draft-source-form.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const draft = $derived(data.draft);
	const editor = $derived(data.editor);
	const publication = $derived(data.publication);
	const proposal = $derived(data.proposal);
	let sourcesOpen = $state(false);
</script>

<svelte:head>
	<title>
		{draft.offer.offer} | {publication?.published
			? 'Propuesta de corrección'
			: 'Borrador sin revisión'} | Plande
	</title>
</svelte:head>

<main class="plan-editor bg-background mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
	<nav
		aria-label="Navegación del borrador"
		class="text-muted-foreground mb-5 flex items-center justify-between gap-4 text-sm"
	>
		<a
			class="hover:text-foreground inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
			href={resolve('/')}
		>
			<ArrowLeft class="size-3.5" strokeWidth={1.75} aria-hidden="true" />
			Plande
		</a>
		<a
			class="hover:text-foreground inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
			href={resolve('/draft/[id]/review', { id: draft.id })}
		>
			Revisar el plan completo
			<ArrowRight class="size-3.5" strokeWidth={1.75} aria-hidden="true" />
		</a>
	</nav>
	<Card class="overflow-visible p-5 sm:p-7">
		<header>
			{#if publication?.published}
				<div class="flex flex-wrap items-center gap-2" role="status">
					<Badge variant="secondary">Propuesta de corrección</Badge>
					<a class="underline" href={resolve('/[slug]', { slug: publication.canonicalSlug })}
						>Ver publicación vigente</a
					>
				</div>
			{:else}
				<Badge variant="secondary" role="status">Borrador pendiente de revisión</Badge>
			{/if}
			<h1 class="mt-4 text-2xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
				{draft.offer.offer}
			</h1>
			<p class="text-muted-foreground mt-3 text-sm leading-relaxed">
				{draft.offer.university}{#if draft.offer.faculty}
					· {draft.offer.faculty}{/if}
			</p>
			{#if draft.year !== null}<p class="text-muted-foreground mt-1 text-sm">
					Plan {draft.year}{#if data.pendingYear}
						· Año propuesto, pendiente de publicación{/if}
				</p>{/if}
			{#if proposal}<p class="mt-4 text-sm leading-relaxed">{proposal.argument}</p>{/if}
			{#if draft.offer.campus}<p class="text-sm">Sede: {draft.offer.campus}</p>{/if}
			{#if draft.offer.modality}<p class="text-sm">Modalidad: {draft.offer.modality}</p>{/if}
		</header>
	</Card>

	<Collapsible.Root bind:open={sourcesOpen} class="border-border mt-5 border-y">
		<Collapsible.Trigger
			class="hover:text-foreground flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-start text-sm font-medium"
		>
			<span>Fuentes y datos del plan</span>
			<ChevronDown
				class={`text-muted-foreground size-4 shrink-0 transition-transform duration-150 ease-out ${sourcesOpen ? 'rotate-180' : ''}`}
				strokeWidth={1.75}
				aria-hidden="true"
			/>
		</Collapsible.Trigger>
		<Collapsible.Content>
			<div class="grid gap-8 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)]">
				<section aria-labelledby="sources-heading" class="min-w-0">
					<h2 id="sources-heading" class="text-sm font-semibold">Fuentes para comparar</h2>
					{#if draft.sources.length === 0}
						<p class="text-muted-foreground mt-1 text-sm">Todavía no hay fuentes para comparar.</p>
					{:else if draft.year === null}
						<p class="text-muted-foreground mt-1 text-sm">
							La fuente no identifica el año del plan. Compará los documentos antes de continuar.
						</p>
					{/if}
					{#if draft.sources.length > 0}
						<ul class="mt-3 grid gap-2">
							{#each draft.sources as source, position (position)}
								<li>
									<!-- eslint-disable svelte/no-navigation-without-resolve -- validated external source URLs are not app routes -->
									<a
										class="underline underline-offset-2"
										href={source.url}
										rel="noreferrer"
										target="_blank">{source.label}</a
									>
									<!-- eslint-enable svelte/no-navigation-without-resolve -->
								</li>
							{/each}
						</ul>
					{/if}
				</section>
				{#if data.auth && editor && data.editorSubject}
					<section aria-labelledby="add-source-heading">
						<h2 id="add-source-heading" class="text-sm font-semibold">Agregar una fuente</h2>
						<DraftSourceForm
							subject={data.editorSubject}
							revision={editor.reviewInvalidationRevision}
						/>
					</section>
				{/if}

				{#if data.auth && draft.year === null && (!publication?.published || proposal)}
					<form method="POST" action="?/setYear" class="grid max-w-sm gap-3 md:col-span-2">
						<input type="hidden" name="editorSubject" value={data.editorSubject} />
						<label class="grid gap-1.5 text-sm"
							><span class="font-medium">Año que figura en la fuente</span><Input
								name="year"
								inputmode="numeric"
								required
							/></label
						>
						<Button class="justify-self-start" type="submit">Completar año del plan</Button>
						{#if proposal}<p class="text-sm">
								El año se actualizará en el plan cuando se apruebe y publique esta corrección.
							</p>{/if}
					</form>
				{/if}
			</div>
		</Collapsible.Content>
	</Collapsible.Root>

	{#if form?.error}<p
			class="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900"
			role="alert"
		>
			{form.error}
		</p>{/if}
	{#if data.auth && editor}
		<section class="mt-8" aria-labelledby="structure-heading">
			<div class="mb-5">
				<h2 id="structure-heading" class="text-xl font-bold tracking-tight">Estructura del plan</h2>
			</div>
			{#key `${draft.id}:${editor.version}:${data.editorSubject}`}
				<StructureEditorForm
					content={editor.content}
					publishedItemIds={data.publishedItemIds}
					version={editor.version}
					planId={draft.id}
					subject={data.editorSubject!}
				/>
			{/key}
		</section>
	{/if}
	{#if form && 'conflictingHref' in form && typeof form.conflictingHref === 'string'}
		<p class="mt-3">
			{#if form.conflictingHref.startsWith('/draft/')}
				<a
					class="underline underline-offset-2"
					href={resolve('/draft/[id]', { id: form.conflictingHref.slice('/draft/'.length) })}
					>Abrir el otro plan</a
				>
			{:else}
				<a
					class="underline underline-offset-2"
					href={resolve('/[slug]', { slug: form.conflictingHref.slice(1) })}>Abrir el otro plan</a
				>
			{/if}
		</p>
	{/if}
</main>
