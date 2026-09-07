# Collaboration QA

`e2e/collaboration.spec.ts` uses a controlled local password account to create a draft through the browser. It leaves both source fields empty, repeats the same offer and year, then opens the returned link in a fresh anonymous context.

Run it only after the collaboration migration is applied and the QA app has the restricted collaboration connection:

```sh
PLANDE_CONTROLLED_COLLABORATION=1 BASE_URL=http://127.0.0.1:5174 bunx playwright test e2e/collaboration.spec.ts --reporter=line
```

The test creates an Auth identity and deletes only the plan and identity marked by its unique fixture value. It does not reset Supabase or print local credentials.
