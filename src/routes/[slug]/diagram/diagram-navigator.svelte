<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';

	type Props = {
		onFocus?: (courseId: number) => void;
	};

	let { onFocus }: Props = $props();

	const { fitView } = useSvelteFlow();

	export function focusOnCourse(courseId: number) {
		fitView({
			nodes: [{ id: String(courseId) }],
			padding: 0.5,
			maxZoom: 1,
			duration: 500
		});
		onFocus?.(courseId);
	}
</script>
