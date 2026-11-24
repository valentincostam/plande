import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import postgres from 'postgres';
import { publishedPlanDraft } from '../src/lib/plan-editor/published-plan-draft';
import { reviewUnits } from '../src/lib/plan-editor/review-units';
import { studyPlanDocumentSchema } from '../src/lib/study-plan-schema';
import { studyPlanDataToCatalogEntry } from '../src/lib/study-plan-catalog';

const foundationSmoke = process.argv.includes('--foundation-smoke');
const yearMigrationSmoke = process.argv.includes('--year-migration-smoke');
const roundCommands = process.argv.includes('--round-commands') || yearMigrationSmoke;

if (!foundationSmoke && !roundCommands)
	throw new Error('Pass --foundation-smoke, --round-commands or --year-migration-smoke.');
const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0) throw new Error('Start the dedicated local Supabase stack.');
const url = new URL(JSON.parse(new TextDecoder().decode(status.stdout)).DB_URL);
if (url.hostname !== '127.0.0.1' || url.port !== '55422' || url.username !== 'postgres')
	throw new Error('Proposal checks require the dedicated local database.');
const database = postgres(url.toString(), { max: 1, onnotice: () => {} });
const rollback = new Error('Controlled rollback');

try {
	await database.begin(async (transaction) => {
		await transaction.unsafe("set local lock_timeout = '3s'");
		await transaction.unsafe("set local statement_timeout = '15s'");
		if (foundationSmoke)
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908130000_plan_proposals.sql').text())
				.simple();
		const planId = crypto.randomUUID();
		const snapshotId = crypto.randomUUID();
		const author = crypto.randomUUID();
		const reviewer = crypto.randomUUID();
		const reviewerTwo = crypto.randomUUID();
		const sourceId = crypto.randomUUID();
		const requestId = crypto.randomUUID();
		const [seed] = await transaction`select document, catalog from public.study_plan_snapshots
			where id = '10000000-0000-4000-8000-000000000001'::uuid`;
		assert.ok(seed, 'The fixed local catalog must be seeded.');
		const plan = studyPlanDocumentSchema.parse(seed.document);
		plan.info.universityName = `Proposal smoke ${planId}`;
		if (yearMigrationSmoke) delete plan.info.year;
		plan.info.sources = [
			{ id: 8, label: 'Published source', url: 'https://example.edu/published' }
		];
		const content = publishedPlanDraft(plan, 0);
		let proposalContent = content;
		await transaction`insert into auth.users(id) values (${author}), (${reviewer}), (${reviewerTwo})`;
		await transaction`insert into public.study_plans(id, canonical_slug)
			values (${planId}, ${`proposal-smoke-${planId}`})`;
		await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
			values (${snapshotId}, ${planId}, ${transaction.json(plan)}, ${transaction.json(studyPlanDataToCatalogEntry(plan))})`;
		await transaction`update public.study_plans set published_snapshot_id = ${snapshotId} where id = ${planId}`;
		const [offer] = await transaction`insert into plan_collaboration.academic_offers
			(university_name, faculty_name, offer_name, university_key, faculty_key, offer_key)
			values (${plan.info.universityName}, ${plan.info.collegeName ?? null}, ${plan.info.degreeName},
				lower(${plan.info.universityName}), lower(${plan.info.collegeName ?? null}), lower(${plan.info.degreeName}))
			returning id`;
		await transaction`insert into plan_collaboration.plan_offer_identity(plan_id, offer_id, plan_year, is_draft)
			values (${planId}, ${offer.id}, ${plan.info.year ?? null}, false)`;
		await transaction`insert into plan_collaboration.draft_envelopes
			(plan_id, content, version, review_invalidation_revision, discussion_revision, review_authorship_known)
			values (${planId}, ${JSON.stringify(content)}::text::jsonb, 7, 11, 13, true)`;
		await transaction`insert into plan_collaboration.draft_sources(id, plan_id, label, url, position)
			values (${sourceId}, ${planId}, 'Published source', 'https://example.edu/published', 0),
				(${crypto.randomUUID()}, ${planId}, 'Unpublished source', 'https://example.edu/unpublished', 1)`;
		await transaction`insert into plan_collaboration.draft_coauthors(plan_id, subject_id, first_version)
			values (${planId}, ${reviewer}, 7)`;
		await transaction`insert into plan_collaboration.draft_review_checks(plan_id, reviewer_id, unit_key, fingerprint)
			values (${planId}, ${reviewer}, 'identity', ${'b'.repeat(64)})`;
		const [permissions] = await transaction`select
			has_function_privilege('plande_collaboration',
				'plan_collaboration.open_plan_proposal(uuid,uuid,uuid,uuid,text,jsonb,uuid)', 'EXECUTE') as can_open,
			has_table_privilege('plande_collaboration', 'plan_collaboration.plan_proposals', 'SELECT') as can_read_table`;
		assert.equal(
			permissions.can_open,
			!foundationSmoke,
			foundationSmoke
				? 'Opening must stay disabled until legacy commands are round-safe.'
				: 'The applied proposal migration must enable proposal opening.'
		);
		assert.equal(permissions.can_read_table, false);
		await transaction.unsafe('grant plande_collaboration to postgres');
		if (foundationSmoke) {
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908133000_enable_plan_proposals.sql').text())
				.simple();
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908134000_public_proposal_context.sql').text())
				.simple();
		}
		if (yearMigrationSmoke)
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908136000_proposal_year.sql').text())
				.simple();
		const [publicContextPermissions] = await transaction`select
			has_function_privilege('anon',
				'plan_collaboration.read_public_proposal(uuid)', 'EXECUTE') as anon_execute,
			has_function_privilege('authenticated',
				'plan_collaboration.read_public_proposal(uuid)', 'EXECUTE') as authenticated_execute,
			has_function_privilege('plande_collaboration',
				'plan_collaboration.read_public_proposal(uuid)', 'EXECUTE') as server_execute`;
		assert.equal(publicContextPermissions.anon_execute, false);
		assert.equal(publicContextPermissions.authenticated_execute, false);
		assert.equal(publicContextPermissions.server_execute, true);
		await transaction.unsafe('set local role plande_collaboration');
		const open = (expectedBase: string, request = requestId, draft = content) =>
			transaction`select * from plan_collaboration.open_plan_proposal(
				${planId}::uuid, ${expectedBase}::uuid, ${snapshotId}::uuid, ${request}::uuid,
				'Corregir requisitos según la resolución.', ${JSON.stringify(draft)}::text::jsonb, ${author}::uuid)`;
		const [stale] = await open(crypto.randomUUID());
		assert.equal(stale.disposition, 'base_obsolete');
		const malformed = structuredClone(content);
		malformed.document.items[0].name = 'Not in the published source';
		await assert.rejects(
			transaction.savepoint(() => open(snapshotId, crypto.randomUUID(), malformed)),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		const [opened] = await open(snapshotId);
		assert.equal(opened.disposition, 'opened');
		assert.equal(Number(opened.proposal_round), 1);
		assert.equal(opened.base_snapshot_id, snapshotId);
		const [publicProposal] =
			await transaction`select * from plan_collaboration.read_public_proposal(${planId})`;
		assert.deepEqual(Object.keys(publicProposal).sort(), [
			'argument',
			'base_snapshot_id',
			'proposal_round',
			'source_snapshot_id'
		]);
		assert.equal(Number(publicProposal.proposal_round), 1);
		assert.equal(publicProposal.base_snapshot_id, snapshotId);
		assert.equal(publicProposal.source_snapshot_id, snapshotId);
		assert.equal(publicProposal.argument, 'Corregir requisitos según la resolución.');
		const [retried] = await open(snapshotId);
		assert.equal(retried.disposition, 'existing');
		assert.equal(Number(retried.proposal_round), 1);
		const laterFloor = structuredClone(content);
		laterFloor.document.nextSeqId += 10;
		const [laterRetry] = await open(snapshotId, requestId, laterFloor);
		assert.equal(laterRetry.disposition, 'existing');
		const [continued] = await open(snapshotId, crypto.randomUUID());
		assert.equal(continued.disposition, 'active');
		const [locked] =
			await transaction`select * from plan_collaboration.lock_proposal_round(${planId}, 1, ${author})`;
		assert.equal(locked.disposition, 'locked');
		assert.equal(Number(locked.version), 8);
		assert.equal(Number(locked.review_revision), 12);
		assert.equal(Number(locked.discussion_revision), 14);
		const [wrongRound] =
			await transaction`select * from plan_collaboration.lock_proposal_round(${planId}, 2, ${author})`;
		assert.equal(wrongRound.disposition, 'round_conflict');
		if (yearMigrationSmoke) {
			const conflictPlanId = crypto.randomUUID();
			await transaction.unsafe('reset role');
			await transaction`insert into public.study_plans(id, canonical_slug)
				values (${conflictPlanId}, ${`proposal-year-conflict-${conflictPlanId}`})`;
			await transaction`insert into plan_collaboration.plan_offer_identity(plan_id, offer_id, plan_year, is_draft)
				values (${conflictPlanId}, ${offer.id}, 2026, false)`;
			await transaction.unsafe('set local role plande_collaboration');
			const [conflict] = await transaction`select * from plan_collaboration.set_draft_year(
				${planId}, 2026, ${author})`;
			assert.equal(conflict.disposition, 'year_conflict');
			assert.equal(conflict.conflicting_plan_id, conflictPlanId);
			await transaction.unsafe('reset role');
			const [unchangedYear] = await transaction`select identity.plan_year, proposal.proposed_plan_year,
				envelope.review_invalidation_revision
				from plan_collaboration.plan_offer_identity identity
				join plan_collaboration.draft_envelopes envelope on envelope.plan_id = identity.plan_id
				join plan_collaboration.plan_proposals proposal
					on proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
				where identity.plan_id = ${planId}`;
			assert.equal(unchangedYear.plan_year, null);
			assert.equal(unchangedYear.proposed_plan_year, null);
			assert.equal(Number(unchangedYear.review_invalidation_revision), 12);
			await transaction`delete from plan_collaboration.plan_offer_identity where plan_id = ${conflictPlanId}`;
			await transaction`delete from public.study_plans where id = ${conflictPlanId}`;
			await transaction.unsafe('set local role plande_collaboration');
			const [setYear] = await transaction`select * from plan_collaboration.set_draft_year(
				${planId}, 2026, ${author})`;
			assert.equal(setYear.disposition, 'updated');
			const [effectiveDraft] = await transaction`select * from plan_collaboration.read_draft(${planId})`;
			assert.equal(effectiveDraft.plan_year, 2026);
			await transaction.unsafe('reset role');
			const [pendingYear] = await transaction`select identity.plan_year, proposal.proposed_plan_year,
				envelope.review_invalidation_revision
				from plan_collaboration.plan_offer_identity identity
				join plan_collaboration.draft_envelopes envelope on envelope.plan_id = identity.plan_id
				join plan_collaboration.plan_proposals proposal
					on proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
				where identity.plan_id = ${planId}`;
			assert.equal(pendingYear.plan_year, null);
			assert.equal(pendingYear.proposed_plan_year, 2026);
			assert.equal(Number(pendingYear.review_invalidation_revision), 13);
			await transaction.unsafe('set local role plande_collaboration');
		}
		if (roundCommands) {
			const [review] =
				await transaction`select * from plan_collaboration.lock_draft_review(${planId}, ${author})`;
			assert.equal(review.sources.length, 1);
			assert.equal(review.sources[0].id, sourceId);
			assert.equal(review.sources[0].label, 'Published source');
			assert.equal(review.sources[0].url, 'https://example.edu/published');
			const [staleSave] = await transaction`select * from plan_collaboration.save_draft_document(
				${planId}, 7, ${JSON.stringify(content)}::text::jsonb, ${author})`;
			assert.equal(staleSave.disposition, 'version_conflict');
			const [currentSave] = await transaction`select * from plan_collaboration.save_draft_document(
				${planId}, 8, ${JSON.stringify(content)}::text::jsonb, ${author})`;
			assert.equal(currentSave.disposition, 'unchanged');
			const [staleSource] = await transaction`select * from plan_collaboration.add_draft_source(
				${planId}, 11, 'A stale source', 'https://example.edu/stale', ${author})`;
			assert.equal(staleSource.disposition, 'version_conflict');
			const changed = structuredClone(content);
			changed.document.items[0].name += ' corrected';
			const [saved] = await transaction`select * from plan_collaboration.save_draft_document(
				${planId}, 8, ${JSON.stringify(changed)}::text::jsonb, ${author})`;
			assert.equal(saved.disposition, 'saved');
			proposalContent = changed;
			const [reviewerState] =
				await transaction`select * from plan_collaboration.lock_draft_review(${planId}, ${reviewer})`;
			assert.equal(reviewerState.is_coauthor, false);
			assert.deepEqual(reviewerState.checks, []);
			await assert.rejects(
				transaction.savepoint(
					() => transaction`select plan_collaboration.record_draft_check(
				${planId}, 11, 'identity', ${'a'.repeat(64)}, true, ${reviewer})`
				),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '40001'
			);
			await transaction`select plan_collaboration.record_draft_check(
				${planId}, ${Number(reviewerState.review_revision)}, 'identity', ${'a'.repeat(64)}, true, ${reviewer})`;
		}
		await transaction.unsafe('reset role');
		const [stored] =
			await transaction`select published_snapshot_id, progress_item_order from public.study_plans where id = ${planId}`;
		assert.equal(stored.published_snapshot_id, snapshotId);
		const originalOrder = [...plan.items].sort((a, b) => a.seqId - b.seqId).map((item) => item.id);
		assert.deepEqual(stored.progress_item_order, originalOrder);
		const [oldCheck] =
			await transaction`select fingerprint from plan_collaboration.draft_review_checks
			where plan_id = ${planId} and reviewer_id = ${reviewer} and proposal_round = 0 and unit_key = 'identity'`;
		assert.equal(oldCheck.fingerprint, 'b'.repeat(64));
		const identities = await transaction`select item_id, seq_id, kind
			from plan_collaboration.draft_item_identities where plan_id = ${planId}`;
		assert.deepEqual(
			identities
				.map((row) => ({ id: row.item_id, seqId: Number(row.seq_id), kind: row.kind }))
				.sort((a, b) => a.id.localeCompare(b.id)),
			plan.items
				.map(({ id, seqId, kind }) => ({ id, seqId, kind }))
				.sort((a, b) => a.id.localeCompare(b.id))
		);
		const appended = structuredClone(plan);
		appended.items.push({
			id: 'later-published-item',
			seqId: 0,
			kind: 'milestone',
			name: 'Later publication',
			placements: []
		});
		for (const document of [appended, plan]) {
			const nextSnapshot = crypto.randomUUID();
			await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
				values (${nextSnapshot}, ${planId}, ${transaction.json(document)}, ${transaction.json(studyPlanDataToCatalogEntry(document))})`;
			await transaction`update public.study_plans set published_snapshot_id = ${nextSnapshot} where id = ${planId}`;
			await transaction.unsafe('set local role anon');
			const [published] =
				await transaction`select progress_item_order from public.study_plan_published where plan_id = ${planId}`;
			assert.deepEqual(published.progress_item_order, [...originalOrder, 'later-published-item']);
			await transaction.unsafe('reset role');
		}
		await transaction`update public.study_plans set published_snapshot_id = ${snapshotId} where id = ${planId}`;
		if (roundCommands) {
			await transaction.unsafe('set local role plande_collaboration');
			const candidateFor = (draft: typeof proposalContent) => {
				const candidate = structuredClone(plan);
				candidate.info.canonicalSlug = `proposal-smoke-${planId}`;
				if (yearMigrationSmoke) candidate.info.year = 2026;
				candidate.info.sources = [
					{ id: 1, label: 'Published source', url: 'https://example.edu/published' }
				];
				candidate.items[0].name = draft.document.items[0].name;
				return candidate;
			};
			const manifestFor = (draft: typeof proposalContent) =>
				reviewUnits({
					content: draft,
					identity: {
						university: plan.info.universityName,
						faculty: plan.info.collegeName ?? null,
						offer: plan.info.degreeName,
						...(yearMigrationSmoke
							? { year: 2026 }
							: plan.info.year === undefined
								? {}
								: { year: plan.info.year }),
						...(plan.info.notes?.length ? { notes: plan.info.notes } : {})
					},
					sources: [{ id: sourceId, label: 'Published source', url: 'https://example.edu/published' }]
				}).units.map((unit) => {
					assert.ok(unit.fingerprint, `Review unit ${unit.key} must be available.`);
					return {
						key: unit.key,
						fingerprint: createHash('sha256').update(unit.fingerprint).digest('hex')
					};
				});
			const certify = async (actor: string, manifest: ReturnType<typeof manifestFor>) => {
				const [state] =
					await transaction`select * from plan_collaboration.lock_draft_review(${planId}, ${actor})`;
				for (const unit of manifest) {
					await transaction`select plan_collaboration.record_draft_check(
						${planId}, ${Number(state.review_revision)}, ${unit.key}, ${unit.fingerprint}, true, ${actor})`;
				}
				await transaction`select plan_collaboration.approve_draft_review(
					${planId}, ${Number(state.review_revision)}, ${JSON.stringify(manifest)}::text::jsonb, ${actor})`;
				return state;
			};
			const proposal = candidateFor(proposalContent);
			const proposalCatalog = studyPlanDataToCatalogEntry(proposal);
			const proposalManifest = manifestFor(proposalContent);
			const reviewerOneState = await certify(reviewer, proposalManifest);
			const reviewerTwoState = await certify(reviewerTwo, proposalManifest);
			assert.equal(Number(reviewerOneState.review_revision), Number(reviewerTwoState.review_revision));
			const publishRequestId = crypto.randomUUID();
			const publishProposal = () =>
				transaction`select * from plan_collaboration.publish_draft(
					${planId}, ${Number(reviewerOneState.review_revision)}, ${14}, ${publishRequestId},
					${JSON.stringify(proposalContent)}::text::jsonb, ${transaction.json(proposal)},
					${transaction.json(proposalCatalog)}, ${JSON.stringify(proposalManifest)}::text::jsonb, ${author})`;
			let publishConflictPlanId: string | undefined;
			if (yearMigrationSmoke) {
				publishConflictPlanId = crypto.randomUUID();
				await transaction.unsafe('reset role');
				await transaction`insert into public.study_plans(id, canonical_slug)
					values (${publishConflictPlanId}, ${`proposal-publish-conflict-${publishConflictPlanId}`})`;
				await transaction`insert into plan_collaboration.plan_offer_identity(plan_id, offer_id, plan_year, is_draft)
					values (${publishConflictPlanId}, ${offer.id}, 2026, false)`;
				await transaction.unsafe('set local role plande_collaboration');
				const [blocked] = await publishProposal();
				assert.equal(blocked.disposition, 'blocked');
				assert.deepEqual(blocked.blockers, ['year_conflict']);
				await transaction.unsafe('reset role');
				const [unchangedPublication] = await transaction`select identity.plan_year,
					plan.published_snapshot_id, count(snapshot.id)::integer as snapshot_count
					from plan_collaboration.plan_offer_identity identity
					join public.study_plans plan on plan.id = identity.plan_id
					left join public.study_plan_snapshots snapshot on snapshot.plan_id = plan.id
					where identity.plan_id = ${planId}
					group by identity.plan_year, plan.published_snapshot_id`;
				assert.equal(unchangedPublication.plan_year, null);
				assert.equal(unchangedPublication.published_snapshot_id, snapshotId);
				assert.equal(Number(unchangedPublication.snapshot_count), 3);
				await transaction`delete from plan_collaboration.plan_offer_identity where plan_id = ${publishConflictPlanId}`;
				await transaction`delete from public.study_plans where id = ${publishConflictPlanId}`;
				await transaction.unsafe('set local role plande_collaboration');
			}
			const [publishedProposal] = await publishProposal();
			assert.equal(publishedProposal.disposition, 'published');
			assert.notEqual(publishedProposal.snapshot_id, snapshotId);
			assert.equal(publishedProposal.canonical_slug, `proposal-smoke-${planId}`);
			assert.deepEqual(
				await transaction`select * from plan_collaboration.read_public_proposal(${planId})`,
				[]
			);
			await transaction.unsafe('reset role');
			const [publishedReceipt] = await transaction`select proposal_round, snapshot_id
				from plan_collaboration.draft_publication_receipts where request_id = ${publishRequestId}`;
			assert.equal(Number(publishedReceipt.proposal_round), 1);
			assert.equal(publishedReceipt.snapshot_id, publishedProposal.snapshot_id);
			const [closedOne] = await transaction`select status from plan_collaboration.plan_proposals
				where plan_id = ${planId} and proposal_round = 1`;
			assert.equal(closedOne.status, 'closed');
			if (yearMigrationSmoke) {
				const [publishedYear] = await transaction`select identity.plan_year, snapshot.document->'info'->>'year' as snapshot_year
					from plan_collaboration.plan_offer_identity identity
					join public.study_plan_snapshots snapshot on snapshot.id = ${publishedProposal.snapshot_id}
					where identity.plan_id = ${planId}`;
				assert.equal(publishedYear.plan_year, 2026);
				assert.equal(publishedYear.snapshot_year, '2026');
			}
			await transaction.unsafe('set local role plande_collaboration');
			const [publishedRetry] = await transaction`select * from plan_collaboration.publish_draft(
				${planId}, ${Number(reviewerOneState.review_revision)}, ${14}, ${publishRequestId},
				${JSON.stringify(proposalContent)}::text::jsonb, ${transaction.json(proposal)},
				${transaction.json(proposalCatalog)}, ${JSON.stringify(proposalManifest)}::text::jsonb, ${author})`;
			assert.equal(publishedRetry.disposition, 'existing');
			assert.equal(publishedRetry.snapshot_id, publishedProposal.snapshot_id);
			const [openedReversion] = await open(publishedProposal.snapshot_id, crypto.randomUUID(), content);
			assert.equal(openedReversion.disposition, 'opened');
			assert.equal(Number(openedReversion.proposal_round), 2);
			const reversion = candidateFor(content);
			const reversionCatalog = studyPlanDataToCatalogEntry(reversion);
			const reversionManifest = manifestFor(content);
			const proposalFingerprints = new Map(proposalManifest.map((unit) => [unit.key, unit.fingerprint]));
			const reversionFingerprints = new Map(reversionManifest.map((unit) => [unit.key, unit.fingerprint]));
			const unchangedKeys = [...proposalFingerprints.keys()].filter(
				(key) => proposalFingerprints.get(key) === reversionFingerprints.get(key)
			);
			const changedKeys = [...proposalFingerprints.keys()].filter(
				(key) => proposalFingerprints.get(key) !== reversionFingerprints.get(key)
			);
			assert.ok(unchangedKeys.length > 0, 'Reversion must retain at least one unchanged review unit.');
			assert.ok(changedKeys.length > 0, 'Reversion must change at least one review unit.');
			await transaction.unsafe('reset role');
			const carriedChecks = await transaction`select unit_key, fingerprint from plan_collaboration.draft_review_checks
				where plan_id = ${planId} and proposal_round = 2`;
			const carriedFingerprints = new Map(carriedChecks.map((check) => [check.unit_key, check.fingerprint]));
			for (const key of unchangedKeys) {
				assert.equal(carriedFingerprints.get(key), reversionFingerprints.get(key));
			}
			for (const key of changedKeys) {
				assert.equal(carriedFingerprints.get(key), proposalFingerprints.get(key));
				assert.notEqual(carriedFingerprints.get(key), reversionFingerprints.get(key));
			}
			const [copiedApprovals] = await transaction`select count(*)::integer as count
				from plan_collaboration.draft_review_approvals where plan_id = ${planId} and proposal_round = 2`;
			assert.equal(Number(copiedApprovals.count), 0, 'Proposal opening must not copy approvals.');
			await transaction.unsafe('set local role plande_collaboration');
			const reversionOneState = await certify(reviewer, reversionManifest);
			const reversionTwoState = await certify(reviewerTwo, reversionManifest);
			assert.equal(Number(reversionOneState.review_revision), Number(reversionTwoState.review_revision));
			const reversionRequestId = crypto.randomUUID();
			const [publishedReversion] = await transaction`select * from plan_collaboration.publish_draft(
				${planId}, ${Number(reversionOneState.review_revision)}, ${15}, ${reversionRequestId},
				${JSON.stringify(content)}::text::jsonb, ${transaction.json(reversion)},
				${transaction.json(reversionCatalog)}, ${JSON.stringify(reversionManifest)}::text::jsonb, ${author})`;
			assert.equal(publishedReversion.disposition, 'published');
			assert.notEqual(publishedReversion.snapshot_id, snapshotId);
			assert.notEqual(publishedReversion.snapshot_id, publishedProposal.snapshot_id);
			if (yearMigrationSmoke) {
				await transaction.unsafe('reset role');
				const [revertedYear] = await transaction`select identity.plan_year, snapshot.document->'info'->>'year' as snapshot_year
					from plan_collaboration.plan_offer_identity identity
					join public.study_plan_snapshots snapshot on snapshot.id = ${publishedReversion.snapshot_id}
					where identity.plan_id = ${planId}`;
				assert.equal(revertedYear.plan_year, 2026);
				assert.equal(revertedYear.snapshot_year, '2026');
				await transaction.unsafe('set local role plande_collaboration');
			}
			const [unknownRead] = await transaction`select * from plan_collaboration.read_published_draft_result(
				${planId}, ${crypto.randomUUID()}, ${Number(reversionOneState.review_revision)}, ${15}, ${author})`;
			assert.equal(unknownRead, undefined, 'A new request must not recover the latest proposal publication.');
			const [unknownPublish] = await transaction`select * from plan_collaboration.publish_draft(
				${planId}, ${Number(reversionOneState.review_revision)}, ${15}, ${crypto.randomUUID()},
				${JSON.stringify(content)}::text::jsonb, ${transaction.json(reversion)},
				${transaction.json(reversionCatalog)}, ${JSON.stringify(reversionManifest)}::text::jsonb, ${author})`;
			assert.equal(unknownPublish.disposition, 'version_conflict');
			assert.equal(unknownPublish.snapshot_id, null);
			await transaction.unsafe('reset role');
			const [history] = await transaction`select count(*)::integer as count from public.study_plan_snapshots
				where plan_id = ${planId}`;
			assert.ok(Number(history.count) >= 5, 'Reversion must add a snapshot without deleting prior history.');
			await transaction.unsafe('set local role anon');
			const publicHistory = await transaction`select * from plan_collaboration.read_plan_history(${planId})`;
			assert.deepEqual(Object.keys(publicHistory[0]).sort(), [
				'argument',
				'is_current',
				'published_at',
				'snapshot_id'
			]);
			assert.ok(publicHistory.some((entry) => entry.snapshot_id === snapshotId));
			assert.ok(publicHistory.some((entry) => entry.snapshot_id === publishedProposal.snapshot_id));
			assert.ok(publicHistory.some((entry) => entry.snapshot_id === publishedReversion.snapshot_id));
			await transaction.unsafe('reset role');
			const [progressAfterReversion] = await transaction`select progress_item_order from public.study_plans where id = ${planId}`;
			assert.deepEqual(progressAfterReversion.progress_item_order, [...originalOrder, 'later-published-item']);
			await transaction.unsafe('set local role plande_collaboration');
			const [openedObsolete] = await open(publishedReversion.snapshot_id, crypto.randomUUID(), content);
			assert.equal(openedObsolete.disposition, 'opened');
			await transaction.unsafe('reset role');
			const obsoleteSnapshotId = crypto.randomUUID();
			await transaction`insert into public.study_plan_snapshots(id, plan_id, document, catalog)
				values (${obsoleteSnapshotId}, ${planId}, ${transaction.json(reversion)}, ${transaction.json(reversionCatalog)})`;
			await transaction`update public.study_plans set published_snapshot_id = ${obsoleteSnapshotId} where id = ${planId}`;
			await transaction.unsafe('set local role plande_collaboration');
			const [obsoleteState] = await transaction`select * from plan_collaboration.read_active_proposal(${planId}, ${author})`;
			const obsoleteRequestId = crypto.randomUUID();
			const [obsolete] = await transaction`select * from plan_collaboration.publish_draft(
				${planId}, ${Number(obsoleteState.review_revision)}, ${Number(obsoleteState.discussion_revision)}, ${obsoleteRequestId},
				${JSON.stringify(content)}::text::jsonb, ${transaction.json(reversion)},
				${transaction.json(reversionCatalog)}, ${JSON.stringify([])}::text::jsonb, ${author})`;
			assert.equal(obsolete.disposition, 'base_obsolete');
			const [receiptRead] = await transaction`select * from plan_collaboration.read_published_draft_result(
				${planId}, ${publishRequestId}, ${Number(reviewerOneState.review_revision)}, ${14}, ${author})`;
			assert.equal(receiptRead.snapshot_id, publishedProposal.snapshot_id);
			await transaction.unsafe('reset role');
			const [afterObsolete] = await transaction`select published_snapshot_id from public.study_plans where id = ${planId}`;
			assert.equal(afterObsolete.published_snapshot_id, obsoleteSnapshotId);
			const [stillActive] = await transaction`select status from plan_collaboration.plan_proposals
				where plan_id = ${planId} and proposal_round = 3`;
			assert.equal(stillActive.status, 'active');
			const [obsoleteReceipt] = await transaction`select count(*)::integer as count
				from plan_collaboration.draft_publication_receipts where request_id = ${obsoleteRequestId}`;
			assert.equal(Number(obsoleteReceipt.count), 0);
		}
		const [helper] = await transaction`select has_function_privilege('plande_collaboration',
			'plan_collaboration.append_progress_item_order(uuid,jsonb)', 'EXECUTE') as allowed`;
		assert.equal(helper.allowed, false);
		throw rollback;
	});
} catch (error) {
	if (error !== rollback) throw error;
	console.log(
		foundationSmoke
			? 'PASS: proposal foundation only; migration, permissions and fixtures rolled back.'
			: yearMigrationSmoke
				? 'PASS: proposal year migration; fixtures rolled back.'
			: 'PASS: proposal commands against applied migration; fixtures rolled back.'
	);
} finally {
	await database.end();
}
