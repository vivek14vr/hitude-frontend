import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Shipping policy', description: 'Read the HITUDE shipping and delivery policy.', alternates: { canonical: '/policies/shipping' } };
export default function ShippingPage() { return <ContentPage type="shipping" />; }

