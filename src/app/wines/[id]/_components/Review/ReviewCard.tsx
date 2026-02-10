import StarRating from "@/components/StarRating";
import { WineTasteAroma } from "@/types/detail/types";
import Image from "next/image";
import ReviewAroma from "./ReviewAroma";
import DropDown from "@/components/DropDown";
import TasteBarGroup from "../TasteBarGroup";

interface ReviewCardProps {
  review: WineTasteAroma;
  layout?: "column" | "grid";
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const userImage = review.user?.image || "/user_icon.svg";
  return (
    <div className="my-5">
      <StarRating rating={review.rating} />
      <div className="m-2 flex flex-row">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image src={userImage} alt="프로필이미지" fill />
        </div>
        <div className="m-2 flex flex-col">
          <h3>{review.user.nickname}</h3>
          <h3>댓글수정시간</h3>
        </div>
      </div>
      <ReviewAroma aroma={review.aroma} />
      <h3 className="my-4">{review.content}</h3>
      <div className="relative w-full">
        <div className="flex w-full flex-col items-center">
          <DropDown>
            <TasteBarGroup reviews={[review]} layout="grid" />
          </DropDown>
          <button className="rounded-sm border-1">Like</button>
        </div>
      </div>
      <div className="solid m-0 mx-auto w-9/10 border-b"></div>
    </div>
  );
}
