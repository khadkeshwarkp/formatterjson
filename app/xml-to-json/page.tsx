import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'XML to JSON Converter — Convert XML to JSON Online Free',
  description:
    'Free online XML to JSON converter. Paste XML and get JSON output. 100% client-side, no data sent to servers.',
  keywords: ['xml to json', 'xml json converter', 'convert xml to json'],
  openGraph: {
    title: 'XML to JSON Converter — Convert XML to JSON Online Free',
    description: 'Convert XML to JSON format instantly. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/xml-to-json',
  },
  twitter: {
    title: 'XML to JSON Converter — Convert XML to JSON Online Free',
    description: 'Convert XML to JSON format instantly. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/xml-to-json' },
};

export default function XmlToJsonPage() {
  return <ToolPage toolId="xml-to-json" />;
}
