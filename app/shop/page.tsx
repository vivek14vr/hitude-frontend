import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ShopClient } from '@/components/shop-client';

export const metadata: Metadata = { title: 'Shop gummies', description: 'Explore HITUDE Vijaya-based gummies by profile, pack size, and availability.', alternates: { canonical: '/shop' } };

export default function ShopPage() {
  return <div className="page-shell pb-24 pt-16 sm:pt-24"><div className="max-w-2xl"><p className="eyebrow">The HITUDE edit</p><h1 className="mt-5 font-display text-5xl leading-[.98] tracking-[-.04em] sm:text-7xl">Choose your<br /><span className="text-vermillion">kind of calm.</span></h1><p className="mt-7 max-w-lg text-[17px] leading-8 text-ink/62">Start with the flavour profile that fits your ritual. Read the details, check your location, and take your time.</p></div><ShopClient /><div className="mt-20 grid gap-4 rounded-3xl bg-cream p-6 sm:grid-cols-3 sm:p-8"><div className="flex gap-3"><ShieldCheck className="shrink-0 text-moss" size={20} /><p className="text-sm leading-6">Adults 18+ only. Eligibility may vary by location.</p></div><div className="flex gap-3"><span className="eyebrow pt-1">01</span><p className="text-sm leading-6">Verification or consultation steps are shown clearly when required.</p></div><Link href="/blog/how-to-read-a-gummy-label" className="flex items-center gap-3 text-sm font-semibold">Read the label guide <ArrowRight size={16} /></Link></div></div>;
}

