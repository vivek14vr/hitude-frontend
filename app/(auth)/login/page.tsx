import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth-form';
export const metadata: Metadata = { title: 'Sign in', robots: { index: false, follow: false } };
export default function LoginPage() { return <div className="page-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-16"><AuthForm mode="login" /></div>; }

