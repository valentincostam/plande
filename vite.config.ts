import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: { noExternal: ['@lucide/svelte', 'sveltekit-superforms'] },
	plugins: [tailwindcss(), sveltekit(), sveltekitOG(), devtoolsJson()]
});
