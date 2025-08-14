<script lang="ts">
	import {
		chevronStrokeColors,
		courseBgColors,
		courseNameColors,
		hoursColors,
		isCourseStateGreaterOrEqual
	} from '$lib/course-state';
	import { toKebabCase, type Course } from '$lib/course.svelte';
	import { slide } from 'svelte/transition';
	import ChevronDownIcon from './chevron-down-icon.svelte';
	import Requirement from './requirement.svelte';
	import StateSelect from './state-select.svelte';
	import Dependent from './dependent.svelte';
	import { courseTagLabels } from '$lib/course-tag';

	type Props = {
		course: Course;
		hasRequirementsForCompletion?: boolean;
	};

	let { course, hasRequirementsForCompletion }: Props = $props();

	let isExpanded = $state(false);

	function onclick() {
		isExpanded = !isExpanded;
	}
</script>

<li
	id={toKebabCase(course.name)}
	class={[
		courseBgColors[course.state],
		'transition-color scroll-my-14 scroll-py-14 overflow-hidden md:first:rounded-t-md md:last:rounded-b-md',
		'focus-within:outline-2 focus-within:outline-blue-500',
		'target:animate-[outline-fade-out_2s_ease-in-out_1] target:outline-2 target:outline-transparent'
	]}
>
	<div class="flex items-center pr-3">
		<button {onclick} class="flex grow cursor-pointer items-center gap-3 p-3 focus:outline-none">
			<ChevronDownIcon
				class={[
					isExpanded && 'rotate-180',
					chevronStrokeColors[course.state],
					'h-5 w-5 flex-none transition-transform'
				]}
			/>
			<span class="flex grow flex-wrap items-center gap-x-3 gap-y-1">
				<span
					class={[
						course.isEnabled ? courseNameColors[course.state] : 'text-gray-500',
						'text-left select-none'
					]}
				>
					{course.name}
				</span>
				{#if course.tag}
					<span class="rounded-md bg-white px-2 py-1 text-xs text-gray-600"
						>{courseTagLabels[course.tag]}</span
					>
				{/if}
			</span>
			{#if course.hours}
				<span
					class={[
						hoursColors[course.state],
						'shrink-0 text-sm whitespace-nowrap transition-colors'
					]}
				>
					{course.hours} hs
				</span>
			{/if}
		</button>
		<StateSelect
			id={`${toKebabCase(course.name)}-state-select`}
			bind:value={course.state}
			isEnabled={course.isEnabled}
			canPass={course.canPass}
		/>
	</div>

	{#if isExpanded}
		<div class="px-3 pb-3" transition:slide>
			<ul class="grid gap-4 rounded-md bg-white p-3 text-sm">
				{#if course.hours}
					<li><strong>Carga horaria:</strong> {course.hours} horas semanales</li>
				{/if}
				{#if course.requirementsForEnrollment.length > 0}
					<li class="grid gap-2">
						<strong>Requisitos para cursar {hasRequirementsForCompletion ? '' : 'y aprobar'}</strong
						>
						<ul class="grid gap-2">
							{#each course.requirementsForEnrollment as requirement}
								<Requirement {requirement} />
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<strong
							>Requisitos para cursar{hasRequirementsForCompletion ? '' : ' y aprobar'}:
						</strong> Ninguno
					</li>
				{/if}
				{#if hasRequirementsForCompletion}
					{#if course.requirementsForCompletion.length > 0}
						<li class="grid gap-2">
							<strong>Requisitos para aprobar</strong>
							<ul class="grid gap-2">
								{#each course.requirementsForCompletion as requirement}
									<Requirement {requirement} />
								{/each}
							</ul>
						</li>
					{:else}
						<li>
							<strong>Requisitos para aprobar:</strong> Ninguno
						</li>
					{/if}
				{/if}
				{#if course.dependents.length > 0}
					<li class="grid gap-2">
						<strong>Correlativas</strong>
						<ul class="grid gap-2">
							{#each course.dependents as dependent}
								<Dependent
									{dependent}
									isRequirementMet={isCourseStateGreaterOrEqual(
										course.state,
										dependent.requiredState
									)}
								/>
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<strong>Correlativas:</strong> Ninguna
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</li>
