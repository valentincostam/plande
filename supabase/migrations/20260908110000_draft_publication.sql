grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;

create table plan_collaboration.draft_publication_receipts (
  request_id uuid primary key,
  plan_id uuid not null references public.study_plans(id) on delete restrict,
  actor_id uuid not null references auth.users(id) on delete restrict,
  expected_review_revision bigint not null check(expected_review_revision >= 0),
  expected_discussion_revision bigint not null check(expected_discussion_revision >= 0),
  command_fingerprint text not null check(command_fingerprint ~ '^[a-f0-9]{64}$'),
  document_fingerprint text not null check(document_fingerprint ~ '^[a-f0-9]{64}$'),
  snapshot_id uuid not null references public.study_plan_snapshots(id) on delete restrict,
  published_at timestamptz not null default now(),
  unique(plan_id, snapshot_id)
);

alter table plan_collaboration.draft_publication_receipts enable row level security;
alter table plan_collaboration.draft_publication_receipts force row level security;
create policy "writer manages publication receipts" on plan_collaboration.draft_publication_receipts
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.draft_publication_receipts from public, anon, authenticated, service_role, plande_collaboration;
grant select, insert on plan_collaboration.draft_publication_receipts to plande_collaboration_writer;

grant insert on public.study_plan_snapshots to plande_collaboration_writer;
grant update(published_snapshot_id, canonical_slug) on public.study_plans to plande_collaboration_writer;
create policy "collaboration publishes immutable snapshots" on public.study_plan_snapshots
  for insert to plande_collaboration_writer with check(true);
create policy "collaboration publishes plan pointers" on public.study_plans
  for update to plande_collaboration_writer using(true) with check(true);

create function plan_collaboration.read_publication_status(p_plan_id uuid)
returns table(published boolean, canonical_slug text, snapshot_id uuid, published_at timestamptz)
language sql security definer set search_path = '' as $$
  select p.published_snapshot_id is not null,
    p.canonical_slug,
    p.published_snapshot_id,
    receipt.published_at
  from public.study_plans p
  left join plan_collaboration.draft_publication_receipts receipt
    on receipt.plan_id=p.id and receipt.snapshot_id=p.published_snapshot_id
  where p.id=p_plan_id;
$$;

create function plan_collaboration.read_published_draft_result(
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
    raise exception 'Invalid publication command' using errcode='22023';
  end if;
  select p.published_snapshot_id,p.canonical_slug into v_plan
  from public.study_plans p where p.id=p_plan_id for key share;
  if not found then raise exception 'Draft unavailable' using errcode='22023'; end if;
  select * into v_receipt from plan_collaboration.draft_publication_receipts receipt
    where receipt.request_id=p_request_id;
  if found and (v_receipt.plan_id<>p_plan_id or v_receipt.actor_id<>p_actor
    or v_receipt.expected_review_revision<>p_expected_review_revision
    or v_receipt.expected_discussion_revision<>p_expected_discussion_revision) then
    raise exception 'Request identity was reused' using errcode='22023';
  end if;
  if v_plan.published_snapshot_id is not null then
    return query select v_plan.published_snapshot_id,v_plan.canonical_slug;
  end if;
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
declare
  v_receipt plan_collaboration.draft_publication_receipts%rowtype;
  v_plan record;
  v_draft record;
  v_sources jsonb;
  v_review_sources jsonb;
  v_expected_structure jsonb;
  v_candidate_structure jsonb;
  v_expected_catalog jsonb;
  v_duration_years numeric;
  v_snapshot_id uuid;
  v_slug text;
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
    raise exception 'Invalid publication command' using errcode='22023';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'draft-publication-receipt:' || p_request_id::text, 0
  ));

  v_document_fingerprint := pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(p_document::text, 'UTF8')), 'hex');
  v_command_fingerprint := pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(jsonb_build_object(
    'reviewRevision',p_expected_review_revision,
    'discussionRevision',p_expected_discussion_revision,
    'content',p_expected_content,
    'document',p_document,
    'catalog',p_catalog,
    'manifest',p_manifest
  )::text, 'UTF8')), 'hex');

  select * into v_receipt
  from plan_collaboration.draft_publication_receipts receipt
  where receipt.request_id=p_request_id;
  if found then
    if v_receipt.plan_id<>p_plan_id or v_receipt.actor_id<>p_actor
      or v_receipt.command_fingerprint<>v_command_fingerprint then
      raise exception 'Request identity was reused' using errcode='22023';
    end if;
    select p.canonical_slug into v_slug from public.study_plans p where p.id=p_plan_id;
    return query select v_receipt.snapshot_id,v_slug,'existing'::text,
      v_receipt.expected_review_revision,v_receipt.expected_discussion_revision,array[]::text[];
    return;
  end if;

  select p.id,p.canonical_slug,p.published_snapshot_id into v_plan
  from public.study_plans p where p.id=p_plan_id for update;
  if not found then raise exception 'Draft unavailable' using errcode='22023'; end if;
  if v_plan.published_snapshot_id is not null then
    return query select v_plan.published_snapshot_id,v_plan.canonical_slug,'existing'::text,
      p_expected_review_revision,p_expected_discussion_revision,array[]::text[];
    return;
  end if;

  select e.content,e.review_invalidation_revision,e.discussion_revision,e.review_authorship_known,
    i.is_draft,i.plan_year,o.university_name,o.faculty_name,o.offer_name,o.campus,o.modality
    into v_draft
  from plan_collaboration.draft_envelopes e
  join plan_collaboration.plan_offer_identity i on i.plan_id=e.plan_id
  join plan_collaboration.academic_offers o on o.id=i.offer_id
  where e.plan_id=p_plan_id
  for update of e,i;
  if not found then raise exception 'Draft unavailable' using errcode='22023'; end if;
  if not v_draft.is_draft then
    return query select null::uuid,v_plan.canonical_slug,'blocked'::text,
      v_draft.review_invalidation_revision,v_draft.discussion_revision,array['content_incomplete']::text[];
    return;
  end if;
  if v_draft.content<>p_expected_content
    or v_draft.review_invalidation_revision<>p_expected_review_revision
    or v_draft.discussion_revision<>p_expected_discussion_revision then
    return query select null::uuid,v_plan.canonical_slug,'version_conflict'::text,
      v_draft.review_invalidation_revision,v_draft.discussion_revision,array[]::text[];
    return;
  end if;

  select
    coalesce(jsonb_agg(jsonb_build_object('id',s.ordinal,'label',s.label,'url',s.url) order by s.position),'[]'::jsonb),
    coalesce(jsonb_agg(jsonb_build_object('id',s.id,'label',s.label,'url',s.url) order by s.position),'[]'::jsonb)
    into v_sources,v_review_sources
  from (
    select s.*,row_number() over(order by s.position)::integer as ordinal
    from plan_collaboration.draft_sources s where s.plan_id=p_plan_id
  ) s;

  if not v_draft.review_authorship_known then
    v_blockers := array_append(v_blockers,'authorship_unknown');
  end if;
  if jsonb_array_length(v_sources)=0
    or coalesce(jsonb_array_length(v_draft.content#>'{document,items}'),0)=0
    or v_draft.content->'unknownRequirements' is distinct from '[]'::jsonb
    or v_draft.content->'unsupportedContent' is distinct from '[]'::jsonb then
    v_blockers := array_append(v_blockers,'content_incomplete');
  end if;
  if exists(select 1 from plan_collaboration.draft_discussions d
    where d.plan_id=p_plan_id and d.status in ('pending','confirmed')) then
    v_blockers := array_append(v_blockers,'objections_pending');
  end if;

  if jsonb_typeof(v_draft.content#>'{document,sections}') is distinct from 'array'
    or jsonb_typeof(v_draft.content#>'{document,items}') is distinct from 'array'
    or jsonb_typeof(coalesce(v_draft.content#>'{document,requirements,graduation}','[]'::jsonb)) is distinct from 'array'
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
    or exists(select 1 from jsonb_array_elements(p_manifest) unit group by unit->>'key' having count(*)>1) then
    v_blockers := array_append(v_blockers,'content_incomplete');
  else
    select jsonb_build_object(
      'sections',v_draft.content#>'{document,sections}',
      'items',coalesce((select jsonb_agg(
        jsonb_set(item,'{placements}',coalesce((select jsonb_agg(placement-'id' order by ordinal)
          from jsonb_array_elements(item->'placements') with ordinality placements(placement,ordinal)),'[]'::jsonb))
        order by item_ordinal)
        from jsonb_array_elements(v_draft.content#>'{document,items}') with ordinality items(item,item_ordinal)),'[]'::jsonb),
      'requirements',case when coalesce(jsonb_array_length(v_draft.content#>'{document,requirements,graduation}'),0)>0
        then jsonb_build_object('graduation',v_draft.content#>'{document,requirements,graduation}') else '{}'::jsonb end
    ) into v_expected_structure;
    v_candidate_structure := jsonb_build_object(
      'sections',p_document->'sections',
      'items',p_document->'items',
      'requirements',coalesce(p_document->'requirements','{}'::jsonb)
    );
    select greatest(0,coalesce(max(case
      when jsonb_typeof(section->'year')='number' then (section->>'year')::numeric
      when section->>'id' ~ '^year-[0-9]+$' then substring(section->>'id' from '^year-([0-9]+)$')::numeric
      else 0
    end),0))
      into v_duration_years
    from jsonb_array_elements(p_document->'sections') section;
    v_expected_catalog := jsonb_strip_nulls(jsonb_build_object(
      'degreeName',p_document#>'{info,degreeName}',
      'degreeSlug',p_document#>'{info,degreeSlug}',
      'canonicalSlug',p_document#>'{info,canonicalSlug}',
      'universityName',p_document#>'{info,universityName}',
      'universitySlug',p_document#>'{info,universitySlug}',
      'collegeName',p_document#>'{info,collegeName}',
      'collegeSlug',p_document#>'{info,collegeSlug}',
      'campus',p_document#>'{info,campus}',
      'modality',p_document#>'{info,modality}',
      'durationYears',to_jsonb(v_duration_years),
      'year',p_document#>'{info,year}',
      'sources',coalesce(p_document#>'{info,sources}','[]'::jsonb),
      'notes',p_document#>'{info,notes}'
    ));
    v_slug := 'plan-' || p_plan_id::text;
    if (p_document-'info'-'sections'-'items'-'requirements')<>'{}'::jsonb
      or v_candidate_structure<>v_expected_structure
      or jsonb_typeof(p_catalog->'durationYears') is distinct from 'number'
      or p_catalog<>v_expected_catalog
      or p_document#>>'{info,canonicalSlug}' is distinct from v_slug
      or p_document#>>'{info,universityName}' is distinct from v_draft.university_name
      or p_document#>>'{info,collegeName}' is distinct from v_draft.faculty_name
      or p_document#>>'{info,degreeName}' is distinct from v_draft.offer_name
      or p_document#>>'{info,campus}' is distinct from v_draft.campus
      or p_document#>>'{info,modality}' is distinct from v_draft.modality
      or p_document#>'{info,sources}' is distinct from v_sources
      or (v_draft.plan_year is null and p_document#>>'{info,year}' is not null)
      or (v_draft.plan_year is not null and p_document#>>'{info,year}' is distinct from v_draft.plan_year::text) then
      v_blockers := array_append(v_blockers,'content_incomplete');
    end if;
  end if;

  if jsonb_typeof(v_draft.content#>'{document,items}')='array'
    and jsonb_typeof(coalesce(v_draft.content#>'{document,requirements,graduation}','[]'::jsonb))='array' then
    if exists (
      select 1 from (
        select 'identity'::text as key
        union all select 'source:' || (source->>'id') from jsonb_array_elements(v_review_sources) source
        union all select 'item:' || (item->>'id') from jsonb_array_elements(v_draft.content#>'{document,items}') item
        union all select 'graduation:' || (graduation->>'id')
          from jsonb_array_elements(v_draft.content#>'{document,requirements,graduation}') graduation
      ) required where not exists(
        select 1 from jsonb_array_elements(p_manifest) unit where unit->>'key'=required.key
      )
    ) then
      v_blockers := array_append(v_blockers,'reviews_missing');
    end if;
  end if;

  perform 1
  from plan_collaboration.draft_review_approvals approval
  join plan_collaboration.student_permissions permission on permission.subject_id=approval.reviewer_id
  where approval.plan_id=p_plan_id and approval.review_revision=v_draft.review_invalidation_revision
  for share of permission;

  if (select count(*) from plan_collaboration.draft_review_approvals approval
      join plan_collaboration.student_permissions permission
        on permission.subject_id=approval.reviewer_id and permission.contributions_enabled
      where approval.plan_id=p_plan_id and approval.review_revision=v_draft.review_invalidation_revision
        and not exists(select 1 from plan_collaboration.draft_coauthors coauthor
          where coauthor.plan_id=p_plan_id and coauthor.subject_id=approval.reviewer_id)
        and not exists(select 1 from jsonb_array_elements(p_manifest) unit where not exists(
          select 1 from plan_collaboration.draft_review_checks checked
          where checked.plan_id=p_plan_id and checked.reviewer_id=approval.reviewer_id
            and checked.unit_key=unit->>'key' and checked.fingerprint=unit->>'fingerprint'
        ))) < 2 then
    v_blockers := array_append(v_blockers,'reviews_missing');
  end if;

  if cardinality(v_blockers)>0 then
    v_blockers := array(select distinct blocker from unnest(v_blockers) blocker order by blocker);
    return query select null::uuid,v_plan.canonical_slug,'blocked'::text,
      v_draft.review_invalidation_revision,v_draft.discussion_revision,v_blockers;
    return;
  end if;

  v_snapshot_id := gen_random_uuid();
  insert into public.study_plan_snapshots(id,plan_id,document,catalog)
    values(v_snapshot_id,p_plan_id,p_document,p_catalog);
  update public.study_plans p set published_snapshot_id=v_snapshot_id,canonical_slug=v_slug where p.id=p_plan_id;
  update plan_collaboration.plan_offer_identity i set is_draft=false where i.plan_id=p_plan_id;
  insert into plan_collaboration.draft_publication_receipts(
    request_id,plan_id,actor_id,expected_review_revision,expected_discussion_revision,
    command_fingerprint,document_fingerprint,snapshot_id
  ) values(
    p_request_id,p_plan_id,p_actor,p_expected_review_revision,p_expected_discussion_revision,
    v_command_fingerprint,v_document_fingerprint,v_snapshot_id
  );
  return query select v_snapshot_id,v_slug,'published'::text,
    v_draft.review_invalidation_revision,v_draft.discussion_revision,array[]::text[];
end;
$$;

create or replace function plan_collaboration.search_offers(p_query text)
returns table(offer_id uuid, university_name text, faculty_name text, offer_name text, campus text, modality text, plan_id uuid, canonical_slug text, plan_year integer, is_draft boolean, sources jsonb)
language sql stable security definer set search_path = '' as $$
  select o.id,o.university_name,o.faculty_name,o.offer_name,o.campus,o.modality,i.plan_id,p.canonical_slug,i.plan_year,
    p.published_snapshot_id is null,
    coalesce((select jsonb_agg(jsonb_build_object('label',s.label,'url',s.url) order by s.position)
      from plan_collaboration.draft_sources s where s.plan_id=i.plan_id),'[]'::jsonb)
  from plan_collaboration.academic_offers o
  join plan_collaboration.plan_offer_identity i on i.offer_id=o.id
  join public.study_plans p on p.id=i.plan_id
  where not exists (
    select 1 from regexp_split_to_table(coalesce(plan_collaboration.normalize_identity_key(p_query), ''), '\s+') term
    where position(term in concat_ws(' ',o.university_key,o.faculty_key,o.offer_key,o.campus_key,o.modality_key)) = 0
  ) order by o.university_key, o.offer_key, i.plan_year nulls last, i.plan_id;
$$;

revoke all on function plan_collaboration.read_publication_status(uuid),
  plan_collaboration.read_published_draft_result(uuid,uuid,bigint,bigint,uuid),
  plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  from public, anon, authenticated, service_role;
grant execute on function plan_collaboration.read_publication_status(uuid) to anon, authenticated, plande_collaboration, plande_collaboration_writer;
grant execute on function plan_collaboration.read_published_draft_result(uuid,uuid,bigint,bigint,uuid)
  to plande_collaboration;
grant execute on function plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  to plande_collaboration, plande_collaboration_writer;
alter function plan_collaboration.read_publication_status(uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.read_published_draft_result(uuid,uuid,bigint,bigint,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.publish_draft(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid) owner to plande_collaboration_writer;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
