import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'Base64 Decoder — Decode Base64 Online Free',
  description: 'Decode Base64 strings to plain text. Reverse Base64 encoding instantly. 100% client-side.',
  keywords: ['base64 decode', 'base64 decoder', 'decode base64', 'base64 decode online'],
  openGraph: { title: 'Base64 Decoder — Decode Base64 Online Free', description: 'Decode Base64 instantly. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/base64-decode' },
  twitter: { title: 'Base64 Decoder — Decode Base64 Online Free', description: 'Decode Base64 instantly. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/base64-decode' },
};

export default function Base64DecodePage() {
  return <ToolPage toolId="base64-decode" />;
}
