import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SimpleForm } from '@/components/simple-form';
export const metadata: Metadata = { title: 'Forgot password', robots: { index: false, follow: false } };
export default function ForgotPasswordPage() { return <div className="page-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-16"><div className="w-full max-w-md"><Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-ink/50"><ArrowLeft size={15} /> Back to sign in</Link><p className="eyebrow mt-12">Reset access</p><h1 className="mt-4 font-display text-5xl">A fresh start is close.</h1><p className="mt-5 text-sm leading-6 text-ink/60">Enter your account email and we’ll send a secure reset link if the account exists.</p><div className="mt-8"><SimpleForm kind="forgot" /></div></div></div>; }

