import { strict as assert } from 'node:assert';
import postgres from 'postgres';

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0) throw new Error('Start the dedicated local Supabase stack.');
const configuration = JSON.parse(new TextDecoder().decode(status.stdout));
const url = new URL(configuration.DB_URL);
if (url.hostname !== '127.0.0.1' || url.port !== '55422' || url.username !== 'postgres')
	throw new Error('Review checks require the dedicated local database.');
const database = postgres(url.toString(), { max: 1, onnotice: () => {} });
const rollback = new Error('Controlled rollback');
try {
	await database.begin(async (transaction) => {
		if (process.argv.includes('--migration-smoke'))
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908090000_draft_reviews.sql').text())
				.simple();
		if (process.argv.includes('--source-migration-smoke'))
			await transaction
				.unsafe(
					await Bun.file('supabase/migrations/20260908093000_draft_source_additions.sql').text()
				)
				.simple();
		const author = crypto.randomUUID();
		const reviewer = crypto.randomUUID();
		await transaction`insert into auth.users(id) values (${author}), (${reviewer})`;
		await transaction.unsafe('grant plande_collaboration to postgres');
		await transaction.unsafe('set local role plande_collaboration');
		const [draft] = await transaction`select * from plan_collaboration.create_or_find_draft(
			${`VAL32 SQL ${crypto.randomUUID()}`}, 'Faculty', 'Offer', null, null, null,
			'[{"label":"Plan","url":"https://example.test/plan"}]'::jsonb, ${author})`;
		const content = {
			schemaVersion: 1,
			document: {
				nextSeqId: 1,
				sections: [],
				items: [
					{
						id: 'course',
						seqId: 0,
						kind: 'course',
						type: 'mandatory',
						name: 'Course',
						placements: [],
						requirements: {
							enroll: { type: 'all', rules: [] },
							complete: { type: 'all', rules: [] }
						}
					}
				],
				requirements: {}
			},
			unknownRequirements: [],
			unsupportedContent: []
		};
		await transaction`select * from plan_collaboration.save_draft_document(${draft.plan_id}, 0, ${transaction.json(content)}, ${author})`;
		const revision = 1;
		const [review] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
		assert.equal(review.is_coauthor, false);
		const [own] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${author})`;
		assert.equal(own.is_coauthor, true, 'Creating a draft must register authorship.');
		const fingerprint = 'a'.repeat(64);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, 'identity', ${fingerprint}, true, ${author})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		await transaction`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, 'identity', ${fingerprint}, true, ${reviewer})`;
		const [resumed] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
		assert.deepEqual(resumed.checks, [{ key: 'identity', fingerprint }]);
		const sourceKey = `source:${review.sources[0].id}`;
		const manifest = [
			{ key: 'identity', fingerprint },
			{ key: sourceKey, fingerprint },
			{ key: 'item:course', fingerprint }
		];
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select plan_collaboration.approve_draft_review(${draft.plan_id}, ${revision}, ${sql.json(manifest)}, ${author})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select plan_collaboration.approve_draft_review(${draft.plan_id}, ${revision}, ${sql.json(manifest)}, ${reviewer})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await transaction`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, ${sourceKey}, ${fingerprint}, true, ${reviewer})`;
		await transaction`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, 'item:course', ${fingerprint}, true, ${reviewer})`;
		await transaction`select plan_collaboration.approve_draft_review(${draft.plan_id}, ${revision}, ${transaction.json(manifest)}, ${reviewer})`;
		const [approved] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
		assert.equal(Number(approved.approved_revision), revision);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, 'identity', ${fingerprint}, false, ${reviewer})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await transaction`select * from plan_collaboration.set_draft_year(${draft.plan_id}, 2026, ${author})`;
		const [changed] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
		assert.equal(
			Number(changed.review_revision),
			revision + 1,
			'Year changes invalidate old approvals.'
		);
		assert.deepEqual(
			changed.checks,
			approved.checks,
			'Checks remain available for contextual comparison.'
		);
		assert.equal(
			changed.approved_revision,
			null,
			'A previous approval is not current after a year change.'
		);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, 'identity', ${fingerprint}, true, ${reviewer})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '40001'
		);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`update plan_collaboration.draft_review_checks set fingerprint=${'b'.repeat(64)} where plan_id=${draft.plan_id}`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select * from plan_collaboration.set_draft_year_without_review(${draft.plan_id}, 2027, ${reviewer})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		content.document.items[0].name = 'Edited by reviewer';
		await transaction`select * from plan_collaboration.save_draft_document(${draft.plan_id}, 1, ${transaction.json(content)}, ${reviewer})`;
		const [nowAuthor] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
		assert.equal(nowAuthor.is_coauthor, true);
		assert.equal(nowAuthor.approved_revision, null);
		const [sourceAdded] =
			await transaction`select * from plan_collaboration.add_draft_source(${draft.plan_id}, ${Number(nowAuthor.review_revision)}, 'Correlativas', 'https://example.test/requirements', ${author})`;
		assert.equal(sourceAdded.disposition, 'added');
		const [afterSource] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
		assert.equal(afterSource.sources.length, 2);
		assert.equal(Number(afterSource.review_revision), Number(nowAuthor.review_revision) + 1);
		const [duplicateSource] =
			await transaction`select * from plan_collaboration.add_draft_source(${draft.plan_id}, ${Number(afterSource.review_revision)}, 'Correlativas', 'https://example.test/requirements', ${author})`;
		assert.equal(duplicateSource.disposition, 'unchanged');
		await transaction.unsafe('reset role');
		for (const role of ['anon', 'authenticated']) {
			await transaction.unsafe(`set local role ${role}`);
			await assert.rejects(
				transaction.savepoint(async (sql) => {
					await sql`select plan_collaboration.approve_draft_review(${draft.plan_id}, ${revision}, ${sql.json(manifest)}, ${reviewer})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
			await assert.rejects(
				transaction.savepoint(async (sql) => {
					await sql`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewer})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
			await assert.rejects(
				transaction.savepoint(async (sql) => {
					await sql`select plan_collaboration.record_draft_check(${draft.plan_id}, 1, 'identity', ${fingerprint}, true, ${reviewer})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
			await transaction.unsafe('reset role');
		}
		throw rollback;
	});
} catch (error) {
	if (error !== rollback) throw error;
	console.log(
		process.argv.includes('--migration-smoke') || process.argv.includes('--source-migration-smoke')
			? 'PASS draft review SQL; fixtures and migration rolled back.'
			: 'PASS draft review SQL; fixtures rolled back.'
	);
} finally {
	await database.end({ timeout: 5 });
}
