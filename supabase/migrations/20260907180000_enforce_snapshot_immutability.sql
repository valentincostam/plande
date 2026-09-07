create function public.reject_study_plan_snapshot_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'Published study plan snapshots are immutable'
    using errcode = '55000';
end;
$$;

revoke all on function public.reject_study_plan_snapshot_mutation()
  from public, anon, authenticated, service_role;

create trigger study_plan_snapshots_are_immutable
before update or delete on public.study_plan_snapshots
for each row execute function public.reject_study_plan_snapshot_mutation();

grant execute on function public.seed_static_study_plan(uuid, uuid, text, jsonb, jsonb, text[])
  to service_role;
