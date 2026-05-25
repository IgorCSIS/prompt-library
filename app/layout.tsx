import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const SITE_URL = 'https://IgorCSIS.github.io/prompt-library';
const SITE_NAME = 'The MASTER Prompt Library';
const TAGLINE = 'Prompts engineered to actually work';
const DESC =
  '427 career-grade prompts built on the 9-layer MASTER framework. Completed prompt engineering exercises, daily-use templates for code, writing, analysis, planning, and negotiation, plus a live scraped feed of the best prompts from across the web.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, ${TAGLINE}`,
    template: `%s, ${SITE_NAME}`,
  },
  description: DESC,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: [
    'prompt engineering',
    'MASTER framework',
    'prompt library',
    'ChatGPT prompts',
    'Claude prompts',
    'Gemini prompts',
    'LLM prompts',
    'AI prompts',
    'best prompts',
    'prompt templates',
    'few-shot prompting',
    'chain of thought',
    'CO-STAR',
    'prompt engineering',
    'prompt en