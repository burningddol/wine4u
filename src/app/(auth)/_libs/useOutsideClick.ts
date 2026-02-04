import { useEffect, useRef } from 'react';

export default function useOutsideClick(onClose: () => void, isOpen: boolean) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return ref;
}
