'use client';

import { ArrowRight, Check } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setDone(true); }
  if (done) return <p className="flex items-center gap-2 text-sm text-paper"><Check size={17} /> You’re on the list. Expect considered notes, not noise.</p>;
  return <form onSubmit={submit} className="flex max-w-md border-b border-paper/40 pb-2"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input required id="newsletter-email" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-0 py-3 text-sm text-paper outline-none placeholder:text-paper/45" /><button className="flex min-h-11 items-center gap-2 pl-4 text-sm font-semibold text-paper" type="submit">Sign me up <ArrowRight size={16} /></button></form>;
}

