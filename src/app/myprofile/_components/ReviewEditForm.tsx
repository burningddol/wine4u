"use client";

import { useState, useEffect } from "react";
import { MyReviewItem } from "@/types/myprofile/types";
import WineSummary from "./WineSummary";
import TasteBarGroup from "@/app/wines/[id]/_components/TasteBarGroup";
import ReviewFormAroma from "@/app/wines/[id]/_components/Review/ReviewFormAroma";
import { updateReview } from "../_libs/profileApi";
import { useToast } from "@/components/ToastProvider";
import { useModal } from "@/components/ModalProvider";

interface ReviewEditFormProps {
  review: MyReviewItem;
  onSuccess: () => void;
}

interface ReviewEditFormState {
  review: MyReviewItem;
  onSuccess: () => void;
}

type TasteState = {
  body: number;
  tannins: number;
  sweetness: number;
  acidity: number;
};

function getInitialAromas(review: any): string[] {
  if (Array.isArray(review?.aroma)) return review.aroma;
  if (Array.isArray(review?.aromas)) return review.aromas;
  return [];
}

function getInitialTastes(review: any): TasteState {
  return {
    body: Number(review.lightBold ?? 0),
    tannins: Number(review.smoothTannic ?? 0),
    sweetness: Number(review.drySweet ?? 0),
    acidity: Number(review.softAcidic ?? 0),
  };
}

export default function ReviewEditForm({
  review,
  onSuccess,
}: ReviewEditFormProps) {
  const { showToast } = useToast();
  const { onClose } = useModal();

  const [rating, setRating] = useState<number>(() =>
    Number(review.rating ?? 0),
  );
  const [content, setContent] = useState<string>(() => review.content ?? "");
  const [selectedAromas, setSelectedAromas] = useState<string[]>(() =>
    getInitialAromas(review),
  );
  const [tastes, setTastes] = useState<TasteState>(() =>
    getInitialTastes(review),
  );

  const handleTasteChange = (key: string, value: number) => {
    setTastes((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleAroma = (aroma: string) => {
    setSelectedAromas((prev) =>
      prev.includes(aroma)
        ? prev.filter((item) => item !== aroma)
        : [...prev, aroma],
    );
  };

  const handleSubmit = async () => {
    if (rating === 0 || !content.trim()) {
      return;
    }

    const selectedReview = {
      rating,
      content,
      aroma: selectedAromas,
      lightBold: tastes.body,
      smoothTannic: tastes.tannins,
      drySweet: tastes.sweetness,
      softAcidic: tastes.acidity,
    };

    try {
      await updateReview(review.id, selectedReview as any);
      showToast("리뷰 수정에 성공했습니다.", "success");
      onSuccess();
      onClose();
    } catch (any: any) {
      showToast(any.message ?? "리뷰 수정에 실패했습니다.", "error");
    }
  };

  return (
    <>
      <div>
        {/* 와인 정보 */}
        <WineSummary
          image={review.wine?.image}
          name={review.wine?.name}
          region={review.wine?.region}
        />

        {/* 별점 */}
        <div className="mt-2 flex flex-row gap-2">
          <label className="text-gray-600">별점 선택</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-3xl ${num <= rating ? "text-black" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* 와인 후기 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="후기를 작성해주세요."
          className="h-32 w-full resize-none rounded-sm border border-gray-300 p-4"
        />

        {/* 와인 맛 */}
        <h3 className="mb-3 text-sm font-bold text-gray-800">
          와인의 맛은 어땠나요?
        </h3>
        <TasteBarGroup
          values={tastes}
          onChange={handleTasteChange}
          layout="column"
        />

        <ReviewFormAroma
          selectedAromas={selectedAromas}
          onToggleAroma={handleToggleAroma}
        />

        <div className="mt-10 flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-[2] cursor-pointer rounded-sm bg-black py-3.5 text-base font-bold text-white"
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}
