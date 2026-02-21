import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'YAML Formatter — Beautify YAML Online Free',
  description:
    'Free online YAML formatter. Format and beautify YAML with consistent indentation. 100% client-side, no data sent to servers.',
  keywords: ['yaml formatter', 'yaml beautifier', 'format yaml', 'prettify yaml'],
  openGraph: {
    title: 'YAML Formatter — Beautify YAML Online Free',
    description: 'Format and beautify YAML with proper indentation. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/yaml-formatter',
  },
  twitter: {
    title: 'YAML Formatter — Beautify YAML Online Free',
    description: 'Format and beautify YAML with proper indentation. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/yaml-formatter' },
};

export default function YamlFormatterPage() {
  return <ToolPage toolId="yaml-formatter" />;
}
