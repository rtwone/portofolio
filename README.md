# WEBPortoLagi

A personal portfolio website for Irfan Hariyanto built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Features

- Responsive portfolio homepage with animated hero and project preview
- Dark theme support using `next-themes`
- SEO-friendly metadata and JSON-LD structured data
- Skills section with badge-style UI
- LinkedIn call-to-action button on the homepage
- Project cards with hover animation
- Clean App Router structure with separate pages for home and projects

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- next-themes

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

- `app/` - Next.js app routes and pages
- `app/page.tsx` - Homepage content and hero section
- `app/projects/page.tsx` - Project listing page
- `app/layout.tsx` - Root layout and metadata
- `lib/` - Static content and project data
- `components/` - Reusable UI components

## Notes

The repository currently focuses on portfolio presentation and LinkedIn engagement. Visitor analytics routes were removed for stability.

