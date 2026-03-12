<script lang="ts">
	import {
		feminineCourseStateLabels,
		courseStates,
		type CourseState,
		masculineCourseStateLabels
	} from '$lib/course-state';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	type Props = {
		id: string;
		value: CourseState;
		isEnabled?: boolean;
		canPass: boolean;
		onchange?: (event: Event) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		gender?: 'feminine' | 'masculine';
		courseName: string;
	};

	let {
		id,
		isEnabled = true,
		value = $bindable(),
		onchange,
		onkeydown,
		gender = 'feminine',
		canPass,
		courseName
	}: Props = $props();

	const stateButtonBackgroundColors = {
		[courseStates.notTaken]: 'bg-gray-600',
		[courseStates.inProgress]: 'bg-blue-600',
		[courseStates.taken]: 'bg-amber-600',
		[courseStates.passed]: 'bg-green-600'
	} as const;

	const stateOrder = [
		courseStates.notTaken,
		courseStates.inProgress,
		courseStates.taken,
		courseStates.passed
	] as const;

	const getStateLabel = (state: CourseState) =>
		gender === 'feminine' ? feminineCourseStateLabels[state] : masculineCourseStateLabels[state];

	const getAvailableStates = () =>
		stateOrder.filter((state) => state !== courseStates.passed || canPass);

	const getNextState = (currentState: CourseState) => {
		const availableStates = getAvailableStates();
		const currentIndex = availableStates.indexOf(currentState);
		const safeIndex = currentIndex === -1 ? 0 : currentIndex;

		return availableStates[(safeIndex + 1) % availableStates.length];
	};

	let announcement = $state('');

	const currentLabel = $derived(getStateLabel(value));
	const nextState = $derived(getNextState(value));
	const nextLabel = $derived(getStateLabel(nextState));
	const labelSlideDistance = $derived(prefersReducedMotion.current ? 0 : 8);
	const labelSlideDuration = $derived(prefersReducedMotion.current ? 0 : 140);

	function onclick() {
		if (!isEnabled) return;

		value = getNextState(value);
		announcement = `Estado de ${courseName}: ${getStateLabel(value)}`;
		onchange?.(new Event('change'));
	}
</script>

<button
	{id}
	data-state-select
	type="button"
	{onclick}
	{onkeydown}
	aria-label={`Estado de ${courseName}: ${currentLabel}`}
	aria-describedby={`${id}-next-state ${id}-keyboard-shortcuts ${id}-announcement`}
	aria-keyshortcuts="n e r a"
	disabled={!isEnabled}
	class={[
		stateButtonBackgroundColors[value],
		!isEnabled && 'opacity-50',
		'w-20 shrink-0 appearance-none overflow-hidden rounded-md border-none bg-none px-2 py-1 text-center text-xs text-white transition-colors duration-200 ease-out select-none dark:text-gray-100',
		'cursor-pointer touch-manipulation whitespace-nowrap focus:ring-0 focus:outline-2 focus:outline-offset-1 focus:outline-blue-500'
	]}
	title={currentLabel}
>
	<span aria-hidden="true" class="relative block h-4">
		{#key currentLabel}
			<span
				in:fly={{ x: labelSlideDistance, duration: labelSlideDuration }}
				out:fly={{ x: -labelSlideDistance, duration: labelSlideDuration }}
				class="absolute inset-0 flex items-center justify-center whitespace-nowrap"
			>
				{currentLabel}
			</span>
		{/key}
	</span>
</button>

<span id={`${id}-next-state`} class="sr-only">Activar para cambiar a {nextLabel}.</span>
<span id={`${id}-keyboard-shortcuts`} class="sr-only">Atajos de teclado: N, E, R, A.</span>
<span id={`${id}-announcement`} class="sr-only" aria-live="polite">{announcement}</span>
