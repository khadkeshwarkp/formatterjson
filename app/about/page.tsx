import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'About Us — DevTools Workspace',
  description: 'Learn about DevTools Workspace — free, privacy-first online developer tools. 100% client-side processing, no data collection.',
  alternates: { canonical: 'https://formatterjson.org/about' },
};

export default function AboutPage() {
  return (
    <LegalPageLayout title="About DevTools Workspace">
      <p>
        DevTools Workspace is a free collection of online developer tools designed for speed, privacy, and simplicity.
        Our tools help software developers, data engineers, QA testers, and technical writers work with JSON, XML, Base64,
        and other data formats without installing any software.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Our Mission</h2>
      <p>
        We believe developer tools should be fast, free, and private. Every tool on DevTools Workspace processes data
        entirely in your browser. No data is ever uploaded to a server, stored in a database, or shared with third parties.
        Your data stays on your machine at all times.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">What We Offer</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>JSON Formatter</strong> — Beautify and pretty-print JSON with proper indentation.</li>
        <li><strong>JSON Validator</strong> — Check JSON for syntax errors with detailed error messages.</li>
        <li><strong>JSON Minifier</strong> — Compress JSON by removing whitespace to reduce file size.</li>
        <li><strong>JSON to XML Converter</strong> — Transform JSON data into well-formed XML.</li>
        <li><strong>Base64 Encoder/Decoder</strong> — Encode text to Base64 or decode Base64 to plain text.</li>
      </ul>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Technology</h2>
      <p>
        DevTools Workspace is built with modern web technologies including Next.js, React, TypeScript, and the Monaco Editor
        (the same editor engine that powers Visual Studio Code). The application is statically generated for maximum
        performance and served over a global CDN for fast load times worldwide.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Privacy First</h2>
      <p>
        We take privacy seriously. All data processing happens in your browser using JavaScript. We do not collect, store,
        or transmit any data you enter into our tools. We use Google Analytics for aggregate traffic analysis and Google
        AdSense for advertising, both subject to your consent preferences. See our{' '}
        <a href="/privacy" className="text-dt-accent hover:underline">Privacy Policy</a> for full details.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Contact</h2>
      <p>
        Have questions, suggestions, or feedback? Visit our{' '}
        <a href="/contact" className="text-dt-accent hover:underline">Contact page</a> to get in touch.
      </p>
    </LegalPageLayout>
  );
}
