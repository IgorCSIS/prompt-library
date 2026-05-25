import Link from 'next/link';
import { Rss, Clock, Database, GitBranch, ExternalLink } from 'lucide-react';
import { scraped } from '@/lib/data';

export const metadata = {
  title: 'Scraped Prompts — Curated from across the web',
  description:
    'A live feed of the best prompts scraped from the web, scored against the MASTER framework. Updated by a scheduled scraper.',
};

export default function ScrapedPage() {
  const isEmpty = scraped.prompts.length === 0;

  return (
    <>
      <section className="container-page pt-16 pb-8">
        <div className="max-w-3xl">
          <p className="heading-eyebrow mb-5">Part III · Live Feed</p>
          <h1 className="heading-display mb-6">Scraped prompts</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            A live feed of the best prompts from across the web, source-attributed
            and scored against the MASTER framework. Updated on a schedule by
            an upstream scraper. The goal: a single trusted destination for
            prompts that actually work, not the recycled top-10 lists.
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
            value={scraped.last_updated ?? 'Not yet run'}
          />
        </div>
      </section>

      {isEmpty ? (
        <section className="container-page pb-20">
          <div className="card-elevated p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <Rss
              size={32}
              className="text-accent mx-auto mb-5 animate-pulse-glow"
            />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              The feed is initialising
            </h2>
            <p className="text-fg-muted max-w-xl mx-auto mb-6 leading-relaxed">
              The scraper runs on a schedule and writes to{' '}
              <code className="text-accent font-mono text-sm bg-bg-subtle px-1.5 py-0.5 rounded">
                data/scraped.json
              </code>
              . Once it publishes its first run, every prompt will appear here
              with full source attribution, a MASTER-framework score, and
              copy-to-clipboard.
            </p>

            <details className="text-left max-w-2xl mx-auto card p-5 mt-8">
              <summary className="cursor-pointer text-sm font-medium text-fg-muted hover:text-fg">
                Scraper output schema
              </summary>
              <pre className="prose-prompt mt-4 overflow-x-auto">
                {SCHEMA_EXAMPLE}
              </pre>
            </details>

            <div className="mt-8 flex justify-center gap-3">
              <Link href="/library/" className="btn-primary">
                Browse the static library in the meantime
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="container-page pb-20">
          <div className="space-y-3">
            {scraped.prompts.map((p) => (
              <article key={p.id} className="card p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-fg text-base">{p.title}</h3>
                  <a
                    href={p.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-accent font-mono"
                  >
                    {p.source_name} <ExternalLink size={11} />
                  </a>
                </div>
                <pre className="prose-prompt bg-bg-subtle p-4 rounded-md overflow-x-auto mb-3">
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
      <p className="text-2xl font-bold text-fg font-mono">{value}</p>
    </div>
  );
}

const SCHEMA_EXAMPLE = `{
  "schema_version": "1.0",
  "last_updated": "2026-05-25T18:00:00Z",
  "sources": [
    "promptingguide.ai",
    "github.com/f/awesome-chatgpt-prompts",
    "anthropic.com/library"
  ],
  "prompts": [
    {
      "id": "src-001-strategic-decision",
      "title": "Strategic decision framework for high-stakes choices",
      "source_url": "https://example.com/path",
      "source_name": "Source Name",
      "scraped_at": "2026-05-25T17:55:00Z",
      "category": "Analysis & Decision Support",
      "prompt": "## MISSION\\n[the actual prompt text]",
      "attribution": "@author (if known)",
      "notes": "Optional editorial note"
    }
  ]
}`;
