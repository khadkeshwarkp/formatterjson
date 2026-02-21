import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

const SITE_URL = 'https://formatterjson.org';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Developer Tools Online',
  description:
    'Format, validate, minify JSON. XML, YAML, Base64, URL encode/decode. Free developer tools — 100% client-side, no sign-up.',
  keywords: [
    'JSON formatter',
    'JSON tools',
    'developer tools online',
    'free JSON formatter',
    'JSON validator online',
  ],
  openGraph: {
    title: 'Free JSON Formatter & Developer Tools Online',
    description: 'Format, validate, convert JSON, XML, YAML. Base64, URL encode/decode. Free, fast, 100% browser-based.',
    url: SITE_URL,
  },
  twitter: {
    title: 'Free JSON Formatter & Developer Tools Online',
    description: 'Format, validate, convert JSON, XML, YAML. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: SITE_URL },
};

/** Homepage is JSON Formatter by default — no redirect, same tool UI at /. */
export default function HomePage() {
  return <ToolPage toolId="json-formatter" />;
}
