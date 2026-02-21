import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON to XML Converter — Convert JSON to XML Online',
  description:
    'Free online JSON to XML converter. Transform JSON data into well-formed XML with proper nesting. 100% client-side.',
  keywords: ['json to xml', 'convert json to xml', 'json xml converter', 'json to xml online'],
  openGraph: {
    title: 'JSON to XML Converter — Convert JSON to XML Online',
    description: 'Transform JSON data into well-formed XML with proper nesting. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-to-xml',
  },
  twitter: {
    title: 'JSON to XML Converter — Convert JSON to XML Online',
    description: 'Transform JSON data into well-formed XML with proper nesting. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-to-xml' },
};

export default function JsonToXmlPage() {
  return <ToolPage toolId="json-to-xml" />;
}
