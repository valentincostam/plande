<script lang="ts">
	import { isTransversal } from '$lib/course-attribute';
	import { createCourses } from '$lib/course.svelte';
	import type { PageProps } from './$types';
	import Year from './year.svelte';
	import { createYears, isYearPassed } from '$lib/year.svelte';
	import SettingToggle from './setting-toggle.svelte';
	import ResetButton from './reset-button.svelte';
	import AvailableCoursesSection from './available-courses-section.svelte';
	import Stats from './stats.svelte';
	import Section from './section.svelte';
	import { createUrlSearchParams, urlStateParameters } from '$lib/url-state-parameter';
	import { replaceState } from '$app/navigation';
	import ShareButton from './share-button.svelte';
	import CopyLinkButton from './copy-link-button.svelte';
	import ExportButton from './export-button.svelte';
	import { marked } from 'marked';
	import StatePill from './state-pill.svelte';
	import { courseStates, decodeCoursesStates, encodeCoursesStates } from '$lib/course-state';
	import {
		pushState as pushHistoryState,
		undo as historyUndo,
		redo as historyRedo,
		getIsApplyingHistory,
		clearIsApplyingHistory,
		resetHistory
	} from '$lib/state-history.svelte';
	import { encodeGrades } from '$lib/grade-encoding';
	import Charts from './charts.svelte';
	import { browser } from '$app/environment';
	import { onMount, tick, untrack } from 'svelte';
	import Footer from '../footer.svelte';
	import Disclaimer from '../disclaimer.svelte';
	import TransversalCourses from './transversal-courses.svelte';
	import { getFullCollegeName } from '$lib/study-plan';
	import ViewToggle from './view-toggle.svelte';
	import CourseDiagram from './diagram/course-diagram.svelte';
	import PriorityCourses from './priority-courses.svelte';
	import { page } from '$app/state';

	let { data }: PageProps = $props();

	let viewMode = $state<'list' | 'diagram'>('list');
	let diagramRef = $state<CourseDiagram | undefined>();
	let pendingFocusCourseId: number | null = $state(null);

	// Handle deferred navigation when diagram mounts
	$effect(() => {
		if (diagramRef && pendingFocusCourseId !== null) {
			const courseId = pendingFocusCourseId;
			pendingFocusCourseId = null;

			// First scroll to diagram container, then focus on course
			const diagramContainer = document.getElementById('diagram-container');
			if (diagramContainer) {
				diagramContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}

			// Delay focus to allow scroll to complete
			setTimeout(() => {
				diagramRef?.focusOnCourse(courseId);
			}, 400);
		}
	});

	function onNavigateToDiagram(courseId: number) {
		if (viewMode === 'diagram' && diagramRef) {
			// Already in diagram view - scroll to diagram then focus
			const diagramContainer = document.getElementById('diagram-container');
			if (diagramContainer) {
				diagramContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
			setTimeout(() => {
				diagramRef?.focusOnCourse(courseId);
			}, 300);
		} else {
			pendingFocusCourseId = courseId;
			viewMode = 'diagram';
		}
	}

	// These are intentional one-time captures - data doesn't change in SvelteKit page lifecycle
	let isStrictModeEnabled = $state(untrack(() => data.isStrictModeEnabled));
	let showCodes = $state(untrack(() => data.showCodes));
	let isInitializing = $state(true);

	const courses = untrack(() =>
		createCourses(data.studyPlan.courses, data.coursesStates, () => isStrictModeEnabled, data.coursesGrades)
	);

	let isRouterReady = $state(false);

	const storageKey = $derived(`plande-${data.slug}`);

	$effect(() => {
		if (isInitializing || !isRouterReady) return;

		const coursesStates = courses.map((course) => course.state);
		const coursesGrades = courses.map((course) => course.grade);
		const urlSearchParams = createUrlSearchParams(
			coursesStates,
			isStrictModeEnabled,
			showCodes,
			coursesGrades
		);

		if (!browser) return;

		// Track state changes for undo/redo
		const encodedStates = encodeCoursesStates(coursesStates);
    
		if (!getIsApplyingHistory()) {
			pushHistoryState(encodedStates);
		} else {
			clearIsApplyingHistory();
		}

		tick().then(() => {
			replaceState(
				urlSearchParams.toString() ? `?${urlSearchParams}` : window.location.pathname,
				{}
			);

			const storageData = {
				coursesStates: encodedStates,
				isStrictModeEnabled,
				showCodes,
				grades: coursesGrades
			};

			localStorage.setItem(storageKey, JSON.stringify(storageData));
		});
	});

	onMount(() => {
		isRouterReady = true;

		if (!browser) {
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

			// Load grades from localStorage only if not in URL
			if (data.coursesGrades.length === 0 && parsed.grades) {
				courses.forEach((course, index) => {
					if (index < parsed.grades.length) {
						course.grade = parsed.grades[index] ?? undefined;
					}
				});
			}

			// Load states from localStorage only if not in URL
			if (data.coursesStates.length === 0) {
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
			}
		} catch (error) {
			console.warn('Failed to parse saved course states:', error);
		} finally {
			isInitializing = false;
		}
	});

	function resetAllState() {
		const confirmed = window.confirm(
			'¿Confirmás que querés reiniciar todo el progreso? Se perderán estados de materias, notas y configuraciones personalizadas.'
		);
		if (!confirmed) return;

		courses.forEach((course) => {
			course.state = courseStates.notTaken;
			course.grade = undefined;
		});
		isStrictModeEnabled = true;
		showCodes = false;
		localStorage.removeItem(storageKey);
		resetHistory();
	}

	function applyHistoryState(encoded: string) {
		const decodedStates = decodeCoursesStates(encoded);
		courses.forEach((course, index) => {
			const newState = decodedStates[index] ?? courseStates.notTaken;
			if (course.state !== newState) {
				course.state = newState;
			}
		});
	}

	function handleUndo() {
		const previousState = historyUndo();
		if (previousState !== null) {
			applyHistoryState(previousState);
		}
	}

	function handleRedo() {
		const nextState = historyRedo();
		if (nextState !== null) {
			applyHistoryState(nextState);
		}
	}

	function onkeydown(e: KeyboardEvent) {
		const isMac = navigator.platform.includes('Mac');
		const modifier = isMac ? e.metaKey : e.ctrlKey;

		if (modifier && e.key === 'z') {
			if (e.shiftKey) {
				handleRedo();
			} else {
				handleUndo();
			}
			e.preventDefault();
		}

		// Windows/Linux: Ctrl+Y for redo
		if (!isMac && e.ctrlKey && e.key === 'y') {
			handleRedo();
			e.preventDefault();
		}
	}

	const years = $derived(createYears(data.studyPlan.durationYears, courses));

	const transversalCourses = $derived(
		courses.filter((course) => isTransversal(course.attributes))
	);

	const hasCodes = $derived(courses.some((course) => course.code));

	const simpleViewUrl = $derived(`/${data.slug}/simple${page.url.search}`);



	// SEO metadata - derived from data
	const seo = $derived.by(() => {
		const collegeAbbr = data.studyPlan.collegeSlug
			? data.studyPlan.collegeSlug.toUpperCase()
			: '';
		const universityAbbr = data.studyPlan.universitySlug.toUpperCase();
		const institution = collegeAbbr ? `${universityAbbr} ${collegeAbbr}` : universityAbbr;
		const title = `${data.studyPlan.degreeName} ・ ${institution} ・ Plande`;
		const description = `Plan de Estudios de ${data.studyPlan.degreeName} en ${data.studyPlan.universityName}${data.studyPlan.collegeName ? ` ・ ${data.studyPlan.collegeName}` : ''}. Visualizá materias, correlatividades y tu progreso académico.`;

		// Build query params for OG URLs
		const ogParams = new URLSearchParams();
		const initialStateLetters =
			data.coursesStates.length > 0 ? encodeCoursesStates(data.coursesStates) : '';
		const initialGradeLetters =
			data.coursesGrades.length > 0 ? encodeGrades(data.coursesGrades) : '';
		if (initialStateLetters) ogParams.set('s', initialStateLetters);
		if (initialGradeLetters) ogParams.set('n', initialGradeLetters);
		const ogQuery = ogParams.toString();

		// Include query params in URLs so progress is preserved when sharing
		const url = `https://plande.app/${data.slug.toLowerCase()}${ogQuery ? `?${ogQuery}` : ''}`;
		const ogImageUrl = `https://plande.app/${data.slug.toLowerCase()}/og.png${ogQuery ? `?${ogQuery}` : ''}`;

		return { title, description, url, ogImageUrl };
	});
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={seo.url} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={seo.url} />
	<meta property="og:site_name" content="Plande" />
	<meta property="og:image" content={seo.ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.ogImageUrl} />

	<!-- Structured Data - Course & Organization -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: data.studyPlan.degreeName,
		description: seo.description,
		provider: {
			'@type': 'CollegeOrUniversity',
			name: getFullCollegeName(data.studyPlan)
		},
		educationalLevel: 'Undergraduate',
		url: seo.url,
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
				item: seo.url
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
		<div class="mt-4 flex justify-center">
			<ViewToggle bind:value={viewMode} />
		</div>
	</header>

	<main class="grid gap-9">
		{#if viewMode === 'diagram'}
			<div id="diagram-container">
				<CourseDiagram {courses} slug={data.slug} bind:this={diagramRef} />
			</div>
		{:else}
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
		{/if}

		<section class="grid gap-3 px-3">
			<ShareButton title={seo.title} />
			<CopyLinkButton />
			<a
				href={simpleViewUrl}
				class="mx-auto text-sm text-blue-700 hover:underline"
			>
				Ver versión simple
			</a>
		</section>

		<AvailableCoursesSection
			{courses}
			{isStrictModeEnabled}
			{showCodes}
			{viewMode}
			{onNavigateToDiagram}
		/>

		<Section id="estadisticas" title="Estadísticas">
			<div class="grid gap-3">
				<Charts {courses} {years} progress={data.studyPlan.progress} />
				<Stats {courses} {years} progress={data.studyPlan.progress} />
			</div>
		</Section>

		<PriorityCourses {courses} {showCodes} {viewMode} {onNavigateToDiagram} />

		<Section id="datos" title="Datos del Plan de Estudios">
			<ul class="grid list-disc gap-3 px-9">
				<li>
					<span class="font-bold">Carrera:</span>
					{data.studyPlan.degreeName}
				</li>
				{#if data.studyPlan.collegeName}
					<li>
						<span class="font-bold">{data.studyPlan.collegeName.split(' ')[0]}:</span>
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
		</Section>

		{#if data.studyPlan.notes && data.studyPlan.notes.length > 0}
			<Section id="notas" title="Notas">
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.studyPlan.notes as note}
						<li class="note">
							{@html marked(note.text)}
						</li>
					{/each}
				</ol>
			</Section>
		{/if}

		{#if data.studyPlan.sources}
			<Section id="fuentes" title="Fuentes">
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
			</Section>
		{/if}

		<Section id="referencias" title="Referencias" description="Posibles estados de una materia:">
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
		</Section>

		<Section
			id="exportar"
			title="Exportar"
			description="Exportá las materias del plan de estudios y su estado en diferentes formatos."
		>
			<div class="flex flex-wrap gap-3 p-3">
				<ExportButton
					format="csv"
					{courses}
					degreeName={data.studyPlan.degreeName}
					universitySlug={data.studyPlan.universitySlug}
					collegeSlug={data.studyPlan.collegeSlug ?? null}
				/>
				<ExportButton
					format="json"
					{courses}
					degreeName={data.studyPlan.degreeName}
					universitySlug={data.studyPlan.universitySlug}
					collegeSlug={data.studyPlan.collegeSlug ?? null}
				/>
				<ExportButton
					format="toon"
					{courses}
					degreeName={data.studyPlan.degreeName}
					universitySlug={data.studyPlan.universitySlug}
					collegeSlug={data.studyPlan.collegeSlug ?? null}
				/>
			</div>
		</Section>

		<Section id="configuracion" title="Configuración">
			<div class="grid gap-3 px-3 md:px-0">
				<SettingToggle
					id="strict-mode"
					bind:value={isStrictModeEnabled}
					label="Modo estricto"
					description="Los requisitos de las materias son obligatorios"
				/>
				{#if hasCodes}
					<SettingToggle
						id="show-codes"
						bind:value={showCodes}
						label="Mostrar identificadores"
						description="Los códigos de las materias se muestran junto a sus nombres"
					/>
				{/if}
				<ResetButton onclick={resetAllState} />
			</div>
		</Section>
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
