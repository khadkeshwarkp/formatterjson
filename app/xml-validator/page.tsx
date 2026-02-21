import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'XML Validator — Validate XML Online Free',
  description:
    'Free online XML validator. Check XML for well-formed syntax and get detailed error messages. 100% client-side, no data sent to servers.',
  keywords: ['xml validator', 'validate xml', 'xml check', 'xml lint'],
  openGraph: {
    title: 'XML Validator — Validate XML Online Free',
    description: 'Validate XML syntax instantly. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/xml-validator',
  },
  twitter: {
    title: 'XML Validator — Validate XML Online Free',
    description: 'Validate XML syntax instantly. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/xml-validator' },
};

export default function XmlValidatorPage() {
  return <ToolPage toolId="xml-validator" />;
}
