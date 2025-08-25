# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run dev -- --open` - Start development server and open in browser

### Quality Assurance
- `npm run check` - Type checking with svelte-check
- `npm run check:watch` - Type checking in watch mode
- `npm run lint` - Run Prettier and ESLint checks
- `npm run format` - Format code with Prettier

### Build & Deploy
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

## Architecture

This is a SvelteKit 5 application built with TypeScript and styled with TailwindCSS. It's a career planning tool that displays academic programs and course progression for multiple universities.

### Key Architectural Concepts

**Dynamic Route System**: The app uses SvelteKit's dynamic routing with `[slug]` to serve different academic programs. Each program is identified by a slug (e.g., 'utn-frcu-isi', 'ucu-fau-arq') and loads specific career data.

**Career Data Structure**: Academic programs are defined as structured data files in `src/routes/[slug]/` with the pattern `*-data.ts`. Each contains:
- Course definitions with requirements, terms, and years
- Degree and college information  
- Progress tracking configuration
- Source references

**State Management**: Uses URL-based course state persistence via query parameters with course state encoding/decoding system for sharing progress.

**Component Architecture**: 
- Page-level components in `src/routes/[slug]/` handle career-specific UI
- Shared library components in `src/lib/` for data modeling
- Each career page dynamically renders courses, requirements, and progress charts

### Data Flow

1. Route loads based on slug parameter in `+page.ts`
2. Career-specific data file is imported and combined with URL state
3. Course states are decoded from URL parameters for persistence
4. Components render interactive course progression with real-time updates
5. State changes update URL for sharing and persistence

### Key Libraries & Technologies

- **Svelte 5**: Uses new runes system for reactive state management
- **SvelteKit**: Full-stack framework with file-based routing
- **TailwindCSS 4**: Utility-first CSS framework
- **TypeScript**: Full type safety across the application
- **Marked**: Markdown parsing for content rendering