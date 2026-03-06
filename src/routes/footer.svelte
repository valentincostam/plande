<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Link from '$lib/link.svelte';

	let themePreference = $state<'system' | 'light' | 'dark'>('system');
	let systemPrefersDark = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemPrefersDark = mediaQuery.matches;

		const onSystemThemeChange = (event: MediaQueryListEvent) => {
			systemPrefersDark = event.matches;
		};

		mediaQuery.addEventListener('change', onSystemThemeChange);

		const storedTheme = localStorage.getItem('theme');
		themePreference = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';

		return () => {
			mediaQuery.removeEventListener('change', onSystemThemeChange);
		};
	});

	const themeIconPath = $derived.by(() => {
		const showDarkIcon =
			themePreference === 'dark' || (themePreference === 'system' && systemPrefersDark);

		if (showDarkIcon) {
			return 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z';
		}

		return 'M12 3v2m0 14v2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M3 12h2m14 0h2M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z';
	});
</script>

<footer class="grid gap-6 px-6">
	<p class="text-center text-sm">
		¿Tenés dudas, sugerencias o errores?
		<Link href="https://forms.gle/5iR99PJAffwFmayC6">Escribime</Link>.
	</p>
	<p class="text-center text-sm">
		¿Te gustó Plande?
		<Link href="https://cafecito.app/valentincostam">Invitame un café</Link>.
	</p>
	<p class="text-center text-sm">
		<Link href={resolve('/')}>Plande</Link>
		· Creado por
		<Link href="https://valentincosta.com" class="whitespace-nowrap">Valentín Costa</Link>
	</p>
	<div class="mx-auto flex items-center gap-2 text-sm">
		<label for="theme-preference" class="sr-only">Tema</label>
		<span aria-hidden="true" class="text-gray-500 dark:text-gray-700">
			<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
				<path stroke-linecap="round" stroke-linejoin="round" d={themeIconPath} />
			</svg>
		</span>
		<select
			id="theme-preference"
			class="appearance-none rounded-md border-none bg-gray-100 bg-none px-2 py-1 text-center text-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-gray-100 dark:text-gray-900"
			bind:value={themePreference}
		>
			<option value="system">Sistema</option>
			<option value="light">Claro</option>
			<option value="dark">Oscuro</option>
		</select>
	</div>
</footer>
