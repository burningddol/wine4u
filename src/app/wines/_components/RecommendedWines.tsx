'use client';

import { RecommendedWines } from '@/types/wines/types';
import { useDeviceType } from '../_libs/hooks/useDeviceType';
import { useDeviceTypeStore } from '@/libs/zustand';
import RecommendedCarousel from './RecommendedCarousel';

interface Props {
  recommendedWines: RecommendedWines;
}

export default function RecommendedWineList({ recommendedWines }: Props) {
  useDeviceType();
  const { deviceType } = useDeviceTypeStore();

  return (
    <section className="container m-auto h-[330px] w-full max-w-[1195px] px-4 md:px-13">
      <h2 className="mt-9 ml-6 text-lg font-bold md:mb-10 xl:mt-11">
        이번 달 추천 와인
      </h2>

      <RecommendedCarousel
        recommendedWines={recommendedWines}
        deviceType={deviceType}
      />
    </section>
  );
}
