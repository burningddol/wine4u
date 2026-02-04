'use client';

import { Canvas } from '@react-three/fiber';

import LightObject from './LightObject';
import { Suspense } from 'react';
import { WineModel } from './WineModel';
import { OrbitControls } from '@react-three/drei';
import { useDeviceTypeStore } from '@/libs/zustand';
import { useDeviceType } from '../wines/_libs/hooks/useDeviceType';

export function RenderModel() {
  useDeviceType();
  const { deviceType } = useDeviceTypeStore();
  const cameraZ = deviceType === 'desktop' ? 14 : 15;

  if (deviceType === 'mobile') return;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance' }}
      camera={{ position: [0, 5, cameraZ], fov: 55, near: 0.1, far: 200 }}
      style={{
        background: '#101318',
        touchAction: 'none',
      }}
    >
      <Suspense fallback={null}>
        <LightObject />
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          maxDistance={130}
          maxPolarAngle={Math.PI / 2}
        />
        <WineModel />
      </Suspense>
    </Canvas>
  );
}
