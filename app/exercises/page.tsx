import type { Metadata } from 'next';
import { ExerciseCard } from '@/components/ExerciseCard';
import { exercises, getChapters, exercisesByChapter } from '@/lib/data';

export const metadata: Metadata = {
  title: '55 Completed Prompt Engineering Exercises',
  description:
    'All 55 exercises from the prompt engineering textbook, completed against real situations: coffee brewing comparisons, a real EM career decision, a Sierra hiking trip, an apology to a teammate. Each entry shows the prompt, the output, what I noticed, and a reusable template.',
  keywords: [
    'prompt engineering',
    'prompt engineering course',
    'prompt engineering exercises',
    'AI course exercises',
    'prompt log',
    'completed prompt examples',
    'how to do prompt engineering exercises',
    'MASTER framework examples',
  ],
  alternates: { canonical: '/exercises/' },
  openGraph: {
    title: '55 Completed Prompt Engineering Exercises',
    description:
      'Every textbook exercise done against real situations with prompts, outputs, and personal notes.',
    url: '/exercises/',
    images: ['/og-image.svg'],
  },
};

const CHAPTER_TITLES: Record<number, string> = {
  1: 'The Machine That Predicts',
  2: 'What AI Can Do',
  3: 'How Prompts Actually Work',
  4: 'Context Is Everything',
  5: 'The Techniques Worth Knowing',
  6: 'Getting Consistent Results',
  7: 'Making the Output Fit the Purpose',
  8: 'Tone, Audience, and Voice',
  9: 'The Failure Modes',
  10: 'Verification in Practice',
  11: 'Where Bias Comes From',
  12: 'Evaluating Outputs Critically',
  13: 'Prompt Chaining',
  14: 'Putting It All Together',
  15: 'Evaluating New Tools',
  16: 'Keeping Your Skills Current',
};

export default function ExercisesPage() {
  const chapters = getChapters();

  return (
    <>
      <section className="container-page pt-16 pb-8">
        <div className="max-w-3xl">
          <p className="heading-eyebrow mb-5">
            Part I &middot; {exercises.length} Completed Exercises
          </p>
          <h1 className="heading-display mb-6">Course exercises, done</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Every exercise from all 16 chapters of prompt engineering practice,
            completed against real situations from my own life, coffee brewing,
            a career inflection, a Sierra hike, an apology I owed a teammate.
            Each entry shows the prompt I ran, what came back, what I noticed,
            and the reusable template at the end for future use.
          </p>
        </div>
      </section>

      <section className="container-page pb-20 space-y-12">
        {chapters.map((ch) => {
          const chapterExercises = exercisesByChapter(ch);
          return (
            <div key={ch} id={`chapter-${ch}`} className="space-y-4">
              <div className="border-b border-border pb-3">
                <p className="heading-eyebrow mb-2">Chapter {ch}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-fg tracking-tight">
                  {CHAPTER_TITLES[ch] ?? `Chapter ${ch}`}
                </h2>
                <p className="text-sm text-fg-subtle mt-1.5 font-mono">
                  {chapterExercises.length}{' '}
                  {chapterExercises.length === 1 ? 'exercise' : 'exercises'}
                </p>
              </div>

              <div className="grid gap-4">
                {chapterExercises.map((ex) => (
                  <ExerciseCard key={ex.id} exercise={ex} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
