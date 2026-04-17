<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';

	type Props = {
		onFocus?: (courseId: string) => void;
	};

	let { onFocus }: Props = $props();

	const { fitView } = useSvelteFlow();

	export function focusOnCourse(courseId: string) {
		fitView({
			nodes: [{ id: courseId }],
			padding: 0.5,
			maxZoom: 1,
			duration: 500
		});
		onFocus?.(courseId);
	}
</script>
