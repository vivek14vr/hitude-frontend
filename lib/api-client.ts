const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message ?? 'Something went wrong. Please try again.');
  }
  return response.json() as Promise<T>;
}

export const api = {
  products: () => apiFetch('/products'),
  product: (slug: string) => apiFetch(`/products/${slug}`),
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
  }) => apiFetch('/products', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload: Record<string, string | boolean>) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  checkPincode: (pincode: string) => apiFetch<{ available: boolean; message: string }>(`/shipping/pincode/${pincode}`),
};
