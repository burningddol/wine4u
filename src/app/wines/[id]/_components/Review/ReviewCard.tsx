import StarRating from "@/components/StarRating";
import { WineTasteAroma } from "@/types/detail/types";
import Image from "next/image";
import ReviewAroma from "./ReviewAroma";
import DropDown from "@/components/DropDown";
import TasteBarGroup from "../TasteBarGroup";
import { LoginedUser } from "@/types/auth/types";
import RelativeTime from "./RelativeTime";
import DropdownMenu from "@/app/myprofile/_components/DropdownMenu";

interface ReviewCardProps {
  review: WineTasteAroma;
  layout?: "column" | "grid";
  user: LoginedUser | null | any;
  onEdit: (review: WineTasteAroma) => void; // 추가
  onDelete: (id: number) => void;
}

export default function ReviewCard({
  review,
  user,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const userImage = review.user?.image || "/icons/user_icon.svg";
  const isMine = user && user.id === review.user.id;
  return (
    <div className="my-10 w-full">
      <div className="flex justify-between">
        <StarRating rating={review.rating} size={20} />
        {isMine && (
          <DropdownMenu
            onEdit={() => onEdit(review)}
            onDelete={() => onDelete(review.id)}
          />
        )}
      </div>
      <div className="mt-5 flex flex-row">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image src={userImage} alt="프로필이미지" fill />
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold">{review.user.nickname}</h3>
          <h3 className="text-lg text-[#BABABA]">
            <RelativeTime date={review.updatedAt} />
          </h3>
        </div>
      </div>
      <ReviewAroma aroma={review.aroma} />
      <div className="mb-10 break-keep whitespace-pre-wrap">{review.content}</div>
      <div className="relative flex w-full flex-col items-end">
        <div className="flex w-full flex-row items-center">
          <DropDown>
            <TasteBarGroup reviews={[review]} layout="grid" />
          </DropDown>
        </div>
      </div>
      <div className="solid m-0 mx-auto mt-5 w-full border-b border-[#D1D1D1]" />
    </div>
  );
}
