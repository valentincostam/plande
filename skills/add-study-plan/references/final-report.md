# Final QA Report

End the task with a short report.

Keep it brief and concrete.

## Include

- created file path
- registered slug
- whether a logo was added
- checks run
- local URLs used
- source URLs or source files used
- representative courses checked
- any differences found
- any remaining uncertainty

## Template

```md
## Result

- Added: `src/routes/[slug]/data/{slug}.ts`
- Registered slug: `{slug}`
- Logo added: yes/no

## Checks

- `bun run check`
- source vs local browser comparison

## QA URLs

- local: `http://localhost:5173/{slug}`
- source: `<official url or file list>`

## Spot Checks

- `<course 1>`
- `<course 2>`
- `<course 3>`

## Findings

- no differences found

## Remaining Uncertainty

- none
```

If there is uncertainty, say exactly what was ambiguous and whether user confirmation is still needed.
