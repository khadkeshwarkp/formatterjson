# SEO Checklist for formatterjson.org

A comprehensive checklist to ensure the developer tools site is optimized for search engines and user discovery.

---

## On-Page SEO

### Meta Tags (Per Tool Page)
- [ ] **Title tag** — Unique, under 60 characters, includes primary keyword (e.g. "JSON Formatter — Beautify JSON Online Free")
- [ ] **Meta description** — Unique, under 155 characters, includes CTA or value proposition
- [ ] **Canonical URL** — Set without trailing slash, points to primary URL
- [ ] **Open Graph** — `og:title`, `og:description`, `og:url` for social sharing
- [ ] **Twitter Card** — `twitter:title`, `twitter:description` for Twitter previews
- [ ] **Robots** — `noindex` injected for share links (`?data=`) to avoid duplicate content

### Content Structure
- [ ] **Single H1** — One primary H1 per page matching the tool name + primary keyword
- [ ] **Semantic headings** — H2, H3 hierarchy for sections (What is, How to Use, Example, FAQ)
- [ ] **Long-form content** — 800–1200 words per tool page (expand `seoExtra.longDescription` where needed)
- [ ] **Internal links** — At least 3 related tools linked from each page
- [ ] **Keyword placement** — Primary keyword in H1, first paragraph, one H2; avoid stuffing

### Structured Data (JSON-LD)
- [ ] **FAQPage schema** — For FAQ section (5 items per tool)
- [ ] **BreadcrumbList schema** — Home → Tool name
- [ ] **WebApplication schema** — Name, description, URL, applicationCategory, offers (free)
- [ ] **Schema URLs** — Without trailing slash, match canonicals

---

## Technical SEO

### Crawlability
- [ ] **Sitemap** — `/sitemap.xml` includes all tool routes, legal pages, correct `lastModified`
- [ ] **Robots.txt** — Allows crawling of /, /sitemap.xml; no blocking of tool routes
- [ ] **Valid HTML** — No duplicate IDs, proper nesting, valid meta tags

### Performance
- [ ] **Core Web Vitals** — LCP, FID, CLS within good thresholds
- [ ] **Static export** — All tool pages pre-rendered at build (no blocking client data)
- [ ] **Image optimization** — If any images, use Next.js Image or appropriate formats

### URL Structure
- [ ] **Clean URLs** — `/json-formatter`, `/xml-validator` (no query params for canonical)
- [ ] **Consistent trailing slash** — Match `next.config` (currently `trailingSlash: false`)
- [ ] **No duplicate content** — Share links (`?data=`) noindexed

---

## Content Quality

### Uniqueness
- [ ] **No duplicated content** — Each tool page has unique longDescription, FAQ, use cases
- [ ] **Unique comparison tables** — Tool-specific comparison rows, not copied across tools
- [ ] **Unique examples** — Sample input/output differs per tool

### User Intent
- [ ] **Clear value proposition** — "Free", "100% client-side", "No sign-up" in copy
- [ ] **How-to instructions** — Numbered steps (paste → run → copy/download)
- [ ] **Common errors** — Tool-specific errors and fixes
- [ ] **Use cases** — 4–5 real-world scenarios per tool

### High-Volume Keywords to Target
| Keyword | Tool(s) |
|---------|---------|
| json viewer | json-formatter, json-viewer |
| json parser online | json-formatter, json-validator |
| json pretty print | json-formatter |
| html formatter online | html-formatter |
| url encoder decoder | url-encode, url-decode |
| xml formatter online | xml-formatter |
| base64 encode decode | base64 |
| yaml formatter | yaml-formatter |

---

## Navigation & Internal Linking

### Sidebar
- [ ] **All tools listed** — Every tool in TOOLS registry appears in sidebar
- [ ] **Category grouping** — JSON, YAML, XML, Security, Encoding
- [ ] **Click updates content** — Active tool drives workspace and SEO section (displayToolId)

### Within Content
- [ ] **Related tools section** — 3 links to related tools (from `relatedTools`)
- [ ] **All tools footer** — Full list of tools for internal link equity

### Routing
- [ ] **Client-side navigation** — Sidebar uses pushState; SEO content must update with activeTool
- [ ] **Direct URL loads** — Full page load shows correct tool and SEO for that route

---

## Pre-Launch Verification

### Per Tool
- [ ] Title unique and under 60 chars
- [ ] Meta description unique and under 155 chars
- [ ] H1 matches tool + primary keyword
- [ ] 5 FAQ items with FAQ schema
- [ ] Breadcrumb and WebApplication schema present
- [ ] 3 related tools linked
- [ ] No keyword stuffing
- [ ] Content 800+ words (expand where thin)

### Global
- [ ] Sitemap includes all routes
- [ ] No broken internal links
- [ ] Canonicals match actual URLs (no trailing slash)
- [ ] Share links noindexed
- [ ] Mobile-friendly (responsive layout)

---

## New Tool Additions (Process)

When adding a new tool:

1. Add `ToolMeta` to `lib/tools-registry.ts` with full SEO fields
2. Add processor to `lib/processors.ts`
3. Register in `ToolWorkspace` (`getProcessor`, `getInputLanguage`, `getOutputLanguage`)
4. Create `app/<tool-id>/page.tsx` with metadata
5. Add route to `app/sitemap.ts`
6. Ensure unique content (no copy-paste from other tools)
7. Set `relatedTools` to 3 relevant tools
8. Verify download extension for output format

---

## Monitoring (Post-Launch)

- [ ] Google Search Console — Submit sitemap, monitor indexing
- [ ] Core Web Vitals in GSC
- [ ] 404 monitoring
- [ ] Check for duplicate content issues
- [ ] Track rankings for primary keywords
