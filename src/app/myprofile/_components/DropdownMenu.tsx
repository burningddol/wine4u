"use client";

import { useId, useEffect, useState, Ref } from "react";
import useOutsideClick from "@/app/(auth)/_libs/useOutsideClick";
import { cn } from "@/libs/utils";

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function DropdownMenu({
  onEdit,
  onDelete,
  editLabel = "수정하기",
  deleteLabel = "삭제하기",
  className,
  disabled = false,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const close = () => setIsOpen(false);
  const dropdownRef = useOutsideClick(close, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleEdit = () => {
    close();
    onEdit();
  };

  const handleDelete = () => {
    close();
    onDelete();
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label="메뉴 열기"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-gray-400",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="flex flex-col gap-0.5">
          <span className="h-1 w-1 rounded-full bg-current" />
          <span className="h-1 w-1 rounded-full bg-current" />
          <span className="h-1 w-1 rounded-full bg-current" />
        </span>
      </button>

      {isOpen && (
        <ul
          id={menuId}
          ref={dropdownRef as unknown as Ref<HTMLUListElement>}
          role="menu"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute top-9 right-0 z-10 flex min-w-[120px] flex-col",
            "rounded-sm border border-gray-300 bg-white p-1 shadow-sm",
            "text-base font-normal text-gray-700",
          )}
        >
          <li role="none">
            <button
              role="menuitem"
              type="button"
              className="w-full cursor-pointer px-4 py-2 text-center transition-all duration-300 hover:bg-gray-200"
              onClick={handleEdit}
            >
              {editLabel}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              type="button"
              className="w-full cursor-pointer px-4 py-2 text-center transition-all duration-300 hover:bg-gray-200"
              onClick={handleDelete}
            >
              {deleteLabel}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
