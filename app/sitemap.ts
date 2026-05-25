import type { MetadataRoute } from 'next';

const BASE = 'https://IgorCSIS.github.io/prompt-library';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/framework/`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/library/`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${BASE}/exercises/`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/scraped/`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${BASE}/about/`, priority: 0.6, changeFrequency: 'monthly' as const },
  ];
  return routes.map((r) => ({ ...r, lastModified: now }));
}
