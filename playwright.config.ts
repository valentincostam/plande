import { defineConfig, devices } from '@playwright/test';

const serverUrl = process.env.BASE_URL || 'http://127.0.0.1:5173';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: serverUrl,
		trace: 'on-first-retry'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'bun run dev -- --host 127.0.0.1',
		url: serverUrl,
		reuseExistingServer: true
	}
});
