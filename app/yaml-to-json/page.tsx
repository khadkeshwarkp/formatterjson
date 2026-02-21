import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'YAML to JSON Converter — Convert YAML to JSON Online Free',
  description:
    'Free online YAML to JSON converter. Paste YAML and get JSON output. 100% client-side, no data sent to servers.',
  keywords: ['yaml to json', 'yaml json converter', 'convert yaml to json'],
  openGraph: {
    title: 'YAML to JSON Converter — Convert YAML to JSON Online Free',
    description: 'Convert YAML to JSON format instantly. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/yaml-to-json',
  },
  twitter: {
    title: 'YAML to JSON Converter — Convert YAML to JSON Online Free',
    description: 'Convert YAML to JSON format instantly. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/yaml-to-json' },
};

export default function YamlToJsonPage() {
  return <ToolPage toolId="yaml-to-json" />;
}
