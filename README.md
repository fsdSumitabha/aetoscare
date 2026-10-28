# AETOS — aetoscare.com

Marketing site for **AETOS (Aetos Health)**: turnkey Remote Patient Monitoring (RPM), Chronic Care Management (CCM) and related care-management programs for US medical practices.

Built with **Next.js 16 (App Router)**, React 19, TypeScript and Tailwind CSS v4. Every section is a React **Server Component**, so the full page ships as pre-rendered HTML for search engines. There are only two small client islands, and both are still server-rendered:

- the revenue estimator, which renders with its default values
- the desktop nav dropdown toggle (`NavDisclosure`), which shows and hides menu links that are already server-rendered

The mobile menu (native `<dialog>` with Invoker Commands, falling back to the Popover API), the FAQ accordion (`<details>`) and the animation pause toggle need no JavaScript.

## Scripts

```bash
npm run dev     # local dev server on http://localhost:3000
npm run build   # production build (prerenders the home page)
npm run start   # serve the production build
npm run lint    # ESLint (next/core-web-vitals + TypeScript)
```

## Project structure

```
app/
  layout.tsx            Root layout: fonts, global metadata, skip link, header + footer
  page.tsx              Home page: section composition, page metadata, JSON-LD
  globals.css           Design tokens (@theme) and custom utilities
  opengraph-image.tsx   Generated 1200×630 social card
  icon.svg, apple-icon.tsx, manifest.ts, robots.ts, sitemap.ts, not-found.tsx
components/
  layout/               SiteHeader, DesktopNav, MobileNav, SiteFooter
  sections/<name>/      One folder per home-page section (split into sub-components)
  ui/                   Section, SectionHeading, Eyebrow, ButtonLink, Logo
  seo/json-ld.tsx       Structured-data <script> renderer
lib/
  site.ts               Site config, contact details, navigation
  content/home.ts       All home-page copy (edit text here, not in components)
  seo/structured-data.ts  schema.org graph (MedicalOrganization, WebSite, WebPage, FAQPage)
  brand/logo-paths.ts   AETOS wordmark path data
```

## Design system

- **Palette**: `ink` (clinical navy neutrals), `brand` (AETOS azure), `vital` (mint, for healthy/live states), `pulse` (coral, for alerts), plus `canvas` and `line` surfaces. All tokens live in `app/globals.css`.
- **Type**: Geist (UI and headings), Instrument Serif italic (accent words), Geist Mono (data, codes and labels), all self-hosted through `next/font`.
- **Motif**: the crosshair "O" from the AETOS logo (`<LogoMark />`) shows up as rings, targets and eyebrow glyphs, alongside ECG lines and live-data UI fragments.
- **Motion**: CSS only, including scroll-driven reveals and header elevation as progressive enhancement. Everything respects `prefers-reduced-motion`.
- **Graphics**: all illustrations are inline SVG/CSS, so there are no raster images to slow down LCP.
- **Icons**: Lucide icon data (the `lucide` package) is rendered as server-only SVG through `components/ui/icons.ts`. To add an icon, import its node there and wrap it with `createIcon`.

## SEO checklist

- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`, `address`), one `h1`, an ordered heading outline
- Per-page canonical, Open Graph, Twitter card, robots directives, theme colour, manifest
- JSON-LD `@graph`: MedicalOrganization (with service catalog and a square logo), WebSite, WebPage, FAQPage
- `robots.txt` and `sitemap.xml` generated from `lib/site.ts`. **Add new routes to `app/sitemap.ts` as pages are built.**

## Notes

- Navigation links point to clean routes (`/about`, `/services/remote-patient-monitoring`, `/devices/glucometer`, …) that are not built yet. Their slugs are defined in `lib/site.ts`.
- "Request a demo" opens the existing Calendly link set in `siteConfig.demoUrl`.
- Reimbursement figures are average national rates from the current site. Review them yearly against the CMS Physician Fee Schedule.
