'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { cn } from '@/libs/utils';

type ToastType = 'error' | 'success';

interface ToastData {
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 2200;

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const showToast = useCallback(
    (message: string, type: ToastType = 'error') => {
      setToast({ message, type });
      setTimeout(() => setIsClosed(true), TOAST_DURATION - 300);
      setTimeout(() => {
        setToast(null);
        setIsClosed(false);
      }, TOAST_DURATION);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={cn(
            'fixed bottom-30 left-1/2 z-[10000]',
            'rounded-xl px-7 py-[14px]',
            "font-['pretendard'] text-[15px] font-medium text-white",
            'shadow-[0_6px_20px_rgba(0,0,0,0.15)]',
            toast.type === 'error' ? 'bg-[#e74c3c]' : 'bg-[#0d0e0db2]',
            isClosed ? 'animate-slideOut' : 'animate-slideIn',
          )}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
