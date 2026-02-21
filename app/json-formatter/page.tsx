import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Formatter — Beautify & Pretty Print JSON Online',
  description:
    'Free online JSON formatter. Paste raw JSON and instantly beautify it with proper indentation. 100% client-side, no data sent to servers.',
  keywords: ['json formatter', 'json beautifier', 'pretty print json', 'format json online'],
  openGraph: {
    title: 'JSON Formatter — Beautify & Pretty Print JSON Online',
    description: 'Paste raw JSON and instantly beautify it with proper indentation. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-formatter',
  },
  twitter: {
    title: 'JSON Formatter — Beautify & Pretty Print JSON Online',
    description: 'Paste raw JSON and instantly beautify it with proper indentation. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-formatter' },
};

export default function JsonFormatterPage() {
  return <ToolPage toolId="json-formatter" />;
}
