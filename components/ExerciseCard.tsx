'use client';

import { useState } from 'react';
import { ChevronDown, Zap, BookOpen } from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { PromptBlock } from './PromptBlock';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [open, setOpen] = useState(false);
  const isFullMaster = exercise.framework === 'Full MASTER';

  return (
    <article id={exercise.id} className="card transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-bg-elevated border border-border flex items-center justify-center font-mono text-xs text-accent">
          {exercise.exercise.split(' ')[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={cn('chip', isFullMaster ? 'chip-accent' : 'chip-muted')}>
              {isFullMaster && <Zap size={10} />}
              {exercise.framework}
            </span>
            <span className="chip-muted">
              <BookOpen size={10} /> Ch {exercise.chapter}
            </span>
          </div>
          <h3 className="font-semibold text-fg text-base leading-snug">
            {exercise.title}
          </h3>
          <p className="text-sm text-fg-muted mt-1.5 leading-relaxed">
            <span className="text-fg-subtle font-mono text-xs">USE WHEN: </span>
            {exercise.use_when}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={cn('flex-shrink-0 mt-2 text-fg-muted transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 animate-slide-up border-t border-border-subtle pt-4 mt-1">
          <section>
            <h4 className="heading-eyebrow mb-2">My setup</h4>
            <p className="text-sm text-fg leading-relaxed">{exercise.my_setup}</p>
          </section>

          <section>
            <h4 className="heading-eyebrow mb-2">The prompt I ran</h4>
            <PromptBlock text={exercise.prompt_used} showCopy />
          </section>

          <section>
            <h4 className="heading-eyebrow mb-2">What happened</h4>
            <p className="text-sm text-fg leading-relaxed">{exercise.what_happened}</p>
          </section>

          <section className="px-4 py-3 rounded-md bg-bg-subtle border-l-2 border-accent">
            <h4 className="heading-eyebrow mb-1">My note</h4>
            <p className="text-sm text-fg-muted leading-relaxed italic">
              {exercise.my_note}
            </p>
          </section>

          <section>
            <h4 className="heading-eyebrow mb-2">Reusable template, for future me</h4>
            <PromptBlock text={exercise.reusable_template} showCopy />
          </section>
        </div>
      )}
    </article>
  );
}
