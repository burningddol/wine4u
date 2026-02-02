'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchWines } from '@/libs/api/wines/getAPIData';
import { Wine, WineListResponse } from '@/types/wines/types';
import useInfiniteScroll from '../_libs/hooks/useInfiniteScroll';
import useDebounce from '../_libs/hooks/useDebounce';
import WineCard from './WineCard';
import WineSearchBar from './WineSearchBar';
import WineFilter from './WineFilter';

import Modal from '@/components/Modal';
import { useDeviceTypeStore } from '@/libs/zustand';
import { cn } from '@/libs/api/utils';

interface Props {
  wines: WineListResponse;
}

export type WineType = 'RED' | 'WHITE' | 'SPARKLING';

export interface FilterValues {
  type?: WineType;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export const INITIAL_FILTER = {
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
};

export default function WineList({ wines }: Props) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const isInitialMount = useRef(true);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [currentFilter, setCurrentFilter] =
    useState<FilterValues>(INITIAL_FILTER);

  const [list, setList] = useState<Wine[]>(wines.list);
  const [cursor, setCursor] = useState<number | null>(wines.nextCursor);
  const [isLoading, setIsLoading] = useState(false);

  const { deviceType } = useDeviceTypeStore();

  const isDesktop = deviceType === 'desktop';

  const loadMore = useCallback(async () => {
    if (isLoading || cursor === null) return;
    setIsLoading(true);
    try {
      const data = await fetchWines({
        limit: 6,
        cursor,
        name: debouncedSearch || undefined,
        ...currentFilter,
      });
      setList((prev) => [...prev, ...data.list]);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error('Failed to load more:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, isLoading, debouncedSearch]);

  const observerRef = useInfiniteScroll(loadMore, cursor !== null);

  const refreshList = (params: FilterValues) => {
    setIsLoading(true);
    try {
      fetchWines({
        limit: 6,
        name: debouncedSearch || undefined,
        ...params,
      }).then((data) => {
        setList(data.list);
        setCursor(data.nextCursor);
      });
    } catch (e) {
      console.log('refresh failed' + e);
    } finally {
      setIsLoading(false);
    }
  };

  //첫 마운트땐 동작하면 안됨
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    refreshList(currentFilter);
  }, [
    debouncedSearch,
    currentFilter.maxPrice,
    currentFilter.minPrice,
    currentFilter.rating,
    currentFilter.type,
  ]);

  return (
    <div
      className={cn(
        'm-auto mt-8 w-full md:mt-32 xl:mt-42',
        isDesktop ? 'flex max-w-[1145px] gap-12' : '',
      )}
    >
      {isDesktop && (
        <div>
          <WineFilter
            onClose={() => setIsOpenFilter(false)}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
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
          openFilter={() => setIsOpenFilter(true)}
        />

        <section className="relative container m-auto w-full py-5 md:max-w-[680px] xl:max-w-[801px]">
          <div className="grid grid-cols-1 items-start justify-items-center gap-5 md:grid-cols-2 xl:gap-16">
            {list.map((wine) => (
              <WineCard key={wine.id} wine={wine} />
            ))}
          </div>

          {cursor !== null && (
            <div ref={observerRef} className="absolute bottom-100 py-30" />
          )}
        </section>
        {isOpenFilter && (
          <Modal
            title="필터"
            width={375}
            height={641}
            onClose={() => setIsOpenFilter(false)}
          >
            <WineFilter
              onClose={() => setIsOpenFilter(false)}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
              isDesktop={isDesktop}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
