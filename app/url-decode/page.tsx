import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'URL Decoder — Decode URL-Encoded Text Online Free',
  description: 'Decode URL-encoded strings. Convert percent-encoded text back to plain text.',
  keywords: ['url decode', 'url decoder', 'percent decode', 'decode url'],
  openGraph: { title: 'URL Decoder — Decode URLs Online Free', description: 'Decode URL-encoded text. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/url-decode' },
  twitter: { title: 'URL Decoder — Decode URLs Online Free', description: 'Decode URL-encoded text. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/url-decode' },
};

export default function UrlDecodePage() {
  return <ToolPage toolId="url-decode" />;
}
