export const GA_TRACKING_ID = 'G-YBWK7P7H7J';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function pageview(url: string) {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

export function event({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}
