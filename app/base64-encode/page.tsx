import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'Base64 Encoder — Encode to Base64 Online Free',
  description: 'Encode text or binary data to Base64. Safe for URLs, JSON, and email. 100% client-side.',
  keywords: ['base64 encode', 'base64 encoder', 'encode base64', 'base64 encode online'],
  openGraph: { title: 'Base64 Encoder — Encode to Base64 Online Free', description: 'Encode to Base64 instantly. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/base64-encode' },
  twitter: { title: 'Base64 Encoder — Encode to Base64 Online Free', description: 'Encode to Base64 instantly. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/base64-encode' },
};

export default function Base64EncodePage() {
  return <ToolPage toolId="base64-encode" />;
}
