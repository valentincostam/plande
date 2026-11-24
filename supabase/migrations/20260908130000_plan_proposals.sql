grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;

alter table plan_collaboration.draft_envelopes
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);

alter table plan_collaboration.draft_sources
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);
alter table plan_collaboration.draft_sources
  drop constraint draft_sources_plan_id_position_key,
  drop constraint draft_sources_pkey,
  add primary key(id, proposal_round),
  add constraint draft_sources_plan_round_position_key unique(plan_id, proposal_round, position);

alter table plan_collaboration.draft_coauthors
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);
alter table plan_collaboration.draft_coauthors
  drop constraint draft_coauthors_pkey,
  add primary key(plan_id, proposal_round, subject_id);

alter table plan_collaboration.draft_review_checks
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);
alter table plan_collaboration.draft_review_checks
  drop constraint draft_review_checks_pkey,
  add primary key(plan_id, proposal_round, reviewer_id, unit_key);

alter table plan_collaboration.draft_review_approvals
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);
alter table plan_collaboration.draft_review_approvals
  drop constraint draft_review_approvals_pkey,
  add primary key(plan_id, proposal_round, reviewer_id);

alter table plan_collaboration.draft_discussions
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);
create index draft_discussions_plan_round on plan_collaboration.draft_discussions(plan_id, proposal_round);

alter table plan_collaboration.draft_publication_receipts
  add column proposal_round bigint not null default 0 check(proposal_round >= 0);

create table plan_collaboration.plan_proposals (
  plan_id uuid not null references public.study_plans(id) on delete restrict,
  proposal_round bigint not null check(proposal_round > 0),
  base_snapshot_id uuid not null,
  source_snapshot_id uuid not null,
  request_id uuid not null unique,
  command_fingerprint text not null check(command_fingerprint ~ '^[a-f0-9]{64}$'),
  argument text not null check(length(btrim(argument)) between 1 and 8000),
  created_by uuid not null references auth.users(id) on delete restrict,
  status text not null check(status in ('active', 'closed')),
  created_at timestamptz not null default now(),
  closed_at timestamptz,
  primary key(plan_id, proposal_round),
  foreign key(base_snapshot_id, plan_id)
    references public.study_plan_snapshots(id, plan_id) on delete restrict,
  foreign key(source_snapshot_id, plan_id)
    references public.study_plan_snapshots(id, plan_id) on delete restrict,
  check((status = 'active') = (closed_at is null))
);
create unique index plan_proposals_one_active_plan
  on plan_collaboration.plan_proposals(plan_id) where status = 'active';
comment on table plan_collaboration.plan_proposals is
  'Post-publication rounds only. Legacy records remain at proposal_round 0 without a proposal header.';

alter table plan_collaboration.plan_proposals enable row level security;
alter table plan_collaboration.plan_proposals force row level security;
create policy "writer manages plan proposals" on plan_collaboration.plan_proposals
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.plan_proposals from public, anon, authenticated, service_role, plande_collaboration;
grant select, insert, update on plan_collaboration.plan_proposals to plande_collaboration_writer;
grant update(proposal_round) on plan_collaboration.draft_envelopes to plande_collaboration_writer;
grant select(id, plan_id, document) on public.study_plan_snapshots to plande_collaboration_writer;
create policy "collaboration reads proposal snapshots" on public.study_plan_snapshots
  for select to plande_collaboration_writer using(true);

alter table public.study_plans
  add column progress_item_order text[] not null default '{}';
grant update(progress_item_order), select(progress_item_order)
  on public.study_plans to plande_collaboration_writer;
grant select(progress_item_order) on public.study_plans to anon;
update public.study_plans plan
set progress_item_order = coalesce((
  select array_agg(item->>'id' order by (item->>'seqId')::bigint)
  from public.study_plan_snapshots snapshot
  cross join lateral jsonb_array_elements(snapshot.document->'items') item
  where snapshot.id = plan.published_snapshot_id
), '{}');

create or replace view public.study_plan_published
with (security_invoker = true) as
select plans.canonical_slug as slug, snapshots.document, plans.id as plan_id, plans.progress_item_order
from public.study_plans as plans
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id
union all
select aliases.slug, snapshots.document, plans.id as plan_id, plans.progress_item_order
from public.study_plan_aliases as aliases
join public.study_plans as plans on plans.id = aliases.plan_id
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id;
grant select on public.study_plan_published to anon;

create function plan_collaboration.append_progress_item_order(p_plan_id uuid, p_document jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare v_order text[];
begin
  if p_document is null or jsonb_typeof(p_document) is distinct from 'object'
    or jsonb_typeof(p_document->'items') is distinct from 'array'
    or exists(select 1 from jsonb_array_elements(p_document->'items') item
      where jsonb_typeof(item->'id') is distinct from 'string' or btrim(item->>'id') = ''
        or jsonb_typeof(item->'seqId') is distinct from 'number' or item->>'seqId' !~ '^[0-9]+$')
    or exists(select 1 from jsonb_array_elements(p_document->'items') item group by item->>'id' having count(*) > 1) then
    raise exception 'Invalid published item order' using errcode = '22023';
  end if;
  select progress_item_order into v_order from public.study_plans plan
    where plan.id = p_plan_id for update;
  if not found then raise exception 'Published plan unavailable' using errcode = '22023'; end if;
  if exists(select 1 from unnest(v_order) item group by item having count(*) > 1) then
    raise exception 'Published item order is invalid' using errcode = '22023';
  end if;
  update public.study_plans plan set progress_item_order = v_order || coalesce((
    select array_agg(item->>'id' order by (item->>'seqId')::bigint)
    from jsonb_array_elements(p_document->'items') item
    where not (item->>'id' = any(v_order))
  ), '{}') where plan.id = p_plan_id;
end;
$$;

create function plan_collaboration.append_progress_item_order_on_publication()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_document jsonb;
begin
  if new.published_snapshot_id is not null
    and new.published_snapshot_id is distinct from old.published_snapshot_id then
    select snapshot.document into v_document from public.study_plan_snapshots snapshot
      where snapshot.id = new.published_snapshot_id and snapshot.plan_id = new.id;
    if not found then raise exception 'Published snapshot unavailable' using errcode = '22023'; end if;
    perform plan_collaboration.append_progress_item_order(new.id, v_document);
  end if;
  return new;
end;
$$;

create trigger append_progress_item_order_on_publication
after update of published_snapshot_id on public.study_plans
for each row execute function plan_collaboration.append_progress_item_order_on_publication();

create function plan_collaboration.read_proposal_source(
  p_plan_id uuid,
  p_source_snapshot_id uuid
) returns table(
  source_document jsonb,
  expected_base_snapshot_id uuid,
  next_seq_id_floor bigint,
  editor_content jsonb
)
language plpgsql security definer set search_path = '' as $$
declare v_base_snapshot_id uuid; v_source_document jsonb; v_editor_content jsonb; v_floor bigint;
begin
  if p_plan_id is null or p_source_snapshot_id is null then
    raise exception 'Invalid proposal source' using errcode = '22023';
  end if;
  select plan.published_snapshot_id into v_base_snapshot_id
  from public.study_plans plan where plan.id = p_plan_id for key share;
  if not found or v_base_snapshot_id is null then
    raise exception 'Published plan unavailable' using errcode = '22023';
  end if;
  select snapshot.document into v_source_document
  from public.study_plan_snapshots snapshot
  where snapshot.id = p_source_snapshot_id and snapshot.plan_id = p_plan_id;
  if not found then
    raise exception 'Proposal source snapshot is unavailable' using errcode = '22023';
  end if;
  select revision.content into v_editor_content
  from plan_collaboration.draft_publication_receipts receipt
  join plan_collaboration.draft_document_versions revision
    on revision.plan_id = receipt.plan_id
      and revision.review_invalidation_revision = receipt.expected_review_revision
  where receipt.plan_id = p_plan_id and receipt.snapshot_id = p_source_snapshot_id
  order by revision.version desc limit 1;
  if v_editor_content is null then
    select envelope.content into v_editor_content
    from plan_collaboration.draft_publication_receipts receipt
    join plan_collaboration.draft_envelopes envelope
      on envelope.plan_id = receipt.plan_id
      and envelope.review_invalidation_revision = receipt.expected_review_revision
    where receipt.plan_id = p_plan_id and receipt.snapshot_id = p_source_snapshot_id
    order by receipt.published_at desc limit 1;
  end if;
  select greatest(
    coalesce((select max(identity.seq_id) + 1
      from plan_collaboration.draft_item_identities identity where identity.plan_id = p_plan_id), 0),
    coalesce((select max((item->>'seqId')::bigint) + 1
      from public.study_plan_snapshots snapshot
      cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
        then snapshot.document->'items' else '[]'::jsonb end) item
      where snapshot.plan_id = p_plan_id and jsonb_typeof(item->'seqId') = 'number'
        and item->>'seqId' ~ '^[0-9]+$'), 0),
    coalesce((select max((envelope.content#>>'{document,nextSeqId}')::bigint)
      from plan_collaboration.draft_envelopes envelope
      where envelope.plan_id = p_plan_id
        and jsonb_typeof(envelope.content#>'{document,nextSeqId}') = 'number'
        and envelope.content#>>'{document,nextSeqId}' ~ '^[0-9]+$'), 0)
  ) into v_floor;
  return query select v_source_document, v_base_snapshot_id, v_floor, v_editor_content;
end;
$$;

create function plan_collaboration.read_active_proposal(p_plan_id uuid, p_actor uuid)
returns table(
  proposal_round bigint,
  base_snapshot_id uuid,
  source_snapshot_id uuid,
  argument text,
  created_by uuid,
  created_at timestamptz,
  version bigint,
  review_revision bigint,
  discussion_revision bigint
)
language plpgsql security definer set search_path = '' as $$
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  return query
  select proposal.proposal_round, proposal.base_snapshot_id, proposal.source_snapshot_id,
    proposal.argument, proposal.created_by, proposal.created_at, envelope.version,
    envelope.review_invalidation_revision, envelope.discussion_revision
  from plan_collaboration.plan_proposals proposal
  join plan_collaboration.draft_envelopes envelope on envelope.plan_id = proposal.plan_id
  where proposal.plan_id = p_plan_id
    and proposal.status = 'active'
    and envelope.proposal_round = proposal.proposal_round;
end;
$$;

create function plan_collaboration.lock_proposal_round(
  p_plan_id uuid,
  p_expected_round bigint,
  p_actor uuid
) returns table(
  proposal_round bigint,
  base_snapshot_id uuid,
  source_snapshot_id uuid,
  version bigint,
  review_revision bigint,
  discussion_revision bigint,
  disposition text
)
language plpgsql security definer set search_path = '' as $$
declare v_envelope plan_collaboration.draft_envelopes%rowtype;
  v_proposal plan_collaboration.plan_proposals%rowtype;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  perform 1 from public.study_plans plan where plan.id = p_plan_id for key share;
  if not found then raise exception 'Proposal unavailable' using errcode = '22023'; end if;
  if p_expected_round is null or p_expected_round <= 0 then
    raise exception 'Invalid proposal round' using errcode = '22023';
  end if;
  select * into v_envelope
  from plan_collaboration.draft_envelopes envelope
  where envelope.plan_id = p_plan_id
  for update;
  if not found then
    raise exception 'Proposal unavailable' using errcode = '22023';
  end if;
  select * into v_proposal
  from plan_collaboration.plan_proposals proposal
  where proposal.plan_id = p_plan_id
    and proposal.proposal_round = v_envelope.proposal_round
    and proposal.status = 'active'
  for key share;
  if not found or v_envelope.proposal_round <> p_expected_round then
    return query select v_envelope.proposal_round, null::uuid, null::uuid,
      v_envelope.version, v_envelope.review_invalidation_revision,
      v_envelope.discussion_revision, 'round_conflict'::text;
    return;
  end if;
  return query select v_proposal.proposal_round, v_proposal.base_snapshot_id,
    v_proposal.source_snapshot_id, v_envelope.version,
    v_envelope.review_invalidation_revision, v_envelope.discussion_revision,
    'locked'::text;
end;
$$;

create function plan_collaboration.open_plan_proposal(
  p_plan_id uuid,
  p_expected_base_snapshot_id uuid,
  p_source_snapshot_id uuid,
  p_request_id uuid,
  p_argument text,
  p_content jsonb,
  p_actor uuid
) returns table(proposal_round bigint, base_snapshot_id uuid, disposition text)
language plpgsql security definer set search_path = '' as $$
declare v_base_snapshot_id uuid;
  v_envelope plan_collaboration.draft_envelopes%rowtype;
  v_existing plan_collaboration.plan_proposals%rowtype;
  v_source_document jsonb;
  v_base_document jsonb;
  v_content_structure jsonb;
  v_source_structure jsonb;
  v_round bigint;
  v_floor bigint;
  v_fingerprint text;
  v_had_envelope boolean;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if p_plan_id is null or p_expected_base_snapshot_id is null or p_source_snapshot_id is null
    or p_request_id is null
    or p_argument is null or length(btrim(p_argument)) not between 1 and 8000
    or p_content is null or jsonb_typeof(p_content) is distinct from 'object'
    or p_content->>'schemaVersion' <> '1'
    or jsonb_typeof(p_content#>'{document,sections}') is distinct from 'array'
    or jsonb_typeof(p_content#>'{document,items}') is distinct from 'array'
    or jsonb_typeof(p_content#>'{document,requirements}') is distinct from 'object'
    or jsonb_typeof(p_content#>'{document,nextSeqId}') is distinct from 'number'
    or p_content#>>'{document,nextSeqId}' !~ '^[0-9]+$'
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item
      where jsonb_typeof(item->'placements') is distinct from 'array')
    or jsonb_typeof(p_content->'unknownRequirements') is distinct from 'array'
    or jsonb_typeof(p_content->'unsupportedContent') is distinct from 'array'
    or pg_column_size(p_content) > 4194304 then
    raise exception 'Invalid proposal opening' using errcode = '22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'plan-proposal-request:' || p_request_id::text, 0
  ));
  v_fingerprint := pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(
    jsonb_build_object('planId', p_plan_id, 'expectedBaseSnapshotId', p_expected_base_snapshot_id,
      'sourceSnapshotId', p_source_snapshot_id, 'argument', btrim(p_argument))::text,
    'UTF8'
  )), 'hex');
  select * into v_existing
  from plan_collaboration.plan_proposals proposal
  where proposal.request_id = p_request_id;
  if found then
    if v_existing.plan_id <> p_plan_id or v_existing.created_by <> p_actor
      or v_existing.command_fingerprint <> v_fingerprint then
      raise exception 'Request identity was reused' using errcode = '22023';
    end if;
    return query select v_existing.proposal_round, v_existing.base_snapshot_id, 'existing'::text;
    return;
  end if;
  select plan.published_snapshot_id into v_base_snapshot_id
  from public.study_plans plan
  where plan.id = p_plan_id
  for update;
  if not found or v_base_snapshot_id is null then
    raise exception 'Published plan unavailable' using errcode = '22023';
  end if;
  if v_base_snapshot_id <> p_expected_base_snapshot_id then
    return query select null::bigint, v_base_snapshot_id, 'base_obsolete'::text;
    return;
  end if;
  select snapshot.document into v_base_document
  from public.study_plan_snapshots snapshot
  where snapshot.id = v_base_snapshot_id and snapshot.plan_id = p_plan_id;
  if not found then raise exception 'Published base snapshot is unavailable' using errcode = '22023'; end if;
  select snapshot.document into v_source_document
  from public.study_plan_snapshots snapshot
  where snapshot.id = p_source_snapshot_id and snapshot.plan_id = p_plan_id;
  if not found then
    raise exception 'Proposal source snapshot is unavailable' using errcode = '22023';
  end if;
  if jsonb_typeof(v_source_document->'sections') is distinct from 'array'
    or jsonb_typeof(v_source_document->'items') is distinct from 'array'
    or (v_source_document#>'{info,sources}' is not null
      and jsonb_typeof(v_source_document#>'{info,sources}') is distinct from 'array')
    or exists(select 1 from jsonb_array_elements(coalesce(v_source_document#>'{info,sources}', '[]'::jsonb)) source
      where jsonb_typeof(source->'label') is distinct from 'string'
        or jsonb_typeof(source->'url') is distinct from 'string'
        or btrim(source->>'label') = '' or btrim(source->>'url') = '')
    or exists(select 1 from jsonb_array_elements(coalesce(v_source_document#>'{info,sources}', '[]'::jsonb)) source
      group by btrim(source->>'label'), btrim(source->>'url') having count(*) > 1) then
    raise exception 'Proposal source snapshot is invalid' using errcode = '22023';
  end if;
  select jsonb_build_object(
    'sections', p_content#>'{document,sections}',
    'items', coalesce((select jsonb_agg(
      jsonb_set(item, '{placements}', coalesce((select jsonb_agg(placement - 'id' order by ordinal)
        from jsonb_array_elements(item->'placements') with ordinality placements(placement, ordinal)), '[]'::jsonb))
      order by item_ordinal)
      from jsonb_array_elements(p_content#>'{document,items}') with ordinality items(item, item_ordinal)), '[]'::jsonb),
    'requirements', coalesce(p_content#>'{document,requirements}', '{}'::jsonb)
  ), jsonb_build_object(
    'sections', v_source_document->'sections',
    'items', coalesce(v_source_document->'items', '[]'::jsonb),
    'requirements', coalesce(v_source_document->'requirements', '{}'::jsonb)
  ) into v_content_structure, v_source_structure;
  if v_content_structure <> v_source_structure then
    raise exception 'Proposal content does not match source snapshot' using errcode = '22023';
  end if;
  select * into v_existing
  from plan_collaboration.plan_proposals proposal
  where proposal.plan_id = p_plan_id and proposal.status = 'active'
  for key share;
  if found then
    return query select v_existing.proposal_round, v_existing.base_snapshot_id, 'active'::text;
    return;
  end if;
  select * into v_envelope
  from plan_collaboration.draft_envelopes envelope
  where envelope.plan_id = p_plan_id
  for update;
  v_had_envelope := found;
  select coalesce(max(proposal.proposal_round), 0) + 1 into v_round
  from plan_collaboration.plan_proposals proposal
  where proposal.plan_id = p_plan_id;
  if not v_had_envelope then
    insert into plan_collaboration.draft_envelopes(
      plan_id, content, proposal_round, review_authorship_known
    ) values(p_plan_id, p_content, v_round, true);
    select * into v_envelope
    from plan_collaboration.draft_envelopes envelope
    where envelope.plan_id = p_plan_id
    for update;
  end if;
  if exists(
    select 1 from public.study_plan_snapshots snapshot
    where snapshot.plan_id = p_plan_id
      and jsonb_typeof(snapshot.document->'items') is distinct from 'array'
  ) or exists(
    select 1
    from public.study_plan_snapshots snapshot
    cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
      then snapshot.document->'items' else '[]'::jsonb end) item
    where snapshot.plan_id = p_plan_id
      and (jsonb_typeof(item->'id') is distinct from 'string' or btrim(item->>'id') = ''
        or jsonb_typeof(item->'seqId') is distinct from 'number' or item->>'seqId' !~ '^[0-9]+$'
        or (item->>'kind') not in ('course', 'milestone') or item->>'kind' is null)
  ) then
    raise exception 'Historical item identity is invalid' using errcode = '22023';
  end if;
  if exists(
    with historical as (
      select item->>'id' as item_id, (item->>'seqId')::bigint as seq_id, item->>'kind' as kind
      from public.study_plan_snapshots snapshot
      cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
        then snapshot.document->'items' else '[]'::jsonb end) item
      where snapshot.plan_id = p_plan_id
    )
    select 1 from historical group by item_id having count(distinct (seq_id, kind)) > 1
  ) or exists(
    with historical as (
      select item->>'id' as item_id, (item->>'seqId')::bigint as seq_id
      from public.study_plan_snapshots snapshot
      cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
        then snapshot.document->'items' else '[]'::jsonb end) item
      where snapshot.plan_id = p_plan_id
    )
    select 1 from historical group by seq_id having count(distinct item_id) > 1
  ) then
    raise exception 'Historical item identity conflicts' using errcode = '22023';
  end if;
  if exists(
    with historical as (
      select distinct item->>'id' as item_id, (item->>'seqId')::bigint as seq_id, item->>'kind' as kind
      from public.study_plan_snapshots snapshot
      cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
        then snapshot.document->'items' else '[]'::jsonb end) item
      where snapshot.plan_id = p_plan_id
    )
    select 1 from historical
    join plan_collaboration.draft_item_identities identity
      on identity.plan_id = p_plan_id and identity.item_id = historical.item_id
    where identity.seq_id <> historical.seq_id or identity.kind <> historical.kind
  ) or exists(
    with historical as (
      select distinct item->>'id' as item_id, (item->>'seqId')::bigint as seq_id
      from public.study_plan_snapshots snapshot
      cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
        then snapshot.document->'items' else '[]'::jsonb end) item
      where snapshot.plan_id = p_plan_id
    )
    select 1 from historical
    join plan_collaboration.draft_item_identities identity
      on identity.plan_id = p_plan_id and identity.seq_id = historical.seq_id
    where identity.item_id <> historical.item_id
  ) then
    raise exception 'Historical item identity conflicts' using errcode = '22023';
  end if;
  insert into plan_collaboration.draft_item_identities(plan_id, item_id, seq_id, kind)
  select p_plan_id, historical.item_id, historical.seq_id, historical.kind
  from (
    select distinct item->>'id' as item_id, (item->>'seqId')::bigint as seq_id, item->>'kind' as kind
    from public.study_plan_snapshots snapshot
    cross join lateral jsonb_array_elements(case when jsonb_typeof(snapshot.document->'items') = 'array'
      then snapshot.document->'items' else '[]'::jsonb end) item
    where snapshot.plan_id = p_plan_id
  ) historical
  where not exists(
    select 1 from plan_collaboration.draft_item_identities identity
    where identity.plan_id = p_plan_id and identity.item_id = historical.item_id
  );
  select greatest(
    coalesce((select max(identity.seq_id) + 1
      from plan_collaboration.draft_item_identities identity
      where identity.plan_id = p_plan_id), 0),
    coalesce((select max((item ->> 'seqId')::bigint) + 1
      from public.study_plan_snapshots snapshot
      cross join lateral jsonb_array_elements(snapshot.document -> 'items') item
      where snapshot.plan_id = p_plan_id), 0),
    coalesce((v_envelope.content #>> '{document,nextSeqId}')::bigint, 0)
  ) into v_floor;
  if (p_content #>> '{document,nextSeqId}')::bigint < v_floor then
    raise exception 'Proposal sequence identity cannot decrease' using errcode = '22023';
  end if;
  insert into plan_collaboration.plan_proposals(
    plan_id, proposal_round, base_snapshot_id, source_snapshot_id, request_id,
    command_fingerprint, argument, created_by, status
  ) values(
    p_plan_id, v_round, v_base_snapshot_id, p_source_snapshot_id, p_request_id,
    v_fingerprint, btrim(p_argument), p_actor, 'active'
  );
  insert into plan_collaboration.draft_sources(id, plan_id, proposal_round, label, url, position)
  select coalesce((select historical.id from plan_collaboration.draft_sources historical
      where historical.plan_id = p_plan_id and historical.label = btrim(source.value->>'label')
        and historical.url = btrim(source.value->>'url')
      order by historical.proposal_round, historical.position, historical.id limit 1),
      (substring(digest.value from 1 for 8) || '-' || substring(digest.value from 9 for 4)
        || '-' || substring(digest.value from 13 for 4) || '-' || substring(digest.value from 17 for 4)
        || '-' || substring(digest.value from 21 for 12))::uuid),
    p_plan_id, v_round, btrim(source.value->>'label'), btrim(source.value->>'url'), (source.ordinality - 1)::integer
  from jsonb_array_elements(coalesce(v_source_document#>'{info,sources}', '[]'::jsonb)) with ordinality source
  cross join lateral (select pg_catalog.md5(p_plan_id::text || chr(31) || btrim(source.value->>'label')
    || chr(31) || btrim(source.value->>'url')) as value) digest;
  with base_receipt as (
    select receipt.* from plan_collaboration.draft_publication_receipts receipt
    where receipt.plan_id = p_plan_id and receipt.snapshot_id = v_base_snapshot_id
  ), base_keys as (
    select 'identity'::text as unit_key
    union all
    select 'source:' || source.id
    from base_receipt receipt
    join plan_collaboration.draft_sources source
      on source.plan_id = receipt.plan_id and source.proposal_round = receipt.proposal_round
    where exists(select 1 from jsonb_array_elements(coalesce(v_base_document#>'{info,sources}', '[]'::jsonb)) native_source
      where btrim(native_source->>'label') = source.label and btrim(native_source->>'url') = source.url)
    union all
    select 'item:' || (item->>'id')
    from jsonb_array_elements(coalesce(v_base_document->'items', '[]'::jsonb)) item
    union all
    select 'graduation:' || (graduation->>'id')
    from jsonb_array_elements(coalesce(v_base_document#>'{requirements,graduation}', '[]'::jsonb)) graduation
  )
  insert into plan_collaboration.draft_review_checks(
    plan_id, proposal_round, reviewer_id, unit_key, fingerprint, checked_at
  )
  select p_plan_id, v_round, checked.reviewer_id, checked.unit_key, checked.fingerprint, checked.checked_at
  from base_receipt receipt
  join plan_collaboration.draft_review_approvals approval
    on approval.plan_id = receipt.plan_id and approval.proposal_round = receipt.proposal_round
      and approval.review_revision = receipt.expected_review_revision
  join plan_collaboration.draft_review_checks checked
    on checked.plan_id = approval.plan_id and checked.proposal_round = approval.proposal_round
      and checked.reviewer_id = approval.reviewer_id
  join base_keys key on key.unit_key = checked.unit_key
  on conflict on constraint draft_review_checks_pkey do nothing;
  if v_had_envelope then
    insert into plan_collaboration.draft_document_versions(
      plan_id, version, content, review_invalidation_revision
    ) values(
      v_envelope.plan_id, v_envelope.version, v_envelope.content,
      v_envelope.review_invalidation_revision
    ) on conflict do nothing;
    update plan_collaboration.draft_envelopes envelope
    set content = p_content,
      proposal_round = v_round,
      version = envelope.version + 1,
      review_invalidation_revision = envelope.review_invalidation_revision + 1,
      discussion_revision = envelope.discussion_revision + 1,
      review_authorship_known = true,
      updated_at = now()
    where envelope.plan_id = p_plan_id;
  end if;
  insert into plan_collaboration.draft_coauthors(plan_id, proposal_round, subject_id, first_version)
  select envelope.plan_id, v_round, p_actor, envelope.version
  from plan_collaboration.draft_envelopes envelope
  where envelope.plan_id = p_plan_id;
  return query select v_round, v_base_snapshot_id, 'opened'::text;
end;
$$;

create or replace function plan_collaboration.read_draft(p_plan_id uuid)
returns table(plan_id uuid, university_name text, faculty_name text, offer_name text, campus text, modality text, plan_year integer, sources jsonb, content jsonb)
language sql stable security definer set search_path = '' as $$
  select identity.plan_id, offer.university_name, offer.faculty_name, offer.offer_name,
    offer.campus, offer.modality, identity.plan_year,
    coalesce((select jsonb_agg(jsonb_build_object('label', source.label, 'url', source.url) order by source.position)
      from plan_collaboration.draft_sources source
      where source.plan_id = identity.plan_id and source.proposal_round = envelope.proposal_round), '[]'::jsonb),
    envelope.content
  from plan_collaboration.plan_offer_identity identity
  join plan_collaboration.academic_offers offer on offer.id = identity.offer_id
  join plan_collaboration.draft_envelopes envelope on envelope.plan_id = identity.plan_id
  where identity.plan_id = p_plan_id and (identity.is_draft or exists(
    select 1 from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = identity.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  ));
$$;

create or replace function plan_collaboration.read_draft_editor(p_plan_id uuid)
returns table(plan_id uuid, content jsonb, version bigint, review_invalidation_revision bigint)
language sql security definer set search_path = '' as $$
  select envelope.plan_id, envelope.content, envelope.version, envelope.review_invalidation_revision
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = envelope.plan_id
  where envelope.plan_id = p_plan_id and (identity.is_draft or exists(
    select 1 from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  ));
$$;

create or replace function plan_collaboration.read_draft_revision(p_plan_id uuid, p_version bigint)
returns table(plan_id uuid, content jsonb, version bigint, review_invalidation_revision bigint)
language sql security definer set search_path = '' as $$
  select revision.plan_id, revision.content, revision.version, revision.review_invalidation_revision
  from plan_collaboration.draft_document_versions revision
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = revision.plan_id
  join plan_collaboration.draft_envelopes envelope on envelope.plan_id = revision.plan_id
  where revision.plan_id = p_plan_id and revision.version = p_version and (identity.is_draft or exists(
    select 1 from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = revision.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  ))
  union all
  select current.plan_id, current.content, current.version, current.review_invalidation_revision
  from plan_collaboration.read_draft_editor(p_plan_id) current
  where current.version = p_version and not exists(
    select 1 from plan_collaboration.draft_document_versions revision
    where revision.plan_id = p_plan_id and revision.version = p_version
  );
$$;

create or replace function plan_collaboration.lock_draft_review(p_plan_id uuid, p_actor uuid)
returns table(review_revision bigint, is_coauthor boolean, authorship_known boolean, checks jsonb, sources jsonb, approved_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_revision bigint; v_known boolean; v_round bigint;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  perform 1 from public.study_plans plan where plan.id = p_plan_id for key share;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select envelope.review_invalidation_revision, envelope.review_authorship_known, envelope.proposal_round
    into v_revision, v_known, v_round
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = envelope.plan_id
  where envelope.plan_id = p_plan_id and (identity.is_draft or exists(
    select 1 from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  )) for update of envelope;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  return query select v_revision,
    exists(select 1 from plan_collaboration.draft_coauthors coauthor
      where coauthor.plan_id = p_plan_id and coauthor.proposal_round = v_round and coauthor.subject_id = p_actor),
    v_known,
    coalesce((select jsonb_agg(jsonb_build_object('key', checked.unit_key, 'fingerprint', checked.fingerprint) order by checked.unit_key)
      from plan_collaboration.draft_review_checks checked
      where checked.plan_id = p_plan_id and checked.proposal_round = v_round and checked.reviewer_id = p_actor), '[]'::jsonb),
    coalesce((select jsonb_agg(jsonb_build_object('id', source.id, 'label', source.label, 'url', source.url) order by source.position)
      from plan_collaboration.draft_sources source
      where source.plan_id = p_plan_id and source.proposal_round = v_round), '[]'::jsonb),
    (select approval.review_revision from plan_collaboration.draft_review_approvals approval
      where approval.plan_id = p_plan_id and approval.proposal_round = v_round and approval.reviewer_id = p_actor
        and approval.review_revision = v_revision and not exists(select 1 from plan_collaboration.draft_coauthors coauthor
          where coauthor.plan_id = p_plan_id and coauthor.proposal_round = v_round and coauthor.subject_id = p_actor));
end;
$$;

create or replace function plan_collaboration.record_draft_check(
  p_plan_id uuid, p_expected_revision bigint, p_key text, p_fingerprint text, p_sources_opened boolean, p_actor uuid
) returns void language plpgsql security definer set search_path = '' as $$
declare v_review record; v_round bigint;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id, p_actor);
  select proposal_round into v_round from plan_collaboration.draft_envelopes where plan_id = p_plan_id;
  if v_review.is_coauthor then raise exception 'Coauthors cannot approve their draft' using errcode = '42501'; end if;
  if p_expected_revision is null or p_expected_revision <> v_review.review_revision then
    raise exception 'Review context changed' using errcode = '40001';
  end if;
  if p_sources_opened is distinct from true or jsonb_array_length(v_review.sources) = 0 then
    raise exception 'Accessible sources must be checked' using errcode = '22023';
  end if;
  if p_key is null or length(p_key) not between 1 and 300
    or p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid review check' using errcode = '22023';
  end if;
  insert into plan_collaboration.draft_review_checks(plan_id, proposal_round, reviewer_id, unit_key, fingerprint)
    values(p_plan_id, v_round, p_actor, p_key, p_fingerprint)
    on conflict(plan_id, proposal_round, reviewer_id, unit_key) do update
      set fingerprint = excluded.fingerprint, checked_at = now();
end;
$$;

create or replace function plan_collaboration.approve_draft_review(
  p_plan_id uuid, p_expected_revision bigint, p_units jsonb, p_actor uuid
) returns void language plpgsql security definer set search_path = '' as $$
declare v_review record; v_content jsonb; v_round bigint;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id, p_actor);
  select content, proposal_round into v_content, v_round
  from plan_collaboration.draft_envelopes where plan_id = p_plan_id;
  if v_review.is_coauthor then raise exception 'Coauthors cannot approve their draft' using errcode = '42501'; end if;
  if p_expected_revision is null or p_expected_revision <> v_review.review_revision then
    raise exception 'Review context changed' using errcode = '40001';
  end if;
  if not v_review.authorship_known then raise exception 'Historical authorship is unresolved' using errcode = '22023'; end if;
  if jsonb_array_length(v_review.sources) = 0
    or coalesce(jsonb_array_length(v_content#>'{document,items}'), 0) = 0
    or v_content->'unknownRequirements' is distinct from '[]'::jsonb
    or v_content->'unsupportedContent' is distinct from '[]'::jsonb then
    raise exception 'Draft is not ready for approval' using errcode = '22023';
  end if;
  if p_units is null or jsonb_typeof(p_units) is distinct from 'array' then raise exception 'Invalid review manifest' using errcode = '22023'; end if;
  if jsonb_array_length(p_units) not between 1 and 2500
    or exists(select 1 from jsonb_array_elements(p_units) unit
      where jsonb_typeof(unit->'key') is distinct from 'string'
        or jsonb_typeof(unit->'fingerprint') is distinct from 'string'
        or unit->>'fingerprint' !~ '^[a-f0-9]{64}$')
    or exists(select 1 from jsonb_array_elements(p_units) unit group by unit->>'key' having count(*) > 1) then
    raise exception 'Invalid review manifest' using errcode = '22023';
  end if;
  if exists(select 1 from (
      select 'identity'::text as key
      union all select 'source:' || (source->>'id') from jsonb_array_elements(v_review.sources) source
      union all select 'item:' || (item->>'id') from jsonb_array_elements(v_content#>'{document,items}') item
      union all select 'graduation:' || (graduation->>'id') from jsonb_array_elements(coalesce(v_content#>'{document,requirements,graduation}', '[]'::jsonb)) graduation
    ) required where not exists(select 1 from jsonb_array_elements(p_units) unit where unit->>'key' = required.key)
  ) or exists(select 1 from jsonb_array_elements(p_units) unit where not exists(
      select 1 from plan_collaboration.draft_review_checks checked
      where checked.plan_id = p_plan_id and checked.proposal_round = v_round and checked.reviewer_id = p_actor
        and checked.unit_key = unit->>'key' and checked.fingerprint = unit->>'fingerprint'
  )) then raise exception 'Review is incomplete' using errcode = '22023'; end if;
  insert into plan_collaboration.draft_review_approvals(plan_id, proposal_round, reviewer_id, review_revision)
    values(p_plan_id, v_round, p_actor, v_review.review_revision)
    on conflict(plan_id, proposal_round, reviewer_id) do update
      set review_revision = excluded.review_revision, approved_at = now();
end;
$$;

create or replace function plan_collaboration.add_draft_source(
  p_plan_id uuid, p_expected_revision bigint, p_label text, p_url text, p_actor uuid
) returns table(disposition text, review_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_review record; v_version bigint; v_revision bigint; v_round bigint;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id, p_actor);
  select proposal_round into v_round from plan_collaboration.draft_envelopes where plan_id = p_plan_id;
  if p_expected_revision is null or p_expected_revision <> v_review.review_revision then
    return query select 'version_conflict'::text, v_review.review_revision::bigint;
    return;
  end if;
  if p_label is null or length(btrim(p_label)) not between 1 and 2000
    or p_url is null or length(btrim(p_url)) > 2048
    or btrim(p_url) !~* '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$' then
    raise exception 'Invalid source' using errcode = '22023';
  end if;
  if exists(select 1 from plan_collaboration.draft_sources source
    where source.plan_id = p_plan_id and source.proposal_round = v_round
      and source.label = btrim(p_label) and source.url = btrim(p_url)) then
    return query select 'unchanged'::text, v_review.review_revision::bigint;
    return;
  end if;
  if jsonb_array_length(v_review.sources) >= 100 then raise exception 'Too many sources' using errcode = '22023'; end if;
  insert into plan_collaboration.draft_sources(id, plan_id, proposal_round, label, url, position)
    select gen_random_uuid(), p_plan_id, v_round, btrim(p_label), btrim(p_url), coalesce(max(source.position) + 1, 0)
    from plan_collaboration.draft_sources source where source.plan_id = p_plan_id and source.proposal_round = v_round;
  update plan_collaboration.draft_envelopes envelope
    set review_invalidation_revision = envelope.review_invalidation_revision + 1, updated_at = now()
    where envelope.plan_id = p_plan_id returning envelope.version, envelope.review_invalidation_revision into v_version, v_revision;
  insert into plan_collaboration.draft_coauthors(plan_id, proposal_round, subject_id, first_version)
    values(p_plan_id, v_round, p_actor, v_version) on conflict do nothing;
  return query select 'added'::text, v_revision;
end;
$$;

create or replace function plan_collaboration.save_draft_document(
  p_plan_id uuid, p_expected_version bigint, p_content jsonb, p_actor uuid
) returns table(plan_id uuid, disposition text, content jsonb, version bigint, review_invalidation_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare
  v_current plan_collaboration.draft_envelopes%rowtype;
  v_item jsonb;
  v_placement jsonb;
  v_identity plan_collaboration.draft_item_identities%rowtype;
  v_next bigint;
  v_old_next bigint;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if p_expected_version is null or p_expected_version < 0 then
    raise exception 'Invalid draft version' using errcode = '22023';
  end if;
  perform 1 from public.study_plans plan where plan.id = p_plan_id for key share;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select envelope.* into v_current
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = envelope.plan_id
  where envelope.plan_id = p_plan_id and (identity.is_draft or exists(
    select 1 from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  )) for update of envelope;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  if v_current.version <> p_expected_version then
    return query select p_plan_id, 'version_conflict'::text, v_current.content, v_current.version, v_current.review_invalidation_revision;
    return;
  end if;
  if p_content = v_current.content then
    return query select p_plan_id, 'unchanged'::text, v_current.content, v_current.version, v_current.review_invalidation_revision;
    return;
  end if;
  if p_content is null or jsonb_typeof(p_content) is distinct from 'object'
    or p_content->'schemaVersion' is distinct from '1'::jsonb
    or jsonb_typeof(p_content#>'{document,items}') is distinct from 'array'
    or jsonb_typeof(p_content#>'{document,sections}') is distinct from 'array'
    or jsonb_typeof(p_content->'unknownRequirements') is distinct from 'array'
    or jsonb_typeof(p_content->'unsupportedContent') is distinct from 'array'
    or jsonb_typeof(p_content#>'{document,nextSeqId}') is distinct from 'number'
    or p_content#>>'{document,nextSeqId}' !~ '^[0-9]+$'
    or pg_column_size(p_content) > 4194304 then
    raise exception 'Invalid draft document' using errcode = '22023';
  end if;
  v_next := (p_content#>>'{document,nextSeqId}')::bigint;
  v_old_next := coalesce((v_current.content#>>'{document,nextSeqId}')::bigint, 0);
  if v_next < v_old_next or v_next > 9007199254740991 then
    raise exception 'Draft sequence identity cannot decrease' using errcode = '22023';
  end if;
  if exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item group by item->>'id' having count(*) > 1)
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item group by item->>'seqId' having count(*) > 1)
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,sections}') section group by section->>'id' having count(*) > 1)
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item
      cross join lateral jsonb_array_elements(item->'placements') placement
      group by placement->>'id' having count(*) > 1) then
    raise exception 'Duplicate draft identity' using errcode = '22023';
  end if;
  for v_item in select item from jsonb_array_elements(p_content#>'{document,items}') item loop
    if jsonb_typeof(v_item->'id') is distinct from 'string' or btrim(v_item->>'id') = ''
      or jsonb_typeof(v_item->'seqId') is distinct from 'number' or v_item->>'seqId' !~ '^[0-9]+$'
      or (v_item->>'seqId')::bigint >= v_next or v_item->>'kind' not in ('course', 'milestone')
      or jsonb_typeof(v_item->'placements') is distinct from 'array' then
      raise exception 'Invalid draft item identity' using errcode = '22023';
    end if;
    select identity.* into v_identity from plan_collaboration.draft_item_identities identity
      where identity.plan_id = p_plan_id and identity.item_id = v_item->>'id';
    if found then
      if v_identity.seq_id <> (v_item->>'seqId')::bigint or v_identity.kind <> v_item->>'kind' then
        raise exception 'Draft item identity is immutable' using errcode = '22023';
      end if;
    elsif (v_item->>'seqId')::bigint < v_old_next then
      raise exception 'Retired draft sequence cannot be reused' using errcode = '22023';
    else
      insert into plan_collaboration.draft_item_identities(plan_id, item_id, seq_id, kind)
        values(p_plan_id, v_item->>'id', (v_item->>'seqId')::bigint, v_item->>'kind');
    end if;
    for v_placement in select placement from jsonb_array_elements(v_item->'placements') placement loop
      if jsonb_typeof(v_placement->'id') is distinct from 'string' or btrim(v_placement->>'id') = ''
        or not exists(select 1 from jsonb_array_elements(p_content#>'{document,sections}') section
          where section->>'id' = v_placement->>'sectionId') then
        raise exception 'Invalid draft placement' using errcode = '22023';
      end if;
      if exists(select 1 from plan_collaboration.draft_placement_identities identity
        where identity.plan_id = p_plan_id and identity.placement_id = v_placement->>'id'
          and identity.item_id <> v_item->>'id') then
        raise exception 'Draft placement owner is immutable' using errcode = '22023';
      end if;
      insert into plan_collaboration.draft_placement_identities(plan_id, placement_id, item_id)
        values(p_plan_id, v_placement->>'id', v_item->>'id') on conflict do nothing;
    end loop;
  end loop;
  insert into plan_collaboration.draft_document_versions(plan_id, version, content, review_invalidation_revision)
    values(p_plan_id, v_current.version, v_current.content, v_current.review_invalidation_revision) on conflict do nothing;
  update plan_collaboration.draft_envelopes envelope
    set content = p_content, version = envelope.version + 1,
      review_invalidation_revision = envelope.review_invalidation_revision + 1, updated_at = now()
    where envelope.plan_id = p_plan_id returning envelope.* into v_current;
  insert into plan_collaboration.draft_document_versions(plan_id, version, content, review_invalidation_revision)
    values(p_plan_id, v_current.version, v_current.content, v_current.review_invalidation_revision);
  insert into plan_collaboration.draft_coauthors(plan_id, proposal_round, subject_id, first_version)
    values(p_plan_id, v_current.proposal_round, p_actor, v_current.version) on conflict do nothing;
  return query select p_plan_id, 'saved'::text, v_current.content, v_current.version, v_current.review_invalidation_revision;
end;
$$;

create or replace function plan_collaboration.read_draft_discussions(p_plan_id uuid, p_actor uuid)
returns table(discussion_revision bigint, pending_count integer, entries jsonb)
language sql security definer set search_path = '' as $$
  select envelope.discussion_revision,
    (select count(*)::integer from plan_collaboration.draft_discussions discussion
      where discussion.plan_id = p_plan_id and discussion.proposal_round = envelope.proposal_round
        and discussion.status in ('pending', 'confirmed')),
    coalesce((select jsonb_agg(jsonb_build_object(
      'id', discussion.id, 'kind', discussion.kind, 'parentId', discussion.parent_id, 'unitKey', discussion.unit_key,
      'argument', discussion.argument, 'source', discussion.source_snapshot, 'locator', discussion.locator,
      'status', discussion.status, 'reviewRevision', discussion.review_revision, 'createdAt', discussion.created_at,
      'isOwn', discussion.author_id = p_actor, 'events', coalesce((select jsonb_agg(jsonb_build_object(
        'action', event.action, 'argument', event.argument, 'source', event.source_snapshot, 'locator', event.locator,
        'newEvidence', event.new_evidence, 'reviewRevision', event.review_revision, 'createdAt', event.created_at
      ) order by event.discussion_revision) from plan_collaboration.draft_discussion_events event
        where event.discussion_id = discussion.id), '[]'::jsonb)
    ) order by discussion.created_at, discussion.id) from plan_collaboration.draft_discussions discussion
      where discussion.plan_id = p_plan_id and discussion.proposal_round = envelope.proposal_round), '[]'::jsonb)
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = envelope.plan_id
  where envelope.plan_id = p_plan_id and (identity.is_draft or exists(
    select 1 from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  ));
$$;

create or replace function plan_collaboration.add_draft_discussion(
  p_plan_id uuid, p_review_revision bigint, p_discussion_revision bigint, p_request_id uuid,
  p_kind text, p_unit_key text, p_fingerprint text, p_argument text, p_source_id uuid, p_locator text,
  p_actor uuid, p_parent_id uuid default null
) returns table(discussion_id uuid, disposition text, discussion_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_review record; v_revision bigint; v_round bigint; v_existing plan_collaboration.draft_discussions%rowtype; v_source jsonb;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id, p_actor);
  select envelope.discussion_revision, envelope.proposal_round into v_revision, v_round
  from plan_collaboration.draft_envelopes envelope where envelope.plan_id = p_plan_id;
  if p_request_id is null or p_kind is null or p_kind not in ('comment', 'objection')
    or p_unit_key is null or length(p_unit_key) not between 1 and 300
    or p_argument is null or length(btrim(p_argument)) not between 1 and 8000
    or p_locator is null or length(btrim(p_locator)) > 1000 then
    raise exception 'Invalid discussion input' using errcode = '22023';
  end if;
  select discussion.* into v_existing from plan_collaboration.draft_discussions discussion where discussion.id = p_request_id;
  if found then
    if v_existing.proposal_round <> v_round then
      return query select null::uuid, 'version_conflict'::text, v_revision;
      return;
    end if;
    if v_existing.plan_id <> p_plan_id or v_existing.author_id <> p_actor
      or v_existing.kind <> p_kind or v_existing.unit_key <> p_unit_key
      or v_existing.review_revision is distinct from p_review_revision or v_existing.argument <> btrim(p_argument)
      or v_existing.source_id is distinct from p_source_id or v_existing.locator <> btrim(p_locator)
      or v_existing.parent_id is distinct from p_parent_id then
      raise exception 'Request identity was reused' using errcode = '22023';
    end if;
    return query select v_existing.id, 'existing'::text, v_revision;
    return;
  end if;
  if p_review_revision is null or p_review_revision <> v_review.review_revision
    or p_discussion_revision is null or p_discussion_revision <> v_revision then
    return query select null::uuid, 'version_conflict'::text, v_revision;
    return;
  end if;
  if p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid review context' using errcode = '22023';
  end if;
  if p_parent_id is not null and (p_kind <> 'comment' or not exists(
    select 1 from plan_collaboration.draft_discussions discussion
    where discussion.id = p_parent_id and discussion.plan_id = p_plan_id and discussion.proposal_round = v_round
      and discussion.kind = 'objection' and discussion.unit_key = p_unit_key
  )) then raise exception 'Invalid discussion parent' using errcode = '22023'; end if;
  select jsonb_build_object('id', source.id, 'label', source.label, 'url', source.url) into v_source
    from plan_collaboration.draft_sources source
    where source.plan_id = p_plan_id and source.proposal_round = v_round and source.id = p_source_id;
  if not found then raise exception 'A draft source is required' using errcode = '22023'; end if;
  if p_kind = 'objection' then
    select discussion.* into v_existing from plan_collaboration.draft_discussions discussion
      where discussion.plan_id = p_plan_id and discussion.proposal_round = v_round and discussion.kind = 'objection'
        and discussion.unit_key = p_unit_key
        and lower(regexp_replace(btrim(discussion.argument), '\s+', ' ', 'g')) = lower(regexp_replace(btrim(p_argument), '\s+', ' ', 'g'))
        and discussion.source_snapshot->>'url' = v_source->>'url' and discussion.locator = btrim(p_locator)
      order by discussion.created_at, discussion.id limit 1;
    if found then
      return query select v_existing.id, 'existing'::text, v_revision;
      return;
    end if;
  end if;
  insert into plan_collaboration.draft_discussions(
    id, plan_id, proposal_round, author_id, parent_id, kind, unit_key, fingerprint, argument,
    source_id, source_snapshot, locator, review_revision, status
  ) values(
    p_request_id, p_plan_id, v_round, p_actor, p_parent_id, p_kind, p_unit_key, p_fingerprint, btrim(p_argument),
    p_source_id, v_source, btrim(p_locator), p_review_revision,
    case when p_kind = 'objection' then 'pending' else 'comment' end
  );
  update plan_collaboration.draft_envelopes envelope set discussion_revision = envelope.discussion_revision + 1
    where envelope.plan_id = p_plan_id returning envelope.discussion_revision into v_revision;
  return query select p_request_id, 'created'::text, v_revision;
end;
$$;

create or replace function plan_collaboration.resolve_draft_objection(
  p_plan_id uuid, p_discussion_id uuid, p_review_revision bigint, p_discussion_revision bigint, p_request_id uuid,
  p_action text, p_argument text, p_source_id uuid, p_locator text, p_new_evidence text, p_fingerprint text, p_actor uuid
) returns table(status text, disposition text, discussion_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_review record; v_revision bigint; v_round bigint; v_thread plan_collaboration.draft_discussions%rowtype;
  v_event plan_collaboration.draft_discussion_events%rowtype; v_source jsonb; v_command jsonb; v_status text; v_evidence text;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id, p_actor);
  select envelope.discussion_revision, envelope.proposal_round into v_revision, v_round
  from plan_collaboration.draft_envelopes envelope where envelope.plan_id = p_plan_id;
  select discussion.* into v_thread from plan_collaboration.draft_discussions discussion
    where discussion.id = p_discussion_id and discussion.plan_id = p_plan_id
      and discussion.proposal_round = v_round and discussion.kind = 'objection';
  if not found then raise exception 'Objection unavailable' using errcode = '22023'; end if;
  if p_request_id is null or p_action is null or p_action not in ('confirm', 'dismiss', 'reopen', 'correct')
    or p_argument is null or length(btrim(p_argument)) not between 1 and 8000
    or p_locator is null or length(btrim(p_locator)) > 1000
    or p_new_evidence is null or length(btrim(p_new_evidence)) > 8000 then
    raise exception 'Invalid conclusion' using errcode = '22023';
  end if;
  v_command := jsonb_build_object('discussion', p_discussion_id, 'action', p_action, 'argument', btrim(p_argument),
    'source', p_source_id, 'locator', btrim(p_locator), 'evidence', btrim(p_new_evidence), 'reviewRevision', p_review_revision);
  select event.* into v_event from plan_collaboration.draft_discussion_events event where event.request_id = p_request_id;
  if found then
    if v_event.actor_id <> p_actor or v_event.command <> v_command then
      raise exception 'Request identity was reused' using errcode = '22023';
    end if;
    return query select v_thread.status, 'existing'::text, v_revision;
    return;
  end if;
  if p_review_revision is null or p_review_revision <> v_review.review_revision
    or p_discussion_revision is null or p_discussion_revision <> v_revision then
    return query select v_thread.status, 'version_conflict'::text, v_revision;
    return;
  end if;
  select jsonb_build_object('id', source.id, 'label', source.label, 'url', source.url) into v_source
    from plan_collaboration.draft_sources source
    where source.plan_id = p_plan_id and source.proposal_round = v_round and source.id = p_source_id;
  if not found then raise exception 'A draft source is required' using errcode = '22023'; end if;
  v_evidence := lower(regexp_replace(btrim(p_new_evidence), '\s+', ' ', 'g'));
  if p_action = 'reopen' then
    if v_thread.status not in ('dismissed', 'corrected') then raise exception 'Only resolved objections can reopen' using errcode = '22023'; end if;
    if v_evidence = '' or v_evidence = lower(regexp_replace(btrim(v_thread.argument), '\s+', ' ', 'g')) then
      raise exception 'New evidence is required' using errcode = '22023';
    end if;
    if exists(select 1 from plan_collaboration.draft_discussion_events event
      where event.discussion_id = p_discussion_id and event.action = 'reopen' and event.evidence_key = v_evidence) then
      return query select v_thread.status, 'existing'::text, v_revision;
      return;
    end if;
    v_status := 'pending';
  else
    if v_review.is_coauthor or v_thread.author_id = p_actor
      or exists(select 1 from plan_collaboration.draft_discussions discussion
        where discussion.parent_id = p_discussion_id and discussion.proposal_round = v_round and discussion.author_id = p_actor)
      or exists(select 1 from plan_collaboration.draft_discussion_events event
        where event.discussion_id = p_discussion_id and event.action = 'reopen' and event.actor_id = p_actor) then
      raise exception 'An independent participant must conclude' using errcode = '42501';
    end if;
    if p_action in ('confirm', 'dismiss') then
      if v_thread.status <> 'pending' then raise exception 'Objection is not pending' using errcode = '22023'; end if;
      if p_action = 'confirm' and (p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$') then
        raise exception 'Invalid review context' using errcode = '22023';
      end if;
      v_status := case when p_action = 'confirm' then 'confirmed' else 'dismissed' end;
      if p_action = 'confirm' then
        delete from plan_collaboration.draft_review_checks checked
          where checked.plan_id = p_plan_id and checked.proposal_round = v_round and checked.unit_key = v_thread.unit_key;
      end if;
    else
      if v_thread.status <> 'confirmed' or p_fingerprint is null or p_fingerprint = v_thread.confirmed_fingerprint
        or not exists(select 1 from plan_collaboration.draft_review_checks checked
          where checked.plan_id = p_plan_id and checked.proposal_round = v_round and checked.reviewer_id = p_actor
            and checked.unit_key = v_thread.unit_key and checked.fingerprint = p_fingerprint) then
        raise exception 'The affected content must be corrected and checked' using errcode = '22023';
      end if;
      v_status := 'corrected';
    end if;
  end if;
  insert into plan_collaboration.draft_discussion_events(
    request_id, discussion_id, actor_id, action, command, argument, source_snapshot, locator,
    new_evidence, evidence_key, review_revision, discussion_revision
  ) values(
    p_request_id, p_discussion_id, p_actor, p_action, v_command, btrim(p_argument), v_source, btrim(p_locator),
    btrim(p_new_evidence), v_evidence, p_review_revision, v_revision + 1
  );
  update plan_collaboration.draft_discussions discussion set status = v_status,
    confirmed_fingerprint = case when p_action = 'confirm' then p_fingerprint else discussion.confirmed_fingerprint end
    where discussion.id = p_discussion_id and discussion.proposal_round = v_round;
  update plan_collaboration.draft_envelopes envelope set discussion_revision = envelope.discussion_revision + 1
    where envelope.plan_id = p_plan_id returning envelope.discussion_revision into v_revision;
  return query select v_status, 'changed'::text, v_revision;
end;
$$;

alter function plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  rename to publish_initial_draft;

create or replace function plan_collaboration.read_published_draft_result(
  p_plan_id uuid,
  p_request_id uuid,
  p_expected_review_revision bigint,
  p_expected_discussion_revision bigint,
  p_actor uuid
) returns table(snapshot_id uuid, canonical_slug text)
language plpgsql security definer set search_path = '' as $$
declare v_plan record; v_receipt plan_collaboration.draft_publication_receipts%rowtype;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if p_plan_id is null or p_request_id is null
    or p_expected_review_revision is null or p_expected_review_revision < 0
    or p_expected_discussion_revision is null or p_expected_discussion_revision < 0 then
    raise exception 'Invalid publication command' using errcode = '22023';
  end if;
  select plan.published_snapshot_id, plan.canonical_slug into v_plan
  from public.study_plans plan where plan.id = p_plan_id for key share;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select * into v_receipt from plan_collaboration.draft_publication_receipts receipt
  where receipt.request_id = p_request_id;
  if found then
    if v_receipt.plan_id <> p_plan_id or v_receipt.actor_id <> p_actor
      or v_receipt.expected_review_revision <> p_expected_review_revision
      or v_receipt.expected_discussion_revision <> p_expected_discussion_revision then
      raise exception 'Request identity was reused' using errcode = '22023';
    end if;
    return query select v_receipt.snapshot_id, v_plan.canonical_slug;
    return;
  end if;
  if exists(select 1 from plan_collaboration.draft_envelopes envelope
    join plan_collaboration.plan_proposals proposal
      on proposal.plan_id = envelope.plan_id and proposal.proposal_round = envelope.proposal_round
        and proposal.status = 'active'
    where envelope.plan_id = p_plan_id) then
    return;
  end if;
  if v_plan.published_snapshot_id is not null and not exists(
    select 1 from plan_collaboration.plan_proposals proposal where proposal.plan_id = p_plan_id
  ) then
    return query select v_plan.published_snapshot_id, v_plan.canonical_slug;
  end if;
end;
$$;

create function plan_collaboration.publish_active_proposal(
  p_plan_id uuid,
  p_expected_review_revision bigint,
  p_expected_discussion_revision bigint,
  p_request_id uuid,
  p_expected_content jsonb,
  p_document jsonb,
  p_catalog jsonb,
  p_manifest jsonb,
  p_actor uuid
) returns table(
  snapshot_id uuid,
  canonical_slug text,
  disposition text,
  review_revision bigint,
  discussion_revision bigint,
  blockers text[]
)
language plpgsql security definer set search_path = '' as $$
declare
  v_receipt plan_collaboration.draft_publication_receipts%rowtype;
  v_plan record;
  v_draft record;
  v_proposal plan_collaboration.plan_proposals%rowtype;
  v_sources jsonb;
  v_review_sources jsonb;
  v_expected_structure jsonb;
  v_candidate_structure jsonb;
  v_expected_catalog jsonb;
  v_duration_years numeric;
  v_snapshot_id uuid;
  v_document_fingerprint text;
  v_command_fingerprint text;
  v_blockers text[] := array[]::text[];
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if p_request_id is null or p_expected_review_revision is null or p_expected_review_revision < 0
    or p_expected_discussion_revision is null or p_expected_discussion_revision < 0
    or p_expected_content is null or jsonb_typeof(p_expected_content) is distinct from 'object'
    or p_document is null or jsonb_typeof(p_document) is distinct from 'object'
    or p_catalog is null or jsonb_typeof(p_catalog) is distinct from 'object'
    or p_manifest is null or jsonb_typeof(p_manifest) is distinct from 'array' then
    raise exception 'Invalid publication command' using errcode = '22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'draft-publication-receipt:' || p_request_id::text, 0
  ));
  v_document_fingerprint := pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(p_document::text, 'UTF8')), 'hex');
  v_command_fingerprint := pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(jsonb_build_object(
    'reviewRevision', p_expected_review_revision,
    'discussionRevision', p_expected_discussion_revision,
    'content', p_expected_content,
    'document', p_document,
    'catalog', p_catalog,
    'manifest', p_manifest
  )::text, 'UTF8')), 'hex');
  select * into v_receipt from plan_collaboration.draft_publication_receipts receipt
  where receipt.request_id = p_request_id;
  if found then
    if v_receipt.plan_id <> p_plan_id or v_receipt.actor_id <> p_actor
      or v_receipt.command_fingerprint <> v_command_fingerprint then
      raise exception 'Request identity was reused' using errcode = '22023';
    end if;
    select plan.canonical_slug into v_plan from public.study_plans plan where plan.id = p_plan_id;
    return query select v_receipt.snapshot_id, v_plan.canonical_slug, 'existing'::text,
      v_receipt.expected_review_revision, v_receipt.expected_discussion_revision, array[]::text[];
    return;
  end if;
  select plan.id, plan.canonical_slug, plan.published_snapshot_id into v_plan
  from public.study_plans plan where plan.id = p_plan_id for update;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select envelope.content, envelope.review_invalidation_revision, envelope.discussion_revision,
    envelope.review_authorship_known, envelope.proposal_round, identity.is_draft, identity.plan_year,
    offer.university_name, offer.faculty_name, offer.offer_name, offer.campus, offer.modality
    into v_draft
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = envelope.plan_id
  join plan_collaboration.academic_offers offer on offer.id = identity.offer_id
  where envelope.plan_id = p_plan_id
  for update of envelope, identity;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select * into v_proposal from plan_collaboration.plan_proposals proposal
  where proposal.plan_id = p_plan_id and proposal.proposal_round = v_draft.proposal_round
    and proposal.status = 'active'
  for update;
  if not found or v_draft.is_draft then raise exception 'Active proposal unavailable' using errcode = '22023'; end if;
  if v_plan.published_snapshot_id is distinct from v_proposal.base_snapshot_id then
    return query select null::uuid, v_plan.canonical_slug, 'base_obsolete'::text,
      v_draft.review_invalidation_revision, v_draft.discussion_revision, array[]::text[];
    return;
  end if;
  if v_draft.content <> p_expected_content
    or v_draft.review_invalidation_revision <> p_expected_review_revision
    or v_draft.discussion_revision <> p_expected_discussion_revision then
    return query select null::uuid, v_plan.canonical_slug, 'version_conflict'::text,
      v_draft.review_invalidation_revision, v_draft.discussion_revision, array[]::text[];
    return;
  end if;
  select
    coalesce(jsonb_agg(jsonb_build_object('id', source.ordinal, 'label', source.label, 'url', source.url) order by source.position), '[]'::jsonb),
    coalesce(jsonb_agg(jsonb_build_object('id', source.id, 'label', source.label, 'url', source.url) order by source.position), '[]'::jsonb)
    into v_sources, v_review_sources
  from (
    select source.*, row_number() over(order by source.position)::integer as ordinal
    from plan_collaboration.draft_sources source
    where source.plan_id = p_plan_id and source.proposal_round = v_draft.proposal_round
  ) source;
  if not v_draft.review_authorship_known then v_blockers := array_append(v_blockers, 'authorship_unknown'); end if;
  if jsonb_array_length(v_sources) = 0
    or coalesce(jsonb_array_length(v_draft.content#>'{document,items}'), 0) = 0
    or v_draft.content->'unknownRequirements' is distinct from '[]'::jsonb
    or v_draft.content->'unsupportedContent' is distinct from '[]'::jsonb then
    v_blockers := array_append(v_blockers, 'content_incomplete');
  end if;
  if exists(select 1 from plan_collaboration.draft_discussions discussion
    where discussion.plan_id = p_plan_id and discussion.proposal_round = v_draft.proposal_round
      and discussion.status in ('pending', 'confirmed')) then
    v_blockers := array_append(v_blockers, 'objections_pending');
  end if;
  if jsonb_typeof(v_draft.content#>'{document,sections}') is distinct from 'array'
    or jsonb_typeof(v_draft.content#>'{document,items}') is distinct from 'array'
    or jsonb_typeof(coalesce(v_draft.content#>'{document,requirements,graduation}', '[]'::jsonb)) is distinct from 'array'
    or jsonb_typeof(p_document->'info') is distinct from 'object'
    or jsonb_typeof(p_document->'sections') is distinct from 'array'
    or jsonb_typeof(p_document->'items') is distinct from 'array'
    or exists(select 1 from jsonb_array_elements(v_draft.content#>'{document,items}') item
      where jsonb_typeof(item->'placements') is distinct from 'array')
    or jsonb_array_length(p_manifest) not between 1 and 2500
    or exists(select 1 from jsonb_array_elements(p_manifest) unit
      where jsonb_typeof(unit->'key') is distinct from 'string'
        or jsonb_typeof(unit->'fingerprint') is distinct from 'string'
        or unit->>'fingerprint' !~ '^[a-f0-9]{64}$')
    or exists(select 1 from jsonb_array_elements(p_manifest) unit group by unit->>'key' having count(*) > 1) then
    v_blockers := array_append(v_blockers, 'content_incomplete');
  else
    select jsonb_build_object(
      'sections', v_draft.content#>'{document,sections}',
      'items', coalesce((select jsonb_agg(
        jsonb_set(item, '{placements}', coalesce((select jsonb_agg(placement - 'id' order by ordinal)
          from jsonb_array_elements(item->'placements') with ordinality placements(placement, ordinal)), '[]'::jsonb))
        order by item_ordinal)
        from jsonb_array_elements(v_draft.content#>'{document,items}') with ordinality items(item, item_ordinal)), '[]'::jsonb),
      'requirements', case when coalesce(jsonb_array_length(v_draft.content#>'{document,requirements,graduation}'), 0) > 0
        then jsonb_build_object('graduation', v_draft.content#>'{document,requirements,graduation}') else '{}'::jsonb end
    ) into v_expected_structure;
    v_candidate_structure := jsonb_build_object(
      'sections', p_document->'sections', 'items', p_document->'items',
      'requirements', coalesce(p_document->'requirements', '{}'::jsonb)
    );
    select greatest(0, coalesce(max(case
      when jsonb_typeof(section->'year') = 'number' then (section->>'year')::numeric
      when section->>'id' ~ '^year-[0-9]+$' then substring(section->>'id' from '^year-([0-9]+)$')::numeric
      else 0 end), 0)) into v_duration_years
    from jsonb_array_elements(p_document->'sections') section;
    v_expected_catalog := jsonb_strip_nulls(jsonb_build_object(
      'degreeName', p_document#>'{info,degreeName}', 'degreeSlug', p_document#>'{info,degreeSlug}',
      'canonicalSlug', p_document#>'{info,canonicalSlug}', 'universityName', p_document#>'{info,universityName}',
      'universitySlug', p_document#>'{info,universitySlug}', 'collegeName', p_document#>'{info,collegeName}',
      'collegeSlug', p_document#>'{info,collegeSlug}', 'campus', p_document#>'{info,campus}',
      'modality', p_document#>'{info,modality}', 'durationYears', to_jsonb(v_duration_years),
      'year', p_document#>'{info,year}', 'sources', coalesce(p_document#>'{info,sources}', '[]'::jsonb),
      'notes', p_document#>'{info,notes}'
    ));
    if (p_document - 'info' - 'sections' - 'items' - 'requirements') <> '{}'::jsonb
      or v_candidate_structure <> v_expected_structure
      or jsonb_typeof(p_catalog->'durationYears') is distinct from 'number'
      or p_catalog <> v_expected_catalog
      or p_document#>>'{info,canonicalSlug}' is distinct from v_plan.canonical_slug
      or p_document#>>'{info,universityName}' is distinct from v_draft.university_name
      or p_document#>>'{info,collegeName}' is distinct from v_draft.faculty_name
      or p_document#>>'{info,degreeName}' is distinct from v_draft.offer_name
      or p_document#>>'{info,campus}' is distinct from v_draft.campus
      or p_document#>>'{info,modality}' is distinct from v_draft.modality
      or p_document#>'{info,sources}' is distinct from v_sources
      or (v_draft.plan_year is null and p_document#>>'{info,year}' is not null)
      or (v_draft.plan_year is not null and p_document#>>'{info,year}' is distinct from v_draft.plan_year::text) then
      v_blockers := array_append(v_blockers, 'content_incomplete');
    end if;
  end if;
  if jsonb_typeof(v_draft.content#>'{document,items}') = 'array'
    and jsonb_typeof(coalesce(v_draft.content#>'{document,requirements,graduation}', '[]'::jsonb)) = 'array' then
    if exists(select 1 from (
      select 'identity'::text as key
      union all select 'source:' || (source->>'id') from jsonb_array_elements(v_review_sources) source
      union all select 'item:' || (item->>'id') from jsonb_array_elements(v_draft.content#>'{document,items}') item
      union all select 'graduation:' || (graduation->>'id')
        from jsonb_array_elements(v_draft.content#>'{document,requirements,graduation}') graduation
    ) required where not exists(select 1 from jsonb_array_elements(p_manifest) unit where unit->>'key' = required.key)) then
      v_blockers := array_append(v_blockers, 'reviews_missing');
    end if;
  end if;
  perform 1 from plan_collaboration.draft_review_approvals approval
  join plan_collaboration.student_permissions permission on permission.subject_id = approval.reviewer_id
  where approval.plan_id = p_plan_id and approval.proposal_round = v_draft.proposal_round
    and approval.review_revision = v_draft.review_invalidation_revision
  for share of permission;
  if (select count(*) from plan_collaboration.draft_review_approvals approval
      join plan_collaboration.student_permissions permission
        on permission.subject_id = approval.reviewer_id and permission.contributions_enabled
      where approval.plan_id = p_plan_id and approval.proposal_round = v_draft.proposal_round
        and approval.review_revision = v_draft.review_invalidation_revision
        and not exists(select 1 from plan_collaboration.draft_coauthors coauthor
          where coauthor.plan_id = p_plan_id and coauthor.proposal_round = v_draft.proposal_round
            and coauthor.subject_id = approval.reviewer_id)
        and not exists(select 1 from jsonb_array_elements(p_manifest) unit where not exists(
          select 1 from plan_collaboration.draft_review_checks checked
          where checked.plan_id = p_plan_id and checked.proposal_round = v_draft.proposal_round
            and checked.reviewer_id = approval.reviewer_id and checked.unit_key = unit->>'key'
            and checked.fingerprint = unit->>'fingerprint'
        ))) < 2 then
    v_blockers := array_append(v_blockers, 'reviews_missing');
  end if;
  if cardinality(v_blockers) > 0 then
    v_blockers := array(select distinct blocker from unnest(v_blockers) blocker order by blocker);
    return query select null::uuid, v_plan.canonical_slug, 'blocked'::text,
      v_draft.review_invalidation_revision, v_draft.discussion_revision, v_blockers;
    return;
  end if;
  v_snapshot_id := gen_random_uuid();
  insert into public.study_plan_snapshots(id, plan_id, document, catalog)
    values(v_snapshot_id, p_plan_id, p_document, p_catalog);
  update public.study_plans plan
    set published_snapshot_id = v_snapshot_id
    where plan.id = p_plan_id;
  update plan_collaboration.plan_proposals proposal
    set status = 'closed', closed_at = now()
    where proposal.plan_id = p_plan_id and proposal.proposal_round = v_draft.proposal_round;
  insert into plan_collaboration.draft_publication_receipts(
    request_id, plan_id, actor_id, expected_review_revision, expected_discussion_revision,
    command_fingerprint, document_fingerprint, snapshot_id, proposal_round
  ) values(
    p_request_id, p_plan_id, p_actor, p_expected_review_revision, p_expected_discussion_revision,
    v_command_fingerprint, v_document_fingerprint, v_snapshot_id, v_draft.proposal_round
  );
  return query select v_snapshot_id, v_plan.canonical_slug, 'published'::text,
    v_draft.review_invalidation_revision, v_draft.discussion_revision, array[]::text[];
end;
$$;

create function plan_collaboration.publish_draft(
  p_plan_id uuid,
  p_expected_review_revision bigint,
  p_expected_discussion_revision bigint,
  p_request_id uuid,
  p_expected_content jsonb,
  p_document jsonb,
  p_catalog jsonb,
  p_manifest jsonb,
  p_actor uuid
) returns table(
  snapshot_id uuid,
  canonical_slug text,
  disposition text,
  review_revision bigint,
  discussion_revision bigint,
  blockers text[]
)
language plpgsql security definer set search_path = '' as $$
declare v_round bigint; v_proposal plan_collaboration.plan_proposals%rowtype;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  perform 1 from public.study_plans plan where plan.id = p_plan_id for update;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select envelope.proposal_round into v_round
  from plan_collaboration.draft_envelopes envelope where envelope.plan_id = p_plan_id for update;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select * into v_proposal from plan_collaboration.plan_proposals proposal
  where proposal.plan_id = p_plan_id and proposal.proposal_round = v_round and proposal.status = 'active'
  for update;
  if found or exists(select 1 from plan_collaboration.draft_publication_receipts receipt
    where receipt.request_id = p_request_id) then
    return query select * from plan_collaboration.publish_active_proposal(
      p_plan_id, p_expected_review_revision, p_expected_discussion_revision, p_request_id,
      p_expected_content, p_document, p_catalog, p_manifest, p_actor
    );
    return;
  end if;
  if v_round > 0 then
    return query select null::uuid, plan.canonical_slug, 'version_conflict'::text,
      envelope.review_invalidation_revision, envelope.discussion_revision, array[]::text[]
    from public.study_plans plan
    join plan_collaboration.draft_envelopes envelope on envelope.plan_id = plan.id
    where plan.id = p_plan_id;
    return;
  end if;
  return query select * from plan_collaboration.publish_initial_draft(
    p_plan_id, p_expected_review_revision, p_expected_discussion_revision, p_request_id,
    p_expected_content, p_document, p_catalog, p_manifest, p_actor
  );
end;
$$;

create function plan_collaboration.read_plan_history(p_plan_id uuid)
returns table(snapshot_id uuid, published_at timestamptz, is_current boolean, argument text)
language sql stable security definer set search_path = '' as $$
  select snapshot.id, receipt.published_at,
    snapshot.id = plan.published_snapshot_id, proposal.argument
  from public.study_plans plan
  join public.study_plan_snapshots snapshot on snapshot.plan_id = plan.id
  left join plan_collaboration.draft_publication_receipts receipt
    on receipt.plan_id = plan.id and receipt.snapshot_id = snapshot.id
  left join plan_collaboration.plan_proposals proposal
    on proposal.plan_id = receipt.plan_id and proposal.proposal_round = receipt.proposal_round
  where plan.id = p_plan_id and plan.published_snapshot_id is not null
    and (snapshot.id = plan.published_snapshot_id or receipt.snapshot_id is not null
      or exists(select 1 from plan_collaboration.plan_proposals initial
        where initial.plan_id = plan.id and initial.base_snapshot_id = snapshot.id))
  order by receipt.published_at desc nulls last, snapshot.id;
$$;
revoke all on function plan_collaboration.read_plan_history(uuid)
  from public, anon, authenticated, service_role, plande_collaboration;
grant execute on function plan_collaboration.read_plan_history(uuid)
  to anon, authenticated, plande_collaboration;
alter function plan_collaboration.read_plan_history(uuid) owner to plande_collaboration_writer;

revoke all on function plan_collaboration.read_active_proposal(uuid,uuid),
  plan_collaboration.lock_proposal_round(uuid,bigint,uuid),
  plan_collaboration.open_plan_proposal(uuid,uuid,uuid,uuid,text,jsonb,uuid),
  plan_collaboration.read_proposal_source(uuid,uuid),
  plan_collaboration.append_progress_item_order(uuid,jsonb),
  plan_collaboration.append_progress_item_order_on_publication()
  from public, anon, authenticated, service_role, plande_collaboration;
revoke all on function plan_collaboration.read_draft(uuid) from public, anon, authenticated, service_role;
revoke all on function plan_collaboration.read_published_draft_result(uuid,uuid,bigint,bigint,uuid),
  plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid),
  plan_collaboration.publish_initial_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid),
  plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  from public, anon, authenticated, service_role;
grant execute on function plan_collaboration.read_draft(uuid)
  to anon, authenticated, plande_collaboration, plande_collaboration_writer;
grant execute on function plan_collaboration.read_published_draft_result(uuid,uuid,bigint,bigint,uuid)
  to plande_collaboration;
grant execute on function plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  to plande_collaboration, plande_collaboration_writer;
grant execute on function plan_collaboration.publish_initial_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid),
  plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  to plande_collaboration_writer;
grant execute on function plan_collaboration.read_active_proposal(uuid,uuid),
  plan_collaboration.lock_proposal_round(uuid,bigint,uuid),
  plan_collaboration.read_proposal_source(uuid,uuid)
  to plande_collaboration, plande_collaboration_writer;
grant execute on function plan_collaboration.append_progress_item_order(uuid,jsonb)
  to plande_collaboration_writer;
alter function plan_collaboration.read_active_proposal(uuid,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.lock_proposal_round(uuid,bigint,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.open_plan_proposal(uuid,uuid,uuid,uuid,text,jsonb,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.read_proposal_source(uuid,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.append_progress_item_order(uuid,jsonb) owner to plande_collaboration_writer;
alter function plan_collaboration.append_progress_item_order_on_publication() owner to plande_collaboration_writer;
alter function plan_collaboration.read_published_draft_result(uuid,uuid,bigint,bigint,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.publish_initial_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid) owner to plande_collaboration_writer;

revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
