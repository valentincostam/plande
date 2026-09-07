# Authentication

Plande keeps plan browsing and local academic progress available without an account. Signing in with Google starts at `/auth/sign-in`, returns through `/auth/callback`, and stores the Supabase SSR session in cookies.

The server reads `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. `SUPABASE_ANON_KEY` remains a compatibility fallback. App runtime never uses a service-role key.

`src/hooks.server.ts` validates identity with `getClaims()`. Server authorization must use this validated context, never a client-supplied actor, role, suspension field, or unvalidated `getSession()` user.

Requests carrying Supabase cookies, authentication routes, and responses that refresh cookies use `Cache-Control: private, no-store`. Layout data contains only the verified subject and an unavailable-validation flag. It never contains cookie or token values.

The current identity is only the verified subject. Do not log emails, tokens, cookies, request bodies, query strings, or callback codes. `logAuthEvent` records only operation, outcome, duration, version, and a correlation ID with isolated context.

Signing out clears Supabase's previous authentication cookies. It does not alter anonymous local progress or imply that private progress was synchronized.

Run `bun run auth:dev` for the isolated local Auth app and `bun run test:auth` for its browser checks. Command-level tests verify OAuth and callback contracts. Browser tests verify real local password sessions through SSR cookies. A successful external Google callback remains unverified until Google provider credentials are configured.

Start the [local Supabase stack](supabase-local.md) first. Keep the Auth app running on 5174 in a separate terminal while running the suite. The default browser suite remains available without credentials; it excludes these dedicated Auth tests. Auth traces are disabled to avoid saving session cookies in artifacts. Each controlled run creates uniquely named local identities and attempts to delete all of them in cleanup.

Browser interactions use visible controls. Response inspection is limited to security contracts: the authenticated response identifies only the current verified subject, contains no fixture secrets, and carries private/no-store headers. It does not assert component markup or use response data to change the interface. Callback success is tested at the application-command boundary with the external Auth SDK substituted; it does not claim a live Google login.
