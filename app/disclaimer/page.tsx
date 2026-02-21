import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Disclaimer — DevTools Workspace',
  description: 'Disclaimer for DevTools Workspace. Important information about the use of our free online developer tools.',
  alternates: { canonical: 'https://formatterjson.org/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer">
      <p><em>Last updated: February 20, 2026</em></p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">General Disclaimer</h2>
      <p>
        The tools and information provided on DevTools Workspace (formatterjson.org) are for general informational and
        utility purposes only. While we strive to provide accurate and reliable tools, we make no representations or
        warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of
        the tools or information.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">No Professional Advice</h2>
      <p>
        The tools provided on this website are utility tools for data formatting, validation, and conversion. They are
        not a substitute for professional software development tools, testing frameworks, or production-grade validation
        systems. Always verify critical data independently before using it in production environments.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Use at Your Own Risk</h2>
      <p>
        Any reliance you place on the output of our tools is strictly at your own risk. We shall not be liable for any
        loss or damage, including without limitation, indirect or consequential loss or damage, arising from the use of
        our tools.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Client-Side Processing</h2>
      <p>
        All data processing happens in your browser. We do not have access to your data and cannot recover lost data.
        You are responsible for backing up your data before processing.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Third-Party Content</h2>
      <p>
        This website may display third-party advertisements (via Google AdSense) and link to external websites. We do
        not endorse and are not responsible for the content, products, or services offered by third parties.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">Changes</h2>
      <p>
        We reserve the right to modify this disclaimer at any time without notice. Please review this page periodically
        for updates.
      </p>

      <p className="mt-6">
        For questions, visit our <a href="/contact" className="text-dt-accent hover:underline">Contact page</a>.
      </p>
    </LegalPageLayout>
  );
}
