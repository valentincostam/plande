grant plande_collaboration_writer to postgres;
set local role plande_collaboration_writer;
grant execute on function plan_collaboration.open_plan_proposal(uuid,uuid,uuid,uuid,text,jsonb,uuid)
  to plande_collaboration;
reset role;
revoke plande_collaboration_writer from postgres;
