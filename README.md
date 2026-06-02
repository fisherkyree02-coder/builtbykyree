# BuiltByKyree — Business Website Help

A simple landing page for a service that helps business owners who do not yet have a website to launch an online presence.

## Contact

- Email: builtbykyree@gmail.com
- Phone: (973) 606-7087

## Files

- `index.html` — main website page
- `style.css` — design and layout styles
- `script.js` — contact form interaction

## Usage

Open `index.html` in a browser to view the website, or host it with any static webserver.

## Deploy with GitHub Pages

1. Initialize git if needed:
   ```bash
   git init
   git add .
   git commit -m "Initial business website"
   ```
2. Create a GitHub repository and push the code:
   ```bash
   gh auth login
   gh repo create YOUR-USERNAME/YOUR-REPO --public --source=. --remote=origin --push
   ```
3. Push to `main` or `master`.
4. GitHub Actions will deploy the site automatically via `.github/workflows/pages.yml`.

If the Pages site does not appear immediately, open the repository Settings → Pages and confirm the branch is set to `gh-pages` or the workflow deployment is enabled.
