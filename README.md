# Web Portofolio

Web Portofolio is a refined personal portfolio experience for Irfan Hariyanto, designed to present creative direction, brand identity, and technical expertise with clarity and polish.

## Brand Vision

This project is built as a premium portfolio showcase:

- Elegant visual hierarchy with a warm neo-modern aesthetic
- Subtle motion and interactive microcopy to enhance engagement
- Dark-mode-first presentation for a professional digital brand
- Clear contact action via LinkedIn to support high-quality networking

## Highlights

- Immersive homepage hero with motion-led atmospheric gradients
- Skill badges and project previews crafted for modern portfolios
- SEO-friendly metadata and structured JSON-LD support
- Smooth, responsive layout tailored for desktop and mobile
- LinkedIn call-to-action button optimized for client outreach

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- next-themes

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

### Production build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Deployment

This repository is ready to deploy to Vercel:

1. Connect the GitHub repository to Vercel.
2. Use the default Next.js build settings.
3. Deploy the `main` branch.

## Project Structure

- `app/` — main application routes and server-rendered pages
- `app/page.tsx` — homepage and presentation layer
- `app/projects/page.tsx` — projects listing page
- `app/layout.tsx` — root layout, metadata, and theme provider
- `lib/` — static content, copy and project data
- `components/` — reusable UI components

## Notes

This portfolio focuses on a premium visual presentation and strong LinkedIn engagement flow. Visitor analytics support was intentionally removed for simplicity and stability.

