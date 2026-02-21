import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Minifier — Compress & Minify JSON Online',
  description:
    'Free online JSON minifier. Remove whitespace and line breaks from JSON to reduce file size. 100% client-side processing.',
  keywords: ['json minifier', 'minify json', 'compress json', 'json compressor'],
  openGraph: {
    title: 'JSON Minifier — Compress & Minify JSON Online',
    description: 'Remove whitespace and line breaks from JSON to reduce file size. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-minifier',
  },
  twitter: {
    title: 'JSON Minifier — Compress & Minify JSON Online',
    description: 'Remove whitespace and line breaks from JSON to reduce file size. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-minifier' },
};

export default function JsonMinifierPage() {
  return <ToolPage toolId="json-minifier" />;
}
