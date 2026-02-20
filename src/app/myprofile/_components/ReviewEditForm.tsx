"use client";

import { MyReviewItem } from "@/types/myprofile/types";
import { useState } from "react";
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

export default function ReviewEditForm({
  review,
  onSuccess,
}: ReviewEditFormProps) {
  const { showToast } = useToast();
  const { onClose } = useModal();

  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);

  const initialAromas = Array.isArray((review as any).aroma)
    ? (review as any).aroma
    : Array.isArray((review as any).aromas)
      ? (review as any).aromas
      : [];

  const [selectedAromas, setSelectedAromas] = useState<string[]>(initialAromas);

  const [tastes, setTastes] = useState({
    body: Number((review as any).lightBold ?? (review as any).body ?? 0),
    tannins: Number(
      (review as any).smoothTannic ?? (review as any).tannins ?? 0,
    ),
    sweetness: Number(
      (review as any).drySweet ?? (review as any).sweetness ?? 0,
    ),
    acidity: Number((review as any).softAcidic ?? (review as any).acidity ?? 0),
  });

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
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-1 pb-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-3 md:gap-5">
            {/* 와인 정보 */}
            <WineSummary
              image={review.wine?.image}
              name={review.wine?.name}
              region={review.wine?.region}
            />

            {/* 별점 */}
            <div className="flex flex-row items-center gap-4 border-t border-gray-200 pt-4">
              <label className="text-gray-600">별점 선택</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setRating(num)}
                    className={`cursor-pointer text-xl md:text-2xl ${num <= rating ? "text-black" : "text-gray-300"}`}
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
          </div>

          {/* 와인 맛 */}
          <div className="flex flex-col gap-3 md:gap-6">
            <h3 className="text-2lg font-bold text-gray-800 md:text-xl">
              와인의 맛은 어땠나요?
            </h3>
            <TasteBarGroup
              values={tastes}
              onChange={handleTasteChange}
              layout="column"
            />
          </div>

          <ReviewFormAroma
            selectedAromas={selectedAromas}
            onToggleAroma={handleToggleAroma}
          />
        </div>
        <div className="pointer-events-none absolute bottom-[70px] left-0 z-10 h-40 w-full bg-gradient-to-t from-white via-white/50 to-transparent" />

        <div className="relative z-20 border-t border-gray-100 bg-white pt-4 pb-12">
          <button
            onClick={handleSubmit}
            className="mx-auto block h-12 w-full max-w-[300px] cursor-pointer rounded-sm bg-black text-white transition-colors hover:bg-gray-800"
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}
