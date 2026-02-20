"use client";
import Image from "next/image";
import { useState, ReactNode } from "react";

interface DropDownProps {
  children: ReactNode;
}

export default function dropDown({ children }: DropDownProps) {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`w-full overflow-hidden transition-all duration-500 ${
          isOpen
            ? "visibility-visible mb-8 max-h-[500px] opacity-100"
            : "visibility-hidden max-h-0 opacity-60"
        }`}
      >
        {children}
      </div>

      <button
        onClick={() => SetIsOpen(!isOpen)}
        className="flex w-full justify-center py-2"
      >
        <div
          className={`relative h-8 w-8 cursor-pointer transition-transform duration-500 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <Image src="/icons/arrow.svg" alt="열기" width={32} height={32} />
        </div>
      </button>
    </div>
  );
}
