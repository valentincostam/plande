create table public.private_progress_save_receipts (
  owner_id uuid not null,
  plan_id uuid not null,
  request_id uuid not null,
  request_fingerprint bytea not null,
  version bigint not null check (version >= 0),
  created_at timestamptz not null default now(),
  primary key (owner_id, plan_id, request_id),
  foreign key (owner_id, plan_id)
    references public.private_plan_progress(owner_id, plan_id) on delete cascade
);

alter table public.private_progress_save_receipts enable row level security;
alter table public.private_progress_save_receipts force row level security;
revoke all on public.private_progress_save_receipts from public, anon, authenticated, service_role;
grant select, insert on public.private_progress_save_receipts to plande_private_progress_writer;

create policy "writer reads own save receipts"
  on public.private_progress_save_receipts for select to plande_private_progress_writer
  using (owner_id = public.private_progress_owner_id());
create policy "writer creates own save receipts"
  on public.private_progress_save_receipts for insert to plande_private_progress_writer
  with check (owner_id = public.private_progress_owner_id());

grant plande_private_progress_writer to postgres;
grant create on schema public to plande_private_progress_writer;

create function public.private_progress_save_once(
  p_plan_id uuid,
  p_expected_version bigint,
  p_items jsonb,
  p_request_id uuid
) returns table(version bigint)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner_id uuid := public.private_progress_owner_id();
  v_fingerprint bytea;
  v_receipt public.private_progress_save_receipts%rowtype;
  v_version bigint;
begin
  if v_owner_id is null then
    raise exception 'Private progress requires authentication' using errcode = '42501';
  end if;
  if p_request_id is null or p_plan_id is null or p_expected_version is null
    or p_expected_version < -1 or p_items is null then
    raise exception 'Private progress request is invalid' using errcode = '22023';
  end if;

  v_fingerprint := pg_catalog.sha256(pg_catalog.convert_to(
    pg_catalog.jsonb_build_array(p_expected_version, p_items)::text, 'UTF8'
  ));
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'private-progress-receipt:' || v_owner_id::text || ':' || p_plan_id::text || ':' || p_request_id::text, 0
  ));

  select receipt.* into v_receipt
  from public.private_progress_save_receipts as receipt
  where receipt.owner_id = v_owner_id and receipt.plan_id = p_plan_id
    and receipt.request_id = p_request_id;
  if found then
    if v_receipt.request_fingerprint <> v_fingerprint then
      raise exception 'Private progress request identity was reused' using errcode = '22023';
    end if;
    return query select v_receipt.version;
    return;
  end if;

  select saved.version into strict v_version
  from public.private_progress_save(p_plan_id, p_expected_version, p_items) as saved;

  insert into public.private_progress_save_receipts
    (owner_id, plan_id, request_id, request_fingerprint, version)
  values (v_owner_id, p_plan_id, p_request_id, v_fingerprint, v_version);
  return query select v_version;
end;
$$;

revoke all on function public.private_progress_save_once(uuid, bigint, jsonb, uuid)
  from public, anon, authenticated, service_role;
grant execute on function public.private_progress_save_once(uuid, bigint, jsonb, uuid) to authenticated;
alter function public.private_progress_save_once(uuid, bigint, jsonb, uuid)
  owner to plande_private_progress_writer;
revoke create on schema public from plande_private_progress_writer;
revoke plande_private_progress_writer from postgres;
