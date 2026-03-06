<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import { toKebabCase } from '$lib/course.svelte';
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import Link from '$lib/link.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		course: Course;
		viewMode?: 'list' | 'diagram';
		onNavigateToDiagram?: (courseId: number) => void;
		class?: string;
		children: Snippet;
	};

	let {
		course,
		viewMode = 'list',
		onNavigateToDiagram,
		class: className = '',
		children
	}: Props = $props();

	function onclick(e: MouseEvent) {
		if (viewMode === 'diagram' && onNavigateToDiagram) {
			e.preventDefault();
			onNavigateToDiagram(course.id);
		} else {
			handleSmoothScroll(e);
		}
	}

	const baseClasses = 'font-noto tracking-tight';
</script>

<Link href={`#${toKebabCase(course.name)}`} {onclick} class={[baseClasses, className]}>
	{@render children()}
</Link>
