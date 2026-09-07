grant select (id, canonical_slug, published_snapshot_id) on public.study_plans to anon;
grant select (id, plan_id, document, catalog) on public.study_plan_snapshots to anon;
grant select (slug, plan_id) on public.study_plan_aliases to anon;

create or replace function public.seed_static_study_plan(
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
declare
  existing_snapshot public.study_plan_snapshots;
  existing_plan public.study_plans;
begin
  select * into existing_snapshot from public.study_plan_snapshots where id = seed_snapshot_id;
  if found and (existing_snapshot.document <> seed_document or existing_snapshot.catalog <> seed_catalog) then
    raise exception 'seed snapshot % differs from its immutable baseline', seed_snapshot_id;
  end if;

  select * into existing_plan from public.study_plans where id = seed_plan_id;
  if found then
    if existing_plan.canonical_slug <> seed_canonical_slug or existing_plan.published_snapshot_id <> seed_snapshot_id then
      raise exception 'seed plan % differs from its immutable baseline', seed_plan_id;
    end if;
  else
    insert into public.study_plans (id, canonical_slug, published_snapshot_id)
    values (seed_plan_id, seed_canonical_slug, seed_snapshot_id);
  end if;

  insert into public.study_plan_snapshots (id, plan_id, document, catalog)
  values (seed_snapshot_id, seed_plan_id, seed_document, seed_catalog)
  on conflict (id) do nothing;

  insert into public.study_plan_aliases (slug, plan_id)
  select alias, seed_plan_id from unnest(seed_aliases) alias
  on conflict (slug) do nothing;
end;
$$;
