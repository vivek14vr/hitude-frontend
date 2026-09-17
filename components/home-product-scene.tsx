'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

export type SceneMotion = { focus: number; turn: number; x: number; y: number; scroll: number };
export type SceneProps = {
  kind: 'trio' | 'profile' | 'detail';
  motion: MutableRefObject<SceneMotion>;
  paused: boolean;
  reduced: boolean;
  visible: boolean;
  onReady: () => void;
};

// GLB order differs from the PNG filenames: red, blue, violet.
const models = ['/animation/hero-section/optimized/prod_3.glb', '/animation/hero-section/optimized/prod_1.glb', '/animation/hero-section/optimized/prod_2.glb'];

function Pack({ index, kind, motion, paused, reduced, onReady }: Omit<SceneProps, 'visible'> & { index: number }) {
  const { scene } = useGLTF(models[index]);
  const root = useRef<THREE.Group>(null);
  const time = useRef(0);
  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 2.65 / bounds.getSize(new THREE.Vector3()).y;
    // Center before rotating the printed face; leave cached geometry untouched.
    const centered = new THREE.Group();
    clone.position.sub(center);
    centered.add(clone);
    centered.scale.setScalar(scale);
    centered.rotation.y = Math.PI;
    return centered;
  }, [scene]);

  useEffect(() => { onReady(); }, [onReady]);

  useFrame((_, rawDelta) => {
    const group = root.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.04);
    if (!paused && !reduced) time.current += delta;
    const t = time.current;
    const input = motion.current;
    const trio = kind === 'trio';
    const focus = kind === 'detail' ? 0 : input.focus;
    const distance = index - focus;
    const intro = reduced ? 1 : THREE.MathUtils.smoothstep(t, index * 0.16, 1.55 + index * 0.16);
    const hover = reduced ? 0 : Math.sin(t * 0.85 + index * 2) * 0.065;
    const targetX = trio ? (index - 1) * 2.2 : distance * 5;
    const targetY = (trio ? (index === 1 ? 0.24 : -0.16) : 0) + hover - (1 - intro) * 0.55;
    const targetZ = trio ? (index === 1 ? 0.4 : -0.3) : -Math.min(Math.abs(distance), 1) * 1.6;
    const targetScale = trio ? (index === 1 ? 1.04 : 0.86) : (kind === 'detail' ? 1.2 : 1.12);
    const blend = reduced || paused ? 1 : 1 - Math.exp(-5.5 * delta);
    group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, blend);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, blend);
    group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, blend);
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, targetScale, blend));
    const parallax = reduced ? 0 : input.x * 0.17;
    const yaw = trio ? (index - 1) * -0.13 + parallax : input.turn + parallax + (reduced ? 0 : (input.scroll - 0.5) * 0.42);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, yaw + (1 - intro) * -0.9, blend);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, reduced ? 0 : input.y * 0.08, blend);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, trio ? (index - 1) * 0.12 : (kind === 'detail' ? -0.15 : -0.045), blend);
  });

  return <group ref={root} position={[kind === 'trio' ? (index - 1) * 2.2 : index * 5, 0, 0]} dispose={null}>
    <primitive object={normalized} />
  </group>;
}

function Stage(props: SceneProps) {
  const { camera, size, invalidate } = useThree();
  useLayoutEffect(() => {
    const ortho = camera as THREE.OrthographicCamera;
    ortho.zoom = Math.min(size.width / (props.kind === 'trio' ? 7.2 : 4.1), size.height / 4.25);
    ortho.updateProjectionMatrix();
    invalidate();
  }, [camera, size, props.kind, invalidate]);
  useEffect(() => {
    if ((!props.paused && !props.reduced) || !props.visible) return;
    const id = window.setInterval(invalidate, 100);
    return () => window.clearInterval(id);
  }, [props.paused, props.reduced, props.visible, invalidate]);
  return <>
    <ambientLight intensity={1.55} />
    <directionalLight position={[-4, 5, 7]} intensity={2.5} color="#fff3df" />
    <directionalLight position={[4, 2, -3]} intensity={2.8} color="#a8bfff" />
    <directionalLight position={[0, -3, 4]} intensity={0.65} color="#ffc9a0" />
    {(props.kind === 'detail' ? [0] : [0, 1, 2]).map((index) => <Suspense key={index} fallback={null}><Pack index={index} {...props} /></Suspense>)}
  </>;
}

export default function HomeProductScene(props: SceneProps) {
  return <Canvas orthographic camera={{ position: [0, 0, 9], zoom: 85, near: 0.1, far: 50 }}
    dpr={[1, 1.25]} frameloop={!props.visible ? 'never' : props.paused || props.reduced ? 'demand' : 'always'}
    gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}>
    <Suspense fallback={null}><Stage {...props} /></Suspense>
  </Canvas>;
}
