import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Consultation', description: 'Request a human conversation about HITUDE products and responsible use.', alternates: { canonical: '/consultation' } };
export default function ConsultationPage() { return <ContentPage type="consultation" />; }

