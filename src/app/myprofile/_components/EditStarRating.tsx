"use client";

import { cn } from "@/libs/utils";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z";

interface EditStarRatingProps {
  value: number;
  onChange: (value: number) => void;
  maxStars?: number;
  size?: number;
  fillColor?: string;
  emptyColor?: string;
}

export default function EditStarRating({
  value,
  onChange,
  maxStars = 5,
  size = 20,
  fillColor = "#000000",
  emptyColor = "#e2e1e1",
}: EditStarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5")}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starRatingValue = i + 1;
        const fill = starRatingValue <= value;

        return (
          <button
            type="button"
            className="cursor-pointer"
            key={starRatingValue}
            onClick={() => onChange(starRatingValue)}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
              <path d={STAR_PATH} fill={fill ? fillColor : emptyColor} />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
