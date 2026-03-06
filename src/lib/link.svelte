<script lang="ts">
	import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAnchorAttributes & {
		class?: ClassValue;
		children: Snippet;
	};

	let { class: className, children, ...restProps }: Props = $props();

	const baseClass =
		'text-blue-700 hover:text-blue-900 underline-offset-3 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:text-blue-600 dark:hover:text-blue-700';
</script>

<a {...restProps} class={[baseClass, className]}>
	{@render children()}
</a>
