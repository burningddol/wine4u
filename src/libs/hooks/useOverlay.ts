import { useCallback, useState, RefObject } from "react";
import { useFocusTrap } from "./useFocusTrap";

interface UseOverlayResult<T> {
  state: T | null;
  open: (value: T) => void;
  close: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
}

export function useOverlay<T>(): UseOverlayResult<T> {
  const [state, setState] = useState<T | null>(null);

  const close = useCallback(() => setState(null), []);

  const { panelRef, saveTrigger } = useFocusTrap(state !== null, close);

  const open = useCallback(
    (value: T) => {
      saveTrigger();
      setState(value);
    },
    [saveTrigger],
  );

  return { state, open, close, panelRef };
}
