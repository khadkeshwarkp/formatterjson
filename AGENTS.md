# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DevTools Workspace is a statically exported Next.js 14 web app (hosted at formatterjson.org) providing browser-based developer tools (JSON formatter, validator, minifier, JSON-to-XML converter, Base64 encode/decode). All data processing happens client-side — there is no backend.

## Build & Dev Commands

- `npm run dev` — Start local dev server
- `npm run build` — Static export to `out/` directory (uses `output: 'export'` in next.config.js)
- `npm run lint` — Run ESLint via `next lint`
- `npm start` — Serve production build

No test framework is configured.

## Architecture

### Tool System

Every tool follows a uniform pipeline: **registry → route page → ToolPage → ToolWorkspace → processor**.

1. **`lib/tools-registry.ts`** — Central registry (`TOOLS` array, `TOOL_MAP`, `CATEGORIES`). Each `ToolMeta` defines id, route, category, sample input, FAQ/SEO content, and related tools. **To add a new tool, start here.**
2. **`app/<tool-id>/page.tsx`** — Thin route page that exports Next.js `Metadata` for SEO and renders `<ToolPage toolId="..." />`.
3. **`components/editor/ToolPage.tsx`** — Client component that syncs the URL to the Zustand store and composes `WorkspaceShell` + `ToolWorkspace` + `ToolSEOContent`.
4. **`components/editor/ToolWorkspace.tsx`** — Core workspace: maps tool IDs to processor functions via `getProcessor()`, wires Monaco input editor to output panel, handles keyboard shortcuts, drag-and-drop file upload, resizable split pane, and the multi-convert bar for JSON tools.
5. **`lib/processors.ts`** — Pure functions (e.g. `formatJson`, `validateJson`, `base64Encode`) that take a string input and return `ProcessResult { output, error, errorLine }`. All new tool logic goes here.

### Multi-Convert Bar

JSON tools show a "Convert to" bar at the bottom when input is present. This uses `CONVERT_TARGETS` in `ToolWorkspace.tsx`, which includes processors that are **not** full tools in the registry: `jsonToCsv` and `jsonToYaml` (defined in `lib/processors.ts`) are only available through this bar, not as standalone tools with their own routes.

### Auto-Run & Keyboard Shortcuts

- Input auto-processes after a **300ms** debounce (not on explicit run).
- `Ctrl/⌘+Enter` — Run processor explicitly
- `Ctrl/⌘+Shift+M` — Quick-minify (JSON tools only)
- `Ctrl/⌘+B` — Toggle sidebar
- `?` — Open keyboard shortcuts modal

### Navigation & Routing

- Root `/` redirects to `/json-formatter` (`app/page.tsx`).
- Sidebar navigation uses `window.history.pushState` for client-side transitions (no full page reloads).
- Static export (`output: 'export'`) with `trailingSlash: true` — all routes end with `/`.

### State Management

`lib/store.ts` — Single Zustand store (`useWorkspaceStore`) with `persist` middleware (localStorage key: `devtools-workspace`). Manages active tool, open tabs, per-tool input/output, theme, sidebar, favorites, recent tools, base64 mode, toasts. The `partialize` option controls what gets persisted.

### Component Layout

- **`components/layout/WorkspaceShell.tsx`** — Top-level shell: Sidebar + TabBar + main content area.
- **`components/layout/Sidebar.tsx`** — Tool navigation with search, recent tools, category grouping. Uses client-side `window.history.pushState` for navigation (not full page loads).
- **`components/editor/MonacoWrapper.tsx`** — Dynamically imported (`next/dynamic`, SSR disabled) Monaco editor wrapper.
- **`components/editor/OutputPanel.tsx`** — Displays processor output with copy/download actions and an optional recursive tree view for JSON output.
- **`components/seo/ToolSEOContent.tsx`** — Renders FAQ structured data (JSON-LD) and SEO content below the workspace, driven by `ToolMeta`.

### Styling

Tailwind CSS with a custom `dt-*` color palette (defined in `tailwind.config.ts`) for all theme colors. Dark mode is class-based (`darkMode: 'class'`), managed by `ThemeProvider`. Global CSS in `styles/globals.css` includes scrollbar styling, resizer handle, toast animations, and Monaco overrides. Fonts: Fira Code (mono), Inter (sans).

### Analytics & Legal

- Google Analytics (`lib/gtag.ts`, GA ID: `G-YBWK7P7H7J`) and AdSense are loaded in `app/layout.tsx` with Google Consent Mode v2 (defaults to denied). `ConsentBanner` handles user consent.
- Legal pages (`/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`) use `LegalPageLayout` wrapper and are standard static content pages outside the tool system.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). All imports use this alias.

## Adding a New Tool

1. Add a `ToolMeta` entry to the `TOOLS` array in `lib/tools-registry.ts` with a unique `id` and `route`.
2. Add the processor function to `lib/processors.ts` returning `ProcessResult`.
3. Register the processor in the `getProcessor()` switch in `components/editor/ToolWorkspace.tsx`.
4. If it's a JSON conversion tool, also add it to `CONVERT_TARGETS` in `ToolWorkspace.tsx`.
5. Create `app/<tool-id>/page.tsx` with SEO metadata and `<ToolPage toolId="<id>" />` (follow `app/json-formatter/page.tsx` as template).
6. If it's a new category, add it to the `CATEGORIES` array in `lib/tools-registry.ts`.
