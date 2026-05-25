import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The MASTER Prompt Library — nifty',
  description:
    'A career-grade library of 427 prompts built on the 9-layer MASTER framework. Completed CSIS 275 exercises, daily-use templates, and a live scraped feed of the best prompts from across the web.',
  keywords: [
    'prompt engineering',
    'MASTER framework',
    'LLM',
    'Claude',
    'ChatGPT',
    'AI prompts',
    'prompt library',
    'CSIS 275',
  ],
  authors: [{ name: 'nifty' }],
  openGraph: {
    title: 'The MASTER Prompt Library',
    description: '427 career-grade prompts on the 9-layer MASTER framework.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
