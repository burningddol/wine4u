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
      {isOpen && <div className="w-full">{children}</div>}
      <button onClick={() => SetIsOpen(!isOpen)}>
        <div className="relative h-5 w-5">
          <Image src="/icons/arrow.svg" alt="열기" fill></Image>
        </div>
      </button>
    </div>
  );
}
