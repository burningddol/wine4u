import { useState, useCallback, useMemo } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWines } from "@/libs/api/wines/getAPIData";
import { WineFilterValues, WineListResponse } from "@/types/wines/types";
import useDebounce from "./useDebounce";
import useInfiniteScroll from "./useInfiniteScroll";

export const WINES_QUERY_KEY = "wines" as const;

export const INITIAL_FILTER: WineFilterValues = {
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
};

const WINES_PER_PAGE = 6;

function isDefaultFilter(filter: WineFilterValues, search: string): boolean {
  return (
    search === "" &&
    filter.type === INITIAL_FILTER.type &&
    filter.minPrice === INITIAL_FILTER.minPrice &&
    filter.maxPrice === INITIAL_FILTER.maxPrice &&
    filter.rating === INITIAL_FILTER.rating
  );
}

export function useWineList(initialData: WineListResponse) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [filter, setFilter] = useState<WineFilterValues>(INITIAL_FILTER);
  const queryClient = useQueryClient();

  // SSR 데이터의 freshness 기준 시점 (마운트 시 1회만 계산)
  const mountTime = useMemo(() => Date.now(), []);

  const queryKey = [WINES_QUERY_KEY, { search: debouncedSearch, ...filter }] as const;
  const usingInitialData = isDefaultFilter(filter, debouncedSearch);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchWines({
        limit: WINES_PER_PAGE,
        cursor: pageParam as number | undefined,
        name: debouncedSearch || undefined,
        ...filter,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: usingInitialData
      ? { pages: [initialData], pageParams: [undefined] }
      : undefined,
    initialDataUpdatedAt: usingInitialData ? mountTime : undefined,
  });

  const list = useMemo(
    () => data?.pages.flatMap((page) => page.list) ?? [],
    [data],
  );

  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) fetchNextPage();
  }, [fetchNextPage, isFetching, hasNextPage]);

  const observerRef = useInfiniteScroll(loadMore, hasNextPage);

  const refetch = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [WINES_QUERY_KEY] });
  }, [queryClient]);

  return {
    list,
    search,
    setSearch,
    filter,
    setFilter,
    hasMore: hasNextPage,
    observerRef,
    refetch,
  };
}
