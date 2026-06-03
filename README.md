# BuiltByKyree — Business Website Help

A simple landing page for a service that helps business owners who do not yet have a website to launch an online presence.

## Contact

- Email: builtbykyree@gmail.com
- Phone: (973) 606-7087

## Files

- `index.html` — main website page
- `style.css` — design and layout styles
- `script.js` — optional JavaScript placeholder
- `thank-you.html` — submission confirmation page

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
