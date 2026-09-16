'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AgeGate() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(window.localStorage.getItem('hitude-age-confirmed') !== 'yes'); }, []);
  if (!visible) return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="age-gate-title"><div className="w-full max-w-[460px] rounded-3xl bg-paper p-7 shadow-soft sm:p-10"><div className="mb-10 flex items-center justify-between"><span className="eyebrow">HITUDE / eligibility</span><ShieldCheck className="text-moss" size={22} /></div><h2 id="age-gate-title" className="max-w-[330px] font-display text-4xl leading-[1.05] text-ink">A considered ritual starts with the right choice.</h2><p className="mt-5 text-[15px] leading-7 text-ink/65">Our products are intended for adults 18 and over. Please confirm your age to continue. Availability and eligibility may vary by location.</p><div className="mt-8 flex flex-col gap-3"><button className="button button-primary w-full" onClick={() => { window.localStorage.setItem('hitude-age-confirmed', 'yes'); setVisible(false); }}>I’m 18 or older <ArrowRight size={16} /></button><Link className="button button-secondary w-full" href="/policies/age-eligibility">Read age & eligibility policy</Link></div><p className="mt-7 text-center text-xs leading-5 text-ink/45">By continuing, you acknowledge our <Link className="underline underline-offset-2" href="/policies/privacy">privacy policy</Link> and responsible-use information.</p></div></div>;
}
