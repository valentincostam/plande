<script lang="ts">
	import {
		courseStates,
		feminineCourseStateLabels,
		masculineCourseStateLabels,
		type CourseState
	} from '$lib/course-state';
	import { getSharedProgressComparisonContext } from '$lib/shared-progress-comparison-context';

	type Props = {
		courseId: number;
		currentState: CourseState;
		gender?: 'feminine' | 'masculine';
	};

	let { courseId, currentState, gender = 'feminine' }: Props = $props();

	const sharedProgressComparison = getSharedProgressComparisonContext();
	const localState = $derived(sharedProgressComparison?.getLocalCourseState(courseId));
	const localStateLabel = $derived(
		localState
			? gender === 'feminine'
				? feminineCourseStateLabels[localState]
				: masculineCourseStateLabels[localState]
			: undefined
	);

	const backgroundColors = {
		[courseStates.notTaken]: 'bg-gray-600',
		[courseStates.inProgress]: 'bg-blue-600',
		[courseStates.taken]: 'bg-amber-600',
		[courseStates.passed]: 'bg-green-600'
	} as const;

	const borderColors = {
		[courseStates.notTaken]: 'border-gray-200',
		[courseStates.inProgress]: 'border-blue-200',
		[courseStates.taken]: 'border-amber-200',
		[courseStates.passed]: 'border-green-200'
	} as const;
</script>

{#if localState && localStateLabel}
	<span
		role="img"
		aria-label={`Guardado en este dispositivo: ${localStateLabel}`}
		title={`Guardado: ${localStateLabel}`}
		class={[
			backgroundColors[localState],
			borderColors[currentState],
			'absolute -top-1.5 -right-1.5 z-10 size-3 rounded-full border-2'
		]}
	></span>
{/if}
