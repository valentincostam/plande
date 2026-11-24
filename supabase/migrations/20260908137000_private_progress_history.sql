grant plande_private_progress_writer to postgres;
grant create on schema public to plande_private_progress_writer;

create function public.private_progress_published_item_kind(p_plan_id uuid, p_item_id text)
returns table(item_kind text, item_known boolean)
language sql stable security definer set search_path = '' as $$
  with evidence(snapshot_id) as (
    select plan.published_snapshot_id
    from public.study_plans plan
    where plan.id = p_plan_id
    union
    select receipt.snapshot_id
    from plan_collaboration.draft_publication_receipts receipt
    where receipt.plan_id = p_plan_id
    union
    select proposal.base_snapshot_id
    from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = p_plan_id
  ), kinds as (
    select item.definition ->> 'kind' as kind
    from evidence
    join public.study_plan_snapshots snapshot
      on snapshot.id = evidence.snapshot_id and snapshot.plan_id = p_plan_id
    cross join lateral pg_catalog.jsonb_array_elements(snapshot.document -> 'items') item(definition)
    where item.definition ->> 'id' = p_item_id
      and item.definition ->> 'kind' in ('course', 'milestone')
  )
  select case when count(distinct kind) = 1 then min(kind) end, count(*) > 0
  from kinds
$$;

revoke all on function public.private_progress_published_item_kind(uuid, text)
  from public, anon, authenticated, service_role, plande_collaboration;
grant execute on function public.private_progress_published_item_kind(uuid, text)
  to plande_private_progress_writer;
alter function public.private_progress_published_item_kind(uuid, text)
  owner to plande_private_progress_writer;

grant select(plan_id, snapshot_id) on plan_collaboration.draft_publication_receipts
  to plande_private_progress_writer;
grant usage on schema plan_collaboration to plande_private_progress_writer;
create policy "private progress reads publication receipts"
  on plan_collaboration.draft_publication_receipts for select to plande_private_progress_writer
  using (true);
grant select(plan_id, base_snapshot_id) on plan_collaboration.plan_proposals
  to plande_private_progress_writer;
create policy "private progress reads proposal bases"
  on plan_collaboration.plan_proposals for select to plande_private_progress_writer
  using (true);
create policy "private progress reads historic snapshots"
  on public.study_plan_snapshots for select to plande_private_progress_writer
  using (
    exists (
      select 1
      from public.study_plans plan
      where plan.id = study_plan_snapshots.plan_id
        and plan.published_snapshot_id = study_plan_snapshots.id
    )
    or exists (
      select 1
      from plan_collaboration.draft_publication_receipts receipt
      where receipt.plan_id = study_plan_snapshots.plan_id
        and receipt.snapshot_id = study_plan_snapshots.id
    )
    or exists (
      select 1
      from plan_collaboration.plan_proposals proposal
      where proposal.plan_id = study_plan_snapshots.plan_id
        and proposal.base_snapshot_id = study_plan_snapshots.id
    )
  );

create or replace function public.private_progress_save(
  p_plan_id uuid,
  p_expected_version bigint,
  p_items jsonb
) returns table(version bigint)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner_id uuid := public.private_progress_owner_id();
  v_version bigint;
  v_document jsonb;
  v_item jsonb;
  v_item_id text;
  v_item_kind text;
  v_state text;
  v_grade smallint;
  v_published_kind text;
  v_published_known boolean;
  v_historical_kind text;
begin
  if v_owner_id is null then
    raise exception 'Private progress requires an authenticated owner' using errcode = '42501';
  end if;
  if p_expected_version is null or p_expected_version < -1 or p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'Private progress payload is invalid' using errcode = '22023';
  end if;

  select snapshots.document into v_document
  from public.study_plans as plans
  join public.study_plan_snapshots as snapshots
    on snapshots.id = plans.published_snapshot_id and snapshots.plan_id = plans.id
  where plans.id = p_plan_id;
  if v_document is null then
    raise exception 'Study plan is unavailable' using errcode = '22023';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(p_items) as input(item)
    group by input.item ->> 'itemId'
    having count(*) > 1
  ) then
    raise exception 'Private progress contains duplicate item IDs' using errcode = '22023';
  end if;

  for v_item in select input.item from jsonb_array_elements(p_items) as input(item)
  loop
    if jsonb_typeof(v_item) <> 'object'
      or exists (
        select 1
        from jsonb_object_keys(v_item) as key(name)
        where key.name not in ('itemId', 'state', 'grade')
      ) then
      raise exception 'Private progress item is invalid' using errcode = '22023';
    end if;
    if jsonb_typeof(v_item -> 'itemId') <> 'string'
      or jsonb_typeof(v_item -> 'state') <> 'string' then
      raise exception 'Private progress item is invalid' using errcode = '22023';
    end if;
    v_item_id := v_item ->> 'itemId';
    v_state := v_item ->> 'state';
    v_grade := null;
    if v_item_id is null or v_item_id = '' or v_state is null then
      raise exception 'Private progress item is invalid' using errcode = '22023';
    end if;
    if v_item ? 'grade' and jsonb_typeof(v_item -> 'grade') not in ('number', 'null') then
      raise exception 'Private progress grade is invalid' using errcode = '22023';
    end if;
    if jsonb_typeof(v_item -> 'grade') = 'number' then
      if v_item ->> 'grade' !~ '^(4|5|6|7|8|9|10)$' then
        raise exception 'Private progress grade is invalid' using errcode = '22023';
      end if;
      v_grade := (v_item ->> 'grade')::smallint;
    end if;

    select evidence.item_kind, evidence.item_known into v_published_kind, v_published_known
    from public.private_progress_published_item_kind(p_plan_id, v_item_id) evidence;
    select items.item_kind into v_historical_kind
    from public.private_progress_items as items
    where items.owner_id = v_owner_id and items.plan_id = p_plan_id and items.item_id = v_item_id;
    if v_published_known and v_published_kind is null then
      raise exception 'Private progress item has inconsistent published kinds' using errcode = '22023';
    end if;
    if v_published_kind is not null and v_historical_kind is not null
      and v_published_kind <> v_historical_kind then
      raise exception 'Private progress item has inconsistent kinds' using errcode = '22023';
    end if;
    v_item_kind := coalesce(v_published_kind, v_historical_kind);
    if v_item_kind is null then
      raise exception 'Private progress item is unknown' using errcode = '22023';
    end if;
    if (v_item_kind = 'course' and (v_state not in ('notTaken', 'inProgress', 'taken', 'passed') or (v_grade is not null and v_grade not between 4 and 10)))
      or (v_item_kind = 'milestone' and (v_state not in ('pending', 'completed') or v_grade is not null)) then
      raise exception 'Private progress item does not match its definition' using errcode = '22023';
    end if;
  end loop;

  select progress.version into v_version
  from public.private_plan_progress as progress
  where progress.owner_id = v_owner_id and progress.plan_id = p_plan_id
  for update;
  if found then
    if v_version <> p_expected_version then
      raise exception 'Private progress version conflict' using errcode = 'P0001';
    end if;
    update public.private_plan_progress as progress
    set version = progress.version + 1, updated_at = now()
    where progress.owner_id = v_owner_id and progress.plan_id = p_plan_id
    returning progress.version into v_version;
  else
    if p_expected_version <> -1 then
      raise exception 'Private progress version conflict' using errcode = 'P0001';
    end if;
    insert into public.private_plan_progress as progress (owner_id, plan_id)
    values (v_owner_id, p_plan_id)
    on conflict (owner_id, plan_id) do nothing
    returning progress.version into v_version;
    if v_version is null then
      raise exception 'Private progress version conflict' using errcode = 'P0001';
    end if;
  end if;

  insert into public.private_progress_items (owner_id, plan_id, item_id, item_kind, state, grade)
  select
    v_owner_id,
    p_plan_id,
    input.item ->> 'itemId',
    coalesce(evidence.item_kind, historical.item_kind),
    input.item ->> 'state',
    case when input.item ? 'grade' then (input.item ->> 'grade')::smallint end
  from jsonb_array_elements(p_items) as input(item)
  cross join lateral public.private_progress_published_item_kind(p_plan_id, input.item ->> 'itemId') evidence
  left join lateral (
    select items.item_kind
    from public.private_progress_items as items
    where items.owner_id = v_owner_id and items.plan_id = p_plan_id and items.item_id = input.item ->> 'itemId'
  ) historical on true
  on conflict (owner_id, plan_id, item_id) do update
    set item_kind = excluded.item_kind, state = excluded.state, grade = excluded.grade;

  return query select v_version;
end;
$$;

revoke all on function public.private_progress_save(uuid, bigint, jsonb) from public, anon, service_role;
grant execute on function public.private_progress_save(uuid, bigint, jsonb) to authenticated;
alter function public.private_progress_save(uuid, bigint, jsonb)
  owner to plande_private_progress_writer;
revoke create on schema public from plande_private_progress_writer;
revoke plande_private_progress_writer from postgres;
