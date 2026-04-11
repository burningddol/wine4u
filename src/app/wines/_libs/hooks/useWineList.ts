import { useState, useCallback, useMemo } from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchWines } from "@/libs/api/wines/getAPIData";
import { WineFilterValues } from "@/types/wines/types";
import useDebounce from "./useDebounce";
import useInfiniteScroll from "./useInfiniteScroll";
import {
  WINES_QUERY_KEY,
  INITIAL_FILTER,
  WINES_PER_PAGE,
} from "../winesQueryOptions";

export function useWineList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [filter, setFilter] = useState<WineFilterValues>(INITIAL_FILTER);
  const queryClient = useQueryClient();

  const queryKey = [
    WINES_QUERY_KEY,
    { search: debouncedSearch, ...filter },
  ] as const;

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
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
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
