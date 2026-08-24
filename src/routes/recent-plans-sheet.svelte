<script lang="ts">
	import { resolve } from '$app/paths';
	import type { StudyPlan } from '$lib/study-plan';
	import type { StudyPlanProgressSummary } from '$lib/study-plan-progress';
	import {
		panelPreferenceKeys,
		readPanelExpandedPreference,
		writePanelExpandedPreference
	} from '$lib/panel-preference';
	import { onMount } from 'svelte';
	import StateDistributionDonut from './state-distribution-donut.svelte';

	type RecentPlan = {
		slug: string;
		studyPlan: StudyPlan;
		summary: StudyPlanProgressSummary;
	};

	type Props = {
		plans: RecentPlan[];
		onRemove: (slug: string) => void;
		reservedHeight?: number;
	};

	let { plans, onRemove, reservedHeight = $bindable(0) }: Props = $props();
	let expanded = $state(true);
	let preferenceReady = $state(false);
	let expandedHeight = $state(0);
	let bottomSpace = $state(0);

	const latestPlan = $derived(plans[0]);
	const previousPlans = $derived(plans.slice(1));
	const panelTitle = $derived(
		plans.length === 1 ? 'Último plan visitado' : 'Últimos planes visitados'
	);
	const collapseLabel = $derived(
		plans.length === 1 ? 'Colapsar último plan visitado' : 'Colapsar últimos planes visitados'
	);
	const expandLabel = $derived(
		plans.length === 1 ? 'Expandir último plan visitado' : 'Expandir últimos planes visitados'
	);

	$effect(() => {
		reservedHeight = preferenceReady ? (expanded ? expandedHeight : 46) + bottomSpace : 0;
	});

	onMount(() => {
		expanded = readPanelExpandedPreference(panelPreferenceKeys.recentPlans);
		preferenceReady = true;
	});

	function institutionLabel(studyPlan: StudyPlan): string {
		return [studyPlan.universitySlug, studyPlan.collegeSlug]
			.filter(Boolean)
			.join(' ')
			.toUpperCase();
	}

	function toggleExpanded() {
		const nextExpanded = !expanded;
		expanded = nextExpanded;
		writePanelExpandedPreference(panelPreferenceKeys.recentPlans, nextExpanded);
	}
</script>

{#if preferenceReady}
	<div class="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto max-w-2xl px-3">
		<section
			aria-labelledby={expanded ? 'recent-plans-heading' : undefined}
			aria-label={expanded ? undefined : panelTitle}
			class="recent-plans-stage relative mx-auto w-full"
		>
			<div
				bind:clientHeight={expandedHeight}
				role="group"
				aria-label={`Panel de ${panelTitle.toLowerCase()}`}
				aria-hidden={!expanded}
				inert={!expanded}
				class:is-visible={expanded}
				class="expanded-panel relative overflow-hidden rounded-xl shadow-[0_0.25rem_0.5rem_var(--recent-shadow)] ring-1 ring-gray-900/10"
			>
				<header class="panel-divider border-b">
					<h2 id="recent-plans-heading">
						<button
							type="button"
							onclick={toggleExpanded}
							class="panel-control flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-4 text-left"
							aria-label={collapseLabel}
							aria-expanded="true"
						>
							<span class="panel-title text-base font-bold">{panelTitle}</span>
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
					</h2>
				</header>

				{#if latestPlan}
					<div role="group" aria-label="Último plan usado">
						<div class="plan-entry relative">
							<a
								href={resolve(`/${latestPlan.slug}` as `/${string}`)}
								aria-label={`Continuar con ${latestPlan.studyPlan.degreeName}`}
								class="plan-link grid min-h-24 cursor-pointer grid-cols-[4rem_1fr] items-center gap-3 py-3 pr-12 pl-4"
							>
								<StateDistributionDonut
									percentage={latestPlan.summary.percentage}
									distribution={latestPlan.summary.distribution}
									label={latestPlan.studyPlan.degreeName}
									class="size-16"
								/>
								<span class="min-w-0">
									<span class="degree-name line-clamp-2 text-base leading-5 font-bold">
										{latestPlan.studyPlan.degreeName}
									</span>
									<span class="institution-name mt-1 block text-xs font-medium">
										{institutionLabel(latestPlan.studyPlan)}
									</span>
								</span>
							</a>
							<button
								type="button"
								onclick={() => onRemove(latestPlan.slug)}
								aria-label={`Quitar ${latestPlan.studyPlan.degreeName} de últimos planes visitados`}
								title="Quitar de últimos planes visitados"
								class="remove-plan-button absolute top-0 right-0 z-10 size-11 cursor-pointer rounded-full"
							>
								<svg viewBox="0 0 24 24" class="size-4" aria-hidden="true">
									<path
										d="m8 8 8 8m0-8-8 8"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				{/if}

				{#if previousPlans.length > 0}
					<div
						role="group"
						aria-label="Planes usados anteriormente"
						class:grid-cols-2={previousPlans.length > 1}
						class:divide-x={previousPlans.length > 1}
						class="panel-divider grid grid-cols-1 border-t"
					>
						{#each previousPlans as plan (plan.slug)}
							<div class="plan-entry relative min-w-0">
								<a
									href={resolve(`/${plan.slug}` as `/${string}`)}
									aria-label={`Continuar con ${plan.studyPlan.degreeName}`}
									class="plan-link flex min-h-16 min-w-0 cursor-pointer items-center gap-2 py-2 pr-11 pl-3"
								>
									<StateDistributionDonut
										percentage={plan.summary.percentage}
										distribution={plan.summary.distribution}
										label={plan.studyPlan.degreeName}
										class="size-10"
									/>
									<span class="min-w-0">
										<span
											class="degree-name line-clamp-2 text-[0.7rem] leading-[0.85rem] font-semibold"
										>
											{plan.studyPlan.degreeName}
										</span>
										<span class="institution-name mt-0.5 block truncate text-[0.6rem] font-medium">
											{institutionLabel(plan.studyPlan)}
										</span>
									</span>
								</a>
								<button
									type="button"
									onclick={() => onRemove(plan.slug)}
									aria-label={`Quitar ${plan.studyPlan.degreeName} de últimos planes visitados`}
									title="Quitar de últimos planes visitados"
									class="remove-plan-button absolute top-0 right-0 z-10 size-11 cursor-pointer rounded-full"
								>
									<svg viewBox="0 0 24 24" class="size-4" aria-hidden="true">
										<path
											d="m8 8 8 8m0-8-8 8"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			{#if latestPlan}
				<button
					type="button"
					onclick={toggleExpanded}
					disabled={expanded}
					aria-hidden={expanded}
					aria-label={expandLabel}
					aria-expanded="false"
					class:is-visible={!expanded}
					class="compact-button absolute bottom-0 left-1/2 flex h-[2.875rem] w-max max-w-full -translate-x-1/2 cursor-pointer items-center rounded-full pl-3 text-left shadow-[0_0.25rem_0.5rem_var(--recent-shadow)] ring-1 ring-gray-900/10"
				>
					<StateDistributionDonut
						percentage={latestPlan.summary.percentage}
						distribution={latestPlan.summary.distribution}
						label={latestPlan.studyPlan.degreeName}
						showPercentage={false}
						class="size-5"
					/>
					<span class="compact-label min-w-0 truncate pl-2 text-xs font-semibold whitespace-nowrap">
						{latestPlan.studyPlan.degreeSlug.toUpperCase()} ・ {[
							latestPlan.studyPlan.universitySlug,
							latestPlan.studyPlan.collegeSlug
						]
							.filter(Boolean)
							.join(' ')
							.toUpperCase()}
					</span>
					<span class="compact-percentage shrink-0 pl-1 text-xs font-semibold">
						・ {latestPlan.summary.percentage}%
					</span>
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
			{/if}
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

	.recent-plans-stage {
		--recent-bg: #ffffff;
		--recent-border: #e5e7eb;
		--recent-text: #111827;
		--recent-muted: #4b5563;
		--recent-link: #1e40af;
		--recent-hover: #f3f4f6;
		--recent-active: #e5e7eb;
		--recent-shadow: rgb(15 23 42 / 0.08);
		animation: sheet-enter 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	:global(.dark) .recent-plans-stage {
		--recent-bg: #000000;
		--recent-border: #1c1c20;
		--recent-text: #f4f4f5;
		--recent-muted: #a1a1aa;
		--recent-link: #93c5fd;
		--recent-hover: #101013;
		--recent-active: #18181c;
		--recent-shadow: rgb(0 0 0 / 0);
	}

	.expanded-panel,
	.compact-button {
		background-color: var(--recent-bg);
	}

	.panel-divider {
		border-color: var(--recent-border);
	}

	.panel-divider > :not(:last-child) {
		border-color: var(--recent-border);
	}

	.panel-title {
		color: var(--recent-text);
	}

	.panel-control,
	.compact-chevron {
		color: var(--recent-muted);
	}

	.panel-control:hover,
	.plan-link:hover {
		background-color: var(--recent-hover);
	}

	.panel-control:hover {
		color: var(--recent-text);
	}

	.panel-control:active,
	.plan-link:active {
		background-color: var(--recent-active);
	}

	.degree-name {
		color: var(--recent-link);
	}

	.institution-name,
	.compact-button {
		color: var(--recent-muted);
	}

	.remove-plan-button {
		display: none;
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

	@media (hover: hover) and (pointer: fine) and (min-width: 40rem) {
		.remove-plan-button {
			display: grid;
			place-items: center;
			color: var(--recent-muted);
			opacity: 0;
			pointer-events: none;
			transition:
				opacity 120ms cubic-bezier(0.25, 1, 0.5, 1),
				color 120ms cubic-bezier(0.25, 1, 0.5, 1),
				background-color 120ms cubic-bezier(0.25, 1, 0.5, 1);
		}

		.plan-entry:hover .remove-plan-button,
		.plan-entry:focus-within .remove-plan-button {
			opacity: 1;
			pointer-events: auto;
		}

		.plan-entry:hover .plan-link,
		.remove-plan-button:hover {
			background-color: var(--recent-hover);
		}

		.remove-plan-button:hover {
			color: var(--recent-text);
		}

		.remove-plan-button:focus-visible {
			opacity: 1;
			outline: 2px solid var(--color-blue-500);
			outline-offset: -2px;
		}

		.compact-button.is-visible:hover {
			background-color: var(--recent-hover);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.recent-plans-stage {
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
