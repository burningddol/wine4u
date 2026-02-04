export type CharacterRole = 'main' | 'peeker' | 'shy' | 'idle';
export type FocusTarget = 'none' | 'email' | 'password' | 'nickname';
export type EyeState = 'open' | 'squint' | 'halfOpen';

export const BODY_TOP = 5;
export const BASE_BODY_HEIGHT = 93;
export const EAR_PAD = 14;
export const FACE_Y = 40;
export const OUTLINE = '#3a3a3a';
export const DARK = '#2a2a2a';
export const WINE_RED = '#722F37';
export const WINE_LIGHT = '#f37a84';

export const LEFT_EYE = { x: 38, y: 40 } as const;
export const RIGHT_EYE = { x: 72, y: 40 } as const;

const MAX_OFFSET = 4.5;
const MAX_TILT = 10;

export const EYE_RADIUS: Record<CharacterRole, number> = {
  main: 13,
  peeker: 12,
  shy: 11,
  idle: 10,
};

export const PUPIL_RADIUS: Record<CharacterRole, number> = {
  main: 6,
  peeker: 5.5,
  shy: 5,
  idle: 4.5,
};

export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export interface Geometry {
  bodyBottom: number;
  bodyMidY: number;
  shadowY: number;
  viewH: number;
  faceFollowRatio: number;
  earFollowRatio: number;
}

export function getGeometry(heightRatio: number): Geometry {
  const bodyBottom = BODY_TOP + BASE_BODY_HEIGHT * heightRatio;
  const bodyMidY = BODY_TOP + 50 * heightRatio;
  return {
    bodyBottom,
    bodyMidY,
    shadowY: bodyBottom + 1,
    viewH: Math.ceil(bodyBottom + 4),
    faceFollowRatio: (bodyBottom - FACE_Y) / (bodyBottom - BODY_TOP),
    earFollowRatio: bodyBottom / (bodyBottom - BODY_TOP),
  };
}

export function getBodyPath(bodyBottom: number, bodyMidY: number): string {
  return getAnimatedBodyPath(bodyBottom, bodyMidY, 0, 0);
}

export function getAnimatedBodyPath(
  bodyBottom: number,
  bodyMidY: number,
  topShift: number = 0,
  midShift: number = 0,
): string {
  // Wine glass shape: bowl (top) + stem (middle) + base (bottom)
  const bowlTop = BODY_TOP - 5;
  const bowlBottom = bodyMidY + 10;
  const stemWidth = 8;
  const stemLeft = 60 - stemWidth;
  const stemRight = 60 + stemWidth;
  const stemBottom = bodyBottom - 6;
  const baseWidth = 35;

  return (
    // Start at bowl left side
    `M${10 + midShift} ${bowlBottom} ` +
    // Bowl left curve up
    `C${10 + midShift} ${bodyMidY - 20}, ${20 + topShift} ${bowlTop + 5}, ${35 + topShift} ${bowlTop - 5} ` +
    // Bowl top curve
    `Q${60 + topShift} ${bowlTop - 18}, ${85 + topShift} ${bowlTop - 5} ` +
    // Bowl right curve down
    `C${100 + topShift} ${bowlTop + 5}, ${110 + midShift} ${bodyMidY - 20}, ${110 + midShift} ${bowlBottom} ` +
    // Bowl to stem transition (right)
    `Q${105 + midShift * 0.5} ${bowlBottom + 8}, ${stemRight + midShift * 0.3} ${bowlBottom + 12} ` +
    // Stem right side down
    `L${stemRight} ${stemBottom} ` +
    // Base right
    `L${60 + baseWidth} ${stemBottom + 2} ` +
    `Q${60 + baseWidth + 5} ${bodyBottom}, ${60 + baseWidth} ${bodyBottom} ` +
    // Base bottom
    `L${60 - baseWidth} ${bodyBottom} ` +
    `Q${60 - baseWidth - 5} ${bodyBottom}, ${60 - baseWidth} ${stemBottom + 2} ` +
    // Stem left side up
    `L${stemLeft} ${stemBottom} ` +
    `L${stemLeft + midShift * 0.3} ${bowlBottom + 12} ` +
    // Bowl to stem transition (left)
    `Q${15 + midShift * 0.5} ${bowlBottom + 8}, ${10 + midShift} ${bowlBottom} Z`
  );
}

export function getWinePath(bodyBottom: number, bodyMidY: number): string {
  return getAnimatedWinePath(bodyBottom, bodyMidY, 0, 0);
}

export function getAnimatedWinePath(
  bodyBottom: number,
  bodyMidY: number,
  topShift: number = 0,
  midShift: number = 0,
): string {
  // Wine liquid inside the glass bowl
  const wineTop = bodyMidY - 5;
  const bowlBottom = bodyMidY + 10;

  return (
    `M${18 + midShift} ${bowlBottom - 2} ` +
    `C${18 + midShift} ${bodyMidY - 10}, ${28 + topShift} ${wineTop}, ${42 + topShift} ${wineTop - 5} ` +
    `Q${60 + topShift} ${wineTop - 12}, ${78 + topShift} ${wineTop - 5} ` +
    `C${92 + topShift} ${wineTop}, ${102 + midShift} ${bodyMidY - 10}, ${102 + midShift} ${bowlBottom - 2} ` +
    `Q${95 + midShift * 0.5} ${bowlBottom + 3}, 60 ${bowlBottom + 5} ` +
    `Q${25 + midShift * 0.5} ${bowlBottom + 3}, ${18 + midShift} ${bowlBottom - 2} Z`
  );
}

export function getEyeState(
  role: CharacterRole,
  focused: boolean,
  password: boolean,
): EyeState {
  if (!focused) return 'open';
  switch (role) {
    case 'main':
      return password ? 'squint' : 'open';
    case 'peeker':
      return password ? 'halfOpen' : 'open';
    case 'shy':
      return password ? 'squint' : 'open';
    case 'idle':
      return 'open';
  }
}

export interface Target {
  dx: number;
  dy: number;
  tilt: number;
}

export function getTarget(
  role: CharacterRole,
  focus: FocusTarget,
  cursorX: number,
  cursorY: number,
): Target {
  if (focus === 'none') {
    return {
      dx: clamp(cursorX * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET),
      dy: clamp(cursorY * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET),
      tilt: clamp(cursorX * MAX_TILT, -MAX_TILT, MAX_TILT),
    };
  }
  if (focus === 'email') {
    switch (role) {
      case 'main':
        return { dx: MAX_OFFSET * 1.2, dy: -1.5, tilt: 13 };
      case 'peeker':
        return { dx: MAX_OFFSET * 1.1, dy: -1.8, tilt: 10 };
      case 'shy':
        return { dx: MAX_OFFSET * 1, dy: -1.8, tilt: 13 };
      case 'idle':
        return { dx: MAX_OFFSET * 0.8, dy: -1.8, tilt: 10 };
    }
  }
  if (focus === 'nickname') {
    switch (role) {
      case 'main':
        return { dx: MAX_OFFSET * 1.2, dy: -1.6, tilt: 13 };
      case 'peeker':
        return { dx: MAX_OFFSET * 1.1, dy: -1.1, tilt: 10 };
      case 'shy':
        return { dx: MAX_OFFSET * 1, dy: -1.1, tilt: 13 };
      case 'idle':
        return { dx: MAX_OFFSET * 0.8, dy: -1.1, tilt: 10 };
    }
  }
  // password
  switch (role) {
    case 'main':
      return { dx: MAX_OFFSET * 0.8, dy: 0, tilt: 6 };
    case 'peeker':
      return { dx: MAX_OFFSET * 1.1, dy: -1, tilt: -4 };
    case 'shy':
      return { dx: -MAX_OFFSET * 0.6, dy: 1, tilt: -8 };
    case 'idle':
      return { dx: MAX_OFFSET * -0.3, dy: 2, tilt: 2 };
  }
}
