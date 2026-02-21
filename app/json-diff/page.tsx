import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Diff — Compare Two JSON Objects Online Free',
  description: 'Compare two JSON objects and see differences. Paste both separated by "---". 100% client-side.',
  keywords: ['json diff', 'json compare', 'compare json', 'json difference'],
  openGraph: { title: 'JSON Diff — Compare JSON Online Free', description: 'Compare two JSON objects instantly. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/json-diff' },
  twitter: { title: 'JSON Diff — Compare JSON Online Free', description: 'Compare two JSON objects instantly. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/json-diff' },
};

export default function JsonDiffPage() {
  return <ToolPage toolId="json-diff" />;
}
