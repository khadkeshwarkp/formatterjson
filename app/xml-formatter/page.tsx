import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'XML Formatter — Beautify XML Online Free',
  description:
    'Free online XML formatter. Format and beautify XML with proper indentation. 100% client-side, no data sent to servers.',
  keywords: ['xml formatter', 'xml beautifier', 'format xml', 'prettify xml'],
  openGraph: {
    title: 'XML Formatter — Beautify XML Online Free',
    description: 'Format and beautify XML with proper indentation. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/xml-formatter',
  },
  twitter: {
    title: 'XML Formatter — Beautify XML Online Free',
    description: 'Format and beautify XML with proper indentation. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/xml-formatter' },
};

export default function XmlFormatterPage() {
  return <ToolPage toolId="xml-formatter" />;
}
