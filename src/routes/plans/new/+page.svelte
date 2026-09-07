<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Agregar un plan | Plande</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-8">
	<a class="link text-sm" href={resolve('/')}>Volver a Plande</a>
	<h1 class="text-2xl font-bold">Agregá un plan de estudios</h1>
	<p class="mt-2">
		Buscá primero una oferta. Si ya existe un borrador o un plan, podés continuar desde ahí.
	</p>

	<form method="GET" class="mt-6">
		<label class="form-control">
			<span class="label-text">Buscar universidad, facultad o carrera</span>
			<div class="join">
				<input
					class="input input-bordered join-item bg-base-100 text-base-content w-full"
					name="q"
					value={data.query}
				/>
				<button class="btn btn-primary join-item" type="submit">Buscar</button>
			</div>
		</label>
	</form>

	{#if data.matches.length > 0}
		<section class="mt-6" aria-labelledby="existing-offers">
			<h2 id="existing-offers" class="text-lg font-semibold">Coincidencias</h2>
			<ul class="mt-3 grid gap-3">
				{#each data.matches as match (match.planId)}
					<li class="border-base-300 rounded border p-3">
						{#if match.isDraft}
							<a class="link font-medium" href={resolve(`/draft/${match.planId}`)}>{match.offer}</a>
						{:else if match.canonicalSlug}
							<a class="link font-medium" href={resolve(`/${match.canonicalSlug}`)}>{match.offer}</a
							>
						{:else}
							<span class="font-medium">{match.offer}</span>
						{/if}
						<p class="text-sm">
							{match.university}{match.faculty ? ` · ${match.faculty}` : ''}{match.campus
								? ` · ${match.campus}`
								: ''}{match.modality ? ` · ${match.modality}` : ''}
						</p>
						<p class="mt-1 text-sm">
							{match.year !== null
								? `Plan ${match.year}`
								: 'Año de plan sin identificar'}{match.isDraft ? ' · Borrador sin revisión' : ''}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if data.collaborationUnavailable}
		<p class="alert alert-warning mt-6" role="alert">La colaboración no está disponible ahora.</p>
	{:else}
		{#if !data.auth}
			<p class="alert alert-info mt-6">
				<a class="link" href={resolve('/auth/sign-in')}>Iniciá sesión</a> para crear o continuar un borrador.
			</p>
		{/if}
		<form method="POST" action="?/create" class="mt-8 grid gap-4">
			<h2 class="text-lg font-semibold">Identificar una oferta nueva</h2>
			<label class="form-control"
				><span class="label-text">Universidad</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="university"
					required
				/></label
			>
			<label class="form-control"
				><span class="label-text">Facultad</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="faculty"
					required
				/></label
			>
			<label class="form-control"
				><span class="label-text">Carrera</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="offer"
					required
				/></label
			>
			<label class="form-control"
				><span class="label-text">Sede, si cambia las reglas académicas</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="campus"
				/></label
			>
			<label class="form-control"
				><span class="label-text">Modalidad, si cambia las reglas académicas</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="modality"
				/></label
			>
			<label class="form-control"
				><span class="label-text">Año del plan, si figura en la fuente</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="year"
					inputmode="numeric"
				/></label
			>
			<label class="form-control"
				><span class="label-text">Etiqueta de la fuente</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="source-label"
				/></label
			>
			<label class="form-control"
				><span class="label-text">Enlace de la fuente</span><input
					class="input input-bordered bg-base-100 text-base-content"
					name="source-url"
					type="url"
				/></label
			>
			<button class="btn btn-primary" type="submit">Crear o continuar borrador</button>
		</form>
	{/if}

	{#if form?.error}<p class="alert alert-error mt-4" role="alert">{form.error}</p>{/if}
</main>
