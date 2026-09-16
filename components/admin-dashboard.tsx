'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Box,
  ChevronRight,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  Menu,
  MessageCircle,
  Search,
  Settings,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { formatINR } from '@/lib/utils';

const modules = [
  ['Overview', '/admin', LayoutDashboard],
  ['Products', '/admin/products', Box],
  ['Orders', '/admin/orders', ShoppingCart],
  ['Customers', '/admin/customers', Users],
  ['Reviews', '/admin/reviews', MessageCircle],
  ['Consultations', '/admin/consultations', ClipboardCheck],
  ['Verification', '/admin/prescription-verification', FileText],
  ['Blog & content', '/admin/content', FileText],
  ['Settings', '/admin/settings', Settings],
] as const;

const recentOrders = [
  ['#HT-1048', 'Sassy Hi · 20 gummies', '₹499', 'Verification pending'],
  ['#HT-1047', 'Sassy Attitude · 10 gummies', '₹349', 'Packed'],
  ['#HT-1046', 'Assorted pack · 20 gummies', '₹699', 'Delivered'],
];

const salesHeights = [44, 51, 38, 68, 59, 74, 66, 87, 78, 95, 82, 100];
const salesLabels = ['M', '', 'W', '', 'F', '', 'S', '', 'M', '', 'W', ''];

export function AdminDashboard({ module = 'overview' }: { module?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = module === 'overview'
    ? 'Overview'
    : modules.find((item) => item[1].split('/').at(-1) === module)?.[0] ?? 'Overview';

  return (
    <section className="w-full overflow-x-hidden bg-[#f0eee8]">
      <div className="min-h-[calc(100dvh-72px)] w-full">
        <aside
          aria-label="Admin navigation"
          className={`fixed inset-y-0 left-0 z-50 w-[min(84vw,280px)] overflow-y-auto bg-ink p-6 text-paper transition-transform lg:z-30 lg:inset-y-auto lg:top-[72px] lg:h-[calc(100dvh-72px)] lg:w-[248px] lg:translate-x-0 lg:overscroll-contain ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between lg:block">
            <span className="font-display text-xl tracking-[.18em]">HITUDE</span>
            <button
              className="icon-button text-paper hover:bg-paper/10 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close admin navigation"
            >
              <X size={18} />
            </button>
          </div>
          <p className="mt-10 text-[10px] uppercase tracking-[.2em] text-paper/40">Workspace</p>
          <nav className="mt-4 flex flex-col gap-1" aria-label="Workspace sections">
            {modules.map(([label, href, Icon]) => (
              <Link
                href={href}
                key={href}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition ${current === label ? 'bg-paper text-ink' : 'text-paper/60 hover:bg-paper/10 hover:text-paper'}`}
              >
                <Icon aria-hidden="true" size={16} />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 border-t border-paper/10 pt-5 text-xs leading-5 text-paper/40">
            Admin mode<br />
            <span className="text-paper/65">Super Admin</span>
          </div>
        </aside>

        <div className="min-w-0 lg:pl-[248px]">
          <div className="min-w-0 p-4 sm:p-7 lg:p-10">
            <button className="button button-secondary mb-6 lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu aria-hidden="true" size={16} />
              Menu
            </button>

            <div className="flex flex-col justify-between gap-5 border-b border-line/70 pb-7 sm:flex-row sm:items-end">
              <div className="min-w-0">
                <p className="eyebrow">Admin / {current}</p>
                <h1 id="admin-page-title" className="mt-3 font-display text-4xl leading-none sm:text-5xl">Good morning, team.</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="sr-only" htmlFor="date-range">Date range</label>
                <select id="date-range" className="input h-11 w-full bg-paper sm:w-auto">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Year to date</option>
                </select>
                <button className="button button-primary">
                  Export
                  <ArrowDownRight aria-hidden="true" size={16} />
                </button>
              </div>
            </div>

            {module === 'overview' ? <Overview /> : <ModuleView module={module} current={current} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Revenue" value={formatINR(48620)} change="+12.4%" positive />
        <Metric label="Orders" value="126" change="+8.2%" positive />
        <Metric label="Customers" value="94" change="+16.8%" positive />
        <Metric label="Avg. order value" value={formatINR(386)} change="-2.1%" />
      </div>

      <div className="mt-7 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,.6fr)]">
        <div className="min-w-0 rounded-3xl bg-paper p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Sales overview</p>
              <h2 className="mt-2 font-display text-2xl">A steady month.</h2>
            </div>
            <Activity aria-hidden="true" className="shrink-0 text-moss" size={20} />
          </div>

          <figure className="mt-8" aria-label="Sales trend for the last twelve weeks">
            <div className="relative h-60 border-b border-l border-line px-2 pt-4">
              <div className="absolute inset-x-2 bottom-0 flex h-52 items-end gap-1 sm:gap-3">
                {salesHeights.map((height, index) => (
                  <div className="group relative flex h-full min-w-0 flex-1 items-end" key={index}>
                    <div
                      className="min-h-1 w-full rounded-t-lg bg-tangerine/80 transition-colors group-hover:bg-vermillion"
                      style={{ height: `${height}%` }}
                    />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] text-ink/45">
                      {salesLabels[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <figcaption className="sr-only">Sales trend rises through the period, with the final week at the highest level.</figcaption>
          </figure>
        </div>

        <div className="min-w-0 rounded-3xl bg-cream p-6 sm:p-8">
          <p className="eyebrow">Needs attention</p>
          <div className="mt-7 space-y-3">
            <Alert label="Verification requests" value="8 pending" href="/admin/prescription-verification" />
            <Alert label="Consultations" value="5 pending" href="/admin/consultations" />
            <Alert label="Low stock" value="2 products" href="/admin/products" />
            <Alert label="Reviews to moderate" value="4 pending" href="/admin/reviews" />
          </div>
        </div>
      </div>

      <div className="mt-7 min-w-0 rounded-3xl bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Recent orders</p>
            <h2 className="mt-2 font-display text-2xl">Latest activity</h2>
          </div>
          <Link href="/admin/orders" className="button-quiet flex min-h-11 items-center gap-2">
            All orders
            <ChevronRight aria-hidden="true" size={15} />
          </Link>
        </div>

        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-line text-xs text-ink/45">
              <tr>
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(([id, item, total, status]) => (
                <tr className="border-b border-line/70 last:border-0" key={id}>
                  <td className="py-4 font-medium">{id}</td>
                  <td className="py-4 text-ink/60">{item}</td>
                  <td className="py-4">{total}</td>
                  <td className="py-4"><span className="rounded-full bg-cream px-3 py-1 text-xs">{status}</span></td>
                  <td className="py-4 text-right"><ChevronRight aria-hidden="true" className="inline text-ink/40" size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Metric({ label, value, change, positive = false }: { label: string; value: string; change: string; positive?: boolean }) {
  return (
    <div className="min-w-0 rounded-3xl bg-paper p-5 sm:p-6">
      <p className="text-xs text-ink/50">{label}</p>
      <p className="mt-4 truncate font-display text-3xl">{value}</p>
      <p className={`mt-2 flex items-center gap-1 text-xs ${positive ? 'text-moss' : 'text-vermillion'}`}>
        {positive ? <ArrowUpRight aria-hidden="true" size={13} /> : <ArrowDownRight aria-hidden="true" size={13} />}
        {change}
        <span className="text-ink/35">vs last period</span>
      </p>
    </div>
  );
}

function Alert({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-ink/10 px-3 py-2 text-sm transition hover:border-ink/30">
      <span className="min-w-0 text-ink/65">{label}</span>
      <span className="flex shrink-0 items-center gap-2 font-semibold">{value}<ChevronRight aria-hidden="true" size={14} /></span>
    </Link>
  );
}

function ModuleView({ module, current }: { module: string; current: string }) {
  const isProducts = module === 'products';
  const [showProductForm, setShowProductForm] = useState(false);
  const [notice, setNotice] = useState('');

  return (
    <div className="mt-8 min-w-0 rounded-3xl bg-paper p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="eyebrow">Manage / {current}</p>
          <h2 className="mt-2 font-display text-3xl">{current} workspace</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="button button-secondary"><Search aria-hidden="true" size={16} /> Search</button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => { setNotice(''); setShowProductForm(true); }}
            disabled={!isProducts}
            title={isProducts ? 'Create a product' : 'This workspace is not connected yet'}
          >
            + Add new
          </button>
        </div>
      </div>
      {notice && <p className="mt-5 rounded-xl bg-[#dfe6df] p-3 text-sm text-moss" role="status">{notice}</p>}
      <div className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center sm:p-10">
        <p className="eyebrow">Ready for API data</p>
        <h3 className="mt-3 font-display text-2xl">{module === 'prescription-verification' ? 'Verification queue' : `${current} records`}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/55">Connect this workspace to the protected NestJS endpoint to load live records, filters, pagination, audit history, and bulk actions.</p>
      </div>
      {isProducts && showProductForm && <ProductCreatePanel onClose={() => setShowProductForm(false)} onSaved={(name) => { setShowProductForm(false); setNotice(`${name} was created successfully.`); }} />}
    </div>
  );
}

type ProductPackForm = { quantity: string; price: string; label: string };

function ProductCreatePanel({ onClose, onSaved }: { onClose: () => void; onSaved: (name: string) => void }) {
  const [packs, setPacks] = useState<ProductPackForm[]>([{ quantity: '10', price: '', label: 'Daily · 10 gummies' }]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && !saving) onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [onClose, saving]);

  function updatePack(index: number, field: keyof ProductPackForm, value: string) {
    setPacks((current) => current.map((pack, packIndex) => packIndex === index ? { ...pack, [field]: value } : pack));
  }

  function addPack() {
    setPacks((current) => [...current, { quantity: '20', price: '', label: 'Ritual · 20 gummies' }]);
  }

  function removePack(index: number) {
    setPacks((current) => current.filter((_, packIndex) => packIndex !== index));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const slug = String(data.get('slug') ?? '').trim().toLowerCase().replace(/\s+/g, '-');
    const description = String(data.get('description') ?? '').trim();
    const price = Number(data.get('price'));
    const compareAtValue = String(data.get('compareAt') ?? '').trim();
    const compareAt = compareAtValue ? Number(compareAtValue) : undefined;
    const ingredients = splitList(String(data.get('ingredients') ?? ''));
    const notes = splitList(String(data.get('notes') ?? ''));
    const parsedPacks = packs.map((pack) => ({ quantity: Number(pack.quantity), price: Number(pack.price), label: pack.label.trim() }));

    if (!name || !slug || !description || !Number.isFinite(price) || price < 0) {
      setMessage({ tone: 'error', text: 'Add a name, slug, description, and a valid price.' });
      return;
    }
    if (compareAtValue && (compareAt === undefined || !Number.isFinite(compareAt) || compareAt < 0)) {
      setMessage({ tone: 'error', text: 'Compare-at price must be a valid positive number.' });
      return;
    }
    if (!ingredients.length || !notes.length) {
      setMessage({ tone: 'error', text: 'Add at least one ingredient and one tasting note.' });
      return;
    }
    if (parsedPacks.some((pack) => !Number.isInteger(pack.quantity) || pack.quantity < 5 || !Number.isFinite(pack.price) || pack.price < 0 || !pack.label)) {
      setMessage({ tone: 'error', text: 'Each pack needs a quantity of 5 or more, a valid price, and a label.' });
      return;
    }

    setSaving(true);
    try {
      await api.createProduct({
        name,
        slug,
        profile: data.get('profile') === 'citrus' ? 'citrus' : 'strawberry',
        description,
        price,
        compareAt,
        packs: parsedPacks,
        ingredients,
        notes,
        verificationRequired: data.get('verificationRequired') === 'on',
        publishReady: data.get('publishReady') === 'on',
      });
      onSaved(name);
    } catch (error) {
      setMessage({ tone: 'error', text: error instanceof Error ? error.message : 'Product could not be created. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ink/35 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-10" role="dialog" aria-modal="true" aria-labelledby="new-product-title">
      <form className="mx-auto max-w-5xl rounded-2xl border border-line bg-cream/95 p-5 shadow-lift sm:p-7" onSubmit={submit}>
        <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow">New product</p>
            <h3 id="new-product-title" className="mt-2 font-display text-2xl">Add a product profile</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/55">Set the product details, pack options, and visibility before saving it to the catalog.</p>
          </div>
          <button type="button" className="icon-button shrink-0" onClick={onClose} aria-label="Close product form"><X aria-hidden="true" size={18} /></button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label><span className="field-label">Product name</span><input required name="name" className="input" placeholder="Sassy Glow" /></label>
        <label><span className="field-label">Slug</span><input required name="slug" className="input" placeholder="sassy-glow" /></label>
        <label><span className="field-label">Profile</span><select name="profile" className="input"><option value="strawberry">Strawberry</option><option value="citrus">Citrus</option></select></label>
        <div className="grid grid-cols-2 gap-3">
          <label><span className="field-label">Price</span><input required min="0" step="0.01" name="price" type="number" className="input" placeholder="499" /></label>
          <label><span className="field-label">Compare at</span><input min="0" step="0.01" name="compareAt" type="number" className="input" placeholder="599" /></label>
        </div>
        <label className="sm:col-span-2"><span className="field-label">Description</span><textarea required name="description" className="input min-h-28 resize-y py-3" placeholder="A bright, considered profile for..." /></label>
        <label><span className="field-label">Ingredients</span><input required name="ingredients" className="input" placeholder="Vijaya leaf extract, Pectin" /><span className="mt-2 block text-xs text-ink/45">Separate ingredients with commas.</span></label>
        <label><span className="field-label">Tasting notes</span><input required name="notes" className="input" placeholder="Strawberry, Soft, Bright" /><span className="mt-2 block text-xs text-ink/45">Separate notes with commas.</span></label>
        </div>

        <div className="mt-7 border-t border-line pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="field-label mb-0">Pack options</p><p className="mt-1 text-xs text-ink/45">Add at least one purchasable pack.</p></div>
          <button type="button" className="button button-secondary min-h-10 px-4 text-xs" onClick={addPack}>+ Add pack</button>
        </div>
        <div className="mt-4 space-y-3">
          {packs.map((pack, index) => (
            <div className="grid gap-3 rounded-2xl border border-line bg-paper p-3 sm:grid-cols-[.7fr_.8fr_1.5fr_auto]" key={index}>
              <label><span className="sr-only">Pack quantity</span><input required min="5" step="1" name={`pack-quantity-${index}`} type="number" className="input" value={pack.quantity} onChange={(event) => updatePack(index, 'quantity', event.target.value)} placeholder="10" /></label>
              <label><span className="sr-only">Pack price</span><input required min="0" step="0.01" name={`pack-price-${index}`} type="number" className="input" value={pack.price} onChange={(event) => updatePack(index, 'price', event.target.value)} placeholder="349" /></label>
              <label><span className="sr-only">Pack label</span><input required name={`pack-label-${index}`} className="input" value={pack.label} onChange={(event) => updatePack(index, 'label', event.target.value)} placeholder="Daily · 10 gummies" /></label>
              <button type="button" className="icon-button self-center" onClick={() => removePack(index)} disabled={packs.length === 1} aria-label={`Remove pack ${index + 1}`}><X aria-hidden="true" size={16} /></button>
            </div>
          ))}
        </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink/65 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex min-h-11 items-center gap-2"><input name="verificationRequired" type="checkbox" defaultChecked className="h-4 w-4 accent-moss" />Verification required</label>
          <label className="flex min-h-11 items-center gap-2"><input name="publishReady" type="checkbox" className="h-4 w-4 accent-moss" />Publish immediately</label>
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={saving}>{saving && <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />}{saving ? 'Saving...' : 'Save product'}</button>
        </div>
        </div>
        {message && <p className={`mt-4 rounded-xl p-3 text-sm ${message.tone === 'error' ? 'bg-[#f7e4df] text-vermillion' : 'bg-[#dfe6df] text-moss'}`} role="alert" aria-live="polite">{message.text}</p>}
      </form>
    </div>
  );
}

function splitList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}
