"use client";

import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { useId } from "react";
import { cn } from "@/libs/utils";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "className"
> {
  ref?: Ref<HTMLInputElement>;
  label?: string;
  /** 에러 메시지 (유효성 검사 실패 시) */
  error?: string;
  /** 인풋 안 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 인풋 안 오른쪽 아이콘 (예: 눈 아이콘, 검색 아이콘) */
  rightIcon?: ReactNode;
  size?: InputSize;
  className?: string;
}

const sizeClass: Record<InputSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "px-4 text-lg font-normal",
  lg: "h-11 px-4 text-base",
};

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  size = "md",
  className,
  id: idProp,
  name,
  value,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = idProp ?? name ?? generatedId;
  const describedById = error ? `${inputId}-error` : undefined;

  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  // 제어 컴포넌트로 일관 유지: value가 undefined여도 빈 문자열로 넘겨 uncontrolled → controlled 전환 경고 방지
  const safeValue = value !== undefined && value !== null ? String(value) : "";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-800">
          {label}
        </label>
      )}

      <div className="relative">
        {hasLeftIcon && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={describedById}
          value={safeValue}
          className={cn(
            "w-full rounded-sm border border-gray-200 bg-white transition-colors ease-in placeholder:text-gray-300",
            "focus-visible:border-primary focus-visible:ring-1",
            sizeClass[size],
            hasLeftIcon && "pl-9",
            hasRightIcon && "pr-9",
            error && "border-error",
            className,
          )}
          {...props}
        />
        {hasRightIcon && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && (
        <p id={describedById} className="text-error text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
