import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cardpulse.com'),
  title: { default: 'Dovvy — Turn connections into conversations', template: '%s | Dovvy' },
  description: 'Scan business cards, review contact details, and create personal follow-up drafts with Dovvy. Built for your next conversation.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Dovvy', title: 'A business card is just the beginning.', description: 'Turn the cards you collect into follow-ups you’ll actually send.', images: ['/opengraph-image'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-CA"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
