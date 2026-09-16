import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Terms of service', description: 'Read the HITUDE terms of service.', alternates: { canonical: '/policies/terms' } };
export default function TermsPage() { return <ContentPage type="terms" />; }

