import type { MetadataRoute } from 'next';

const SITE_URL = 'https://formatterjson.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = [
    '/json-formatter',
    '/json-validator',
    '/json-minifier',
    '/json-to-xml',
    '/base64',
  ];

  const legalRoutes = ['/about', '/privacy', '/terms', '/disclaimer', '/contact'];

  return [
    ...toolRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'weekly' as const,
      priority: route === '/json-formatter' ? 1.0 : 0.9,
    })),
    ...legalRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'monthly' as const,
      priority: route === '/about' || route === '/contact' ? 0.4 : 0.3,
    })),
  ];
}
