import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
// import { LanguageProvider } from '@/contexts/LanguageContext'; // ❌ Bunu kaldır

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
        <ThemeProvider>
          {children}  {/* LanguageProvider'ı kaldırdık */}
        </ThemeProvider>
      </body>
    </html>
  );
}