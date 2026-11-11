import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Vercel Web Analytics (visits, referrers) and Speed Insights (real-user Core Web
// Vitals). Both must be enabled in the Vercel dashboard; until then they no-op.
export default function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
