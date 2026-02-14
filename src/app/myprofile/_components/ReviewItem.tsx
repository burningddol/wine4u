"use client";

import { useState, useCallback, useEffect } from "react";
import useOutsideClick from "@/app/(auth)/_libs/useOutsideClick";
import { cn } from "@/libs/utils";
import { useUser } from "@/components/UserProvider";

import { MyReviewItem } from "@/types/myprofile/types";
import { WineTasteAroma } from "@/types/detail/types";
import StarRating from "@/components/StarRating";
import { timeAgo } from "@/utils/timeAgo";
import { likeReview, unlikeReview } from "@/app/myprofile/_libs/profileApi";

import TasteBarGroup from "@/app/wines/[id]/_components/TasteBarGroup";
import WineSummary from "./WineSummary";
import { Button } from "@/components/ui/Button";
import HeartIcon from "@/components/icons/HeartIcon";

interface ReviewItemProps {
  review: MyReviewItem;
  taste: WineTasteAroma;
  onEdit: (review: MyReviewItem) => void;
  onDelete: (id: number) => void;
  onLikeSuccess?: (reviewId: number, liked: boolean) => void;
}

export default function ReviewItem({
  review,
  taste,
  onEdit,
  onDelete,
  onLikeSuccess,
}: ReviewItemProps) {
  const { user } = useUser();
  const teamId = (user as any)?.teamId as string;

  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  const closeDropdown = useCallback(() => setIsDropdownOpen(null), []);
  const dropdownRef = useOutsideClick(closeDropdown, isDropdownOpen !== null);

  useEffect(() => {
    const currentLikeCount = Array.isArray(review.likes)
      ? review.likes.length
      : 0;
    setLikeCount(currentLikeCount);

    if (user === "isPending" || !user) {
      setLiked(false);
      return;
    }

    const likedByMe = Array.isArray(review.likes)
      ? review.likes.some((like) => like.user.id === user.id)
      : false;

    setLiked(likedByMe);
  }, [review.likes, user]);

  const handleLike = async () => {
    if (isLiking) return;
    if (!teamId) return;
    setIsLiking(true);

    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1));

    try {
      if (nextLiked) {
        await likeReview(review.id);
      } else {
        await unlikeReview(review.id);
      }
      onLikeSuccess?.(review.id, nextLiked);
    } catch {
      setLiked(!nextLiked);
      setLikeCount((prev) => prev - (nextLiked ? 1 : -1));
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <>
      <article className="relative flex flex-col gap-12 px-2">
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
                          onClick={() => {
                            onEdit(review);
                          }}
                        >
                          수정하기
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="w-full cursor-pointer px-4 py-2 text-center hover:bg-gray-200"
                          onClick={() => {
                            onDelete(review.id);
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
            className="hover:text-primary flex items-center gap-2 transition"
            onClick={handleLike}
            disabled={isLiking}
          >
            <HeartIcon liked={liked} />
            <span className="text-sm">{likeCount}</span>
          </Button>
        </div>
      </article>
    </>
  );
}
