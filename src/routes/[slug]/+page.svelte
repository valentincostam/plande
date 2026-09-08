<script lang="ts">
	import { buildStudyPlanView, type StudyPlanViewItem } from '$lib/study-plan-view';
	import type { PageProps } from './$types';
	import SettingToggle from './setting-toggle.svelte';
	import ResetButton from './reset-button.svelte';
	import AvailableCoursesSection from './available-courses-section.svelte';
	import Stats from './stats.svelte';
	import Section from './section.svelte';
	import { createUrlSearchParams } from '$lib/url-state-parameter';
	import { replaceState } from '$app/navigation';
	import ShareButton from './share-button.svelte';
	import CopyLinkButton from './copy-link-button.svelte';
	import ExportButton from './export-button.svelte';
	import { marked } from 'marked';
	import StatePill from './state-pill.svelte';
	import { courseStates, encodeCoursesStates } from '$lib/course-state';
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
	import { SvelteMap } from 'svelte/reactivity';
	import Footer from '../footer.svelte';
	import Disclaimer from '../disclaimer.svelte';
	import { getFullCollegeName } from '$lib/study-plan';
	import Link from '$lib/link.svelte';
	import ViewToggle from './view-toggle.svelte';
	import CourseDiagram from './diagram/course-diagram.svelte';
	import PriorityCourses from './priority-courses.svelte';
	import NativeMilestoneCard from './native-milestone-card.svelte';
	import { resolve } from '$app/paths';
	import { preparePlan } from '$lib/prepare-plan';
	import { PlanSession } from '$lib/plan-session.svelte';
	import NativeStudyPlanSection from './native-study-plan-section.svelte';
	import AuthMenu from '$lib/auth/auth-menu.svelte';
	import PrivateProgressConflict from '$lib/private-progress/private-progress-conflict.svelte';
	import { createPrivateProgressSync } from '$lib/private-progress/private-progress-sync.svelte';

	let { data }: PageProps = $props();

	let viewMode = $state<'list' | 'diagram'>('list');
	let diagramRef = $state<CourseDiagram | undefined>();
	let pendingFocusCourseId: string | null = $state(null);

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

	function onNavigateToDiagram(courseId: string) {
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

	// The layout remounts this session when the plan or account changes.
	let isStrictModeEnabled = $state(untrack(() => data.isStrictModeEnabled));
	let showCodes = $state(untrack(() => data.showCodes));
	let useCycleButton = $state(false);
	let isInitializing = $state(true);
	const initialNativeStudyPlan = untrack(() => data.nativeStudyPlan);
	const initialItemStates = untrack(() => data.itemStates);
	const initialItemGrades = untrack(() => data.itemGrades);
	const initialStrictMode = untrack(() => data.isStrictModeEnabled);

	const v5Session = untrack(
		() =>
			new PlanSession(preparePlan(initialNativeStudyPlan), {
				initialStates: initialItemStates,
				initialGrades: initialItemGrades,
				strictMode: initialStrictMode
			})
	);
	const privateProgressItemNames = untrack(() =>
		Object.fromEntries(v5Session.items.map((item) => [item.def.id, item.def.name]))
	);

	$effect(() => {
		v5Session.strictMode = isStrictModeEnabled;
	});

	const studyPlanView = untrack(() => buildStudyPlanView(v5Session));
	// Deduped by item id: multi-placement courses appear in several sections
	// but must count once in stats, charts, diagram and lists.
	const courseItems = untrack(() => {
		const seen = new SvelteMap<string, StudyPlanViewItem>();
		for (const section of studyPlanView.sections) {
			for (const term of section.terms) {
				for (const item of term.items) {
					if (item.item.def.kind === 'course' && !seen.has(item.item.def.id)) {
						seen.set(item.item.def.id, item as StudyPlanViewItem);
					}
				}
			}
		}
		return [...seen.values()];
	});
	const courseItemsById = new SvelteMap<string, StudyPlanViewItem>(
		courseItems.map((item) => [item.item.def.id, item])
	);
	const orderedCourseItems = untrack(
		() =>
			v5Session
				.getCourseItems()
				.map((item) => courseItemsById.get(item.def.id))
				.filter(Boolean) as StudyPlanViewItem[]
	);

	let isRouterReady = $state(false);
	const privateSubject = untrack(() => data.auth?.subject);
	const privatePlanId = untrack(() => data.planId);
	const anonymousStorageKey = untrack(() => `plande-${data.slug}`);
	const storageKey = privateSubject
		? `plande-private-${privateSubject}-${privatePlanId ?? untrack(() => data.slug)}`
		: anonymousStorageKey;
	const persistPrivateProgressAttempt = (attempt: unknown) => {
		try {
			const saved = localStorage.getItem(storageKey);
			const existing = saved ? JSON.parse(saved) : {};
			localStorage.setItem(
				storageKey,
				JSON.stringify({ ...existing, privateProgressPendingAttempt: attempt })
			);
			return true;
		} catch {
			return false;
		}
	};
	const privateProgress = untrack(() =>
		createPrivateProgressSync(v5Session, {
			planId: privatePlanId,
			subject: privateSubject,
			persistAttempt: persistPrivateProgressAttempt
		})
	);
	let disposed = false;

	$effect(() => {
		if (isInitializing || !isRouterReady) return;
		const encodedStates = v5Session.serializeStates();
		const itemGrades = v5Session.items.map((item) =>
			item.def.kind === 'course' ? item.grade : undefined
		);
		const urlSearchParams = createUrlSearchParams(
			encodedStates,
			isStrictModeEnabled,
			showCodes,
			encodeGrades(itemGrades)
		);
		if (!browser) return;
		if (!getIsApplyingHistory()) pushHistoryState(encodedStates);
		else clearIsApplyingHistory();
		const storageData = {
			coursesStates: encodedStates,
			isStrictModeEnabled,
			showCodes,
			useCycleButton,
			grades: itemGrades,
			...(privateSubject
				? {
						...privateProgress.cache
					}
				: {})
		};
		try {
			localStorage.setItem(storageKey, JSON.stringify(storageData));
		} catch {
			privateProgress.localStorageFailed();
		}
		tick().then(() => {
			if (disposed) return;
			const hash = window.location.hash;
			const query = urlSearchParams.toString();
			replaceState(resolve(`/${data.slug}${query ? `?${query}` : ''}${hash}` as `/${string}`), {});
		});
	});

	onMount(() => {
		isRouterReady = true;
		resetHistory();
		void (async () => {
			try {
				const oldOwner = localStorage.getItem(`${anonymousStorageKey}-private-owner`);
				const mayImportAnonymous = !privateSubject || !oldOwner || oldOwner === privateSubject;
				const ownSavedData = localStorage.getItem(storageKey);
				const importedData =
					privateSubject && !ownSavedData && mayImportAnonymous
						? localStorage.getItem(anonymousStorageKey)
						: null;
				const savedData = ownSavedData ?? importedData;
				if (savedData && (privateSubject || mayImportAnonymous)) {
					const parsed = JSON.parse(savedData);
					if (importedData && privateSubject)
						localStorage.setItem(`${anonymousStorageKey}-private-owner`, privateSubject);
					if (parsed.useCycleButton !== undefined) useCycleButton = parsed.useCycleButton;
					if (privateSubject)
						privateProgress.restoreCache(
							parsed.privateProgressBase,
							parsed.privateProgressServer,
							parsed.privateProgressLocal,
							parsed.privateProgressPendingAttempt,
							parsed.privateProgressResolutions,
							data.itemStates.length === 0 && data.itemGrades.length === 0
						);
					if (
						!(
							privateSubject &&
							parsed.privateProgressLocal &&
							data.itemStates.length === 0 &&
							data.itemGrades.length === 0
						)
					) {
						if (data.itemGrades.length === 0 && Array.isArray(parsed.grades)) {
							v5Session.items.forEach((item, index) => {
								if (item.def.kind === 'course') item.grade = parsed.grades[index] ?? undefined;
							});
						}
						if (data.itemStates.length === 0)
							v5Session.applySerializedStates(parsed.coursesStates ?? '');
					}
					if (data.itemStates.length === 0) {
						if (parsed.isStrictModeEnabled !== undefined)
							isStrictModeEnabled = parsed.isStrictModeEnabled;
						if (parsed.showCodes !== undefined) showCodes = parsed.showCodes;
					}
				}
			} catch {
				console.warn('Failed to restore local progress.');
			}
			await privateProgress.hydrate();
			if (!disposed) isInitializing = false;
		})();
		return () => {
			disposed = true;
			privateProgress.dispose();
		};
	});

	$effect(() => {
		if (!isInitializing) privateProgress.sync();
	});

	function resetAllState() {
		const confirmed = window.confirm(
			'¿Confirmás que querés reiniciar todo el progreso? Se perderán estados de materias, notas y configuraciones personalizadas.'
		);
		if (!confirmed) return;

		v5Session.reset();
		isStrictModeEnabled = true;
		showCodes = false;
		useCycleButton = false;
		localStorage.removeItem(storageKey);
		resetHistory();
		if (privateProgress.active) return;
		tick().then(() => {
			window.location.replace(resolve(`/${data.slug}` as `/${string}`));
		});
	}

	function applyHistoryState(encoded: string) {
		v5Session.applySerializedStates(encoded);
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

	const hasCodes = $derived(orderedCourseItems.some((item) => item.item.def.code));

	// Legacy gating: a year's bulk select shows when every section of the
	// previous year is passed (non-year sections are never gated).
	function isPreviousYearPassed(year?: number) {
		if (year === undefined) return true;
		const previousYearSections = studyPlanView.sections.filter(
			(section) => section.year === year - 1
		);
		if (previousYearSections.length === 0) return true;
		return previousYearSections.every((section) => section.section.state === courseStates.passed);
	}

	// SEO metadata - derived from data
	const seo = $derived.by(() => {
		const collegeAbbr = data.studyPlan.collegeSlug ? data.studyPlan.collegeSlug.toUpperCase() : '';
		const universityAbbr = data.studyPlan.universitySlug.toUpperCase();
		const institution = collegeAbbr ? `${universityAbbr} ${collegeAbbr}` : universityAbbr;
		const title = `${data.studyPlan.degreeName} ・ ${institution} ・ Plande`;
		const description = `Plan de Estudios de ${data.studyPlan.degreeName} en ${data.studyPlan.universityName}${data.studyPlan.collegeName ? ` ・ ${data.studyPlan.collegeName}` : ''}. Visualizá materias, correlatividades y tu progreso académico.`;

		// Build query params for OG URLs
		const initialStateLetters =
			data.itemStates.length > 0 ? encodeCoursesStates(data.itemStates) : '';
		const initialGradeLetters = data.itemGrades.length > 0 ? encodeGrades(data.itemGrades) : '';
		const ogQuery = [
			initialStateLetters ? `s=${encodeURIComponent(initialStateLetters)}` : '',
			initialGradeLetters ? `n=${encodeURIComponent(initialGradeLetters)}` : ''
		]
			.filter(Boolean)
			.join('&');

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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
	})}<${'/'}script>`}

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
	})}<${'/'}script>`}
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<Link href={resolve('/')} class="text-sm leading-loose">Plande</Link>
		<p>
			Plan de Estudios {data.studyPlan.year ?? ''} · {data.studyPlan.universitySlug}
			{data.studyPlan.collegeSlug ?? ''}
		</p>
		<h1 class="text-2xl font-bold">{data.studyPlan.degreeName}</h1>
		<div class="mt-2 flex justify-center">
			<AuthMenu
				auth={data.auth}
				enabled={data.authEnabled}
				authUnavailable={data.authUnavailable}
				signOutFailed={data.signOutFailed}
			/>
		</div>
		{#if data.privateProgressUnavailable}
			<p class="mt-2" role="alert">
				Tu progreso sigue en este dispositivo. No pudimos conectar tu cuenta.
			</p>
			<button type="button" class="btn btn-sm mt-2" onclick={() => window.location.reload()}
				>Reintentar conexión</button
			>
		{/if}
		{#if privateProgress.active && privateProgress.status}
			<div class="mt-2">
				{#if privateProgress.status === 'pending'}
					<p role="status">Guardando tu progreso privado…</p>
				{:else if privateProgress.status === 'saved'}
					<p role="status">Progreso privado guardado.</p>
				{:else if privateProgress.status === 'session-changed'}
					<p class="alert alert-warning" role="alert">
						La cuenta cambió en otra pestaña. Recargá para continuar.
					</p>
					<button type="button" class="btn btn-sm mt-2" onclick={() => window.location.reload()}
						>Recargar</button
					>
				{:else if privateProgress.status === 'conflict'}
					<PrivateProgressConflict
						conflicts={privateProgress.conflicts}
						itemNames={privateProgressItemNames}
						onchoose={(itemId, field, choice) => privateProgress.resolve(itemId, field, choice)}
					/>
				{:else}
					<p class="alert alert-error" role="alert">No pudimos guardar tu progreso privado.</p>
					<button
						class="btn btn-sm mt-2"
						type="button"
						onclick={() => void privateProgress.retry()}
					>
						Reintentar
					</button>
				{/if}
			</div>
		{/if}
		<div class="mt-4 flex justify-center">
			<ViewToggle bind:value={viewMode} />
		</div>
	</header>

	<main class="grid gap-9" aria-busy={isInitializing}>
		{#if viewMode === 'diagram'}
			<div id="diagram-container">
				<CourseDiagram
					items={courseItems}
					slug={data.slug}
					{useCycleButton}
					bind:this={diagramRef}
				/>
			</div>
		{:else}
			<div class="grid gap-9">
				{#each studyPlanView.sections as section (section.id)}
					<NativeStudyPlanSection
						{section}
						{showCodes}
						{useCycleButton}
						showBulkSelect={!isStrictModeEnabled || isPreviousYearPassed(section.year)}
					/>
				{/each}
				{#if studyPlanView.additionalRequirements.length > 0}
					<Section id="hitos" title="Hitos y requisitos adicionales">
						<ul class="grid gap-1">
							{#each studyPlanView.additionalRequirements as item (item.item.def.id)}
								<NativeMilestoneCard {item} />
							{/each}
						</ul>
					</Section>
				{/if}
			</div>
		{/if}

		<section class="grid gap-3 px-3">
			<ShareButton title={seo.title} />
			<CopyLinkButton />
		</section>

		<AvailableCoursesSection
			items={courseItems}
			{isStrictModeEnabled}
			{showCodes}
			{viewMode}
			{onNavigateToDiagram}
		/>

		<Section id="estadisticas" title="Estadísticas">
			<div class="grid gap-3">
				<Charts
					items={courseItems}
					sections={studyPlanView.sections}
					percentage={studyPlanView.graduation.percentage}
				/>
				<Stats
					items={courseItems}
					sections={studyPlanView.sections}
					graduationRequirements={data.nativeStudyPlan.requirements?.graduation ?? []}
					graduationBlocks={studyPlanView.graduation.blocks}
				/>
			</div>
		</Section>

		<PriorityCourses items={courseItems} {showCodes} {viewMode} {onNavigateToDiagram} />

		<Section id="datos" title="Datos del Plan de Estudios">
			<ul class="grid list-disc gap-3 px-9 text-gray-700 dark:text-gray-700">
				<li>
					<span class="font-bold text-gray-900 dark:text-gray-900">Carrera:</span>
					{data.studyPlan.degreeName}
				</li>
				{#if data.studyPlan.collegeName}
					<li>
						<span class="font-bold text-gray-900 dark:text-gray-900"
							>{data.studyPlan.collegeName.split(' ')[0]}:</span
						>
						{data.studyPlan.collegeName} ({data.studyPlan.collegeSlug})
					</li>
				{/if}
				<li>
					<span class="font-bold text-gray-900 dark:text-gray-900">Universidad:</span>
					{data.studyPlan.universityName} ({data.studyPlan.universitySlug})
				</li>
				<li>
					<span class="font-bold text-gray-900 dark:text-gray-900">Duración:</span>
					{data.studyPlan.durationYears} años
				</li>
				{#if data.studyPlan.year}
					<li>
						<span class="font-bold text-gray-900 dark:text-gray-900">Año de aprobación:</span>
						{data.studyPlan.year}
					</li>
				{/if}
			</ul>
		</Section>

		{#if data.studyPlan.notes && data.studyPlan.notes.length > 0}
			<Section id="notas" title="Notas">
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.studyPlan.notes as note, noteIndex (`${noteIndex}-${note.text}`)}
						<li class="note text-gray-700 dark:text-gray-700">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html marked(note.text)}
						</li>
					{/each}
				</ol>
			</Section>
		{/if}

		{#if data.studyPlan.sources}
			<Section id="fuentes" title="Fuentes">
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.studyPlan.sources as source (source.url)}
						<li>
							{#if source.url.startsWith('/')}
								<Link href={resolve(source.url as `/${string}`)}>
									{source.label}
								</Link>
							{:else}
								<Link href={`https://${source.url.replace(/^https?:\/\//, '')}`}>
									{source.label}
								</Link>
							{/if}
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
					items={orderedCourseItems}
					degreeName={data.studyPlan.degreeName}
					universitySlug={data.studyPlan.universitySlug}
					collegeSlug={data.studyPlan.collegeSlug ?? null}
				/>
				<ExportButton
					format="json"
					items={orderedCourseItems}
					degreeName={data.studyPlan.degreeName}
					universitySlug={data.studyPlan.universitySlug}
					collegeSlug={data.studyPlan.collegeSlug ?? null}
				/>
				<ExportButton
					format="toon"
					items={orderedCourseItems}
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
				<SettingToggle
					id="cycle-state-button"
					bind:value={useCycleButton}
					label="Botón cíclico para estados"
					description="Reemplaza el desplegable por un botón que rota entre estados"
				/>
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
		text-underline-offset: 3px;
		transition: color 150ms ease;

		&:hover,
		&:focus {
			color: var(--color-blue-900);
			text-decoration: underline;
		}
	}

	:global(.dark) .note :global(a) {
		color: #9ecbff;

		&:hover,
		&:focus {
			color: #c7e2ff;
		}
	}

	.note :global(strong) {
		color: var(--color-gray-900);
		font-weight: 700;
	}
</style>
