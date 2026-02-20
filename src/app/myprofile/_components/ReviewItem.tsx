"use client";

import { MyReviewItem } from "@/types/myprofile/types";
import { WineTasteAroma } from "@/types/detail/types";
import StarRating from "@/components/StarRating";
import { timeAgo } from "@/utils/timeAgo";

import TasteBarGroup from "@/app/wines/[id]/_components/TasteBarGroup";
import WineSummary from "./WineSummary";
import DropdownMenu from "./DropdownMenu";

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
}: ReviewItemProps) {
  return (
    <>
      <article className="relative flex flex-col gap-12 px-2 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:-top-11 [&:not(:last-child)]:before:left-0 [&:not(:last-child)]:before:block [&:not(:last-child)]:before:w-full [&:not(:last-child)]:before:border-t [&:not(:last-child)]:before:border-gray-200 [&:not(:last-child)]:before:content-['']">
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
                <DropdownMenu
                  onEdit={() => onEdit(review)}
                  onDelete={() => onDelete(review.id)}
                />
              </div>

              <WineSummary
                image={review.wine?.image}
                name={review.wine?.name}
                region={review.wine?.region}
              />
            </div>

            <p className="text-lg leading-relaxed break-keep whitespace-pre-wrap">
              {review.content}
            </p>
          </div>

          <TasteBarGroup reviews={[taste]} layout="grid" />
        </div>
      </article>
    </>
  );
}
