# BuiltByKyree — Business Website Help

A simple landing page for a service that helps business owners who do not yet have a website to launch an online presence.

## Contact

- Email: builtbykyree@gmail.com
- Phone: (973) 606-7087

## Files

- `index.html` — main website page
- `services.html` — services page
- `portfolio.html` — portfolio and examples page
- `faq.html` — frequently asked questions page
- `thank-you.html` — submission confirmation page
- `style.css` — design and layout styles
- `script.js` — contact form backend integration and submission logic

## Usage

Open `index.html` in a browser to view the website, or host it with any static webserver.

## Contact form behavior

The form submits using FormSubmit.co directly to `builtbykyree@gmail.com`. After the user submits, the browser redirects to `thank-you.html`.

## Deploy with GitHub Pages

1. Initialize git if needed:
   ```bash
   git init
   git add .
   git commit -m "Initial business website"
   ```
2. Create a GitHub repository and push the code (or use your existing repo `fisherkyree02-coder/builtbykyree`):
   ```bash
   gh auth login
   gh repo create fisherkyree02-coder/builtbykyree --public --source=. --remote=origin --push
   ```
3. Push to `main` or `master`.
4. GitHub Actions will deploy the site automatically via `.github/workflows/pages.yml`.

The expected Pages URL is:

https://fisherkyree02-coder.github.io/builtbykyree

If the Pages site does not appear immediately, open the repository Settings → Pages and confirm the branch is set to `gh-pages` or the workflow deployment is enabled.

> The contact form is configured to use FormSubmit.co and will send the form details to `builtbykyree@gmail.com`, then redirect the user to `thank-you.html`.

## Custom domain support

A `CNAME` file has been added to the repository so you can use a custom domain. Update the `CNAME` file with your domain name and then add the same domain in GitHub Pages settings.

## Payment integration

The website includes a PayPal payment button for the $200 Launch Package. If you want a different payment provider, we can swap it for Stripe or another checkout flow.

### Stripe checkout (optional server)

This repo includes a small example Node server to create Stripe Checkout sessions. It is not required for the site to work, but if you want card payments via Stripe follow these steps:

1. Install dependencies and run the server:

```bash
cd server
npm install
export STRIPE_SECRET_KEY=sk_test_...   # macOS / Linux
# Windows PowerShell:
$env:STRIPE_SECRET_KEY="sk_test_..."
# Windows CMD:
set STRIPE_SECRET_KEY=sk_test_...
npm start
```

2. From the Plans page click "Pay with Card (Stripe)" — the site will call `http://localhost:4242/create-checkout-session` which creates a Stripe Checkout session and redirects the browser to Stripe's hosted checkout.

3. Set `STRIPE_SECRET_KEY` to your Stripe secret key before starting the server. The server uses `success_url` and `cancel_url` that point to the GitHub Pages pages.

Note: For local development you can copy `server/.env.example` to `server/.env` and put your secret key there. Never commit `.env` to Git.

If you deploy the server (Vercel, Netlify, Render, etc.), add the `STRIPE_SECRET_KEY` in the service's environment variables/secret settings instead of committing it.

### Deploying the serverless endpoint (recommended)

You can deploy the included serverless function to Vercel so you don't run a local server. Vercel will host an `/api/create-checkout-session` endpoint that the site will call when hosted.

1. Install the Vercel CLI and login:

```bash
npm i -g vercel
vercel login
```

2. From the repo root, deploy and set the `STRIPE_SECRET_KEY` in Vercel's dashboard or with the CLI:

```bash
vercel env add STRIPE_SECRET_KEY production
# follow prompts to paste your secret key
vercel --prod
```

After deploying, the Plans page will call `/.api/create-checkout-session` (Vercel maps `/api/*`) and redirect customers to Stripe Checkout without you running a local server.

### Stripe Payment Links (no server)

If you prefer not to run any server at all, create a Stripe Payment Link in your Stripe Dashboard (Products → Payment Links). Once created, copy the Payment Link URL and replace the placeholder hrefs in `plans.html` for each plan. This provides a hosted, no-code checkout URL that you can paste directly into the site.

Steps to create a Payment Link:
1. In Stripe Dashboard create a Product and Price.
2. Go to Payment Links → Create a payment link → choose product/price → Create.
3. Copy the generated URL and paste it into `plans.html` replacing the `https://buy.stripe.com/test_placeholder_*` placeholders.


## Pricing

**Launch Package: $200**

Includes:
- Professional website design and layout
- Mobile-friendly responsiveness
- Contact form and inquiry management
- Deployment to GitHub Pages
- Domain setup assistance
- One-time fee

## Custom Domain

To use a custom domain (e.g., `mysite.com` instead of `fisherkyree02-coder.github.io/builtbykyree`):

1. Register your domain at a registrar (e.g., Namecheap, GoDaddy)
2. In your GitHub repo Settings → Pages → Custom Domain, add your domain
3. Create a `CNAME` file in the root with your domain name
4. Update your registrar's DNS settings to point to GitHub Pages
