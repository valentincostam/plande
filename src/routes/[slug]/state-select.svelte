<script lang="ts">
	import {
		femenineCourseStateLabels,
		courseStates,
		type CourseState,
		masculineCourseStateLabels,
		courseBgColors,
		courseNameColors
	} from '$lib/course-state';

	type Props = {
		id: string;
		value: CourseState;
		isEnabled?: boolean;
		canPass: boolean;
		onchange?: (event: Event) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		gender?: 'femenine' | 'masculine';
		courseName: string;
	};

	let {
		id,
		isEnabled = true,
		value = $bindable(),
		onchange,
		onkeydown,
		gender = 'femenine',
		canPass,
		courseName
	}: Props = $props();

	const stateSelectBackgroundColors = {
		[courseStates.notTaken]: 'bg-gray-600',
		[courseStates.inProgress]: 'bg-blue-600',
		[courseStates.taken]: 'bg-amber-600',
		[courseStates.passed]: 'bg-green-600'
	} as const;
</script>

<select
	{id}
	bind:value
	{onchange}
	{onkeydown}
	aria-label="Estado de {courseName}"
	aria-keyshortcuts="n e r a"
	disabled={!isEnabled}
	class={[
		stateSelectBackgroundColors[value],
		!isEnabled && 'opacity-50',
		'shrink-0 appearance-none rounded-md border-none bg-none px-2 py-1 text-xs text-white transition-colors select-none dark:text-gray-100',
		'focus:ring-0 focus:outline-2 focus:outline-offset-1 focus:outline-blue-500'
	]}
>
	{#each Object.values(courseStates) as state (state)}
		<option
			value={state}
			disabled={!canPass && state === courseStates.passed}
			class={[courseBgColors[state], courseNameColors[state]]}
		>
			{gender === 'femenine' ? femenineCourseStateLabels[state] : masculineCourseStateLabels[state]}
		</option>
	{/each}
</select>

<style>
	select {
		text-align-last: center;
	}
</style>
