interface ScroeBarProps {
  rating: number;
  percentage: number;
}

export default function ReviewScoreBar({ rating, percentage }: ScroeBarProps) {
  return (
    <div className="flex gap-3">
      <span> {rating}점</span>
      <div className="relative h-4 flex-1 rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-black"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
