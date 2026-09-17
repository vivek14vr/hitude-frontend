const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export type ProductApiRecord = {
  _id?: string;
  id?: string;
  slug: string;
  name: string;
  profile: 'strawberry' | 'citrus';
  description: string;
  price: number;
  compareAt?: number;
  packs: Array<{ quantity: number; price: number; label: string }>;
  ingredients: string[];
  notes: string[];
  status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  verificationRequired?: boolean;
  publishReady?: boolean;
  eyebrow?: string;
  longDescription?: string;
  accent?: 'red' | 'orange';
  badge?: string;
  rating?: number;
  reviewCount?: number;
};

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new ApiError(payload.message ?? 'Something went wrong. Please try again.', response.status);
  }
  return response.json() as Promise<T>;
}

export const api = {
  products: () => apiFetch<ProductApiRecord[]>('/products'),
  product: (slug: string) => apiFetch<ProductApiRecord>(`/products/${encodeURIComponent(slug)}`),
  adminProducts: () => apiFetch<ProductApiRecord[]>('/products/manage'),
  createProduct: (payload: {
    name: string;
    slug: string;
    profile: 'strawberry' | 'citrus';
    description: string;
    price: number;
    compareAt?: number;
    packs: Array<{ quantity: number; price: number; label: string }>;
    ingredients: string[];
    notes: string[];
    verificationRequired: boolean;
    publishReady: boolean;
  }) => apiFetch<ProductApiRecord>('/products', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload: Record<string, string | boolean>) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  checkPincode: (pincode: string) => apiFetch<{ available: boolean; message: string }>(`/shipping/pincode/${pincode}`),
};
