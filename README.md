# Haseebullah — Personal Portfolio

Source for **https://haseebullah.pro**: the personal brand website of Haseebullah, Software Developer, Digital Marketer and Graphic Designer.

Built with **Next.js (App Router) + TypeScript**, CSS Modules and [Motion](https://motion.dev) for animation. Every page is statically generated.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck
```

## Editing content

All content lives in `src/data/`. You never need to touch a component to update text.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, titles, hero text, SEO, **contact details**, **social links**, navigation, profile photo |
| `services.ts` | Software, marketing and design services, service categories, contact-form options |
| `technologies.ts` | Tech stack and the self-reported expertise percentages |
| `projects.ts` | Portfolio projects (homepage featured + `/portfolio`) |
| `product.ts` | Businexa Khata — universal business management software (`/product`), incl. live app link |
| `studio.ts` | Hesodevix Studio section (name, intro, website, logo) |
| `testimonials.ts` | Real client testimonials (section is hidden until you add one) |
| `narration.ts` | What the voice guide says for each section |

### Placeholders to replace

Missing information was left as clearly marked placeholders instead of being made up:

- **Profile photo**: put your photo in `public/images/` and set `profileImage` in `site.ts` (e.g. `"/images/profile.jpg"`). Until then, a monogram is shown.
- **Social links**: add your LinkedIn, GitHub and Behance URLs in `site.ts` → `socials`. Empty ones show as dimmed "coming soon" icons.
- **Projects**: every entry with `placeholder: true` in `projects.ts` is a sample slot and shows a "Sample" badge on the site. Replace it with a real project or delete it.
- **Product**: `product.ts` → `modules`, `technologies`, `screenshots`. Modules show as `[ADD MODULE NAME]` until you fill them in. The tech and screenshot sections stay hidden while they are empty.
- **Businexa Khata app link**: `product.ts` → `appUrl`. Update it if the app moves to its own domain.
- **Testimonials**: the section stays hidden until you add a real one to `testimonials.ts`. The file has a copy-and-fill template, and up to ~10 work well. Only use real feedback, shared with the client's permission.

### Adding a project

1. Add a screenshot to `public/images/projects/` (about 1600×1000, webp or jpg).
2. Add an entry to `projects.ts` with `image: "/images/projects/your-file.webp"`.
3. Set `featured: true` to show it on the homepage. Aim for 6–8 featured projects.
4. For private work, set `privateProject: true` and leave `githubUrl` empty.

## Contact form

The form validates input on the client. By default it opens the visitor's email app with the message already filled in, addressed to `Hasibullah0039@gmail.com`.

To receive messages directly, create a form endpoint (e.g. [Formspree](https://formspree.io)) and set it in `.env.local`:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

## Voice guide

A male voice welcomes visitors and describes each section as they reach it.
Browsers only allow sound after the visitor's first click, so the first visit opens
with a short welcome screen. Its "Enter Portfolio" button starts the voice guide;
"Enter without sound" skips it (`src/components/layout/IntroGate.tsx`).
Visitors can switch the guide off with the speaker button in the bottom-left corner.

- **What it says:** `src/data/narration.ts`. It's written for listening, so your name is spelled "Haseeb Ullah" there for pronunciation only. On-screen text still uses "Haseebullah".
- **Recordings:** `public/audio/narration/`. They were generated locally with [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), an open-source voice model (Apache-2.0), using the male voice "Michael".

After editing any narration text, regenerate the recordings:

```bash
npm i --no-save kokoro-js @breezystack/lamejs tsx   # one-time; not added to package.json
npm run narration
```

Only changed lines are re-recorded. If a line's recording is missing or out of
date, the site uses the browser's best male voice for that line instead.

## SEO

- Metadata, canonical URLs, Open Graph and X cards on every page (`src/lib/seo.ts`)
- Generated Open Graph image (`src/app/opengraph-image.tsx`)
- JSON-LD: Person, WebSite, SoftwareApplication, BreadcrumbList
- `sitemap.xml`, `robots.txt` and the web manifest are generated from `src/app/`

## Project structure

```
src/
  app/            routes (/, /portfolio, /product, /services, /about, /contact) + SEO files
  components/
    layout/       Navbar, Footer, Background, Logo, Providers
    sections/     homepage sections (Hero, About, SoftwareDevelopment, ...)
    portfolio/    ProjectCard, ProjectCover, PortfolioExplorer
    product/      DashboardMockup
    contact/      ContactBlock, ContactForm
    ui/           Button, Icon, Reveal, TiltCard, SectionHeading, FilterBar, ...
  data/           all editable content
  lib/seo.ts      metadata + structured-data helpers
```

## Accessibility & motion

Uses semantic landmarks, a skip link, visible focus states, a keyboard-accessible mobile menu (focus trap, Esc to close) and labelled form errors. All animation respects `prefers-reduced-motion`.
