"use client";

import { useState, useCallback, ReactNode } from "react";
import CharacterGroup from "./CharacterGroup";
import { useCursorTracking } from "../_libs/useCursorTracking";
import type { FocusTarget } from "./Character";

interface CharacterProps {
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
}

interface AuthLayoutProps {
  children: (props: CharacterProps) => ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { cursor, ref: charGroupRef } = useCursorTracking();
  const [focusTarget, setFocusTarget] = useState<FocusTarget>("none");
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
        {children({
          onFocusChange: handleFocusChange,
          onTypingChange: setIsTyping,
        })}
      </div>
    </div>
  );
}
