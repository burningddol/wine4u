import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInfiniteScrollParams<T> {
  initialList: T[];
  initialCursor: number | null;
  fetchMore: (cursor: number) => Promise<{ list: T[]; nextCursor: number | null }>;
}

export default function useInfiniteScroll<T>({
  initialList,
  initialCursor,
  fetchMore,
}: UseInfiniteScrollParams<T>) {
  const [list, setList] = useState<T[]>(initialList);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchMoreRef = useRef(fetchMore);
  fetchMoreRef.current = fetchMore;

  const loadMore = useCallback(async () => {
    if (isLoading || cursor === null) return;
    setIsLoading(true);
    try {
      const data = await fetchMoreRef.current(cursor);
      setList((prev) => [...prev, ...data.list]);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error('Failed to load more:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, isLoading]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore]);

  return { list, isLoading, hasMore: cursor !== null, observerRef };
}
