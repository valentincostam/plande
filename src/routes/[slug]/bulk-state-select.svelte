<script lang="ts">
	import {
		courseStates,
		pluralFemenineCourseStateLabels,
		type CourseState,
		courseBgColors,
		courseNameColors
	} from '$lib/course-state';
	import type { Course } from '$lib/course.svelte';
	import WandIcon from './wand-icon.svelte';

	type Props = {
		id: string;
		onchange: (event: Event) => void;
		class?: string;
		value?: CourseState | '';
		canPass?: boolean;
	};

	let { id, onchange, class: className = '', value = $bindable(), canPass }: Props = $props();
</script>

<label
	class={[
		'relative cursor-pointer rounded-md p-3 focus-within:outline-2 focus-within:outline-blue-500',
		className
	]}
	for={id}
>
	<WandIcon class="h-4 w-4 text-gray-400" />
	<select
		bind:value
		{onchange}
		{id}
		class="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 p-0 opacity-0"
		title="Cambiar estado de todas las materias"
	>
		<option value="" disabled>Cambiar materias a...</option>

		{#each Object.values(courseStates) as state}
			<option
				value={state}
				disabled={!canPass && state === courseStates.passed}
				class={[courseBgColors[state], courseNameColors[state]]}
				>{pluralFemenineCourseStateLabels[state]}</option
			>
		{/each}
	</select>
</label>
