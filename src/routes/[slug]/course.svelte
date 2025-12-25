<script lang="ts">
	import {
		chevronStrokeColors,
		courseBgColors,
		courseNameColors,
		courseStates,
		courseStatesFromInitials,
		hoursColors,
		isCourseStateGreaterOrEqual
	} from '$lib/course-state';
	import { toKebabCase, type Course, countAllDependents } from '$lib/course.svelte';
	import { courseAttributeLabels, isTransversal } from '$lib/course-attribute';
	import { courseTypeLabels, isElectiveOrOptative } from '$lib/course-type';
	import { slide } from 'svelte/transition';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import Requirement from './requirement.svelte';
	import StateSelect from './state-select.svelte';
	import Dependent from './dependent.svelte';

	type Props = {
		course: Course;
		showCodes?: boolean;
		hideTypeBadge?: boolean;
	};

	let { course, showCodes = false, hideTypeBadge = false }: Props = $props();

	let isExpanded = $state(false);
	let showGradeFeedback = $state(false);

	function onclick() {
		isExpanded = !isExpanded;
	}

	function onblur() {
		if (course.grade === undefined || course.grade === null) return;

		let corrected = false;

		if (course.grade < 4) {
			course.grade = 4;
			corrected = true;
		} else if (course.grade > 10) {
			course.grade = 10;
			corrected = true;
		}

		if (corrected) {
			showGradeFeedback = true;
			setTimeout(() => {
				showGradeFeedback = false;
			}, 500);
		}
	}

	function onkeydown(e: KeyboardEvent) {
		if (!course.isEnabled) return;

		const key = e.key.toUpperCase();
		const newState = courseStatesFromInitials[key as keyof typeof courseStatesFromInitials];

		if (!newState) return;
		if (newState === courseStates.passed && !course.canPass) return;

		e.preventDefault();
		course.state = newState;
	}

	const numberFormatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 });

	const hasRequirementsForCompletion = $derived(course.requirementsForCompletion.length > 0);
	const totalDependentsCount = $derived(countAllDependents(course));
	const indirectDependentsCount = $derived(totalDependentsCount - course.dependents.length);
</script>

<li
	id={toKebabCase(course.name)}
	class={[
		courseBgColors[course.state],
		'transition-color scroll-my-4 overflow-hidden md:first:rounded-t-md md:last:rounded-b-md',
		'focus-within:outline-2 focus-within:outline-blue-500'
	]}
>
	<div class="flex items-center pr-3">
		<button
			{onclick}
			{onkeydown}
			aria-expanded={isExpanded}
			aria-controls="{toKebabCase(course.name)}-details"
			aria-label="{course.name}{course.hours ? `, ${numberFormatter.format(course.hours)} horas` : ''}{!course.isEnabled ? ', bloqueada por correlativas' : ''}"
			aria-keyshortcuts="n e r a"
			class={[
				!course.isEnabled && 'pr-0',
				'flex grow cursor-pointer items-center gap-3 p-3 focus:outline-none'
			]}
		>
			<ChevronDownIcon
				class={[
					isExpanded && 'rotate-180',
					chevronStrokeColors[course.state],
					'transition-duration-200 h-5 w-5 flex-none transition-transform'
				]}
			/>
			<span class="flex grow flex-wrap items-center gap-x-3 gap-y-1">
				<span
					class={[
						course.isEnabled ? courseNameColors[course.state] : 'text-gray-500',
						'font-noto text-left tracking-tight select-none'
					]}
				>
					{#if showCodes && course.code}
						<span class="opacity-60">{course.code}. </span>
					{/if}
					{course.name}
				</span>
				{#if isElectiveOrOptative(course.type) && !hideTypeBadge}
					<span class="rounded-md bg-white px-2 py-1 text-xs leading-none text-gray-600"
						>{courseTypeLabels[course.type]}</span
					>
				{/if}
				{#each course.attributes.filter((attr) => attr !== 'transversal') as attr}
					<span class="rounded-md bg-white px-2 py-1 text-xs leading-none text-gray-600"
						>{courseAttributeLabels[attr]}</span
					>
				{/each}
			</span>
			{#if course.hours}
				<span
					class={[
						hoursColors[course.state],
						'shrink-0 text-sm whitespace-nowrap transition-colors'
					]}
				>
					{numberFormatter.format(course.hours)} hs
				</span>
			{/if}
			{#if !course.isEnabled}
				<span
					class="flex w-20 flex-none justify-center rounded-md bg-gray-400 p-1 text-xs text-white select-none"
				>
					Bloqueada
				</span>
			{/if}
		</button>
		{#if course.isEnabled}
			<StateSelect
				id={`${toKebabCase(course.name)}-state-select`}
				bind:value={course.state}
				canPass={course.canPass}
				courseName={course.name}
				{onkeydown}
			/>
		{/if}
	</div>

	{#if isExpanded}
		<div id="{toKebabCase(course.name)}-details" class="px-3 pb-3" transition:slide={{ duration: 200 }}>
			<ul class="grid gap-4 rounded-md bg-white p-3 text-sm">
				{#if course.hours}
					<li>
						<strong>Carga horaria:</strong>
						{numberFormatter.format(course.hours)} horas cátedra semanales
					</li>
				{/if}
				{#if course.state === courseStates.passed || course.grade !== undefined}
					<li class="flex items-center gap-2">
						<strong>Nota de aprobación:</strong>
						<input
							type="number"
							min="4"
							max="10"
							step="1"
							bind:value={course.grade}
							{onblur}
							class={[
								'w-20 rounded-md border border-gray-300 px-2 py-1 transition-colors focus:outline-2 focus:outline-blue-500',
								showGradeFeedback ? 'bg-red-100' : 'bg-white'
							]}
							placeholder="≥ 4"
						/>
					</li>
				{/if}
				{#if course.requirementsForEnrollment.length > 0}
					<li class="grid gap-2">
						<strong>Requisitos para cursar {hasRequirementsForCompletion ? '' : 'y rendir'}</strong>
						<ul class="grid gap-2">
							{#each course.requirementsForEnrollment as requirement}
								<Requirement {requirement} {showCodes} />
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<strong
							>Requisitos para cursar{hasRequirementsForCompletion ? '' : ' y rendir'}:
						</strong> Ninguno
					</li>
				{/if}
				{#if hasRequirementsForCompletion}
					{#if course.requirementsForCompletion.length > 0}
						<li class="grid gap-2">
							<strong>Requisitos para rendir</strong>
							<ul class="grid gap-2">
								{#each course.requirementsForCompletion as requirement}
									<Requirement {requirement} {showCodes} />
								{/each}
							</ul>
						</li>
					{:else}
						<li>
							<strong>Requisitos para rendir:</strong> Ninguno
						</li>
					{/if}
				{/if}
				{#if course.dependents.length > 0}
					<li class="grid gap-2">
						<strong>Materias que desbloquea</strong>
						<ul class="grid gap-2">
							{#each course.dependents as dependent}
								<Dependent
									{dependent}
									isRequirementMet={isCourseStateGreaterOrEqual(
										course.state,
										dependent.requiredState
									)}
									{showCodes}
								/>
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<strong>Materias que desbloquea:</strong> Ninguna
					</li>
				{/if}
				{#if course.dependents.length > 0}
					<li>
						<strong>Cantidad total de materias que desbloquea:</strong>
						{totalDependentsCount}
						{#if indirectDependentsCount > 0}
							<span class="text-gray-500"
								>(<span class="whitespace-nowrap">{course.dependents.length} directamente</span>,
								<span class="whitespace-nowrap">{indirectDependentsCount} indirectamente</span
								>)</span
							>
						{/if}
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</li>

<style>
	:global(.is-targeted) {
		outline: 2px solid transparent;
		animation: outline-fade-out 3s ease-in-out 1;
	}
</style>
