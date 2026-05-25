import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Library, Sparkles, Rss, Zap } from 'lucide-react';
import { STATS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'The MASTER Prompt Library, 427 Career-Grade AI Prompts',
  description:
    '427 prompts built on the 9-layer MASTER framework for ChatGPT, Claude, and Gemini. Completed prompt engineering exercises, daily-use templates for code, writing, analysis, planning, negotiation, plus a live scraped feed of the best prompts from across the web.',
  alternates: { canonical: '/' },
};

const MASTER_LAYERS = [
  { letter: 'M', name: 'Mission', desc: 'What success looks like, in one sentence.' },
  { letter: 'A', name: 'Agent', desc: 'The persona and expertise the model adopts.' },
  { letter: 'S', name: 'Situation', desc: 'The context the model needs to be calibrated.' },
  { letter: 'T', name: 'Task', desc: 'Decomposed sub-tasks, numbered, in order.' },
  { letter: 'E', name: 'Examples', desc: 'Input to output pairs. Showing beats telling.' },
  { letter: 'R', name: 'Rules', desc: 'Explicit constraints. What NOT to do.' },
  { letter: '+', name: 'Think', desc: 'Chain-of-thought reasoning before responding.' },
  { letter: '+', name: 'Eval', desc: 'Self-evaluation criteria before delivering.' },
  { letter: '+', name: 'Output', desc: 'The exact shape of the final deliverable.' },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="container-page pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-3xl">
            <p className="heading-eyebrow mb-6 animate-fade-in">
              The 9-Layer MASTER Framework, 427 Prompts
            </p>
            <h1 className="heading-display mb-8 animate-slide-up">
              Prompts engineered to{' '}
              <span className="text-accent-gradient">actually work</span>.
              Not the ones that just sound clever.
            </h1>
            <p className="text-lg md:text-xl text-fg-muted leading-relaxed max-w-2xl mb-10 animate-slide-up">
              A career-grade library of {STATS.totalPrompts} prompts built on
              the MASTER framework, completed prompt engineering exercises, daily-use
              templates I actually run, and a live feed of the best prompts
              scraped from across the web.
            </p>
            <div className="flex flex-wrap items-center gap-3 animate-slide-up">
              <Link href="/library/" className="btn-primary">
                Browse {STATS.templates} templates <ArrowRight size={16} />
              </Link>
              <Link href="/framework/" className="btn-secondary">
                The MASTER framework
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-bg-surface">
        <div className="container-page py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat label="Total prompts" value={STATS.totalPrompts.toString()} />
          <Stat label="Categories" value={STATS.categories.toString()} />
          <Stat label="Full MASTER" value={STATS.fullMaster.toString()} />
          <Stat label="MASTER-lite" value={STATS.masterLite.toString()} />
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-6">
          <PillarCard
            icon={<BookOpen size={20} />}
            eyebrow="Part I"
            title="Completed exercises"
            desc={`All ${STATS.exercises} prompt engineering exercises done against real situations: coffee brewing, an EM career decision, a Sierra backpacking trip, an apology I owed a teammate. Each shows the prompt I ran, what came back, and what I learned.`}
            href="/exercises/"
            cta="View exercises"
          />
          <PillarCard
            icon={<Library size={20} />}
            eyebrow="Part II"
            title="Saved templates"
            desc={`${STATS.templates} reusable templates across ${STATS.categories} categories: email, code review, analysis, planning, negotiation, verification. Search, filter, copy. Every Full MASTER prompt has all 9 layers.`}
            href="/library/"
            cta="Browse library"
            featured
          />
          <PillarCard
            icon={<Rss size={20} />}
            eyebrow="Part III"
            title="Scraped prompts"
            desc="A live feed of the best prompts from across the web, scored against the MASTER framework. Updated by a scheduled scraper. Source-attributed. The go-to place to discover prompts you didn't know existed."
            href="/scraped/"
            cta="See the feed"
          />
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl mb-12">
          <p className="heading-eyebrow mb-4">The Framework</p>
          <h2 className="heading-section mb-5">
            Nine layers. Each one prevents a specific failure mode.
          </h2>
          <p className="text-lg text-fg-muted leading-relaxed">
            MASTER is what every prompt in this library is built on. It is not
            a checklist, it is a diagnosis tool. When output disappoints,
            it tells you which layer failed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {MASTER_LAYERS.map((l, i) => (
            <div
              key={i}
              className="card p-5 group hover:border-accent/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-bg-elevated border border-border flex items-center justify-center font-bold font-mono text-2xl text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-all">
                  {l.letter}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-fg mb-1.5">{l.name}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {l.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/framework/" className="btn-secondary">
            <Sparkles size={16} /> See the full framework with examples
          </Link>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="card-elevated p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <Zap size={32} className="text-accent mx-auto mb-6" />
          <h2 className="heading-section mb-5">
            Start with the template that fits your task right now.
          </h2>
          <p className="text-lg text-fg-muted max-w-xl mx-auto mb-8">
            Use the category index to find your task. Fill in the brackets.
            Run it. Most templates produce usable output on the first try.
          </p>
          <Link href="/library/" className="btn-primary">
            Open the library <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="text-3xl md:text-4xl font-bold text-fg tracking-tight font-mono">
        {value}
      </div>
      <div className="heading-eyebrow !text-fg-subtle mt-1">{label}</div>
    </div>
  );
}

function PillarCard({
  icon,
  eyebrow,
  title,
  desc,
  href,
  cta,
  featured = false,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`card p-6 flex flex-col group transition-all hover:border-accent/30 ${
        featured ? 'md:row-span-1 border-accent/20' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4 text-accent">
        {icon}
        <span className="heading-eyebrow">{eyebrow}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-fg-muted leading-relaxed mb-6 flex-1">
        {desc}
      </p>
      <span className="text-sm font-medium text-fg inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
        {cta} <ArrowRight size={14} />
      </span>
    </Link>
  );
}
