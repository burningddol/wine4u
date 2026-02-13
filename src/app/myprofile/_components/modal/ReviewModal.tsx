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

// import TasteBarGroup from "@/app/wines/[id]/_components/TasteBarGroup";
// import WineSummary from "../WineSummary";
// import EditStarRating from "../EditStarRating";
// import { WineTasteAroma } from "@/types/detail/types";
// import { MyReviewItem } from "@/types/myprofile/types";
// import { useState } from "react";

// interface ReviewModalProps {
//   image?: string;
//   name?: string;
//   region?: string;
//   taste: WineTasteAroma;
//   reviews: MyReviewItem[];
// }

// export default function ReviewModal({
//   image,
//   name,
//   region,
//   taste,
// }: ReviewModalProps) {
//   const handleUpdate = () => {
//     console.log("리뷰 수정하기");
//   };

//   const [content, setContent] = useState(taste?.content ?? "");
//   const [rating, setRating] = useState(taste?.rating ?? 0);

//   return (
//     <div>
//       {/* 와인 정보 */}
//       <WineSummary image={image} name={name} region={region} />

//       {/* 별점 */}
//       <div>
//         <label>별점 선택</label>
//         <EditStarRating value={rating} onChange={setRating} />
//       </div>

//       {/* 리뷰 내용 */}
//       <div>
//         <textarea
//           placeholder="리뷰 내용을 입력해주세요."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       {/* 테이스팅 */}
//       {taste && <TasteBarGroup reviews={[taste]} layout="column" />}

//       {/* 향 */}
//       <div>
//         <label>향 선택</label>
//         <input type="text" placeholder="향을 입력해주세요." />
//       </div>

//       <div className="mt-10 flex gap-2">
//         <button
//           onClick={handleUpdate}
//           className="flex-[2] cursor-pointer rounded-sm bg-black py-3.5 text-base font-bold text-white"
//         >
//           리뷰 수정하기
//         </button>
//       </div>
//     </div>
//   );
// }
