"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { RecommendedWines } from "@/types/wines/types";
import { DeviceType } from "../_libs/hooks/useDeviceType";
import Image from "next/image";

import "swiper/css";
import "swiper/css/scrollbar";
import { cn } from "@/libs/utils";

interface Props {
  recommendedWines: RecommendedWines;
  deviceType: DeviceType;
}

const SLIDES_PER_VIEW: Record<DeviceType, number> = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
};

export default function RecommendedCarousel({
  recommendedWines,
  deviceType,
}: Props) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const slidesPerView = SLIDES_PER_VIEW[deviceType];
  const isMobile = deviceType === "mobile";

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative mt-5">
      <Swiper
        key={deviceType}
        modules={[Scrollbar]}
        slidesPerView={slidesPerView}
        spaceBetween={isMobile ? 16 : 0}
        scrollbar={isMobile ? { draggable: true } : false}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          handleSlideChange(swiper);
        }}
        onSlideChange={handleSlideChange}
      >
        {recommendedWines.map((wine) => (
          <SwiperSlide key={wine.id}>
            <div className="flex h-full flex-col items-center rounded-md bg-transparent md:h-[320px]">
              <div className="relative h-[165px] w-full md:h-[228px]">
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 150px, 201px"
                />
              </div>
              <p className="text-primary mt-2 line-clamp-2 w-33 text-center text-sm font-semibold break-words md:mt-4">
                {wine.name}
              </p>
              <p className="mt-2 line-clamp-1 text-xs text-gray-600 md:mt-2">
                {wine.region}
              </p>
            </div>
            {isMobile && <div className="h-8" />}
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMobile && (
        <>
          <button
            onClick={() => swiperInstance?.slidePrev()}
            disabled={isBeginning}
            className={cn(
              "shadow-soft absolute top-1/2 -left-10 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white",
              "disabled:cursor-default disabled:opacity-30",
            )}
            aria-label="이전"
          >
            {"<"}
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            disabled={isEnd}
            className={cn(
              "shadow-soft absolute top-1/2 -right-10 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white",
              "disabled:cursor-default disabled:opacity-30",
            )}
            aria-label="다음"
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
}
