import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON to YAML Converter — Convert JSON to YAML Online Free',
  description:
    'Free online JSON to YAML converter. Paste JSON and get YAML output with proper formatting. 100% client-side, no data sent to servers.',
  keywords: ['json to yaml', 'json yaml converter', 'convert json to yaml'],
  openGraph: {
    title: 'JSON to YAML Converter — Convert JSON to YAML Online Free',
    description: 'Convert JSON to YAML format instantly. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-to-yaml',
  },
  twitter: {
    title: 'JSON to YAML Converter — Convert JSON to YAML Online Free',
    description: 'Convert JSON to YAML format instantly. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-to-yaml' },
};

export default function JsonToYamlPage() {
  return <ToolPage toolId="json-to-yaml" />;
}
