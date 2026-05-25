# The MASTER Prompt Library

A career-grade reference of **427 prompts** built on the 9-layer MASTER framework. Live site: completed CSIS 275 exercises, daily-use templates, and a scheduled-scraper-driven feed of curated prompts from across the web.

## What's here

- **Part I — Exercises** (`/exercises/`): All 55 CSIS 275 exercises completed against real situations, each with my setup, the prompt I ran, what came back, and a personal note.
- **Part II — Library** (`/library/`): 372 reusable templates across 18 categories. Search, filter by framework or category, copy-to-clipboard.
- **Part III — Scraped** (`/scraped/`): A live feed populated by a scheduled scraper (see `data/scraped.json` schema).
- **Framework** (`/framework/`): Interactive 9-layer MASTER explainer with examples and the full template.

## Stack

- **Next.js 14** (App Router, static export)
- **TypeScript** (strict mode)
- **Tailwind CSS** + custom design system
- **Fuse.js** for client-side fuzzy search
- **Lucide** icons
- **Inter** + **JetBrains Mono** fonts

The whole site is under 500 KB. No analytics. No tracking. No third-party CDNs beyond Google Fonts.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Building for production

```bash
npm run build
```

Static site is output to `out/`. Deploy that folder anywhere — GitHub Pages, Vercel, Netlify, Cloudflare Pages, an S3 bucket. The included `.github/workflows/deploy.yml` automates GitHub Pages on every push to `main`.

## Deploy to GitHub Pages (one-time setup)

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Push to `main`. The workflow builds and deploys automatically.
4. Your site is live at `https://<username>.github.io/<repo-name>/`.

## Deploy to Vercel (alternative)

1. Push to GitHub (or GitLab, Bitbucket).
2. Go to vercel.com → New Project → Import the repo.
3. Vercel detects Next.js automatically. No config needed.
4. Custom domain: configurable from the Vercel dashboard.

## Updating prompts

All prompt data lives in `data/`:

- `data/templates.json` — the 372 daily-use templates
- `data/exercises.json` — the 55 completed exercises
- `data/categories.json` — category metadata with counts
- `data/scraped.json` — feed for the scheduled scraper

Edit these JSON files directly, commit, push. The site rebuilds automatically.

## Scraper integration

The scraped-prompts page reads from `data/scraped.json`. Your scheduled scraper should write to this file using this schema:

```json
{
  "schema_version": "1.0",
  "last_updated": "2026-05-25T18:00:00Z",
  "sources": [
    "promptingguide.ai",
    "github.com/f/awesome-chatgpt-prompts"
  ],
  "prompts": [
    {
      "id": "src-001-strategic-decision",
      "title": "Strategic decision framework for high-stakes choices",
      "source_url": "https://example.com/path",
      "source_name": "Source Name",
      "scraped_at": "2026-05-25T17:55:00Z",
      "category": "Analysis & Decision Support",
      "prompt": "## MISSION\n[the actual prompt text]",
      "attribution": "@author (if known)",
      "notes": "Optional editorial note"
    }
  ]
}
```

Recommended scraper flow:

1. Scraper runs on cron (GitHub Actions schedule trigger, Cloudflare Cron, or external).
2. Scraper writes to `data/scraped.json`.
3. Scraper commits the file change and pushes to `main`.
4. GitHub Pages action rebuilds and redeploys automatically.

A starter GitHub Actions workflow for the scraper (place at `.github/workflows/scraper.yml`):

```yaml
name: Scheduled scraper
on:
  schedule:
    - cron: '0 12 * * *'  # daily at noon UTC
  workflow_dispatch:

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r scraper/requirements.txt
      - run: python scraper/run.py
      - name: Commit
        run: |
          git config user.name "scraper-bot"
          git config user.email "scraper@noreply"
          git add data/scraped.json
          git diff --staged --quiet || git commit -m "chore: scraper update"
          git push
```

## Project structure

```
.
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Hero / landing
│   ├── framework/            # 9-layer MASTER explainer
│   ├── library/              # Browseable templates
│   ├── exercises/            # Completed exercises
│   ├── scraped/              # Scraped feed
│   ├── about/                # About this project
│   ├── layout.tsx
│   └── globals.css
├── components/               # React components
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── TemplateCard.tsx
│   ├── ExerciseCard.tsx
│   ├── LibraryBrowser.tsx    # Search + filter UI
│   ├── PromptBlock.tsx
│   └── CopyButton.tsx
├── lib/
│   ├── types.ts
│   ├── data.ts               # JSON loaders
│   └── utils.ts
├── data/                     # Prompt JSON files
│   ├── templates.json
│   ├── exercises.json
│   ├── categories.json
│   └── scraped.json
└── .github/workflows/        # CI/CD
    └── deploy.yml
```

## The MASTER framework

Every Full MASTER prompt in this library has all 9 layers:

- **M**ission — what success looks like
- **A**gent — the persona and expertise
- **S**ituation — the context the model needs
- **T**ask — decomposed sub-tasks
- **E**xamples — input → output pairs (where needed)
- **R**ules — explicit constraints, what NOT to do
- **+** Think — chain-of-thought reasoning
- **+** Eval — self-evaluation before delivery
- **+** Output — the exact shape of the deliverable

MASTER-lite prompts use Mission + Task + Output + one or two constraints. Both tags are documented per-prompt.

## License

Source code: MIT. The prompts themselves are under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — use them, modify them, share them, just credit the source.

## Maintained by

[@nifty](https://github.com/) — this is part of a portfolio. Built in service of the CSIS 275 course, then extended into a working tool I actually use.
