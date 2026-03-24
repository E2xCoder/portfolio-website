import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Emre Eren - Software Developer',
  description: 'Portfolio website of Emre Eren, Software Developer from Germany',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M69F2N90WW"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M69F2N90WW');
          `}
        </Script>
      </body>
    </html>
  );
}