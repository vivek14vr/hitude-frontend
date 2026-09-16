import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProduct, products } from '@/lib/product-data';
import { ProductDetailClient } from '@/components/product-detail-client';
import { ProductCard } from '@/components/product-card';

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return {};
  return { title: product.name, description: product.description, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: `${product.name} | HITUDE`, description: product.description, type: 'website' } };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const other = products.find((item) => item.slug !== product.slug);
  const productJsonLd = { '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, brand: { '@type': 'Brand', name: 'HITUDE' }, offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.price, availability: product.status === 'out_of_stock' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', url: `http://localhost:3000/products/${product.slug}` } };
  return <><div className="page-shell pt-8"><Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-ink/55 hover:text-ink"><ArrowLeft size={15} /> Back to shop</Link></div><section className="page-shell pb-20 pt-8 sm:pb-28 sm:pt-12"><ProductDetailClient product={product} /></section><section className="border-t border-line py-20 sm:py-24"><div className="page-shell"><div className="flex items-end justify-between"><div><p className="eyebrow">Keep exploring</p><h2 className="mt-3 font-display text-4xl">You might also like.</h2></div><Link href={`/products/${other?.slug}`} className="button-quiet hidden items-center gap-2 sm:flex">Compare profiles <ArrowRight size={15} /></Link></div>{other && <div className="mt-10 max-w-sm"><ProductCard product={other} /></div>}</div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} /></>;
}
