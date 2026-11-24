import { strict as assert } from 'node:assert';
import postgres from 'postgres';

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode) throw new Error('Start the dedicated local Supabase stack.');
const url = new URL(JSON.parse(new TextDecoder().decode(status.stdout)).DB_URL);
if (url.hostname !== '127.0.0.1' || url.port !== '55422' || url.username !== 'postgres')
	throw new Error('Discussion checks require the dedicated local database.');
const db = postgres(url.toString(), { max: 1, onnotice: () => {} });
const rollback = new Error('Controlled rollback');
try {
	await db.begin(async (sql) => {
		if (process.argv.includes('--migration-smoke'))
			await sql
				.unsafe(await Bun.file('supabase/migrations/20260908100000_draft_discussions.sql').text())
				.simple();
		const author = crypto.randomUUID(),
			reviewer = crypto.randomUUID(),
			third = crypto.randomUUID(),
			commenter = crypto.randomUUID();
		await sql`insert into auth.users(id) values (${author}),(${reviewer}),(${third}),(${commenter})`;
		await sql.unsafe('grant plande_collaboration to postgres');
		await sql.unsafe('set local role plande_collaboration');
		const [draft] = await sql`select * from plan_collaboration.create_or_find_draft(
			${`VAL33 ${crypto.randomUUID()}`},'Faculty','Offer',null,null,null,
			'[{"label":"Plan","url":"https://example.test/plan"}]'::jsonb,${author})`;
		const [context] =
			await sql`select * from plan_collaboration.lock_draft_review(${draft.plan_id},${reviewer})`;
		const requestId = crypto.randomUUID();
		const sourceId = context.sources[0].id;
		const fingerprint = 'a'.repeat(64);
		const create = (id: string) => sql`select * from plan_collaboration.add_draft_discussion(
			${draft.plan_id},0,0,${id},'objection','identity',${fingerprint},'The source identifies another year.',${sourceId},'Page 1',${reviewer})`;
		const [created] = await create(requestId);
		assert.equal(created.disposition, 'created');
		const [retried] = await create(requestId);
		assert.equal(retried.discussion_id, created.discussion_id);
		assert.equal(retried.disposition, 'existing');
		const [comment] = await sql`select * from plan_collaboration.add_draft_discussion(
			${draft.plan_id},0,1,${crypto.randomUUID()},'comment','identity',${fingerprint},'I found the same discrepancy.',${sourceId},'Page 1',${commenter},${created.discussion_id})`;
		assert.equal(comment.disposition, 'created');
		const [thread] =
			await sql`select * from plan_collaboration.read_draft_discussions(${draft.plan_id},${reviewer})`;
		const objection = thread.entries.find(
			(entry: { id: string }) => entry.id === created.discussion_id
		);
		assert.equal(Number(thread.discussion_revision), 2);
		assert.equal(thread.pending_count, 1);
		assert.equal(objection?.argument, 'The source identifies another year.');
		assert.equal('author_id' in (objection ?? {}), false);
		const [review] =
			await sql`select * from plan_collaboration.lock_draft_review(${draft.plan_id},${reviewer})`;
		assert.equal(review.is_coauthor, false, 'Raising an objection is not editing.');
		assert.equal(Number(review.review_revision), 0);
		const resolve = (
			actor: string,
			action: string,
			revision: number,
			evidence = '',
			current = fingerprint,
			reviewRevision = 0
		) => sql`
			select * from plan_collaboration.resolve_draft_objection(${draft.plan_id},${created.discussion_id},${reviewRevision},${revision},${crypto.randomUUID()},${action},'Documented conclusion',${sourceId},'Page 1',${evidence},${current},${actor})`;
		await assert.rejects(
			sql.savepoint(async (transaction) => {
				await transaction`select * from plan_collaboration.resolve_draft_objection(${draft.plan_id},${created.discussion_id},0,2,${crypto.randomUUID()},'dismiss','Own conclusion',${sourceId},'Page 1','',${fingerprint},${reviewer})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		await assert.rejects(
			sql.savepoint(async (transaction) => {
				await transaction`select * from plan_collaboration.resolve_draft_objection(${draft.plan_id},${created.discussion_id},0,2,${crypto.randomUUID()},'dismiss','Commenter conclusion',${sourceId},'Page 1','',${fingerprint},${commenter})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		const [dismissed] = await resolve(third, 'dismiss', 2);
		assert.equal(dismissed.status, 'dismissed');
		const [sameClaim] = await sql`select * from plan_collaboration.add_draft_discussion(
			${draft.plan_id},0,3,${crypto.randomUUID()},'objection','identity',${fingerprint},'The source identifies another year.',${sourceId},'Page 1',${reviewer})`;
		assert.equal(sameClaim.disposition, 'existing');
		const [closed] =
			await sql`select * from plan_collaboration.read_draft_discussions(${draft.plan_id},${reviewer})`;
		assert.equal(closed.pending_count, 0);
		await assert.rejects(
			sql.savepoint(async (transaction) => {
				await transaction`select * from plan_collaboration.resolve_draft_objection(${draft.plan_id},${created.discussion_id},0,3,${crypto.randomUUID()},'reopen','Report',${sourceId},'Page 1','',${fingerprint},${reviewer})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		const [reopened] = await resolve(
			reviewer,
			'reopen',
			3,
			'New appendix explicitly changes the year.'
		);
		assert.equal(reopened.status, 'pending');
		await sql`select plan_collaboration.record_draft_check(${draft.plan_id},0,'identity',${'b'.repeat(64)},true,${third})`;
		const [confirmed] = await resolve(third, 'confirm', 4);
		assert.equal(confirmed.status, 'confirmed');
		const [invalidated] =
			await sql`select * from plan_collaboration.lock_draft_review(${draft.plan_id},${third})`;
		assert.deepEqual(
			invalidated.checks,
			[],
			'Confirmation requires a new check, even when correction restores an old fingerprint.'
		);
		await sql`select * from plan_collaboration.set_draft_year(${draft.plan_id},2026,${author})`;
		const correctedFingerprint = 'b'.repeat(64);
		await assert.rejects(
			sql.savepoint(async (transaction) => {
				await transaction`select * from plan_collaboration.resolve_draft_objection(${draft.plan_id},${created.discussion_id},1,5,${crypto.randomUUID()},'correct','Correction checked',${sourceId},'Page 1','',${correctedFingerprint},${third})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await sql`select plan_collaboration.record_draft_check(${draft.plan_id},1,'identity',${correctedFingerprint},true,${third})`;
		const [corrected] = await resolve(third, 'correct', 5, '', correctedFingerprint, 1);
		assert.equal(corrected.status, 'corrected');
		const [final] =
			await sql`select * from plan_collaboration.read_draft_discussions(${draft.plan_id},${reviewer})`;
		const finalObjection = final.entries.find(
			(entry: { id: string }) => entry.id === created.discussion_id
		);
		assert.equal(final.pending_count, 0);
		assert.equal(finalObjection?.events.length, 4);
		const [oldEvidence] = await resolve(
			reviewer,
			'reopen',
			6,
			'New appendix explicitly changes the year.',
			correctedFingerprint,
			1
		);
		assert.equal(oldEvidence.disposition, 'existing');
		assert.equal(oldEvidence.status, 'corrected');
		const [lateRetry] = await create(requestId);
		assert.equal(lateRetry.disposition, 'existing');
		await sql.unsafe('reset role');
		for (const role of ['anon', 'authenticated']) {
			await sql.unsafe(`set local role ${role}`);
			await assert.rejects(
				sql.savepoint(async (transaction) => {
					await transaction`select * from plan_collaboration.resolve_draft_objection(${draft.plan_id},${created.discussion_id},1,6,${crypto.randomUUID()},'reopen','Report',${sourceId},'Page 1','Different evidence',${correctedFingerprint},${reviewer})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
			await assert.rejects(
				sql.savepoint(async (transaction) => {
					await transaction`update plan_collaboration.draft_discussions set status='dismissed' where id=${created.discussion_id}`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
			await sql.unsafe('reset role');
		}
		throw rollback;
	});
} catch (error) {
	if (error !== rollback) throw error;
	console.log('PASS draft discussions; controlled transaction rolled back.');
} finally {
	await db.end({ timeout: 5 });
}
