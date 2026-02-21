import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Pretty Print — Beautify JSON Online Free',
  description: 'Pretty print JSON with indentation. Make minified JSON readable in one click. 100% client-side.',
  keywords: ['json pretty print', 'pretty print json', 'json beautifier', 'format json'],
  openGraph: { title: 'JSON Pretty Print — Beautify JSON Online Free', description: 'Pretty print JSON instantly. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/json-pretty-print' },
  twitter: { title: 'JSON Pretty Print — Beautify JSON Online Free', description: 'Pretty print JSON instantly. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/json-pretty-print' },
};

export default function JsonPrettyPrintPage() {
  return <ToolPage toolId="json-pretty-print" />;
}
