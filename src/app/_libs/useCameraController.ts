'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

//  [progress, x, y, z, targetY][]
const KF = [
  [0, 0, 5, 14, 0],
  [0.2, 3, 2, 6, 3],
  [0.4, 6, 2, 0, 0],
  [0.6, 3, 3, -6, 0],
  [0.8, 0, 10, 3, 0],
  [1, 0, 6, 14, 0],
] as const;

const { lerp } = THREE.MathUtils;

const K_LERP = 0.026; //lerp 보간값

export function useCameraController(progress: number) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    let i = 0;
    while (i < KF.length - 1 && progress > KF[i + 1][0]) i++;

    const [p1, x1, y1, z1, ly1] = KF[i];
    const [p2, x2, y2, z2, ly2] = KF[i + 1];

    const t = (progress - p1) / (p2 - p1);

    targetPos.current.set(lerp(x1, x2, t), lerp(y1, y2, t), lerp(z1, z2, t));

    targetLookAt.current.y = lerp(
      targetLookAt.current.y,
      lerp(ly1, ly2, t),
      0.08,
    );

    camera.position.lerp(targetPos.current, K_LERP);
    camera.lookAt(0, targetLookAt.current.y, 0);
  });
}
