'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react';

type ProductConfig = {
  url: string;
  x: number;
  y: number;
  z: number;
  height: number;
  lift: number;
  tilt: number;
  phase: number;
  delay: number;
};

const productConfigs: ProductConfig[] = [
  // Keep a small, visible air gap between each pack so their silhouettes do
  // not merge when the camera or the collection rig gently moves.
  { url: '/animation/hero-section/prod_1.glb', x: -1.16, y: 0, z: -0.08, height: 1.5, lift: 0.5, tilt: -0.16, phase: 0.2, delay: 0.22 },
  { url: '/animation/hero-section/prod_2.glb', x: 0, y: 0.04, z: 0.12, height: 1.94, lift: 0.46, tilt: 0.01, phase: 2.1, delay: 0.42 },
  { url: '/animation/hero-section/prod_3.glb', x: 1.16, y: 0, z: -0.04, height: 1.5, lift: 0.52, tilt: 0.16, phase: 4, delay: 0.64 },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

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

function ProductModel({ config, index, paused, reducedMotion, motionTime }: { config: ProductConfig; index: number; paused: boolean; reducedMotion: boolean; motionTime: MutableRefObject<number> }) {
  const { scene } = useGLTF(config.url);
  const groupRef = useRef<THREE.Group>(null);
  const model = useMemo(() => scene.clone(true), [scene]);
  const metrics = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    return { scale: config.height / Math.max(size.y, 0.001), center, minY: bounds.min.y };
  }, [config.height, model]);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    model.scale.setScalar(metrics.scale);
    // The supplied assets are authored with the printed package face pointing
    // away from the default camera direction, so turn the whole asset once.
    model.rotation.set(0, Math.PI, 0);
    model.position.set(
      -metrics.center.x * metrics.scale,
      -metrics.minY * metrics.scale,
      -metrics.center.z * metrics.scale,
    );
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [metrics, model]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const elapsed = motionTime.current;
    const entrance = reducedMotion ? 1 : smoothstep(clamp((elapsed - config.delay) / 1.25));
    const hover = reducedMotion ? 0 : Math.sin(elapsed * 1.35 + config.phase) * 0.075;
    const sway = reducedMotion ? 0 : Math.sin(elapsed * 0.9 + config.phase) * 0.035;
    const depthBreath = reducedMotion ? 0 : Math.sin(elapsed * 0.75 + config.phase) * 0.025;
    const floorY = -1.05 + config.y;
    const targetY = floorY + (config.lift * entrance) + (hover * entrance);

    targetPosition.set(config.x + sway, targetY, config.z + (depthBreath * entrance));
    targetScale.setScalar(0.98 + (entrance * 0.02) + (Math.sin(elapsed * 1.1 + config.phase) * 0.004 * entrance));
    group.position.lerp(targetPosition, 1 - Math.exp(-delta * 8));
    group.scale.lerp(targetScale, 1 - Math.exp(-delta * 8));
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, config.tilt + (Math.sin(elapsed * 0.85 + config.phase) * 0.018 * entrance), 5, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, Math.sin(elapsed * 0.62 + config.phase) * 0.012 * entrance, 5, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, index === 1 ? 0 : (index === 0 ? -0.035 : 0.035), 5, delta);
  });

  return <group ref={groupRef}>
    <primitive object={model} />
  </group>;
}

function ProductRig({ paused, reducedMotion, scrollProgress }: { paused: boolean; reducedMotion: boolean; scrollProgress: MutableRefObject<number> }) {
  const rigRef = useRef<THREE.Group>(null);
  const motionTime = useRef(0);

  useFrame(({ camera, pointer }, delta) => {
    if (!rigRef.current) return;
    if (!paused && !reducedMotion) motionTime.current += delta;

    const orbit = reducedMotion ? 0 : scrollProgress.current * 0.38;
    rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, orbit, 4.5, delta);
    rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, reducedMotion ? 0 : pointer.y * 0.018, 4, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, (reducedMotion ? 0 : pointer.x * 0.12) + (scrollProgress.current * 0.05), 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.15 + (reducedMotion ? 0 : pointer.y * 0.06), 3.5, delta);
    camera.lookAt(0, 0.08, 0);
  });

  return <>
    <Sparkles count={34} scale={[4.2, 3.5, 1.6]} position={[0, 0.65, -0.9]} size={1.15} speed={0.18} opacity={0.5} color="#ffd58c" />
    <group ref={rigRef}>
      {productConfigs.map((config, index) => <ProductModel
        config={config}
        index={index}
        key={config.url}
        motionTime={motionTime}
        paused={paused}
        reducedMotion={reducedMotion}
      />)}
    </group>
    <ContactShadows position={[0, -1.04, 0]} opacity={0.3} scale={4.4} blur={2.3} far={3.8} color="#080d22" frames={1} />
  </>;
}

export function Hero3DScene({ paused, fallback }: { paused: boolean; fallback?: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const updateProgress = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const travel = Math.max(window.innerHeight * 0.9, rect.height * 1.35);
      targetProgress.current = clamp((window.innerHeight * 0.82 - rect.top) / travel);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const smoothScroll = () => {
      scrollProgress.current = THREE.MathUtils.damp(scrollProgress.current, targetProgress.current, 3.5, 1 / 60);
      frame = window.requestAnimationFrame(smoothScroll);
    };
    frame = window.requestAnimationFrame(smoothScroll);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <div ref={stageRef} className="hero-3d-scene" aria-hidden="true">
    <Canvas
      camera={{ fov: 30, position: [0, 0.15, 6.8] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      shadows
      fallback={fallback ?? <div className="hero-3d-fallback-label">Your browser is showing the considered view.</div>}
    >
      <ambientLight intensity={1.15} />
      <directionalLight castShadow intensity={2.1} color="#fff2dc" position={[-3, 4, 4]} shadow-mapSize={[1024, 1024]} />
      <pointLight intensity={12} color="#cdd9ff" distance={7} position={[-2.5, 1.2, 2.5]} />
      <pointLight intensity={8} color="#ffbd78" distance={6} position={[2.7, -0.6, 2.1]} />
      <Suspense fallback={null}>
        <ProductRig paused={paused} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  </div>;
}

productConfigs.forEach(({ url }) => useGLTF.preload(url));
