'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchWines } from '@/libs/api/wines/getAPIData';
import { Wine, WineListResponse } from '@/types/wines/types';
import useInfiniteScroll from '../_libs/hooks/useInfiniteScroll';
import useDebounce from '../_libs/hooks/useDebounce';
import WineCard from './WineCard';
import Image from 'next/image';

interface Props {
  wines: WineListResponse;
}

export default function WineList({ wines }: Props) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const isInitialMount = useRef(true);

  const [list, setList] = useState<Wine[]>(wines.list);
  const [cursor, setCursor] = useState<number | null>(wines.nextCursor);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || cursor === null) return;
    setIsLoading(true);
    try {
      const data = await fetchWines({
        limit: 6,
        cursor,
        name: debouncedSearch || undefined,
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

  //첫 마운트땐 동작하면 안됨
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    fetchWines({ limit: 6, name: debouncedSearch || undefined }).then(
      (data) => {
        setList(data.list);
        setCursor(data.nextCursor);
      },
    );
  }, [debouncedSearch]);

  return (
    <div>
      <div className="container m-auto mt-17 w-full md:mt-42 md:max-w-[680px] xl:mt-53 xl:max-w-[801px]">
        <div className="relative">
          <Image
            src="/wines/input.svg"
            width={20}
            height={20}
            alt="돋보기"
            className="absolute top-3 left-3.5"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="와인을 검색해 보세요"
            className="w-full rounded-2xl border border-gray-300 py-3 pr-4 pl-11 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button className="flex h-10.5 w-10.5 items-center justify-center rounded-lg border border-gray-300 md:h-12 md:w-12">
            <Image src="/wines/filter.svg" width={18} height={18} alt="필터" />
          </button>
          <button className="bg-primary h-10 w-40 rounded-sm px-6 py-2.5 text-sm font-bold text-white md:h-12 md:w-54">
            와인 등록하기
          </button>
        </div>
      </div>

      <section className="relative container m-auto mt-10 w-full py-10 md:max-w-[680px] xl:max-w-[801px]">
        <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2 xl:gap-16">
          {list.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        {cursor !== null && (
          <div ref={observerRef} className="absolute bottom-100 py-30" />
        )}
      </section>
    </div>
  );
}
