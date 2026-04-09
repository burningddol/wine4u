import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createServerQueryClient } from "@/libs/query/serverQueryClient";
import { fetchRecommendedWines, fetchWines } from "@/libs/api/wines/getAPIData";
import {
  WINES_QUERY_KEY,
  INITIAL_FILTER,
  WINES_PER_PAGE,
} from "./_libs/winesQueryOptions";
import type { WineListResponse } from "@/types/wines/types";
import RecommendedWineList from "./_components/recommend/RecommendedWines";
import WineList from "./_components/WineList";

export const revalidate = 60;

export default async function WinesPage() {
  const queryClient = createServerQueryClient();

  const [recommendedWines] = await Promise.all([
    fetchRecommendedWines(10),
    queryClient.prefetchInfiniteQuery({
      queryKey: [WINES_QUERY_KEY, { search: "", ...INITIAL_FILTER }],
      queryFn: ({ pageParam }) =>
        fetchWines({
          limit: WINES_PER_PAGE,
          cursor: pageParam as number | undefined,
        }),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage: WineListResponse) => lastPage.nextCursor ?? undefined,
    }),
  ]);

  return (
    <>
      <div className="bg-winesHero absolute top-0 z-[-1] h-[439px] w-full bg-cover bg-center md:h-[554px] xl:h-[560px] xl:rounded-b-[88px]" />
      <RecommendedWineList recommendedWines={recommendedWines} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WineList />
      </HydrationBoundary>
    </>
  );
}
