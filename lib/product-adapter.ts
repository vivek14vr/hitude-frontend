import type { Product } from '@/types';
import type { ProductApiRecord } from './api-client';

export function toProduct(record: ProductApiRecord): Product {
  const availablePacks = (record.packs ?? [])
    .filter((pack) => Number.isFinite(pack.quantity) && pack.quantity > 0 && Number.isFinite(pack.price))
    .map((pack) => ({
      quantity: pack.quantity,
      price: pack.price,
      label: pack.label,
    }));
  const fallbackPack = { quantity: 20, price: record.price, label: 'Ritual · 20 gummies' };
  const profileLabel = record.profile === 'strawberry' ? 'strawberry' : 'citrus';

  return {
    id: record.id ?? record._id ?? record.slug,
    slug: record.slug,
    name: record.name,
    profile: record.profile,
    eyebrow: record.eyebrow ?? `A considered ${profileLabel} profile`,
    description: record.description,
    longDescription: record.longDescription ?? record.description,
    accent: record.accent ?? (record.profile === 'strawberry' ? 'red' : 'orange'),
    notes: record.notes ?? [],
    ingredients: record.ingredients ?? [],
    price: record.price,
    compareAt: record.compareAt,
    availablePacks: availablePacks.length ? availablePacks : [fallbackPack],
    badge: record.badge,
    status: record.status ?? 'in_stock',
    rating: record.rating,
    reviewCount: record.reviewCount,
    verificationRequired: record.verificationRequired ?? true,
    publishReady: record.publishReady ?? true,
  };
}
