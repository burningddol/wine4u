'use client';

import { useState, useCallback } from 'react';
import CharacterGroup from '../_components/CharacterGroup';
import { useCursorTracking } from '../_libs/useCursorTracking';
import type { FocusTarget } from '../_components/Character';
import SignUpForm from '../_components/SignUpForm';
import LoginForm from '../_components/LoginForm';

export default function LoginPage() {
  const { cursor, ref: charGroupRef } = useCursorTracking();
  const [focusTarget, setFocusTarget] = useState<FocusTarget>('none');
  const [isTyping, setIsTyping] = useState(false);

  const handleFocusChange = useCallback((target: FocusTarget) => {
    setFocusTarget(target);
  }, []);

  return (
    <div className="relative m-auto flex h-full w-full items-center justify-center px-2">
      <div className="absolute inset-0 z-[-1] bg-[#f2f2f2]" />
      <div
        ref={charGroupRef}
        className="relative bottom-20 hidden md:right-10 md:bottom-10 md:block md:w-105 md:scale-[0.75] xl:w-auto xl:scale-[1]"
      >
        <CharacterGroup
          cursorX={cursor.x}
          cursorY={cursor.y}
          focusTarget={focusTarget}
          isTyping={isTyping}
        />
      </div>
      <div className="shadow-soft flex h-[689px] w-[343px] items-center justify-center rounded-md bg-white px-10 md:h-[843px] md:w-[496px]">
        <LoginForm
          onFocusChange={handleFocusChange}
          onTypingChange={setIsTyping}
        />
      </div>
    </div>
  );
}
