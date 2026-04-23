"use client";
import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Overlay } from "@/components/overlay/Overlay";
import { useOverlay } from "@/libs/hooks/useOverlay";

interface ModalData {
  content: ReactNode;
  title: string;
}

interface ModalContextValue {
  showModal: (content: ReactNode, title: string) => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps): ReactNode {
  const { state: modal, open, close, panelRef } = useOverlay<ModalData>();

  const showModal = useCallback(
    (content: ReactNode, title: string) => open({ content, title }),
    [open],
  );

  const value = useMemo<ModalContextValue>(
    () => ({ showModal, onClose: close }),
    [showModal, close],
  );

  return (
    <ModalContext.Provider value={value}>
      <div className="contents" inert={modal !== null}>
        {children}
      </div>
      {modal && (
        <Overlay
          role="dialog"
          labelledBy="modal-title"
          panelRef={panelRef}
          panelClassName="scrollbar-ghost relative w-full max-w-[550px] max-h-[85vh] overflow-y-auto rounded-sm bg-white py-8 pr-6 pl-7"
          onClose={close}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 id="modal-title" className="text-xl font-bold">
              {modal.title}
            </h2>
            <button
              onClick={close}
              aria-label="닫기"
              className="cursor-pointer text-2xl text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
          {modal.content}
        </Overlay>
      )}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
