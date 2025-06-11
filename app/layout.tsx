import Providers from '@components/Providers';

export const metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Passionate developer with expertise in React, Node.js, and cloud technologies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-blue">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
