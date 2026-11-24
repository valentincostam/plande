grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;

create function plan_collaboration.add_draft_source(
  p_plan_id uuid,p_expected_revision bigint,p_label text,p_url text,p_actor uuid
) returns table(disposition text,review_revision bigint)
language plpgsql security definer set search_path = '' as $$
declare v_review record; v_version bigint; v_revision bigint;
begin
  select * into v_review from plan_collaboration.lock_draft_review(p_plan_id,p_actor);
  if p_expected_revision is null or p_expected_revision <> v_review.review_revision then
    return query select 'version_conflict'::text,v_review.review_revision::bigint;
    return;
  end if;
  if p_label is null or length(btrim(p_label)) not between 1 and 2000
    or p_url is null or length(btrim(p_url)) > 2048
    or btrim(p_url) !~* '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$' then
    raise exception 'Invalid source' using errcode='22023';
  end if;
  if exists(select 1 from plan_collaboration.draft_sources s
    where s.plan_id=p_plan_id and s.label=btrim(p_label) and s.url=btrim(p_url)) then
    return query select 'unchanged'::text,v_review.review_revision::bigint;
    return;
  end if;
  if jsonb_array_length(v_review.sources)>=100 then raise exception 'Too many sources' using errcode='22023'; end if;
  insert into plan_collaboration.draft_sources(id,plan_id,label,url,position)
    select gen_random_uuid(),p_plan_id,btrim(p_label),btrim(p_url),coalesce(max(s.position)+1,0)
    from plan_collaboration.draft_sources s where s.plan_id=p_plan_id;
  update plan_collaboration.draft_envelopes e
    set review_invalidation_revision=e.review_invalidation_revision+1,updated_at=now()
    where e.plan_id=p_plan_id returning e.version,e.review_invalidation_revision into v_version,v_revision;
  insert into plan_collaboration.draft_coauthors(plan_id,subject_id,first_version)
    values(p_plan_id,p_actor,v_version) on conflict do nothing;
  return query select 'added'::text,v_revision;
end;
$$;

revoke all on function plan_collaboration.add_draft_source(uuid,bigint,text,text,uuid)
  from public,anon,authenticated,service_role;
grant execute on function plan_collaboration.add_draft_source(uuid,bigint,text,text,uuid)
  to plande_collaboration,plande_collaboration_writer;
alter function plan_collaboration.add_draft_source(uuid,bigint,text,text,uuid) owner to plande_collaboration_writer;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
