# Private progress

Private academic progress belongs to one verified account and one stable plan UUID. It is not keyed by a slug, plan year, browser session, or collaboration role.

## Local checks

Run the API and RLS checks against the running local Supabase stack:

```sh
bun run test:private-progress
```

Run the controlled browser flow with the Auth app already running on port 5174:

```sh
PLANDE_CONTROLLED_AUTH=1 BASE_URL=http://127.0.0.1:5174 bunx playwright test e2e/private-progress-controlled.spec.ts --reporter=line
```

Both commands create controlled local Auth identities and remove them during cleanup. They do not print credentials, tokens, grades, or saved records.

## Synchronization contract

The browser keeps anonymous plan storage available, then reconciles it only for the current verified subject. A marker prevents a second account in the same browser from importing the first account's local progress. Account data loads per plan UUID. A different plan starts with its own records.

The client remembers the last confirmed server base and sends changes through `POST /api/private-progress/[planId]`. The first write uses expected version `-1`; later writes use the confirmed nonnegative version. The database returns the next version only after persistence. The UI reports pending, saved, failed, or conflict states and queues a later edit while one save is in flight.

The browser also sends the subject it rendered in `x-plande-account`. The command route compares it to the freshly verified request subject and rejects a stale tab when another tab changed the account. This header is a stale-client guard only. The server always derives ownership from the verified JWT subject.

`public.private_progress_save(p_plan_id, p_expected_version, p_items)` determines the owner from the verified JWT subject. Direct table writes are denied to authenticated clients. Historical item rows remain when an item leaves the current plan. The RPC validates current native item IDs and kinds, or already stored historical IDs, before accepting an update.

## Conflicts

Compatible changes merge against the last confirmed base. An incompatible state or grade change remains pending as a conflict and is never overwritten automatically. VAL-25 owns the interactive resolution interface. This ticket only preserves both alternatives and prevents a stale write from replacing newer data.
