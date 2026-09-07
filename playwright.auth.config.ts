import { defineConfig, devices } from '@playwright/test';

const serverUrl = 'http://127.0.0.1:5174';

export default defineConfig({
	testDir: './e2e',
	testMatch: 'auth*.spec.ts',
	fullyParallel: false,
	workers: 1,
	use: {
		baseURL: serverUrl,
		trace: 'off'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
