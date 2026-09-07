create table public.study_plans (
  id uuid primary key,
  canonical_slug text not null unique,
  published_snapshot_id uuid unique,
  created_at timestamptz not null default now()
);

create table public.study_plan_snapshots (
  id uuid primary key,
  plan_id uuid not null references public.study_plans(id) on delete restrict,
  document jsonb not null,
  catalog jsonb not null,
  created_at timestamptz not null default now(),
  unique (id, plan_id)
);

alter table public.study_plans
  add constraint study_plans_published_snapshot
  foreign key (published_snapshot_id, id)
  references public.study_plan_snapshots(id, plan_id)
  deferrable initially deferred;

create table public.study_plan_aliases (
  slug text primary key,
  plan_id uuid not null references public.study_plans(id) on delete restrict
);

alter table public.study_plans enable row level security;
alter table public.study_plan_snapshots enable row level security;
alter table public.study_plan_aliases enable row level security;

create policy "anon reads published plans"
  on public.study_plans for select to anon
  using (published_snapshot_id is not null);

create policy "anon reads published snapshots"
  on public.study_plan_snapshots for select to anon
  using (id in (select published_snapshot_id from public.study_plans));

create policy "anon reads public aliases"
  on public.study_plan_aliases for select to anon
  using (plan_id in (select id from public.study_plans where published_snapshot_id is not null));

create view public.study_plan_catalog
with (security_invoker = true) as
select plans.canonical_slug, snapshots.catalog
from public.study_plans plans
join public.study_plan_snapshots snapshots on snapshots.id = plans.published_snapshot_id;

create view public.study_plan_published
with (security_invoker = true) as
select plans.canonical_slug as slug, snapshots.document
from public.study_plans plans
join public.study_plan_snapshots snapshots on snapshots.id = plans.published_snapshot_id
union all
select aliases.slug, snapshots.document
from public.study_plan_aliases aliases
join public.study_plans plans on plans.id = aliases.plan_id
join public.study_plan_snapshots snapshots on snapshots.id = plans.published_snapshot_id;

revoke all on table public.study_plans, public.study_plan_snapshots, public.study_plan_aliases from public, anon, authenticated;
revoke all on public.study_plan_catalog, public.study_plan_published from public, anon, authenticated;
grant select on public.study_plan_catalog, public.study_plan_published to anon;

create function public.seed_static_study_plan(
  seed_plan_id uuid,
  seed_snapshot_id uuid,
  seed_canonical_slug text,
  seed_document jsonb,
  seed_catalog jsonb,
  seed_aliases text[]
) returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.study_plans (id, canonical_slug, published_snapshot_id)
  values (seed_plan_id, seed_canonical_slug, seed_snapshot_id)
  on conflict (id) do update
    set canonical_slug = excluded.canonical_slug,
        published_snapshot_id = excluded.published_snapshot_id;

  insert into public.study_plan_snapshots (id, plan_id, document, catalog)
  values (seed_snapshot_id, seed_plan_id, seed_document, seed_catalog)
  on conflict (id) do nothing;

  insert into public.study_plan_aliases (slug, plan_id)
  select alias, seed_plan_id from unnest(seed_aliases) alias
  on conflict (slug) do update set plan_id = excluded.plan_id;
end;
$$;

revoke all on function public.seed_static_study_plan(uuid, uuid, text, jsonb, jsonb, text[]) from public, anon, authenticated;
