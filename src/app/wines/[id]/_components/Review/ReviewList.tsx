import ReviewCard from "./ReviewCard";
import { WineTasteAroma } from "@/types/detail/types";

interface ReviewListProps {
  reviews: WineTasteAroma[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div>
      <div>
        {reviews.map((item) => (
          <ReviewCard key={item.id} review={item}></ReviewCard>
        ))}
      </div>
    </div>
  );
}
