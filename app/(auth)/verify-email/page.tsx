import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Mail } from 'lucide-react';
export const metadata: Metadata = { title: 'Verify email', robots: { index: false, follow: false } };
export default function VerifyEmailPage() { return <div className="page-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-16"><div className="max-w-md text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-moss"><Mail size={25} /></div><p className="eyebrow mt-8">One small step</p><h1 className="mt-4 font-display text-5xl">Check your inbox.</h1><p className="mt-5 text-[15px] leading-7 text-ink/60">We sent a verification link to your email address. Open it to finish setting up your HITUDE account.</p><div className="mt-8 rounded-2xl bg-[#dfe6df] p-4 text-left text-sm leading-6 text-moss"><Check size={16} className="mb-2" />The link expires for your security. If it doesn’t arrive, check spam or request a fresh one.</div><Link href="/" className="button button-secondary mt-8">Back to HITUDE</Link></div></div>; }

