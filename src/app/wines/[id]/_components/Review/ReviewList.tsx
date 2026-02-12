import { useUser } from "@/components/UserProvider";
import ReviewCard from "./ReviewCard";
import { WineTasteAroma } from "@/types/detail/types";
import Image from "next/image";

interface ReviewListProps {
  reviews: WineTasteAroma[];
  openReviewModal: () => void;
}

export default function ReviewList({
  reviews,
  openReviewModal,
}: ReviewListProps) {
  const { user } = useUser();

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src="/winedetail/notice_mark.png"
          alt="리뷰 없음"
          width={140}
          height={140}
        />
        <p className="mb-6 text-lg text-gray-500">작성된 리뷰가 없습니다.</p>
        <button
          onClick={openReviewModal}
          className="h-12 w-60 cursor-pointer rounded-sm bg-black text-white transition-colors hover:bg-gray-800"
        >
          리뷰 남기기
        </button>
      </div>
    );
  }
  return (
    <div>
      <div>
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            review={item} /*user={user} 유저정보 추후작성*/
          />
        ))}
      </div>
    </div>
  );
}
