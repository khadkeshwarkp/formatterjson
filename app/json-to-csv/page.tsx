import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter — Convert JSON to CSV Online Free',
  description:
    'Free online JSON to CSV converter. Paste JSON array or object and get CSV output. 100% client-side, no data sent to servers.',
  keywords: ['json to csv', 'json csv converter', 'convert json to csv'],
  openGraph: {
    title: 'JSON to CSV Converter — Convert JSON to CSV Online Free',
    description: 'Convert JSON to CSV format instantly. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-to-csv',
  },
  twitter: {
    title: 'JSON to CSV Converter — Convert JSON to CSV Online Free',
    description: 'Convert JSON to CSV format instantly. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-to-csv' },
};

export default function JsonToCsvPage() {
  return <ToolPage toolId="json-to-csv" />;
}
