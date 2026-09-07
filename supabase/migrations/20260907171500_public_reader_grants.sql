grant select (id, canonical_slug, published_snapshot_id) on public.study_plans to anon;
grant select (id, plan_id, document, catalog) on public.study_plan_snapshots to anon;
grant select (slug, plan_id) on public.study_plan_aliases to anon;
