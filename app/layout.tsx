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
    'prompt engineer portfolio',
    'AI workflow',
    'system prompts',
    'custom GPT',
    'prompt design',
    'how to write better prompts',
  ],
  authors: [{ name: 'nifty', url: 'https://github.com/IgorCSIS' }],
  creator: 'nifty',
  publisher: 'nifty',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME}, ${TAGLINE}`,
    description: DESC,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'The MASTER Prompt Library, 427 career-grade prompts on the 9-layer MASTER framework',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME}, ${TAGLINE}`,
    description: DESC,
    images: ['/og-image.svg'],
    creator: '@nifty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESC,
      publisher: { '@id': `${SITE_URL}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/library/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'nifty',
      url: 'https://github.com/IgorCSIS',
      sameAs: ['https://github.com/IgorCSIS'],
    },
    {
      '@type': 'CreativeWork',
      '@id': `${SITE_URL}/#library`,
      name: SITE_NAME,
      description: DESC,
      author: { '@id': `${SITE_URL}/#person` },
      keywords:
        'prompt engineering, MASTER framework, ChatGPT, Claude, Gemini, prompt library, AI prompts',
      inLanguage: 'en',
      license: 'https://creativecommons.org/licenses/by/4.0/',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
