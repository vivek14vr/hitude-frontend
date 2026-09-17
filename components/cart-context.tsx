'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from '@/types';

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, pack?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hitude-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // A stale client cart should never block the storefront.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('hitude-cart', JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.packPrice * item.quantity, 0),
    addItem: (product: Product, pack?: number) => {
      const selectedPack = pack ?? product.availablePacks.at(-1)?.quantity ?? 20;
      const packPrice = product.availablePacks.find((option) => option.quantity === selectedPack)?.price ?? product.price;
      setItems((current) => {
        const id = `${product.id}-${selectedPack}`;
        const existing = current.find((item) => `${item.product.id}-${item.pack}` === id);
        if (existing) return current.map((item) => `${item.product.id}-${item.pack}` === id ? { ...item, quantity: item.quantity + 1 } : item);
        return [...current, { product, pack: selectedPack, packPrice, quantity: 1 }];
      });
    },
    updateQuantity: (id: string, quantity: number) => setItems((current) => quantity <= 0 ? current.filter((item) => `${item.product.id}-${item.pack}` !== id) : current.map((item) => `${item.product.id}-${item.pack}` === id ? { ...item, quantity } : item)),
    removeItem: (id: string) => setItems((current) => current.filter((item) => `${item.product.id}-${item.pack}` !== id)),
    clearCart: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
