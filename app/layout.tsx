import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dovvy.ca'),
  title: { default: 'Dovvy — Turn connections into conversations', template: '%s | Dovvy' },
  description: 'Scan business cards, review contact details, and create personal follow-up drafts with Dovvy. Built for your next conversation.',
  icons: {
    icon: [
      { url: '/branding/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/branding/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/branding/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/branding/dovvy-favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/branding/favicon-180.png', sizes: '180x180', type: 'image/png' },
  },
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Dovvy', title: 'A business card is just the beginning.', description: 'Turn the cards you collect into follow-ups you’ll actually send.', images: ['/opengraph-image'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-CA"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
