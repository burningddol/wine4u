"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { useFocusTrap } from "@/libs/hooks/useFocusTrap";

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

  const onClose = useCallback(() => setDialog(null), []);

  const { panelRef, saveTrigger } = useFocusTrap(dialog !== null, onClose);

  const showConfirm = useCallback(
    (
      message: string,
      onConfirm: () => void,
      options?: { title?: string; confirmText?: string; cancelText?: string },
    ) => {
      saveTrigger();
      setDialog({ message, onConfirm, ...options });
    },
    [saveTrigger],
  );

  const showAlert = useCallback(
    (message: string, options?: { title?: string; confirmText?: string }) => {
      saveTrigger();
      setDialog({ message, onConfirm: () => {}, alertOnly: true, ...options });
    },
    [saveTrigger],
  );

  const handleConfirm = useCallback(() => {
    const cb = dialog?.onConfirm;
    onClose();
    cb?.();
  }, [dialog, onClose]);

  return (
    <DialogContext.Provider value={{ showConfirm, showAlert }}>
      <div className="contents" inert={dialog !== null}>
        {children}
      </div>
      {dialog &&
        createPortal(
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-message"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div
              ref={panelRef}
              tabIndex={-1}
              className="w-[320px] rounded-sm bg-white px-8 py-8"
            >
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
          </div>,
          document.body,
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
