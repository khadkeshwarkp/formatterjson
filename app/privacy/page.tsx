import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — DevTools Workspace',
  description: 'Privacy Policy for DevTools Workspace. Learn how we handle your data. All tool processing is 100% client-side — no data is collected or stored.',
  alternates: { canonical: 'https://formatterjson.org/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p><em>Last updated: February 20, 2026</em></p>

      <p>
        This Privacy Policy describes how DevTools Workspace (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
        operated at formatterjson.org, collects, uses, and protects information when you use our website and tools.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">1. Data Processing</h2>
      <p>
        All data you enter into our developer tools (JSON, XML, Base64, etc.) is processed entirely in your web browser
        using client-side JavaScript. <strong>No user-entered data is ever transmitted to our servers, stored in any database,
        or shared with any third party.</strong> Your data remains on your device at all times.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">2. Local Storage</h2>
      <p>
        We use your browser&apos;s localStorage to save your preferences (theme, open tabs, recent tools) and your most recent
        input for each tool. This data is stored locally on your device and is never transmitted to our servers.
        You can clear this data at any time by clearing your browser&apos;s site data.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">3. Cookies and Analytics</h2>
      <p>
        We use Google Analytics to collect anonymous, aggregate data about how visitors use our website (pages visited,
        session duration, browser type, country). This helps us understand traffic patterns and improve the site.
        Google Analytics uses cookies, which are subject to your consent via our cookie banner.
      </p>
      <p>
        We participate in Google AdSense for advertising. AdSense may use cookies to serve ads based on your prior visits
        to this and other websites. You can opt out of personalized advertising at{' '}
        <a href="https://www.google.com/settings/ads" className="text-dt-accent hover:underline" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">4. Google Consent Mode</h2>
      <p>
        We implement Google Consent Mode v2. By default, all analytics and advertising storage is denied until you
        explicitly accept cookies via our consent banner. You can change your preference at any time by clearing your
        browser&apos;s site data and revisiting the site.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">5. Information We Do Not Collect</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>We do not require user accounts, registration, or login.</li>
        <li>We do not collect names, email addresses, or any personally identifiable information.</li>
        <li>We do not collect or store any data you enter into our tools.</li>
        <li>We do not use tracking pixels or fingerprinting beyond Google Analytics.</li>
      </ul>

      <h2 className="text-xl font-semibold text-dt-text mt-6">6. Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Google Analytics</strong> — aggregate traffic analysis ({' '}
          <a href="https://policies.google.com/privacy" className="text-dt-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>)
        </li>
        <li><strong>Google AdSense</strong> — advertising ({' '}
          <a href="https://policies.google.com/technologies/ads" className="text-dt-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Google Ads Policy
          </a>)
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-dt-text mt-6">7. Children&apos;s Privacy</h2>
      <p>
        Our website is not directed to children under 13. We do not knowingly collect personal information from children.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
        Your continued use of the website after changes are posted constitutes acceptance of the revised policy.
      </p>

      <h2 className="text-xl font-semibold text-dt-text mt-6">9. Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please visit our{' '}
        <a href="/contact" className="text-dt-accent hover:underline">Contact page</a>.
      </p>
    </LegalPageLayout>
  );
}
