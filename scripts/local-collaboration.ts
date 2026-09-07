import { createHash, createHmac, pbkdf2Sync, randomBytes } from 'node:crypto';
import postgres from 'postgres';

export async function provisionLocalCollaboration(value: unknown): Promise<string> {
	if (typeof value !== 'string') throw new Error('Local database URL is missing.');
	const url = new URL(value);
	if (
		!['postgres:', 'postgresql:'].includes(url.protocol) ||
		!['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) ||
		url.port !== '55422' ||
		url.pathname !== '/postgres' ||
		url.username !== 'postgres' ||
		url.search ||
		url.hash
	)
		throw new Error('Collaboration setup requires the dedicated local database.');
	const setup = postgres(url.toString(), { max: 1, connect_timeout: 5, onnotice: () => {} });
	try {
		const [role] = await setup`
			select rolcanlogin, rolsuper, rolbypassrls, rolcreatedb, rolcreaterole
			from pg_roles where rolname = 'plande_collaboration'
		`;
		if (
			!role?.rolcanlogin ||
			role.rolsuper ||
			role.rolbypassrls ||
			role.rolcreatedb ||
			role.rolcreaterole
		)
			throw new Error('Restricted collaboration role is unavailable.');
		const password = randomBytes(32).toString('base64url');
		const salt = randomBytes(16);
		const salted = pbkdf2Sync(password, salt, 4096, 32, 'sha256');
		const clientKey = createHmac('sha256', salted).update('Client Key').digest();
		const storedKey = createHash('sha256').update(clientKey).digest('base64');
		const serverKey = createHmac('sha256', salted).update('Server Key').digest('base64');
		const verifier = `SCRAM-SHA-256$4096:${salt.toString('base64')}$${storedKey}:${serverKey}`;
		await setup.unsafe(`alter role plande_collaboration password '${verifier}'`);
		url.username = 'plande_collaboration';
		url.password = password;
		return url.toString();
	} catch {
		throw new Error('Local collaboration credential setup failed.');
	} finally {
		await setup.end({ timeout: 5 });
	}
}
