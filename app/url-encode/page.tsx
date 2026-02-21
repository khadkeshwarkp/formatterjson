import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'URL Encoder — Encode Text for URLs Online Free',
  description: 'Encode text for use in URLs. Convert spaces and special characters to percent-encoded format.',
  keywords: ['url encode', 'url encoder', 'percent encode', 'encode url'],
  openGraph: { title: 'URL Encoder — Encode for URLs Online Free', description: 'Encode text for URLs. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/url-encode' },
  twitter: { title: 'URL Encoder — Encode for URLs Online Free', description: 'Encode text for URLs. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/url-encode' },
};

export default function UrlEncodePage() {
  return <ToolPage toolId="url-encode" />;
}
