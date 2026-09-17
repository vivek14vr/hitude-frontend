import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { getProducts } from '@/lib/product-catalog';
import { ProductCard } from '@/components/product-card';

export function generateStaticParams() { return [{ slug: 'all-gummies' }, { slug: 'strawberry-profile' }, { slug: 'citrus-profile' }]; }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> { const title = params.slug === 'citrus-profile' ? 'Citrus profile' : params.slug === 'strawberry-profile' ? 'Strawberry profile' : 'All gummies'; return { title, description: `Explore the HITUDE ${title.toLowerCase()} collection.`, alternates: { canonical: `/collections/${params.slug}` } }; }

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const citrus = params.slug === 'citrus-profile'; const strawberry = params.slug === 'strawberry-profile'; const products = await getProducts(); const collection = products.filter((product) => citrus ? product.profile === 'citrus' : strawberry ? product.profile === 'strawberry' : true); const title = citrus ? 'Crisp, citrus-led.' : strawberry ? 'Soft, strawberry-led.' : 'Profiles with personality.';
  return <div className="page-shell pb-24 pt-16 sm:pt-24"><div className="max-w-2xl"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-moss"><Leaf size={18} /></span><p className="eyebrow">Collection / {params.slug.replaceAll('-', ' ')}</p></div><h1 className="mt-6 font-display text-5xl leading-[.98] tracking-[-.04em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-lg text-[17px] leading-8 text-ink/62">A small edit for a more considered choice. Explore the notes, compare your options, and take it from there.</p></div><div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2">{collection.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="mt-20 rounded-3xl bg-cream p-7 sm:p-10"><p className="eyebrow">Need a little context?</p><div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><h2 className="max-w-md font-display text-3xl">Good choices start with good information.</h2><Link href="/blog" className="button button-secondary">Visit the journal <ArrowRight size={16} /></Link></div></div></div>;
}
