import type { Metadata, Viewport } from 'next';
import '@/index.css';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06130E',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://crunique.com'),
  title: 'CRUNIQUE — From Our Family to Yours | 100% Real Fruit Chips',
  description: 'India’s premier luxury real fruit chips brand. Made with 100% natural real fruit, zero oil, zero added sugar, and family care.',
  keywords: ['Fruit Chips', 'Real Fruit Crisps', 'Healthy Snacks', 'Apple Chips', 'Banana Chips', 'Kiwi Chips', 'Guava Chips', 'Pineapple Chips', 'CRUNIQUE'],
  openGraph: {
    title: 'CRUNIQUE — Premium Real Fruit Chips',
    description: 'Transforming everyday snacking into an extraordinary family luxury experience.',
    url: 'https://crunique.com',
    siteName: 'CRUNIQUE',
    images: [
      {
        url: '/assets/images/crunique_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'CRUNIQUE Real Fruit Chips'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRUNIQUE — From Our Family to Yours',
    description: '100% Real Fruit Chips. Zero added sugar. Pure luxury crunch.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="app-root">
        <AppProvider>
          <CursorGlow />
          <Header />
          <main id="main-content">{children}</main>
          <ProductModal />
          <CartDrawer />
          <WishlistDrawer />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
