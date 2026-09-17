'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, FlaskConical, Leaf, LockKeyhole, Minus, Pause, Play, Plus, RotateCcw, RotateCw, ShieldCheck } from 'lucide-react';
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, MutableRefObject, ReactNode } from 'react';
import type { SceneMotion } from './home-product-scene';
import { products as fallbackProducts, posts, faqs } from '@/lib/product-data';
import type { Product } from '@/types';
import { formatINR } from '@/lib/utils';
import { useCart } from './cart-context';
import { PincodeChecker } from './pincode-checker';
import redPack from '@/animation/hero section/prod_1.webp';
import bluePack from '@/animation/hero section/prod_2.webp';
import violetPack from '@/animation/hero section/prod_3.webp';

const ProductScene = dynamic(() => import('./home-product-scene'), { ssr: false });
const images = [redPack, bluePack, violetPack];
const states = [
  { name: 'Sassy', word: 'A little spark.', tag: '01 / The bright side', color: '#ed8466', body: 'A bold first impression. Warm colour, playful character, and a reminder to make a little room for yourself.', link: '/shop', cta: 'Explore the collection', note: 'Full-spectrum Vijaya gummies' },
  { name: 'Nidra', word: 'Find your pause.', tag: '02 / A quieter moment', color: '#9abec4', body: 'A quieter expression of the same plant. Take your time with the details, the formulation, and what feels right for you.', link: '/blog', cta: 'Learn about Vijaya', note: 'A considered wellness ritual' },
  { name: 'Deep', word: 'A different perspective.', tag: '03 / Beyond the everyday', color: '#c4a6e7', body: 'An expansive visual world, grounded in clear information. Get to know the label before choosing your next ritual.', link: '/blog/how-to-read-a-gummy-label', cta: 'Get to know the label', note: 'Plant. Precision. Purpose.' },
];
const newMotion = (): SceneMotion => ({ focus: 0, turn: 0, x: 0, y: 0, scroll: 0.5 });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function ModelView({ kind, paused, reduced, motion: suppliedMotion, focus = 0, className = '' }: {
  kind: 'trio' | 'profile' | 'detail'; paused: boolean; reduced: boolean;
  motion?: MutableRefObject<SceneMotion>; focus?: number; className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const localMotion = useRef(newMotion());
  const motion = suppliedMotion ?? localMotion;
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [shouldEnhance, setShouldEnhance] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    if (reduced) {
      setShouldEnhance(false);
      setReady(false);
      return;
    }

    const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return;

    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (browserWindow.requestIdleCallback) {
      const handle = browserWindow.requestIdleCallback(() => setShouldEnhance(true), { timeout: 1200 });
      return () => browserWindow.cancelIdleCallback?.(handle);
    }
    const handle = window.setTimeout(() => setShouldEnhance(true), 450);
    return () => window.clearTimeout(handle);
  }, [reduced]);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const preload = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setNear(true); preload.disconnect(); } }, { rootMargin: '250px' });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    const visibility = () => setDocumentVisible(!document.hidden);
    preload.observe(node); observer.observe(node);
    document.addEventListener('visibilitychange', visibility);
    return () => { preload.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return <div ref={host} className={`hx-model ${className}`} data-kind={kind} data-ready={ready}
    onPointerMove={(event) => {
      if (paused || reduced || event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      motion.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      motion.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }} onPointerLeave={() => { motion.current.x = 0; motion.current.y = 0; }}>
    <div className="hx-model-shadow" aria-hidden="true" />
    {!ready && <div className={`hx-poster ${kind === 'trio' ? 'hx-poster-trio' : ''}`} aria-hidden="true">
      {(kind === 'trio' ? [0, 1, 2] : [kind === 'detail' ? 0 : focus]).map((index) => <Image key={index} src={images[index]} alt="" fill priority={kind === 'trio'} quality={78} sizes="(max-width: 700px) 70vw, 40vw" />)}
    </div>}
    <div className="hx-canvas" aria-hidden="true">
      {near && shouldEnhance && !failed && <SceneBoundary onError={onError}><ProductScene kind={kind} motion={motion} paused={paused} reduced={reduced} visible={visible && documentVisible} onReady={onReady} /></SceneBoundary>}
    </div>
    {failed && <span className="hx-static-note">Product still view</span>}
  </div>;
}

export function HomeExperience({ products = fallbackProducts }: { products?: Product[] }) {
  const page = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const storyMotion = useRef(newMotion());
  const detailMotion = useRef(newMotion());
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [active, setActive] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = page.current;
    if (!node) return;
    node.dataset.enhanced = 'true';
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); reveal.unobserve(entry.target); }
    }), { threshold: 0.12 });
    node.querySelectorAll('.hx-reveal').forEach((element) => reveal.observe(element));
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      node.style.setProperty('--page-progress', `${total > 0 ? window.scrollY / total : 0}`);
      if (!story.current || reduced || paused) return;
      const chapters = story.current.querySelectorAll<HTMLElement>('.hx-chapter');
      let closest = 0, distance = Infinity;
      const readingLine = window.innerHeight * (window.innerWidth <= 700 ? 0.72 : 0.55);
      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const delta = Math.abs(rect.top + rect.height / 2 - readingLine);
        if (delta < distance) { closest = index; distance = delta; }
      });
      storyMotion.current.focus = closest;
      const rect = story.current.getBoundingClientRect();
      storyMotion.current.scroll = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      setActive(closest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { reveal.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [paused, reduced]);

  function selectState(index: number) {
    storyMotion.current.focus = index;
    storyMotion.current.turn = 0;
    setActive(index);
    if (!reduced && !paused) {
      const chapter = document.getElementById(`state-${index}`);
      if (chapter) {
        const rect = chapter.getBoundingClientRect();
        const readingLine = window.innerHeight * (window.innerWidth <= 700 ? 0.72 : 0.55);
        window.scrollTo({ top: window.scrollY + rect.top + rect.height / 2 - readingLine, behavior: 'smooth' });
      }
    }
  }

  return <div ref={page} className="hx" data-paused={paused} data-reduced={reduced}>
    <div className="hx-progress" aria-hidden="true" />
    <button type="button" className="hx-motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume homepage animations' : 'Pause homepage animations'}>
      {paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? 'Play motion' : 'Pause motion'}</span>
    </button>

    <section className="hx-hero" aria-labelledby="hx-title">
      <div className="hx-hero-top"><span className="hx-label"><i /> Rooted in Ayurveda. Made for now.</span><span className="hx-label hx-edition">The HITUDE collection / 01</span></div>
      <div className="hx-hero-grid">
        <div className="hx-hero-copy">
          <h1 id="hx-title"><span>Change</span><span>your <em>state.</em></span></h1>
          <p>A little intention.<br />A whole different everyday.</p>
          <div className="hx-actions"><Link href="/shop" className="hx-button">Find your ritual <ArrowUpRight size={19} /></Link><a href="#states" className="hx-text-link">Explore the states <ArrowDown size={16} /></a></div>
          <span className="hx-hero-footnote">Thoughtfully made Vijaya-based gummies.<br />For adults who choose with intention.</span>
        </div>
        <div className="hx-hero-art">
          <div className="hx-hero-sun" aria-hidden="true" />
          <div className="hx-orbit hx-orbit-one" aria-hidden="true" /><div className="hx-orbit hx-orbit-two" aria-hidden="true" />
          <span className="hx-art-word" aria-hidden="true">FEEL<br />DIFFERENT.</span>
          <ModelView kind="trio" paused={paused} reduced={reduced} />
          <span className="hx-art-caption"><span>One plant. Many possibilities.</span><span>H / 01—03</span></span>
        </div>
      </div>
      <div className="hx-hero-bottom"><a href="#states"><ArrowDownRight size={22} /> A change of perspective starts here</a><span><ShieldCheck size={15} /> Adults 18+ <b /> <LockKeyhole size={15} /> Discreet dispatch</span></div>
    </section>

    <div className="hx-ribbon" aria-hidden="true"><div>{[0, 1, 2, 3].map((i) => <span key={i}>Same plant <i>✳</i> Different states <i>✳</i> Your own pace <i>✳</i></span>)}</div></div>

    <section id="states" ref={story} className="hx-states" style={{ '--state-color': states[active].color } as CSSProperties} aria-labelledby="states-heading">
      <div className="hx-section-top hx-reveal"><span className="hx-label">01 / A spectrum of possibility</span><h2 id="states-heading">Meet your<br /><em>next perspective.</em></h2><p>Three expressions of one plant.<br />Scroll to discover their worlds.</p></div>
      <div className="hx-story-grid">
        <div className="hx-story-stage">
          <div className="hx-state-halo" aria-hidden="true" /><div className="hx-state-ring" aria-hidden="true" />
          <span className="hx-state-ghost" aria-hidden="true">{states[active].name}</span>
          <ModelView kind="profile" motion={storyMotion} focus={active} paused={paused} reduced={reduced} />
          <div className="hx-model-tools"><button onClick={() => { storyMotion.current.turn -= Math.PI / 4; }} aria-label="Rotate product left"><RotateCcw size={17} /></button><span>Explore every angle</span><button onClick={() => { storyMotion.current.turn += Math.PI / 4; }} aria-label="Rotate product right"><RotateCw size={17} /></button></div>
          <div className="hx-state-picker" aria-label="Choose a product state">{states.map((state, index) => <button key={state.name} onClick={() => selectState(index)} aria-pressed={active === index}><span>0{index + 1}</span>{state.name}</button>)}</div>
        </div>
        <div className="hx-chapters">{states.map((state, index) => <article id={`state-${index}`} key={state.name} className="hx-chapter" data-active={active === index}>
          <span className="hx-label" style={{ color: state.color }}>{state.tag}</span>
          <h3>{state.name}<span>{state.word}</span></h3><p>{state.body}</p>
          <Link href={state.link} className="hx-text-link">{state.cta}<ArrowUpRight size={18} /></Link>
          <div className="hx-chapter-foot"><span>{state.note}</span><span>0{index + 1} / 03</span></div>
        </article>)}</div>
      </div>
    </section>

    <section className="hx-belief hx-reveal" aria-labelledby="belief-heading"><span className="hx-label">02 / Our point of view</span><h2 id="belief-heading">Wellness isn’t a destination.<br />It’s how you <em>meet the day.</em></h2><div><span className="hx-belief-star" aria-hidden="true">✳</span><p>Rooted in a long tradition. Reimagined for your everyday. We believe a good ritual begins with curiosity, clear information, and the freedom to choose at your own pace.</p><Link href="/our-story" className="hx-text-link">A little about us<ArrowUpRight size={18} /></Link></div></section>

    <section className="hx-details" aria-labelledby="detail-heading">
      <div className="hx-detail-art"><span className="hx-label">A closer look / HITUDE</span><div className="hx-detail-circle" aria-hidden="true" /><ModelView kind="detail" motion={detailMotion} paused={paused} reduced={reduced} /><button className="hx-inspect-button" onClick={() => { detailMotion.current.turn += Math.PI / 2; }}><RotateCw size={17} /> Turn the pack</button></div>
      <div className="hx-detail-copy hx-reveal"><span className="hx-label">03 / Clear by design</span><h2 id="detail-heading">Good things.<br /><em>No guesswork.</em></h2><p>What’s on the inside deserves your attention. Get to know the ingredients, the serving information, and the questions worth asking.</p>
        <div className="hx-detail-points">{[
          { Icon: Leaf, title: 'Plant at the centre', body: 'Vijaya-based formulations, with ingredients clearly listed.' },
          { Icon: FlaskConical, title: 'Details that matter', body: 'Read the full label and serving information before you choose.' },
          { Icon: ShieldCheck, title: 'Your context comes first', body: 'A question is always welcome. Our consultation team can help.' },
        ].map(({ Icon, title, body }, index) => <div key={title}><Icon size={21} strokeWidth={1.4} /><div><h3>{title}</h3><p>{body}</p></div><span>0{index + 1}</span></div>)}</div>
        <Link href="/blog/how-to-read-a-gummy-label" className="hx-text-link">Learn to read the label <ArrowUpRight size={18} /></Link>
      </div>
    </section>

    <section className="hx-shop" aria-labelledby="shop-heading">
      <div className="hx-shop-heading hx-reveal"><div><span className="hx-label">04 / Make it your ritual</span><h2 id="shop-heading">Find your <em>kind of good.</em></h2></div><Link href="/shop" className="hx-text-link">Shop the collection<ArrowUpRight size={18} /></Link></div>
      <div className="hx-shop-grid">{products.map((product, index) => <article className={`hx-shop-card hx-reveal hx-shop-card-${index}`} key={product.id}>
        <div className="hx-shop-card-top"><span className="hx-label">0{index + 1} / {product.profile} profile</span><span>{product.badge}</span></div>
        <div className="hx-shop-word" aria-hidden="true">{index === 0 ? 'Bright.' : 'Zesty.'}</div>
        <div className="hx-shop-notes">{product.notes.map((note) => <span key={note}>{note}</span>)}</div>
        <div className="hx-shop-card-info"><div><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.description}</p></div><span className="hx-price">{formatINR(product.price)}<small>per pack</small></span></div>
        <div className="hx-shop-card-bottom"><Link href={`/products/${product.slug}`} className="hx-text-link">Explore the profile<ArrowUpRight size={18} /></Link><button onClick={() => { addItem(product); setAdded(product.id); }} aria-label={`Add ${product.name} to cart`}>{added === product.id ? <Check size={19} /> : <Plus size={19} />}</button></div>
      </article>)}</div><p className="hx-cart-status" role="status">{added ? `${products.find((p) => p.id === added)?.name} added to your cart.` : ''}</p>
    </section>

    <section className="hx-delivery hx-reveal"><div><span className="hx-label">Quietly, to your door</span><h2>Your ritual.<br /><em>Discreetly delivered.</em></h2><div className="hx-delivery-steps"><span><b>01</b> Choose your profile</span><span><b>02</b> Check eligibility</span><span><b>03</b> Receive discreetly</span></div></div><PincodeChecker /></section>

    <section className="hx-journal" aria-labelledby="journal-heading"><div className="hx-shop-heading hx-reveal"><div><span className="hx-label">05 / A little food for thought</span><h2 id="journal-heading">Stay <em>curious.</em></h2></div><Link href="/blog" className="hx-text-link">Inside the journal<ArrowUpRight size={18} /></Link></div>
      <div className="hx-journal-grid">{posts.map((post, index) => <Link key={post.slug} href={`/blog/${post.slug}`} className="hx-journal-card hx-reveal"><div className={`hx-journal-art hx-journal-art-${index}`} aria-hidden="true"><span>{['The plant.', 'The details.', 'The ritual.'][index]}</span><i /><b>H / 0{index + 1}</b></div><span className="hx-label">{post.category} · {post.readTime}</span><h3>{post.title}</h3><ArrowUpRight size={22} /></Link>)}</div>
    </section>

    <section className="hx-questions hx-reveal"><div><span className="hx-label">A clear answer is part of the product</span><h2>Wondering<br /><em>about something?</em></h2><Link href="/consultation" className="hx-text-link">Let’s talk<ArrowUpRight size={18} /></Link></div><div>{faqs.map((item, index) => <div className="hx-faq" key={item.question}><h3><button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index} aria-controls={`hx-faq-${index}`}>{item.question}{faq === index ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`hx-faq-${index}`} className="hx-faq-answer" hidden={faq !== index}>{item.answer}</div></div>)}</div></section>

    <section className="hx-finale"><span className="hx-label">Same you. A new perspective.</span><h2 className="hx-reveal">Make room<br />for <em>yourself.</em></h2><Link href="/shop" className="hx-button">Find your ritual<ArrowUpRight size={20} /></Link><div className="hx-finale-bottom"><span>Rooted in Ayurveda. Made for now.</span><span>Choose with intention. Always.</span></div><span className="hx-finale-orbit" aria-hidden="true" /></section>
  </div>;
}
