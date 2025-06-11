import Providers from '@components/Providers';
import ErrorBoundary from '@components/ErrorBoundary';

export const metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Passionate developer with expertise in React, Node.js, and cloud technologies. Building digital experiences with modern web technologies.',
  keywords: 'portfolio, full stack developer, react, nodejs, web development',
  authors: [{ name: 'Portfolio Developer' }],
  creator: 'Portfolio Developer',
  publisher: 'Portfolio Developer',
  robots: 'index, follow',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.dev',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.dev',
    title: 'Portfolio - Full Stack Developer',
    description: 'Passionate developer building digital experiences with modern web technologies.',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Full Stack Developer',
    description: 'Passionate developer building digital experiences with modern web technologies.',
    creator: '@portfolio',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        
        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Prevent FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { visibility: hidden; opacity: 0; }
            html.wf-active { visibility: visible; opacity: 1; }
          `
        }} />
      </head>
      <body className="theme-blue">
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Basic performance monitoring
                if ('performance' in window) {
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      const timing = performance.timing;
                      const metrics = {
                        ttfb: timing.responseStart - timing.navigationStart,
                        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                        load: timing.loadEventEnd - timing.navigationStart
                      };
                      
                      if (window.gtag && typeof window.gtag === 'function') {
                        window.gtag('event', 'timing_complete', {
                          name: 'page_load',
                          value: metrics.load
                        });
                      }
                    }, 1000);
                  });
                }
                
                // Show page after initial load
                document.documentElement.classList.add('wf-active');
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
