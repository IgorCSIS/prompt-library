<div align="center">

# The MASTER Prompt Library

### 427 career-grade AI prompts on the 9-layer MASTER framework

**[Live site](https://IgorCSIS.github.io/prompt-library/)** · **[Browse 372 templates](https://IgorCSIS.github.io/prompt-library/library/)** · **[The framework](https://IgorCSIS.github.io/prompt-library/framework/)** · **[Completed exercises](https://IgorCSIS.github.io/prompt-library/exercises/)**

![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Static](https://img.shields.io/badge/static-export-success)
![License](https://img.shields.io/badge/source-MIT-blue)
![Prompts](https://img.shields.io/badge/prompts-427-e8ff47)

</div>

---

## What this is

A working library of **427 prompts** that I actually run. Not a top-10 listicle, not a marketing site, not a tutorial. Each prompt is built on the 9-layer **MASTER framework** (Mission, Agent, Situation, Task, Examples, Rules, Think, Eval, Output) and earns its place by being meaningfully different from every other prompt in the library.

The library is organised in three parts:

**Part I, [Completed Prompt Engineering Exercises](https://IgorCSIS.github.io/prompt-library/exercises/) (55).** Every exercise from all 16 chapters of prompt engineering practice, done against real situations: a coffee-brewing comparison across three LLMs, the engineering-manager decision I'm actually weighing, a Sierra Nevada hiking trip, an apology I owed a teammate. Each entry shows what I picked, the prompt I ran, what came back, what I noticed, and the reusable template at the end.

**Part II, [The Daily-Use Template Library](https://IgorCSIS.github.io/prompt-library/library/) (372).** Reusable templates organised by task type across 18 categories: email, code review, analysis, brainstorming, learning, code, data, research, creative, planning, self-improvement, system prompts, role-based, technique scaffolds, meetings, career, negotiation, verification. Searchable, filterable, copy-to-clipboard. Every Full MASTER prompt has all 9 layers.

**Part III, [Scraped Prompts](https://IgorCSIS.github.io/prompt-library/scraped/).** A live, source-attributed feed of the best prompts from across the web, scored against the MASTER framework. Refreshed daily by a scheduled scraper. The goal: a single trusted destination for prompts that actually work, not the recycled top-10 lists.

## Why this exists

Most prompt libraries are aggregations. This one is a working notebook. Every entry was either used in real work or chosen because it filled a gap I noticed in real work. The notes are written for future-me, not for an audience, so they are terse, opinionated, and occasionally wrong. That is the point.

## Features

- **Full client-side search** across all 372 templates (Fuse.js, sub-100ms results)
- **Category and framework filters** for fast narrowing
- **Copy-to-clipboard** on every prompt with success feedback
- **Dark-mode-first design system** with WCAG-AA contrast
- **Responsive** from 320px to 4K
- **No analytics, no tracking, no cookies**
- **Static export** under 500 KB, deploys anywhere
- **Open Graph and Twitter Card** meta with custom branded image
- **JSON-LD structured data** for rich search results
- **Sitemap and robots.txt** generated at build time
- **Accessible keyboard navigation** throughout

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, static export) | Best DX, zero-config static builds, file-based routing |
| Language | **TypeScript** (strict mode) | Catches the bugs before they ship |
| Styling | **Tailwind CSS 3.4** + custom tokens | Atomic CSS, zero runtime cost |
| Components | **Custom** (no UI library) | Smaller bundle, every component understood |
| Search | **Fuse.js 7** | Lightweight client-side fuzzy search |
| Icons | **Lucide** | 1.5KB per icon, tree-shaken |
| Fonts | **Inter** + **JetBrains Mono** | Variable fonts, subset by Google |
| Hosting | **GitHub Pages** (or Vercel, or anywhere) | Free, fast, no vendor lock-in |
| Build | **GitHub Actions** | Auto-deploy on every push to main |

## Quick start

```bash
git clone https://github.com/IgorCSIS/prompt-library.git
cd prompt-library
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
# Outputs static site to ./out/
```

## Project structure

```
.
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Hero / landing
│   ├── framework/page.tsx        # 9-layer MASTER explainer with examples
│   ├── library/page.tsx          # Searchable template browser
│   ├── exercises/page.tsx        # Completed prompt engineering exercises by chapter
│   ├── scraped/page.tsx          # Live scraper-fed prompt feed
│   ├── about/page.tsx            # Principles and tech stack
│   ├── sitemap.ts                # Auto-generated sitemap.xml
│   ├── layout.tsx                # Root layout with metadata + JSON-LD
│   └── globals.css               # Tailwind + design tokens
├── components/                   # React components
│   ├── Nav.tsx                   # Sticky glass nav with active state
│   ├── Footer.tsx
│   ├── LibraryBrowser.tsx        # Search + filter sidebar
│   ├── TemplateCard.tsx          # Expandable template entry
│   ├── ExerciseCard.tsx          # Expandable exercise entry with my-setup
│   ├── PromptBlock.tsx           # Shaded prompt body with copy button
│   └── CopyButton.tsx
├── lib/
│   ├── types.ts                  # TypeScript types for prompts
│   ├── data.ts                   # JSON loaders + STATS helpers
│   └── utils.ts                  # cn() and slugify()
├── data/                         # Prompt JSON, the source of truth
│   ├── templates.json            # 372 daily-use templates
│   ├── exercises.json            # 55 completed exercises
│   ├── categories.json    