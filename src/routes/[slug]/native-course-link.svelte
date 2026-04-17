<script lang="ts">
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import Link from '$lib/link.svelte';
	import type { Snippet } from 'svelte';
	import type { StudyPlanViewItem } from '$lib/study-plan-view';

	type Props = {
		item: StudyPlanViewItem;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: string) => void;
		class?: string;
		children: Snippet;
	};

	let {
		item,
		viewMode = 'list',
		onNavigateToDiagram,
		class: className = '',
		children
	}: Props = $props();

	function onclick(e: MouseEvent) {
		if (viewMode === 'diagram' && onNavigateToDiagram) {
			e.preventDefault();
			onNavigateToDiagram(item.item.def.id);
		} else {
			handleSmoothScroll(e);
		}
	}

	const baseClasses = 'font-noto tracking-tight';
</script>

<Link href={`#${item.anchorId}`} {onclick} class={[baseClasses, className]}>
	{@render children()}
</Link>
