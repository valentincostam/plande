<script lang="ts">
	import {
		chevronStrokeColors,
		courseBgColors,
		courseNameColors,
		hoursColors,
		courseStates,
		courseStatesFromInitials
	} from '$lib/course-state';
	import { courseAttributeLabels } from '$lib/course-attribute';
	import { courseTypeLabels, isElectiveOrOptative } from '$lib/course-type';
	import { getVisibleItemTagLabels } from '$lib/visible-item-tags';
	import { slide } from 'svelte/transition';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import StateSelect from './state-select.svelte';
	import NativeRequirement from './native-requirement.svelte';
	import NativeRequirementSummary from './native-requirement-summary.svelte';
	import NativeDependent from './native-dependent.svelte';
	import type { StudyPlanViewItem } from '$lib/study-plan-view';

	type Props = {
		item: StudyPlanViewItem;
		showCodes?: boolean;
		hideTypeBadge?: boolean;
		useCycleButton?: boolean;
	};

	let { item, showCodes = false, hideTypeBadge = false, useCycleButton = false }: Props = $props();

	let isExpanded = $state(false);
	let showGradeFeedback = $state(false);

	function handleClick() {
		isExpanded = !isExpanded;
	}

	function onblur() {
		if (item.item.grade === undefined || item.item.grade === null) return;
		let corrected = false;
		if (item.item.grade < 4) {
			item.item.grade = 4;
			corrected = true;
		} else if (item.item.grade > 10) {
			item.item.grade = 10;
			corrected = true;
		}
		if (corrected) {
			showGradeFeedback = true;
			setTimeout(() => {
				showGradeFeedback = false;
			}, 500);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!item.item.isEnabled) return;
		const key = e.key.toUpperCase();
		const newState = courseStatesFromInitials[key as keyof typeof courseStatesFromInitials];
		if (!newState) return;
		if (newState === courseStates.passed && !item.item.canPass) return;
		e.preventDefault();
		item.item.state = newState;
	}

	const formatHours = (hours: number) => Math.round(hours);
	const hasCompletionRequirements = $derived(
		item.requirementsForCompletion.length > 0 || item.requirementSummariesForCompletion.length > 0
	);
	const indirectDependentsCount = $derived(item.totalDependentCount - item.dependents.length);
	const visibleTagLabels = $derived(getVisibleItemTagLabels(item.item.def.tags));
</script>

<li
	id={item.anchorId}
	class={[
		courseBgColors[item.item.state as keyof typeof courseBgColors],
		'scroll-my-4 overflow-hidden transition-colors md:first:rounded-t-md md:last:rounded-b-md',
		'focus-within:outline-2 focus-within:outline-blue-500'
	]}
>
	<div class="flex items-center pr-3">
		<button
			type="button"
			onclick={handleClick}
			onkeydown={handleKeydown}
			aria-expanded={isExpanded}
			aria-controls={`${item.anchorId}-details`}
			aria-label={`${item.item.def.name}${item.item.def.hours ? `, ${formatHours(item.item.def.hours)} horas` : ''}${!item.item.isEnabled ? ', bloqueada por correlativas' : ''}`}
			aria-keyshortcuts="n e r a"
			class={[
				!item.item.isEnabled && 'pr-0',
				'flex grow cursor-pointer items-center gap-3 p-3 focus:outline-none'
			]}
		>
			<ChevronDownIcon
				class={[
					isExpanded && 'rotate-180',
					chevronStrokeColors[item.item.state as keyof typeof chevronStrokeColors],
					'transition-duration-200 h-5 w-5 flex-none transition-transform'
				]}
			/>
			<span class="flex grow flex-wrap items-center gap-x-3 gap-y-1">
				<span
					class={[
						item.item.isEnabled
							? courseNameColors[item.item.state as keyof typeof courseNameColors]
							: 'text-gray-500',
						'font-noto text-left tracking-tight select-none'
					]}
				>
					{#if showCodes && item.item.def.code}
						<span class="opacity-60">{item.item.def.code}. </span>
					{/if}
					{item.item.def.name}
				</span>
				{#if isElectiveOrOptative(item.item.def.type) && !hideTypeBadge && visibleTagLabels.length === 0}
					<span
						class="rounded-md bg-white/75 px-2 py-1 text-xs leading-none text-gray-600 dark:bg-black/25 dark:text-gray-900"
						>{courseTypeLabels[item.item.def.type]}</span
					>
				{/if}
				{#each visibleTagLabels as label (label)}
					<span
						class="rounded-md bg-white/75 px-2 py-1 text-xs leading-none text-gray-600 dark:bg-black/25 dark:text-gray-900"
						>{label}</span
					>
				{/each}
				{#each (item.item.def.attributes ?? []).filter((attr) => attr !== 'transversal') as attr (attr)}
					<span
						class="rounded-md bg-white/75 px-2 py-1 text-xs leading-none text-gray-600 dark:bg-black/25 dark:text-gray-900"
						>{courseAttributeLabels[attr]}</span
					>
				{/each}
			</span>
			{#if item.item.def.hours}
				<span
					class={[
						hoursColors[item.item.state as keyof typeof hoursColors],
						'shrink-0 text-sm whitespace-nowrap transition-colors'
					]}
				>
					{formatHours(item.item.def.hours)} hs
				</span>
			{/if}
			{#if !item.item.isEnabled}
				<span
					class="flex w-22 flex-none justify-center rounded-md bg-gray-400 px-2 py-1 text-xs text-white select-none dark:bg-gray-500 dark:text-gray-100"
					>Bloqueada</span
				>
			{/if}
		</button>
		{#if item.item.isEnabled}
			<StateSelect
				id={`${item.anchorId}-state-select`}
				bind:value={item.item.state}
				canPass={item.item.canPass}
				courseName={item.item.def.name}
				{useCycleButton}
				onkeydown={handleKeydown}
			/>
		{/if}
	</div>

	{#if isExpanded}
		<div id={`${item.anchorId}-details`} class="px-3 pb-3" transition:slide={{ duration: 200 }}>
			<ul class="grid gap-4 rounded-md bg-white p-3 text-sm dark:bg-gray-50">
				{#if item.item.def.hours}
					<li>
						<strong>Carga horaria:</strong>
						{formatHours(item.item.def.hours)} horas cátedra semanales
					</li>
				{/if}
				{#if item.item.state === courseStates.passed || item.item.grade !== undefined}
					<li class="flex items-center gap-2">
						<strong>Nota de aprobación:</strong>
						<input
							type="number"
							min="4"
							max="10"
							step="1"
							bind:value={item.item.grade}
							{onblur}
							class={[
								'w-20 rounded-md border border-gray-300 px-2 py-1 transition-colors focus:outline-2 focus:outline-blue-500',
								showGradeFeedback ? 'bg-red-100' : 'bg-white dark:bg-gray-200'
							]}
							placeholder="≥ 4"
						/>
					</li>
				{/if}
				{#if item.requirementsForEnrollment.length > 0 || item.requirementSummariesForEnrollment.length > 0}
					<li class="grid gap-2">
						<strong>Requisitos para cursar {hasCompletionRequirements ? '' : 'y rendir'}</strong>
						{#if item.requirementsForEnrollment.length > 0}
							<ul class="grid gap-2">
								{#each item.requirementsForEnrollment as requirement (requirement.id)}
									<NativeRequirement {requirement} {showCodes} />
								{/each}
							</ul>
						{:else}
							<ul class="grid gap-2">
								{#each item.requirementSummariesForEnrollment as summary (`${summary.kind}-${summary.label}`)}
									<NativeRequirementSummary requirement={summary} />
								{/each}
							</ul>
						{/if}
					</li>
				{:else}
					<li>
						<strong>Requisitos para cursar{hasCompletionRequirements ? '' : ' y rendir'}:</strong>
						Ninguno
					</li>
				{/if}
				{#if hasCompletionRequirements}
					<li class="grid gap-2">
						<strong>Requisitos para rendir</strong>
						{#if item.requirementsForCompletion.length > 0}
							<ul class="grid gap-2">
								{#each item.requirementsForCompletion as requirement (requirement.id)}
									<NativeRequirement {requirement} {showCodes} />
								{/each}
							</ul>
						{:else if item.requirementSummariesForCompletion.length > 0}
							<ul class="grid gap-2">
								{#each item.requirementSummariesForCompletion as summary (`${summary.kind}-${summary.label}`)}
									<NativeRequirementSummary requirement={summary} />
								{/each}
							</ul>
						{:else}
							<span>Ninguno</span>
						{/if}
					</li>
				{/if}
				{#if item.dependents.length > 0}
					<li class="grid gap-2">
						<strong>Materias que desbloquea</strong>
						<ul class="grid gap-2">
							{#each item.dependents as dependent (dependent.id)}
								<NativeDependent
									{dependent}
									currentState={item.item.state as (typeof courseStates)[keyof typeof courseStates]}
									{showCodes}
								/>
							{/each}
						</ul>
					</li>
				{:else}
					<li><strong>Materias que desbloquea:</strong> Ninguna</li>
				{/if}
				{#if item.dependents.length > 0}
					<li>
						<strong>Cantidad total de materias que desbloquea:</strong>
						{item.totalDependentCount}
						{#if indirectDependentsCount > 0}
							<span class="text-gray-500">
								({item.dependents.length} directamente, {indirectDependentsCount} indirectamente)
							</span>
						{/if}
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</li>
