import { strict as assert } from 'node:assert';
import identities from '../supabase/static-plan-identities.json';
import { requireLocalSupabaseUrl } from './local-supabase-url';

const url = requireLocalSupabaseUrl(process.env.SUPABASE_URL);
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!key) throw new Error('Local snapshot tests require Supabase test credentials.');

const snapshotId = identities['uns-dcs-le-2017'].snapshotId;
const endpoint = `${url}/rest/v1/study_plan_snapshots?id=eq.${snapshotId}`;
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
const originalResponse = await fetch(`${endpoint}&select=document,catalog`, { headers });
assert.equal(originalResponse.status, 200, 'Fixture snapshot must be readable by test setup.');
const [original] = await originalResponse.json();
assert.ok(original, 'Seed the local database before testing immutable snapshots.');

const update = await fetch(endpoint, { method: 'PATCH', headers, body: JSON.stringify(original) });
assert.equal(update.ok, false, 'Even a no-op privileged update must reject an immutable snapshot.');
assert.equal((await update.json()).code, '55000', 'Update must fail at the immutability guard.');

const deletion = await fetch(endpoint, { method: 'DELETE', headers });
assert.equal(deletion.ok, false, 'Published snapshots cannot be deleted.');
assert.equal((await deletion.json()).code, '55000', 'Delete must fail at the immutability guard.');
console.log('Snapshot immutability checks passed.');
