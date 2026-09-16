'use client';

import Link from 'next/link';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import { useCart } from './cart-context';
import { formatINR } from '@/lib/utils';
import { ProductVisual } from './product-visual';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-sm" onClick={onClose}>
    <aside className="ml-auto flex h-full w-[min(94vw,430px)] flex-col bg-paper shadow-soft" onClick={(event) => event.stopPropagation()}>
      <div className="flex items-center justify-between border-b border-line px-6 py-5"><div><p className="eyebrow">Your edit</p><h2 className="mt-1 font-display text-2xl">Cart <span className="font-sans text-sm text-ink/50">({items.length})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart"><X size={20} /></button></div>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {items.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><div className="mb-5 rounded-full bg-cream p-5 text-moss">◌</div><h3 className="font-display text-2xl">Your cart is waiting.</h3><p className="mt-2 max-w-[250px] text-sm leading-6 text-ink/60">Start with a profile that feels like you.</p><Link href="/shop" onClick={onClose} className="button button-primary mt-7">Shop gummies <ArrowRight size={16} /></Link></div> : <div className="space-y-5">{items.map((item) => <div className="flex gap-4" key={`${item.product.id}-${item.pack}`}><ProductVisual product={item.product} compact /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="eyebrow">{item.product.name}</p><p className="mt-1 text-sm text-ink/60">{item.pack} gummies</p></div><button className="text-ink/40 hover:text-vermillion" aria-label={`Remove ${item.product.name}`} onClick={() => removeItem(`${item.product.id}-${item.pack}`)}><X size={16} /></button></div><div className="mt-4 flex items-center justify-between"><div className="quantity-stepper"><button aria-label="Decrease quantity" onClick={() => updateQuantity(`${item.product.id}-${item.pack}`, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(`${item.product.id}-${item.pack}`, item.quantity + 1)}><Plus size={13} /></button></div><p className="font-medium">{formatINR(item.packPrice * item.quantity)}</p></div></div></div>)}</div>}
      </div>
      {items.length > 0 && <div className="border-t border-line px-6 py-5"><div className="flex justify-between text-sm"><span className="text-ink/60">Subtotal</span><span className="font-medium">{formatINR(subtotal)}</span></div><p className="mt-2 text-xs leading-5 text-ink/50">Shipping and any applicable verification steps are calculated at checkout.</p><Link href="/cart" onClick={onClose} className="button button-primary mt-5 w-full">Review cart <ArrowRight size={16} /></Link></div>}
    </aside>
  </div>;
}

