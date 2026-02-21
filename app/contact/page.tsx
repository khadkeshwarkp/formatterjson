import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Contact Us — DevTools Workspace',
  description: 'Get in touch with the DevTools Workspace team. Report bugs, suggest features, or ask questions about our free online developer tools.',
  alternates: { canonical: 'https://formatterjson.org/contact' },
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us">
      <p>
        We appreciate your feedback and are happy to help with any questions about DevTools Workspace.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Get in Touch</h2>
      <p>
        For bug reports, feature requests, general inquiries, or partnership opportunities, please reach out via email:
      </p>
      <p className="my-4">
        <strong className="text-dt-text">Email:</strong>{' '}
        <a href="mailto:contact@formatterjson.org" className="text-dt-accent hover:underline">
          contact@formatterjson.org
        </a>
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Bug Reports</h2>
      <p>
        If you encounter a bug or unexpected behavior in any of our tools, please include the following information
        in your report:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Which tool you were using (e.g., JSON Formatter, Base64 Decoder)</li>
        <li>A description of what happened vs. what you expected</li>
        <li>Your browser name and version</li>
        <li>A sample input that reproduces the issue (if applicable)</li>
      </ul>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Feature Requests</h2>
      <p>
        Have an idea for a new tool or feature? We are actively expanding our toolset and welcome suggestions.
        Please describe the tool or feature you would like to see, along with an example use case.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Response Time</h2>
      <p>
        We aim to respond to all inquiries within 2 business days. For urgent matters, please indicate the urgency
        in your subject line.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Legal</h2>
      <p>
        For legal inquiries, please reference the relevant policy:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><a href="/privacy" className="text-dt-accent hover:underline">Privacy Policy</a></li>
        <li><a href="/terms" className="text-dt-accent hover:underline">Terms & Conditions</a></li>
        <li><a href="/disclaimer" className="text-dt-accent hover:underline">Disclaimer</a></li>
      </ul>
    </LegalPageLayout>
  );
}
