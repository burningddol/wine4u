import RatingBar from "./RatingBar";
import { WineTasteAroma } from "@/types/detail/types";

interface ReviewBarGroupProps {
  reviews: WineTasteAroma[];
}

export default function RatingBarGroup({ reviews }: ReviewBarGroupProps) {
  const totalCount = reviews.length;

  const getPercentage = (star: number) => {
    if (totalCount === 0) return 0;
    const count = reviews.filter((r) => r.rating === star).length;
    return (count / totalCount) * 100;
  };
  return (
    <div className="flex flex-col gap-2">
      {[5, 4, 3, 2, 1].map((star) => (
        <RatingBar key={star} rating={star} percentage={getPercentage(star)} />
      ))}
    </div>
  );
}
