import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Our story', description: 'Why HITUDE makes thoughtful, discreet Ayurvedic wellness products.', alternates: { canonical: '/our-story' } };
export default function OurStoryPage() { return <ContentPage type="story" />; }

