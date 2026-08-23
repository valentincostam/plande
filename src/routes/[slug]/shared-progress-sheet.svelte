<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import type { StudyPlanProgressSummary } from '$lib/study-plan-progress';
	import {
		panelPreferenceKeys,
		readPanelExpandedPreference,
		writePanelExpandedPreference
	} from '$lib/panel-preference';
	import { onMount } from 'svelte';
	import StateDistributionDonut from '../state-distribution-donut.svelte';

	type Props = {
		currentSummary: StudyPlanProgressSummary;
		localSummary: StudyPlanProgressSummary;
		differentCoursesCount: number;
		onUseShared: () => void;
		onUseLocal: () => void;
		reservedHeight?: number;
	};

	let {
		currentSummary,
		localSummary,
		differentCoursesCount,
		onUseShared,
		onUseLocal,
		reservedHeight = $bindable(0)
	}: Props = $props();

	let expanded = $state(true);
	let preferenceReady = $state(false);
	let expandedHeight = $state(0);
	let bottomSpace = $state(0);

	$effect(() => {
		reservedHeight = preferenceReady ? (expanded ? expandedHeight : 46) + bottomSpace : 0;
	});

	onMount(() => {
		expanded = readPanelExpandedPreference(panelPreferenceKeys.sharedProgress);
		preferenceReady = true;
	});

	function toggleExpanded() {
		const nextExpanded = !expanded;
		expanded = nextExpanded;
		writePanelExpandedPreference(panelPreferenceKeys.sharedProgress, nextExpanded);
	}

	function formatCourseCount(count: number, singular: string, plural: string) {
		return `${count} ${count === 1 ? singular : plural}`;
	}
</script>

{#if preferenceReady}
	<div class="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto max-w-2xl px-3">
		<section aria-label="Elegir progreso" class="shared-progress-stage relative mx-auto w-full">
			<div
				bind:clientHeight={expandedHeight}
				role="group"
				aria-label="Opciones de progreso expandidas"
				aria-hidden={!expanded}
				inert={!expanded}
				class:is-visible={expanded}
				class="expanded-panel relative overflow-hidden rounded-xl border"
			>
				<header class="panel-divider border-b">
					<button
						type="button"
						onclick={toggleExpanded}
						class="panel-control flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-4 text-left"
						aria-label="Colapsar opciones de progreso"
						aria-expanded="true"
					>
						<span role="heading" aria-level="2" class="panel-title text-base font-bold">
							Elegir progreso
						</span>
						<span class="grid size-5 shrink-0 place-items-center" aria-hidden="true">
							<svg viewBox="0 0 24 24" class="size-5">
								<path
									d="m6.5 9.5 5.5 5 5.5-5"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span>
					</button>
				</header>

				<div class="px-4 py-3">
					<p class="panel-message text-sm leading-5">
						El link y este dispositivo tienen progresos distintos
					</p>
					<p class="panel-detail mt-0.5 text-xs">
						{#if differentCoursesCount > 0}
							<span>
								{differentCoursesCount}
								{differentCoursesCount === 1
									? 'materia tiene un estado distinto.'
									: 'materias tienen estados distintos.'}
							</span>
						{:else}
							<span>El modo estricto es distinto.</span>
						{/if}
						<span> Estás editando el progreso del link; lo guardado no cambia.</span>
					</p>
				</div>

				<div role="group" aria-label="Progresos disponibles" class="choice-list border-t">
					<article>
						<button
							type="button"
							onclick={onUseShared}
							aria-label={`Usar progreso del link: ${currentSummary.percentage}%`}
							class="progress-choice grid w-full cursor-pointer grid-cols-[3rem_1fr] items-center gap-3 px-4 py-3 text-left"
						>
							<StateDistributionDonut
								percentage={currentSummary.percentage}
								distribution={currentSummary.distribution}
								label="Progreso del link"
								class="size-12"
							/>
							<span class="min-w-0">
								<span
									class="choice-title flex flex-wrap items-center gap-x-2 text-sm font-semibold"
								>
									Progreso del link
									<span class="viewing-label text-[0.65rem] font-medium">Viendo ahora</span>
								</span>
								<span class="choice-detail mt-0.5 flex flex-wrap gap-x-1 text-xs">
									<span>{formatCourseCount(currentSummary.passed, 'aprobada', 'aprobadas')},</span>
									<span
										>{formatCourseCount(
											currentSummary.distribution[courseStates.taken],
											'regular',
											'regulares'
										)} y</span
									>
									<span>{currentSummary.inProgress} en curso</span>
								</span>
								{#if currentSummary.graded > 0}
									<span class="choice-detail block text-xs">
										{currentSummary.graded}
										{currentSummary.graded === 1 ? 'nota' : 'notas'}
									</span>
								{/if}
							</span>
						</button>
					</article>

					<article class="panel-divider border-t">
						<button
							type="button"
							onclick={onUseLocal}
							aria-label={`Usar progreso guardado en este dispositivo: ${localSummary.percentage}%`}
							class="progress-choice grid w-full cursor-pointer grid-cols-[3rem_1fr] items-center gap-3 px-4 py-3 text-left"
						>
							<StateDistributionDonut
								percentage={localSummary.percentage}
								distribution={localSummary.distribution}
								label="Tu progreso guardado"
								class="size-12"
							/>
							<span class="min-w-0">
								<span
									class="choice-title flex flex-wrap items-center gap-x-2 text-sm font-semibold"
								>
									Tu progreso guardado
								</span>
								<span class="choice-detail mt-0.5 flex flex-wrap gap-x-1 text-xs">
									<span>{formatCourseCount(localSummary.passed, 'aprobada', 'aprobadas')},</span>
									<span
										>{formatCourseCount(
											localSummary.distribution[courseStates.taken],
											'regular',
											'regulares'
										)} y</span
									>
									<span>{localSummary.inProgress} en curso</span>
								</span>
								{#if localSummary.graded > 0}
									<span class="choice-detail block text-xs">
										{localSummary.graded}
										{localSummary.graded === 1 ? 'nota' : 'notas'}
									</span>
								{/if}
								<span class="saved-state-hint mt-1 block text-xs">
									Los puntos muestran los estados guardados.
								</span>
							</span>
						</button>
					</article>
				</div>
			</div>

			<button
				type="button"
				onclick={toggleExpanded}
				disabled={expanded}
				aria-hidden={expanded}
				aria-label="Expandir opciones de progreso"
				aria-expanded="false"
				class:is-visible={!expanded}
				class="compact-button absolute bottom-0 left-1/2 flex h-[2.875rem] w-max max-w-full -translate-x-1/2 cursor-pointer items-center rounded-full border pl-3 text-left"
			>
				<StateDistributionDonut
					percentage={currentSummary.percentage}
					distribution={currentSummary.distribution}
					label="Progreso del link"
					compact
					class="size-7"
				/>
				<span class="compact-label pl-2 text-xs font-semibold whitespace-nowrap">Link</span>

				<StateDistributionDonut
					percentage={localSummary.percentage}
					distribution={localSummary.distribution}
					label="Tu progreso guardado"
					compact
					class="ml-3 size-7"
				/>
				<span class="compact-label pl-2 text-xs font-semibold whitespace-nowrap">Guardado</span>

				<span class="compact-chevron grid size-11 shrink-0 place-items-center" aria-hidden="true">
					<svg viewBox="0 0 24 24" class="size-5">
						<path
							d="m6.5 14.5 5.5-5 5.5 5"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
			</button>
		</section>

		<div
			bind:clientHeight={bottomSpace}
			aria-hidden="true"
			class="h-[max(0.75rem,env(safe-area-inset-bottom))]"
		></div>
	</div>
{/if}

<style>
	@keyframes sheet-enter {
		from {
			transform: translate3d(0, calc(100% + 1rem), 0);
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}

	.shared-progress-stage {
		--sheet-bg: #ffffff;
		--sheet-border: #e5e7eb;
		--sheet-text: #111827;
		--sheet-muted: #4b5563;
		--sheet-hover: #f3f4f6;
		--sheet-active: #e5e7eb;
		--sheet-viewing-bg: #dbeafe;
		--sheet-viewing-text: #1e40af;
		--sheet-shadow: rgb(15 23 42 / 0.08);
		--progress-donut-text: var(--sheet-text);
		--progress-donut-muted: var(--sheet-muted);
		animation: sheet-enter 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	:global(.dark) .shared-progress-stage {
		--sheet-bg: #000000;
		--sheet-border: #1c1c20;
		--sheet-text: #f4f4f5;
		--sheet-muted: #a1a1aa;
		--sheet-hover: #101013;
		--sheet-active: #18181c;
		--sheet-viewing-bg: #172554;
		--sheet-viewing-text: #bfdbfe;
		--sheet-shadow: rgb(0 0 0 / 0);
	}

	.expanded-panel,
	.compact-button {
		background-color: var(--sheet-bg);
		border-color: var(--sheet-border);
		box-shadow: 0 0.25rem 0.5rem var(--sheet-shadow);
	}

	.panel-divider,
	.choice-list {
		border-color: var(--sheet-border);
	}

	.panel-title,
	.choice-title {
		color: var(--sheet-text);
	}

	.panel-message {
		color: var(--sheet-text);
	}

	.panel-detail,
	.choice-detail,
	.saved-state-hint,
	.panel-control,
	.compact-button,
	.compact-chevron {
		color: var(--sheet-muted);
	}

	.viewing-label {
		border-radius: 0.25rem;
		background-color: var(--sheet-viewing-bg);
		color: var(--sheet-viewing-text);
		padding: 0.125rem 0.375rem;
	}

	.panel-control:hover,
	.progress-choice:hover,
	.compact-button:hover {
		background-color: var(--sheet-hover);
	}

	.panel-control:active,
	.progress-choice:active,
	.compact-button:active {
		background-color: var(--sheet-active);
	}

	.expanded-panel,
	.compact-button {
		opacity: 0;
		pointer-events: none;
		transition:
			transform 180ms cubic-bezier(0.7, 0, 0.84, 0),
			opacity 120ms cubic-bezier(0.7, 0, 0.84, 0),
			background-color 150ms cubic-bezier(0.25, 1, 0.5, 1);
		transform: translate3d(0, calc(100% + 1rem), 0);
	}

	.expanded-panel.is-visible,
	.compact-button.is-visible {
		opacity: 1;
		pointer-events: auto;
		transition:
			transform 240ms cubic-bezier(0.16, 1, 0.3, 1) 180ms,
			opacity 120ms cubic-bezier(0.16, 1, 0.3, 1) 180ms,
			background-color 150ms cubic-bezier(0.25, 1, 0.5, 1);
		transform: translate3d(0, 0, 0);
	}

	@media (prefers-reduced-motion: reduce) {
		.shared-progress-stage {
			animation: none;
		}

		.expanded-panel,
		.compact-button,
		.expanded-panel.is-visible,
		.compact-button.is-visible {
			transition-duration: 0.01ms;
			transition-delay: 0ms;
		}
	}
</style>
