Vercel Deployment Guide
======================

Required secrets (add these in your GitHub repo Settings → Secrets):

- `VERCEL_TOKEN` — a Vercel personal token with scope to deploy.
- `VERCEL_ORG_ID` — your Vercel organization ID (optional for some actions).
- `VERCEL_PROJECT_ID` — your Vercel project ID (optional for some actions).

Also set environment variables in the Vercel dashboard for the project:

- `STRIPE_SECRET_KEY` — your live/test Stripe secret key (do NOT commit this to Git).

Usage
-----

1. Add the required secrets to GitHub.
2. Push to `main` (or `master`) — the workflow `vercel-deploy.yml` will run and deploy to Vercel.

Notes
-----

- If you prefer, you can use the Vercel Git integration directly from the Vercel dashboard instead of this Action.
- Keep `STRIPE_SECRET_KEY` only in Vercel environment settings for production; for local development use `.env`.
