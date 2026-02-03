import {
  type CharacterRole,
  type FocusTarget,
  type EyeState,
  EAR_PAD,
  LEFT_EYE,
  RIGHT_EYE,
  OUTLINE,
  DARK,
  WINE_RED,
  WINE_LIGHT,
  EYE_RADIUS,
  PUPIL_RADIUS,
  getGeometry,
  getBodyPath,
  getWinePath,
  getEyeState,
} from '@/app/(auth)/_libs/character-helpers';
import { useCharacterAnimation } from '@/app/(auth)/_libs/useCharacterAnimation';

export type { CharacterRole, FocusTarget };

interface CharacterProps {
  cursorX: number;
  cursorY: number;
  focusTarget: FocusTarget;
  isTyping: boolean;
  role: CharacterRole;
  scale?: number;
  heightRatio?: number;
  zIndex?: number;
}

function Eye({
  side,
  state,
  pupilRef,
  highlightRef,
  eyeR,
  pupilR,
}: {
  side: 'left' | 'right';
  state: EyeState;
  pupilRef: React.RefObject<SVGCircleElement | null>;
  highlightRef: React.RefObject<SVGCircleElement | null>;
  eyeR: number;
  pupilR: number;
}) {
  const c = side === 'left' ? LEFT_EYE : RIGHT_EYE;

  if (state === 'squint') {
    return (
      <path
        d={`M${c.x - 9} ${c.y} Q${c.x} ${c.y + 6}, ${c.x + 9} ${c.y}`}
        stroke={DARK}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    );
  }

  if (state === 'halfOpen') {
    const wide = side === 'right';
    const rx = eyeR * (wide ? 0.85 : 0.8);
    const ry = eyeR * (wide ? 0.45 : 0.35);
    const pr = pupilR * (wide ? 0.75 : 0.7);
    return (
      <>
        <ellipse
          cx={c.x}
          cy={c.y}
          rx={rx}
          ry={ry}
          fill="white"
          stroke={OUTLINE}
          strokeWidth="2"
        />
        <circle
          ref={pupilRef}
          cx={c.x + (wide ? 2 : 0)}
          cy={c.y}
          r={pr}
          fill={DARK}
        />
        <circle
          ref={highlightRef}
          cx={c.x + 1.5}
          cy={c.y - 1}
          r={1.8}
          fill="white"
        />
      </>
    );
  }

  // open (default)
  return (
    <>
      <circle
        cx={c.x}
        cy={c.y}
        r={eyeR}
        fill="white"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <circle ref={pupilRef} cx={c.x} cy={c.y} r={pupilR} fill={DARK} />
      <circle
        ref={highlightRef}
        cx={c.x + 2.2}
        cy={c.y - 2.8}
        r={2.4}
        fill="white"
      />
    </>
  );
}

function Mouth({ role, focused }: { role: CharacterRole; focused: boolean }) {
  if (role === 'main' && focused) {
    return <ellipse cx="55" cy="64" rx="3.5" ry="2.8" fill={OUTLINE} />;
  }
  if (role === 'peeker' && focused) {
    return (
      <path
        d="M50 63 Q56 67, 62 63"
        stroke={OUTLINE}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  }
  return (
    <path
      d="M48 63 Q55 69, 65 63"
      stroke={OUTLINE}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  );
}

export default function Character({
  cursorX,
  cursorY,
  focusTarget,
  isTyping,
  role,
  scale = 1,
  heightRatio = 1,
  zIndex = 0,
}: CharacterProps) {
  const geo = getGeometry(heightRatio);
  const { body, wine, face, ears, pupils, highlights } = useCharacterAnimation({
    cursorX,
    cursorY,
    focusTarget,
    isTyping,
    role,
    geo,
  });

  const focused = focusTarget !== 'none';
  const eyeState = getEyeState(role, focused, focusTarget === 'password');
  const eyeR = EYE_RADIUS[role];
  const pupilR = PUPIL_RADIUS[role];
  const w = 120 * scale;
  const h = (geo.viewH + EAR_PAD) * scale;

  return (
    <div className="relative" style={{ width: w, height: h, zIndex }}>
      <svg
        viewBox={`0 ${-EAR_PAD} 120 ${geo.viewH + EAR_PAD}`}
        width={w}
        height={h}
        fill="none"
      >
        {/* Shadow */}
        <ellipse
          cx="60"
          cy={geo.shadowY}
          rx="46"
          ry="5"
          fill="rgba(0,0,0,0.07)"
        />

        {/* Grape decorations  */}
        <g ref={ears}>
          {/* Left grape  */}
          <g>
            <circle cx={28} cy={-2} r={6} fill={WINE_RED} />
            <circle cx={36} cy={-4} r={5} fill={WINE_RED} />

            <circle cx={30} cy={-2} r={2} fill="rgba(255,255,255,0.3)" />
          </g>
          {/* Right grape  */}
          <g>
            <circle cx={92} cy={-2} r={6} fill={WINE_RED} />
            <circle cx={84} cy={-4} r={5} fill={WINE_RED} />

            <circle cx={90} cy={-2} r={2} fill="rgba(255,255,255,0.3)" />
          </g>
        </g>

        {/* Wine Glass Body */}
        <path
          ref={body}
          d={getBodyPath(geo.bodyBottom, geo.bodyMidY)}
          fill={role === 'peeker' ? '#f8f5f5' : 'rgb(255, 255, 255)'}
          stroke={OUTLINE}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Wine liquid inside */}
        <path
          ref={wine}
          d={getWinePath(geo.bodyBottom, geo.bodyMidY)}
          fill={WINE_RED}
          opacity={0.85}
        />
        {/* Wine highlight/reflection */}
        <ellipse
          cx={75}
          cy={geo.bodyMidY - 5}
          rx={12}
          ry={8}
          fill="rgba(255,255,255,0.2)"
        />

        {/* Face */}
        <g ref={face}>
          {/* Eyes  */}
          <Eye
            side="left"
            state={eyeState}
            pupilRef={pupils.left}
            highlightRef={highlights.left}
            eyeR={eyeR}
            pupilR={pupilR}
          />
          <Eye
            side="right"
            state={eyeState}
            pupilRef={pupils.right}
            highlightRef={highlights.right}
            eyeR={eyeR}
            pupilR={pupilR}
          />

          {/* Nose  */}
          <path
            d="M55 54 C52 51, 48 54, 55 59 C62 54, 58 51, 55 54"
            fill={WINE_RED}
          />

          {/* Mouth */}
          <Mouth role={role} focused={focused} />

          {/*  blush  */}
          {focused && (
            <>
              <ellipse
                cx={24}
                cy={54}
                rx={7}
                ry={4}
                fill={WINE_LIGHT}
                opacity={0.4}
              />
              <ellipse
                cx={86}
                cy={54}
                rx={7}
                ry={4}
                fill={WINE_LIGHT}
                opacity={0.4}
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
