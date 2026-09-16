export const queryKeys = {
  products: ['products'] as const,
  product: (slug: string) => ['products', slug] as const,
  account: ['account'] as const,
  orders: ['orders'] as const,
};

