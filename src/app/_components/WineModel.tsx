'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCameraController } from '../_libs/useCameraController';

interface WineModelProps {
  progress: number;
}

export function WineModel({ progress }: WineModelProps) {
  const { scene } = useGLTF('/main/wine_objects.glb');
  const objRef = useRef<THREE.Object3D>(null);
  useCameraController(progress);

  useFrame((_, delta) => {
    const obj = objRef.current;
    if (!obj) return;

    const speed = 0.3;
    obj.rotation.y += speed * Math.min(delta, 1 / 30);
  });

  return (
    <primitive ref={objRef} object={scene} scale={1} position={[0, -3.8, 0]} />
  );
}
