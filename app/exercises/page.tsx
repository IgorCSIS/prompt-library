import { ExerciseCard } from '@/components/ExerciseCard';
import { exercises, getChapters, exercisesByChapter } from '@/lib/data';

export const metadata = {
  title: 'Completed CSIS 275 Exercises',
  description:
    'All 55 exercises from the CSIS 275 textbook, completed against real situations with personal notes.',
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
            Part I · {exercises.length} Completed Exercises
          </p>
          <h1 className="heading-display mb-6">Course exercises, done</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Every exercise from all 16 chapters of CSIS 275, completed against
            real situations from my own life — coffee brewing, a career
            inflection, a Sierra hike, an apology I owed a teammate. Each entry
            shows the prompt I ran, what came back, what I noticed, and the
            reusable template at the end for future use.
          </p>
        </div>
      </section>

      <section className="container-page pb-20 space-y-12">
        {chapters.map((ch) => {
          const chapterExercises = exercisesByChapter(ch);
          return (
            <div key={ch}>
              <div className="flex items-baseline justify-between mb-6 border-b border-border pb-3">
                <h2 className="text-2xl font-bold tracking-tight">
                  <span className="text-fg-subtle font-mono mr-3">
                    Ch {ch.toString().padStart(2, '0')}
                  </span>
                  {CHAPTER_TITLES[ch]}
                </h2>
                <span className="text-sm text-fg-muted font-mono">
                  {chapterExercises.length} exercises
                </span>
              </div>
              <div className="space-y-3">
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
