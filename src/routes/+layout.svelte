<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	onMount(async () => {
		if (['qa', 'pilot'].includes(env.PUBLIC_PLANDE_ENV ?? '')) return;

		injectAnalytics({ mode: dev ? 'development' : 'production' });
		const { default: Clarity } = await import('@microsoft/clarity');
		Clarity.init('t9dji08rov');
	});

	const emoji = '🎓';
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,EmojiOne Color,Android Emoji,Helvetica,Arial,sans-serif" font-size="52">${emoji}</text></svg>`;
	const favicon = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
</svelte:head>

{#key `${page.params.slug ?? ''}:${data.auth?.subject ?? 'anonymous'}:${page.data.publicationSnapshotId ?? ''}`}
	{@render children()}
{/key}
