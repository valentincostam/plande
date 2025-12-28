---
description: Save session learnings to appropriate AGENTS.md files
---

Analyze the current conversation and extract important learnings.

## Instructions

1. **Review the conversation** looking for:
   - Architecture decisions made
   - Bugs found and their solutions
   - Patterns that worked well
   - Avoidable mistakes
   - New knowledge about the project

2. **Categorize each learning**:
   - **Architecture**: Design decisions, trade-offs
   - **Bugs & Solutions**: Problems and how they were resolved
   - **Patterns**: Conventions, effective approaches
   - **Testing**: E2E testing learnings
   - **Performance**: Performance-related insights

3. **Choose the appropriate AGENTS.md file**:
   - `AGENTS.md` (root): Global project learnings
   - `src/lib/AGENTS.md`: Core logic, encoding, state
   - `src/routes/AGENTS.md`: UI, Svelte components
   - `e2e/AGENTS.md`: E2E testing

4. **Format each entry**:
```markdown
- **[Brief title]** ([date]): [Concise description]
  - Context: [Why this is important]
  - Files: [relevant paths if applicable]
```

5. **Update the "Last updated" date** in each modified file.

6. **Show summary** of what learnings were saved and where.

## Expected Output Example

```
Saved 3 learnings:

AGENTS.md (root)
  - Encoding rule: States use base64url

src/lib/AGENTS.md  
  - Bug fix: grade-encoding fails with grades >10

e2e/AGENTS.md
  - Pattern: Use exact:true for similar course names
```
