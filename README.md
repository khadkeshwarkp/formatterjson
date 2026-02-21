# DevTools Workspace — Free Online JSON, YAML, XML & Encoding Tools

**Free, private, client-side developer tools.** Format, validate, minify, and convert JSON, YAML, XML, and more. All processing runs in your browser; nothing is sent to any server.

🌐 **Live site:** [formatterjson.org](https://formatterjson.org)

---

## Features

- **100% client-side** — Your data never leaves your device. No server uploads.
- **Monaco editor** — Syntax highlighting, line numbers, and keyboard shortcuts.
- **Dark / light theme** — System preference or manual toggle.
- **Multi-convert bar** — From JSON: convert to CSV, YAML, or XML in one click.
- **Keyboard shortcuts** — Run (Ctrl+Enter), minify (Ctrl+Shift+M), toggle sidebar (Ctrl+B), shortcuts help (?).
- **Static export** — Next.js static site; easy to host anywhere (Vercel, Netlify, GitHub Pages).

---

## Tools

### JSON
| Tool | Description |
|------|-------------|
| [JSON Formatter](https://formatterjson.org/json-formatter/) | Beautify and pretty-print JSON with indentation |
| [JSON Validator](https://formatterjson.org/json-validator/) | Validate JSON and get clear error messages |
| [JSON Minifier](https://formatterjson.org/json-minifier/) | Compress JSON by removing whitespace |
| [JSON Diff](https://formatterjson.org/json-diff/) | Compare two JSON documents side by side |
| [JSON to XML](https://formatterjson.org/json-to-xml/) | Convert JSON to XML |
| [JSON to CSV](https://formatterjson.org/json-to-csv/) | Convert JSON arrays to CSV |
| [JSON to YAML](https://formatterjson.org/json-to-yaml/) | Convert JSON to YAML |
| [CSV to JSON](https://formatterjson.org/csv-to-json/) | Convert CSV to JSON |
| [JSON Schema Generator](https://formatterjson.org/json-schema-generator/) | Generate JSON Schema from sample JSON |
| [JSON Viewer](https://formatterjson.org/json-viewer/) | Tree view and inspect JSON |
| [JSON Parser](https://formatterjson.org/json-parser/) | Parse and validate JSON with error details |
| [JSON Pretty Print](https://formatterjson.org/json-pretty-print/) | Pretty-print JSON (alternate entry) |

### YAML
| Tool | Description |
|------|-------------|
| [YAML Formatter](https://formatterjson.org/yaml-formatter/) | Format and beautify YAML |
| [YAML to JSON](https://formatterjson.org/yaml-to-json/) | Convert YAML to JSON |

### XML
| Tool | Description |
|------|-------------|
| [XML Formatter](https://formatterjson.org/xml-formatter/) | Format and indent XML |
| [XML Validator](https://formatterjson.org/xml-validator/) | Validate XML syntax |
| [XML to JSON](https://formatterjson.org/xml-to-json/) | Convert XML to JSON |

### Markup
| Tool | Description |
|------|-------------|
| [HTML Formatter](https://formatterjson.org/html-formatter/) | Format and indent HTML |

### Security
| Tool | Description |
|------|-------------|
| [JWT Decoder](https://formatterjson.org/jwt-decoder/) | Decode and inspect JWT headers and payloads |

### Encoding
| Tool | Description |
|------|-------------|
| [Base64 Encode / Decode](https://formatterjson.org/base64/) | Encode text to Base64 and decode Base64 to text |
| [URL Encode](https://formatterjson.org/url-encode/) | Percent-encode strings for URLs |
| [URL Decode](https://formatterjson.org/url-decode/) | Decode percent-encoded URLs |

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, static export)
- **Language:** TypeScript
- **State:** [Zustand](https://github.com/pmndrs/zustand) with persist (localStorage)
- **Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VS Code editor in the browser)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom `dt-*` theme palette
- **Data:** [js-yaml](https://github.com/nodeca/js-yaml), native JSON/XML; no backend

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Install and run

```bash
git clone https://github.com/khadkeshwarkp/formatterjson1.git
cd formatterjson1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs as a static-friendly Next.js app with client-side routing.

### Build for production

```bash
npm run build
```

Output is in the `out/` directory (static export). Serve with any static host:

```bash
npm start
# or: npx serve out
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Project structure (high level)

- `app/` — Next.js App Router pages and layout; each tool has a route under `app/<tool-id>/page.tsx`.
- `components/` — `ToolPage`, `ToolWorkspace`, `MonacoWrapper`, `OutputPanel`, `WorkspaceShell`, `Sidebar`, SEO components.
- `lib/` — `tools-registry.ts` (all tool metadata and SEO content), `processors.ts` (pure transform functions), `store.ts` (Zustand store).
- `styles/` — Global CSS and Tailwind.

New tools are added by: (1) adding a `ToolMeta` in `lib/tools-registry.ts`, (2) implementing a processor in `lib/processors.ts`, (3) registering it in `ToolWorkspace.tsx`, (4) adding `app/<tool-id>/page.tsx`. See [AGENTS.md](./AGENTS.md) for full architecture.

---

## SEO and privacy

- **SEO:** Each tool page has unique meta title, description, and FAQ JSON-LD. Sitemap and structure follow static export with `trailingSlash: true`.
- **Privacy:** No analytics or tracking until consent. No server-side processing; all tool logic runs in the browser.
- **Hosting:** Suitable for [formatterjson.org](https://formatterjson.org), Vercel, Netlify, or any static host.

---

## License

MIT. See [LICENSE](./LICENSE) if present.

---

## Keywords (for discoverability)

JSON formatter, JSON validator, JSON minifier, YAML formatter, XML formatter, Base64 encode decode, JWT decoder, CSV to JSON, JSON to XML, JSON to YAML, online developer tools, free formatter, pretty print JSON, validate JSON online, client-side tools, formatterjson.
