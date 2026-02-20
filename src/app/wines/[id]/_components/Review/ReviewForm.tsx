"use client";

import { WineDetail as WineDetailType } from "@/types/detail/types";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TasteBarGroup from "../TasteBarGroup";
import ReviewFormAroma from "./ReviewFormAroma";
import { useModal } from "@/components/ModalProvider";
import { postWineReview } from "@/libs/api/wineDetail/getAPIData";
import { useToast } from "@/components/ToastProvider";

interface ReviewFormProps {
  wine: WineDetailType;
  onRefresh: () => void;
}

export default function ReviewForm({ wine, onRefresh }: ReviewFormProps) {
  const router = useRouter();
  const { onClose } = useModal();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [tastes, setTastes] = useState({
    body: 0,
    tannins: 0,
    sweetness: 0,
    acidity: 0,
  });

  const { showToast } = useToast();

  const handleSubmit = async () => {
    const isTasteMissing = Object.values(tastes).some((value) => value === 0);
    if (rating === 0) return showToast("별점을 선택해주세요!");
    if (!content.trim()) return showToast("후기를 작성해주세요!");
    if (isTasteMissing) return showToast("와인의 맛을 모두 선택해주세요!");
    if (selectedAromas.length === 0)
      return showToast("향을 최소 1개 이상 선택해주세요!");
    try {
      const selectedReview = {
        rating: rating,
        lightBold: tastes.body,
        smoothTannic: tastes.tannins,
        drySweet: tastes.sweetness,
        softAcidic: tastes.acidity,
        aroma: selectedAromas,
        content: content,
        wineId: wine.id,
      };
      await postWineReview(selectedReview);
      showToast("리뷰가 등록되었습니다.", "success");
      await onRefresh();
      onClose();
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
      showToast("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

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

  return (
    /* [부모]: 고정된 틀. 버튼을 하단에 붙이기 위해 flex-col과 overflow-hidden 사용 */
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* [자식 - 스크롤 영역]: 본문만 스크롤됨. 여기에 스크롤 숨기기 적용 */}
      <div className="flex-1 overflow-y-auto px-1 pb-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* 와인 정보 */}
        <div className="flex min-h-[100px] min-w-[480px] gap-3 pt-1">
          <div className="relative h-[100px] w-[80px] shrink-0">
            <Image
              src={wine.image}
              alt="와인 상세이미지"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-lg font-bold">{wine.name}</div>
            <div className="text-gray-600">{wine.region}</div>
          </div>
        </div>
        <div className="mt-2 w-full border-b border-gray-600"></div>

        {/* 별점 선택 */}
        <div className="my-3 flex flex-row items-center gap-2">
          <label className="text-gray-600">별점 선택</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-2xl transition-colors ${
                  num <= rating ? "text-black" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* 후기 텍스트 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="후기를 작성해주세요."
          className="h-32 w-full resize-none rounded-sm border border-gray-300 p-4 focus:border-black focus:outline-none"
        />

        {/* 맛 지표 */}
        <div className="my-5">
          <h3 className="mb-6 text-xl font-bold text-gray-800">
            와인의 맛은 어땠나요?
          </h3>
          <TasteBarGroup values={tastes} onChange={handleTasteChange} />
        </div>

        {/* 향 선택 */}
        <div className="mb-4">
          <ReviewFormAroma
            selectedAromas={selectedAromas}
            onToggleAroma={handleToggleAroma}
          />
        </div>
      </div>

      {/* [그라데이션]: 스크롤 영역 바로 위에 띄움 */}
      <div className="pointer-events-none absolute bottom-[70px] left-0 z-10 h-40 w-full bg-gradient-to-t from-white via-white/50 to-transparent" />

      {/* [버튼 영역]: 부모의 맨 밑에 고정됨 */}
      <div className="relative z-20 border-t border-gray-100 bg-white pt-4 pb-12">
        <button
          onClick={handleSubmit}
          className="mx-auto block h-12 w-full max-w-[300px] cursor-pointer rounded-sm bg-black text-white transition-colors hover:bg-gray-800"
        >
          리뷰 남기기
        </button>
      </div>
    </div>
  );
}
