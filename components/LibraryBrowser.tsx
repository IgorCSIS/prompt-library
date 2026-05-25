'use client';

import { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import Fuse from 'fuse.js';
import type { Template, Category } from '@/lib/types';
import { TemplateCard } from './TemplateCard';
import { cn } from '@/lib/utils';

interface LibraryBrowserProps {
  templates: Template[];
  categories: Category[];
}

export function LibraryBrowser({ templates, categories }: LibraryBrowserProps) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedFw, setSelectedFw] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(templates, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'use_when', weight: 2 },
          { name: 'category', weight: 1.5 },
          { name: 'prompt', weight: 1 },
          { name: 'notes', weight: 1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [templates]
  );

  const filtered = useMemo(() => {
    let result = templates;
    if (query.trim()) {
      result = fuse.search(query).map((r) => r.item);
    }
    if (selectedCat) {
      result = result.filter((t) => t.category === selectedCat);
    }
    if (selectedFw) {
      result = result.filter((t) => t.framework === selectedFw);
    }
    return result;
  }, [templates, query, selectedCat, selectedFw, fuse]);

  const clearAll = () => {
    setQuery('');
    setSelectedCat(null);
    setSelectedFw(null);
  };

  const hasFilter = query || selectedCat || selectedFw;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-20 lg:self-start space-y-6">
        <div>
          <h3 className="heading-eyebrow mb-3 flex items-center gap-2">
            <Filter size={12} /> Framework
          </h3>
          <div className="flex flex-col gap-1">
            {(['Full MASTER', 'MASTER-lite'] as const).map((fw) => (
              <button
                key={fw}
                onClick={() => setSelectedFw(selectedFw === fw ? null : fw)}
                className={cn(
                  'px-3 py-2 text-sm rounded-md text-left transition-colors flex items-center justify-between font-mono',
                  selectedFw === fw
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'text-fg-muted hover:text-fg hover:bg-bg-subtle border border-transparent'
                )}
              >
                <span>{fw}</span>
                <span className="text-xs text-fg-subtle">
                  {templates.filter((t) => t.framework === fw).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="heading-eyebrow mb-3">Category</h3>
          <div className="flex flex-col gap-0.5 max-h-[60vh] overflow-y-auto pr-2">
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCat(selectedCat === c.name ? null : c.name)}
                className={cn(
                  'px-3 py-2 text-sm rounded-md text-left transition-colors flex items-center justify-between',
                  selectedCat === c.name
                    ? 'bg-accent/10 text-accent'
                    : 'text-fg-muted hover:text-fg hover:bg-bg-subtle'
                )}
              >
                <span className="truncate">{c.name}</span>
                <span className="text-xs text-fg-subtle ml-2 flex-shrink-0">
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0">
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 372 templates by title, trigger, or content..."
            className="input pl-11 pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg p-1"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-fg-muted font-mono">
            <span className="text-fg font-semibold">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'template' : 'templates'}
            {hasFilter && (
              <>
                {' '}of <span className="text-fg-subtle">{templates.length}</span>
              </>
            )}
          </p>
          {hasFilter && (
            <button
              onClick={clearAll}
              className="text-xs font-mono text-fg-muted hover:text-fg flex items-center gap-1"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-fg-muted">
                No templates match. Try a different search or clear filters.
              </p>
            </div>
          ) : (
            filtered.map((t) => <TemplateCard key={t.id} template={t} />)
          )}
        </div>
      </div>
    </div>
  );
}
