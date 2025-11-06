<script lang="ts">
	import { createCourses, TRANSVERSAL_YEAR } from '$lib/course.svelte';
	import type { PageProps } from './$types';
	import Year from './year.svelte';
	import { createYears, isYearPassed, getCourseEffectiveTerm } from '$lib/year.svelte';
	import { courseTerms, courseTermLabels } from '$lib/course-term';
	import SettingToggle from './setting-toggle.svelte';
	import AvailableCoursesTerm from './available-courses-term.svelte';
	import Stats from './stats.svelte';
	import { createUrlSearchParams, urlStateParameters } from '$lib/url-state-parameter';
	import { replaceState } from '$app/navigation';
	import ShareButton from './share-button.svelte';
	import { marked } from 'marked';
	import StatePill from './state-pill.svelte';
	import { courseStates, decodeCoursesStates } from '$lib/course-state';
	import Charts from './charts.svelte';
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import Footer from '../footer.svelte';
	import Disclaimer from '../disclaimer.svelte';
	import TransversalCourses from './transversal-courses.svelte';
	import { getFullCollegeName } from '$lib/study-plan';
	import RedundantRequirements from './redundant-requirements.svelte';

	let { data }: PageProps = $props();

	const initialCoursesStates = data.coursesStates;
	const initialIsStrictModeEnabled = data.isStrictModeEnabled;
	const initialShowCodes = data.showCodes;

	let isStrictModeEnabled = $state(initialIsStrictModeEnabled);
	let showCodes = $state(initialShowCodes);
	let isInitializing = $state(true);

	const courses = createCourses(
		data.studyPlan.courses,
		initialCoursesStates,
		() => isStrictModeEnabled
	);

	let isRouterReady = $state(false);

	const storageKey = `plande-${data.slug}`;

	$effect(() => {
		if (isInitializing || !isRouterReady) return;

		const coursesStates = courses.map((course) => course.state);
		const urlSearchParams = createUrlSearchParams(coursesStates, isStrictModeEnabled, showCodes);

		if (!browser) return;

		tick().then(() => {
			replaceState(
				urlSearchParams.toString() ? `?${urlSearchParams}` : window.location.pathname,
				{}
			);

			const encodedStates = urlSearchParams.get(urlStateParameters.state);

			const storageData = {
				coursesStates: encodedStates,
				isStrictModeEnabled,
				showCodes
			};

			localStorage.setItem(storageKey, JSON.stringify(storageData));
		});
	});

	onMount(() => {
		isRouterReady = true;

		if (!browser || initialCoursesStates.length > 0) {
			isInitializing = false;
			return;
		}

		const savedData = localStorage.getItem(storageKey);

		if (!savedData) {
			isInitializing = false;
			return;
		}

		try {
			const parsed = JSON.parse(savedData);
			const decodedStates = decodeCoursesStates(parsed.coursesStates);

			courses.forEach((course, index) => {
				if (decodedStates[index]) {
					course.state = decodedStates[index];
				}
			});

			if (parsed.isStrictModeEnabled !== undefined) {
				isStrictModeEnabled = parsed.isStrictModeEnabled;
			}

			if (parsed.showCodes !== undefined) {
				showCodes = parsed.showCodes;
			}
		} catch (error) {
			console.warn('Failed to parse saved course states:', error);
		} finally {
			isInitializing = false;
		}
	});

	const years = createYears(data.studyPlan.durationYears, courses);

	const transversalCourses = courses.filter((course) => course.year === TRANSVERSAL_YEAR);

	const notTakenCourses = $derived(
		courses.filter((course) => course.state === courseStates.notTaken)
	);

	const availableCourses = $derived(notTakenCourses.filter((course) => course.isEnabled));

	const allNotTakenAreAvailable = $derived(
		notTakenCourses.length > 0 && notTakenCourses.length === availableCourses.length
	);

	const annualAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.annual
		)
	);

	const firstSemesterAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.firstSemester
		)
	);

	const secondSemesterAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.secondSemester
		)
	);

	const semestralAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.semestral
		)
	);

	const unknownAvailableCourses = $derived(
		availableCourses.filter(
			(course) => getCourseEffectiveTerm(course, course.year) === courseTerms.unknown
		)
	);

	const title = `Plan de Estudios de ${data.studyPlan.degreeName} de la ${getFullCollegeName(data.studyPlan)} ・ Plande`;
	const description = `Plan de Estudios Interactivo de la carrera de ${data.studyPlan.degreeName} en ${getFullCollegeName(data.studyPlan)}. Visualizá materias, requisitos y tu progreso académico de forma clara y organizada con Plande.`;
	const url = `https://plande.app/${data.slug}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content="Plande" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<!-- Structured Data - Course & Organization -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: data.studyPlan.degreeName,
		description: description,
		provider: {
			'@type': 'CollegeOrUniversity',
			name: getFullCollegeName(data.studyPlan)
		},
		educationalLevel: 'Undergraduate',
		url: url,
		inLanguage: 'es'
	})}<\/script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Inicio',
				item: 'https://plande.app'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: data.studyPlan.degreeName,
				item: url
			}
		]
	})}<\/script>`}
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<a
			href="/"
			class="text-sm leading-loose text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>Plande</a
		>
		<p>
			Plan de Estudios {data.studyPlan.year ?? ''} · {data.studyPlan.universitySlug}
			{data.studyPlan.collegeSlug ?? ''}
		</p>
		<h1 class="text-2xl font-bold">{data.studyPlan.degreeName}</h1>
	</header>

	<main class="grid gap-9">
		{#each years as year, index}
			<Year
				{year}
				{showCodes}
				showBulkSelect={isYearPassed(years[index - 1]) || !isStrictModeEnabled}
			/>
		{/each}

		{#if transversalCourses.length > 0}
			<TransversalCourses courses={transversalCourses} {showCodes} />
		{/if}

		<section class="px-3 md:px-0">
			<ShareButton {title} />
		</section>

		<section>
			<h3 class="p-3 text-lg font-bold">Qué podés cursar</h3>
			{#if allNotTakenAreAvailable}
				<p class="px-3 md:px-0">Todas las materias están disponibles para cursar.</p>
			{:else if availableCourses.length === 0}
				<p class="px-3 md:px-0">No hay materias disponibles para cursar en este momento.</p>
			{:else}
				<div class="grid gap-5">
					<p class="px-3 md:px-0">
						{#if availableCourses.length == 1}
							En tu situación actual, esta es la materia que podés cursar.
						{:else}
							En tu situación actual, estas son las {availableCourses.length} materias que podés cursar.
						{/if}
					</p>
					<AvailableCoursesTerm
						title={courseTermLabels[courseTerms.annual]}
						courses={annualAvailableCourses}
						{showCodes}
					/>
					<AvailableCoursesTerm
						title={courseTermLabels[courseTerms.firstSemester]}
						courses={firstSemesterAvailableCourses}
						{showCodes}
					/>
					<AvailableCoursesTerm
						title={courseTermLabels[courseTerms.secondSemester]}
						courses={secondSemesterAvailableCourses}
						{showCodes}
					/>
					<AvailableCoursesTerm
						title={courseTermLabels[courseTerms.semestral]}
						courses={semestralAvailableCourses}
						{showCodes}
					/>
					<AvailableCoursesTerm
						title="Materias electivas"
						courses={unknownAvailableCourses}
						{showCodes}
					/>
				</div>
			{/if}
		</section>

		<section>
			<h3 class="p-3 text-lg font-bold">Estadísticas</h3>
			<div class="grid gap-3">
				<Charts {courses} {years} progress={data.studyPlan.progress} />
				<Stats {courses} {years} progress={data.studyPlan.progress} />
			</div>
		</section>

		<section>
			<h3 class="p-3 text-lg font-bold">Datos del Plan de Estudios</h3>

			<ul class="grid list-disc gap-3 px-9">
				<li>
					<span class="font-bold">Carrera:</span>
					{data.studyPlan.degreeName}
				</li>
				{#if data.studyPlan.collegeName}
					<li>
						<span class="font-bold">Facultad:</span>
						{data.studyPlan.collegeName} ({data.studyPlan.collegeSlug})
					</li>
				{/if}
				<li>
					<span class="font-bold">Universidad:</span>
					{data.studyPlan.universityName} ({data.studyPlan.universitySlug})
				</li>
				<li>
					<span class="font-bold">Duración:</span>
					{data.studyPlan.durationYears} años
				</li>
				{#if data.studyPlan.year}
					<li>
						<span class="font-bold">Año de aprobación:</span>
						{data.studyPlan.year}
					</li>
				{/if}
			</ul>
		</section>

		{#if data.studyPlan.notes && data.studyPlan.notes.length > 0}
			<section>
				<h3 class="p-3 text-lg font-bold">Notas</h3>
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.studyPlan.notes as note}
						<li class="note">
							{@html marked(note.text)}
						</li>
					{/each}
				</ol>
			</section>
		{/if}

		{#if data.studyPlan.sources}
			<section>
				<h3 class="p-3 text-lg font-bold">Fuentes</h3>
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.studyPlan.sources as source}
						<li>
							<a
								class="text-blue-800 underline-offset-2 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
								href={source.url}
							>
								{source.label}
							</a>
						</li>
					{/each}
				</ol>
			</section>
		{/if}

		<section>
			<h3 class="p-3 text-lg font-bold">Referencias</h3>
			<p class="px-3 pb-3">Posibles estados de una materia:</p>
			<ul class="grid list-disc gap-3 px-9">
				<li>
					<StatePill state={courseStates.notTaken} class="text-sm" />: Aún no has asistido a sus
					clases.
				</li>
				<li>
					<StatePill state={courseStates.inProgress} class="text-sm" />: Estás asistiendo a sus
					clases.
				</li>
				<li>
					<StatePill state={courseStates.taken} class="text-sm" />: Aprobaste la cursada pero aún
					debés rendir su examen final.
				</li>
				<li>
					<StatePill state={courseStates.passed} class="text-sm" />: Ya la cursaste, rendiste y
					aprobaste.
				</li>
			</ul>
		</section>

		<section>
			<h3 class="p-3 text-lg font-bold">Configuración</h3>

			<div class="grid gap-3 px-3 md:px-0">
				<SettingToggle
					id="strict-mode"
					bind:value={isStrictModeEnabled}
					label="Modo estricto"
					description="Los requisitos de las materias son obligatorios"
				/>
				<SettingToggle
					id="show-codes"
					bind:value={showCodes}
					label="Mostrar identificadores"
					description="Los códigos de las materias se muestran junto a sus nombres"
				/>
			</div>
		</section>
	</main>

	<Disclaimer college={getFullCollegeName(data.studyPlan)} />

	<Footer />
</div>

<style>
	.note :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		display: grid;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
		padding-top: 0.5rem;
	}

	.note :global(a) {
		color: var(--color-blue-800);
		text-underline-offset: 2px;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
</style>
