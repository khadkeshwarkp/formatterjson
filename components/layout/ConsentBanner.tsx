'use client';

import { useEffect, useState } from 'react';

const BANNER_KEY = 'consent_choice_v1';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BANNER_KEY);
      if (!stored) {
        setVisible(true);
      } else if (stored === 'granted') {
        // Restore consent for returning users
        window.gtag &&
          window.gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted',
          });
      }
    } catch {}
  }, []);

  const updateConsent = (granted: boolean) => {
    try {
      localStorage.setItem(BANNER_KEY, granted ? 'granted' : 'denied');
    } catch {}

    const consent = granted
      ? {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        }
      : {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
        };

    window.gtag && window.gtag('consent', 'update', consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.3)] text-sm">
      <p className="m-0">
        We use cookies for analytics and ads. See our{' '}
        <a href="/privacy" className="text-blue-400 underline">
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => updateConsent(false)}
          className="px-3 py-1.5 bg-slate-700 text-white border-0 rounded-md cursor-pointer text-sm hover:bg-slate-600"
        >
          Reject All
        </button>
        <button
          onClick={() => updateConsent(true)}
          className="px-3 py-1.5 bg-green-500 text-[#0b1a0f] border-0 rounded-md cursor-pointer text-sm font-semibold hover:bg-green-400"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
