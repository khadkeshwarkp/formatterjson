import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JWT Decoder — Decode JWT Tokens Online Free',
  description:
    'Free online JWT decoder. Decode JWT header and payload as formatted JSON. 100% client-side, no data sent to servers.',
  keywords: ['jwt decoder', 'decode jwt', 'jwt token', 'jwt header payload'],
  openGraph: {
    title: 'JWT Decoder — Decode JWT Tokens Online Free',
    description: 'Decode JWT tokens and view header and payload. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/jwt-decoder',
  },
  twitter: {
    title: 'JWT Decoder — Decode JWT Tokens Online Free',
    description: 'Decode JWT tokens and view header and payload. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/jwt-decoder' },
};

export default function JwtDecoderPage() {
  return <ToolPage toolId="jwt-decoder" />;
}
