'use client';

import { Check, MapPin, Search, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api-client';

export function PincodeChecker({ compact = false }: { compact?: boolean }) {
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode)) { setMessage('Enter a valid 6-digit pincode.'); return; }
    setLoading(true); setMessage('');
    try { const result = await api.checkPincode(pincode); setMessage(result.message); } catch { setMessage('Delivery lookup is temporarily unavailable. Please try again.'); } finally { setLoading(false); }
  }
  const positive = message.toLowerCase().includes('available') || message.toLowerCase().includes('deliver');
  return <div className={compact ? '' : 'rounded-3xl bg-cream p-5 sm:p-6'}><div className="flex items-center gap-2"><MapPin size={17} className="text-moss" /><p className="eyebrow">Check your pincode</p></div><p className="mt-2 text-sm leading-6 text-ink/60">See whether delivery is available where you are.</p><form className="mt-4 flex gap-2" onSubmit={submit}><label htmlFor={compact ? 'pincode-compact' : 'pincode'} className="sr-only">6-digit pincode</label><input id={compact ? 'pincode-compact' : 'pincode'} className="input min-w-0 flex-1 bg-paper" inputMode="numeric" maxLength={6} placeholder="e.g. 560001" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))} /><button className="button button-primary px-4" disabled={loading} aria-label="Check delivery availability">{loading ? 'Checking' : <Search size={17} />}</button></form>{message && <p role="status" className={`mt-3 flex items-center gap-2 text-xs ${positive ? 'text-moss' : 'text-vermillion'}`}>{positive ? <Check size={14} /> : <X size={14} />}{message}</p>}</div>;
}

