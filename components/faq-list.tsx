'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQList({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="divide-y divide-line">{faqs.map((faq, index) => <div key={faq.question}><button className="flex min-h-[68px] w-full items-center justify-between gap-4 text-left text-[15px] font-medium" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>{faq.question}<ChevronDown size={18} className={`shrink-0 transition-transform ${open === index ? 'rotate-180 text-vermillion' : 'text-ink/50'}`} /></button>{open === index && <div className="pb-6 pr-8 text-sm leading-6 text-ink/60">{faq.answer}</div>}</div>)}</div>;
}
