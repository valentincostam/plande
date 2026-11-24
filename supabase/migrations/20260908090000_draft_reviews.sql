alter table plan_collaboration.draft_envelopes
  add column review_authorship_known boolean not null default false;

create table plan_collaboration.draft_review_checks (
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete cascade,
  reviewer_id uuid not null references auth.users(id) on delete restrict,
  unit_key text not null check(length(unit_key) between 1 and 300),
  fingerprint text not null check(fingerprint ~ '^[a-f0-9]{64}$'),
  checked_at timestamptz not null default now(),
  primary key(plan_id, reviewer_id, unit_key)
);
alter table plan_collaboration.draft_review_checks enable row level security;
alter table plan_collaboration.draft_review_checks force row level security;
create policy "writer manages review checks" on plan_collaboration.draft_review_checks
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.draft_review_checks from public, anon, authenticated, service_role, plande_collaboration;
grant select, insert, update on plan_collaboration.draft_review_checks to plande_collaboration_writer;
create table plan_collaboration.draft_review_approvals (
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete cascade,
  reviewer_id uuid not null references auth.users(id) on delete restrict,
  review_revision bigint not null check(review_revision >= 0),
  approved_at timestamptz not null default now(),
  primary key(plan_id, reviewer_id)
);
alter table plan_collaboration.draft_review_approvals enable row level security;
alter table plan_collaboration.draft_review_approvals force row level security;
create policy "writer manages review approvals" on plan_collaboration.draft_review_approvals
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.draft_review_approvals from public,anon,authenticated,service_role,plande_collaboration;
grant select,insert,update on plan_collaboration.draft_review_approvals to plande_collaboration_writer;
grant update(review_authorship_known) on plan_collaboration.draft_envelopes to plande_collaboration_writer;
grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;

alter function plan_collaboration.create_or_find_draft(text,text,text,text,text,integer,jsonb,uuid)
  rename to create_or_find_draft_without_review;
revoke all on function plan_collaboration.create_or_find_draft_without_review(text,text,text,text,text,integer,jsonb,uuid)
  from public, anon, authenticated, service_role, plande_collaboration;

create function plan_collaboration.create_or_find_draft(
  p_university text,p_faculty text,p_offer text,p_campus text,p_modality text,
  p_year integer,p_sources jsonb,p_actor uuid
) returns table(plan_id uuid, disposition text, plan_year integer, conflicting_plan_id uuid)
language plpgsql security definer set search_path = '' as $$
declare v_result record;
begin
  select * into v_result from plan_collaboration.create_or_find_draft_without_review(
    p_university,p_faculty,p_offer,p_campus,p_modality,p_year,p_sources,p_actor);
  if v_result.disposition = 'created' then
    insert into plan_collaboration.draft_coauthors(plan_id,subject_id,first_version)
      values(v_result.plan_id,p_actor,0) on conflict do nothing;
    update plan_collaboration.draft_envelopes e set review_authorship_known=true
      where e.plan_id=v_result.plan_id;
  end if;
  return query select v_result.plan_id,v_result.disposition,v_result.plan_year,v_result.conflicting_plan_id;
end;
$$;

alter function plan_collaboration.set_draft_year(uuid,integer,uuid) rename to set_draft_year_without_review;
revoke all on function plan_collaboration.set_draft_year_without_review(uuid,integer,uuid)
  from public, anon, authenticated, service_role, plande_collaboration;

create function plan_collaboration.set_draft_year(p_plan_id uuid,p_year integer,p_actor uuid)
returns table(plan_id uuid, disposition text, conflicting_plan_id uuid)
language plpgsql security definer set search_path = '' as $$
declare v_result record; v_version bigint;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  select e.version into v_version from plan_collaboration.draft_envelopes e
    where e.plan_id=p_plan_id for update;
  select * into v_result from plan_collaboration.set_draft_year_without_review(p_plan_id,p_year,p_actor);
  if v_result.disposition = 'updated' then
    update plan_collaboration.draft_envelopes e
      set review_invalidation_revision=e.review_invalidation_revision+1,updated_at=now()
      where e.plan_id=p_plan_id;
    insert into plan_collaboration.draft_coauthors(plan_id,subject_id,first_version)
      values(p_plan_id,p_actor,v_version) on conflict do nothing;
  end if;
  return query select v_result.plan_id,v_result.disposition,v_result.conflicting_plan_id;
end;
$$;

create function plan_collaboration.lock_draft_review(p_plan_id uuid,p_actor uuid)
returns table(review_revision bigint,is_coauthor boolean,authorship_known boolean,checks jsonb,sources jsonb,approved_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_revision bigint; v_known boolean;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  select e.review_invalidation_revision,e.review_authorship_known into v_revision,v_known
    from plan_collaboration.draft_envelopes e
    join plan_collaboration.plan_offer_identity i on i.plan_id=e.plan_id
    where e.plan_id=p_plan_id and i.is_draft for update of e,i;
  if not found then raise exception 'Draft unavailable' using errcode='22023'; end if;
  return query select v_revision,
    exists(select 1 from plan_collaboration.draft_coauthors c where c.plan_id=p_plan_id and c.subject_id=p_actor),
    v_known,
    coalesce((select jsonb_agg(jsonb_build_object('key',c.unit_key,'fingerprint',c.fingerprint) order by c.unit_key)
      from plan_collaboration.draft_review_checks c where c.plan_id=p_plan_id and c.reviewer_id=p_actor),'[]'::jsonb),
    coalesce((select jsonb_agg(jsonb_build_object('id',s.id,'label',s.label,'url',s.url) order by s.position)
      from plan_collaboration.draft_sources s where s.plan_id=p_plan_id),'[]'::jsonb),
    (select a.review_revision from plan_collaboration.draft_review_approvals a
      where a.plan_id=p_plan_id and a.reviewer_id=p_actor and a.review_revision=v_revision
      and not exists(select 1 from plan_collaboration.draft_coauthors c
        where c.plan_id=p_plan_id and c.subject_id=p_actor));
end;
$$;

create function plan_collaboration.record_draft_check(
  p_plan_id uuid,p_expected_revision bigint,p_key text,p_fingerprint text,p_sources_opened boolean,p_actor uuid
) returns void language plpgsql security definer set search_path = '' as $$
declare v_review record;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id,p_actor);
  if v_review.is_coauthor then raise exception 'Coauthors cannot approve their draft' using errcode='42501'; end if;
  if p_expected_revision is null or p_expected_revision <> v_review.review_revision then
    raise exception 'Review context changed' using errcode='40001';
  end if;
  if p_sources_opened is distinct from true or jsonb_array_length(v_review.sources)=0 then
    raise exception 'Accessible sources must be checked' using errcode='22023';
  end if;
  if p_key is null or length(p_key) not between 1 and 300
    or p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid review check' using errcode='22023';
  end if;
  insert into plan_collaboration.draft_review_checks(plan_id,reviewer_id,unit_key,fingerprint)
    values(p_plan_id,p_actor,p_key,p_fingerprint)
    on conflict(plan_id,reviewer_id,unit_key) do update set fingerprint=excluded.fingerprint,checked_at=now();
end;
$$;

create function plan_collaboration.approve_draft_review(
  p_plan_id uuid,p_expected_revision bigint,p_units jsonb,p_actor uuid
) returns void language plpgsql security definer set search_path = '' as $$
declare v_review record; v_content jsonb;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id,p_actor);
  if v_review.is_coauthor then raise exception 'Coauthors cannot approve their draft' using errcode='42501'; end if;
  if p_expected_revision is null or p_expected_revision <> v_review.review_revision then
    raise exception 'Review context changed' using errcode='40001';
  end if;
  if not v_review.authorship_known then
    raise exception 'Historical authorship is unresolved' using errcode='22023';
  end if;
  select e.content into v_content from plan_collaboration.draft_envelopes e where e.plan_id=p_plan_id;
  if jsonb_array_length(v_review.sources)=0
    or coalesce(jsonb_array_length(v_content#>'{document,items}'),0)=0
    or v_content->'unknownRequirements' is distinct from '[]'::jsonb
    or v_content->'unsupportedContent' is distinct from '[]'::jsonb then
    raise exception 'Draft is not ready for approval' using errcode='22023';
  end if;
  if p_units is null or jsonb_typeof(p_units) is distinct from 'array' then
    raise exception 'Invalid review manifest' using errcode='22023';
  end if;
  if jsonb_array_length(p_units) not between 1 and 2500
    or exists(select 1 from jsonb_array_elements(p_units) u
      where jsonb_typeof(u->'key') is distinct from 'string'
        or jsonb_typeof(u->'fingerprint') is distinct from 'string'
        or u->>'fingerprint' !~ '^[a-f0-9]{64}$')
    or exists(select 1 from jsonb_array_elements(p_units) u group by u->>'key' having count(*)>1) then
    raise exception 'Invalid review manifest' using errcode='22023';
  end if;
  if exists (
    select 1 from (
      select 'identity'::text as key
      union all select 'source:' || (s->>'id') from jsonb_array_elements(v_review.sources) s
      union all select 'item:' || (i->>'id') from jsonb_array_elements(v_content#>'{document,items}') i
      union all select 'graduation:' || (g->>'id') from jsonb_array_elements(coalesce(v_content#>'{document,requirements,graduation}','[]'::jsonb)) g
    ) required where not exists(select 1 from jsonb_array_elements(p_units) u where u->>'key'=required.key)
  ) or exists (
    select 1 from jsonb_array_elements(p_units) u where not exists(
      select 1 from plan_collaboration.draft_review_checks c
        where c.plan_id=p_plan_id and c.reviewer_id=p_actor
          and c.unit_key=u->>'key' and c.fingerprint=u->>'fingerprint'
    )
  ) then raise exception 'Review is incomplete' using errcode='22023'; end if;
  insert into plan_collaboration.draft_review_approvals(plan_id,reviewer_id,review_revision)
    values(p_plan_id,p_actor,v_review.review_revision)
    on conflict(plan_id,reviewer_id) do update
      set review_revision=excluded.review_revision,approved_at=now();
end;
$$;

revoke all on function plan_collaboration.create_or_find_draft(text,text,text,text,text,integer,jsonb,uuid),
  plan_collaboration.set_draft_year(uuid,integer,uuid),
  plan_collaboration.lock_draft_review(uuid,uuid),
  plan_collaboration.record_draft_check(uuid,bigint,text,text,boolean,uuid),
  plan_collaboration.approve_draft_review(uuid,bigint,jsonb,uuid)
  from public,anon,authenticated,service_role;
grant execute on function plan_collaboration.create_or_find_draft(text,text,text,text,text,integer,jsonb,uuid),
  plan_collaboration.set_draft_year(uuid,integer,uuid),
  plan_collaboration.lock_draft_review(uuid,uuid),
  plan_collaboration.record_draft_check(uuid,bigint,text,text,boolean,uuid),
  plan_collaboration.approve_draft_review(uuid,bigint,jsonb,uuid)
  to plande_collaboration,plande_collaboration_writer;
alter function plan_collaboration.create_or_find_draft(text,text,text,text,text,integer,jsonb,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.set_draft_year(uuid,integer,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.lock_draft_review(uuid,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.record_draft_check(uuid,bigint,text,text,boolean,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.approve_draft_review(uuid,bigint,jsonb,uuid) owner to plande_collaboration_writer;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
