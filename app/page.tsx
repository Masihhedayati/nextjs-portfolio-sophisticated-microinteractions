import '@root/animations.scss';
import '@root/global.scss';

// import * as Constants from '@common/constants';
// import * as Utilities from '@common/utilities';

import PortfolioApplicationComplete from '@components/PortfolioApplicationComplete';
import DefaultLayout from '@components/DefaultLayout';
import Package from '@root/package.json';
import Script from 'next/script';

export async function generateMetadata({ params, searchParams }) {
  const title = 'John Doe - Full Stack Developer Portfolio';
  const description = 'Experienced Full Stack Developer specializing in React, Node.js, and cloud technologies. View my projects and get in touch.';
  const url = 'https://johndoe.dev';
  const handle = '@johndoe';

  return {
    description,
    keywords: ['full stack developer', 'react developer', 'node.js developer', 'portfolio', 'web developer', 'software engineer'],
    authors: [{ name: 'John Doe' }],
    creator: 'John Doe',
    icons: {
      apple: [{ url: '/apple-touch-icon.png' }, { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      icon: '/favicon-32x32.png',
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/apple-touch-icon-precomposed.png',
        },
      ],
      shortcut: '/favicon-16x16.png',
    },
    metadataBase: new URL('https://johndoe.dev'),
    openGraph: {
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 628,
          alt: 'John Doe - Full Stack Developer Portfolio',
        },
      ],
      title,
      type: 'website',
      url,
      siteName: 'John Doe Portfolio',
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      creator: handle,
      images: ['/og-image.png'],
      title,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Page(props) {
  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      <PortfolioApplicationComplete />
    </DefaultLayout>
  );
}
