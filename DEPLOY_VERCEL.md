# Deploying to Vercel

This repository is configured for Vercel (`vercel.json` is present) and includes a serverless function at `api/create-checkout-session.js`.

Steps to deploy from your machine

1. Install Vercel CLI (if not already installed):

```powershell
npm i -g vercel
# or use npx for one-off: npx vercel
```

2. Set environment variables in your project on Vercel (do not commit secrets):

- `STRIPE_SECRET_KEY` — your Stripe secret key (`sk_test_...` or restricted key with write permissions for Products/Prices/Payment Links/Checkout)

You can set this in the Vercel dashboard under Project Settings → Environment Variables (recommended), or pass `--env STRIPE_SECRET_KEY=...` to `vercel` for a one-off deploy.

3. Deploy using the CLI (recommended with a token):

```powershell
# set VERCEL_TOKEN in your terminal (do NOT paste it into chat)
$env:VERCEL_TOKEN = "<your_vercel_token>"
cd path\to\business-website
npx vercel --prod --confirm --token $env:VERCEL_TOKEN

Project settings (suggested)

- **Project name:** `builtbykyree-site` (changeable in Vercel dashboard)
- **Build command:** `npm run vercel-build` (or `npm run build`)
- **Install command:** `npm install` (or `yarn install` / `pnpm install`)
- **Output directory:** `.` (root) — use `public` if you create a `public/` folder with a build output.
```

If you prefer to login interactively, run `npx vercel login` and follow the prompts, then run `npx vercel --prod`.

4. After deploy, set `STRIPE_SECRET_KEY` in the Vercel project environment (if you didn't pass it during deploy). Then your serverless function `api/create-checkout-session` will be able to create Checkout sessions.

Creating Stripe Payment Links (optional)

From the `server` folder you can run the helper to create Stripe Payment Links for the prices already created:

```powershell
cd server
# Ensure server/.env contains STRIPE_SECRET_KEY or set it in your session
npm install
node create_stripe_links.js
```

This writes `server/stripe_payment_links.json` with hosted payment URLs that you can use directly on the site.

If you want, I can deploy for you — provide the `VERCEL_TOKEN` in your terminal (set as env var) and reply "deploy now" and I'll run the deploy command from the workspace. I cannot accept tokens pasted into chat.
