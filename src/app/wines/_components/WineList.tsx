'use client';

import { fetchWines } from '@/libs/api/wines/getAPIData';
import { Wine, WineListResponse } from '@/types/wines/types';
import useInfiniteScroll from '../_libs/hooks/useInfiniteScroll';
import WineCard from './WineCard';

interface Props {
  wines: WineListResponse;
}

export default function WineList({ wines }: Props) {
  const { list, hasMore, observerRef } = useInfiniteScroll<Wine>({
    initialList: wines.list,
    initialCursor: wines.nextCursor,
    fetchMore: (cursor) => fetchWines({ limit: 6, cursor }),
  });

  return (
    <>
      {'here'}

      <section className="relative container m-auto mt-40 w-full py-10 md:max-w-[680px] xl:max-w-[801px]">
        <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2 xl:gap-16">
          {list.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        {hasMore && (
          <div ref={observerRef} className="absolute bottom-20 py-30" />
        )}
      </section>
    </>
  );
}
