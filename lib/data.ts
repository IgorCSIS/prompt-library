import type { Template, Exercise, Category, ScrapedFeed } from './types';
import templatesJson from '@/data/templates.json';
import exercisesJson from '@/data/exercises.json';
import categoriesJson from '@/data/categories.json';
import scrapedJson from '@/data/scraped.json';

export const templates = templatesJson as Template[];
export const exercises = exercisesJson as Exercise[];
export const categories = categoriesJson as Category[];
export const scraped = scrapedJson as ScrapedFeed;

export function templatesByCategory(slug: string): Template[] {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return [];
  return templates.filter((t) => t.category === cat.name);
}

export function exercisesByChapter(chapter: number): Exercise[] {
  return exercises.filter((e) => e.chapter === chapter);
}

export function getChapters(): number[] {
  return Array.from(new Set(exercises.map((e) => e.chapter))).sort((a, b) => a - b);
}

export const STATS = {
  totalPrompts: templates.length + exercises.length,
  templates: templates.length,
  exercises: exercises.length,
  categories: categories.length,
  chapters: 16,
  fullMaster: templates.filter((t) => t.framework === 'Full MASTER').length +
    exercises.filter((e) => e.framework === 'Full MASTER').length,
  masterLite: templates.filter((t) => t.framework === 'MASTER-lite').length +
    exercises.filter((e) => e.framework === 'MASTER-lite').length,
};
