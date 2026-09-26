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
| `product.ts` | Universal Business Management Software (`/product`) |
| `studio.ts` | Hasibullah Studio section |
| `testimonials.ts` | Testimonials |

### Placeholders to replace

Missing information was left as clearly marked placeholders instead of being made up:

- **Profile photo**: put your photo in `public/images/` and set `profileImage` in `site.ts` (e.g. `"/images/profile.jpg"`). Until then, a monogram is shown.
- **Social links**: add your LinkedIn, GitHub and Behance URLs in `site.ts` → `socials`. Empty ones show as dimmed "coming soon" icons.
- **Projects**: every entry with `placeholder: true` in `projects.ts` is a sample slot and shows a "Sample" badge on the site. Replace it with a real project or delete it.
- **Product**: `product.ts` → `modules`, `technologies`, `screenshots`. Modules show as `[ADD MODULE NAME]` until you fill them in. The tech and screenshot sections stay hidden while they are empty.
- **Universal BMS privacy**: `projects.ts` marks it `privateProject: true`. Set it to `false` and add links if the code or demo is public.
- **Testimonials**: all three are placeholders. Replace them with real client feedback and set `placeholder: false`.
- **Studio website**: `studio.ts` → `url`. While empty, "Explore Hasibullah Studio" links to the contact page.

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
