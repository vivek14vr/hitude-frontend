'use client';

import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { formatINR } from '@/lib/utils';
import { useCart } from './cart-context';
import { ProductVisual } from './product-visual';

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  const { addItem } = useCart();
  return <article className="group">
    <div className="relative"><Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ProductVisual product={product} /></Link>{product.badge && <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-ink">{product.badge}</span>}<button onClick={() => setSaved(!saved)} className={`absolute right-4 top-4 rounded-full p-2.5 transition ${saved ? 'bg-ink text-paper' : 'bg-paper/85 text-ink/70 hover:bg-paper'}`} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button></div>
    <div className="mt-5 flex items-start justify-between gap-4"><div><p className="eyebrow text-ink/50">{product.profile === 'strawberry' ? 'Strawberry profile' : 'Citrus profile'}</p><h3 className="mt-1 font-display text-2xl"><Link href={`/products/${product.slug}`} className="hover:text-vermillion">{product.name}</Link></h3><p className="mt-2 max-w-[260px] text-sm leading-6 text-ink/60">{product.description}</p></div><button onClick={() => addItem(product)} className="button-circle" aria-label={`Add ${product.name} to cart`}><Plus size={19} /></button></div>
    <div className="mt-4 flex items-center gap-3 text-sm"><span className="font-medium">{formatINR(product.price)}</span>{product.compareAt && <span className="text-ink/35 line-through">{formatINR(product.compareAt)}</span>}<span className="ml-auto text-xs text-ink/50">{product.status === 'low_stock' ? 'Limited availability' : 'Available to order'}</span></div>
  </article>;
}

