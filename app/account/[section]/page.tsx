import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AccountDashboard } from '@/components/account-dashboard';
const sections = ['orders', 'addresses', 'wishlist', 'consultations', 'settings'];
export async function generateMetadata({ params }: { params: { section: string } }): Promise<Metadata> { return { title: `Account · ${params.section}`, robots: { index: false, follow: false } }; }
export default function AccountSectionPage({ params }: { params: { section: string } }) { if (!sections.includes(params.section)) notFound(); return <AccountDashboard section={params.section} />; }

