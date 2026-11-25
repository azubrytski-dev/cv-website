import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';
import '../styles/global.scss';
import '../styles/Navbar.scss';
import '../styles/Layout.scss';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Andrei Zubrytski | CV',
  description: 'Portfolio and CV website for Andrei Zubrytski',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
