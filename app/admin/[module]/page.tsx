import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin-dashboard';
export async function generateMetadata({ params }: { params: { module: string } }): Promise<Metadata> { return { title: `Admin · ${params.module}`, robots: { index: false, follow: false } }; }
export default function AdminModulePage({ params }: { params: { module: string } }) { return <AdminDashboard module={params.module} />; }

