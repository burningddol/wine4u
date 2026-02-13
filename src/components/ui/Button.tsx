"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/libs/utils";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

const base =
  "flex gap-3 cursor-pointer items-center justify-center rounded-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-gray-200 text-gray-800 hover:bg-gray-50",
};

const sizeClass: Record<ButtonSize, string> = {
  xs: "px-3 py-0.5",
  sm: "px-5 py-2.5 text-sm",
  md: "px-6.5 py-3 text-lg font-bold",
  lg: "px-8 py-3.5 text-lg font-bold",
};

export function Button({
  variant = "primary",
  size = "sm",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
