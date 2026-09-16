import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Age & eligibility policy', description: 'Read the HITUDE age and eligibility policy.', alternates: { canonical: '/policies/age-eligibility' } };
export default function AgePage() { return <ContentPage type="age" />; }

