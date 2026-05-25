export type Framework = 'Full MASTER' | 'MASTER-lite';

export interface Template {
  id: string;
  type: 'template';
  category: string;
  title: string;
  use_when: string;
  framework: Framework;
  prompt: string;
  notes: string;
}

export interface Exercise {
  id: string;
  type: 'exercise';
  chapter: number;
  exercise: string;
  title: string;
  use_when: string;
  framework: Framework;
  my_setup: string;
  prompt_used: string;
  what_happened: string;
  my_note: string;
  reusable_template: string;
  notes: string;
}

export interface Category {
  name: string;
  count: number;
  slug: string;
}

export interface ScrapedPrompt {
  id: string;
  title: string;
  source_url: string;
  source_name: string;
  scraped_at: string;
  category?: string;
  prompt: string;
  attribution?: string;
  notes?: string;
}

export interface ScrapedFeed {
  schema_version: string;
  last_updated: string | null;
  sources: string[];
  prompts: ScrapedPrompt[];
}
