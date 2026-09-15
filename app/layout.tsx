import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import './globals.css';
import { ExperienceProvider } from '@/components/experience-provider';
export const metadata: Metadata = {
  metadataBase: new URL('https://fundacjalepszydomlepszejutro.pl'),
  title: 'Razem zmieniamy jutro | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Pomagaj razem z Fundacją Lepszy Dom Lepsze Jutro. Poznaj nasze działania, wybierz akcję i sprawdź, jak możesz wesprzeć dzieci oraz rodziny.',
  alternates: { canonical: '/' }, robots: { index: false, follow: true }, // Concept contains clearly labelled demonstration data.
  openGraph: { type: 'website', locale: 'pl_PL', url: '/', siteName: 'Fundacja Lepszy Dom Lepsze Jutro', title: 'Każdy gest ma siłę. Razem zmieniamy jutro.', description: 'Poznaj działania Fundacji i zobacz, jak możesz pomóc dzieciom oraz rodzinom.', images: [{ url: '/assets/premium/grupa.webp', alt: 'Działania Fundacji' }] },
  twitter: { card: 'summary_large_image' }, icons: { icon: '/assets/favicon-64.png', apple: '/assets/apple-touch-icon.png' },
};
export const viewport: Viewport = { themeColor: '#f8f7f3' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body><a href="#main" className="skip-link">Przejdź do treści</a><ExperienceProvider>{children}</ExperienceProvider></body></html>;
}
