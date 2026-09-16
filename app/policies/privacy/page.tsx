import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Privacy policy', description: 'Read how HITUDE approaches privacy and customer data.', alternates: { canonical: '/policies/privacy' } };
export default function PrivacyPage() { return <ContentPage type="privacy" />; }

