"use client";

import { WineDetail as WineDetailType } from "@/types/detail/types";
import { MyReviewItem } from "@/types/myprofile/types";
import ReviewForm from "@/app/wines/[id]/_components/Review/ReviewForm";
import ReviewEditForm from "../ReviewEditForm";

type Mode = "edit" | "create";

interface ReviewModalProps {
  mode: Mode;
  wine?: WineDetailType;
  review?: MyReviewItem;
  onSuccess?: () => void;
}

export default function ReviewModal({
  mode,
  wine,
  review,
  onSuccess,
}: ReviewModalProps) {
  if (mode === "edit") {
    if (!review) {
      return null;
    }
    return (
      <ReviewEditForm review={review} onSuccess={onSuccess ?? (() => {})} />
    );
  }

  if (mode === "create") {
    if (!wine) {
      return null;
    }
    return <ReviewForm wine={wine} />;
  }
}
