'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { applyRotationY } from '../_libs/useModelMotion';

export function WineModel() {
  const { scene } = useGLTF('/main/wine_objects.glb');
  const objRef = useRef<THREE.Object3D>(null);

  useFrame((_, delta) => {
    const obj = objRef.current;
    if (!obj) return;

    const dt = Math.min(delta, 1 / 30); // 33ms 이상은 잘라서 부드럽게
    const speed = 0.3;

    applyRotationY(obj, speed, dt);
  });

  return (
    <primitive ref={objRef} object={scene} scale={1} position={[0, -3.8, 0]} />
  );
}
