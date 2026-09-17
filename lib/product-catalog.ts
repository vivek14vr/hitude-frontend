import { api, ApiError } from './api-client';
import { getProduct as getFallbackProduct, products as fallbackProducts } from './product-data';
import { toProduct } from './product-adapter';
import type { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  try {
    const records = await api.products();
    return records.map(toProduct);
  } catch {
    return fallbackProducts;
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    return toProduct(await api.product(slug));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    return getFallbackProduct(slug);
  }
}
