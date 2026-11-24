import { strict as assert } from 'node:assert';
import postgres from 'postgres';

const baselineRed = process.argv.includes('--baseline-red');
const migrationSmoke = process.argv.includes('--migration-smoke');
const applied = process.argv.includes('--applied');
const kindsSmoke = process.argv.includes('--kinds-smoke');
if ([baselineRed, migrationSmoke, applied, kindsSmoke].filter(Boolean).length !== 1)
	throw new Error(
		'Pass exactly one of --baseline-red, --migration-smoke, --kinds-smoke or --applied.'
	);

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0) throw new Error('Start the dedicated local Supabase stack.');
const url = new URL(JSON.parse(new TextDecoder().decode(status.stdout)).DB_URL);
if (url.hostname !== '127.0.0.1' || url.port !== '55422' || url.username !== 'postgres')
	throw new Error('Private progress history checks require the dedicated local database.');

const database = postgres(url.toString(), { max: 1, onnotice: () => {} });
const rollback = new Error('Controlled rollback');
const retiredItemId = 'retired-course';

try {
	await database.begin(async (transaction) => {
		await transaction.unsafe("set local lock_timeout = '3s'");
		await transaction.unsafe("set local statement_timeout = '15s'");
		if (migrationSmoke)
			await transaction
				.unsafe(
					await Bun.file('supabase/migrations/20260908137000_private_progress_history.sql').text()
				)
				.simple();
		if (kindsSmoke)
			await transaction
				.unsafe(
					await Bun.file('supabase/migrations/20260908140000_published_progress_kinds.sql').text()
				)
				.simple();

		const planId = crypto.randomUUID();
		const retiredSnapshotId = crypto.randomUUID();
		const currentSnapshotId = crypto.randomUUID();
		const conflictingSnapshotId = crypto.randomUUID();
		const ownerId = crypto.randomUUID();
		const publisherId = crypto.randomUUID();
		const otherPlanId = crypto.randomUUID();
		const otherSnapshotId = crypto.randomUUID();
		const retiredDocument = { items: [{ id: retiredItemId, kind: 'course', seqId: 0 }] };
		const currentDocument = { items: [{ id: 'current-course', kind: 'course', seqId: 0 }] };
		await transaction`insert into auth.users(id) values (${ownerId}), (${publisherId})`;
		await transaction`insert into public.study_plans(id, canonical_slug)
			values (${planId}, ${`private-progress-history-${planId}`})`;
		await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
			values (${retiredSnapshotId}, ${planId}, ${transaction.json(retiredDocument)}, '{}'::jsonb),
				(${currentSnapshotId}, ${planId}, ${transaction.json(currentDocument)}, '{}'::jsonb)`;
		await transaction`update public.study_plans set published_snapshot_id = ${currentSnapshotId}
			where id = ${planId}`;
		await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
			values (${crypto.randomUUID()}, ${planId},
				${transaction.json({ items: [{ id: 'unpublished-only', kind: 'course', seqId: 5 }] })}, '{}'::jsonb)`;
		await transaction`insert into public.study_plans(id, canonical_slug)
			values (${otherPlanId}, ${`private-progress-history-${otherPlanId}`})`;
		await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
			values (${otherSnapshotId}, ${otherPlanId},
				${transaction.json({ items: [{ id: 'another-plan-only', kind: 'course', seqId: 0 }] })}, '{}'::jsonb)`;
		await transaction`update public.study_plans set published_snapshot_id = ${otherSnapshotId}
			where id = ${otherPlanId}`;
		await transaction`insert into plan_collaboration.draft_publication_receipts(
			request_id, plan_id, actor_id, expected_review_revision, expected_discussion_revision,
			command_fingerprint, document_fingerprint, snapshot_id, proposal_round
		) values (
			${crypto.randomUUID()}, ${planId}, ${publisherId}, 0, 0,
			${'a'.repeat(64)}, ${'b'.repeat(64)}, ${retiredSnapshotId}, 0
		)`;
		await transaction`update public.study_plans set progress_item_order = array[${retiredItemId}, 'current-course'] where id = ${planId}`;
		if (!baselineRed && !migrationSmoke) {
			await transaction.unsafe('set local role anon');
			const [metadata] =
				await transaction`select progress_item_kinds from public.study_plan_published where plan_id = ${planId}`;
			assert.deepEqual(metadata.progress_item_kinds, {
				[retiredItemId]: 'course',
				'current-course': 'course'
			});
			const [missing] =
				await transaction`select public.study_plan_progress_kinds(${crypto.randomUUID()}) as kinds`;
			assert.deepEqual(missing.kinds, {});
			await transaction.unsafe('reset role');
		}

		await transaction.unsafe('set local role authenticated');
		await transaction`select set_config('request.jwt.claim.sub', ${ownerId}, true)`;
		const saveRetired = () =>
			transaction`select * from public.private_progress_save(
				${planId}, -1, ${transaction.json([{ itemId: retiredItemId, state: 'passed', grade: 8 }])}
			)`;

		if (baselineRed) {
			await saveRetired();
			throw new Error('Baseline unexpectedly accepted retired progress.');
		}

		const [saved] = await saveRetired();
		assert.equal(Number(saved.version), 0);
		for (const itemId of ['unpublished-only', 'another-plan-only'])
			await assert.rejects(
				transaction.savepoint(
					() => transaction`select * from public.private_progress_save(
					${planId}, 0, ${transaction.json([{ itemId, state: 'passed', grade: 8 }])})`
				),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
			);
		await assert.rejects(
			transaction.savepoint(
				() =>
					transaction`select * from public.private_progress_save(
					${planId}, -1, ${transaction.json([{ itemId: retiredItemId, state: 'passed', grade: 8 }])}
				)`
			),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === 'P0001'
		);
		await assert.rejects(
			transaction.savepoint(
				() =>
					transaction`select * from public.private_progress_save(
					${planId}, 0, ${transaction.json([{ itemId: 'unknown', state: 'passed', grade: 8 }])}
				)`
			),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await transaction.unsafe('reset role');
		await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
			values (${conflictingSnapshotId}, ${planId},
				${transaction.json({ items: [{ id: retiredItemId, kind: 'milestone', seqId: 0 }] })}, '{}'::jsonb)`;
		await transaction`insert into plan_collaboration.draft_publication_receipts(
			request_id, plan_id, actor_id, expected_review_revision, expected_discussion_revision,
			command_fingerprint, document_fingerprint, snapshot_id, proposal_round
		) values (
			${crypto.randomUUID()}, ${planId}, ${publisherId}, 0, 0,
			${'c'.repeat(64)}, ${'d'.repeat(64)}, ${conflictingSnapshotId}, 0
		)`;
		await transaction.unsafe('set local role authenticated');
		await transaction`select set_config('request.jwt.claim.sub', ${ownerId}, true)`;
		await assert.rejects(
			transaction.savepoint(
				() =>
					transaction`select * from public.private_progress_save(
					${planId}, 0, ${transaction.json([{ itemId: retiredItemId, state: 'passed', grade: 8 }])}
				)`
			),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await transaction.unsafe('reset role');

		const [permissions] = await transaction`select
			has_function_privilege('authenticated',
				'public.private_progress_published_item_kind(uuid,text)', 'EXECUTE') as authenticated_helper,
			has_function_privilege('plande_collaboration',
				'public.private_progress_published_item_kind(uuid,text)', 'EXECUTE') as collaboration_helper,
			has_table_privilege('plande_collaboration', 'public.private_progress_items', 'SELECT')
				as collaboration_private_items`;
		assert.equal(permissions.authenticated_helper, false);
		assert.equal(permissions.collaboration_helper, false);
		assert.equal(permissions.collaboration_private_items, false);
		throw rollback;
	});
} catch (error) {
	if (error !== rollback) throw error;
	console.log('PASS private progress history SQL; transaction rolled back.');
} finally {
	await database.end({ timeout: 5 });
}
