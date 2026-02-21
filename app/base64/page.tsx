import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'Base64 Encode/Decode — Online Base64 Encoder & Decoder',
  description:
    'Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 to plain text with UTF-8 support. 100% client-side.',
  keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'base64 online'],
  openGraph: {
    title: 'Base64 Encode/Decode — Online Base64 Encoder & Decoder',
    description: 'Encode text to Base64 or decode Base64 to plain text with UTF-8 support. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/base64',
  },
  twitter: {
    title: 'Base64 Encode/Decode — Online Base64 Encoder & Decoder',
    description: 'Encode text to Base64 or decode Base64 to plain text with UTF-8 support. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/base64' },
};

export default function Base64Page() {
  return <ToolPage toolId="base64" />;
}
