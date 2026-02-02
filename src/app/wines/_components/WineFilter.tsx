'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { WineFilterValues, WineType } from '@/types/wines/types';
import { INITIAL_FILTER } from '../_libs/hooks/useWineList';
import { cn } from '@/libs/api/utils';
import PriceRangeSlider from './PriceRangeSlider';

interface Props {
  currentFilter: WineFilterValues;
  setCurrentFilter: Dispatch<SetStateAction<WineFilterValues>>;
  onClose: () => void;
  isDesktop: boolean;
}

const WINE_TYPES: { label: string; value: WineType }[] = [
  { label: 'Red', value: 'RED' },
  { label: 'White', value: 'WHITE' },
  { label: 'Sparkling', value: 'SPARKLING' },
];

const RATING_OPTIONS: { label: string; value: number | undefined }[] = [
  { label: '전체', value: undefined },
  { label: '4.5 - 5.0', value: 5 },
  { label: '4.0 - 4.5', value: 4.5 },
  { label: '3.5 - 4.0', value: 4 },
  { label: '3.0 - 3.5', value: 3.5 },
];

export default function WineFilter({
  onClose,
  currentFilter,
  setCurrentFilter,
  isDesktop,
}: Props) {
  const [tempFilter, setTempFilter] = useState<WineFilterValues>(currentFilter);

  const handleReset = () => {
    setCurrentFilter(INITIAL_FILTER);
    setTempFilter(INITIAL_FILTER);
    onClose();
  };

  const handleApply = () => {
    setCurrentFilter(tempFilter);
    onClose();
  };

  // 데스크탑이면 바로 적용, 모바일 필터모달이면 버튼 클릭 시 적용
  const handleType = (value: WineType) => {
    setTempFilter((prev) => ({
      ...prev,
      type: prev.type === value ? undefined : value,
    }));
    if (isDesktop) {
      setCurrentFilter((prev) => ({
        ...prev,
        type: prev.type === value ? undefined : value,
      }));
    }
  };

  const handleRating = (isChecked: boolean, value: number | undefined) => {
    const nextRating = isChecked ? undefined : value;
    setTempFilter((prev) => ({ ...prev, rating: nextRating }));
    if (isDesktop) {
      setCurrentFilter((prev) => ({ ...prev, rating: nextRating }));
    }
  };

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setTempFilter((prev) => ({ ...prev, minPrice, maxPrice }));
    if (isDesktop) {
      setCurrentFilter((prev) => ({ ...prev, minPrice, maxPrice }));
    }
  };

  return (
    <div className="flex w-75 flex-col">
      <section>
        <h3 className="mb-3 text-lg font-bold">타입</h3>
        <div className={cn('flex gap-2', isDesktop && 'flex-col')}>
          {WINE_TYPES.map(({ label, value }) => {
            const isPressed = value === tempFilter.type;
            return (
              <button
                key={value}
                aria-pressed={isPressed}
                onClick={() => handleType(value)}
                className={cn(
                  'inline-flex w-fit cursor-pointer items-center gap-1.5 self-start rounded-full border px-4 py-2 text-sm whitespace-nowrap',
                  isPressed ? 'bg-black text-white' : 'bg-white',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      <PriceRangeSlider
        minValue={tempFilter.minPrice ?? 0}
        maxValue={tempFilter.maxPrice ?? 100_000}
        onChange={handlePriceChange}
      />

      <hr className="my-6 border-gray-200" />
      <section>
        <h3 className="mb-3 text-lg font-bold">평점</h3>
        <div className="flex flex-col gap-3">
          {RATING_OPTIONS.map(({ label, value }) => {
            const isChecked = tempFilter.rating === value;
            return (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-3"
              >
                <button
                  onClick={() => handleRating(isChecked, value)}
                  className={cn(
                    'flex h-5 w-5 cursor-pointer items-center justify-center rounded border',
                    isChecked
                      ? 'border-black bg-white'
                      : 'border-gray-300 bg-white',
                  )}
                >
                  {isChecked && (
                    <span className="h-3 w-3 rounded-xs bg-black" />
                  )}
                </button>
                <span className="text-base text-gray-800">{label}</span>
              </label>
            );
          })}
        </div>
      </section>

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
