create or replace view public.study_plan_published
with (security_invoker = true) as
select plans.canonical_slug as slug, snapshots.document, plans.id as plan_id,
  plans.progress_item_order, snapshots.id as snapshot_id
from public.study_plans as plans
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id
union all
select aliases.slug, snapshots.document, plans.id as plan_id,
  plans.progress_item_order, snapshots.id as snapshot_id
from public.study_plan_aliases as aliases
join public.study_plans as plans on plans.id = aliases.plan_id
join public.study_plan_snapshots as snapshots on snapshots.id = plans.published_snapshot_id;
