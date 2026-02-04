import Character from './Character';
import type { CharacterRole, FocusTarget } from './Character';

interface CharacterGroupProps {
  cursorX: number;
  cursorY: number;
  focusTarget: FocusTarget;
  isTyping: boolean;
}

interface CharacterConfig {
  role: CharacterRole;
  scale: number;
  heightRatio: number;
  left: number;
  zIndex: number;
}

const CHARACTERS: CharacterConfig[] = [
  {
    role: 'shy',
    scale: 1.7,
    heightRatio: 1.7,
    left: 200,
    zIndex: 2,
  },
  {
    role: 'main',
    scale: 2.4,
    heightRatio: 1.7,
    left: 0,
    zIndex: 1,
  },
  {
    role: 'idle',
    scale: 1.7,
    heightRatio: 1,
    left: 30,
    zIndex: 3,
  },
  {
    role: 'peeker',
    scale: 1.45,
    heightRatio: 1,
    left: 270,
    zIndex: 4,
  },
];

export default function CharacterGroup({
  cursorX,
  cursorY,
  focusTarget,
  isTyping,
}: CharacterGroupProps) {
  return (
    <div className="relative w-[540px] h-[570px]">
      <div
        className="absolute bottom-0 left-0 right-0 h-[14px] rounded-[50%] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at center, #b0b0b0 0%, transparent 70%)',
        }}
      />

      {CHARACTERS.map(({ role, scale, heightRatio, left, zIndex }) => (
        <div key={role} className="absolute bottom-0" style={{ left, zIndex }}>
          <Character
            cursorX={cursorX}
            cursorY={cursorY}
            focusTarget={focusTarget}
            isTyping={isTyping}
            role={role}
            scale={scale}
            heightRatio={heightRatio}
          />
        </div>
      ))}
    </div>
  );
}
