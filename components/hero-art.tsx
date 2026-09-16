'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';
import prodSassy from '@/animation/hero section/prod_1.png';
import prodNidra from '@/animation/hero section/prod_2.png';
import prodDeep from '@/animation/hero section/prod_3.png';
import platform from '@/animation/hero section/platform.png';

const Hero3DScene = dynamic(() => import('./hero-3d-scene').then((module) => module.Hero3DScene), {
  ssr: false,
  loading: () => null,
});

export function HeroArt() {
  const [isPaused, setIsPaused] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    event.currentTarget.style.setProperty('--hero-pointer-x', x.toFixed(3));
    event.currentTarget.style.setProperty('--hero-pointer-y', y.toFixed(3));
  };

  const resetPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--hero-pointer-x', '0');
    event.currentTarget.style.setProperty('--hero-pointer-y', '0');
  };

  return <div
    className={`cinematic-hero ${isPaused ? 'is-paused' : ''}`}
    onPointerMove={handlePointerMove}
    onPointerLeave={resetPointer}
  >
    <Image
      className="cinematic-hero-background"
      src={platform}
      alt=""
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 55vw"
    />
    <div className="cinematic-hero-veil" aria-hidden="true" />
    <div className="cinematic-hero-orbit cinematic-hero-orbit-one" aria-hidden="true" />
    <div className="cinematic-hero-orbit cinematic-hero-orbit-two" aria-hidden="true" />
    <Hero3DScene
      paused={isPaused}
      fallback={<div className="cinematic-hero-fallback" aria-hidden="true">
        <span className="cinematic-hero-fallback-product cinematic-hero-fallback-sassy">
          <span className="cinematic-hero-fallback-float"><Image src={prodSassy} alt="" fill sizes="28vw" /></span>
        </span>
        <span className="cinematic-hero-fallback-product cinematic-hero-fallback-nidra">
          <span className="cinematic-hero-fallback-float"><Image src={prodNidra} alt="" fill sizes="34vw" /></span>
        </span>
        <span className="cinematic-hero-fallback-product cinematic-hero-fallback-deep">
          <span className="cinematic-hero-fallback-float"><Image src={prodDeep} alt="" fill sizes="28vw" /></span>
        </span>
      </div>}
    />

    <div className="cinematic-hero-topline" aria-hidden="true">
      <span>Same plant. Different states.</span>
      <span>Three profiles</span>
    </div>

    <div className="cinematic-hero-caption" aria-hidden="true">
      <span className="cinematic-hero-caption-mark" />
      <span>Change your state.</span>
    </div>

    <button
      className="cinematic-hero-toggle"
      type="button"
      onClick={() => setIsPaused((paused) => !paused)}
      aria-label={isPaused ? 'Resume product animation' : 'Pause product animation'}
      aria-pressed={isPaused}
    >
      {isPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      <span>{isPaused ? 'Play' : 'Pause'}</span>
    </button>

    <span className="sr-only">Three HITUDE product models rise from the platform, orbit gently as you scroll, and float independently.</span>
  </div>;
}
