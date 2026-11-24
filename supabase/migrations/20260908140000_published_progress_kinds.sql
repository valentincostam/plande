grant plande_private_progress_writer to postgres;
grant create on schema public to plande_private_progress_writer;
grant select(progress_item_order) on public.study_plans to plande_private_progress_writer;

create function public.study_plan_progress_kinds(p_plan_id uuid)
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_object_agg(position.item_id, evidence.item_kind), '{}'::jsonb)
  from public.study_plans plan
  cross join lateral unnest(plan.progress_item_order) position(item_id)
  cross join lateral public.private_progress_published_item_kind(plan.id, position.item_id) evidence
  where plan.id = p_plan_id and plan.published_snapshot_id is not null
$$;

revoke all on function public.study_plan_progress_kinds(uuid) from public, anon, authenticated, service_role;
grant execute on function public.study_plan_progress_kinds(uuid) to anon, authenticated;
alter function public.study_plan_progress_kinds(uuid) owner to plande_private_progress_writer;
revoke create on schema public from plande_private_progress_writer;
revoke plande_private_progress_writer from postgres;

create or replace view public.study_plan_published
with (security_invoker = true) as
select plans.canonical_slug as slug, snapshots.document, plans.id as plan_id,
  plans.progress_item_order, snapshots.id as snapshot_id,
  public.study_plan_progress_kinds(plans.id) as progress_item_kinds
from public.study_plans as plans
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id
union all
select aliases.slug, snapshots.document, plans.id as plan_id,
  plans.progress_item_order, snapshots.id as snapshot_id,
  public.study_plan_progress_kinds(plans.id) as progress_item_kinds
from public.study_plan_aliases as aliases
join public.study_plans as plans on plans.id = aliases.plan_id
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id;
