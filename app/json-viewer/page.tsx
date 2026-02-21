import type { Metadata } from 'next';
import ToolPage from '@/components/editor/ToolPage';

export const metadata: Metadata = {
  title: 'JSON Viewer — View & Explore JSON Online Free',
  description: 'View JSON in an interactive tree. Format, validate, and explore nested structures. 100% client-side.',
  keywords: ['json viewer', 'json tree', 'json explorer', 'view json online'],
  openGraph: { title: 'JSON Viewer — View JSON Online Free', description: 'Interactive JSON tree viewer. Free, fast, 100% browser-based.', url: 'https://formatterjson.org/json-viewer' },
  twitter: { title: 'JSON Viewer — View JSON Online Free', description: 'Interactive JSON tree viewer. Free, fast, 100% browser-based.' },
  alternates: { canonical: 'https://formatterjson.org/json-viewer' },
};

export default function JsonViewerPage() {
  return <ToolPage toolId="json-viewer" />;
}
