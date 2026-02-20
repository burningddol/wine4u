import { useParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { getWineReviews } from "@/libs/api/wineDetail/getAPIData";
import useInfiniteScroll from "./useInfiniteScroll";

export function useReviewList(
  initialReviews: any[],
  initialCursor: number | null,
) {
  const { id } = useParams();
  const [list, setList] = useState(initialReviews);
  const [cursor, setCursor] = useState(initialCursor);

  // 부모(WinesPage)에서 reviews가 갱신되면 훅 내부 리스트도 동기화 (리뷰 등록 시 필요)
  useEffect(() => {
    setList(initialReviews);
    setCursor(initialCursor);
  }, [initialReviews, initialCursor]);

  const loadMore = useCallback(async () => {
    if (!cursor) return;
    const data = await getWineReviews(Number(id), cursor);
    setList((prev) => [...prev, ...data.reviews]);
    setCursor(data.nextCursor);
  }, [id, cursor]);

  const observerRef = useInfiniteScroll(loadMore, cursor !== null);

  return { list, hasMore: cursor !== null, observerRef };
}
