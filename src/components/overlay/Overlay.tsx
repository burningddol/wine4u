"use client";
import { ReactNode, RefObject, MouseEvent } from "react";
import { createPortal } from "react-dom";

type OverlayRole = "dialog" | "alertdialog";

interface OverlayProps {
  role: OverlayRole;
  labelledBy: string;
  describedBy?: string;
  panelRef: RefObject<HTMLDivElement | null>;
  panelClassName: string;
  zIndexClass?: string;
  onClose: () => void;
  children: ReactNode;
}

export function Overlay({
  role,
  labelledBy,
  describedBy,
  panelRef,
  panelClassName,
  zIndexClass = "z-50",
  onClose,
  children,
}: OverlayProps): ReactNode {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      role={role}
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`fixed inset-0 ${zIndexClass} flex items-center justify-center bg-black/50`}
      onClick={handleBackdropClick}
    >
      <div ref={panelRef} tabIndex={-1} className={panelClassName}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
