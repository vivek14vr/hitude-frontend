'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles, useGLTF } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject, ReactNode } from 'react';
import prodSassy from '@/animation/hero section/prod_1.png';
import prodNidra from '@/animation/hero section/prod_2.png';
import prodDeep from '@/animation/hero section/prod_3.png';

export type HomeModelKey = 'sassy' | 'nidra' | 'deep';

const modelUrls: Record<HomeModelKey, string> = {
  sassy: '/animation/hero-section/prod_1.glb',
  nidra: '/animation/hero-section/prod_2.glb',
  deep: '/animation/hero-section/prod_3.glb',
};

const fallbackImages: Record<HomeModelKey, typeof prodSassy> = {
  sassy: prodSassy,
  nidra: prodNidra,
  deep: prodDeep,
};

const modelMotion: Record<HomeModelKey, { phase: number; tilt: number; height: number }> = {
  sassy: { phase: 0.4, tilt: -0.12, height: 1.72 },
  nidra: { phase: 2.2, tilt: 0.02, height: 1.95 },
  deep: { phase: 4.1, tilt: 0.12, height: 1.8 },
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

function Model({ modelKey, reducedMotion, scrollProgress }: { modelKey: HomeModelKey; reducedMotion: boolean; scrollProgress: MutableRefObject<number> }) {
  const { scene } = useGLTF(modelUrls[modelKey]);
  const groupRef = useRef<THREE.Group>(null);
  const clonedModel = useMemo(() => scene.clone(true), [scene]);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetScale = useMemo(() => new THREE.Vector3(), []);
  const metrics = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(clonedModel);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    return {
      scale: modelMotion[modelKey].height / Math.max(size.y, 0.001),
      center,
      minY: bounds.min.y,
    };
  }, [clonedModel, modelKey]);

  useEffect(() => {
    clonedModel.scale.setScalar(metrics.scale);
    clonedModel.rotation.set(0, Math.PI, 0);
    clonedModel.position.set(
      -metrics.center.x * metrics.scale,
      -metrics.minY * metrics.scale,
      -metrics.center.z * metrics.scale,
    );
    clonedModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedModel, metrics]);

  useFrame(({ pointer, clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const elapsed = clock.getElapsedTime();
    const phase = modelMotion[modelKey].phase;
    const float = reducedMotion ? 0 : Math.sin(elapsed * 1.05 + phase) * 0.08;
    const pointerX = reducedMotion ? 0 : pointer.x * 0.12;
    const pointerY = reducedMotion ? 0 : pointer.y * -0.08;
    const scrollLift = reducedMotion ? 0 : (0.5 - scrollProgress.current) * 0.16;

    targetPosition.set(pointerX, float + pointerY + scrollLift, 0);
    targetScale.setScalar(0.96 + (reducedMotion ? 0.04 : 0.04 + (Math.sin(elapsed * 0.9 + phase) * 0.008)));
    group.position.lerp(targetPosition, 1 - Math.exp(-delta * 5));
    group.scale.lerp(targetScale, 1 - Math.exp(-delta * 5));
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointer.y * -0.06, 4, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, (pointer.x * 0.08) + (scrollProgress.current * 0.18), 4, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, modelMotion[modelKey].tilt + (Math.sin(elapsed * 0.7 + phase) * 0.025), 4, delta);
  });

  return <group ref={groupRef}>
    <primitive object={clonedModel} />
  </group>;
}

function Scene({ modelKey, reducedMotion, scrollProgress }: { modelKey: HomeModelKey; reducedMotion: boolean; scrollProgress: MutableRefObject<number> }) {
  return <>
    <ambientLight intensity={1.15} />
    <directionalLight castShadow intensity={2.15} color="#fff0d7" position={[-3, 4, 4]} shadow-mapSize={[1024, 1024]} />
    <pointLight intensity={9} color="#a9c6ff" distance={6} position={[-2.3, 1.4, 2.4]} />
    <pointLight intensity={8} color="#ffb66f" distance={5} position={[2.4, -0.6, 2]} />
    <Sparkles count={18} scale={[3.8, 3.2, 1.3]} position={[0, 0.55, -0.8]} size={1.1} speed={reducedMotion ? 0 : 0.16} opacity={0.5} color="#ffd28b" />
    <Model modelKey={modelKey} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
    <ContactShadows position={[0, -1.02, 0]} opacity={0.28} scale={3.4} blur={2.2} far={3.4} color="#080d22" frames={1} />
  </>;
}

export function HomeModelStage({ model = 'nidra', variant = 'collection', className = '' }: { model?: HomeModelKey; variant?: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const fallback: ReactNode = <div className="home-model-stage-fallback"><Image src={fallbackImages[model]} alt="" fill sizes="(max-width: 767px) 90vw, 38vw" /></div>;

  useEffect(() => {
    const updateProgress = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const travel = Math.max(window.innerHeight, rect.height + window.innerHeight * 0.55);
      scrollProgress.current = THREE.MathUtils.clamp((window.innerHeight * 0.78 - rect.top) / travel, 0, 1);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return <div ref={stageRef} className={`home-model-stage home-model-stage-${variant} ${className}`} aria-hidden="true">
    <Canvas
      camera={{ fov: 28, position: [0, 0.1, 5.6] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      shadows
      fallback={fallback}
    >
      <Scene modelKey={model} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
    </Canvas>
  </div>;
}

Object.values(modelUrls).forEach((url) => useGLTF.preload(url));
