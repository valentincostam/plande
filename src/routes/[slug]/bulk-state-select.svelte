<script lang="ts">
	import {
		courseStates,
		pluralFeminineCourseStateLabels,
		type CourseState,
		courseBgColors,
		courseNameColors
	} from '$lib/course-state';
	import MoreIcon from './more-icon.svelte';

	type Props = {
		id: string;
		onchange: (event: Event) => void;
		class?: string;
		value?: CourseState | '';
		canPass?: boolean;
		label?: string;
	};

	let {
		id,
		onchange,
		class: className = '',
		value = $bindable(),
		canPass,
		label
	}: Props = $props();

	const handleChange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		onchange(event);
		// Reset both the binding and the DOM element directly
		value = '';
		target.value = '';
	};
</script>

<label
	class={[
		'relative cursor-pointer rounded-md p-3 focus-within:outline-2 focus-within:outline-blue-500',
		className
	]}
	for={id}
>
	<MoreIcon class="h-4 w-4 text-gray-400" />
	<select
		bind:value
		onchange={handleChange}
		{id}
		aria-label={label || 'Cambiar estado de todas las materias'}
		class="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 p-0 opacity-0"
		title="Cambiar estado de todas las materias"
	>
		<option value="" disabled>Cambiar materias a...</option>

		{#each Object.values(courseStates) as state (state)}
			<option value={state} disabled={!canPass && state === courseStates.passed}
				>{pluralFeminineCourseStateLabels[state]}</option
			>
		{/each}
	</select>
</label>
