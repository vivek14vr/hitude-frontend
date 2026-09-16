import type { Metadata } from 'next';
import { ContentPage } from '@/components/content-page';
export const metadata: Metadata = { title: 'Contact HITUDE', description: 'Get in touch with the HITUDE team.', alternates: { canonical: '/contact' } };
export default function ContactPage() { return <ContentPage type="contact" />; }

