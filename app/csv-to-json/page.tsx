import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'CSV to JSON Converter — Convert CSV to JSON Online Free',
  description:
    'Free online CSV to JSON converter. Paste CSV and get JSON array. First row becomes keys. 100% client-side, no data sent to servers.',
  keywords: ['csv to json', 'csv json converter', 'convert csv to json'],
  openGraph: {
    title: 'CSV to JSON Converter — Convert CSV to JSON Online Free',
    description: 'Convert CSV to JSON format instantly. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/csv-to-json',
  },
  twitter: {
    title: 'CSV to JSON Converter — Convert CSV to JSON Online Free',
    description: 'Convert CSV to JSON format instantly. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/csv-to-json' },
};

export default function CsvToJsonPage() {
  return <ToolPage toolId="csv-to-json" />;
}
