'use client';

import { useState } from 'react';
import { WineListResponse } from '@/types/wines/types';
import { useDeviceTypeStore } from '@/libs/zustand';
import { cn } from '@/libs/api/utils';
import { useWineList } from '../_libs/hooks/useWineList';
import Modal from '@/components/Modal';
import WineCard from './WineCard';
import WineSearchBar from './WineSearchBar';
import WineFilter from './WineFilter';

interface Props {
  wines: WineListResponse;
}

export default function WineList({ wines }: Props) {
  const { list, search, setSearch, filter, setFilter, hasMore, observerRef } =
    useWineList(wines);
  const { deviceType } = useDeviceTypeStore();
  const isDesktop = deviceType === 'desktop';
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div
      className={cn(
        'm-auto mt-8 w-full gap-30 md:mt-32 xl:mt-42',
        isDesktop && 'flex max-w-[1145px] gap-30',
      )}
    >
      {isDesktop && (
        <div>
          <WineFilter
            onClose={() => setIsFilterOpen(false)}
            currentFilter={filter}
            setCurrentFilter={setFilter}
            isDesktop={isDesktop}
          />
          <button className="mt-5 w-full cursor-pointer rounded-sm bg-black py-3.5 text-sm font-bold text-white">
            와인 등록하기
          </button>
        </div>
      )}

      <div>
        <WineSearchBar
          value={search}
          onChange={setSearch}
          openFilter={() => setIsFilterOpen(true)}
        />

        <section className="relative container m-auto w-full py-5 md:max-w-[680px] xl:max-w-[801px]">
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:gap-16">
            {list.map((wine) => (
              <WineCard key={wine.id} wine={wine} />
            ))}
          </div>

          {hasMore && (
            <div ref={observerRef} className="absolute bottom-100 py-30" />
          )}
        </section>

        {isFilterOpen && (
          <Modal
            title="필터"
            width={375}
            height={641}
            onClose={() => setIsFilterOpen(false)}
          >
            <WineFilter
              onClose={() => setIsFilterOpen(false)}
              currentFilter={filter}
              setCurrentFilter={setFilter}
              isDesktop={isDesktop}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
