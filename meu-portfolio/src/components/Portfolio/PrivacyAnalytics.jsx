import { useEffect } from 'react';

const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;
const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;

export default function PrivacyAnalytics() {
  useEffect(() => {
    if (!scriptUrl || !websiteId || document.querySelector('script[data-portfolio-analytics]')) {
      return undefined;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptUrl;
    script.dataset.websiteId = websiteId;
    script.dataset.portfolioAnalytics = 'umami';
    script.dataset.domains = window.location.hostname;
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}

