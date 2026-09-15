import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/dm-sans';
import './globals.css';
import { ExperienceProvider } from '@/components/experience-provider';
export const metadata: Metadata = {
  metadataBase: new URL('https://fundacjalepszydomlepszejutro.pl'),
  title: 'Razem zmieniamy jutro | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Pomagaj razem z Fundacją Lepszy Dom Lepsze Jutro. Poznaj nasze działania, wybierz akcję i sprawdź, jak możesz wesprzeć dzieci oraz rodziny.',
  verification: { google: 'i4YKcpbmCKBDthyu7MHiKXgaQsJ_LpLArCfH--1wgO8' },
  alternates: { canonical: '/' }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: { type: 'website', locale: 'pl_PL', url: '/', siteName: 'Fundacja Lepszy Dom Lepsze Jutro', title: 'Każdy gest ma siłę. Razem zmieniamy jutro.', description: 'Poznaj działania Fundacji i zobacz, jak możesz pomóc dzieciom oraz rodzinom.', images: [{ url: '/assets/generated/hero-wolontariusze-v1.webp', alt: 'Wolontariusze przygotowujący pomoc' }] },
  twitter: { card: 'summary_large_image' }, icons: { icon: '/assets/favicon-64.png', apple: '/assets/apple-touch-icon.png' },
};
export const viewport: Viewport = { themeColor: '#f8f6f1' };
const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'NGO',
  name: 'Fundacja Lepszy Dom Lepsze Jutro',
  url: 'https://fundacjalepszydomlepszejutro.pl/',
  logo: 'https://fundacjalepszydomlepszejutro.pl/assets/logo-fundacji.webp',
  identifier: 'KRS 0000971976', taxID: '5273002294', foundingDate: '2022-05-17',
  telephone: '+48570747779', email: 'kontakt@fundacjalepszydomlepszejutro.pl',
  address: { '@type': 'PostalAddress', streetAddress: 'Złota 75A/7', postalCode: '00-819', addressLocality: 'Warszawa', addressCountry: 'PL' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /><a href="#main" className="skip-link">Przejdź do treści</a><ExperienceProvider>{children}</ExperienceProvider></body></html>;
}
