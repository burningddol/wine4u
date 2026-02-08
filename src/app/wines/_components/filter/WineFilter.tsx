"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { WineFilterValues } from "@/types/wines/types";
import { INITIAL_FILTER } from "../../_libs/hooks/useWineList";
import { cn } from "@/libs/utils";
import PriceRangeSlider, { MAX_PRICE, MIN_PRICE } from "./PriceRangeSlider";
import { useModal } from "@/components/ModalProvider";
import TypeFilter from "./TypeFilter";
import RatingFilter from "./RatingFilter";

interface Props {
  currentFilter: WineFilterValues;
  setCurrentFilter: Dispatch<SetStateAction<WineFilterValues>>;
  isDesktop: boolean;
}

export default function WineFilter({
  currentFilter,
  setCurrentFilter,
  isDesktop,
}: Props) {
  const [tempFilter, setTempFilter] = useState<WineFilterValues>(currentFilter);
  const { onClose } = useModal();

  // 데스크탑이면 바로 적용, 모바일 필터모달이면 버튼 클릭 시 적용
  const updateFilter = (update: Partial<WineFilterValues>) => {
    setTempFilter((prev) => ({ ...prev, ...update }));
    if (isDesktop) {
      setCurrentFilter((prev) => ({ ...prev, ...update }));
    }
  };

  const handleReset = () => {
    setCurrentFilter(INITIAL_FILTER);
    setTempFilter(INITIAL_FILTER);
    onClose();
  };

  const handleApply = () => {
    setCurrentFilter(tempFilter);
    onClose();
  };

  return (
    <div className={cn("flex flex-col", isDesktop ? "w-75" : "w-full")}>
      <TypeFilter
        selected={tempFilter.type}
        onSelect={(type) =>
          updateFilter({ type: tempFilter.type === type ? undefined : type })
        }
        isDesktop={isDesktop}
      />

      <hr className="my-6 border-gray-200" />

      <PriceRangeSlider
        minValue={tempFilter.minPrice ?? MIN_PRICE}
        maxValue={tempFilter.maxPrice ?? MAX_PRICE}
        onChange={(minPrice, maxPrice) => updateFilter({ minPrice, maxPrice })}
      />

      <hr className="my-6 border-gray-200" />

      <RatingFilter
        selected={tempFilter.rating}
        onSelect={(rating) => updateFilter({ rating })}
      />

      {!isDesktop && (
        <div className="mt-10 flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 cursor-pointer rounded-sm border border-gray-300 py-3.5 text-base font-bold text-gray-800"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="flex-[2] cursor-pointer rounded-sm bg-black py-3.5 text-base font-bold text-white"
          >
            필터 적용하기
          </button>
        </div>
      )}
    </div>
  );
}
