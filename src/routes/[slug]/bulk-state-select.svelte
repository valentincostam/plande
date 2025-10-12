<script lang="ts">
	import { courseStates, type CourseState } from '$lib/course-state';
	import type { Course } from '$lib/course.svelte';
	import WandIcon from './wand-icon.svelte';

	type Props = {
		id: string;
		onchange: (event: Event) => void;
		class?: string;
		value?: CourseState | '';
	};

	let { id, onchange, class: className = '', value = $bindable() }: Props = $props();
</script>

<label class={['relative cursor-pointer p-3', className]} for={id}>
	<WandIcon class="h-4 w-4 text-gray-400" />
	<select
		bind:value
		{onchange}
		{id}
		class="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 p-0 opacity-0"
		title="Cambiar estado de todas las materias"
	>
		<option value="" disabled>Cambiar todas a...</option>
		<option value={courseStates.notTaken}>No cursado</option>
		<option value={courseStates.inProgress}>En curso</option>
		<option value={courseStates.taken}>Regular</option>
		<option value={courseStates.passed}>Aprobado</option>
	</select>
</label>
