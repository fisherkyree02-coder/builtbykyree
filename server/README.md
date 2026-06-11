# Checkout Server

This is a simple Express-based server that creates Stripe Checkout sessions for the site.

Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file (copy from `.env.example`) and set your Stripe secret key:

```env
STRIPE_SECRET_KEY=sk_test_your_test_key_here
```

3. Run the server locally:

```bash
npm start
```

By default the server listens on port `4242`.

Client integration

- In development (localhost) the frontend will POST to `http://localhost:4242/create-checkout-session`.
- In production, deploy the serverless function at `api/create-checkout-session.js` or configure an equivalent server endpoint and set the `STRIPE_SECRET_KEY` environment variable.

Security

- Do NOT commit real secret keys to source control. Use environment variables or your hosting platform's secret management.

Create Stripe products and prices

1. Ensure `STRIPE_SECRET_KEY` is set in `.env` (see above).
2. Run the helper to create test products/prices:

```bash
npm run create-products
```

This will output product and price IDs you can use when creating hosted Checkout or Stripe Links.

Deploying to Vercel

- Add `STRIPE_SECRET_KEY` to your Vercel project Environment Variables (do NOT use the repository for secrets).
- The `api/create-checkout-session.js` file is already present; Vercel will deploy it as a serverless function when you push the repo.
- After deployment, the frontend will POST to `/api/create-checkout-session` automatically.

If you'd like, I can prepare a small deployment guide or create GitHub Actions to automate deploying to Vercel.
