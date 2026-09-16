import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Returns & refunds', description: 'Read the HITUDE returns and refund information.', alternates: { canonical: '/policies/returns' } };
export default function ReturnsPage() { return <ContentPage type="returns" />; }

