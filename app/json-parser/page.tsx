import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Parser — Parse & Validate JSON Online Free',
  description: 'Parse JSON strings online. Validate syntax, format output. 100% client-side.',
  keywords: ['json parser', 'parse json', 'json parser online', 'parse json string'],
  openGraph: { title: 'JSON Parser — Parse JSON Online Free', description: 'Parse and validate JSON instantly. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/json-parser' },
  twitter: { title: 'JSON Parser — Parse JSON Online Free', description: 'Parse and validate JSON instantly. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/json-parser' },
};

export default function JsonParserPage() {
  return <ToolPage toolId="json-parser" />;
}
