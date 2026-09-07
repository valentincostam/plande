create extension if not exists unaccent with schema extensions;
create schema plan_collaboration;
create role plande_collaboration login noinherit nobypassrls nocreatedb nocreaterole;
create role plande_collaboration_writer nologin noinherit nobypassrls nocreatedb nocreaterole;
grant plande_collaboration_writer to postgres;
grant usage, create on schema plan_collaboration to plande_collaboration_writer;
grant usage on schema extensions to plande_collaboration_writer;
create function plan_collaboration.normalize_identity_key(value text)
returns text language sql stable strict security invoker set search_path = '' as $$
  select nullif(lower(extensions.unaccent('extensions.unaccent'::regdictionary,
    regexp_replace(btrim(value), '\s+', ' ', 'g'))), '')
$$;

create table plan_collaboration.academic_offers (
  id uuid primary key default gen_random_uuid(),
  university_name text not null, faculty_name text, offer_name text not null,
  campus text, modality text,
  university_key text not null, faculty_key text, offer_key text not null,
  campus_key text, modality_key text,
  created_at timestamptz not null default now(),
  unique nulls not distinct (university_key, faculty_key, offer_key, campus_key, modality_key)
);
create table plan_collaboration.plan_offer_identity (
  plan_id uuid primary key references public.study_plans(id) on delete restrict,
  offer_id uuid not null references plan_collaboration.academic_offers(id) on delete restrict,
  plan_year integer, is_draft boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index plan_offer_identity_known_year on plan_collaboration.plan_offer_identity(offer_id, plan_year) where plan_year is not null;
create unique index plan_offer_identity_unknown_year on plan_collaboration.plan_offer_identity(offer_id) where plan_year is null;
create table plan_collaboration.draft_envelopes (
  plan_id uuid primary key references public.study_plans(id) on delete restrict,
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'), created_at timestamptz not null default now()
);
create table plan_collaboration.draft_sources (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete restrict,
  label text not null check (btrim(label) <> ''), url text not null check (url ~* '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'),
  position integer not null check (position >= 0), unique(plan_id, position)
);
create table plan_collaboration.student_permissions (
  subject_id uuid primary key references auth.users(id) on delete restrict,
  contributions_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into plan_collaboration.academic_offers (university_name, faculty_name, offer_name, campus, modality, university_key, faculty_key, offer_key, campus_key, modality_key)
select distinct on (plan_collaboration.normalize_identity_key(document->'info'->>'universityName'), plan_collaboration.normalize_identity_key(document->'info'->>'collegeName'), plan_collaboration.normalize_identity_key(document->'info'->>'degreeName'))
  document->'info'->>'universityName', nullif(document->'info'->>'collegeName',''), document->'info'->>'degreeName', null, null,
  plan_collaboration.normalize_identity_key(document->'info'->>'universityName'), plan_collaboration.normalize_identity_key(document->'info'->>'collegeName'), plan_collaboration.normalize_identity_key(document->'info'->>'degreeName'), null, null
from public.study_plan_snapshots where id in (select published_snapshot_id from public.study_plans);
insert into plan_collaboration.plan_offer_identity(plan_id, offer_id, plan_year, is_draft)
select p.id, o.id, nullif(s.document->'info'->>'year','')::integer, false
from public.study_plans p join public.study_plan_snapshots s on s.id=p.published_snapshot_id
join plan_collaboration.academic_offers o on o.university_key=plan_collaboration.normalize_identity_key(s.document->'info'->>'universityName') and o.faculty_key is not distinct from plan_collaboration.normalize_identity_key(s.document->'info'->>'collegeName') and o.offer_key=plan_collaboration.normalize_identity_key(s.document->'info'->>'degreeName');

do $$ begin
 if exists (
   select expected.id from (values
    ('00000000-0000-4000-8000-000000000001'::uuid),
    ('00000000-0000-4000-8000-000000000002'::uuid),
    ('00000000-0000-4000-8000-000000000003'::uuid),
    ('00000000-0000-4000-8000-000000000004'::uuid),
    ('00000000-0000-4000-8000-000000000005'::uuid),
    ('00000000-0000-4000-8000-000000000006'::uuid),
    ('00000000-0000-4000-8000-000000000007'::uuid),
    ('00000000-0000-4000-8000-000000000008'::uuid),
    ('00000000-0000-4000-8000-000000000009'::uuid),
    ('00000000-0000-4000-8000-000000000010'::uuid),
    ('00000000-0000-4000-8000-000000000011'::uuid),
    ('00000000-0000-4000-8000-000000000012'::uuid),
    ('00000000-0000-4000-8000-000000000013'::uuid),
    ('00000000-0000-4000-8000-000000000014'::uuid),
    ('00000000-0000-4000-8000-000000000015'::uuid),
    ('00000000-0000-4000-8000-000000000016'::uuid),
    ('00000000-0000-4000-8000-000000000017'::uuid),
    ('00000000-0000-4000-8000-000000000018'::uuid),
    ('00000000-0000-4000-8000-000000000019'::uuid),
    ('00000000-0000-4000-8000-000000000020'::uuid),
    ('00000000-0000-4000-8000-000000000021'::uuid),
    ('00000000-0000-4000-8000-000000000022'::uuid),
    ('00000000-0000-4000-8000-000000000023'::uuid),
    ('00000000-0000-4000-8000-000000000024'::uuid),
    ('00000000-0000-4000-8000-000000000025'::uuid),
    ('00000000-0000-4000-8000-000000000026'::uuid),
    ('00000000-0000-4000-8000-000000000027'::uuid),
    ('00000000-0000-4000-8000-000000000028'::uuid),
    ('00000000-0000-4000-8000-000000000029'::uuid),
    ('00000000-0000-4000-8000-000000000030'::uuid),
    ('00000000-0000-4000-8000-000000000031'::uuid),
    ('00000000-0000-4000-8000-000000000032'::uuid),
    ('00000000-0000-4000-8000-000000000033'::uuid),
    ('00000000-0000-4000-8000-000000000034'::uuid),
    ('00000000-0000-4000-8000-000000000035'::uuid),
    ('00000000-0000-4000-8000-000000000036'::uuid),
    ('00000000-0000-4000-8000-000000000037'::uuid),
    ('00000000-0000-4000-8000-000000000038'::uuid),
    ('00000000-0000-4000-8000-000000000039'::uuid),
    ('00000000-0000-4000-8000-000000000040'::uuid),
    ('00000000-0000-4000-8000-000000000041'::uuid),
    ('00000000-0000-4000-8000-000000000042'::uuid),
    ('00000000-0000-4000-8000-000000000043'::uuid),
    ('00000000-0000-4000-8000-000000000044'::uuid),
    ('00000000-0000-4000-8000-000000000045'::uuid),
    ('00000000-0000-4000-8000-000000000046'::uuid),
    ('00000000-0000-4000-8000-000000000047'::uuid)
   ) expected(id)
   left join plan_collaboration.plan_offer_identity mapped on mapped.plan_id = expected.id
   where mapped.plan_id is null
 ) then raise exception 'A fixed plan identity is missing'; end if;
 if (select count(*) from public.study_plans where published_snapshot_id is not null) <> 47 or (select count(*) from plan_collaboration.plan_offer_identity) <> 47 then raise exception 'plan offer seed audit failed'; end if;
 if exists (select 1 from plan_collaboration.plan_offer_identity where plan_year is not null group by offer_id,plan_year having count(*)>1) or exists (select 1 from plan_collaboration.plan_offer_identity where plan_year is null group by offer_id having count(*)>1) then raise exception 'plan offer identity duplicate audit failed'; end if;
end $$;

alter table plan_collaboration.academic_offers enable row level security;
alter table plan_collaboration.plan_offer_identity enable row level security;
alter table plan_collaboration.draft_envelopes enable row level security;
alter table plan_collaboration.draft_sources enable row level security;
alter table plan_collaboration.student_permissions enable row level security;
create policy "writer manages collaboration" on plan_collaboration.student_permissions for all to plande_collaboration_writer using (true) with check (true);
create policy "writer manages offers" on plan_collaboration.academic_offers for all to plande_collaboration_writer using (true) with check (true);
create policy "writer manages identities" on plan_collaboration.plan_offer_identity for all to plande_collaboration_writer using (true) with check (true);
create policy "writer manages envelopes" on plan_collaboration.draft_envelopes for all to plande_collaboration_writer using (true) with check (true);
create policy "writer manages sources" on plan_collaboration.draft_sources for all to plande_collaboration_writer using (true) with check (true);
grant select,insert,update on all tables in schema plan_collaboration to plande_collaboration_writer;
revoke update on plan_collaboration.academic_offers, plan_collaboration.draft_envelopes, plan_collaboration.draft_sources from plande_collaboration_writer;
grant usage on schema public to plande_collaboration_writer;
grant select (id, canonical_slug, published_snapshot_id), insert (id, canonical_slug) on public.study_plans to plande_collaboration_writer;
create policy "collaboration reads plan identities" on public.study_plans for select to plande_collaboration_writer using (true);
create policy "collaboration creates unpublished identities" on public.study_plans for insert to plande_collaboration_writer with check (published_snapshot_id is null);

create function plan_collaboration.require_enabled_actor(p_actor uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare v_enabled boolean;
begin
  if p_actor is null then
    raise exception 'Authenticated contributor required' using errcode = '42501';
  end if;
  begin
    insert into plan_collaboration.student_permissions(subject_id)
    values(p_actor) on conflict do nothing;
  exception when foreign_key_violation then
    raise exception 'Authenticated contributor required' using errcode = '42501';
  end;
  select contributions_enabled into v_enabled
  from plan_collaboration.student_permissions where subject_id = p_actor for update;
  if v_enabled is distinct from true then
    raise exception 'Contributions disabled' using errcode = '42501';
  end if;
end $$;

create function plan_collaboration.create_or_find_draft(
  p_university text, p_faculty text, p_offer text, p_campus text,
  p_modality text, p_year integer, p_sources jsonb, p_actor uuid
) returns table(plan_id uuid, disposition text, plan_year integer, conflicting_plan_id uuid)
language plpgsql security definer set search_path = '' as $$
declare
  v_university text := plan_collaboration.normalize_identity_key(p_university);
  v_faculty text := plan_collaboration.normalize_identity_key(p_faculty);
  v_offer text := plan_collaboration.normalize_identity_key(p_offer);
  v_campus text := plan_collaboration.normalize_identity_key(p_campus);
  v_modality text := plan_collaboration.normalize_identity_key(p_modality);
  v_offer_id uuid;
  v_plan_id uuid;
  v_source jsonb;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if v_university is null or v_offer is null or p_sources is null
    or jsonb_typeof(p_sources) <> 'array' then
    raise exception 'Invalid draft identity or sources' using errcode = '22023';
  end if;
  for v_source in select value from jsonb_array_elements(p_sources) loop
    if jsonb_typeof(v_source) <> 'object' then
      raise exception 'Invalid source' using errcode = '22023';
    end if;
    if jsonb_typeof(v_source->'label') is distinct from 'string'
      or jsonb_typeof(v_source->'url') is distinct from 'string'
      or btrim(v_source->>'label') = ''
      or btrim(v_source->>'url') !~* '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'
      or exists (select 1 from jsonb_object_keys(v_source) k where k not in ('label','url')) then
      raise exception 'Invalid source' using errcode = '22023';
    end if;
  end loop;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_university || chr(31) || v_offer, 0));
  select o.id into v_offer_id from plan_collaboration.academic_offers o
  where o.university_key = v_university and o.faculty_key is not distinct from v_faculty
    and o.offer_key = v_offer and o.campus_key is not distinct from v_campus
    and o.modality_key is not distinct from v_modality;
  if v_offer_id is null then
    if exists (select 1 from plan_collaboration.academic_offers o
      where o.university_key = v_university and o.offer_key = v_offer
        and o.faculty_key is null and o.campus_key is not distinct from v_campus
        and o.modality_key is not distinct from v_modality) then
      return query select null::uuid, 'identity_ambiguous'::text, null::integer, null::uuid;
      return;
    end if;
    if v_faculty is null then
      raise exception 'Faculty required for a new offer' using errcode = '22023';
    end if;
    insert into plan_collaboration.academic_offers(
      university_name, faculty_name, offer_name, campus, modality,
      university_key, faculty_key, offer_key, campus_key, modality_key
    ) values (
      btrim(p_university), btrim(p_faculty), btrim(p_offer), nullif(btrim(p_campus), ''), nullif(btrim(p_modality), ''),
      v_university, v_faculty, v_offer, v_campus, v_modality
    ) returning id into v_offer_id;
  end if;
  select i.plan_id into v_plan_id from plan_collaboration.plan_offer_identity i
  where i.offer_id = v_offer_id and i.plan_year is not distinct from p_year;
  if v_plan_id is not null then
    return query select v_plan_id, 'existing'::text, p_year, null::uuid;
    return;
  end if;
  v_plan_id := gen_random_uuid();
  insert into public.study_plans(id, canonical_slug) values(v_plan_id, 'draft-' || v_plan_id::text);
  insert into plan_collaboration.plan_offer_identity(plan_id, offer_id, plan_year, is_draft)
  values(v_plan_id, v_offer_id, p_year, true);
  insert into plan_collaboration.draft_envelopes(plan_id) values(v_plan_id);
  insert into plan_collaboration.draft_sources(plan_id, label, url, position)
  select v_plan_id, btrim(s.value->>'label'), btrim(s.value->>'url'), (s.ordinality - 1)::integer
  from jsonb_array_elements(p_sources) with ordinality s;
  return query select v_plan_id, 'created'::text, p_year, null::uuid;
end $$;

create function plan_collaboration.set_draft_year(p_plan_id uuid, p_year integer, p_actor uuid)
returns table(plan_id uuid, disposition text, conflicting_plan_id uuid)
language plpgsql security definer set search_path = '' as $$
declare v_current integer; v_conflict uuid; v_offer_id uuid; v_lock_key text;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if p_year is null then
    raise exception 'A year is required' using errcode = '22023';
  end if;
  select o.university_key || chr(31) || o.offer_key into v_lock_key
  from plan_collaboration.plan_offer_identity i
  join plan_collaboration.academic_offers o on o.id = i.offer_id
  where i.plan_id = p_plan_id and i.is_draft;
  if not found then
    raise exception 'Draft unavailable' using errcode = '22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_lock_key, 0));
  select i.plan_year, i.offer_id into v_current, v_offer_id
  from plan_collaboration.plan_offer_identity i where i.plan_id = p_plan_id and i.is_draft for update;
  if not found then
    raise exception 'Draft unavailable' using errcode = '22023';
  end if;
  if v_current = p_year then
    return query select p_plan_id, 'unchanged'::text, null::uuid;
    return;
  end if;
  if v_current is not null then
    raise exception 'A known plan year cannot be changed' using errcode = '22023';
  end if;
  select i.plan_id into v_conflict from plan_collaboration.plan_offer_identity i
  where i.offer_id = v_offer_id and i.plan_year = p_year;
  if v_conflict is not null then
    return query select p_plan_id, 'year_conflict'::text, v_conflict;
    return;
  end if;
  update plan_collaboration.plan_offer_identity i set plan_year = p_year where i.plan_id = p_plan_id;
  return query select p_plan_id, 'updated'::text, null::uuid;
end $$;

create function plan_collaboration.search_offers(p_query text) returns table(offer_id uuid, university_name text, faculty_name text, offer_name text, campus text, modality text, plan_id uuid, canonical_slug text, plan_year integer, is_draft boolean, sources jsonb)
language sql stable security definer set search_path = '' as $$
 select o.id,o.university_name,o.faculty_name,o.offer_name,o.campus,o.modality,i.plan_id,p.canonical_slug,i.plan_year,i.is_draft,coalesce((select jsonb_agg(jsonb_build_object('label',s.label,'url',s.url) order by s.position) from plan_collaboration.draft_sources s where s.plan_id=i.plan_id),'[]'::jsonb)
 from plan_collaboration.academic_offers o join plan_collaboration.plan_offer_identity i on i.offer_id=o.id join public.study_plans p on p.id=i.plan_id
 where not exists (
   select 1 from regexp_split_to_table(coalesce(plan_collaboration.normalize_identity_key(p_query), ''), '\s+') term
   where position(term in concat_ws(' ',o.university_key,o.faculty_key,o.offer_key,o.campus_key,o.modality_key)) = 0
 ) order by o.university_key, o.offer_key, i.plan_year nulls last, i.plan_id; $$;
grant usage on schema plan_collaboration to anon, authenticated, plande_collaboration;
grant execute on function plan_collaboration.search_offers(text) to anon, authenticated, plande_collaboration;

create function plan_collaboration.read_draft(p_plan_id uuid) returns table(plan_id uuid, university_name text, faculty_name text, offer_name text, campus text, modality text, plan_year integer, sources jsonb, content jsonb)
language sql stable security definer set search_path = '' as $$
 select i.plan_id,o.university_name,o.faculty_name,o.offer_name,o.campus,o.modality,i.plan_year,coalesce((select jsonb_agg(jsonb_build_object('label',s.label,'url',s.url) order by s.position) from plan_collaboration.draft_sources s where s.plan_id=i.plan_id),'[]'::jsonb),e.content
 from plan_collaboration.plan_offer_identity i join plan_collaboration.academic_offers o on o.id=i.offer_id join plan_collaboration.draft_envelopes e on e.plan_id=i.plan_id where i.plan_id=p_plan_id and i.is_draft; $$;
grant execute on function plan_collaboration.read_draft(uuid) to anon, authenticated, plande_collaboration;
revoke all on schema plan_collaboration from public, anon, authenticated, service_role;
revoke all on all tables in schema plan_collaboration from public, anon, authenticated, service_role, plande_collaboration;
revoke all on all sequences in schema plan_collaboration from public, anon, authenticated, service_role, plande_collaboration;
revoke all on all functions in schema plan_collaboration from public, anon, authenticated, service_role, plande_collaboration;
grant usage on schema plan_collaboration to anon, authenticated, plande_collaboration;
grant execute on function plan_collaboration.search_offers(text), plan_collaboration.read_draft(uuid) to anon, authenticated, plande_collaboration;
grant execute on all functions in schema plan_collaboration to plande_collaboration_writer;
grant execute on function plan_collaboration.create_or_find_draft(text,text,text,text,text,integer,jsonb,uuid), plan_collaboration.set_draft_year(uuid,integer,uuid) to plande_collaboration;
alter function plan_collaboration.search_offers(text) owner to plande_collaboration_writer;
alter function plan_collaboration.read_draft(uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.create_or_find_draft(text,text,text,text,text,integer,jsonb,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.set_draft_year(uuid,integer,uuid) owner to plande_collaboration_writer;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
