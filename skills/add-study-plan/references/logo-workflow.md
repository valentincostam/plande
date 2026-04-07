# Logo Workflow

When the university has no existing plan in the app, add logo assets.

## Files

- homepage logo: `static/{universitySlugLower}.png`
- Open Graph logo: `static/og-logos/{universitySlugLower}.png`

## Steps

1. Find the official university logo.
2. Prefer PNG with transparent background.
3. Save homepage asset to `static/{slug}.png`.
4. Create Open Graph asset resized to max 200px width.

Example:

```bash
sips --resampleWidth 200 "static/{slug}.png" --out "static/og-logos/{slug}.png"
```

If the source image is actually JPEG data, convert it:

```bash
sips -s format png --resampleWidth 200 "static/{slug}.png" --out "static/og-logos/{slug}.png"
```

Target:

- ideally under 20KB
- acceptable up to 50KB

Verify the files render correctly in the homepage and OG generation path.
