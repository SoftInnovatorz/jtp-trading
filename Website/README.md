# JTP Trading — Website

Rebuild of the JTP Trading corporate site (Next.js App Router, TypeScript, Tailwind CSS v4).

## Stack

- **Next.js 16** (App Router, static generation) + React 19
- **next-intl** for Japanese/English routing (`/ja/...`, `/en/...`), with a first-visit language popup and a header switcher
- **Tailwind CSS v4** for styling
- **Embla Carousel** for the homepage hero carousel
- **Resend + Zod** for the contact form (server action, validated, with a honeypot spam field)
- Built-in `sitemap.xml` / `robots.txt` / per-page metadata (title, description, canonical, hreflang alternates, Open Graph) + Organization JSON-LD

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/ja` or `/en` depending on browser language.

## Environment variables

See `.env.example`. The contact form needs a [Resend](https://resend.com) account to actually deliver email:

- `RESEND_API_KEY` — from the Resend dashboard
- `CONTACT_EMAIL_TO` — inbox that should receive inquiries
- `CONTACT_EMAIL_FROM` — must be a verified sending domain in Resend (defaults to Resend's shared testing address, which only delivers to the account owner — set up a verified domain before going live)
- `NEXT_PUBLIC_SITE_URL` — used to build the sitemap and canonical/hreflang URLs; set to the real production domain before deploying

Without `RESEND_API_KEY`/`CONTACT_EMAIL_TO` set, the contact form will render and validate normally but submissions will fail (logged server-side) instead of sending — set these before launch.

## Content

All page copy lives in `messages/ja.json` and `messages/en.json`. The English copy is a natural (not word-for-word) translation reconstructed from the old site — have the client review both languages before launch.

## Product image galleries (`ImageGrid`)

Product photos on the Business and OEM pages (`src/components/ImageGrid.tsx`) are clickable thumbnails that open a full-screen lightbox — enlarged image, prev/next arrows, close button, click-outside/Escape/arrow-key support. The lightbox also carries a "See More" button pointing at a future e-commerce storefront. Right now `siteConfig.ecommerceUrl` (`src/config/site.ts`) is set to `"#"` as a placeholder — once that site exists, update that one value and every "See More" link across the site will point there.

`ImageGrid` is a client component (`"use client"`); the enlarge/close/nav labels live under `common` in `messages/ja.json` / `messages/en.json` (`enlarge`, `closeImage`, `previousImage`, `nextImage`).

## Project structure

```
src/app/[locale]/        pages (home, business, trading, oem, company, contact)
src/app/actions/contact.ts   contact form server action
src/components/          Header, Footer, LanguagePopup, HeroCarousel, ContactForm, etc.
src/i18n/                next-intl routing/navigation config
messages/                ja.json / en.json translation dictionaries
public/images/           assets carried over from the old site
```

## Deploy

Any Next.js host works; Vercel is the path of least resistance (zero-config). Set the environment variables above in the hosting platform before the first deploy.
