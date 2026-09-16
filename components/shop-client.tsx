'use client';

import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { products } from '@/lib/product-data';
import { ProductCard } from './product-card';

export function ShopClient() {
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState('all');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (profile === 'all' || product.profile === profile);
  }).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : 0), [profile, query, sort]);
  return <>
    <div className="mt-10 flex flex-col gap-3 border-y border-line py-4 lg:flex-row lg:items-center"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/45" size={17} /><label className="sr-only" htmlFor="shop-search">Search gummies</label><input id="shop-search" className="input pl-11" placeholder="Search by profile, flavour, or feeling" value={query} onChange={(event) => setQuery(event.target.value)} /></div><button className="button button-secondary lg:hidden" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} /> Filters</button><div className="hidden items-center gap-2 lg:flex"><span className="text-xs text-ink/45">Profile</span>{[['all', 'All'], ['strawberry', 'Strawberry'], ['citrus', 'Citrus']].map(([value, label]) => <button key={value} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${profile === value ? 'bg-ink text-paper' : 'border border-line hover:bg-cream'}`} onClick={() => setProfile(value)}>{label}</button>)}<select className="input ml-3 h-11 min-w-[150px] py-2" aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>
    <div className="mb-8 mt-7 flex items-center justify-between"><p className="text-sm text-ink/55">{filtered.length} profiles to explore</p><p className="hidden text-xs text-ink/40 sm:block">All prices in INR · taxes calculated at checkout</p></div>
    {filtered.length > 0 ? <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-3xl border border-dashed border-line p-12 text-center"><p className="eyebrow">No exact match</p><h2 className="mt-3 font-display text-3xl">Try a softer search.</h2><button className="button button-secondary mt-6" onClick={() => { setQuery(''); setProfile('all'); }}>Clear filters</button></div>}
    {filtersOpen && <div className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-sm lg:hidden" onClick={() => setFiltersOpen(false)}><aside className="ml-auto h-full w-[min(90vw,360px)] bg-paper p-6" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><p className="font-display text-2xl">Filter & sort</p><button className="icon-button" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={19} /></button></div><div className="mt-10"><p className="eyebrow">Profile</p><div className="mt-3 grid gap-2">{[['all', 'All profiles'], ['strawberry', 'Strawberry / Sassy Hi'], ['citrus', 'Citrus / Sassy Attitude']].map(([value, label]) => <button key={value} className={`rounded-xl border p-3 text-left text-sm ${profile === value ? 'border-ink bg-cream font-semibold' : 'border-line'}`} onClick={() => setProfile(value)}>{label}</button>)}</div></div><div className="mt-10"><label className="eyebrow" htmlFor="mobile-sort">Sort by</label><select id="mobile-sort" className="input mt-3" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div><button className="button button-primary mt-10 w-full" onClick={() => setFiltersOpen(false)}>Show {filtered.length} results</button></aside></div>}
  </>;
}

