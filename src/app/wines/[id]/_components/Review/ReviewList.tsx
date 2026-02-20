import { useUser } from "@/components/UserProvider";
import ReviewCard from "./ReviewCard";
import { WineTasteAroma } from "@/types/detail/types";
import Image from "next/image";
import { deleteReview } from "@/app/myprofile/_libs/profileApi";
import { useModal } from "@/components/ModalProvider";
import ReviewEditForm from "@/app/myprofile/_components/ReviewEditForm";

interface ReviewListProps {
  reviews: WineTasteAroma[];
  openReviewModal: () => void;
  onRefresh: () => void;
}

export default function ReviewList({
  reviews,
  openReviewModal,
  onRefresh,
}: ReviewListProps) {
  const { user } = useUser() || null;
  const { showModal } = useModal();

  const handleEdit = (review: WineTasteAroma) => {
    showModal(
      <ReviewEditForm review={review} onSuccess={onRefresh} />,
      "리뷰 수정",
      550,
      1000,
    );
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await deleteReview(id); // API 호출
      onRefresh(); // 데이터 새로고침
    } catch (err) {
      alert("삭제 실패");
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="flex w-full">
        <div className="m-auto my-30 flex flex-col items-center justify-center gap-6">
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
      </div>
    );
  }
  return (
    <div>
      <div className="w-full pl-10">
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            review={item}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
