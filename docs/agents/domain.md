# Domain docs

These rules define how engineering skills read this repository's domain documentation.

## Before exploring

Read the following files when they exist:

- `CONTEXT.md` at the repository root
- Relevant ADRs under `docs/adr/`

If these files do not exist, continue without reporting their absence. The `domain-modeling` skill creates them when the project resolves domain terms or architectural decisions.

## File structure

This repository uses a single-context layout:

```text
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-example-decision.md
│   └── 0002-another-decision.md
└── src/
```

## Use the glossary's vocabulary

When output names a domain concept, use the term defined in `CONTEXT.md`. This applies to issue titles, refactoring proposals, hypotheses, and test names.

If `CONTEXT.md` does not define the required concept, reconsider whether the term belongs to the project. Record genuine terminology gaps for the `domain-modeling` skill.

## Report ADR conflicts

If proposed work contradicts an existing ADR, state the conflict and identify the ADR instead of overriding it silently.
