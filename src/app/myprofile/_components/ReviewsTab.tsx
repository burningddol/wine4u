"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import { getMyReviews, deleteReview } from "@/app/myprofile/_libs/profileApi";
import type { MyReviewItem } from "@/types/myprofile/types";
import type { LoginedUser } from "@/types/auth/types";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ModalProvider";

import { useUser } from "@/components/UserProvider";
import { wineTasteAroma } from "@/utils/wineTasteAroma";
import ReviewEditModal from "./modal/ReviewModal";
import ReviewItem from "./ReviewItem";

export default function ReviewsTab({
  showToast,
}: {
  showToast: (message: string, type: "success" | "error") => void;
}) {
  const { user } = useUser();
  const router = useRouter();

  const [reviews, setReviews] = useState<MyReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showModal } = useModal();

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyReviews();
      setReviews(data.list ?? []);
    } catch (any: any) {
      setError(
        any instanceof Error ? any.message : "리뷰 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const tastes = useMemo(() => {
    if (!user || user === "isPending") return [];

    const me = user as LoginedUser;
    const teamId = me.teamId;

    return reviews.map((r) =>
      wineTasteAroma(r, { user: me, teamId: teamId ?? "" }),
    );
  }, [reviews, user]);

  const handleEdit = useCallback(
    (review: MyReviewItem) => {
      showModal(
        <ReviewEditModal mode="edit" review={review} onSuccess={loadReviews} />,
        "리뷰 수정",
        460,
        700,
      );
    },
    [showModal, loadReviews],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      const ok = window.confirm("리뷰를 삭제하시겠습니까?");
      if (!ok) return;

      try {
        await deleteReview(id);
        setReviews((prev) => prev.filter((r) => r.id !== id));
        showToast("삭제되었습니다", "success");
      } catch {
        showToast("삭제에 실패했습니다", "error");
      }
    },
    [showToast],
  );

  if (user === "isPending") {
    return <div>로딩중...</div>;
  }

  if (!user) {
    return <div>로그인 후 이용...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">{error}</p>
        <Button type="button" className="mt-4" onClick={loadReviews}>
          다시 시도
        </Button>
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
    <>
      <div className="flex flex-col-reverse gap-20 px-8 py-10">
        {reviews.map((review, index) => (
          <ReviewItem
            key={review.id}
            review={review}
            taste={tastes[index]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* <div className="flex flex-col-reverse gap-20 px-8 py-10">
        {reviews.map((review, index) => {
          const taste = tastes[index];

          return (
            <article
              key={review.id}
              className={`relative flex flex-col gap-12 px-2 ${
                index > 0
                  ? 'before:absolute before:-top-10 before:left-0 before:block before:w-full before:border-t before:border-gray-200 before:content-[""] not-first:before:content-none'
                  : ""
              }`}
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          {review.rating}
                        </div>
                        <span className="text-lg font-normal text-gray-300">
                          {timeAgo(review.createdAt)}
                        </span>
                      </div>
                      <div
                        className="absolute top-0 right-0"
                        ref={
                          dropdownRef as unknown as React.RefObject<HTMLDivElement>
                        }
                      >
                        <button
                          type="button"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen((prev) =>
                              prev === review.id ? null : review.id,
                            );
                          }}
                          aria-label="메뉴 열기"
                        >
                          <span className="flex flex-col gap-0.5">
                            <span className="h-1 w-1 rounded-full bg-current" />
                            <span className="h-1 w-1 rounded-full bg-current" />
                            <span className="h-1 w-1 rounded-full bg-current" />
                          </span>
                        </button>

                        {isDropdownOpen === review.id && (
                          <ul
                            className={cn(
                              "absolute top-9 right-0 z-10 flex min-w-[120px] flex-col rounded-sm border border-gray-300 bg-white py-1 shadow-sm",
                              "text-base font-normal text-gray-700",
                            )}
                          >
                            <li>
                              <button
                                type="button"
                                className="w-full cursor-pointer px-4 py-2 text-center hover:bg-gray-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(review);
                                }}
                              >
                                수정하기
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="w-full cursor-pointer px-4 py-2 text-center hover:bg-gray-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(review.id);
                                }}
                              >
                                삭제하기
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>

                    <WineSummary
                      image={review.wine?.image}
                      name={review.wine?.name}
                      region={review.wine?.region}
                    />
                  </div>

                  <p className="text-lg leading-relaxed break-keep">
                    {review.content}
                  </p>
                </div>

                <TasteBarGroup reviews={[taste]} layout="grid" />
              </div>

              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  className="hover:text-primary flex items-center gap-1 text-gray-600 transition"
                >
                  <HeartIcon liked={likeId === review.id} />
                  <span className="text-sm">
                    {Array.isArray(review.likes) ? review.likes.length : 0}
                  </span>
                </Button>
              </div>
            </article>
          );
        })}
      </div> */}
    </>
  );
}
