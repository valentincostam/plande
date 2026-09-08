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

Run conflict, retry, in-flight, stale-resolution, and cache-failure coverage with:

```sh
PLANDE_CONTROLLED_AUTH=1 BASE_URL=http://127.0.0.1:5174 bunx playwright test e2e/private-progress-controlled.spec.ts e2e/private-progress-retry-controlled.spec.ts --reporter=line
```

Both commands create controlled local Auth identities and remove them during cleanup. They do not print credentials, tokens, grades, or saved records.

## Synchronization contract

The browser keeps anonymous plan storage available, then reconciles it only for the current verified subject. A marker prevents a second account in the same browser from importing the first account's local progress. Account data loads per plan UUID. A different plan starts with its own records.

The client remembers the last confirmed server base and sends changes through `POST /api/private-progress/[planId]`. The first write uses expected version `-1`; later writes use the confirmed nonnegative version. Each logical save has one UUID request ID, expected version, and immutable item payload. The browser writes that pending attempt to the signed-in plan cache before sending it, then reuses it after an ambiguous failure or reload. The database rejects a reused request ID with a different version or payload.

`private_progress_save_once` records the item update and its receipt in one transaction. A repeated matching request returns the receipt's original version. That version can be older than the current server version, so the client fetches and reconciles the current server snapshot before changing its confirmed base or visible session.

The browser also sends the subject it rendered in `x-plande-account`. The command route compares it to the freshly verified request subject and rejects a stale tab when another tab changed the account. This header is a stale-client guard only. The server always derives ownership from the verified JWT subject.

`public.private_progress_save(p_plan_id, p_expected_version, p_items)` determines the owner from the verified JWT subject. Direct table writes are denied to authenticated clients. Historical item rows remain when an item leaves the current plan. The RPC validates current native item IDs and kinds, or already stored historical IDs, before accepting an update.

## Conflicts

Compatible changes merge against the last confirmed base. An incompatible state or grade change remains pending as a conflict and is never overwritten automatically. The conflict UI shows the item, field, and both values. A choice stores the selected alternative with the alternatives it was made against. If the server changes that field before the choice saves, the client shows the conflict again instead of applying the old choice.
