"use client";
import { WineDetail as WineDetailType } from "@/types/detail/types";
import Image from "next/image";
import { useState } from "react";
import TasteBarGroup from "../TasteBarGroup";
import ReviewFormAroma from "./ReviewFormAroma";

interface ReviewFormProps {
  wine: WineDetailType;
}

interface ReviewFormValues {
  rating: number;
  content: string;
  body: number;
  tannin: number;
  sweetness: number;
  acidity: number;
  aromas: string[];
}

export default function ReviewForm({ wine }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [tastes, setTastes] = useState({
    body: 0,
    tannins: 0,
    sweetness: 0,
    acidity: 0,
  });

  const handleSubmit = async () => {
    if (rating === 0 || !content.trim()) {
      return;
    }

    const selectedReview = {
      wineId: wine.id,
      rating,
      content,
      aromas: selectedAromas,
      ...tastes,
    };

    console.log("전송 데이터:", selectedReview);
  };

  const handleTasteChange = (key: string, value: number) => {
    setTastes((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleAroma = (aroma: string) => {
    setSelectedAromas(
      (prev) =>
        prev.includes(aroma)
          ? prev.filter((item) => item !== aroma) // 있으면 제거
          : [...prev, aroma], // 없으면 추가
    );
  };
  return (
    <div>
      {/* 와인 정보 */}
      <div className="flex min-h-[100px] min-w-[480px] gap-3">
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
      <div className="mt-2 w-full border-b-1 border-gray-600"></div>
      {/* 와인 별점 */}
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
      <TasteBarGroup values={tastes} onChange={handleTasteChange} />
      <ReviewFormAroma
        selectedAromas={selectedAromas}
        onToggleAroma={handleToggleAroma}
      ></ReviewFormAroma>
    </div>
  );
}
