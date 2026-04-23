"use client";
import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";
import { Overlay } from "@/components/overlay/Overlay";
import { useOverlay } from "@/libs/hooks/useOverlay";

interface ConfirmOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

interface AlertOptions {
  title?: string;
  confirmText?: string;
}

type DialogData =
  | ({
      kind: "confirm";
      message: string;
      onConfirm: () => void;
    } & ConfirmOptions)
  | ({
      kind: "alert";
      message: string;
    } & AlertOptions);

interface DialogContextValue {
  showConfirm: (
    message: string,
    onConfirm: () => void,
    options?: ConfirmOptions,
  ) => void;
  showAlert: (message: string, options?: AlertOptions) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps): ReactNode {
  const { state: dialog, open, close, panelRef } = useOverlay<DialogData>();

  const showConfirm = useCallback(
    (message: string, onConfirm: () => void, options?: ConfirmOptions) => {
      open({ kind: "confirm", message, onConfirm, ...options });
    },
    [open],
  );

  const showAlert = useCallback(
    (message: string, options?: AlertOptions) => {
      open({ kind: "alert", message, ...options });
    },
    [open],
  );

  const handleConfirm = useCallback(() => {
    const cb = dialog?.kind === "confirm" ? dialog.onConfirm : undefined;
    close();
    cb?.();
  }, [dialog, close]);

  const value = useMemo<DialogContextValue>(
    () => ({ showConfirm, showAlert }),
    [showConfirm, showAlert],
  );

  return (
    <DialogContext.Provider value={value}>
      <div className="contents" inert={dialog !== null}>
        {children}
      </div>
      {dialog && (
        <Overlay
          role="alertdialog"
          labelledBy="dialog-title"
          describedBy="dialog-message"
          panelRef={panelRef}
          panelClassName="w-[320px] rounded-sm bg-white px-8 py-8"
          zIndexClass="z-[60]"
          onClose={close}
        >
          <DialogBody dialog={dialog} onCancel={close} onConfirm={handleConfirm} />
        </Overlay>
      )}
    </DialogContext.Provider>
  );
}

interface DialogBodyProps {
  dialog: DialogData;
  onCancel: () => void;
  onConfirm: () => void;
}

function DialogBody({ dialog, onCancel, onConfirm }: DialogBodyProps): ReactNode {
  const isConfirm = dialog.kind === "confirm";
  const defaultTitle = isConfirm ? "삭제 확인" : "알림";
  const defaultConfirmText = isConfirm ? "삭제" : "확인";
  const confirmClassName = isConfirm ? "bg-error hover:bg-error/90" : "";

  return (
    <>
      <h2 id="dialog-title" className="mb-3 text-xl font-bold">
        {dialog.title ?? defaultTitle}
      </h2>
      <p id="dialog-message" className="mb-8 text-sm text-gray-600">
        {dialog.message}
      </p>
      <div className="flex justify-end gap-3">
        {isConfirm && (
          <Button variant="outline" size="md" onClick={onCancel}>
            {dialog.cancelText ?? "취소"}
          </Button>
        )}
        <Button size="md" className={confirmClassName} onClick={onConfirm}>
          {dialog.confirmText ?? defaultConfirmText}
        </Button>
      </div>
    </>
  );
}

export function useDialog(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
