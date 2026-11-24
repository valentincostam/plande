grant plande_collaboration_writer to postgres;
grant create on schema plan_collaboration to plande_collaboration_writer;
set local role plande_collaboration_writer;

create function plan_collaboration.read_public_proposal(p_plan_id uuid)
returns table(
  proposal_round bigint,
  base_snapshot_id uuid,
  source_snapshot_id uuid,
  argument text
)
language sql stable security definer set search_path = '' as $$
  select proposal.proposal_round, proposal.base_snapshot_id, proposal.source_snapshot_id, proposal.argument
  from plan_collaboration.plan_proposals proposal
  join plan_collaboration.draft_envelopes envelope
    on envelope.plan_id = proposal.plan_id and envelope.proposal_round = proposal.proposal_round
  join plan_collaboration.plan_offer_identity identity on identity.plan_id = proposal.plan_id
  join public.study_plans plan on plan.id = proposal.plan_id
  where proposal.plan_id = p_plan_id
    and proposal.status = 'active'
    and not identity.is_draft
    and plan.published_snapshot_id is not null;
$$;

revoke all on function plan_collaboration.read_public_proposal(uuid)
  from public, anon, authenticated, service_role, plande_collaboration;
grant execute on function plan_collaboration.read_public_proposal(uuid) to plande_collaboration;
alter function plan_collaboration.read_public_proposal(uuid) owner to plande_collaboration_writer;

reset role;
revoke create on schema plan_collaboration from plande_collaboration_writer;
revoke plande_collaboration_writer from postgres;
