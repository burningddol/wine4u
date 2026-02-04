'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LightObject from './LightObject';
import { WineModel } from './WineModel';

import { DeviceType } from '@/libs/zustand';

interface RenderModelProps {
  deviceType: DeviceType;
  progress: number;
}

export function RenderModel({ deviceType, progress }: RenderModelProps) {
  if (deviceType === 'mobile') return null;

  const opacity = progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1;

  return (
    <div style={{ opacity }} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance' }}
        camera={{ position: [0, 5, 14], fov: 55, near: 0.1, far: 200 }}
        style={{ background: '#101318', touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <LightObject progress={progress} />
          <WineModel progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
