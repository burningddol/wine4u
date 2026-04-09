"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";

interface ConfirmData {
  message: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  alertOnly?: boolean;
}

interface DialogContextValue {
  showConfirm: (
    message: string,
    onConfirm: () => void,
    options?: { title?: string; confirmText?: string; cancelText?: string },
  ) => void;
  showAlert: (
    message: string,
    options?: { title?: string; confirmText?: string },
  ) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<ConfirmData | null>(null);

  const showConfirm = useCallback(
    (
      message: string,
      onConfirm: () => void,
      options?: { title?: string; confirmText?: string; cancelText?: string },
    ) => {
      setDialog({ message, onConfirm, ...options });
    },
    [],
  );

  const showAlert = useCallback(
    (
      message: string,
      options?: { title?: string; confirmText?: string },
    ) => {
      setDialog({ message, onConfirm: () => {}, alertOnly: true, ...options });
    },
    [],
  );

  const onClose = useCallback(() => {
    setDialog(null);
  }, []);

  useEffect(() => {
    if (!dialog) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [dialog, onClose]);

  const handleConfirm = () => {
    const cb = dialog?.onConfirm;
    onClose();
    cb?.();
  };

  return (
    <DialogContext.Provider value={{ showConfirm, showAlert }}>
      {children}
      {dialog && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-message"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="w-[320px] rounded-sm bg-white px-8 py-8">
            <h2 id="dialog-title" className="mb-3 text-xl font-bold">
              {dialog.title ?? "삭제 확인"}
            </h2>
            <p id="dialog-message" className="mb-8 text-sm text-gray-600">
              {dialog.message}
            </p>
            <div className="flex justify-end gap-3">
              {!dialog.alertOnly && (
                <Button variant="outline" size="md" onClick={onClose}>
                  {dialog.cancelText ?? "취소"}
                </Button>
              )}
              <Button
                size="md"
                className={dialog.alertOnly ? "" : "bg-error hover:bg-error/90"}
                onClick={handleConfirm}
              >
                {dialog.confirmText ?? (dialog.alertOnly ? "확인" : "삭제")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

export function useDialog(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
