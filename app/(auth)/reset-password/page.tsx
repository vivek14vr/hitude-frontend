import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SimpleForm } from '@/components/simple-form';
export const metadata: Metadata = { title: 'Reset password', robots: { index: false, follow: false } };
export default function ResetPasswordPage() { return <div className="page-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-16"><div className="w-full max-w-md"><Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-ink/50"><ArrowLeft size={15} /> Back to sign in</Link><p className="eyebrow mt-12">New password</p><h1 className="mt-4 font-display text-5xl">Keep your account yours.</h1><p className="mt-5 text-sm leading-6 text-ink/60">Choose at least 8 characters. Your reset token is single-use and time-limited.</p><div className="mt-8"><SimpleForm kind="reset" /></div></div></div>; }

