# Local Supabase reader

Requires Docker and Bun. The Supabase CLI version is pinned in package.json. These commands do not link a remote project or change production.

```sh
bun install --frozen-lockfile
bunx supabase start >/dev/null
bunx supabase migration up --local
bun run supabase:seed
bun run test:supabase
bun run supabase:dev
```

Run one stack startup at a time. Concurrent starts can remove containers that another startup is creating. API uses port 55421, PostgreSQL 55422, Studio 55423. The reader app uses 5175; authentication browser tests use 5174. Stop the app with Ctrl-C. Do not reset a database while another agent is using it.

`scripts/local-supabase.ts` reads CLI status into memory and injects local credentials without printing them or writing an env file. It rejects remote URLs. Only seed and test processes receive the local service-role key; the dev server receives the publishable key. CLI status and startup output may contain local credentials, so do not paste their raw output into logs or issues.

## Reader selection

The default reader still uses static metadata and dynamically loads one native plan. `PLANDE_STUDY_PLAN_READER=supabase` selects the database reader, requiring `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. `SUPABASE_ANON_KEY` is accepted for local compatibility. A failed database request does not fall back to static content.

The database stores immutable native documents and lightweight catalog metadata separately from stable plan identity. Public queries select only the published snapshot. PostgreSQL blocks snapshot updates and deletes, including service-role updates. Publications can later replace the plan pointer without rewriting a snapshot.

`supabase/static-plan-identities.json` assigns fixed planId and snapshotId values to the initial 47 plans. Its keys identify the original import, not a runtime identity algorithm. Never regenerate UUIDs after a slug or year change. An identical seed is repeatable; a changed baseline is rejected. Future academic corrections need the publication workflow, not edits to seeded documents.

## Verification

`bun run test:supabase` compares all 47 stored documents and catalog entries against static definitions, checks fixed IDs and every alias, and tests PostgreSQL through the public HTTP API. It verifies publication filtering, denied private Auth access, denied writes and RPC calls, minimal column grants, changed-seed rejection, and snapshot immutability. It leaves one deterministic unpublished test plan and snapshot in the local database to exercise RLS. They are never in the public catalog. They are test fixtures, not student content.

The security-invoker views need SELECT on the columns they reference. Anon receives those columns only; RLS still filters the underlying tables to published records. Direct base-table reads are tested as well as views. Infrastructure credentials remain outside application authorization.

Run the browser regressions with the reader app already running:

```sh
BASE_URL=http://127.0.0.1:5175 bunx playwright test --workers=4 --reporter=line
PLANDE_QA_READER=1 BASE_URL=http://127.0.0.1:5175 bunx playwright test e2e/supabase-privacy.spec.ts --reporter=line
```

Auth integration tests use their separate configuration and controlled local identities. A successful local identity is not evidence of a working Google provider. See [Authentication](auth.md).

`PUBLIC_PLANDE_ENV=qa` or `pilot` disables Clarity and Vercel Analytics. The local dev wrapper sets qa. Default production telemetry is unchanged. Do not use real progress for QA. The native schema rejects malformed external documents before they reach the typed engine, without including payloads in errors.

No production migration, deployment, credential provisioning, or Google provider setup is performed by these commands.

## Collaboration development

After the collaboration migration is applied, run `bun run test:collaboration` before starting a collaboration-enabled app. The wrapper reads local setup credentials into memory, rotates the password of `plande_collaboration`, and gives the test process its restricted connection URL. It does not print that URL or write an env file. Setup accepts only the dedicated PostgreSQL database on loopback port 55422. Password setup sends a SCRAM verifier to PostgreSQL, not the plaintext password.

For the app, stop only the existing 5174 app process, then run:

```sh
PLANDE_LOCAL_COLLABORATION=1 bun run auth:dev
```

This rotates the restricted password again and injects `COLLABORATION_DATABASE_URL` into the server process. Do not run these provisioning commands concurrently or while another collaboration test is using that role. Existing connections may survive a rotation, but new connections from an older app process will fail. Restart that named app through the wrapper after database tests.

The application uses Postgres.js with the restricted LOGIN role. That role can execute the collaboration functions but cannot read their tables or private progress. Public search and draft reads expose unreviewed metadata, not a private workspace. Authentication and private progress continue to use the request-scoped Supabase client. Never configure the application with the setup/admin database URL or a service-role key.
