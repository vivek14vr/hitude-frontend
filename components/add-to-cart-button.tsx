'use client';

import { Check, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { useCart } from './cart-context';

export function AddToCartButton({ product, pack, full = false }: { product: Product; pack?: number; full?: boolean }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  return <button className={`button button-primary ${full ? 'w-full' : ''}`} onClick={() => { addItem(product, pack); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }}>{added ? <Check size={17} /> : <ShoppingBag size={17} />}{added ? 'Added to cart' : 'Add to cart'}</button>;
}
