import { useCallback, useEffect, useRef, RefObject } from "react";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let scrollLockCount = 0;
let savedBodyOverflow = "";

function lockBodyScroll(): void {
  if (scrollLockCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  scrollLockCount += 1;
}

function unlockBodyScroll(): void {
  scrollLockCount -= 1;
  if (scrollLockCount === 0) {
    document.body.style.overflow = savedBodyOverflow;
  }
}

interface UseFocusTrapResult {
  panelRef: RefObject<HTMLDivElement | null>;
  saveTrigger: () => void;
}

export function useFocusTrap(isOpen: boolean, onClose: () => void): UseFocusTrapResult {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const saveTrigger = useCallback(() => {
    triggerRef.current = document.activeElement;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    lockBodyScroll();

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
    (focusable?.[0] ?? panelRef.current)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
      (triggerRef.current as HTMLElement | null)?.focus();
    };
  }, [isOpen, onClose]);

  return { panelRef, saveTrigger };
}
