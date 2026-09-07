import { requireLocalSupabaseUrl } from './local-supabase-url';

const action = process.argv[2];
const commands: Record<string, string[][]> = {
	seed: [['bun', 'scripts/seed-supabase-study-plans.ts']],
	test: [
		['bun', 'scripts/test-supabase-public-reader.ts'],
		['bun', 'scripts/test-supabase-snapshot-integrity.ts']
	],
	dev: [['bun', 'run', 'dev', '--', '--host', '127.0.0.1', '--port', '5175', '--strictPort']],
	'auth-dev': [
		['bun', 'run', 'dev', '--', '--host', '127.0.0.1', '--port', '5174', '--strictPort']
	],
	'auth-test': [['bunx', 'playwright', 'test', '--config=playwright.auth.config.ts']]
};
if (!action || !commands[action])
	throw new Error('Choose seed, test, dev, auth-dev, or auth-test.');

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0) throw new Error('Start the local Supabase stack first.');
const configuration = JSON.parse(new TextDecoder().decode(status.stdout));
const url = requireLocalSupabaseUrl(configuration.API_URL);
const key = configuration.PUBLISHABLE_KEY ?? configuration.ANON_KEY;
if (typeof key !== 'string') throw new Error('Local Supabase has no publishable key.');

const environment: Record<string, string | undefined> = {
	...process.env,
	SUPABASE_URL: url,
	SUPABASE_PUBLISHABLE_KEY: key,
	PLANDE_STUDY_PLAN_READER: 'supabase',
	PUBLIC_PLANDE_ENV: 'qa',
	PLANDE_CONTROLLED_AUTH: action === 'auth-test' ? '1' : undefined
};
delete environment.SUPABASE_SERVICE_ROLE_KEY;
if (action === 'seed' || action === 'test') {
	if (typeof configuration.SERVICE_ROLE_KEY !== 'string')
		throw new Error('Local test setup key missing.');
	environment.SUPABASE_SERVICE_ROLE_KEY = configuration.SERVICE_ROLE_KEY;
}
for (const command of commands[action]) {
	const child = Bun.spawn(command, { env: environment, stdout: 'inherit', stderr: 'inherit' });
	const result = await child.exited;
	if (result !== 0) process.exit(result);
}
