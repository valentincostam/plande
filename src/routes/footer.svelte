<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Link from '$lib/link.svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	type ThemePreference = 'system' | 'light' | 'dark';

	let themePreference = $state<ThemePreference>('system');
	let systemPrefersDark = $state(false);

	const themePreferences = [
		'system',
		'light',
		'dark'
	] as const satisfies readonly ThemePreference[];

	const themePreferenceLabels = {
		system: 'Sistema',
		light: 'Claro',
		dark: 'Oscuro'
	} as const satisfies Record<ThemePreference, string>;

	const getNextThemePreference = (currentThemePreference: ThemePreference) => {
		const currentIndex = themePreferences.indexOf(currentThemePreference);
		return themePreferences[(currentIndex + 1) % themePreferences.length];
	};

	const applyTheme = (nextThemePreference: ThemePreference) => {
		document.documentElement.classList.toggle(
			'dark',
			nextThemePreference === 'dark' || (nextThemePreference === 'system' && systemPrefersDark)
		);
	};

	const persistThemePreference = (nextThemePreference: ThemePreference) => {
		if (nextThemePreference === 'system') {
			localStorage.removeItem('theme');
			return;
		}

		localStorage.setItem('theme', nextThemePreference);
	};

	let announcement = $state('');

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemPrefersDark = mediaQuery.matches;

		const onSystemThemeChange = (event: MediaQueryListEvent) => {
			systemPrefersDark = event.matches;

			if (themePreference === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', onSystemThemeChange);

		const storedTheme = localStorage.getItem('theme');
		themePreference = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';
		applyTheme(themePreference);

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

	const currentThemeLabel = $derived(themePreferenceLabels[themePreference]);
	const nextThemePreference = $derived(getNextThemePreference(themePreference));
	const nextThemeLabel = $derived(themePreferenceLabels[nextThemePreference]);
	const labelSlideDistance = $derived(prefersReducedMotion.current ? 0 : 8);
	const labelSlideDuration = $derived(prefersReducedMotion.current ? 0 : 140);

	function onclick() {
		const nextTheme = getNextThemePreference(themePreference);
		themePreference = nextTheme;
		persistThemePreference(nextTheme);
		applyTheme(nextTheme);
		announcement = `Tema: ${themePreferenceLabels[nextTheme]}`;
	}
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
		<span aria-hidden="true" class="text-gray-500 dark:text-gray-700">
			<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
				<path stroke-linecap="round" stroke-linejoin="round" d={themeIconPath} />
			</svg>
		</span>
		<button
			id="theme-preference"
			type="button"
			{onclick}
			aria-label={`Tema: ${currentThemeLabel}`}
			aria-describedby="theme-preference-next theme-preference-announcement"
			class="w-20 touch-manipulation appearance-none overflow-hidden rounded-md border-none bg-gray-100 bg-none px-4 py-2 text-center text-gray-900 transition-colors duration-200 ease-out focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-gray-100 dark:text-gray-900"
			title={currentThemeLabel}
		>
			<span aria-hidden="true" class="relative block h-4">
				{#key currentThemeLabel}
					<span
						in:fly={{ x: labelSlideDistance, duration: labelSlideDuration }}
						out:fly={{ x: -labelSlideDistance, duration: labelSlideDuration }}
						class="absolute inset-0 flex items-center justify-center whitespace-nowrap"
					>
						{currentThemeLabel}
					</span>
				{/key}
			</span>
		</button>
	</div>
	<span id="theme-preference-next" class="sr-only">Activar para cambiar a {nextThemeLabel}.</span>
	<span id="theme-preference-announcement" class="sr-only" aria-live="polite">{announcement}</span>
</footer>
