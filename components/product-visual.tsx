import type { Product } from '@/types';
import { cn } from '@/lib/utils';

export function ProductVisual({ product, compact = false, hero = false }: { product: Product; compact?: boolean; hero?: boolean }) {
  const isRed = product.accent === 'red';
  return <div className={cn('product-visual', isRed ? 'product-visual-red' : 'product-visual-orange', compact && 'product-visual-compact', hero && 'product-visual-hero')} role="img" aria-label={`${product.name} product pack illustration`}>
    <div className="product-visual-glow" />
    <div className="product-pack"><div className="pack-cap" /><div className="pack-label"><span className="pack-brand">HITUDE</span><span className="pack-name">{product.name.replace('Sassy ', '')}</span><span className="pack-sub">{isRed ? 'strawberry profile' : 'citrus profile'}</span><span className="pack-gummies">{product.availablePacks.at(-1)?.quantity ?? 20} GUMMIES</span></div></div>
    {!compact && <><div className="visual-note visual-note-one">dewaxed</div><div className="visual-note visual-note-two">made with intention</div><div className="visual-stem" /></>}
  </div>;
}

