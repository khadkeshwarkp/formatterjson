import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Schema Generator — Infer Schema from JSON Online Free',
  description:
    'Free online JSON Schema generator. Paste JSON and infer schema with types, properties, and required fields. 100% client-side.',
  keywords: ['json schema', 'schema generator', 'infer schema', 'json schema generator'],
  openGraph: {
    title: 'JSON Schema Generator — Infer Schema from JSON Online Free',
    description: 'Generate JSON Schema from sample JSON. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-schema-generator',
  },
  twitter: {
    title: 'JSON Schema Generator — Infer Schema from JSON Online Free',
    description: 'Generate JSON Schema from sample JSON. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-schema-generator' },
};

export default function JsonSchemaGeneratorPage() {
  return <ToolPage toolId="json-schema-generator" />;
}
