# Plande

Interactive study plans for Argentine universities. Live at [plande.app](https://plande.app).

Students pick their degree, mark each course as not taken, in progress, regular or passed, and Plande shows which courses they can take next, which final exams to prioritize, and how much of the degree is left. Progress lives in the browser and in the URL, so it can be shared as a link. No accounts.

## Status

**Maintenance mode.** The published degrees stay online and free. I do not add new degrees or features. Bug reports for existing study plans are welcome.

## Stack

- SvelteKit 5, TypeScript, Tailwind CSS 4, DaisyUI
- Static study plan data in `src/routes/[slug]/data/`, one file per degree
- Playwright and Vitest for tests

## Development

```bash
bun install
bun run dev
bun run check
bun run test:e2e
```

## License

[MIT](LICENSE). The study plan data comes from public documents published by each university. Always check the official documentation of your university.
