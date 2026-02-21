import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'HTML Formatter — Beautify HTML Online Free',
  description: 'Format and beautify HTML with proper indentation. Make minified HTML readable. 100% client-side.',
  keywords: ['html formatter', 'format html', 'html beautifier', 'html formatter online'],
  openGraph: { title: 'HTML Formatter — Beautify HTML Online Free', description: 'Format HTML with indentation. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/html-formatter' },
  twitter: { title: 'HTML Formatter — Beautify HTML Online Free', description: 'Format HTML with indentation. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/html-formatter' },
};

export default function HtmlFormatterPage() {
  return <ToolPage toolId="html-formatter" />;
}
