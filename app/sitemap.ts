import type { MetadataRoute } from 'next';

const SITE_URL = 'https://formatterjson.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = [
    '/json-formatter',
    '/json-validator',
    '/json-minifier',
    '/json-to-xml',
    '/json-to-csv',
    '/json-to-yaml',
    '/json-viewer',
    '/json-parser',
    '/json-pretty-print',
    '/csv-to-json',
    '/json-diff',
    '/json-schema-generator',
    '/yaml-formatter',
    '/yaml-to-json',
    '/xml-formatter',
    '/xml-validator',
    '/xml-to-json',
    '/html-formatter',
    '/url-encode',
    '/url-decode',
    '/base64',
    '/base64-encode',
    '/base64-decode',
    '/jwt-decoder',
  ];

  const legalRoutes = ['/about', '/privacy', '/terms', '/disclaimer', '/contact'];

  return [
    { url: SITE_URL, lastModified: new Date('2026-02-21'), changeFrequency: 'weekly' as const, priority: 1.0 },
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
