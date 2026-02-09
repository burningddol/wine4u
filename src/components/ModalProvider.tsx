"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface ModalData {
  content: ReactNode;
  title: string;
  width: number;
  height: number;
}

interface ModalContextValue {
  showModal: (
    content: ReactNode,
    title: string,
    width: number,
    height: number,
  ) => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalData | null>(null);

  const showModal = useCallback(
    (
      content: ReactNode,
      title: string,
      width: number = 375,
      height: number = 641,
    ) => {
      setModal({ content, title, width, height });
    },
    [],
  );

  const onClose = useCallback(() => {
    setModal(null);
  }, []);

  useEffect(() => {
    if (!modal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, modal]);

  return (
    <ModalContext.Provider value={{ showModal, onClose }}>
      {children}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div
            className="scrollbar-ghost relative max-h-[85vh] overflow-y-auto rounded-sm bg-white py-8 pr-6 pl-7"
            style={{ width: modal.width, height: modal.height }}
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
        </div>
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
