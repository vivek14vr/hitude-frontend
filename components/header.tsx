'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { BrandMark } from './brand-mark';
import { useCart } from './cart-context';
import { CartDrawer } from './cart-drawer';

const nav = [
  ['Shop', '/shop'],
  ['Our story', '/our-story'],
  ['Learn', '/blog'],
  ['Consultation', '/consultation'],
  ['Contact', '/contact'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return <>
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button className="icon-button md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={21} /></button>
        <Link href="/" aria-label="HITUDE home" className="md:mr-10"><BrandMark /></Link>
        <nav className="hidden flex-1 items-center gap-7 md:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link className="nav-link" key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <Link className="icon-button hidden sm:inline-flex" href="/shop?focus=search" aria-label="Search products"><Search size={19} /></Link>
          <Link className="icon-button" href="/account" aria-label="Your account"><UserRound size={19} /></Link>
          <button className="icon-button relative" aria-label={`Open cart, ${itemCount} items`} onClick={() => setCartOpen(true)}><ShoppingBag size={19} />{itemCount > 0 && <span className="cart-count">{itemCount}</span>}</button>
        </div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
      <aside className="h-full w-[min(86vw,360px)] bg-paper p-6 shadow-soft" onClick={(event) => event.stopPropagation()}>
        <div className="mb-12 flex items-center justify-between"><BrandMark /><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={21} /></button></div>
        <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
          {nav.map(([label, href]) => <Link className="mobile-nav-link" key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>)}
        </nav>
        <div className="mt-12 rounded-2xl bg-cream p-5 text-sm leading-6 text-ink/70"><p className="eyebrow mb-2">For your consideration</p><p>Explore the ritual, read the label, and choose at your own pace.</p></div>
      </aside>
    </div>}
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>;
}

