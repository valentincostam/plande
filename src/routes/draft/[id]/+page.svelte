<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const draft = $derived(data.draft);
</script>

<svelte:head>
	<title>{draft.offer.offer} | Borrador sin revisión | Plande</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-8">
	<p class="alert alert-warning" role="status">
		Este es un borrador sin revisión. No forma parte del catálogo de planes publicados.
	</p>
	<h1 class="mt-5 text-2xl font-bold">{draft.offer.offer}</h1>
	<p class="mt-1">{draft.offer.university} · {draft.offer.faculty}</p>
	{#if draft.offer.campus}<p class="text-sm">Sede: {draft.offer.campus}</p>{/if}
	{#if draft.offer.modality}<p class="text-sm">Modalidad: {draft.offer.modality}</p>{/if}

	<section class="mt-7" aria-labelledby="sources-heading">
		<h2 id="sources-heading" class="text-lg font-semibold">Fuentes para comparar</h2>
		{#if draft.sources.length === 0}
			<p class="mt-1 text-sm">Todavía no hay fuentes para comparar.</p>
		{:else if draft.year === null}
			<p class="mt-1 text-sm">
				La fuente no identifica el año del plan. Compará los documentos antes de continuar.
			</p>
		{/if}
		{#if draft.sources.length > 0}
			<ul class="mt-3 grid gap-2">
				{#each draft.sources as source, position (position)}
					<li>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- source URLs are external data -->
						<a class="link" href={source.url} rel="noreferrer" target="_blank">{source.label}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	{#if draft.year === null}
		<form method="POST" action="?/setYear" class="mt-8 grid gap-3">
			<label class="form-control"
				><span class="label-text">Año que figura en la fuente</span><input
					class="input"
					name="year"
					inputmode="numeric"
					required
				/></label
			>
			<button class="btn btn-primary" type="submit">Completar año del plan</button>
		</form>
	{:else}
		<p class="mt-8 text-sm">Plan {draft.year}</p>
	{/if}

	{#if form?.error}<p class="alert alert-error mt-4" role="alert">{form.error}</p>{/if}
	{#if form && 'conflictingHref' in form && typeof form.conflictingHref === 'string'}
		<p class="mt-3">
			{#if form.conflictingHref.startsWith('/draft/')}
				<a
					class="link"
					href={resolve('/draft/[id]', { id: form.conflictingHref.slice('/draft/'.length) })}
					>Abrir el otro plan</a
				>
			{:else}
				<a class="link" href={resolve('/[slug]', { slug: form.conflictingHref.slice(1) })}
					>Abrir el otro plan</a
				>
			{/if}
		</p>
	{/if}
</main>
