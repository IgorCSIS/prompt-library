import Link from 'next/link';
import { ArrowRight, BookOpen, Library, Rss } from 'lucide-react';
import { STATS } from '@/lib/data';

export const metadata = {
  title: 'About — How this library was built',
  description:
    'Why this prompt library exists, how it was built, and the principles that govern every entry.',
};

export default function AboutPage() {
  return (
    <>
      <section className="container-page pt-16 pb-12">
        <div className="max-w-prose">
          <p className="heading-eyebrow mb-5">About</p>
          <h1 className="heading-display mb-8">
            Why this library exists.
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-fg-muted leading-relaxed">
            <p className="text-lg">
              This started as a CSIS 275 prompt log — the required notebook of
              prompts and reflections that every student in the course keeps. It
              grew into something I actually use: a working library of {STATS.totalPrompts}{' '}
              prompts I reach for in real work.
            </p>

            <p>
              The MASTER framework is what made the difference. The earlier
              version of my notebook was a pile of prompts that mostly worked.
              The current version is a pile of prompts that work the same way
              every time, fail in diagnosable ways, and can be upgraded with a
              single-variable change instead of a rewrite.
            </p>

            <h2 className="text-2xl font-bold text-fg mt-12 mb-4">
              Principles
            </h2>

            <Principle
              title="A prompt earns its place by being meaningfully different."
              body="Not by being a rephrase of an adjacent prompt. The library has been audited three times for duplication; only templates with a distinct trigger condition and a distinct mechanism survived."
            />

            <Principle
              title="Full MASTER means all nine layers."
              body="If a prompt is tagged Full MASTER, it has Mission, Agent, Situation, Task, Examples (where needed), Rules, Think, Eval, and Output. If any layer is missing, the tag is wrong — and the framework audit catches it."
            />

            <Principle
              title="The personal voice is the point."
              body="The notes are written for future-me, not for an audience. Terse, opinionated, occasionally wrong. The 'Notes' field on each template is what makes the library teach me when I revisit it."
            />

            <Principle
              title="The bracketed placeholders are intentional."
              body="In Part II, every template has [BRACKETED_VARIABLES] for the user to fill in. That's not laziness — it's design. A template that pre-fills the variables is a one-shot prompt, not a template."
            />

            <Principle
              title="Banned AI-tell phrases are banned for a reason."
              body="'Delve,' 'in conclusion,' 'passionate about,' 'results-driven' — these surface signals of pattern-completion without grounded reasoning. The RULES section of every prompt prohibits them. When the model defaults to them, it means the model isn't actually engaging with the situation."
            />

            <h2 className="text-2xl font-bold text-fg mt-12 mb-4">
              How the library is organised
            </h2>

            <p>
              Three parts, each with a different purpose:
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
              <PartCard
                icon={<BookOpen size={18} />}
                title="Exercises"
                desc={`${STATS.exercises} completed CSIS 275 exercises, against real situations.`}
                href="/exercises/"
              />
              <PartCard
                icon={<Library size={18} />}
                title="Templates"
                desc={`${STATS.templates} reusable templates across 18 categories.`}
                href="/library/"
              />
              <PartCard
                icon={<Rss size={18} />}
                title="Scraped"
                desc="A live feed of curated prompts from across the web."
                href="/scraped/"
              />
            </div>

            <h2 className="text-2xl font-bold text-fg mt-12 mb-4">
              Maintenance
            </h2>

            <p>
              On the first Friday of each quarter, I run the maintenance pass
              from Exercise 16A: re-test the most-used templates, run the
              constraint audit (6D) on the one that drifted most, retire any
              template I haven't used in 90 days. The library is durable;
              individual prompts are not.
            </p>

            <h2 className="text-2xl font-bold text-fg mt-12 mb-4">
              Stack
            </h2>

            <p>
              Static Next.js 14 site with Tailwind, deployed via GitHub
              Pages or Vercel. Search is client-side via Fuse.js — no analytics,
              no tracking, no third-party fonts beyond Google's Inter and
              JetBrains Mono. The whole site is under 500 KB.
            </p>
          </div>

          <div className="mt-16 card-elevated p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-fg mb-1">
                Want to use the prompts?
              </p>
              <p className="text-sm text-fg-muted">
                Open the library, find what fits, fill the brackets, run it.
              </p>
            </div>
            <Link href="/library/" className="btn-primary flex-shrink-0">
              Open library <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-accent pl-5 py-1">
      <h3 className="font-semibold text-fg mb-1.5 not-prose">{title}</h3>
      <p className="text-fg-muted text-base">{body}</p>
    </div>
  );
}

function PartCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link href={href} className="card p-4 group hover:border-accent/30 transition-all">
      <div className="flex items-center gap-2 text-accent mb-2">
        {icon}
        <span className="heading-eyebrow">{title}</span>
      </div>
      <p className="text-sm text-fg-muted leading-relaxed">{desc}</p>
    </Link>
  );
}
