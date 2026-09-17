import { queryOptions } from '@tanstack/react-query';
import { api } from './api-client';
import { toProduct } from './product-adapter';
import { queryKeys } from './query-keys';

export const productsQuery = queryOptions({ queryKey: queryKeys.products, queryFn: async () => (await api.products()).map(toProduct), staleTime: 60_000 });
export const productQuery = (slug: string) => queryOptions({ queryKey: queryKeys.product(slug), queryFn: async () => toProduct(await api.product(slug)), staleTime: 60_000 });
