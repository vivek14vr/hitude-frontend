export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return <span className={`font-display text-[1.7rem] tracking-[0.22em] ${inverse ? 'text-paper' : 'text-ink'}`}>HITUDE</span>;
}

