import { strict as assert } from 'node:assert';
import postgres from 'postgres';

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0) throw new Error('Start the dedicated local Supabase stack.');
const configuration = JSON.parse(new TextDecoder().decode(status.stdout));
const url = new URL(configuration.DB_URL);
if (
	url.hostname !== '127.0.0.1' ||
	url.port !== '55422' ||
	url.username !== 'postgres' ||
	url.pathname !== '/postgres'
)
	throw new Error('Draft editor checks require the dedicated local database.');
const database = postgres(url.toString(), { max: 1, onnotice: () => {} });
const rollback = new Error('Controlled rollback');
try {
	await database.begin(async (transaction) => {
		if (process.argv.includes('--migration-smoke')) {
			const migration = await Bun.file(
				'supabase/migrations/20260907230000_draft_editor_versions.sql'
			).text();
			await transaction.unsafe(migration).simple();
		}
		const actor = crypto.randomUUID();
		await transaction`insert into auth.users(id) values (${actor})`;
		await transaction.unsafe('grant plande_collaboration to postgres');
		await transaction.unsafe('set local role plande_collaboration');
		const [draft] = await transaction`
			select * from plan_collaboration.create_or_find_draft(
				${`VAL27 SQL ${crypto.randomUUID()}`}, 'Test faculty', 'Test offer', null, null, null, '[]'::jsonb, ${actor}
			)`;
		const [initial] =
			await transaction`select * from plan_collaboration.read_draft_editor(${draft.plan_id})`;
		assert.equal(Number(initial.version), 0);
		const itemId = crypto.randomUUID();
		const content = {
			schemaVersion: 1,
			document: {
				nextSeqId: 1,
				sections: [{ id: 'basic', label: 'Basic training' }],
				items: [
					{
						id: itemId,
						seqId: 0,
						kind: 'course',
						name: 'Test course',
						type: 'mandatory',
						placements: [{ id: 'first', sectionId: 'basic' }]
					}
				],
				requirements: {}
			},
			unknownRequirements: [
				{ scope: `item:${itemId}:enroll`, note: 'Not checked' },
				{ scope: `item:${itemId}:complete`, note: 'Not checked' }
			],
			unsupportedContent: []
		};
		const save = (version: number, value: postgres.JSONValue) => transaction`
			select * from plan_collaboration.save_draft_document(${draft.plan_id}, ${version}, ${transaction.json(value)}, ${actor})`;
		const [saved] = await save(0, content);
		assert.equal(saved.disposition, 'saved');
		assert.equal(Number(saved.version), 1);
		assert.equal(Number(saved.review_invalidation_revision), 1);
		const [old] =
			await transaction`select * from plan_collaboration.read_draft_revision(${draft.plan_id}, 0)`;
		assert.deepEqual(old.content, {});
		const [stale] = await save(0, {
			...content,
			unsupportedContent: [{ path: 'unused', value: null }]
		});
		assert.equal(stale.disposition, 'version_conflict');
		assert.deepEqual(stale.content, content);
		const [unchanged] = await save(1, content);
		assert.equal(unchanged.disposition, 'unchanged');
		assert.equal(Number(unchanged.version), 1);
		const expectInvalid = async (value: postgres.JSONValue, version = 1) => {
			await assert.rejects(
				transaction.savepoint(async (savepoint) => {
					await savepoint`select * from plan_collaboration.save_draft_document(${draft.plan_id}, ${version}, ${savepoint.json(value)}, ${actor})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
			);
		};
		await expectInvalid({ ...content, document: { ...content.document, nextSeqId: 0 } });
		await expectInvalid({
			...content,
			document: {
				...content.document,
				items: [
					{
						...content.document.items[0],
						placements: [
							content.document.items[0].placements[0],
							content.document.items[0].placements[0]
						]
					}
				]
			}
		});
		await expectInvalid({
			...content,
			document: {
				...content.document,
				items: [{ ...content.document.items[0], id: 'replacement' }]
			}
		});
		const retired = {
			...content,
			document: { ...content.document, items: [] },
			unknownRequirements: []
		};
		const [removed] = await save(1, retired);
		assert.equal(Number(removed.version), 2);
		await expectInvalid(
			{
				...content,
				document: {
					...content.document,
					items: [{ ...content.document.items[0], id: 'replacement' }]
				}
			},
			2
		);
		const [preserved] =
			await transaction`select * from plan_collaboration.read_draft_editor(${draft.plan_id})`;
		assert.deepEqual(preserved.content, retired);
		assert.equal(Number(preserved.version), 2);
		const [historical] =
			await transaction`select * from plan_collaboration.read_draft_revision(${draft.plan_id}, 1)`;
		const [restored] = await save(2, historical.content);
		assert.equal(restored.disposition, 'saved');
		assert.equal(Number(restored.version), 3);
		assert.deepEqual(restored.content, content);
		const [restoredRead] =
			await transaction`select * from plan_collaboration.read_draft_editor(${draft.plan_id})`;
		assert.deepEqual(restoredRead.content.document.items[0], content.document.items[0]);
		assert.equal(restoredRead.content.document.nextSeqId, 1);
		await transaction.unsafe('reset role');
		const [author] =
			await transaction`select count(*)::int as count from plan_collaboration.draft_coauthors where plan_id=${draft.plan_id} and subject_id=${actor}`;
		assert.equal(author.count, 1);
		const [acl] = await transaction`
			select has_table_privilege('plande_collaboration','plan_collaboration.draft_envelopes','update') as direct_write,
			has_function_privilege('authenticated','plan_collaboration.save_draft_document(uuid,bigint,jsonb,uuid)','execute') as browser_write`;
		assert.equal(acl.direct_write, false);
		assert.equal(acl.browser_write, false);
		for (const role of ['anon', 'authenticated']) {
			await assert.rejects(
				transaction.savepoint(async (savepoint) => {
					await savepoint.unsafe(`set local role ${role}`);
					await savepoint`select * from plan_collaboration.save_draft_document(${draft.plan_id}, 2, ${savepoint.json(retired)}, ${actor})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
		}
		await transaction`update plan_collaboration.student_permissions set contributions_enabled=false where subject_id=${actor}`;
		await assert.rejects(
			transaction.savepoint(async (savepoint) => {
				await savepoint.unsafe('set local role plande_collaboration');
				await savepoint`select * from plan_collaboration.save_draft_document(${draft.plan_id}, 2, ${savepoint.json(retired)}, ${actor})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		throw rollback;
	});
} catch (error) {
	if (error !== rollback) {
		console.error(
			'Draft editor transaction check failed.',
			error instanceof postgres.PostgresError ? error.code : 'assertion'
		);
		process.exitCode = 1;
	}
} finally {
	await database.end();
}
if (!process.exitCode)
	console.log('Draft editor transaction checks passed; all fixtures rolled back.');
