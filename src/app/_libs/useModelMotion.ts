'use client';

import * as THREE from 'three';

export function applyRotationY(
  obj: THREE.Object3D,
  speed: number,
  delta: number,
) {
  obj.rotation.y += speed * delta;
}
