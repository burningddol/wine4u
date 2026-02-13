import StarRating from "@/components/StarRating";
import { WineTasteAroma } from "@/types/detail/types";
import Image from "next/image";
import ReviewAroma from "./ReviewAroma";
import DropDown from "@/components/DropDown";
import TasteBarGroup from "../TasteBarGroup";
import { LoginedUser } from "@/types/auth/types";
import RegisterTab from "@/app/myprofile/_components/RegisterTab";

interface ReviewCardProps {
  review: WineTasteAroma;
  layout?: "column" | "grid";
  user: LoginedUser | null | any;
}

export default function ReviewCard({ review, user }: ReviewCardProps) {
  const userImage = review.user?.image || "/icons/user_icon.svg";
  const isMine = user && user.id === review.user;
  return (
    <div className="my-10">
      <StarRating rating={review.rating} size={20} />
      <div className="mt-5 flex flex-row">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image src={userImage} alt="프로필이미지" fill />
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold">{review.user.nickname}</h3>
          <h3 className="text-lg text-[#BABABA]">댓글수정시간</h3>
        </div>
      </div>
      <ReviewAroma aroma={review.aroma} />
      <div className="mb-12">{review.content}</div>
      <div className="relative flex w-full flex-col items-end">
        <div className="flex w-full flex-row items-center">
          <DropDown>
            <TasteBarGroup reviews={[review]} layout="grid" />
          </DropDown>
        </div>
        <button className="absolute bottom-0 left-0 rounded-sm border border-gray-300 px-3 py-1">
          Like
        </button>
      </div>
      <div className="solid m-0 mx-auto mt-5 mt-12 w-full border-b"></div>
    </div>
  );
}
