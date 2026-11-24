<script lang="ts">
	import type { DiscussionEntry } from '$lib/collaboration/draft-discussions.server';
	import DiscussionForm from './discussion-form.svelte';
	import ResolutionForm from './resolution-form.svelte';

	let {
		entries,
		subject,
		reviewRevision,
		discussionRevision,
		units,
		sources,
		requestId,
		resolutionRequestIds,
		replyRequestIds
	}: {
		entries: DiscussionEntry[];
		subject: string | null;
		reviewRevision: number;
		discussionRevision: number;
		units: { key: string; label: string }[];
		sources: { id: string; label: string }[];
		requestId: string;
		resolutionRequestIds: Record<string, string>;
		replyRequestIds: Record<string, string>;
	} = $props();

	function unitLabel(key: string) {
		return units.find((unit) => unit.key === key)?.label ?? key;
	}

	function statusLabel(status: DiscussionEntry['status']) {
		return {
			comment: 'Comentario',
			pending: 'Pendiente',
			confirmed: 'Error confirmado',
			dismissed: 'Objeción descartada',
			corrected: 'Corrección comprobada'
		}[status];
	}

	function eventLabel(action: DiscussionEntry['events'][number]['action']) {
		return {
			confirm: 'Error confirmado',
			dismiss: 'Objeción descartada',
			reopen: 'Objeción reabierta',
			correct: 'Corrección comprobada'
		}[action];
	}
</script>

<section class="grid gap-3" aria-label="Aportes públicos">
	<h2 class="font-medium">Aportes públicos</h2>
	<p class="text-sm text-gray-600">
		Los aportes no publican ni retiran contenido automáticamente. No incluyas datos personales.
	</p>
	{#each entries as entry (entry.id)}
		<article
			class="grid gap-2 border-l border-gray-300 pl-3"
			aria-label={`${entry.kind === 'objection' ? 'Objeción' : 'Comentario'} sobre ${unitLabel(entry.unitKey)}`}
		>
			<div>
				{entry.kind === 'objection' ? 'Objeción' : 'Comentario'} sobre {unitLabel(entry.unitKey)}
			</div>
			<p class="text-sm whitespace-pre-wrap">{entry.argument}</p>
			<div class="text-sm">
				<!-- eslint-disable svelte/no-navigation-without-resolve -- validated public source URL -->
				<a class="underline" href={entry.source.url} target="_blank" rel="noreferrer"
					>Fuente: {entry.source.label}</a
				>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</div>
			{#if entry.locator}<div class="text-sm">{entry.locator}</div>{/if}
			<div class="text-sm">Estado: {statusLabel(entry.status)}</div>
			{#if entry.events.length}
				<section class="grid gap-2 text-sm" aria-label="Historial de resolución">
					<h3 class="font-medium">Historial</h3>
					<ul class="grid gap-2">
						{#each entry.events as event, index (`${event.createdAt}:${index}`)}
							<li>
								<div>{eventLabel(event.action)}</div>
								<div class="whitespace-pre-wrap">{event.argument}</div>
								<div>
									<!-- eslint-disable svelte/no-navigation-without-resolve -- validated public source URL -->
									<a class="underline" href={event.source.url} target="_blank" rel="noreferrer"
										>Fuente: {event.source.label}</a
									>
									<!-- eslint-enable svelte/no-navigation-without-resolve -->
								</div>
								{#if event.locator}<div>{event.locator}</div>{/if}
								{#if event.newEvidence}<div class="whitespace-pre-wrap">
										Nueva evidencia: {event.newEvidence}
									</div>{/if}
							</li>
						{/each}
					</ul>
				</section>
			{/if}
			{#if subject && entry.kind === 'objection' && resolutionRequestIds[entry.id]}
				<details>
					<summary>Concluir o reabrir</summary>
					<ResolutionForm
						{subject}
						requestId={resolutionRequestIds[entry.id]}
						{reviewRevision}
						{discussionRevision}
						discussionId={entry.id}
						status={entry.status === 'comment' ? 'pending' : entry.status}
						{sources}
					/>
				</details>
			{/if}
			{#if subject && replyRequestIds[entry.id]}
				<details>
					<summary>Responder</summary>
					<DiscussionForm
						{subject}
						{reviewRevision}
						{discussionRevision}
						units={[{ key: entry.unitKey, label: unitLabel(entry.unitKey) }]}
						{sources}
						requestId={replyRequestIds[entry.id]}
						parentId={entry.id}
					/>
				</details>
			{/if}
		</article>
	{:else}
		<p class="text-sm">Todavía no hay aportes.</p>
	{/each}
	{#if subject}
		<details>
			<summary>Agregar aporte</summary>
			<DiscussionForm
				{subject}
				{reviewRevision}
				{discussionRevision}
				{units}
				{sources}
				{requestId}
			/>
		</details>
	{/if}
</section>
