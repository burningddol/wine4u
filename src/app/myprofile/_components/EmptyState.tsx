"use client";

import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export default function EmptyState({
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-12 text-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <img
          src="/icons/exclamation_mark.svg"
          className="h-20 w-20 md:h-34 md:w-34"
        />
        <p className="text-2lg font-bold md:text-2xl">{message}</p>
      </div>
      {actionLabel && onAction && (
        <Button type="button" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
