import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://streameeapp.github.io/Streamee-landing/'),
  alternates: { canonical: 'https://streameeapp.github.io/Streamee-landing/' },
  title: 'Streamee — Your media. Beautifully yours.',
  description: 'A polished Windows media discovery and playback app, powered by MPV and built around your choices.',
  icons: {
    icon: '/Streamee-landing/streamee-icon.png',
    apple: '/Streamee-landing/streamee-icon.png',
  },
  openGraph: {
    title: 'Streamee — Your media. Beautifully yours.',
    description: 'Discover what to watch and experience every frame through a Windows desktop player built around you.',
    url: 'https://streameeapp.github.io/Streamee-landing/',
    siteName: 'Streamee',
    images: [{ url: 'https://streameeapp.github.io/Streamee-landing/og.png', width: 1792, height: 1024, alt: 'Streamee — Your media. Beautifully yours.' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Streamee — Your media. Beautifully yours.',
    description: 'A polished Windows media discovery and playback app, powered by MPV.',
    images: ['https://streameeapp.github.io/Streamee-landing/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
