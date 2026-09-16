'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function ScrollReveal({ children, className = '', delay = 0, once = true }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = revealRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return <div
    ref={revealRef}
    className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
  >
    {children}
  </div>;
}
