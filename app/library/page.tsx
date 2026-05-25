import { LibraryBrowser } from '@/components/LibraryBrowser';
import { templates, categories } from '@/lib/data';

export const metadata = {
  title: 'Template Library — 372 Saved Prompts',
  description:
    'Browse 372 reusable prompt templates across 18 categories. Filter by framework, search by content.',
};

export default function LibraryPage() {
  return (
    <>
      <section className="container-page pt-16 pb-8">
        <div className="max-w-3xl">
          <p className="heading-eyebrow mb-5">
            Part II · {templates.length} Saved Templates
          </p>
          <h1 className="heading-display mb-6">The Library</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Reusable templates. Placeholders in [BRACKETS] are intentional —
            fill them in before running. Organized by task type, not by chapter.
            Find what fits, copy the template, fill the brackets, run it.
          </p>
        </div>
      </section>

      <section className="container-page pb-20">
        <LibraryBrowser templates={templates} categories={categories} />
      </section>
    </>
  );
}
