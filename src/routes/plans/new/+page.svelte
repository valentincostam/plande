<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from '$lib/link.svelte';
	import { newPlanSchema } from '$lib/new-plan-form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import OfferCombobox from './offer-combobox.svelte';
	import { untrack } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const id = $props.id();
	const errorId = (field: string) => `${id}-${field}-error`;
	const {
		form: createForm,
		errors: createErrors,
		constraints: createConstraints,
		enhance
	} = superForm(
		untrack(() => data.form),
		{ validators: zod4Client(newPlanSchema) }
	);

	const unique = (values: Array<string | null | undefined>) =>
		[...new Set(values.filter((value): value is string => Boolean(value)))].toSorted((a, b) =>
			a.localeCompare(b)
		);
	const universities = $derived(unique(data.offers.map((item) => item.university)));
	const faculties = $derived(
		unique(
			data.offers
				.filter((item) => item.university === $createForm.university)
				.map((item) => item.faculty)
		)
	);
	const careers = $derived(
		unique(
			data.offers
				.filter(
					(item) =>
						item.university === $createForm.university &&
						($createForm.faculty ? item.faculty === $createForm.faculty : !item.faculty)
				)
				.map((item) => item.offer)
		)
	);
	const hasLegacyFaculty = $derived(
		data.offers.some((item) => item.university === $createForm.university && !item.faculty)
	);
	const matchingPlans = $derived(
		data.offers.filter(
			(item) =>
				item.university === $createForm.university &&
				item.offer === $createForm.offer &&
				(!$createForm.faculty || item.faculty === $createForm.faculty)
		)
	);
	const selectedPlans = $derived(
		matchingPlans.filter(
			(item) =>
				(!$createForm.campus || item.campus === $createForm.campus) &&
				(!$createForm.modality || item.modality === $createForm.modality)
		)
	);
	const campuses = $derived(unique(matchingPlans.map((item) => item.campus)));
	const modalities = $derived(unique(matchingPlans.map((item) => item.modality)));
	let showVariantFields = $state(false);

	function selectUniversity(value: string) {
		$createForm.university = value;
		$createForm.faculty = '';
		$createForm.offer = '';
		$createForm.campus = '';
		$createForm.modality = '';
		showVariantFields = false;
	}

	function selectFaculty(value: string) {
		$createForm.faculty = value;
		$createForm.offer = '';
		$createForm.campus = '';
		$createForm.modality = '';
		showVariantFields = false;
	}

	function selectOffer(value: string) {
		$createForm.offer = value;
		$createForm.campus = '';
		$createForm.modality = '';
		showVariantFields = false;
	}
</script>

<svelte:head>
	<title>Agregar un plan | Plande</title>
</svelte:head>

<main
	class="font-noto bg-background text-foreground mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-6 sm:py-10"
>
	<a
		class="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
		href={resolve('/')}>← Volver a Plande</a
	>
	<div class="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(32rem,1.2fr)]">
		<header class="lg:sticky lg:top-10">
			<Badge variant="secondary">Carga colaborativa</Badge>
			<h1 class="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
				Agregá un plan de estudios
			</h1>
			<p class="text-muted-foreground mt-3 max-w-md leading-relaxed">
				Primero identificá la carrera. Después agregá la fuente oficial para que otras personas
				puedan revisar el contenido.
			</p>
			<ol class="mt-7 hidden space-y-4 text-sm lg:block">
				<li class="flex gap-3">
					<span
						class="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
						>1</span
					><span
						><strong class="block">Elegí la oferta</strong><span class="text-muted-foreground"
							>Universidad, facultad y carrera.</span
						></span
					>
				</li>
				<li class="flex gap-3">
					<span
						class="bg-secondary text-secondary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
						>2</span
					><span
						><strong class="block">Identificá el plan</strong><span class="text-muted-foreground"
							>Año y documento de referencia.</span
						></span
					>
				</li>
				<li class="flex gap-3">
					<span
						class="bg-secondary text-secondary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
						>3</span
					><span
						><strong class="block">Completá las materias</strong><span class="text-muted-foreground"
							>Podrás ordenarlas en el editor.</span
						></span
					>
				</li>
			</ol>
		</header>
		<Card class="overflow-visible py-0">
			<CardContent class="p-5 sm:p-7">
				{#if data.collaborationUnavailable}
					<p
						class="mt-6 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900"
						role="alert"
					>
						La colaboración no está disponible ahora.
					</p>
				{:else}
					{#if !data.auth}
						<p
							class="mt-6 rounded-md border border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-900"
						>
							<a class="underline underline-offset-2" href={resolve('/auth/sign-in')}
								>Iniciá sesión</a
							> para crear o continuar un borrador.
						</p>
					{/if}
					<form method="POST" action="?/create" use:enhance class="grid gap-5">
						<div>
							<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
								Paso 1
							</p>
							<h2 class="mt-1 text-xl font-semibold">Elegí tu carrera</h2>
							<p class="text-muted-foreground mt-1 text-sm">
								Podés elegir un nombre existente o agregar uno nuevo.
							</p>
						</div>
						<OfferCombobox
							id={`${id}-university`}
							name="university"
							label="Universidad"
							placeholder="Elegí o agregá una universidad"
							options={universities}
							bind:value={$createForm.university}
							error={$createErrors.university?.[0]}
							onvaluechange={selectUniversity}
						/>
						<OfferCombobox
							id={`${id}-faculty`}
							name="faculty"
							label="Facultad o unidad académica"
							placeholder="Elegí o agregá una facultad"
							options={faculties}
							bind:value={$createForm.faculty}
							disabled={!$createForm.university}
							error={$createErrors.faculty?.[0]}
							onvaluechange={selectFaculty}
						/>
						<OfferCombobox
							id={`${id}-offer`}
							name="offer"
							label="Carrera"
							placeholder="Elegí o agregá una carrera"
							options={careers}
							bind:value={$createForm.offer}
							disabled={!$createForm.university || (!$createForm.faculty && !hasLegacyFaculty)}
							error={$createErrors.offer?.[0]}
							onvaluechange={selectOffer}
						/>
						{#if $createForm.offer && matchingPlans.length === 0}
							<p class="text-sm text-gray-600">
								Los nombres agregados todavía no están verificados.
							</p>
						{/if}
						{#if selectedPlans.length > 0}
							<section
								class="grid gap-2 rounded-md border border-gray-300 p-3"
								aria-labelledby={`${id}-existing-plans`}
							>
								<h3 id={`${id}-existing-plans`} class="font-medium">Planes existentes</h3>
								<ul class="grid gap-2 text-sm">
									{#each selectedPlans as plan (plan.planId)}
										<li>
											{#if plan.isDraft}
												<a
													class="underline underline-offset-2"
													href={resolve(`/draft/${plan.planId}`)}
													>{plan.year === null ? 'Año sin identificar' : `Plan ${plan.year}`} · Borrador
													sin revisión</a
												>
											{:else if plan.canonicalSlug}
												<a
													class="underline underline-offset-2"
													href={resolve(`/${plan.canonicalSlug}`)}
													>{plan.year === null ? 'Año sin identificar' : `Plan ${plan.year}`}</a
												>
											{:else}
												<span
													>{plan.year === null ? 'Año sin identificar' : `Plan ${plan.year}`}</span
												>
											{/if}
											{#if plan.campus || plan.modality}
												<span class="text-gray-600">
													· {[plan.campus, plan.modality].filter(Boolean).join(' · ')}</span
												>
											{/if}
											{#if plan.year === null && plan.sources.length > 0}
												<ul class="mt-1 list-disc pl-5 text-gray-600">
													{#each plan.sources as source (source.url)}
														<li>
															<Link href={source.url}>{source.label}</Link>
														</li>
													{/each}
												</ul>
											{/if}
										</li>
									{/each}
								</ul>
							</section>
						{/if}
						{#if campuses.length > 1 || modalities.length > 1 || showVariantFields}
							<OfferCombobox
								id={`${id}-campus`}
								name="campus"
								label="Sede, si cambia las reglas académicas"
								placeholder="Elegí o agregá una sede"
								options={campuses}
								bind:value={$createForm.campus}
								error={$createErrors.campus?.[0]}
							/>
							<OfferCombobox
								id={`${id}-modality`}
								name="modality"
								label="Modalidad, si cambia las reglas académicas"
								placeholder="Elegí o agregá una modalidad"
								options={modalities}
								bind:value={$createForm.modality}
								error={$createErrors.modality?.[0]}
							/>
						{:else if $createForm.offer}
							<Button
								type="button"
								class="justify-self-start"
								variant="outline"
								onclick={() => (showVariantFields = true)}>Agregar sede o modalidad distinta</Button
							>
						{/if}
						<div class="border-border mt-2 border-t pt-5">
							<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
								Paso 2
							</p>
							<h2 class="mt-1 text-xl font-semibold">Identificá el plan y su fuente</h2>
							<p class="text-muted-foreground mt-1 text-sm">
								El enlace permite comparar el borrador con el documento original.
							</p>
						</div>
						<label class="grid gap-1.5 text-sm"
							><span class="font-medium">Año del plan, si figura en la fuente</span><Input
								id={`${id}-year`}
								class="bg-gray-50 text-gray-900"
								name="year"
								inputmode="numeric"
								bind:value={$createForm.year}
								aria-invalid={$createErrors.year ? 'true' : undefined}
								aria-describedby={$createErrors.year ? errorId('year') : undefined}
								{...$createConstraints.year}
							/></label
						>
						{#if $createErrors.year}<p id={errorId('year')} class="text-sm text-red-700">
								{$createErrors.year[0]}
							</p>{/if}
						<label class="grid gap-1.5 text-sm"
							><span class="font-medium">Etiqueta de la fuente</span><Input
								id={`${id}-source-label`}
								class="bg-gray-50 text-gray-900"
								name="sourceLabel"
								bind:value={$createForm.sourceLabel}
								aria-invalid={$createErrors.sourceLabel ? 'true' : undefined}
								aria-describedby={$createErrors.sourceLabel ? errorId('source-label') : undefined}
								{...$createConstraints.sourceLabel}
							/></label
						>
						{#if $createErrors.sourceLabel}<p
								id={errorId('source-label')}
								class="text-sm text-red-700"
							>
								{$createErrors.sourceLabel[0]}
							</p>{/if}
						<label class="grid gap-1.5 text-sm"
							><span class="font-medium">Enlace de la fuente</span><Input
								id={`${id}-source-url`}
								class="bg-gray-50 text-gray-900"
								name="sourceUrl"
								type="url"
								bind:value={$createForm.sourceUrl}
								aria-invalid={$createErrors.sourceUrl ? 'true' : undefined}
								aria-describedby={$createErrors.sourceUrl ? errorId('source-url') : undefined}
								{...$createConstraints.sourceUrl}
							/></label
						>
						{#if $createErrors.sourceUrl}<p id={errorId('source-url')} class="text-sm text-red-700">
								{$createErrors.sourceUrl[0]}
							</p>{/if}
						<Button class="mt-2 h-10 w-full" type="submit">Crear o continuar borrador</Button>
					</form>
				{/if}

				{#if form && 'error' in form && typeof form.error === 'string'}<p
						class="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900"
						role="alert"
					>
						{form.error}
					</p>{/if}
			</CardContent>
		</Card>
	</div>
</main>
