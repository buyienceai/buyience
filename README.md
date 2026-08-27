# Buyience website

Next.js marketing site for Buyience / Nova Core.

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in DATABASE_URL from your Neon project
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lead forms → Neon

Four forms POST to Next.js API routes that store rows in Neon Postgres (via Drizzle):

| Form page | API |
|-----------|-----|
| `/request-a-demo` | `POST /api/leads/demo` |
| `/contact` | `POST /api/leads/contact` |
| `/become-a-solution-partner` | `POST /api/leads/solution-partner` |
| `/become-a-technology-partner` | `POST /api/leads/technology-partner` |

### SEO indexing (production only)

Crawl/index signals (robots allow, sitemap, Google verification, JSON-LD) are **off by default**.

Set `SEO_INDEXING=true` only on the real production Vercel environment (e.g. `buyience.com`). Leave it unset on Preview / stage ([buyience.vercel.app](https://buyience.vercel.app/)) so those deploys stay `noindex` and serve an empty sitemap.

Optional: set `NEXT_PUBLIC_SITE_URL=https://buyience.com` on production for stable canonicals.

### Environment variables

Copy [`.env.example`](.env.example) to `.env.local`:

- **`DATABASE_URL`** (required for local Neon mode) — Neon connection string. Also set this in the Vercel project → Settings → Environment Variables for Production / Preview.
- **`LEADS_BACKEND_URL`** (optional) — When set, `/api/leads/*` proxies to `{LEADS_BACKEND_URL}/api/leads/{path}` instead of writing to Neon. Leave unset until the real backend APIs exist.

### Database commands

```bash
npm run db:push      # apply schema to Neon (dev / first setup)
npm run db:generate  # generate SQL migrations under ./drizzle
npm run db:studio    # open Drizzle Studio
```

After creating a Neon database, run `npm run db:push` once against that `DATABASE_URL`, then redeploy (or restart `npm run dev`).

### Switch to external backend later

1. Ship backend endpoints with the same paths and JSON contracts.
2. Set `LEADS_BACKEND_URL=https://your-api.example.com` on Vercel (no trailing slash).
3. Forms keep calling `/api/leads/*`; Next proxies through. No frontend rewrite required.

## Deploy on Vercel

1. Add `DATABASE_URL` in Vercel env.
2. Run `npm run db:push` locally (or CI) against that same DB once.
3. Deploy as usual — Vercel Platform docs: https://nextjs.org/docs/app/building-your-application/deploying
