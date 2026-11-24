import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import postgres from 'postgres';
import { publicationCandidate } from '../src/lib/plan-editor/publication-candidate';
import { reviewUnits } from '../src/lib/plan-editor/review-units';

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0) throw new Error('Start the dedicated local Supabase stack.');
const url = new URL(JSON.parse(new TextDecoder().decode(status.stdout)).DB_URL);
if (url.hostname !== '127.0.0.1' || url.port !== '55422' || url.username !== 'postgres')
	throw new Error('Publication checks require the dedicated local database.');
const database = postgres(url.toString(), { max: 1, onnotice: () => {} });
const rollback = new Error('Controlled rollback');

try {
	await database.begin(async (transaction) => {
		const migrationSmoke = process.argv.includes('--migration-smoke');
		const proposalMigrationSmoke = process.argv.includes('--proposal-migration-smoke');
		if (migrationSmoke && proposalMigrationSmoke)
			throw new Error('Choose one publication migration smoke mode.');
		const writerAcl = async () => {
			const [privileges] = await transaction`select
				has_schema_privilege('plande_collaboration_writer', 'plan_collaboration', 'CREATE') as can_create`;
			const memberships = await transaction`select
				grantor_role.rolname as grantor,
				membership.admin_option,
				membership.inherit_option,
				membership.set_option
				from pg_auth_members membership
				join pg_roles member_role on member_role.oid=membership.member
				join pg_roles granted_role on granted_role.oid=membership.roleid
				join pg_roles grantor_role on grantor_role.oid=membership.grantor
				where member_role.rolname='postgres' and granted_role.rolname='plande_collaboration_writer'
				order by grantor,admin_option,inherit_option,set_option`;
			return { canCreate: privileges.can_create, memberships };
		};
		const writerAclBefore = migrationSmoke || proposalMigrationSmoke ? await writerAcl() : null;
		if (migrationSmoke)
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908110000_draft_publication.sql').text())
				.simple();
		if (proposalMigrationSmoke)
			await transaction
				.unsafe(await Bun.file('supabase/migrations/20260908130000_plan_proposals.sql').text())
				.simple();
		const author = crypto.randomUUID();
		const reviewerA = crypto.randomUUID();
		const reviewerB = crypto.randomUUID();
		const university = `VAL34 publication ${crypto.randomUUID()}`;
		await transaction`insert into auth.users(id) values (${author}), (${reviewerA}), (${reviewerB})`;
		await transaction.unsafe('grant plande_collaboration to postgres');
		await transaction.unsafe('set local role plande_collaboration');
		const [draft] = await transaction`select * from plan_collaboration.create_or_find_draft(
			${university}, 'Faculty', 'Offer', null, null, null,
			'[{"label":"Plan oficial","url":"https://example.test/plan"}]'::jsonb, ${author})`;
		const content = {
			schemaVersion: 1 as const,
			document: {
				nextSeqId: 1,
				sections: [{ id: 'basic', label: 'Básica', year: 1 }],
				items: [
					{
						id: 'course',
						seqId: 0,
						kind: 'course' as const,
						type: 'mandatory' as const,
						name: 'Course',
						placements: [{ id: 'course-basic', sectionId: 'basic' }]
					}
				],
				requirements: {}
			},
			unknownRequirements: [],
			unsupportedContent: []
		};
		await transaction`select * from plan_collaboration.save_draft_document(${draft.plan_id}, 0, ${transaction.json(content)}, ${author})`;
		const [review] =
			await transaction`select * from plan_collaboration.lock_draft_review(${draft.plan_id}, ${reviewerA})`;
		const revision = Number(review.review_revision);
		assert.equal(revision, 1);
		const sources = review.sources as { id: string; label: string; url: string }[];
		assert.equal(sources.length, 1);
		const candidate = publicationCandidate({
			content,
			identity: {
				degreeName: 'Offer',
				degreeSlug: '',
				universityName: university,
				universitySlug: '',
				collegeName: 'Faculty',
				canonicalSlug: `plan-${draft.plan_id}`,
				year: null
			},
			sources: sources.map((source, index) => ({ ...source, id: index + 1 }))
		});
		assert.equal(candidate.ok, true, 'The publication test needs a native reader-compatible plan.');
		if (!candidate.ok) return;
		const manifest = reviewUnits({
			content,
			identity: { university, faculty: 'Faculty', offer: 'Offer' },
			sources
		}).units.map((unit) => {
			assert.notEqual(unit.fingerprint, undefined, `Review unit ${unit.key} must be available.`);
			return {
				key: unit.key,
				fingerprint: createHash('sha256').update(unit.fingerprint!).digest('hex')
			};
		});
		const publish = (
			reviewRevision: number,
			discussionRevision: number,
			requestId = crypto.randomUUID()
		) =>
			transaction`select * from plan_collaboration.publish_draft(
				${draft.plan_id}, ${reviewRevision}, ${discussionRevision}, ${requestId}, ${JSON.stringify(content)}::text::jsonb,
				${transaction.json(candidate.plan)}, ${transaction.json(candidate.catalog)}, ${transaction.json(manifest)}, ${author})`;
		const [stale] = await publish(revision - 1, 0);
		assert.equal(stale.disposition, 'version_conflict');
		const [withoutReviews] = await publish(revision, 0);
		assert.equal(withoutReviews.disposition, 'blocked');
		assert(withoutReviews.blockers.includes('reviews_missing'));
		const [beforeObjection] =
			await transaction`select * from plan_collaboration.read_publication_status(${draft.plan_id})`;
		assert.equal(beforeObjection.snapshot_id, null);
		const fingerprint = manifest.find((unit) => unit.key === 'item:course')?.fingerprint;
		assert(fingerprint);
		const [objection] = await transaction`select * from plan_collaboration.add_draft_discussion(
			${draft.plan_id}, ${revision}, 0, ${crypto.randomUUID()}, 'objection', 'item:course', ${fingerprint},
			'La fuente requiere confirmación.', ${sources[0].id}, 'Página 1', ${reviewerA})`;
		assert.equal(objection.disposition, 'created');
		const [objectionBlocked] = await publish(revision, 1);
		assert.equal(objectionBlocked.disposition, 'blocked');
		assert(objectionBlocked.blockers.includes('objections_pending'));
		const [stillUnpublished] =
			await transaction`select * from plan_collaboration.read_publication_status(${draft.plan_id})`;
		assert.equal(stillUnpublished.snapshot_id, null);
		const [dismissed] = await transaction`select * from plan_collaboration.resolve_draft_objection(
			${draft.plan_id}, ${objection.discussion_id}, ${revision}, 1, ${crypto.randomUUID()}, 'dismiss',
			'Revisión independiente.', ${sources[0].id}, 'Página 1', '', ${fingerprint}, ${reviewerB})`;
		assert.equal(dismissed.status, 'dismissed');
		for (const reviewer of [reviewerA, reviewerB]) {
			for (const unit of manifest)
				await transaction`select plan_collaboration.record_draft_check(${draft.plan_id}, ${revision}, ${unit.key}, ${unit.fingerprint}, true, ${reviewer})`;
			await transaction`select plan_collaboration.approve_draft_review(${draft.plan_id}, ${revision}, ${transaction.json(manifest)}, ${reviewer})`;
		}
		const requestId = crypto.randomUUID();
		const [published] = await publish(revision, 2, requestId);
		assert.equal(published.disposition, 'published');
		assert(published.snapshot_id);
		const [retried] = await publish(revision, 2, requestId);
		assert.equal(retried.disposition, 'existing');
		assert.equal(retried.snapshot_id, published.snapshot_id);
		const readPublished = (actor: string, reviewRevision = revision, discussionRevision = 2) =>
			transaction`select * from plan_collaboration.read_published_draft_result(
				${draft.plan_id}, ${requestId}, ${reviewRevision}, ${discussionRevision}, ${actor})`;
		const [publishedResult] = await readPublished(author);
		assert.equal(publishedResult.snapshot_id, published.snapshot_id);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select * from plan_collaboration.read_published_draft_result(
					${draft.plan_id}, ${requestId}, ${revision}, 2, ${reviewerA})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select * from plan_collaboration.read_published_draft_result(
					${draft.plan_id}, ${requestId}, ${revision + 1}, 2, ${author})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '22023'
		);
		await transaction.unsafe('reset role');
		await transaction`update plan_collaboration.student_permissions set contributions_enabled=false where subject_id=${reviewerB}`;
		await transaction.unsafe('set local role plande_collaboration');
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select * from plan_collaboration.read_published_draft_result(
					${draft.plan_id}, ${requestId}, ${revision}, 2, ${reviewerB})`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		const [status] =
			await transaction`select * from plan_collaboration.read_publication_status(${draft.plan_id})`;
		assert.equal(status.snapshot_id, published.snapshot_id);
		await transaction.unsafe('reset role');
		await transaction.unsafe('set local role anon');
		const catalog =
			await transaction`select * from public.study_plan_catalog where canonical_slug=${published.canonical_slug}`;
		const plan =
			await transaction`select * from public.study_plan_published where slug=${published.canonical_slug}`;
		assert.equal(catalog.length, 1);
		assert.equal(plan.length, 1);
		await assert.rejects(
			transaction.savepoint(async (sql) => {
				await sql`select * from plan_collaboration.draft_publication_receipts where plan_id=${draft.plan_id}`;
			}),
			(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
		);
		await transaction.unsafe('reset role');
		for (const role of ['anon', 'authenticated']) {
			await transaction.unsafe(`set local role ${role}`);
			await assert.rejects(
				transaction.savepoint(async (sql) => {
					await sql`select * from plan_collaboration.publish_draft(
						${draft.plan_id}, ${revision}, 2, ${requestId}, ${sql.json(content)},
						${sql.json(candidate.plan)}, ${sql.json(candidate.catalog)}, ${sql.json(manifest)}, ${author})`;
				}),
				(error: unknown) => error instanceof postgres.PostgresError && error.code === '42501'
			);
			await transaction.unsafe('reset role');
		}
		const writerAclAfter = await writerAcl();
		assert.equal(writerAclAfter.canCreate, false);
		if (writerAclBefore) assert.deepEqual(writerAclAfter, writerAclBefore);
		throw rollback;
	});
} catch (error) {
	if (error !== rollback) throw error;
	console.log(
		process.argv.includes('--migration-smoke') || process.argv.includes('--proposal-migration-smoke')
			? 'PASS draft publication SQL; fixtures and migration rolled back.'
			: 'PASS draft publication SQL; fixtures rolled back.'
	);
} finally {
	await database.end({ timeout: 5 });
}
