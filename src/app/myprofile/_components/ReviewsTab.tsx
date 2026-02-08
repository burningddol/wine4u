"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getMyReviews } from "@/app/myprofile/_libs/profileApi";
import type { MyReviewItem } from "@/types/myprofile/types";
import { Button } from "@/components/ui/Button";

function formatDate(value: string): string {
  try {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? value : d.toISOString().slice(0, 10);
  } catch {
    return value;
  }
}

export default function ReviewsTab() {
  const router = useRouter();
  const [reviews, setReviews] = useState<MyReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyReviews();
      setReviews(data.list ?? []);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "리뷰 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">{error}</p>
        <button
          type="button"
          onClick={loadReviews}
          className="bg-primary hover:bg-primary/90 mt-4 rounded-md px-4 py-2 text-white"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">작성한 리뷰가 없습니다.</p>
        <Button
          type="button"
          className="mt-4"
          onClick={() => router.push("/wines")}
        >
          리뷰 작성하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">
      {reviews.map((review, index) => (
        <article
          key={review.id}
          className={`relative flex flex-col gap-12 px-2 ${
            index > 0
              ? 'before:absolute before:-top-10 before:left-0 before:block before:w-full before:border-t before:border-gray-200 before:content-[""]'
              : ""
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-yellow-500">
                      ★ {review.rating}
                    </span>
                    <span className="text-lg font-light text-gray-300">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="hover:text-error text-sm text-gray-600 transition"
                  >
                    삭제
                  </button>
                </div>

                <div className="flex gap-4">
                  <div className="relative h-20 w-[62px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {review.wine?.image ? (
                      <Image
                        src={review.wine.image}
                        alt={review.wine.name ?? ""}
                        fill
                        className="object-cover"
                        unoptimized={review.wine.image.startsWith("http")}
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-3xl">
                        🍷
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2lg font-bold text-black">
                      {review.wine?.name ?? "—"}
                    </h3>
                    <p className="text-md font-normal text-gray-300">
                      {review.wine?.region ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <p className="text-lg leading-relaxed">{review.content}</p>
              </div>
            </div>

            <div className="">와인 테이스팅</div>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="hover:text-primary flex items-center gap-1 text-gray-600 transition"
            >
              <span>👍</span>
              <span className="text-sm">
                {Array.isArray(review.likes) ? review.likes.length : 0}
              </span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
