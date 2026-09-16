export function SectionHeading({ eyebrow, title, body, align = 'left' }: { eyebrow: string; title: string; body?: string; align?: 'left' | 'center' }) {
  return <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-.02em] text-ink sm:text-5xl">{title}</h2>{body && <p className="mt-5 text-[15px] leading-7 text-ink/62">{body}</p>}</div>;
}

