import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.ts'],
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/tests/setup.ts']
	}
});
