'use client';

import { useEffect } from 'react';

interface ModalProps {
  title: string;
  width?: number;
  height?: number;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  title,
  width,
  height,
  onClose,
  children,
}: ModalProps) {
  //모달뜬 동안 스크롤 잠금 & esc로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="scrollbar-ghost relative max-h-[85vh] overflow-y-auto rounded-sm bg-white py-8 pr-6 pl-7"
        style={{ width, height }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-2xl text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
