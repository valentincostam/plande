create role plande_private_progress_writer nologin noinherit nobypassrls nocreatedb nocreaterole;
grant plande_private_progress_writer to postgres;
grant create on schema public to plande_private_progress_writer;

create table public.private_plan_progress (
  owner_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid not null references public.study_plans(id) on delete restrict,
  version bigint not null default 0 check (version >= 0),
  updated_at timestamptz not null default now(),
  primary key (owner_id, plan_id)
);

create table public.private_progress_items (
  owner_id uuid not null,
  plan_id uuid not null,
  item_id text not null check (length(item_id) > 0),
  item_kind text not null check (item_kind in ('course', 'milestone')),
  state text not null,
  grade smallint,
  primary key (owner_id, plan_id, item_id),
  foreign key (owner_id, plan_id)
    references public.private_plan_progress(owner_id, plan_id)
    on delete cascade,
  check (
    (item_kind = 'course' and state in ('notTaken', 'inProgress', 'taken', 'passed') and (grade is null or grade between 4 and 10))
    or (item_kind = 'milestone' and state in ('pending', 'completed') and grade is null)
  )
);

alter table public.private_plan_progress enable row level security;
alter table public.private_plan_progress force row level security;
alter table public.private_progress_items enable row level security;
alter table public.private_progress_items force row level security;

create policy "owners read private progress"
  on public.private_plan_progress for select to authenticated
  using (owner_id = auth.uid());

create policy "owners read private progress items"
  on public.private_progress_items for select to authenticated
  using (owner_id = auth.uid());

create policy "writer reads published plans"
  on public.study_plans for select to plande_private_progress_writer
  using (published_snapshot_id is not null);

create policy "writer reads published snapshots"
  on public.study_plan_snapshots for select to plande_private_progress_writer
  using (id in (select published_snapshot_id from public.study_plans));

create function public.private_progress_owner_id()
returns uuid
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    nullif(pg_catalog.current_setting('request.jwt.claim.sub', true), ''),
    (nullif(pg_catalog.current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;

revoke all on function public.private_progress_owner_id() from public, anon, authenticated, service_role;
grant execute on function public.private_progress_owner_id() to plande_private_progress_writer;

create policy "writer reads private progress"
  on public.private_plan_progress for select to plande_private_progress_writer
  using (owner_id = public.private_progress_owner_id());

create policy "writer creates private progress"
  on public.private_plan_progress for insert to plande_private_progress_writer
  with check (owner_id = public.private_progress_owner_id());

create policy "writer updates private progress"
  on public.private_plan_progress for update to plande_private_progress_writer
  using (owner_id = public.private_progress_owner_id())
  with check (owner_id = public.private_progress_owner_id());

create policy "writer reads private progress items"
  on public.private_progress_items for select to plande_private_progress_writer
  using (owner_id = public.private_progress_owner_id());

create policy "writer creates private progress items"
  on public.private_progress_items for insert to plande_private_progress_writer
  with check (owner_id = public.private_progress_owner_id());

create policy "writer updates private progress items"
  on public.private_progress_items for update to plande_private_progress_writer
  using (owner_id = public.private_progress_owner_id())
  with check (owner_id = public.private_progress_owner_id());

revoke all on table public.private_plan_progress, public.private_progress_items from public, anon, authenticated, service_role;
grant select on table public.private_plan_progress, public.private_progress_items to authenticated;
grant usage on schema public to plande_private_progress_writer;
grant select (id, published_snapshot_id) on public.study_plans to plande_private_progress_writer;
grant select (id, plan_id, document) on public.study_plan_snapshots to plande_private_progress_writer;
grant select, insert, update on public.private_plan_progress, public.private_progress_items to plande_private_progress_writer;

create function public.private_progress_save(
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

    select definition ->> 'kind' into v_published_kind
    from jsonb_array_elements(v_document -> 'items') as definition
    where definition ->> 'id' = v_item_id;
    select items.item_kind into v_historical_kind
    from public.private_progress_items as items
    where items.owner_id = v_owner_id and items.plan_id = p_plan_id and items.item_id = v_item_id;
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
    coalesce(
      (
        select definition ->> 'kind'
        from jsonb_array_elements(v_document -> 'items') as definition
        where definition ->> 'id' = input.item ->> 'itemId'
      ),
      (
        select items.item_kind
        from public.private_progress_items as items
        where items.owner_id = v_owner_id and items.plan_id = p_plan_id and items.item_id = input.item ->> 'itemId'
      )
    ),
    input.item ->> 'state',
    case when input.item ? 'grade' then (input.item ->> 'grade')::smallint end
  from jsonb_array_elements(p_items) as input(item)
  on conflict (owner_id, plan_id, item_id) do update
    set item_kind = excluded.item_kind, state = excluded.state, grade = excluded.grade;

  return query select v_version;
end;
$$;

revoke all on function public.private_progress_save(uuid, bigint, jsonb) from public, anon, service_role;
grant execute on function public.private_progress_save(uuid, bigint, jsonb) to authenticated;
alter function public.private_progress_save(uuid, bigint, jsonb) owner to plande_private_progress_writer;
revoke create on schema public from plande_private_progress_writer;
revoke plande_private_progress_writer from postgres;

create or replace view public.study_plan_published
with (security_invoker = true) as
select plans.canonical_slug as slug, snapshots.document, plans.id as plan_id
from public.study_plans as plans
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id
union all
select aliases.slug, snapshots.document, plans.id as plan_id
from public.study_plan_aliases as aliases
join public.study_plans as plans on plans.id = aliases.plan_id
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id;

grant select on public.study_plan_published to anon;
