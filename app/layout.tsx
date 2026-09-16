import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { AgeGate } from '@/components/age-gate';
import Providers from '@/components/providers';
import { BrandMark } from '@/components/brand-mark';
import { NewsletterForm } from '@/components/newsletter-form';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'HITUDE — wellness, with intention', template: '%s | HITUDE' },
  description: 'A discreet, considered way to explore Vijaya-based gummy rituals. Learn first, choose mindfully.',
  alternates: { canonical: '/' },
  openGraph: { title: 'HITUDE — wellness, with intention', description: 'A discreet, considered way to explore Vijaya-based gummy rituals.', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'HITUDE — wellness, with intention', description: 'A discreet, considered way to explore Vijaya-based gummy rituals.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'HITUDE', url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000', description: 'Indian Ayurvedic wellness brand.' };
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'HITUDE', url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000', potentialAction: { '@type': 'SearchAction', target: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/shop?query={search_term_string}`, 'query-input': 'required name=search_term_string' } };
  return <html lang="en"><body><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-3 focus:shadow-lift">Skip to content</a><Providers><Header /><main id="main-content">{children}</main><footer className="bg-ink text-paper"><div className="page-shell grid gap-14 py-16 md:grid-cols-[1.25fr_.75fr_.75fr] md:py-20"><div><BrandMark inverse /><p className="mt-6 max-w-sm text-sm leading-7 text-paper/60">Quietly considered wellness for people who want to understand what they choose.</p><div className="mt-9"><p className="eyebrow text-paper/50">Notes, occasionally</p><div className="mt-4"><NewsletterForm /></div><p className="mt-3 max-w-sm text-xs leading-5 text-paper/40">By subscribing, you agree to receive HITUDE updates. Unsubscribe anytime.</p></div></div><div><p className="eyebrow text-paper/45">Explore</p><nav className="mt-5 flex flex-col gap-3 text-sm text-paper/70"><a href="/shop">Shop gummies</a><a href="/our-story">Our story</a><a href="/blog">Learn / journal</a><a href="/consultation">Request a consultation</a><a href="/contact">Contact</a></nav></div><div><p className="eyebrow text-paper/45">Good to know</p><nav className="mt-5 flex flex-col gap-3 text-sm text-paper/70"><a href="/policies/shipping">Shipping policy</a><a href="/policies/returns">Returns & refunds</a><a href="/policies/privacy">Privacy</a><a href="/policies/terms">Terms of service</a><a href="/policies/age-eligibility">Age & eligibility</a></nav></div></div><div className="border-t border-paper/15"><div className="page-shell flex flex-col gap-3 py-5 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} HITUDE. All rights reserved.</span><span>For adults 18+. Availability varies by location. Verify before launch.</span></div></div></footer></Providers><AgeGate /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} /></body></html>;
}

