import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWines } from "@/libs/api/wines/getAPIData";
import { Wine, WineFilterValues, WineListResponse } from "@/types/wines/types";
import useDebounce from "./useDebounce";
import useInfiniteScroll from "./useInfiniteScroll";
import { useRouter } from "next/navigation";

export const INITIAL_FILTER: WineFilterValues = {
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
};

const WINES_PER_PAGE = 6;

export function useWineList(initialData: WineListResponse) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const isInitialMount = useRef(true);

  const [filter, setFilter] = useState<WineFilterValues>(INITIAL_FILTER);
  const [list, setList] = useState<Wine[]>(initialData.list);
  const [cursor, setCursor] = useState<number | null>(initialData.nextCursor);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const router = useRouter();

  const hasMore = cursor !== null;

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const data = await fetchWines({
        limit: WINES_PER_PAGE,
        cursor: cursor ?? undefined,
        name: debouncedSearch || undefined,
        ...filter,
      });
      setList((prev) => [...prev, ...data.list]);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error("Failed to load more:", error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [cursor, debouncedSearch, filter, hasMore]);

  const observerRef = useInfiniteScroll(loadMore, hasMore);

  const refetch = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const data = await fetchWines({
        limit: WINES_PER_PAGE,
        name: debouncedSearch || undefined,
        ...filter,
      });
      setList(data.list);
      setCursor(data.nextCursor);
      router.refresh();
    } catch (e) {
      console.error("Failed to refetch wine list:", e);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [debouncedSearch, filter]);

  // 검색어/필터 변경 시 목록 새로고침 (첫 마운트 제외)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetchWines({
      limit: WINES_PER_PAGE,
      name: debouncedSearch || undefined,
      ...filter,
    })
      .then((data) => {
        if (cancelled) return;
        setList(data.list);
        setCursor(data.nextCursor);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error("Failed to refresh wine list:", e);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    debouncedSearch,
    filter.type,
    filter.minPrice,
    filter.maxPrice,
    filter.rating,
  ]);

  return {
    list,
    isLoading,
    search,
    setSearch,
    filter,
    setFilter,
    hasMore,
    observerRef,
    refetch,
  };
}
