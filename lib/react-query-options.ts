import { queryOptions } from '@tanstack/react-query';
import { api } from './api-client';
import { queryKeys } from './query-keys';

export const productQuery = (slug: string) => queryOptions({ queryKey: queryKeys.product(slug), queryFn: () => api.product(slug), staleTime: 60_000 });

