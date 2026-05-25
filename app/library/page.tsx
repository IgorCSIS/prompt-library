import type { Metadata } from 'next';
import { LibraryBrowser } from '@/components/LibraryBrowser';
import { templates, categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Prompt Template Library, 372 Reusable Prompts',
  description:
    'Browse 372 reusable prompt templates across 18 categories: email, code review, analysis, planning, negotiation, verification, and more. Searchable, filterable, copy-to-clipboard. Built on the MASTER framework.',
  keywords: [
    'prompt templates',
    'reusable prompts',
    'ChatGPT templates',
    'Claude templates',
    'code review prompts',
    'email prompts',
    'analysis prompts',
    'planning prompts',
    'negotiation prompts',
    'verification prompts',
  ],
  alternates: { canonical: '/library/' },
  openGraph: {
    title: 'Prompt Template Library, 372 Reusable Prompts',
    description: '372 saved templates across 18 task categories. Search, filter, copy, use.',
    url: '/library/',
    images: ['/og-image.svg'],
  },
};

export default function LibraryPage() {
  return (
    <>
      <section className="container-page pt-16 pb-8">
        <div className="max-w-3xl">
          <p className="heading-eyebrow mb-5">
            Part II &middot; {templates.length} Templates &middot; {categories.length} Categories
          </p>
          <h1 className="heading-display mb-6">The template library</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            {templates.length} reusable templates I actually run. Search by
            keyword, filter by category or framework, copy the prompt, fill in
            the bracketed variables, ship it. Every Full MASTER prompt has all
            nine layers; every MASTER-lite prompt earned the scaled-down tag
            with a reason.
          </p>
        </div>
      </section>

      <section className="container-page pb-20">
        <LibraryBrowser templates={templates} categories={categories} />
      </section>
    </>
  );
}
