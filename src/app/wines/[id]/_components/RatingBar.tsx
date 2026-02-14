interface ScroeBarProps {
  rating: number;
  percentage: number;
}

export default function ReviewScoreBar({ rating, percentage }: ScroeBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg text-[#A3A3A3]"> {rating}점</span>
      <div className="relative h-[6px] flex-1 rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-black"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
