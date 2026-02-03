import { useRef, useEffect } from 'react';
import type { FocusTarget, CharacterRole, Geometry } from './character-helpers';
import {
  BODY_TOP,
  LEFT_EYE,
  RIGHT_EYE,
  lerp,
  getTarget,
  getAnimatedBodyPath,
  getAnimatedWinePath,
} from './character-helpers';

interface Params {
  cursorX: number;
  cursorY: number;
  focusTarget: FocusTarget;
  isTyping: boolean;
  role: CharacterRole;
  geo: Geometry;
}

function moveCircle(el: SVGCircleElement | null, cx: number, cy: number) {
  if (!el) return;
  el.setAttribute('cx', String(cx));
  el.setAttribute('cy', String(cy));
}

export function useCharacterAnimation({
  cursorX,
  cursorY,
  focusTarget,
  isTyping,
  role,
  geo,
}: Params) {
  const body = useRef<SVGPathElement>(null);
  const wine = useRef<SVGPathElement>(null);
  const face = useRef<SVGGElement>(null);
  const ears = useRef<SVGGElement>(null);
  const pupilLeft = useRef<SVGCircleElement>(null);
  const pupilRight = useRef<SVGCircleElement>(null);
  const highlightLeft = useRef<SVGCircleElement>(null);
  const highlightRight = useRef<SVGCircleElement>(null);

  const pupils = { left: pupilLeft, right: pupilRight };
  const highlights = { left: highlightLeft, right: highlightRight };

  const current = useRef({ dx: 0, dy: 0, tilt: 0 });
  const { bodyBottom, bodyMidY, faceFollowRatio, earFollowRatio } = geo;

  useEffect(() => {
    let active = true;
    let frame = 0;

    function tick() {
      if (!active) return;

      const focused = focusTarget !== 'none';
      const passwordFocused = focusTarget === 'password';
      const target = getTarget(role, focusTarget, cursorX, cursorY);
      const ease = focused ? 0.08 : 0.1;

      const c = current.current;
      c.dx = lerp(c.dx, target.dx, ease);
      c.dy = lerp(c.dy, target.dy, ease);
      c.tilt = lerp(c.tilt, target.tilt, ease);

      // Pupil + highlight offsets (smaller when half-open to stay inside slit)
      const halfOpen = focused && role === 'peeker';
      const hx = halfOpen ? 1.5 : 2.2;
      const hy = halfOpen ? -1.0 : -2.8;

      moveCircle(pupils.left.current, LEFT_EYE.x + c.dx, LEFT_EYE.y + c.dy);
      moveCircle(
        highlights.left.current,
        LEFT_EYE.x + c.dx + hx,
        LEFT_EYE.y + c.dy + hy
      );
      moveCircle(pupils.right.current, RIGHT_EYE.x + c.dx, RIGHT_EYE.y + c.dy);
      moveCircle(
        highlights.right.current,
        RIGHT_EYE.x + c.dx + hx,
        RIGHT_EYE.y + c.dy + hy
      );

      // Body bend — typing bounce for main (email) & peeker (password)
      const shouldBounce =
        isTyping &&
        focused &&
        ((role === 'main' && !passwordFocused) ||
          (role === 'peeker' && passwordFocused));
      const bounce = shouldBounce ? Math.sin(Date.now() / 400) * 1.8 : 0;
      const topShift = (c.tilt + bounce) * 1.2;
      const midShift = topShift * 0.35;

      body.current?.setAttribute(
        'd',
        getAnimatedBodyPath(bodyBottom, bodyMidY, topShift, midShift)
      );

      wine.current?.setAttribute(
        'd',
        getAnimatedWinePath(bodyBottom, bodyMidY, topShift, midShift)
      );

      face.current?.setAttribute(
        'transform',
        `translate(${topShift * faceFollowRatio}, 0)`
      );
      ears.current?.setAttribute(
        'transform',
        `translate(${topShift * earFollowRatio}, 0)`
      );

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [
    cursorX,
    cursorY,
    focusTarget,
    isTyping,
    role,
    bodyBottom,
    bodyMidY,
    faceFollowRatio,
    earFollowRatio,
  ]);

  return { body, wine, face, ears, pupils, highlights };
}
