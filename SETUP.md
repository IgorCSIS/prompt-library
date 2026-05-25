# Setup & Deploy, Run these commands in order

This is the step-by-step. Each block is a copy-paste shell command. Run them in PowerShell, Terminal, or your shell of choice.

---

## Step 1, Install dependencies and verify locally

Open a terminal in the `portfolio-site/` folder and run:

```bash
npm install
```

(First install takes 1-2 minutes. Installs Next.js, React, Tailwind, Fuse.js, Lucide, Framer Motion.)

Then start the dev server:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. You should see the hero page with the stats strip ("427 prompts · 18 categories · ...") and nav to Framework / Library / Exercises / Scraped / About.

Walk through every page once. If anything looks broken, the dev server reports the file and line. Send me the error and I'll fix it.

Stop the server when done: `Ctrl+C`.

---

## Step 2, Build the static site

```bash
npm run build
```

This produces a static `out/` folder. The site is fully prerendered, no server needed, no runtime, no API calls. ~500 KB total.

---

## Step 3, Create the GitHub repository

Create a new repo on github.com, let's say `prompt-library` (or whatever name you want). **Public** so GitHub Pages is free. **Don't** initialise it with a README, we already have one.

Then in your terminal, from the `portfolio-site/` folder:

```bash
git init
git add .
git commit -m "initial: MASTER prompt library portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prompt-library.git
git push -u origin main
```

(Replace `YOUR_USERNAME` and `prompt-library` with your actuals.)

---

## Step 4, Enable GitHub Pages

1. In your new repo on github.com → **Settings** (top nav)
2. Left sidebar → **Pages**
3. Under "Build and deployment" → **Source** → select **GitHub Actions** (not "Deploy from a branch")
4. Save.

That's it. The workflow at `.github/workflows/deploy.yml` will run automatically on every push to `main`. The first deploy takes ~3 minutes.

Your site goes live at:

```
https://YOUR_USERNAME.github.io/prompt-library/
```

Watch the deploy at: `https://github.com/YOUR_USERNAME/prompt-library/actions`

---

## Step 5 (optional), Custom domain

If you want a custom domain like `prompts.nifty.dev` instead of `.github.io`:

1. In your DNS provider, add a `CNAME` record pointing your subdomain to `YOUR_USERNAME.github.io`.
2. In the repo: **Settings → Pages → Custom domain** → enter your domain → save.
3. Wait for DNS propagation (~10 min to a few hours).
4. Enable "Enforce HTTPS" once it's available.

Also update `next.config.js`:

```js
basePath: '',
assetPrefix: '',
```

(Custom domains don't need the `/repo-name` base path.)

---

## Step 6 (alternative), Deploy to Vercel instead

If you'd rather use Vercel (smoother, faster, free):

1. Go to **vercel.com** → sign in with GitHub.
2. Click **Add New → Project**.
3. Select your `prompt-library` repo.
4. Vercel auto-detects Next.js. **Don't change any settings.**
5. **One change:** in your local `next.config.js`, remove the `basePath` and `assetPrefix` lines (or set both to `''`). Vercel serves at root.
6. Commit and push that change.
7. Vercel deploys automatically on every push. Custom domain configurable from the Vercel dashboard.

---

## Step 7, Wire up the scraper

When your scraper is ready, point it to write JSON to `data/scraped.json` following the schema documented in `README.md` (section "Scraper integration").

Recommended flow:

1. Scraper runs on cron (GitHub Actions schedule, Cloudflare Cron, external).
2. Scraper writes `data/scraped.json`.
3. Scraper commits + pushes the change.
4. The GitHub Pages workflow rebuilds and redeploys the site.

A starter `.github/workflows/scraper.yml` example is in the main README.

---

## Updating prompts later

All prompt data is in `data/*.json`. Edit the JSON files, commit, push. The site rebuilds automatically.

To add a new template:

1. Open `data/templates.json`.
2. Append a new entry following the existing schema.
3. `git add data/templates.json && git commit -m "add: new template" && git push`.

The deploy workflow handles the rest.

---

## Troubleshooting

**`npm install` fails:** make sure you have Node 18+ (`node --version`). If older, install from nodejs.org.

**`npm run build` fails:** the error message names the file and line. Most likely a stale dependency, try `rm -rf node_modules .next && npm install && npm run build`.

**GitHub Pages shows a blank page:** check the Actions tab for the failing run. Usually a base path mismatch, confirm the workflow set `NEXT_PUBLIC_BASE_PATH` correctly for your repo name.

**Site shows but assets/CSS missing:** also a base path issue. The workflow sets it from the repo name, but if your repo is named `username.github.io` (a user-site), base path should be empty.

---

## What you have

- 30 files
- ~3,500 lines of TypeScript / TSX
- 6 pages
- Full client-side search across 372 templates
- Copy-to-clipboard on every prompt
- Dark-mode-first design (accessible, WCAG-compliant contrast)
- Static export → deploys anywhere
- Zero runtime dependencies after build
