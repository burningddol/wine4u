"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/libs/hooks/useFocusTrap";

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

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalData | null>(null);

  const onClose = useCallback(() => setModal(null), []);

  const { panelRef, saveTrigger } = useFocusTrap(modal !== null, onClose);

  const showModal = useCallback(
    (content: ReactNode, title: string) => {
      saveTrigger();
      setModal({ content, title });
    },
    [saveTrigger],
  );

  return (
    <ModalContext.Provider value={{ showModal, onClose }}>
      <div className="contents" inert={modal !== null}>
        {children}
      </div>
      {modal &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div
              ref={panelRef}
              tabIndex={-1}
              className="scrollbar-ghost relative w-full max-w-[550px] max-h-[85vh] overflow-y-auto rounded-sm bg-white py-8 pr-6 pl-7"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 id="modal-title" className="text-xl font-bold">
                  {modal.title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="닫기"
                  className="cursor-pointer text-2xl text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </div>
              {modal.content}
            </div>
          </div>,
          document.body,
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
