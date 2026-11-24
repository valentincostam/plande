do $$
begin
  if exists(select 1 from plan_collaboration.draft_envelopes
    where jsonb_array_length(coalesce(content#>'{document,items}', '[]'::jsonb)) > 0) then
    raise exception 'Existing draft items require an identity backfill before this migration';
  end if;
end;
$$;

alter table plan_collaboration.draft_envelopes
  add column version bigint not null default 0 check (version >= 0),
  add column review_invalidation_revision bigint not null default 0,
  add column updated_at timestamptz not null default now();

create table plan_collaboration.draft_document_versions (
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete cascade,
  version bigint not null,
  content jsonb not null,
  review_invalidation_revision bigint not null,
  created_at timestamptz not null default now(),
  primary key(plan_id, version)
);
create table plan_collaboration.draft_coauthors (
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete cascade,
  subject_id uuid not null references auth.users(id) on delete restrict,
  first_version bigint not null,
  primary key(plan_id, subject_id)
);
create table plan_collaboration.draft_item_identities (
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete cascade,
  item_id text not null,
  seq_id bigint not null check(seq_id >= 0),
  kind text not null check(kind in ('course', 'milestone')),
  primary key(plan_id, item_id),
  unique(plan_id, seq_id)
);
create table plan_collaboration.draft_placement_identities (
  plan_id uuid not null,
  placement_id text not null,
  item_id text not null,
  primary key(plan_id, placement_id),
  foreign key(plan_id, item_id) references plan_collaboration.draft_item_identities(plan_id, item_id) on delete cascade
);

alter table plan_collaboration.draft_document_versions enable row level security;
alter table plan_collaboration.draft_document_versions force row level security;
alter table plan_collaboration.draft_coauthors enable row level security;
alter table plan_collaboration.draft_coauthors force row level security;
alter table plan_collaboration.draft_item_identities enable row level security;
alter table plan_collaboration.draft_item_identities force row level security;
alter table plan_collaboration.draft_placement_identities enable row level security;
alter table plan_collaboration.draft_placement_identities force row level security;
create policy "writer manages draft revisions" on plan_collaboration.draft_document_versions
  for all to plande_collaboration_writer using(true) with check(true);
create policy "writer manages draft coauthors" on plan_collaboration.draft_coauthors
  for all to plande_collaboration_writer using(true) with check(true);
create policy "writer manages draft item identities" on plan_collaboration.draft_item_identities
  for all to plande_collaboration_writer using(true) with check(true);
create policy "writer manages draft placement identities" on plan_collaboration.draft_placement_identities
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.draft_document_versions, plan_collaboration.draft_coauthors,
  plan_collaboration.draft_item_identities, plan_collaboration.draft_placement_identities
  from public, anon, authenticated, service_role, plande_collaboration;
grant select, insert on plan_collaboration.draft_document_versions, plan_collaboration.draft_coauthors,
  plan_collaboration.draft_item_identities, plan_collaboration.draft_placement_identities to plande_collaboration_writer;
grant update(content, version, review_invalidation_revision, updated_at)
  on plan_collaboration.draft_envelopes to plande_collaboration_writer;
grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;

create function plan_collaboration.read_draft_editor(p_plan_id uuid)
returns table(plan_id uuid, content jsonb, version bigint, review_invalidation_revision bigint)
language sql security definer set search_path = '' as $$
  select envelope.plan_id, envelope.content, envelope.version, envelope.review_invalidation_revision
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id=envelope.plan_id
  where envelope.plan_id=p_plan_id and identity.is_draft;
$$;

create function plan_collaboration.read_draft_revision(p_plan_id uuid, p_version bigint)
returns table(plan_id uuid, content jsonb, version bigint, review_invalidation_revision bigint)
language sql security definer set search_path = '' as $$
  select revision.plan_id, revision.content, revision.version, revision.review_invalidation_revision
  from plan_collaboration.draft_document_versions revision
  join plan_collaboration.plan_offer_identity identity on identity.plan_id=revision.plan_id
  where revision.plan_id=p_plan_id and revision.version=p_version and identity.is_draft
  union all
  select current.plan_id, current.content, current.version, current.review_invalidation_revision
  from plan_collaboration.read_draft_editor(p_plan_id) current
  where current.version=p_version and not exists (
    select 1 from plan_collaboration.draft_document_versions revision
    where revision.plan_id=p_plan_id and revision.version=p_version
  );
$$;

create function plan_collaboration.save_draft_document(
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
    raise exception 'Invalid draft version' using errcode='22023';
  end if;
  select envelope.* into v_current
  from plan_collaboration.draft_envelopes envelope
  join plan_collaboration.plan_offer_identity identity on identity.plan_id=envelope.plan_id
  where envelope.plan_id=p_plan_id and identity.is_draft
  for update of envelope, identity;
  if not found then raise exception 'Draft unavailable' using errcode='22023'; end if;
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
    raise exception 'Invalid draft document' using errcode='22023';
  end if;
  v_next := (p_content#>>'{document,nextSeqId}')::bigint;
  v_old_next := coalesce((v_current.content#>>'{document,nextSeqId}')::bigint, 0);
  if v_next < v_old_next or v_next > 9007199254740991 then
    raise exception 'Draft sequence identity cannot decrease' using errcode='22023';
  end if;
  if exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item group by item->>'id' having count(*)>1)
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item group by item->>'seqId' having count(*)>1)
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,sections}') section group by section->>'id' having count(*)>1)
    or exists(select 1 from jsonb_array_elements(p_content#>'{document,items}') item
      cross join lateral jsonb_array_elements(item->'placements') placement
      group by placement->>'id' having count(*)>1) then
    raise exception 'Duplicate draft identity' using errcode='22023';
  end if;
  for v_item in select item from jsonb_array_elements(p_content#>'{document,items}') item loop
    if jsonb_typeof(v_item->'id') is distinct from 'string' or btrim(v_item->>'id')=''
      or jsonb_typeof(v_item->'seqId') is distinct from 'number' or v_item->>'seqId' !~ '^[0-9]+$'
      or (v_item->>'seqId')::bigint >= v_next or v_item->>'kind' not in ('course','milestone')
      or jsonb_typeof(v_item->'placements') is distinct from 'array' then
      raise exception 'Invalid draft item identity' using errcode='22023';
    end if;
    select identity.* into v_identity from plan_collaboration.draft_item_identities identity
      where identity.plan_id=p_plan_id and identity.item_id=v_item->>'id';
    if found then
      if v_identity.seq_id<>(v_item->>'seqId')::bigint or v_identity.kind<>v_item->>'kind' then
        raise exception 'Draft item identity is immutable' using errcode='22023';
      end if;
    else
      if (v_item->>'seqId')::bigint < v_old_next then
        raise exception 'Retired draft sequence cannot be reused' using errcode='22023';
      end if;
      insert into plan_collaboration.draft_item_identities(plan_id,item_id,seq_id,kind)
        values(p_plan_id,v_item->>'id',(v_item->>'seqId')::bigint,v_item->>'kind');
    end if;
    for v_placement in select placement from jsonb_array_elements(v_item->'placements') placement loop
      if jsonb_typeof(v_placement->'id') is distinct from 'string' or btrim(v_placement->>'id')=''
        or not exists(select 1 from jsonb_array_elements(p_content#>'{document,sections}') section
          where section->>'id'=v_placement->>'sectionId') then
        raise exception 'Invalid draft placement' using errcode='22023';
      end if;
      if exists(select 1 from plan_collaboration.draft_placement_identities identity
        where identity.plan_id=p_plan_id and identity.placement_id=v_placement->>'id' and identity.item_id<>v_item->>'id') then
        raise exception 'Draft placement owner is immutable' using errcode='22023';
      end if;
      insert into plan_collaboration.draft_placement_identities(plan_id,placement_id,item_id)
        values(p_plan_id,v_placement->>'id',v_item->>'id') on conflict do nothing;
    end loop;
  end loop;
  insert into plan_collaboration.draft_document_versions(plan_id,version,content,review_invalidation_revision)
    values(p_plan_id,v_current.version,v_current.content,v_current.review_invalidation_revision) on conflict do nothing;
  update plan_collaboration.draft_envelopes envelope
    set content=p_content, version=envelope.version+1, review_invalidation_revision=envelope.review_invalidation_revision+1, updated_at=now()
    where envelope.plan_id=p_plan_id returning envelope.* into v_current;
  insert into plan_collaboration.draft_document_versions(plan_id,version,content,review_invalidation_revision)
    values(p_plan_id,v_current.version,v_current.content,v_current.review_invalidation_revision);
  insert into plan_collaboration.draft_coauthors(plan_id,subject_id,first_version)
    values(p_plan_id,p_actor,v_current.version) on conflict do nothing;
  return query select p_plan_id, 'saved'::text, v_current.content, v_current.version, v_current.review_invalidation_revision;
end;
$$;

revoke all on function plan_collaboration.read_draft_editor(uuid), plan_collaboration.read_draft_revision(uuid,bigint),
  plan_collaboration.save_draft_document(uuid,bigint,jsonb,uuid) from public, anon, authenticated, service_role;
grant execute on function plan_collaboration.read_draft_editor(uuid), plan_collaboration.read_draft_revision(uuid,bigint),
  plan_collaboration.save_draft_document(uuid,bigint,jsonb,uuid) to plande_collaboration, plande_collaboration_writer;
alter function plan_collaboration.read_draft_editor(uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.read_draft_revision(uuid,bigint) owner to plande_collaboration_writer;
alter function plan_collaboration.save_draft_document(uuid,bigint,jsonb,uuid) owner to plande_collaboration_writer;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
