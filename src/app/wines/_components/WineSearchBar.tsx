"use client";

import Image from "next/image";
import { useDeviceTypeStore } from "@/libs/zustand";

interface Props {
  value: string;
  onChange: (value: string) => void;
  openFilter: () => void;
  openRegisterModal: () => void;
}

export default function WineSearchBar({
  value,
  onChange,
  openFilter,
  openRegisterModal,
}: Props) {
  const { deviceType } = useDeviceTypeStore();
  const isNotDesktop = deviceType !== "desktop";

  return (
    <div className="m-auto w-full px-2 md:max-w-[680px] md:px-0 xl:max-w-[801px]">
      <div className="relative">
        <Image
          src="/wines/input.svg"
          width={20}
          height={20}
          alt=""
          className="absolute top-3.5 left-3.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="와인을 검색해 보세요"
          className="text-md w-full rounded-sm border border-gray-300 py-3 pr-4 pl-11 outline-none focus:ring-0"
        />
      </div>
      {isNotDesktop && (
        <div className="mt-8 flex items-center justify-between md:mt-10">
          <button
            onClick={openFilter}
            aria-label="필터 열기"
            className="flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-lg border border-gray-300 md:h-12 md:w-12"
          >
            <Image src="/wines/filter.svg" width={18} height={18} alt="" />
          </button>
          <button
            onClick={openRegisterModal}
            className="bg-primary h-11 w-40 cursor-pointer rounded-sm px-6 py-2.5 text-[15px] font-bold text-white md:h-12 md:w-54 md:text-base"
          >
            와인 등록하기
          </button>
        </div>
      )}
    </div>
  );
}
