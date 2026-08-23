<script lang="ts">
	import { courseStates, type CourseState } from '$lib/course-state';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		percentage: number;
		distribution: Record<CourseState, number>;
		label: string;
		showPercentage?: boolean;
		compact?: boolean;
		class?: ClassValue;
	};

	let {
		percentage,
		distribution,
		label,
		showPercentage = true,
		compact = false,
		class: className
	}: Props = $props();

	const total = $derived(Object.values(distribution).reduce((sum, count) => sum + count, 0));
	const notTakenEnd = $derived(
		total === 0 ? 100 : (distribution[courseStates.notTaken] / total) * 100
	);
	const inProgressEnd = $derived(
		notTakenEnd + (total === 0 ? 0 : (distribution[courseStates.inProgress] / total) * 100)
	);
	const takenEnd = $derived(
		inProgressEnd + (total === 0 ? 0 : (distribution[courseStates.taken] / total) * 100)
	);
	const gradient = $derived(
		`conic-gradient(
			var(--course-state-chart-not-taken) 0% ${notTakenEnd}%,
			var(--course-state-chart-in-progress) ${notTakenEnd}% ${inProgressEnd}%,
			var(--course-state-chart-taken) ${inProgressEnd}% ${takenEnd}%,
			var(--course-state-chart-passed) ${takenEnd}% 100%
		)`
	);
	const roundedPercentage = $derived(Math.max(0, Math.min(100, Math.round(percentage))));
	const accessibleLabel = $derived(
		`${label}: ${roundedPercentage}% completado. ${distribution[courseStates.notTaken]} no cursadas, ${distribution[courseStates.inProgress]} en curso, ${distribution[courseStates.taken]} regulares y ${distribution[courseStates.passed]} aprobadas.`
	);
</script>

<div
	class={[
		'progress-donut relative grid shrink-0 place-items-center rounded-full',
		compact && 'is-compact',
		roundedPercentage === 100 && 'is-complete',
		className
	]}
	style={`--donut-gradient: ${gradient};`}
	role="img"
	aria-label={accessibleLabel}
>
	{#if showPercentage}
		<span class="percentage relative font-bold tabular-nums">
			{roundedPercentage}<span class="percent-sign font-normal">%</span>
		</span>
	{/if}
</div>

<style>
	.progress-donut {
		container-type: inline-size;
		aspect-ratio: 1;
	}

	.progress-donut::before {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: var(--donut-gradient);
		content: '';
		-webkit-mask: radial-gradient(circle closest-side, transparent 0 65%, #000 66% 100%);
		mask: radial-gradient(circle closest-side, transparent 0 65%, #000 66% 100%);
		pointer-events: none;
	}

	.progress-donut.is-compact::before {
		-webkit-mask: radial-gradient(circle closest-side, transparent 0 71%, #000 72% 100%);
		mask: radial-gradient(circle closest-side, transparent 0 71%, #000 72% 100%);
	}

	.progress-donut.is-compact .percentage {
		font-size: 31cqi;
	}

	.progress-donut.is-complete .percentage {
		font-size: 22cqi;
	}

	.progress-donut.is-compact.is-complete .percentage {
		font-size: 27cqi;
	}

	.percentage {
		display: inline-flex;
		align-items: center;
		color: var(--progress-donut-text, var(--recent-text, #111827));
		font-size: 25cqi;
		line-height: 1;
	}

	.percent-sign {
		color: var(--progress-donut-muted, var(--recent-muted, #4b5563));
		font-size: 55%;
	}
</style>
