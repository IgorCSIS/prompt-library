'use client';

import { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import type { Template } from '@/lib/types';
import { PromptBlock } from './PromptBlock';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: Template;
  defaultOpen?: boolean;
}

export function TemplateCard({ template, defaultOpen = false }: TemplateCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const isFullMaster = template.framework === 'Full MASTER';

  return (
    <article
      id={template.id}
      className="card group transition-all"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                'chip',
                isFullMaster ? 'chip-accent' : 'chip-muted'
              )}
            >
              {isFullMaster && <Zap size={10} />}
              {template.framework}
            </span>
            <span className="chip-muted">{template.category}</span>
          </div>
          <h3 className="font-semibold text-fg text-base leading-snug group-hover:text-accent transition-colors">
            {template.title}
          </h3>
          <p className="text-sm text-fg-muted mt-1.5 leading-relaxed">
            <span className="text-fg-subtle font-mono text-xs">USE WHEN: </span>
            {template.use_when}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            'flex-shrink-0 mt-1 text-fg-muted transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 animate-slide-up">
          <PromptBlock
            text={template.prompt}
            label="Template — fill in the brackets and run"
          />
          {template.notes && (
            <div className="px-4 py-3 rounded-md bg-bg-subtle border-l-2 border-accent">
              <p className="text-xs heading-eyebrow !text-accent mb-1">
                Notes
              </p>
              <p className="text-sm text-fg-muted leading-relaxed italic">
                {template.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
