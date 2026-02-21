import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Validator — Validate & Lint JSON Online',
  description:
    'Free online JSON validator. Check your JSON for syntax errors with detailed error messages and line numbers. 100% client-side.',
  keywords: ['json validator', 'json lint', 'validate json', 'json syntax checker'],
  openGraph: {
    title: 'JSON Validator — Validate & Lint JSON Online',
    description: 'Check your JSON for syntax errors with detailed error messages. Free, fast, 100% browser-based.',
    url: 'https://formatterjson.org/json-validator',
  },
  twitter: {
    title: 'JSON Validator — Validate & Lint JSON Online',
    description: 'Check your JSON for syntax errors with detailed error messages. Free, fast, 100% browser-based.',
  },
  alternates: { canonical: 'https://formatterjson.org/json-validator' },
};

export default function JsonValidatorPage() {
  return <ToolPage toolId="json-validator" />;
}
