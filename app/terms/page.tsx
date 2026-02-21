import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions — DevTools Workspace',
  description: 'Terms and Conditions for using DevTools Workspace online developer tools.',
  alternates: { canonical: 'https://formatterjson.org/terms' },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p><em>Last updated: February 20, 2026</em></p>

      <p>
        By accessing and using DevTools Workspace (formatterjson.org), you agree to be bound by these Terms &amp; Conditions.
        If you do not agree to these terms, please do not use the website.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">1. Use of Service</h2>
      <p>
        DevTools Workspace provides free online developer tools for formatting, validating, converting, and encoding data.
        You may use these tools for personal and commercial purposes without restriction. The tools are provided on an
        &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">2. Client-Side Processing</h2>
      <p>
        All data processing occurs entirely within your web browser. We do not receive, store, or have access to any data
        you enter into our tools. You are solely responsible for the data you process using our tools.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">3. No Warranty</h2>
      <p>
        The tools and content on this website are provided without warranty of any kind, express or implied. We do not
        guarantee that the tools will be error-free, uninterrupted, or that the results will be accurate for all inputs.
        You use the tools at your own risk.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">4. Limitation of Liability</h2>
      <p>
        In no event shall DevTools Workspace, its operators, or contributors be liable for any direct, indirect,
        incidental, special, or consequential damages arising out of or in connection with the use of this website or
        its tools, even if advised of the possibility of such damages.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">5. Intellectual Property</h2>
      <p>
        The website design, branding, and original content are the intellectual property of DevTools Workspace. The
        open-source libraries used (Next.js, Monaco Editor, etc.) are subject to their respective licenses.
        Data you process using our tools remains your property.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">6. Third-Party Advertising</h2>
      <p>
        This website displays advertisements through Google AdSense. These ads may use cookies and tracking technologies
        as described in our <a href="/privacy" className="text-dt-accent hover:underline">Privacy Policy</a>. We are not
        responsible for the content of third-party advertisements.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">7. External Links</h2>
      <p>
        This website may contain links to external websites. We are not responsible for the content, privacy practices,
        or availability of external sites.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">8. Modifications</h2>
      <p>
        We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be posted on this page with
        an updated date. Continued use of the website constitutes acceptance of the modified terms.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">9. Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of
        law principles.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">10. Contact</h2>
      <p>
        For questions about these Terms &amp; Conditions, please visit our{' '}
        <a href="/contact" className="text-dt-accent hover:underline">Contact page</a>.
      </p>
    </LegalPageLayout>
  );
}
