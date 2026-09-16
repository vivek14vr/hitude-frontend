import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth-form';
export const metadata: Metadata = { title: 'Create an account', robots: { index: false, follow: false } };
export default function RegisterPage() { return <div className="page-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-16"><AuthForm mode="register" /></div>; }

