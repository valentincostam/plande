<script lang="ts">
	import type { Snippet } from 'svelte';
	import { highlightTextSegments } from '$lib/search';

	type Props = {
		text: string;
		query: string;
		children: Snippet<[{ highlightedText: string }]>;
	};

	let { text, query, children }: Props = $props();

	function escapeHtml(str: string): string {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function buildHighlightedHtml(text: string, searchQuery: string): string {
		const segments = highlightTextSegments(text, searchQuery);

		return segments
			.map((segment) => {
				const escaped = escapeHtml(segment.content);
				if (segment.type === 'highlight') {
					return `<mark class="bg-yellow-200 rounded px-0.5">${escaped}</mark>`;
				}
				return escaped;
			})
			.join('');
	}

	let highlightedText = $derived(buildHighlightedHtml(text, query));
</script>

{@render children({ highlightedText })}
