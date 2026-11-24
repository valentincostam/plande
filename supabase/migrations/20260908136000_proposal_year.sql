grant plande_collaboration_writer to postgres;
alter table plan_collaboration.plan_proposals
  add column proposed_plan_year integer;

grant create on schema plan_collaboration to plande_collaboration_writer;
set local role plande_collaboration_writer;

create or replace function plan_collaboration.set_draft_year(p_plan_id uuid,p_year integer,p_actor uuid)
returns table(plan_id uuid, disposition text, conflicting_plan_id uuid)
language plpgsql security definer set search_path = '' as $$
declare v_envelope plan_collaboration.draft_envelopes%rowtype;
  v_identity plan_collaboration.plan_offer_identity%rowtype;
  v_proposal plan_collaboration.plan_proposals%rowtype;
  v_result record;
  v_conflict uuid;
  v_lock_key text;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  if p_year is null then raise exception 'A year is required' using errcode = '22023'; end if;
  select envelope.* into v_envelope from plan_collaboration.draft_envelopes envelope
    where envelope.plan_id = p_plan_id for update;
  select identity.* into v_identity from plan_collaboration.plan_offer_identity identity
    where identity.plan_id = p_plan_id for update;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  if v_identity.is_draft then
    select * into v_result from plan_collaboration.set_draft_year_without_review(p_plan_id,p_year,p_actor);
    if v_result.disposition = 'updated' then
      update plan_collaboration.draft_envelopes envelope
        set review_invalidation_revision = envelope.review_invalidation_revision + 1, updated_at = now()
        where envelope.plan_id = p_plan_id;
      insert into plan_collaboration.draft_coauthors(plan_id, proposal_round, subject_id, first_version)
        values(p_plan_id, v_envelope.proposal_round, p_actor, v_envelope.version) on conflict do nothing;
    end if;
    return query select v_result.plan_id, v_result.disposition, v_result.conflicting_plan_id;
    return;
  end if;
  select * into v_proposal from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = p_plan_id and proposal.proposal_round = v_envelope.proposal_round
      and proposal.status = 'active' for update;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  if v_identity.plan_year is not null then
    if v_identity.plan_year = p_year then
      return query select p_plan_id, 'unchanged'::text, null::uuid;
      return;
    end if;
    raise exception 'A known plan year cannot be changed' using errcode = '22023';
  end if;
  if v_proposal.proposed_plan_year is not null then
    if v_proposal.proposed_plan_year = p_year then
      return query select p_plan_id, 'unchanged'::text, null::uuid;
      return;
    end if;
    raise exception 'A known plan year cannot be changed' using errcode = '22023';
  end if;
  select offer.university_key || chr(31) || offer.offer_key into v_lock_key
    from plan_collaboration.academic_offers offer where offer.id = v_identity.offer_id;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_lock_key, 0));
  select identity.plan_id into v_conflict from plan_collaboration.plan_offer_identity identity
    where identity.offer_id = v_identity.offer_id and identity.plan_year = p_year
      and identity.plan_id <> p_plan_id;
  if v_conflict is not null then
    return query select p_plan_id, 'year_conflict'::text, v_conflict;
    return;
  end if;
  update plan_collaboration.plan_proposals proposal set proposed_plan_year = p_year
    where proposal.plan_id = p_plan_id and proposal.proposal_round = v_envelope.proposal_round;
  update plan_collaboration.draft_envelopes envelope
    set review_invalidation_revision = envelope.review_invalidation_revision + 1, updated_at = now()
    where envelope.plan_id = p_plan_id;
  insert into plan_collaboration.draft_coauthors(plan_id, proposal_round, subject_id, first_version)
    values(p_plan_id, v_envelope.proposal_round, p_actor, v_envelope.version) on conflict do nothing;
  return query select p_plan_id, 'updated'::text, null::uuid;
end;
$$;

create or replace function plan_collaboration.read_draft(p_plan_id uuid)
returns table(plan_id uuid, university_name text, faculty_name text, offer_name text, campus text, modality text, plan_year integer, sources jsonb, content jsonb)
language sql stable security definer set search_path = '' as $$
  select identity.plan_id, offer.university_name, offer.faculty_name, offer.offer_name,
    offer.campus, offer.modality, coalesce(proposal.proposed_plan_year, identity.plan_year),
    coalesce((select jsonb_agg(jsonb_build_object('label', source.label, 'url', source.url) order by source.position)
      from plan_collaboration.draft_sources source
      where source.plan_id = identity.plan_id and source.proposal_round = envelope.proposal_round), '[]'::jsonb),
    envelope.content
  from plan_collaboration.plan_offer_identity identity
  join plan_collaboration.academic_offers offer on offer.id = identity.offer_id
  join plan_collaboration.draft_envelopes envelope on envelope.plan_id = identity.plan_id
  left join plan_collaboration.plan_proposals proposal
    on proposal.plan_id = identity.plan_id and proposal.proposal_round = envelope.proposal_round
      and proposal.status = 'active'
  where identity.plan_id = p_plan_id and (identity.is_draft or proposal.plan_id is not null);
$$;

alter function plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  rename to publish_active_proposal_without_pending_year;

create function plan_collaboration.publish_active_proposal(
  p_plan_id uuid,
  p_expected_review_revision bigint,
  p_expected_discussion_revision bigint,
  p_request_id uuid,
  p_expected_content jsonb,
  p_document jsonb,
  p_catalog jsonb,
  p_manifest jsonb,
  p_actor uuid
) returns table(snapshot_id uuid, canonical_slug text, disposition text, review_revision bigint, discussion_revision bigint, blockers text[])
language plpgsql security definer set search_path = '' as $$
declare v_receipt plan_collaboration.draft_publication_receipts%rowtype;
  v_plan record;
  v_envelope plan_collaboration.draft_envelopes%rowtype;
  v_identity plan_collaboration.plan_offer_identity%rowtype;
  v_proposal plan_collaboration.plan_proposals%rowtype;
  v_lock_key text;
  v_conflict uuid;
  v_result record;
begin
  perform plan_collaboration.require_enabled_actor(p_actor);
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'draft-publication-receipt:' || p_request_id::text, 0
  ));
  select * into v_receipt from plan_collaboration.draft_publication_receipts receipt
    where receipt.request_id = p_request_id;
  if found then
    return query select * from plan_collaboration.publish_active_proposal_without_pending_year(
      p_plan_id, p_expected_review_revision, p_expected_discussion_revision, p_request_id,
      p_expected_content, p_document, p_catalog, p_manifest, p_actor
    );
    return;
  end if;
  select plan.id, plan.canonical_slug, plan.published_snapshot_id into v_plan
    from public.study_plans plan where plan.id = p_plan_id for update;
  select * into v_envelope from plan_collaboration.draft_envelopes envelope
    where envelope.plan_id = p_plan_id for update;
  select * into v_identity from plan_collaboration.plan_offer_identity identity
    where identity.plan_id = p_plan_id for update;
  if not found then raise exception 'Draft unavailable' using errcode = '22023'; end if;
  select * into v_proposal from plan_collaboration.plan_proposals proposal
    where proposal.plan_id = p_plan_id and proposal.proposal_round = v_envelope.proposal_round
      and proposal.status = 'active' for update;
  if not found or v_proposal.proposed_plan_year is null then
    return query select * from plan_collaboration.publish_active_proposal_without_pending_year(
      p_plan_id, p_expected_review_revision, p_expected_discussion_revision, p_request_id,
      p_expected_content, p_document, p_catalog, p_manifest, p_actor
    );
    return;
  end if;
  if v_identity.is_draft or v_identity.plan_year is not null then
    raise exception 'Invalid pending plan year' using errcode = '22023';
  end if;
  select offer.university_key || chr(31) || offer.offer_key into v_lock_key
    from plan_collaboration.academic_offers offer where offer.id = v_identity.offer_id;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_lock_key, 0));
  select identity.plan_id into v_conflict from plan_collaboration.plan_offer_identity identity
    where identity.offer_id = v_identity.offer_id and identity.plan_year = v_proposal.proposed_plan_year
      and identity.plan_id <> p_plan_id;
  if v_conflict is not null then
    return query select null::uuid, v_plan.canonical_slug, 'blocked'::text,
      v_envelope.review_invalidation_revision, v_envelope.discussion_revision, array['year_conflict']::text[];
    return;
  end if;
  update plan_collaboration.plan_offer_identity identity set plan_year = v_proposal.proposed_plan_year
    where identity.plan_id = p_plan_id;
  select * into v_result from plan_collaboration.publish_active_proposal_without_pending_year(
    p_plan_id, p_expected_review_revision, p_expected_discussion_revision, p_request_id,
    p_expected_content, p_document, p_catalog, p_manifest, p_actor
  );
  if v_result.disposition <> 'published' then
    update plan_collaboration.plan_offer_identity identity set plan_year = null
      where identity.plan_id = p_plan_id;
  end if;
  return query select v_result.snapshot_id, v_result.canonical_slug, v_result.disposition,
    v_result.review_revision, v_result.discussion_revision, v_result.blockers;
end;
$$;

revoke all on function plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  from public, anon, authenticated, service_role, plande_collaboration;
grant execute on function plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid)
  to plande_collaboration_writer;
alter function plan_collaboration.set_draft_year(uuid,integer,uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.read_draft(uuid) owner to plande_collaboration_writer;
alter function plan_collaboration.publish_active_proposal(uuid,bigint,bigint,uuid,jsonb,jsonb,jsonb,jsonb,uuid) owner to plande_collaboration_writer;

reset role;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
