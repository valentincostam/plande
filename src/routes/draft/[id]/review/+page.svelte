<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import { Button as PublicationButton } from '$lib/components/ui/button';
	import Button from '$lib/plan-editor/ui/button.svelte';
	import ProposalComparison from '$lib/plan-editor/proposal-comparison.svelte';
	import ReviewPlanView from '$lib/plan-editor/review-plan-view.svelte';
	import ReviewInvitation from '$lib/plan-editor/review-invitation.svelte';
	import DiscussionPanel from '$lib/plan-editor/discussion-panel.svelte';
	import { requirementDiagnostics } from '$lib/plan-editor/requirement-diagnostics';
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const review = $derived(data.review);
	const comparisonIdentity = $derived(
		review?.identity ?? {
			...data.draft.offer,
			...(data.draft.year === null ? {} : { year: data.draft.year }),
			...(data.proposal?.proposedNotes?.length ? { notes: data.proposal.proposedNotes } : {})
		}
	);
	const publication = $derived(data.publication);
	const proposal = $derived(data.proposal);
	const completed = $derived(review?.units.filter((unit) => unit.checked).length ?? 0);
	const diagnostics = $derived(requirementDiagnostics(data.content));
	const discussionUnits = $derived(
		(review?.units ?? data.discussions.entries.map((entry) => ({ key: entry.unitKey }))).map(
			(unit) => ({ key: unit.key, label: label(unit.key) })
		)
	);
	const canApprove = $derived(
		Boolean(
			review &&
			!review.isCoauthor &&
			review.authorshipKnown &&
			review.ready &&
			review.units.every((unit) => unit.checked)
		)
	);
	function label(key: string) {
		if (key === 'identity') return 'identidad';
		return (
			data.content.document.items.find((item) => `item:${item.id}` === key)?.name ??
			data.content.document.requirements.graduation?.find(
				(block) => `graduation:${block.id}` === key
			)?.label ??
			review?.sources.find((source) => `source:${source.id}` === key)?.label ??
			data.discussions.entries.find((entry) => `source:${entry.source.id}` === key)?.source.label ??
			'contenido'
		);
	}
</script>

<svelte:head><title>Revisar {data.draft.offer.offer} | Plande</title></svelte:head>

{#snippet checkControl(key: string)}
	{@const unit = review?.units.find((unit) => unit.key === key)}
	{#if review && unit && !review.isCoauthor}
		<fieldset
			class="mt-2 rounded border border-gray-300 p-2 text-sm"
			aria-label={`Comprobar ${label(key)}`}
		>
			{#if unit.checked}<p role="status">Comprobado</p>
			{:else if !unit.available}<p>Hay dudas pendientes sobre este contenido.</p>
			{:else}
				<form method="POST" action="?/review" class="grid gap-2">
					<input type="hidden" name="subject" value={data.subject} />
					<input type="hidden" name="revision" value={review.revision} />
					<input type="hidden" name="operation" value="check" />
					<input type="hidden" name="key" value={key} />
					<label class="flex items-start gap-2"
						><input type="checkbox" name="sourcesOpened" value="yes" required />
						Comparé este contenido con las fuentes y pude abrirlas sin pedir acceso.</label
					>
					<Button type="submit" variant="outline" disabled={!review.sources.length}
						>Marcar comprobado</Button
					>
				</form>
			{/if}
		</fieldset>
	{/if}
{/snippet}

<main
	class="font-noto mx-auto grid min-h-screen max-w-3xl gap-6 bg-gray-50 px-4 py-8 text-gray-900"
>
	<a class="underline" href={resolve('/draft/[id]', { id: data.draft.id })}>Volver al borrador</a>
	<header>
		{#if publication?.published}
			<p class="text-sm text-amber-800">
				Propuesta de corrección. La
				<a class="underline" href={resolve('/[slug]', { slug: publication.canonicalSlug })}
					>publicación vigente</a
				>
				sigue disponible.
			</p>
		{:else}
			<p class="text-sm text-amber-800">Borrador sin publicar. Esta revisión no publica el plan.</p>
		{/if}
		<h1 class="mt-2 text-2xl font-bold">{data.draft.offer.offer}</h1>
		{#if proposal}<p class="mt-2 text-sm">Propuesta: {proposal.argument}</p>{/if}
		<p>{data.draft.offer.university} · {data.draft.offer.faculty}</p>
		{#if data.draft.offer.campus}<p>Sede: {data.draft.offer.campus}</p>{/if}
		{#if data.draft.offer.modality}<p>Modalidad: {data.draft.offer.modality}</p>{/if}
		{#if data.draft.year !== null}<p>Plan {data.draft.year}</p>{/if}
		{#if comparisonIdentity.notes?.length}
			<section aria-label="Notas del plan" class="grid gap-1 text-sm">
				<h2 class="font-medium">Notas</h2>
				{#each comparisonIdentity.notes as note (note.id)}<p class="whitespace-pre-wrap">
						{note.text}
					</p>{/each}
			</section>
		{/if}
		{@render checkControl('identity')}
	</header>
	{#if form?.error}<p role="alert" class="text-red-700">{form.error}</p>{/if}
	{#if review}
		<p role="status">{completed} de {review.units.length} comprobaciones vigentes.</p>
		{#if review.isCoauthor}<p>Editaste este borrador. Tu aprobación no puede contar.</p>{/if}
	{:else}<p>Podés leer todo el plan. Iniciá sesión para guardar tu revisión.</p>{/if}
	<section aria-label="Fuentes para revisar" class="grid gap-3">
		<h2 class="font-semibold">Fuentes para comparar</h2>
		{#each review?.sources ?? data.draft.sources as source, index (index)}
			<div>
				<!-- eslint-disable svelte/no-navigation-without-resolve -- external source URLs are validated by the collaboration contract -->
				<a class="underline" href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{#if 'id' in source}{@render checkControl(`source:${source.id}`)}{/if}
			</div>
		{:else}<p>Agregá fuentes al borrador antes de completar una revisión.</p>{/each}
	</section>
	<ReviewPlanView content={data.content} {checkControl} />
	{#if proposal}
		<ProposalComparison
			before={proposal.before}
			proposed={{
				content: data.content,
				identity: comparisonIdentity,
				sources: data.comparisonSources
			}}
		/>
	{/if}
	{#if diagnostics.length}
		<ul class="grid gap-1 text-sm text-amber-800" aria-label="Datos pendientes de corregir">
			{#each diagnostics as diagnostic (diagnostic)}<li>{diagnostic}</li>{/each}
		</ul>
	{/if}
	{#if review && !review.isCoauthor}
		{#if !review.ready}<p class="text-sm">
				Antes de aprobar, el plan necesita contenido válido, fuentes y ninguna duda pendiente.
			</p>{/if}
		{#if !review.authorshipKnown}<p>
				La autoría inicial de este borrador anterior a las revisiones todavía no está registrada. No
				se puede aprobar.
			</p>{/if}
		{#if review.approved}<p role="status">Revisión completa aprobada para esta versión.</p>
		{:else}
			<form method="POST" action="?/review">
				<input type="hidden" name="subject" value={data.subject} />
				<input type="hidden" name="revision" value={review.revision} />
				<input type="hidden" name="operation" value="approve" />
				<Button type="submit" disabled={!canApprove}>Aprobar revisión completa</Button>
			</form>
		{/if}
	{/if}
	<ReviewInvitation url={data.invitationUrl} />
	{#if review}
		<section
			aria-label={publication?.published ? 'Publicar corrección' : 'Publicar el plan'}
			class="grid gap-2 border-t border-gray-200 pt-4"
		>
			<h2 class="font-semibold">
				{publication?.published ? 'Publicar corrección' : 'Publicar el plan'}
			</h2>
			<p class="text-sm text-gray-600">
				Necesita dos revisiones completas de estudiantes que no lo editaron y ninguna objeción
				pendiente.
			</p>
			<form method="POST" action="?/publish" use:enhance>
				<input type="hidden" name="subject" value={data.subject} />
				<input type="hidden" name="requestId" value={data.publicationRequestId} />
				<input type="hidden" name="reviewRevision" value={review.revision} />
				<input type="hidden" name="discussionRevision" value={data.discussions.revision} />
				<PublicationButton
					type="submit"
					disabled={!review.ready || !review.authorshipKnown || data.discussions.pendingCount > 0}
				>
					{publication?.published ? 'Publicar corrección' : 'Publicar plan'}
				</PublicationButton>
			</form>
		</section>
	{/if}
	{#if data.discussions.pendingCount > 0}
		<p class="text-sm text-amber-800">
			Hay {data.discussions.pendingCount} objeciones pendientes de resolución o corrección. Impiden publicar
			{publication?.published ? 'la corrección' : 'el plan'}.
		</p>
	{/if}
	<DiscussionPanel
		entries={data.discussions.entries}
		subject={data.subject}
		reviewRevision={review?.revision ?? 0}
		discussionRevision={data.discussions.revision}
		units={discussionUnits}
		sources={review?.sources ?? []}
		requestId={data.requestId}
		resolutionRequestIds={data.resolutionRequestIds}
		replyRequestIds={data.replyRequestIds}
	/>
</main>
