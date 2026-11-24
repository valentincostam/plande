alter table plan_collaboration.draft_envelopes
  add column discussion_revision bigint not null default 0 check(discussion_revision>=0);

create table plan_collaboration.draft_discussions (
  id uuid primary key,
  plan_id uuid not null references plan_collaboration.draft_envelopes(plan_id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete restrict,
  parent_id uuid references plan_collaboration.draft_discussions(id) on delete cascade,
  kind text not null check(kind in ('comment','objection')),
  unit_key text not null check(length(unit_key) between 1 and 300),
  fingerprint text not null check(fingerprint ~ '^[a-f0-9]{64}$'),
  argument text not null check(length(argument) between 1 and 8000),
  source_id uuid not null,
  source_snapshot jsonb not null,
  locator text not null check(length(locator)<=1000),
  review_revision bigint not null,
  confirmed_fingerprint text,
  status text not null check(status in ('comment','pending','confirmed','dismissed','corrected')),
  created_at timestamptz not null default now()
);
alter table plan_collaboration.draft_discussions enable row level security;
alter table plan_collaboration.draft_discussions force row level security;
create policy "writer manages draft discussions" on plan_collaboration.draft_discussions
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.draft_discussions from public,anon,authenticated,service_role,plande_collaboration;
grant select,insert,update on plan_collaboration.draft_discussions to plande_collaboration_writer;
grant delete on plan_collaboration.draft_review_checks to plande_collaboration_writer;
create table plan_collaboration.draft_discussion_events (
  request_id uuid primary key,
  discussion_id uuid not null references plan_collaboration.draft_discussions(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  action text not null check(action in ('confirm','dismiss','reopen','correct')),
  command jsonb not null,
  argument text not null,
  source_snapshot jsonb not null,
  locator text not null,
  new_evidence text not null,
  evidence_key text not null,
  review_revision bigint not null,
  discussion_revision bigint not null,
  created_at timestamptz not null default now()
);
alter table plan_collaboration.draft_discussion_events enable row level security;
alter table plan_collaboration.draft_discussion_events force row level security;
create policy "writer appends discussion history" on plan_collaboration.draft_discussion_events
  for all to plande_collaboration_writer using(true) with check(true);
revoke all on plan_collaboration.draft_discussion_events from public,anon,authenticated,service_role,plande_collaboration;
grant select,insert on plan_collaboration.draft_discussion_events to plande_collaboration_writer;
grant update(discussion_revision) on plan_collaboration.draft_envelopes to plande_collaboration_writer;
grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;

create function plan_collaboration.read_draft_discussions(p_plan_id uuid,p_actor uuid)
returns table(discussion_revision bigint,pending_count integer,entries jsonb)
language sql security definer set search_path = '' as $$
  select e.discussion_revision,
    (select count(*)::integer from plan_collaboration.draft_discussions d
      where d.plan_id=p_plan_id and d.status in ('pending','confirmed')),
    coalesce((select jsonb_agg(jsonb_build_object(
      'id',d.id,'kind',d.kind,'parentId',d.parent_id,'unitKey',d.unit_key,'argument',d.argument,
      'source',d.source_snapshot,'locator',d.locator,'status',d.status,
      'reviewRevision',d.review_revision,'createdAt',d.created_at,'isOwn',d.author_id=p_actor,
      'events',coalesce((select jsonb_agg(jsonb_build_object(
        'action',h.action,'argument',h.argument,'source',h.source_snapshot,'locator',h.locator,
        'newEvidence',h.new_evidence,'reviewRevision',h.review_revision,'createdAt',h.created_at
      ) order by h.discussion_revision) from plan_collaboration.draft_discussion_events h where h.discussion_id=d.id),'[]'::jsonb)
    ) order by d.created_at,d.id) from plan_collaboration.draft_discussions d where d.plan_id=p_plan_id),'[]'::jsonb)
  from plan_collaboration.draft_envelopes e
  join plan_collaboration.plan_offer_identity i on i.plan_id=e.plan_id
  where e.plan_id=p_plan_id and i.is_draft;
$$;

create function plan_collaboration.add_draft_discussion(
  p_plan_id uuid,p_review_revision bigint,p_discussion_revision bigint,p_request_id uuid,
  p_kind text,p_unit_key text,p_fingerprint text,p_argument text,p_source_id uuid,p_locator text,p_actor uuid,p_parent_id uuid default null
) returns table(discussion_id uuid,disposition text,discussion_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_review record; v_revision bigint; v_existing plan_collaboration.draft_discussions%rowtype; v_source jsonb;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id,p_actor);
  select e.discussion_revision into v_revision from plan_collaboration.draft_envelopes e where e.plan_id=p_plan_id;
  if p_request_id is null or p_kind is null or p_kind not in ('comment','objection')
    or p_unit_key is null or length(p_unit_key) not between 1 and 300
    or p_argument is null or length(btrim(p_argument)) not between 1 and 8000
    or p_locator is null or length(btrim(p_locator))>1000 then
    raise exception 'Invalid discussion input' using errcode='22023';
  end if;
  select d.* into v_existing from plan_collaboration.draft_discussions d where d.id=p_request_id;
  if found then
    if v_existing.plan_id<>p_plan_id or v_existing.author_id<>p_actor
      or v_existing.kind<>p_kind or v_existing.unit_key<>p_unit_key
      or v_existing.review_revision is distinct from p_review_revision or v_existing.argument<>btrim(p_argument)
      or v_existing.source_id is distinct from p_source_id or v_existing.locator<>btrim(p_locator)
      or v_existing.parent_id is distinct from p_parent_id then
      raise exception 'Request identity was reused' using errcode='22023';
    end if;
    return query select v_existing.id,'existing'::text,v_revision;
    return;
  end if;
  if p_review_revision is null or p_review_revision<>v_review.review_revision
    or p_discussion_revision is null or p_discussion_revision<>v_revision then
    return query select null::uuid,'version_conflict'::text,v_revision;
    return;
  end if;
  if p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid review context' using errcode='22023';
  end if;
  if p_parent_id is not null and (p_kind<>'comment' or not exists(
    select 1 from plan_collaboration.draft_discussions d
      where d.id=p_parent_id and d.plan_id=p_plan_id and d.kind='objection' and d.unit_key=p_unit_key
  )) then raise exception 'Invalid discussion parent' using errcode='22023'; end if;
  select jsonb_build_object('id',s.id,'label',s.label,'url',s.url) into v_source
    from plan_collaboration.draft_sources s where s.plan_id=p_plan_id and s.id=p_source_id;
  if not found then raise exception 'A draft source is required' using errcode='22023'; end if;
  if p_kind='objection' then
    select d.* into v_existing from plan_collaboration.draft_discussions d
      where d.plan_id=p_plan_id and d.kind='objection' and d.unit_key=p_unit_key
        and lower(regexp_replace(btrim(d.argument),'\s+',' ','g'))=lower(regexp_replace(btrim(p_argument),'\s+',' ','g'))
        and d.source_snapshot->>'url'=v_source->>'url' and d.locator=btrim(p_locator)
      order by d.created_at,d.id limit 1;
    if found then
      return query select v_existing.id,'existing'::text,v_revision;
      return;
    end if;
  end if;
  insert into plan_collaboration.draft_discussions(id,plan_id,author_id,parent_id,kind,unit_key,fingerprint,argument,source_id,source_snapshot,locator,review_revision,status)
    values(p_request_id,p_plan_id,p_actor,p_parent_id,p_kind,p_unit_key,p_fingerprint,btrim(p_argument),p_source_id,v_source,btrim(p_locator),p_review_revision,
      case when p_kind='objection' then 'pending' else 'comment' end);
  update plan_collaboration.draft_envelopes e set discussion_revision=e.discussion_revision+1
    where e.plan_id=p_plan_id returning e.discussion_revision into v_revision;
  return query select p_request_id,'created'::text,v_revision;
end;
$$;

create function plan_collaboration.resolve_draft_objection(
  p_plan_id uuid,p_discussion_id uuid,p_review_revision bigint,p_discussion_revision bigint,p_request_id uuid,
  p_action text,p_argument text,p_source_id uuid,p_locator text,p_new_evidence text,p_fingerprint text,p_actor uuid
) returns table(status text,disposition text,discussion_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_review record; v_revision bigint; v_thread plan_collaboration.draft_discussions%rowtype;
  v_event plan_collaboration.draft_discussion_events%rowtype; v_source jsonb; v_command jsonb; v_status text; v_evidence text;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id,p_actor);
  select e.discussion_revision into v_revision from plan_collaboration.draft_envelopes e where e.plan_id=p_plan_id;
  select d.* into v_thread from plan_collaboration.draft_discussions d
    where d.id=p_discussion_id and d.plan_id=p_plan_id and d.kind='objection';
  if not found then raise exception 'Objection unavailable' using errcode='22023'; end if;
  if p_request_id is null or p_action is null or p_action not in ('confirm','dismiss','reopen','correct')
    or p_argument is null or length(btrim(p_argument)) not between 1 and 8000
    or p_locator is null or length(btrim(p_locator))>1000
    or p_new_evidence is null or length(btrim(p_new_evidence))>8000 then
    raise exception 'Invalid conclusion' using errcode='22023';
  end if;
  v_command:=jsonb_build_object('discussion',p_discussion_id,'action',p_action,'argument',btrim(p_argument),
    'source',p_source_id,'locator',btrim(p_locator),'evidence',btrim(p_new_evidence),'reviewRevision',p_review_revision);
  select h.* into v_event from plan_collaboration.draft_discussion_events h where h.request_id=p_request_id;
  if found then
    if v_event.actor_id<>p_actor or v_event.command<>v_command then
      raise exception 'Request identity was reused' using errcode='22023';
    end if;
    return query select v_thread.status,'existing'::text,v_revision;
    return;
  end if;
  if p_review_revision is null or p_review_revision<>v_review.review_revision
    or p_discussion_revision is null or p_discussion_revision<>v_revision then
    return query select v_thread.status,'version_conflict'::text,v_revision;
    return;
  end if;
  select jsonb_build_object('id',s.id,'label',s.label,'url',s.url) into v_source
    from plan_collaboration.draft_sources s where s.plan_id=p_plan_id and s.id=p_source_id;
  if not found then raise exception 'A draft source is required' using errcode='22023'; end if;
  v_evidence:=lower(regexp_replace(btrim(p_new_evidence),'\s+',' ','g'));
  if p_action='reopen' then
    if v_thread.status not in ('dismissed','corrected') then
      raise exception 'Only resolved objections can reopen' using errcode='22023';
    end if;
    if v_evidence='' or v_evidence=lower(regexp_replace(btrim(v_thread.argument),'\s+',' ','g')) then
      raise exception 'New evidence is required' using errcode='22023';
    end if;
    if exists(select 1 from plan_collaboration.draft_discussion_events h
      where h.discussion_id=p_discussion_id and h.action='reopen' and h.evidence_key=v_evidence) then
      return query select v_thread.status,'existing'::text,v_revision;
      return;
    end if;
    v_status:='pending';
  else
    if v_review.is_coauthor or v_thread.author_id=p_actor
      or exists(select 1 from plan_collaboration.draft_discussions d where d.parent_id=p_discussion_id and d.author_id=p_actor)
      or exists(select 1 from plan_collaboration.draft_discussion_events h where h.discussion_id=p_discussion_id and h.action='reopen' and h.actor_id=p_actor) then
      raise exception 'An independent participant must conclude' using errcode='42501';
    end if;
    if p_action in ('confirm','dismiss') then
      if v_thread.status<>'pending' then raise exception 'Objection is not pending' using errcode='22023'; end if;
      if p_action='confirm' and (p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$') then
        raise exception 'Invalid review context' using errcode='22023';
      end if;
      v_status:=case when p_action='confirm' then 'confirmed' else 'dismissed' end;
      if p_action='confirm' then
        delete from plan_collaboration.draft_review_checks c
          where c.plan_id=p_plan_id and c.unit_key=v_thread.unit_key;
      end if;
    else
      if v_thread.status<>'confirmed' or p_fingerprint is null or p_fingerprint=v_thread.confirmed_fingerprint
        or not exists(select 1 from plan_collaboration.draft_review_checks c
          where c.plan_id=p_plan_id and c.reviewer_id=p_actor and c.unit_key=v_thread.unit_key and c.fingerprint=p_fingerprint) then
        raise exception 'The affected content must be corrected and checked' using errcode='22023';
      end if;
      v_status:='corrected';
    end if;
  end if;
  insert into plan_collaboration.draft_discussion_events(request_id,discussion_id,actor_id,action,command,argument,source_snapshot,locator,new_evidence,evidence_key,review_revision,discussion_revision)
    values(p_request_id,p_discussion_id,p_actor,p_action,v_command,btrim(p_argument),v_source,btrim(p_locator),btrim(p_new_evidence),v_evidence,p_review_revision,v_revision+1);
  update plan_collaboration.draft_discussions d set status=v_status,
    confirmed_fingerprint=case when p_action='confirm' then p_fingerprint else d.confirmed_fingerprint end
    where d.id=p_discussion_id;
  update plan_collaboration.draft_envelopes e set discussion_revision=e.discussion_revision+1
    where e.plan_id=p_plan_id returning e.discussion_revision into v_revision;
  return query select v_status,'changed'::text,v_revision;
end;
$$;

revoke all on function plan_collaboration.read_draft_discussions(uuid,uuid),
  plan_collaboration.add_draft_discussion(uuid,bigint,bigint,uuid,text,text,text,text,uuid,text,uuid,uuid),
  plan_collaboration.resolve_draft_objection(uuid,uuid,bigint,bigint,uuid,text,text,uuid,text,text,text,uuid)
  from public,anon,authenticated,service_role;
grant execute on function plan_collaboration.read_draft_discussions(uuid,uuid),
  plan_collaboration.add_draft_discussion(uuid,bigint,bigint,uuid,text,text,text,text,uuid,text,uuid,uuid),
  plan_collaboration.resolve_draft_objection(uuid,uuid,bigint,bigint,uuid,text,text,uuid,text,text,text,uuid)
  to plande_collaboration,plande_collaboration_writer;
alter function plan_collaboration.read_draft_discussions(uuid,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.add_draft_discussion(uuid,bigint,bigint,uuid,text,text,text,text,uuid,text,uuid,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.resolve_draft_objection(uuid,uuid,bigint,bigint,uuid,text,text,uuid,text,text,text,uuid) owner to plande_collaboration_writer;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
