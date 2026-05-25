import type { Metadata } from 'next';
import Link from 'next/link';
import { Rss, Clock, Database, GitBranch, ExternalLink } from 'lucide-react';
import { scraped } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Best AI Prompts from Across the Web, Updated Daily',
  description:
    'A live, source-attributed feed of the best prompts scraped from the web. Every prompt is scored against the MASTER framework and refreshed daily by a scheduled scraper. The go-to destination for prompts that actually work.',
  keywords: [
    'best AI prompts',
    'curated prompt list',
    'awesome prompts',
    'top ChatGPT prompts',
    'top Claude prompts',
    'prompt feed',
    'daily prompts',
    'prompt aggregator',
    'prompt discovery',
    'where to find good prompts',
  ],
  alternates: { canonical: '/scraped/' },
  openGraph: {
    title: 'Best AI Prompts from Across the Web, Updated Daily',
    description:
      'A live, source-attributed feed of the best prompts on the internet. MASTER-framework scored.',
    url: '/scraped/',
    images: ['/og-image.svg'],
  },
};

export default function ScrapedPage() {
  const isEmpty = scraped.prompts.length === 0;
  const lastUpdated = scraped.last_updated
    ? new Date(scraped.last_updated).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'pending first run';

  return (
    <>
      <section className="container-page pt-16 pb-8">
        <div className="max-w-3xl">
          <p className="heading-eyebrow mb-5">Part III &middot; Live Feed</p>
          <h1 className="heading-display mb-6">Scraped prompts</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            A live feed of the best prompts from across the web,
            source-attributed and scored against the MASTER framework. Updated
            on a schedule by an upstream scraper. The goal: a single trusted
            destination for prompts that actually work, not the recycled top-10
            lists.
          </p>
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <StatCard
            icon={<Database size={18} />}
            label="Prompts in feed"
            value={scraped.prompts.length.toString()}
          />
          <StatCard
            icon={<GitBranch size={18} />}
            label="Sources tracked"
            value={scraped.sources.length.toString()}
          />
          <StatCard
            icon={<Clock size={18} />}
            label="Last updated"
            value={lastUpdated}
          />
        </div>
      </section>

      {isEmpty ? (
        <section className="container-page pb-20">
          <div className="card-elevated p-10 md:p-16 text-center max-w-2xl mx-auto">
            <Rss size={32} className="text-accent mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-fg mb-4">
              The feed is warming up.
            </h2>
            <p className="text-fg-muted leading-relaxed mb-8">
              No prompts have landed in the feed yet. The scheduled scraper
              runs daily and writes new entries to{' '}
              <code className="font-mono text-xs bg-bg-elevated px-1.5 py-0.5 rounded">
                data/scraped.json
              </code>
              . Once the first batch lands, this page will populate
              automatically. In the meantime, browse the curated template
              library.
            </p>
            <Link href="/library/" className="btn-primary">
              Open the template library
            </Link>
          </div>
        </section>
      ) : (
        <section className="container-page pb-20 space-y-4">
          <div className="space-y-4">
            {scraped.prompts.map((p) => (
              <article key={p.id} id={p.id} className="card p-5 space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-fg text-base leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-fg-muted mt-1">
                      <span className="text-fg-subtle font-mono text-xs">
                        SOURCE:{' '}
                      </span>
                      <a
                        href={p.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline inline-flex items-center gap-1"
                      >
                        {p.source_name} <ExternalLink size={12} />
                      </a>
                    </p>
                  </div>
                  {p.category && (
                    <span className="chip-muted">{p.category}</span>
                  )}
                </div>

                <pre className="prose-prompt p-4 overflow-x-auto rounded-md bg-bg-elevated border border-border-subtle text-sm whitespace-pre-wrap">
                  {p.prompt}
                </pre>
                {p.notes && (
                  <p className="text-sm text-fg-muted italic">{p.notes}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 text-fg-muted mb-2">
        {icon}
        <span className="heading-eyebrow">{label}</span>
      </div>
      <p className="text-2xl font-bold text-fg font-mono tracking-tight">
        {value}
      </p>
    </div>
  );
}
